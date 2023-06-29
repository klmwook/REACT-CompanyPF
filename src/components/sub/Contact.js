import { useEffect, useRef } from 'react';
import Layout from '../common/Layout';

function Contact() {
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
		//인스턴스 호출 구문은 Component Mount 이후에 호출
		new kakao.maps.Map(container.current, option);
	});

	return (
		<Layout name={'Contact'}>
			<div id='map' ref={container}></div>
		</Layout>
	);
}

export default Contact;
