import { useRef, useEffect, useState, useCallback } from 'react';
import Anime from '../../asset/anime';

function Btns({ setScrolled, setPos }) {
	const btnRef = useRef(null);
	const pos = useRef([]);
	const [Num, setNum] = useState(0);

	//myScroll공통 클래스가 있는 섹션을 모두 찾아서 해당 요소의 세로 위치값을 참조객체에 배열로 담아주는 함수
	const getPos = useCallback(() => {
		//객체가 초기화가 되지 않으면 추가가 계속 되기 때문에 초기화 해줘야됨 (리사이즈 시 마다 엄청 늘어남.)
		pos.current = [];
		const secs = btnRef.current.parentElement.querySelectorAll('.myScroll');
		for (const sec of secs) pos.current.push(sec.offsetTop);
		setNum(pos.current.length); //현재 section 값 찾음
		setPos(pos.current);
	}, [setPos]);

	const activation = useCallback(() => {
		const base = -window.innerHeight / 2;
		const scroll = window.scrollY;
		const btns = btnRef.current.children;
		const boxs = btnRef.current.parentElement.querySelectorAll('.myScroll');
		setScrolled(scroll);

		pos.current.forEach((pos, idx) => {
			if (scroll >= pos + base) {
				for (const btn of btns) btn.classList.remove('on');
				for (const box of boxs) box.classList.remove('on');
				btns[idx].classList.add('on');
				boxs[idx].classList.add('on');
			}
		});
	}, [setScrolled]);

	useEffect(() => {
		getPos();
		window.addEventListener('resize', getPos);
		window.addEventListener('scroll', activation);
		//React는 SPA이기 때문에 페이지가 변경 된다고 하더라도 스크롤 위치값이 초기화 되지 않으므로 마운트 시 마다 스크롤 값을 초기화 함
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

		return () => {
			//윈도우 객체에 이벤트 연결하면 다른 서브페이지의 컴포넌트에서도 동일하게 함수호출되므로 에러 발생
			//해당 컴포넌트가 unmount시 무조건 window전역객체에 연결되어 있는 이벤트 핸들러 함수 제거
			//이떄 removeEventListener로 핸들러 함수를 제거하기 위해서는 해당 함수로 외부로 함수로 선언되어 있어야가능
			window.removeEventListener('resize', getPos);
			window.removeEventListener('scroll', activation);
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		};
	}, [getPos, activation]);

	//eslint가 의존성 배열에 activation , getPos 함수를 등록하라고 권고문구를 띄우는 이유
	/*
		eslint가 의존성 배열에 activation , getPos 함수를 등록하라고 권고문구를 띄우는 이유
			- useEffect내부에서 getPos, activation이라는 외부 함수를 사용하고 있으므로 React 입장에서는 해당 변경 될 수도 있는 점을 대비해 의존성 배열에 등록할 것을 권고

			- 이때 권고사항에 따라 activation, getPos를 의존성배열에 등록하면 해당 component가 업데이트 될 때 마다 해당 함수에서 변경되는 점이 없음에도 불구하고 계속 호출 하면서 무한루프에 빠짐

			- 추후 useCallback, useMemo를 이용해서 컴포넌트 내부에 있는 특정 하수 혹은 특정 리턴값을 강제로 메모리에 저장해서 다음번 렌더링사이클에서는 같은 함수와 같은 리턴값을 매번 연산하지 않도록 처리 (Memoization) 
			
			- 메모리 점유율을 늘려서 성능을 올리는 방식
			- 메모리를 강제로 많이 점유하면 Memoization 처리된 값들은 js엔진 내부적으로 garbage-collection에서 제외됨 (성능면에서 악 영향을 끼침)

	*/

	return (
		<ul className='btnNavi' ref={btnRef}>
			{Array(Num)
				.fill()
				.map((_, idx) => {
					let defalutClass = '';
					if (idx === 0) {
						defalutClass = 'on';
					}

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
							className={defalutClass}
						></li>
					);
				})}
		</ul>
	);
}

export default Btns;
