import Layout from '../common/Layout';
import Masonry from 'react-masonry-component';
import { useState, useEffect, useRef } from 'react';
import Modal from '../common/Modal';
import { useSelector, useDispatch } from 'react-redux/';
import * as types from '../../redux/actionType';

/*

갤러리 컴포넌트에서 전역 비동기 데이터 변경 방법
	dispatch를 액션 객체를 보낼때 opt도 같이 전달하면 됨

	각각의 showInterest , showSearch , ShowMine , ShowUser 함수가 실행될 때 마다 내부적으로 opt 지역 State 변경
	useEffec에 Opt 스테이트 값을 의존성 배열해서 dispatch로 opt가 바뀔때마다 action 객체를 전달하도록 설정

*/

function Gallery() {
	const Items = useSelector((store) => store.flickrReducer.flickr);
	const dispathch = useDispatch();

	const isUser = useRef(null);
	const btnSet = useRef(null);
	const btnSearch = useRef(null);
	const enableEvent = useRef(true);
	const searchInput = useRef(null);
	const frame = useRef(null);
	const openModal = useRef(null);
	const counter = useRef(0);
	const [Loader, setLoader] = useState(true);
	const [Index, setIndex] = useState(0);
	const [Opt, setOpt] = useState({ type: 'user', user: '198489363@N07' });

	// const getFlickr = useCallback(
	// 	async (opt) => {
	// 		let counter = 0;

	// 		// const result = await axios.get(url);
	// 		// if (result.data.photos.photo.length === 0) {
	// 		// 	setLoader(false);
	// 		// 	frame.current.classList.add('on');
	// 		// 	btnSearch.current.classList.remove('on');
	// 		// 	const btnMine = btnSet.current.children;
	// 		// 	btnMine[1].classList.add('on');
	// 		// 	getFlickr({ type: 'user', user: '164021883@N04' });
	// 		// 	enableEvent.current = true;

	// 		// 	return alert('이미지 결과값이 없습니다.');
	// 		// }

	// 		//외부 API로 부터 데이터 fetching 시간이 오래 걸리는 경우
	// 		//컴포넌트가 unMounted 시 해당 Mounted 값을 false로 변경처리
	// 		//Mounted 값이 true일때에만 fetching된 데이터를 state에 담음
	// 		//데이터가 fetching 전 컴포넌트가 언마운트되면 State에 값을 담지 않으므로 불필요한 메모리 누수가 발생하지 않음
	// 		//Mounted && setItems(result.data.photos.photo);
	// 		Mounted && setItems(result);

	// 		const imgs = frame.current?.querySelectorAll('img');

	// 		if (!imgs) return;

	// 		imgs.forEach((img) => {
	// 			img.onload = () => {
	// 				++counter;

	// 				//임시방편 - 전체 이미지 갯수가 하나 모잘라도 출력되게 수정
	// 				//문제점 - myGallery, interestGallery는 전체 이미지 카운트가 잘 되는데 특정 사용자 갤러리만 갯수가 1씩 모자라는 현상
	// 				// 검색 결과물에서 특정 사용자를 클릭하면 다시 결과값이 하나 적게 리턴되는 문제 (해결필요)
	// 				if (counter === imgs.length - 2) {
	// 					setLoader(false);
	// 					frame.current.classList.add('on');

	// 					//모션중 재이벤트 방지시 모션이 끝날때까지 이벤트를 방지를 시켜도
	// 					//모션이 끝나는순간에도 이벤트가 많이 발생하면 특정값이 바뀌는 순간보다 이벤트가 더 빨리들어가서 오류가 발생가능
	// 					//해결방법 - 물리적으로 이벤트 호출을 지연시켜서 마지막에 발생한 이벤트만 동작처리 (debouncing)
	// 					//단시간에 많이 발생하는 이벤트시 함수 호출을 줄이는 방법
	// 					//debouncing: 이벤트 발생시 바로 호출하는게 아닌 일정시간 텀을 두고 마지막에 발생한 이벤트만 호출
	// 					//throttling: 이벤트 발생시 호출되는 함수자체를 setTimeout으로 적게 호출
	// 					enableEvent.current = true;
	// 				}
	// 			};
	// 		});
	// 	},
	// 	[Mounted]
	// );

	//기존 갤러리 초기화 함수
	const resetGallery = (e) => {
		const btns = btnSet.current.querySelectorAll('button');
		btns.forEach((el) => el.classList.remove('on'));
		e.target.classList.add('on');
		enableEvent.current = false;
		setLoader(true);
		frame.current.classList.remove('on');
	};

	const showInterest = (e) => {
		//재이벤트, 모션중 재이벤트 방지
		if (!enableEvent.current) return;
		if (e.target.classList.contains('on')) return;

		//기존 갤러리 초기화 함수 호출
		resetGallery(e);

		//새로운 데이터로 갤러리 생성 함수 호출
		setOpt({ type: 'interest' });
		isUser.current = false;
	};

	const showMine = (e) => {
		//재이벤트, 모션중 재이벤트 방지
		if (!enableEvent.current) return;
		if (e.target.classList.contains('on')) return;

		//기존 갤러리 초기화 함수 호출
		resetGallery(e);

		//새로운 데이터로 갤러리 생성 함수 호출
		setOpt({ type: 'user', user: '198489363@N07' });
		isUser.current = false;
	};

	const showSearch = (e) => {
		const tag = searchInput.current.value.trim();
		if (tag === '') return alert('검색어를 입력하세요.');
		if (!enableEvent.current) return;

		resetGallery(e);
		setOpt({ type: 'search', tags: tag });
		searchInput.current.value = '';
	};

	useEffect(() => {
		dispathch({ type: types.FLICKR.start, opt: Opt });
	}, [Opt, dispathch]);

	useEffect(() => {
		console.log(Items);
		counter.current = 0;

		if (Items.length === 0) {
			setLoader(false);
			frame.current.classList.add('on');
			btnSearch.current.classList.remove('on');
			const btnMine = btnSet.current.children;
			btnMine[1].classList.add('on');
			setOpt({ type: 'user', user: '164021883@N04' });
			enableEvent.current = true;

			return alert('이미지 결과값이 없습니다.');
		}

		const imgs = frame.current?.querySelectorAll('img');

		if (!imgs) return;

		imgs.forEach((img) => {
			img.onload = () => {
				++counter.current;

				if (counter.current === imgs.length - 2) {
					setLoader(false);
					frame.current.classList.add('on');
					enableEvent.current = true;
				}
			};
		});
	}, [Items]);

	return (
		<>
			<Layout name={'Gallery'}>
				<div className='btnSet' ref={btnSet}>
					<button onClick={showInterest}>Interest Gallery</button>

					<button className='on' onClick={showMine}>
						My Gallery
					</button>
				</div>

				<div className='searchBox'>
					<input type='text' placeholder='검색어를 입력하세요.' ref={searchInput} onKeyPress={(e) => e.key === 'Enter' && showSearch(e)} />
					<button onClick={showSearch} ref={btnSearch}>
						Search
					</button>
				</div>

				<div className='frame' ref={frame}>
					<Masonry elementType={'div'} options={{ transitionDuration: '0.5s' }}>
						{Items.map((item, idx) => {
							return (
								<article key={idx}>
									<div className='inner'>
										<div
											className='pic'
											onClick={() => {
												openModal.current.Open();
												setIndex(idx);
											}}
										>
											<img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} alt={item.title} />
										</div>
										<h2>{item.title}</h2>
										<div className='profile'>
											<img
												src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
												alt={item.owner}
												onError={(e) => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
											/>
											<span
												onClick={(e) => {
													if (isUser.current) return;
													isUser.current = true;
													setLoader(true);
													frame.current.classList.remove('on');
													setOpt({ type: 'user', user: e.target.innerText });
												}}
											>
												{item.owner}
											</span>
										</div>
									</div>
								</article>
							);
						})}
					</Masonry>
				</div>
				{Loader && <img className='loader' src={`${process.env.PUBLIC_URL}/img/loading.gif`} alt='loader' />}
			</Layout>

			<Modal ref={openModal}>
				<img src={`https://live.staticflickr.com/${Items[Index]?.server}/${Items[Index]?.id}_${Items[Index]?.secret}_b.jpg`} alt={Items[Index]?.title} />
			</Modal>
		</>
	);
}

export default Gallery;
