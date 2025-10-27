const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");

const wss = new WebSocket(`wss://${location.host}`);
let pc;

async function start() {
  // 1. 화면 공유 가져오기
  const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
  localVideo.srcObject = stream;

  // 2. RTCPeerConnection 생성
  pc = new RTCPeerConnection();

  // 3. 화면 트랙을 PeerConnection에 추가
  stream.getTracks().forEach(track => pc.addTrack(track, stream));

  // 4. 상대방 비디오 처리
  pc.ontrack = (event) => {
    remoteVideo.srcObject = event.streams[0];
  };

  // 5. ICE 후보 생성 시 WebSocket으로 전달
  pc.onicecandidate = (event) => {
    if (event.candidate) {
      wss.send(JSON.stringify({ type: "candidate", candidate: event.candidate }));
    }
  };

  // 6. WebSocket 메시지 처리
  wss.onmessage = async (msg) => {
    const data = JSON.parse(msg.data);

    if (data.type === "offer") {
      await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      wss.send(JSON.stringify({ type: "answer", answer }));
    }

    if (data.type === "answer") {
      await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
    }

    if (data.type === "candidate") {
      try {
        await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
      } catch (err) {
        console.error("Error adding ICE candidate:", err);
      }
    }
  };

  // 7. 첫 연결이면 Offer 생성
  pc.onnegotiationneeded = async () => {
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    wss.send(JSON.stringify({ type: "offer", offer }));
  };
}

// 자동 실행
start().catch(console.error);
