let pc = new RTCPeerConnection();
let localStream;
let answerSet = false;

// 화면 공유
document.getElementById("shareScreen").onclick = async () => {
  try {
    localStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    document.getElementById("localVideo").srcObject = localStream;
    localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
    console.log("Screen sharing started");
  } catch (e) {
    alert("화면 공유 실패: " + e.message);
  }
};

// 원격 스트림 표시
pc.ontrack = e => {
  console.log("Remote track received", e.streams[0]);
  document.getElementById("remoteVideo").srcObject = e.streams[0];
};

// ICE 상태 확인
pc.oniceconnectionstatechange = () => {
  console.log("ICE state:", pc.iceConnectionState);
};

// Offer 생성
document.getElementById("createOffer").onclick = async () => {
  if (!localStream) { alert("먼저 화면 공유 시작!"); return; }
  let offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  document.getElementById("offer").value = JSON.stringify(offer);
  console.log("Offer created");
};

// Answer 생성
document.getElementById("createAnswer").onclick = async () => {
  let offer = JSON.parse(document.getElementById("offer").value);
  await pc.setRemoteDescription(offer);
  let answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);
  document.getElementById("offer").value = JSON.stringify(answer);
  console.log("Answer created");
};

// Remote Answer 적용
document.getElementById("setAnswer").onclick = async () => {
  if (answerSet) { alert("Answer 이미 적용됨"); return; }
  let answer = JSON.parse(document.getElementById("offer").value);
  await pc.setRemoteDescription(answer);
  answerSet = true;
  alert("Remote Answer set!");
};
