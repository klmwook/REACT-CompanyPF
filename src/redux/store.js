//state가 저장 될 공간을 생성, 리듀서에서 saga 작업을 미들웨어 적용 설정
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducer';
import rootSaga from './saga';
import createSagaMiddleware from '@redux-saga/core';

//sagaMiddleware 활성화
const sagaMiddleware = createSagaMiddleware();

//store에 reducer 데이터를 전달 할 때 sagaMiddleware를 적용해서 전달
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

//적용된 sagaMiddleware로 부터 rootSaga 함수 호출
sagaMiddleware.run(rootSaga);

//saga 미들웨어가 적용된 reducer 데이터를 store에 저장하고 export
export default store;
