import { useState, useEffect, useRef } from 'react';
import Masonry from 'react-masonry-component';
import Layout from '../common/Layout';
import axios from 'axios';

function Gallery() {
	const frame = useRef(null);
	const counter = useRef(0);
	const [Items, setItems] = useState([]);
	const [Loader, setLoader] = useState(true);

	const getFlickr = async (opt) => {
		const baseURL = `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1`;
		const key = '4b95b58f2acca136d03e1c6883048c6c';
		const method_interest = 'flickr.interestingness.getList'; //오늘의 인기있는 이미지
		const method_search = 'flickr.photos.search';
		const num = 500;

		let url = '';
		if (opt.type === 'interest') url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
		if (opt.type === 'search') url = `${baseURL}&api_key=${key}&method=${method_search}&per_page=${num}&tags=${opt.tags}`;
		if (opt.type === 'user') url = `${baseURL}&api_key=${key}&method=${method_search}&per_page=${num}&user_id=${opt.user}`;

		const result = await axios.get(url);
		setItems(result.data.photos.photo);

		//외부데이터가 State에 담기고 DOM이 생성되는 순간
		//모든 img 요소를 찾아서 반복처리
		const imgs = frame.current.querySelectorAll('img');
		imgs.forEach((img, idx) => {
			//이미지 요소에 load 이벤트가 발생할 때 (소스 이미지까지 로딩이 완료 될 때 마다)
			img.onload = () => {
				//내부적으로 카운터 값을 1씩 증가
				++counter.current;

				//로딩 완료된 이미지 수와 전체 이미지 수가 같아지면
				if (counter.current === imgs.length) {
					//loader 제거하고 이미지 갤러리 보임 처리
					setLoader(false);
					frame.current.classList.add('on');
				}
			};
		});
	};

	//흥미 (기본)
	useEffect(() => getFlickr({ type: 'interest' }), []);

	//미션 - 아래 호출문으로 풍경 이미지 검색되도록 함수 코드 수정
	//useEffect(() => getFlickr({ type: 'search', tags: 'landscape' }), []);

	//미션2 - 아래 호출문으로 내 계정의 이미지 갤러리 호출 되도록
	// useEffect(() => getFlickr({ type: 'user', user: '198489363@N07' }), []);
	// useEffect(() => getFlickr({ type: 'user', user: '139000974@N08' }), []);

	return (
		<Layout name={'Gallery'}>
			<div className='frame' ref={frame}>
				<Masonry elementType={'div'} options={{ transitionDuration: '0.5s' }}>
					{Items.map((item, idx) => {
						return (
							<article key={idx}>
								<div className='inner'>
									<div className='pic'>
										<img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} alt={item.title} />
									</div>
									<h2>{item.title}</h2>
									<div className='profile'>
										<img
											src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
											alt={item.owner}
											onError={(e) => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
										/>
										<span>{item.owner}</span>
									</div>
								</div>
							</article>
						);
					})}
				</Masonry>
			</div>
			{Loader && <img className='loader' src={`${process.env.PUBLIC_URL}/img/loading.gif`} alt='loader' />}
		</Layout>
	);
}

export default Gallery;
