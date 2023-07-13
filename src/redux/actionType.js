//각 데이터 카테고리 별로 사용될 액션 타입명을 변수처럼 모아놓은 객체
export const YOUTUBE = {
	start: 'YOUTUBE_START',
	success: 'YOUTUBE_SUCCESS',
	fail: 'YOUTUBE_FAIL',
};

export const DEPARTMENT = {
	start: 'DEPARTMENT_START',
	success: 'DEPARTMENT_SUCCESS',
	fail: 'DEPARTMENT_FAIL',
};

/*
	리덕스 사가 데이터 흐름 순서
		1. actionType.js : 데이터 요청 , 성공 , 실패에 대한 actionType을 세분화 해서 객체형태로 export
		2. reducer.js : 3가지 액션 타입 요청에 대한 데이터 변경 처리 함수 export
		3. api.js : axios로 비동기 데이터 호출 함수를 순수 함수 형태로 만들어서 export
		4. saga.js : 처음에 리듀서가 전달받는 start 액션 요청을 감지해서 api.js로 부터 데이터 fetching 받고 새로운 액션 객체 반환 함수 export
		5. store.js : reducer에 saga 미들웨어 연결 후 연결된 데이터값으로 store 전역 객체에 저장 후 export
		6. index.js : store 전역 객체를 App 루트 컴포넌트에 전달
		7. App.js : 컴포넌트 마운트 되자 마자 Youtube_START라는 액션 객체를 dispatch로 전달 (이후 reducer-saga-store 흐름으로 전역 state 객체가 생성)
		8. 원하는 컴포넌트에서 자유롭게 useSelector로 해당 데이터를 가져오면 됨
*/
