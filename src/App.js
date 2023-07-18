import { Route, Switch } from 'react-router-dom';

//Common
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import Menu from './components/common/Menu';

//Main
import Main from './components/main/Main';

//Sub
import Community from './components/sub/Community';
import Contact from './components/sub/Contact';
import Department from './components/sub/Department';
import Gallery from './components/sub/Gallery';
import Member from './components/sub/Member';
import Youtube from './components/sub/Youtube';

import './scss/style.scss';
import { fetchYoutube } from './redux/youtubeSlice';
import { fetchDepartment } from './redux/departmentSlice';
import { fetchFlickr } from './redux/flickrSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

/* 
	redux-toolkit의 작업흐름
	1. redux 폴더 안쪽에 작업하려는 data의 slice 파일 생성 (data fetching후 액션객체 생성 함수, 액션 객체 받아서 전역 데이터 수정 함수)
	2. index.js에서 slice 값으로 연동된 데이터 store에 저장하고 App에 전달
	3. app.js에서 slice파일로부터 action 객체 생성 함수를 import 후 호출하여 action 만들고 dispatch로 전달
	4. 원하는 컴포넌트에서 useSelector로 데이터 가져오기
*/

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchYoutube());
		dispatch(fetchDepartment());
		dispatch(fetchFlickr({ type: 'user', user: '198489363@N07' }));
	}, [dispatch]);

	return (
		<>
			{/* Switch는 내부에 중복되는 라우트 경로가 있을 때 더 구체적인 라우터를 체크하고 나머지는 무시 */}
			<Switch>
				<Route exact path='/' render={() => <Main />} />
				<Route path='/' render={() => <Header type={'sub'} />} />
			</Switch>

			<Route path='/department' component={Department} />
			<Route path='/community' component={Community} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/contact' component={Contact} />
			<Route path='/member' component={Member} />
			<Footer />
			<Menu />
		</>
	);
}

export default App;
