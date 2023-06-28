import { useRef, useEffect, useState } from 'react';
import Anime from '../../asset/anime';

function Btns() {
	const btnRef = useRef(null);
	const pos = useRef([]);
	const [Num, setNum] = useState(0);

	//myScroll공통 클래스가 있는 섹션을 모두 찾아서 해당 요소의 세로 위치값을 참조객체에 배열로 담아주는 함수
	const getPos = () => {
		console.log('getPos');
		pos.current = [];
		const secs = btnRef.current.parentElement.querySelectorAll('.myScroll');
		for (const sec of secs) pos.current.push(sec.offsetTop);
		setNum(pos.current.length); //현재 section 값 찾음
	};

	useEffect(() => {
		getPos();
		window.addEventListener('resize', getPos);

		return () => {
			//윈도우 객체에 이벤트 연결하면 다른 서브페이지의 컴포넌트에서도 동일하게 함수호출되므로 에러 발생
			//해당 컴포넌트가 unmount시 무조건 window전역객체에 연결되어 있는 이벤트 핸들러 함수 제거
			//이떄 removeEventListener로 핸들러 함수를 제거하기 위해서는 해당 함수로 외부로 함수로 선언되어 있어야가능
			window.removeEventListener('resize', getPos);
		};
	}, []);

	return (
		<ul className='btnNavi' ref={btnRef}>
			{Array(Num)
				.fill()
				.map((_, idx) => {
					return (
						<li
							key={idx}
							onClick={() => {
								new Anime(window, {
									prop: 'scroll',
									value: pos.current[idx],
									duration: 500,
								});
							}}
						></li>
					);
				})}
		</ul>
	);
}

export default Btns;
