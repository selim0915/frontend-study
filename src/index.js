import testFunction from './test.js';

console.log('Starting application...');

// process.env 테스트
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('API_KEY:', process.env.API_KEY);

// 테스트 함수 실행
const result = testFunction();
console.log(result);

console.log('Application started successfully!');
