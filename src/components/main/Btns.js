import { useRef, useEffect, useState, useCallback, memo } from 'react';
import Anime from '../../asset/anime';
import { useThrottle } from '../../hooks/useThrottle';

function Btns({ setScrolled, setPos }) {
	const btnRef = useRef(null);
	const pos = useRef([]);
	const [Num, setNum] = useState(0);

	const getPos = useCallback(() => {
		console.log('getPos');
		pos.current = [];
		const secs = btnRef.current.parentElement.querySelectorAll('.myScroll');
		for (const sec of secs) pos.current.push(sec.offsetTop);
		setNum(pos.current.length);
		setPos(pos.current);
	}, [setPos]);

	const activation = useCallback(() => {
		console.log('activation');
		const base = -window.innerHeight / 2;
		const scroll = window.scrollY;
		const btns = btnRef.current.children;
		const boxs = btnRef.current.parentElement.querySelectorAll('.myScroll');

		pos.current.forEach((pos, idx) => {
			if (scroll >= pos + base) {
				for (const btn of btns) btn.classList.remove('on');
				for (const box of boxs) box.classList.remove('on');
				btns[idx].classList.add('on');
				boxs[idx].classList.add('on');
			}
		});
	}, []);

	const changeScroll = useCallback(() => {
		const scroll = window.scrollY;
		setScrolled(scroll);
		console.log(scroll);
	}, [setScrolled]);

	const getPos2 = useThrottle(getPos);
	const activation2 = useThrottle(activation);

	useEffect(() => {
		getPos();
		window.addEventListener('resize', getPos2);
		window.addEventListener('scroll', activation2);
		window.addEventListener('scroll', changeScroll);
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

		return () => {
			window.removeEventListener('resize', getPos2);
			window.removeEventListener('scroll', activation2);
			window.removeEventListener('scroll', changeScroll);
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		};
	}, [getPos2, activation2, getPos, changeScroll]);

	return (
		<ul className='btnNavi' ref={btnRef}>
			{Array(Num)
				.fill()
				.map((_, idx) => {
					let defaultClass = '';
					if (idx === 0) defaultClass = 'on';
					return (
						<li
							key={idx}
							className={defaultClass}
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

export default memo(Btns);
