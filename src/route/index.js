export const routeConfig = [
  {
    title: 'My samples',
    items: [
      { text: 'Minimal-copy-paste', href: '/src/webrtc/custom/minimal/minimal-copy-paste.html' },
      { text: 'Minimal-call', href: '/src/webrtc/custom/minimal/minimal-call.html' },
      { text: 'Minimal-room', href: '/src/webrtc/custom/minimal/minimal-room.html' },
      { text: 'Basic peer connection demo + Signaling', href: '/src/webrtc/custom/pc1/?signaling=ws' },
    ]
  },
  {
    title: 'getUserMedia()',
    items: [
      { text: 'Basic getUserMedia demo', href: '/src/webrtc/content/getusermedia/gum/' },
      { text: 'Use getUserMedia with canvas', href: '/src/webrtc/content/getusermedia/canvas/' },
      { text: 'Use getUserMedia with canvas and CSS filters', href: '/src/webrtc/content/getusermedia/filter/' },
      { text: 'Choose camera resolution', href: '/src/webrtc/content/getusermedia/resolution/' },
      { text: 'Audio-only getUserMedia() output to local audio element', href: '/src/webrtc/content/getusermedia/audio/' },
      { text: 'Audio-only getUserMedia() displaying volume', href: '/src/webrtc/content/getusermedia/volume/' },
      { text: 'Record stream', href: '/src/webrtc/content/getusermedia/record/' },
      { text: 'Screensharing with getDisplayMedia', href: '/src/webrtc/content/getusermedia/getdisplaymedia/' },
      { text: 'Control camera pan, tilt, and zoom', href: '/src/webrtc/content/getusermedia/pan-tilt-zoom/' },
      { text: 'Control exposure', href: '/src/webrtc/content/getusermedia/exposure/' },
    ]
  },
  {
    title: 'Devices',
    items: [
      { text: 'Choose camera, microphone and speaker', href: '/src/webrtc/content/devices/input-output/' },
      { text: 'Choose media source and audio output', href: '/src/webrtc/content/devices/multi/' },
    ]
  },
  {
    title: 'Stream capture',
    items: [
      { text: 'Stream from a video element to a video element', href: '/src/webrtc/content/capture/video-video/' },
      { text: 'Stream from a video element to a peer connection', href: '/src/webrtc/content/capture/video-pc/' },
      { text: 'Stream from a canvas element to a video element', href: '/src/webrtc/content/capture/canvas-video/' },
      { text: 'Stream from a canvas element to a peer connection', href: '/src/webrtc/content/capture/canvas-pc/' },
      { text: 'Record a stream from a canvas element', href: '/src/webrtc/content/capture/canvas-record/' },
      { text: 'Guiding video encoding with content hints', href: '/src/webrtc/content/capture/video-contenthint/' },
    ]
  },
  {
    title: 'RTCPeerConnection',
    
    items: [
      { text: 'Basic peer connection demo in a single tab', href: '/src/webrtc/content/peerconnection/pc1/' },
      { text: 'Basic peer connection demo between two tabs', href: '/src/webrtc/content/peerconnection/channel/' },
      { text: 'Peer connection using Perfect Negotiation', href: '/src/webrtc/content/peerconnection/perfect-negotiation/' },
      { text: 'Audio-only peer connection demo', href: '/src/webrtc/content/peerconnection/audio/' },
      { text: 'Change bandwidth on the fly', href: '/src/webrtc/content/peerconnection/bandwidth/' },
      { text: 'Change codecs before the call', href: '/src/webrtc/content/peerconnection/change-codecs/' },
      { text: 'Upgrade a call and turn video on', href: '/src/webrtc/content/peerconnection/upgrade/' },
      { text: 'Multiple peer connections at once', href: '/src/webrtc/content/peerconnection/multiple/' },
      { text: 'Forward the output of one PC into another', href: '/src/webrtc/content/peerconnection/multiple-relay/' },
      { text: 'Munge SDP parameters', href: '/src/webrtc/content/peerconnection/munge-sdp/' },
      { text: 'Use pranswer when setting up a peer connection', href: '/src/webrtc/content/peerconnection/pr-answer/' },
      { text: 'Constraints and stats', href: '/src/webrtc/content/peerconnection/constraints/' },
      { text: 'RTCPeerConnection and requestVideoFrameCallback()', href: '/src/webrtc/content/peerconnection/per-frame-callback/' },
      { text: 'Display createOffer output for various scenarios', href: '/src/webrtc/content/peerconnection/create-offer/' },
      { text: 'Use RTCDTMFSender', href: '/src/webrtc/content/peerconnection/dtmf/' },
      { text: 'Display peer connection states', href: '/src/webrtc/content/peerconnection/states/' },
      { text: 'ICE candidate gathering from STUN/TURN servers', href: '/src/webrtc/content/trickle-ice/' },
      { text: 'Do an ICE restart', href: '/src/webrtc/content/peerconnection/restart-ice/' },
      { text: 'Web Audio output as input to peer connection', href: '/src/webrtc/content/peerconnection/webaudio-input/' },
      { text: 'Peer connection as input to Web Audio', href: '/src/webrtc/content/peerconnection/webaudio-output/' },
      { text: 'Measure how long renegotiation takes', href: '/src/webrtc/content/peerconnection/negotiate-timing/' },
    ]
  },
  {
    title: 'RTCDataChannel',
    items: [
      { text: 'Transmit text', href: '/src/webrtc/content/datachannel/basic/' },
      { text: 'Transfer a file', href: '/src/webrtc/content/datachannel/filetransfer/' },
      { text: 'Transfer data', href: '/src/webrtc/content/datachannel/datatransfer/' },
      { text: 'Basic datachannel demo between two tabs', href: '/src/webrtc/content/datachannel/channel/' },
      { text: 'Messaging', href: '/src/webrtc/content/datachannel/messaging/' },
    ]
  },
  {
      title: 'Insertable Streams',
      items: [
          { text: 'End to end encryption', href: '/src/webrtc/content/insertable-streams/endtoend-encryption' },
          { text: 'Video analyzer', href: '/src/webrtc/content/insertable-streams/video-analyzer' },
          { text: 'Video processing', href: '/src/webrtc/content/insertable-streams/video-processing' },
          { text: 'Audio processing', href: '/src/webrtc/content/insertable-streams/audio-processing' },
          { text: 'Video cropping', href: '/src/webrtc/content/insertable-streams/video-crop' },
          { text: 'Integrations with WebGPU', href: '/src/webrtc/content/insertable-streams/webgpu' },
      ]
  }
];
