import React from 'react';
import { useEffect, useRef } from 'react';

function Layout({ name, children, txt = 'default', bg }) {
	const frame = useRef(null);

	//Mount가 되는 순간 한번만 실행 되는 구문
	useEffect(() => {
		frame.current.classList.add('on');
	}, []);

	return (
		<section className={`content ${name}`} ref={frame}>
			<figure style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/${bg})` }}></figure>

			<div className='inner'>
				<h1>{name}</h1>
				<h2>
					{txt.split('-').map((el, idx) => {
						return (
							<React.Fragment key={idx}>
								{el}
								<br />
							</React.Fragment>
						);
					})}
				</h2>
				{children}
			</div>
		</section>
	);
}

export default Layout;
