import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../common/Layout';
import axios from 'axios';
import Modal from '../common/Modal';
import { setYoutube } from '../../redux/action';

function Youtube() {
	const Vids = useSelector((store) => store.youtubeReducer.youtube);
	const modal = useRef(null);
	const [Index, setIndex] = useState(0);

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
