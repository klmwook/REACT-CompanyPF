import { useEffect, useState, useRef } from 'react';
import Layout from '../common/Layout';
import axios from 'axios';
import Modal from '../common/Modal';

function Youtube() {
	const modal = useRef(null);
	const [Vids, setVids] = useState([]);
	const [Index, setIndex] = useState(0);

	const fecthYoutube = async () => {
		const key = 'AIzaSyDOsDRuQ_v0ISUQEy6mZdnCfcf3VKIG5uE';
		const list = 'PLGrvPC1Wr19hEuOc58RgKY1uPw_0eoIbE';
		const num = 10;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;

		const result = await axios.get(url);
		setVids(result.data.items);
	};

	//최초의 데이터를 가져와야 되기 때문에 useEffect를 사용
	useEffect(() => fecthYoutube(), []);

	return (
		<>
			<Layout name={'Youtube'}>
				{Vids.map((Vid, idx) => {
					return (
						<article key={idx}>
							<h2>{Vid.snippet.title.length > 50 ? Vid.snippet.title.substr(0, 50) + '...' : Vid.snippet.title}</h2>
							<div className='txt'>
								<p>{Vid.snippet.description.length > 200 ? Vid.snippet.description.substr(0, 200) + '...' : Vid.snippet.description}</p>
								<span>{Vid.snippet.publishedAt.split('T')[0].split('-').join('.')}</span>
							</div>
							<div
								className='pic'
								onClick={() => {
									modal.current.Open();
									//썸네일 클릭 시 현재 클릭한 요소의 순번 값으로 Index State 값 변경
									setIndex(idx);
								}}
							>
								<img src={Vid.snippet.thumbnails.standard.url} alt={Vid.snippet.title} />
							</div>
						</article>
					);
				})}
			</Layout>

			<Modal ref={modal}>
				{/* 첫 렌더링 싸이클에서는 Vids[0]의 객체 값 자체가 없음으로 없는 요소의 id값 호출 시 오류 */}
				{/* 옵셔널체이닝으로 해결 */}
				<iframe title={Vids[Index]?.id} src={`https://www.youtube.com/embed/${Vids[Index]?.snippet.resourceId.videoId}`}></iframe>
			</Modal>
		</>
	);
}

export default Youtube;
