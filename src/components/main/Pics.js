function Pics({ Scrolled, Pos }) {
	// Pics 컴포넌트가 활성화 되는 순간부터 scrolled 값을 pics의 제목 스타일과 연동
	//on이 찍혔을 때가 활성화가 되는 순간

	return (
		<section id='pics' className='myScroll'>
			<h1 style={{ transform: `translateX(${(Scrolled - Pos) * 2}px)` }}>FLICKR</h1>
		</section>
	);
}

export default Pics;
