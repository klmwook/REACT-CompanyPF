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

	//처음 마운트되었는지 확인하가 위한 정보값
	const firstLoaded = useRef(true);

	const [Loader, setLoader] = useState(true);
	const [Index, setIndex] = useState(0);

	//초기 Opt State에 내 계정 정보 등록 : 해당 페이지 새로고침시 myGallery를 Default로 출력하기 위함
	const [Opt, setOpt] = useState({ type: 'user', user: '198489363@N07' });

	//이벤트 발생 시 각각 interest , mine , search , useGallery 호출 할 때마다 기존 데이터 사라지게 하고 loading보이게 하는 공통 초기화 함수
	const resetGallery = (e) => {
		const btns = btnSet.current.querySelectorAll('button');
		btns.forEach((el) => el.classList.remove('on'));
		e.target.classList.add('on');
		enableEvent.current = false;
		setLoader(true);
		frame.current.classList.remove('on');
	};

	//Interest 방식 갤러리 호출 함수
	const showInterest = (e) => {
		//재이벤트, 모션중 재이벤트 방지
		if (!enableEvent.current) return;
		if (e.target.classList.contains('on')) return;

		//기존 갤러리 초기화 함수 호출
		resetGallery(e);

		//새로운 데이터로 갤러리 생성 함수 호출
		//Action 객체에 추가로 전달해야 될 옵션을 Opt State로 변경 처리
		setOpt({ type: 'interest' });
		isUser.current = false;
	};

	//MyGallery 호출 함수
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

	//검색 갤러리 호출 함수
	const showSearch = (e) => {
		const tag = searchInput.current.value.trim();
		if (tag === '') return alert('검색어를 입력하세요.');
		if (!enableEvent.current) return;

		resetGallery(e);
		setOpt({ type: 'search', tags: tag });
		searchInput.current.value = '';
	};

	//액션에 추가로 전달되야될 Opt 값이 변경될 때 마다 새롭게 액션 객체를 생성해서 리듀서에 전달
	useEffect(() => {
		dispathch({ type: types.FLICKR.start, opt: Opt });
	}, [Opt, dispathch]);

	//전역 스테이트 정보값이 변경이 될 때 마다 해당 구문 실행
	//다시 이벤트 기능 활성화, 이미지 로딩 이벤트 발생해서 이미지 소스 출력 완료 시 갤러리 보이게 처리, 버튼도 활성화
	useEffect(() => {
		console.log(Items);
		counter.current = 0;

		//처음 마운트가 된 상태가 아닐때에만 Items의 결과값이 없을때 경고창 출력
		if (Items.length === 0 && !firstLoaded.current) {
			setLoader(false);
			frame.current.classList.add('on');
			const btnMine = btnSet.current.children;
			btnMine[1].classList.add('on');
			setOpt({ type: 'user', user: '164021883@N04' });
			enableEvent.current = true;
			return alert('이미지 결과값이 없습니다.');
		}
		//처음 마운트이후 firstLoaded.current값을 false로 변경
		firstLoaded.current = false;

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
