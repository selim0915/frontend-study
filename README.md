[![Node.js CI](https://github.com/selim0915/frontend-study/actions/workflows/merge.yml/badge.svg?event=push)](https://github.com/selim0915/frontend-study/actions/workflows/merge.yml)

# Front-study

## WebRTC 테스트
1. 의존성 설치
```
$ npm install 
```
<br/>

2. https 구성을 위한 인증서 설치

터미널에서 프로젝트 루트에 인증서 폴더를 만들고 생성
```
$ mkdir cert
openssl req -nodes -new -x509 -keyout cert/key.pem -out cert/cert.pem -days 365
```
<br/>

3. 프로젝트 실행
```
$ npm run prod:webrtc
```

<br/>

4. 접근
- 브라우저에서 https://localhost:3000 접속
- “고급 → 계속 진행”으로 인증서 신뢰 설정
- index.html의 “minimal-copy-paste” 버튼 클릭

<br/>

5. WS 연결 준비
- A와 B 모두 같은 페이지 접근
- A와 B 모두 “Start Camera” 클릭해서 -> 카메라/마이크 권한 허용

<br/>

연결 방법1)
- A와 B 모두 하단 WS URL 입력란이 wss://localhost:3001인지 확인 후 “Connect WS” 클릭하여 connected 확인
- A에서 “Create Offer” 클릭
- B에서 자동으로 Answer 응답, ICE 후보 자동 교환

연결 방법2)
- A에서 “Create Offer” 클릭 → A의 SDP에 Offer 텍스트 생성
- A의 SDP Offer 텍스트를 B의 SDP에 붙여넣고 “Create Answer” 클릭 → B의 SDP에 Answer 텍스트 생성
- B의 SDP Answer 텍스트를 A의 SDP에 붙여넣고 “Set Remote Answer” 클릭 → A의 ICE Candidates에 텍스트 생성
- A의 ICE Candidates 텍스트를 복사 → B의 Remote ICE Candidates에 붙여넣고 “Add Remote ICE Candidates” 클릭

<br/>

6. 결과 확인

두 브라우저 간 Remote 비디오에 영상/음성이 표시되면 성공
