import { useEffect, useRef, useState } from 'react';
import Layout from '../common/Layout';

function Contact() {
	const [Traffic, setTraffic] = useState(false);
	const [Location, setLocation] = useState(null);

	//지도가 들어갈 프레임도 가상요소 참조를 위해 useRef로 참조 객체 생성
	const container = useRef(null);
	//일반 HTML 버전과는 달리 윈도우 객체에서 직접 Kakao 상위 객체값을 뽑아옴
	const { kakao } = window;

	const info = [
		{
			title: '삼성역 코엑스',
			latlng: new kakao.maps.LatLng(37.51100661425726, 127.06162026853143),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '넥슨 본사',
			latlng: new kakao.maps.LatLng(37.40211707077346, 127.10344953763003),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '서울 시청',
			latlng: new kakao.maps.LatLng(37.5662952, 126.9779451),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
	];

	const option = {
		center: info[0].latlng, // 지도의 중심좌표
		level: 3, // 지도의 확대 레벨
	};

	//아래 5개 변수값들은 useEffect구문에서 인스턴스 생성할때만 필요한 정보값에 불과하므로 미리 읽히도록 useEffect바깥에 배치
	const imgSrc = info[0].imgSrc;
	const imgSize = info[0].imgSize;
	const imgPos = info[0].imgPos;
	const markerImg = new kakao.maps.MarkerImage(imgSrc, imgSize, imgPos);
	const marker = new kakao.maps.Marker({ position: option.center, image: markerImg });

	//카카오 맵 연결 해보기~
	//인스턴스 호출 구문은 Component Mount 이후에 호출
	useEffect(() => {
		const mapInstance = new kakao.maps.Map(container.current, option);

		marker.setMap(mapInstance);
		//지역변수인 mapInstance값을 다른함수에도 활용해야 되므로 Location state에 해당 인스턴스 값 저장
		setLocation(mapInstance);
	}, []);

	useEffect(() => {
		//Location State에 담겨있는 맵 인스턴스로부터 traffic 레이어 호출 구문 처리 (Traffic state가 변경 될 때 마다)
		//첫 렌더링 사이클에서는 Location 값이 null이므로 Option Chaining을 활용해서 해당 값이 담기는 두번째 랜더링 사이클로부터 동작하도록 처리
		Traffic ? Location?.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC) : Location?.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	return (
		<Layout name={'Contact'}>
			<div id='map' ref={container}></div>
			<button onClick={() => setTraffic(!Traffic)}>{Traffic ? '교통정보 off' : '교통정보 on'}</button>
		</Layout>
	);
}

export default Contact;
