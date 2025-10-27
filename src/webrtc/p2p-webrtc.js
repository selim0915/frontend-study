import { app } from "./firebase/firebase";

// Firebase 설정
const db = app.database();

const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const startBtn = document.getElementById('startWebcam');
const createCallBtn = document.getElementById('createCall');
const sdpBox = document.getElementById('sdpBox');

let localStream;
let pc;

// ICE 서버 설정 (STUN만 사용)
const configuration = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
};

// 1. 웹캠/마이크 시작
startBtn.onclick = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.srcObject = localStream;
};

// 2. P2P 연결 생성 (Offer)
callBtn.onclick = async () => {
    pc = new RTCPeerConnection(configuration);

    // 로컬 스트림 트랙 추가
    localStream.getTracks().forEach(track => pc.addTrack(track, localStream));

    // Remote stream 설정
    const remoteStream = new MediaStream();
    remoteVideo.srcObject = remoteStream;
    pc.ontrack = e => e.streams[0].getTracks().forEach(t => remoteStream.addTrack(t));

    // ICE 후보 로그
    pc.onicecandidate = event => {
        if (event.candidate) {
            console.log('New ICE candidate:', event.candidate);
            db.ref('calls/call1/candidates').push(event.candidate.toJSON());
        }
    };

    // Offer 생성
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    // Firebase에 offer 저장
    await db.ref('calls/call1/offer').set(offer.toJSON());

    // Firebase에서 answer 감지
    db.ref('calls/call1/answer').on('value', async snapshot => {
        const answer = snapshot.val();
        if (answer && !pc.currentRemoteDescription) {
            await pc.setRemoteDescription(new RTCSessionDescription(answer));
        }
    });

    // Firebase에서 remote ICE 후보 감지
    db.ref('calls/call1/candidates_remote').on('child_added', snapshot => {
        const candidate = snapshot.val();
        pc.addIceCandidate(new RTCIceCandidate(candidate));
    });
};
