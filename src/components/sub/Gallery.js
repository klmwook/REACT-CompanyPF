import { useState, useEffect } from 'react';
import Layout from '../common/Layout';
import axios from 'axios';

function Gallery() {
	const [Items, setItems] = useState([]);

	const getFlickr = async (opt) => {
		const baseURL = `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1`;
		const key = '4b95b58f2acca136d03e1c6883048c6c';
		const method_interest = 'flickr.interestingness.getList'; //오늘의 인기있는 이미지
		const num = 20;
		const myId = '198489363@N07';

		let url = '';
		if (opt.type === 'interest') url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;

		const result = await axios.get(url);
		setItems(result.data.photos.photo);
	};

	useEffect(() => getFlickr({ type: 'interest' }), []);

	return (
		<Layout name={'Gallery'}>
			<div className='frame'>
				{Items.map((item, idx) => {
					return (
						<article key={idx}>
							<div className='inner'>
								<div className='pic'>
									<img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} alt={item.title} />
								</div>
								<h2>{item.title}</h2>
							</div>
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Gallery;
