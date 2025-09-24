[![Node.js CI](https://github.com/selim0915/frontend-study/actions/workflows/merge.yml/badge.svg?event=push)](https://github.com/selim0915/frontend-study/actions/workflows/merge.yml)

# Front-study

localhost 환경에서 유효한 https 구성

```
// 터미널에서 프로젝트 루트에 인증서 폴더를 만들고 생성
$ mkdir cert
openssl req -nodes -new -x509 -keyout cert/key.pem -out cert/cert.pem -days 365
```

프로젝트 실행
```
$ npm install 
$ node server.js
```

테스트 주소
- webtrc : https://192.168.2.95:3000/src/webrtc/auto-vedio.html