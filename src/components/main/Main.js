import React, { useState } from 'react';
import Header from '../common/Header';
import Visual from './Visual';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Banner from './Banner';
import Btns from './Btns';

/* 
	Prop drilling 
	- 특정 값을 자식 컴포넌트에게 전달하기 위해서 불필요하게 많은 중간 컴포넌트들이 값을 전달목적으로 쓰이는 경우

	Redux
	- 위와 같은 rpop drilling을 방지하기 위해서 복잡하게 컴포넌트를 통해 전달할 값을 prop 아닌 컴포넌트 외부에 데이터 전용 객체로 만들어서 어떤 위치의 컴포넌트에서든 편하게 값을 가져오고 수정할 수 있게 만드는 전역 데이터 체계
*/

function Main() {
	const [Scrolled, setScrolled] = useState(0);
	const [Pos, setPos] = useState([]);

	return (
		<main>
			<Header type={'main'} />
			<Visual />
			<News />
			<Pics Scrolled={Scrolled} Pos={Pos[2]} />
			<Vids />
			<Banner />
			<Btns setScrolled={setScrolled} setPos={setPos} />
		</main>
	);
}

export default Main;
