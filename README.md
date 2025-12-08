[![Node.js CI](https://github.com/selim0915/frontend-study/actions/workflows/merge.yml/badge.svg?event=push)](https://github.com/selim0915/frontend-study/actions/workflows/merge.yml)

# Front-study

## 1. WebRTC 테스트
1. 의존성 설치
```
$ npm install 
```
<br/>

2. https 구성을 위한 인증서 설치

- 터미널에서 프로젝트 루트에 인증서 폴더 생성
```
$ mkdir cert

```
- 인증서 설치
```
$ openssl req -nodes -new -x509 -keyout cert/key.pem -out cert/cert.pem -days 365 -config cert/openssl.cnf

```
<br/>

3. 프로젝트 실행

- 프론트 서버와 시그널링를 같이 실행
```
$ npm run prod:webrtc
```

<br/>

4. 접근
- 브라우저 주소창에 wss://192.168.2.95:3001 접속한 후, “고급 → 계속 진행”으로 인증서 신뢰 설정 
- 브라우저 주소창에 https://localhost:3000 접속한 후, “고급 → 계속 진행”으로 인증서 신뢰 설정
- WebRTC samples 버튼 클릭 >  “minimal-copy-paste” 링크 클릭

<br/>

5. WS 연결
- A와 B 모두 같은 페이지 접근
- A와 B 모두 “Start Camera” 클릭해서 → 카메라/마이크 권한 허용
- A와 B 모두 “Connect WS” 클릭하여 WebSocket signaling 요청
- connected인 경우 → A에서 “Create Offer” 클릭
- disconnected인 경우 → 수동 WebRTC 연결 요청
<br/>

6. 결과 확인

- 두 브라우저 간 Remote 비디오에 영상/음성이 표시되면 성공
