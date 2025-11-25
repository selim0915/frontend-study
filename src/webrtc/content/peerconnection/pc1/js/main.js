/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

'use strict';

const useWs = (() => { try { return new URLSearchParams(location.search).get('signaling') === 'ws'; } catch (_) { return false; } })();
let ws;
let pendingOffer = null;

const startButton = document.getElementById('startButton');
const callButton = document.getElementById('callButton');
const hangupButton = document.getElementById('hangupButton');
callButton.disabled = true;
hangupButton.disabled = true;
startButton.addEventListener('click', start);
callButton.addEventListener('click', call);
hangupButton.addEventListener('click', hangup);

if (useWs) {
  ensureWs();
}

let startTime;
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');

localVideo.addEventListener('loadedmetadata', function() {
  console.log(`Local video videoWidth: ${this.videoWidth}px,  videoHeight: ${this.videoHeight}px`);
});

remoteVideo.addEventListener('loadedmetadata', function() {
  console.log(`Remote video videoWidth: ${this.videoWidth}px,  videoHeight: ${this.videoHeight}px`);
});

remoteVideo.addEventListener('resize', () => {
  console.log(`Remote video size changed to ${remoteVideo.videoWidth}x${remoteVideo.videoHeight} - Time since pageload ${performance.now().toFixed(0)}ms`);
  // We'll use the first onsize callback as an indication that video has started
  // playing out.
  if (startTime) {
    const elapsedTime = window.performance.now() - startTime;
    console.log('Setup time: ' + elapsedTime.toFixed(3) + 'ms');
    startTime = null;
  }
});

let localStream;
let pc1;
let pc2;
const offerOptions = {
  offerToReceiveAudio: 1,
  offerToReceiveVideo: 1
};

function buildWsUrl() {
  const secure = location.protocol === 'https:';
  const scheme = secure ? 'wss' : 'ws';
  const host = location.hostname;
  const port = 3001;
  return `${scheme}://${host}:${port}`;
}
function ensureWs() {
  if (!useWs) return;
  if (ws && ws.readyState === WebSocket.OPEN) return;
  ws = new WebSocket(buildWsUrl());
  ws.onmessage = async (msg) => {
    try {
      const data = JSON.parse(msg.data);
      if (data.type === 'offer' && useWs && !localStream) {
        pendingOffer = data.offer;
        alert('카메라 시작을 먼저 눌러주세요.');
        return;
      }
      if (!pc1 && data.type !== 'offer') return;
      if (data.type === 'offer') {
        await pc1.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await pc1.createAnswer();
        await pc1.setLocalDescription(answer);
        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: 'answer', answer: pc1.localDescription }));
        }
      }
      if (data.type === 'answer') {
        await pc1.setRemoteDescription(new RTCSessionDescription(data.answer));
      }
      if (data.type === 'candidate' && data.candidate) {
        try {
          await pc1.addIceCandidate(new RTCIceCandidate(data.candidate));
        } catch {}
      }
    } catch {}
  };
}
async function setupPcWs() {
  const configuration = {};
  pc1 = new RTCPeerConnection(configuration);
  pc1.addEventListener('icecandidate', async e => {
    if (e.candidate && ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'candidate', candidate: e.candidate }));
    }
  });
  pc1.addEventListener('iceconnectionstatechange', e => onIceStateChange(pc1, e));
  const remoteStream = new MediaStream();
  remoteVideo.srcObject = remoteStream;
  pc1.addEventListener('track', (ev) => {
    ev.streams[0].getTracks().forEach(t => remoteStream.addTrack(t));
  });
  localStream.getTracks().forEach(track => pc1.addTrack(track, localStream));
  if (pendingOffer) {
    try {
      await pc1.setRemoteDescription(new RTCSessionDescription(pendingOffer));
      const answer = await pc1.createAnswer();
      await pc1.setLocalDescription(answer);
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'answer', answer: pc1.localDescription }));
      }
    } catch (_) {}
    pendingOffer = null;
  }
}

function getName(pc) {
  return (pc === pc1) ? 'pc1' : 'pc2';
}

function getOtherPc(pc) {
  return (pc === pc1) ? pc2 : pc1;
}

async function start() {
  console.log('Requesting local stream');
  startButton.disabled = true;
  try {
    let stream;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    } else if (navigator.getUserMedia) {
      stream = await new Promise((resolve, reject) => {
        navigator.getUserMedia({ audio: true, video: true }, resolve, reject);
      });
    } else {
      throw new ReferenceError('getUserMedia not supported');
    }
    console.log('Received local stream');
    localVideo.srcObject = stream;
    localStream = stream;
    callButton.disabled = false;
  } catch (e) {
    alert(`getUserMedia() error: ${e.name}`);
  }
}

async function call() {
  callButton.disabled = true;
  hangupButton.disabled = false;
  startTime = window.performance.now();
  const videoTracks = localStream.getVideoTracks();
  const audioTracks = localStream.getAudioTracks();
  if (videoTracks.length > 0) {}
  if (audioTracks.length > 0) {}
  if (useWs) {
    ensureWs();
    await setupPcWs();
    try {
      const offer = await pc1.createOffer(offerOptions);
      await pc1.setLocalDescription(offer);
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'offer', offer: pc1.localDescription }));
      }
    } catch (e) {}
    return;
  }
  const configuration = {};
  pc1 = new RTCPeerConnection(configuration);
  pc1.addEventListener('icecandidate', e => onIceCandidate(pc1, e));
  pc2 = new RTCPeerConnection(configuration);
  pc2.addEventListener('icecandidate', e => onIceCandidate(pc2, e));
  pc1.addEventListener('iceconnectionstatechange', e => onIceStateChange(pc1, e));
  pc2.addEventListener('iceconnectionstatechange', e => onIceStateChange(pc2, e));
  pc2.addEventListener('track', gotRemoteStream);
  localStream.getTracks().forEach(track => pc1.addTrack(track, localStream));
  try {
    const offer = await pc1.createOffer(offerOptions);
    await onCreateOfferSuccess(offer);
  } catch (e) {}
}

function onCreateSessionDescriptionError(error) {
  console.log(`Failed to create session description: ${error.toString()}`);
}

async function onCreateOfferSuccess(desc) {
  console.log(`Offer from pc1\n${desc.sdp}`);
  console.log('pc1 setLocalDescription start');
  try {
    await pc1.setLocalDescription(desc);
    onSetLocalSuccess(pc1);
  } catch (e) {
    onSetSessionDescriptionError();
  }

  console.log('pc2 setRemoteDescription start');
  try {
    await pc2.setRemoteDescription(desc);
    onSetRemoteSuccess(pc2);
  } catch (e) {
    onSetSessionDescriptionError();
  }

  console.log('pc2 createAnswer start');
  // Since the 'remote' side has no media stream we need
  // to pass in the right constraints in order for it to
  // accept the incoming offer of audio and video.
  try {
    const answer = await pc2.createAnswer();
    await onCreateAnswerSuccess(answer);
  } catch (e) {
    onCreateSessionDescriptionError(e);
  }
}

function onSetLocalSuccess(pc) {
  console.log(`${getName(pc)} setLocalDescription complete`);
}

function onSetRemoteSuccess(pc) {
  console.log(`${getName(pc)} setRemoteDescription complete`);
}

function onSetSessionDescriptionError(error) {
  console.log(`Failed to set session description: ${error.toString()}`);
}

function gotRemoteStream(e) {
  if (remoteVideo.srcObject !== e.streams[0]) {
    remoteVideo.srcObject = e.streams[0];
    console.log('pc2 received remote stream');
  }
}

async function onCreateAnswerSuccess(desc) {
  console.log(`Answer from pc2:\n${desc.sdp}`);
  console.log('pc2 setLocalDescription start');
  try {
    await pc2.setLocalDescription(desc);
    onSetLocalSuccess(pc2);
  } catch (e) {
    onSetSessionDescriptionError(e);
  }
  console.log('pc1 setRemoteDescription start');
  try {
    await pc1.setRemoteDescription(desc);
    onSetRemoteSuccess(pc1);
  } catch (e) {
    onSetSessionDescriptionError(e);
  }
}

async function onIceCandidate(pc, event) {
  try {
    await (getOtherPc(pc).addIceCandidate(event.candidate));
    onAddIceCandidateSuccess(pc);
  } catch (e) {
    onAddIceCandidateError(pc, e);
  }
  console.log(`${getName(pc)} ICE candidate:\n${event.candidate ? event.candidate.candidate : '(null)'}`);
}

function onAddIceCandidateSuccess(pc) {
  console.log(`${getName(pc)} addIceCandidate success`);
}

function onAddIceCandidateError(pc, error) {
  console.log(`${getName(pc)} failed to add ICE Candidate: ${error.toString()}`);
}

function onIceStateChange(pc, event) {
  if (pc) {
    console.log(`${getName(pc)} ICE state: ${pc.iceConnectionState}`);
    console.log('ICE state change event: ', event);
  }
}

function hangup() {
  if (pc1) { try { pc1.close(); } catch {} pc1 = null; }
  if (!useWs && pc2) { try { pc2.close(); } catch {} pc2 = null; }
  hangupButton.disabled = true;
  callButton.disabled = false;
}
