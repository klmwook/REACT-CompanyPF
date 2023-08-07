import { Route, Switch } from 'react-router-dom';

//common
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import Menu from './components/common/Menu';

//main
import Main from './components/main/Main';

//sub
import Community from './components/sub/Community';
import Contact from './components/sub/Contact';
import Department from './components/sub/Department';
import Gallery from './components/sub/Gallery';
import Member from './components/sub/Member';
import Youtube from './components/sub/Youtube';

import './scss/style.scss';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
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
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

export default App;

/*
	Automatic Batching 
	:여려개의 state값이 하나의 핸들러 함수 안쪽에서 동시에 변경이 될때 그룹으로 묶어서 한번만 렌더링 처리
	:17에도 동작되는 기능이긴 하나 promise를 반환하는 함수 안쪽에 여러개의 state값이 변경될 경우에는 동작안됨
*/
