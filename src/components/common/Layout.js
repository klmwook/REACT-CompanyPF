import { useEffect, useRef } from 'react';

function Layout({ name, children }) {
	const frame = useRef(null);

	//Mount가 되는 순간 한번만 실행 되는 구문
	useEffect(() => {
		frame.current.classList.add('on');
	}, []);

	return (
		<section className={`content ${name}`} ref={frame}>
			<figure></figure>

			<div className='inner'>
				<h1>{name}</h1>
				{children}
			</div>
		</section>
	);
}

export default Layout;
