import { useSelector } from 'react-redux/';

function Pics({ Scrolled, Pos }) {
	const { flickr } = useSelector((store) => store.flickrReducer);

	// Pics 컴포넌트가 활성화 되는 순간부터 scrolled 값을 pics의 제목 스타일과 연동
	//on이 찍혔을 때가 활성화가 되는 순간
	const currentPos = Scrolled - Pos;
	const base = window.innerHeight / 2;
	const modified = currentPos + base;

	return (
		<section id='pics' className='myScroll'>
			<h1 style={{ transform: `translateX(${currentPos}px)` }}>FLICKR</h1>

			<article
				style={{
					transform: `translate(-50%, -50%) rotate(${Scrolled >= Pos - base ? modified : 0}deg) scale(${Scrolled >= Pos - base ? 1 + modified / 500 : 1}) `,
					opacity: `${Scrolled >= Pos - base ? 1 - modified / 500 : 1}`,
				}}
			></article>

			<ul>
				{flickr.map((pic, idx) => {
					if (idx >= 4) return null;

					return (
						<li key={pic.id}>
							<img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`} alt={pic.title} />
						</li>
					);
				})}
			</ul>
		</section>
	);
}

export default Pics;
