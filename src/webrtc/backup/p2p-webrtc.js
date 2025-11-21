import { db, doc } from "../../firebase/firebase.js";

const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");
const startBtn = document.getElementById("startWebcam");
const createCallBtn = document.getElementById("createCall");
const joinCallBtn = document.getElementById("joinCall");
const callIdBox = document.getElementById("callIdBox");

let localStream;
let pc;
const configuration = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

// 1️⃣ 비디오/오디오 시작
startBtn.onclick = async () => {
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  localVideo.srcObject = localStream;
  console.log("🎥 Local stream started");
};
// 2️⃣ Offer 생성자
createCallBtn.onclick = async () => {
  pc = new RTCPeerConnection(configuration);

  localStream.getTracks().forEach(track => pc.addTrack(track, localStream));

  const remoteStream = new MediaStream();
  remoteVideo.srcObject = remoteStream;
  pc.ontrack = e => e.streams[0].getTracks().forEach(t => remoteStream.addTrack(t));

  // Firestore Call 문서 생성
  const callDoc = doc(collection(db, "calls"));
  const callId = callDoc.id;
  callIdBox.value = callId;
  console.log("📞 New Call ID:", callId);

  // ICE 후보 저장용 컬렉션
  const offerCandidatesCol = collection(callDoc, "offerCandidates");

  pc.onicecandidate = event => {
    if (event.candidate) {
      addDoc(offerCandidatesCol, event.candidate.toJSON());
      console.log("New ICE candidate:", event.candidate);
    }
  };

  // Offer 생성 및 Firestore에 저장
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  await setDoc(callDoc, { offer: offer.toJSON() });

  // Answer 수신 대기
  onSnapshot(callDoc, async docSnap => {
    const data = docSnap.data();
    if (data?.answer && !pc.currentRemoteDescription) {
      await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
      console.log("✅ Answer received");
    }
  });

  // Answer ICE 후보 수신
  const answerCandidatesCol = collection(callDoc, "answerCandidates");
  onSnapshot(answerCandidatesCol, snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === "added") {
        const candidate = new RTCIceCandidate(change.doc.data());
        pc.addIceCandidate(candidate);
      }
    });
  });
};

// 3️⃣ Answer 참여자
joinCallBtn.onclick = async () => {
  const callId = prompt("Enter Call ID to join:");
  if (!callId) return alert("Call ID required!");

  const callDoc = doc(db, "calls", callId);
  const callSnap = await getDoc(callDoc);
  if (!callSnap.exists()) return alert("No offer found for this Call ID.");

  const offer = callSnap.data().offer;
  pc = new RTCPeerConnection(configuration);
  localStream.getTracks().forEach(track => pc.addTrack(track, localStream));

  const remoteStream = new MediaStream();
  remoteVideo.srcObject = remoteStream;
  pc.ontrack = e => e.streams[0].getTracks().forEach(t => remoteStream.addTrack(t));

  // ICE 후보 저장용 컬렉션
  const answerCandidatesCol = collection(callDoc, "answerCandidates");
  pc.onicecandidate = event => {
    if (event.candidate) {
      addDoc(answerCandidatesCol, event.candidate.toJSON());
    }
  };

  await pc.setRemoteDescription(new RTCSessionDescription(offer));

  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);

  // Firestore에 answer 저장
  await setDoc(callDoc, { answer: answer.toJSON() }, { merge: true });

  // Offer ICE 후보 수신
  const offerCandidatesCol = collection(callDoc, "offerCandidates");
  onSnapshot(offerCandidatesCol, snapshot => {
    snapshot.docChanges().forEach(change => {
      if (change.type === "added") {
        const candidate = new RTCIceCandidate(change.doc.data());
        pc.addIceCandidate(candidate);
      }
    });
  });

  console.log("🙋 Joined call:", callId);
};
