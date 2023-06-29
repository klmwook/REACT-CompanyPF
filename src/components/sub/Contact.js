import { useEffect, useRef, useState } from 'react';
import Layout from '../common/Layout';

function Contact() {
	const [Traffic, setTraffic] = useState(false);

	//지도가 들어갈 프레임도 가상요소 참조를 위해 useRef로 참조 객체 생성
	const container = useRef(null);
	//일반 HTML 버전과는 달리 윈도우 객체에서 직접 Kakao 상위 객체값을 뽑아옴
	const { kakao } = window;
	const option = {
		center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
		level: 3, // 지도의 확대 레벨
	};

	//카카오 맵 연결 해보기~
	useEffect(() => {
		const mapInstance = new kakao.maps.Map(container.current, option);

		//인스턴스 호출 구문은 Component Mount 이후에 호출
		const imgSrc = `${process.env.PUBLIC_URL}/img/marker1.png`;
		const imgSize = new kakao.maps.Size(232, 99);
		const imgOption = { offset: new kakao.maps.Point(116, 99) };
		const markerImg = new kakao.maps.MarkerImage(imgSrc, imgSize, imgOption);

		const marker = new kakao.maps.Marker({
			position: option.center,
			image: markerImg,
		});

		Traffic ? mapInstance.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC) : mapInstance.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);

		marker.setMap(mapInstance);
	}, [Traffic]);

	return (
		<Layout name={'Contact'}>
			<div id='map' ref={container}></div>
			<button onClick={() => setTraffic(!Traffic)}>{Traffic ? '교통정보 off' : '교통정보 on'}</button>
		</Layout>
	);
}

export default Contact;
