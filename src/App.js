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

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setYoutube } from './redux/action';
import { useCallback, useEffect, useRef } from 'react';

import './scss/style.scss';

function App() {
	const dispatch = useDispatch();
	const menu = useRef(null);

	const fecthYoutube = useCallback(async () => {
		const key = 'AIzaSyDOsDRuQ_v0ISUQEy6mZdnCfcf3VKIG5uE';
		const list = 'PLGrvPC1Wr19hEuOc58RgKY1uPw_0eoIbE';
		const num = 10;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;

		const result = await axios.get(url);
		//setVids(result.data.items);
		dispatch(setYoutube(result.data.items));
	}, [dispatch]);

	//최초의 데이터를 가져와야 되기 때문에 useEffect를 사용
	useEffect(() => {
		fecthYoutube();
	}, [fecthYoutube]);

	return (
		<>
			{/* Switch는 내부에 중복되는 라우트 경로가 있을 때 더 구체적인 라우터를 체크하고 나머지는 무시 */}
			<Switch>
				<Route exact path='/' render={() => <Main menu={menu} />} />
				<Route path='/' render={() => <Header type={'sub'} menu={menu} />} />
			</Switch>

			<Route path='/department' component={Department} />
			<Route path='/community' component={Community} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/contact' component={Contact} />
			<Route path='/member' component={Member} />
			<Footer />
			<Menu ref={menu} />
		</>
	);
}

export default App;
