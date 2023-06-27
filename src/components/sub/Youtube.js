import { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import axios from 'axios';

function Youtube() {
	const [Vids, setVids] = useState([]);

	//최초의 데이터를 가져와야 되기 때문에 useEffect를 사용
	useEffect(() => {
		const key = 'AIzaSyDOsDRuQ_v0ISUQEy6mZdnCfcf3VKIG5uE';
		const list = 'PLGrvPC1Wr19hEuOc58RgKY1uPw_0eoIbE';
		const num = 10;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;

		axios.get(url).then((data) => {
			console.log(`Youtube 최초 데이터 : ${data}`);
			setVids(data.data.items);
		});
	}, []);

	return (
		<Layout name={'Youtube'}>
			{Vids.map((Vid, idx) => {
				return (
					<article key={idx}>
						<img src={Vid.snippet.thumbnails.standard.url} alt='{Vid.snippet.title}' />
						<h2>{Vid.snippet.title}</h2>
						<p>{Vid.snippet.description}</p>
						<span>{Vid.snippet.publishedAt}</span>
					</article>
				);
			})}
		</Layout>
	);
}

export default Youtube;
