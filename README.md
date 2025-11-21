[![Node.js CI](https://github.com/selim0915/frontend-study/actions/workflows/merge.yml/badge.svg?event=push)](https://github.com/selim0915/frontend-study/actions/workflows/merge.yml)

# Front-study

## WebRTC를 테스트할 수 있는 시나리오
1. 의존성 설치
```
$ npm install 
```

2. https 구성을 위한 인증서 설치, 터미널에서 프로젝트 루트에 인증서 폴더를 만들고 생성
```
$ mkdir cert
openssl req -nodes -new -x509 -keyout cert/key.pem -out cert/cert.pem -days 365
```

3. 프로젝트 실행
```
$ npm run prod:webrtc
```

4. 접근
- 브라우저에서 https://localhost:3000 접속
- “고급 → 계속 진행”으로 인증서 신뢰 설정
- “Minimal Manual Offer/Answer” 버튼 클릭

5. WS 연결
- A와 B 모두 같은 페이지 접근
- A와 B 모두 “Start Camera” 클릭해서 -> 카메라/마이크 권한 허용

방법1.
- A와 B 모두 하단 WS URL 입력란이 wss://localhost:3001인지 확인 후 “Connect WS” 클릭하여 connected 확인
- A에서 “Create Offer” 클릭
- B에서 자동으로 Answer 응답, ICE 후보 자동 교환

방법2.
- A에서 “Create Offer” 클릭 → “SDP” 박스에 긴 JSON이 생성됨
- A의 SDP(Offer)를 B의 “SDP” 박스에 A의 텍스트를 붙여넣고 “Create Answer” 클릭 → B의 “SDP” 박스에 Answer 텍스트 생성
- B의 Answer 텍스트를 A의 “SDP” 박스에 붙여넣기 → “Set Remote Answer” 클릭
- A의 “ICE Candidates” 박스에 텍스트 복사 → B의 “Remote ICE Candidates” 박스에 붙여넣고 “Add Remote ICE Candidates”

6. 결과
두 브라우저 간 Remote 비디오에 영상/음성이 표시되면 성공
