import { useEffect, useMemo, useRef, useState } from 'react';
import Layout from '../common/Layout';
import emailjs from '@emailjs/browser';

function Contact() {
	const [Traffic, setTraffic] = useState(false);
	const [Location, setLocation] = useState(null);
	const [Index, setIndex] = useState(0);
	const container = useRef(null); //지도가 들어갈 프레임도 가상요소 참조를 위해 useRef로 참조 객체 생성
	const { kakao } = window; //일반 HTML 버전과는 달리 윈도우 객체에서 직접 Kakao 상위 객체값을 뽑아옴

	const infos = useRef([
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
	]);

	//아래 5개 변수값들은 useEffect구문에서 인스턴스 생성할때만 필요한 정보값에 불과하므로 미리 읽히도록 useEffect바깥에 배치

	const marker = useMemo(() => {
		return new kakao.maps.Marker({
			position: infos.current[Index].latlng,
			image: new kakao.maps.MarkerImage(infos.current[Index].imgSrc, infos.current[Index].imgSize, infos.current[Index].imgPos),
		});
	}, [Index, kakao]);

	//카카오 맵 연결 해보기~
	//인스턴스 호출 구문은 Component Mount 이후에 호출
	useEffect(() => {
		container.current.innerHTML = '';
		const mapInstance = new kakao.maps.Map(container.current, {
			center: infos.current[Index].latlng, // 지도의 중심좌표
			level: 3, // 지도의 확대 레벨
		});
		marker.setMap(mapInstance);

		//지도영역에 휠 기능 비활성화
		mapInstance.setZoomable(false);
		mapInstance.addControl(new kakao.maps.MapTypeControl(), kakao.maps.ControlPosition.TOPRIGHT);
		mapInstance.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);
		//지역변수인 mapInstance값을 다른함수에도 활용해야 되므로 Location state에 해당 인스턴스 값 저장
		setLocation(mapInstance);

		const setCenter = () => {
			//setCenter가 호출 시 내부적으로 Index state값에 의존하고 있기 때문에
			//useEffect 안쪽에서 setCenter 함수를 정의하고 호출
			mapInstance.setCenter(infos.current[Index].latlng);
		};

		window.addEventListener('resize', setCenter);

		return () => window.removeEventListener('resize', setCenter);
	}, [Index, kakao, marker]);

	useEffect(() => {
		//Location State에 담겨있는 맵 인스턴스로부터 traffic 레이어 호출 구문 처리 (Traffic state가 변경 될 때 마다)
		//첫 렌더링 사이클에서는 Location 값이 null이므로 Option Chaining을 활용해서 해당 값이 담기는 두번째 랜더링 사이클로부터 동작하도록 처리
		Traffic ? Location?.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC) : Location?.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic, Location, kakao]);

	//이메일 전송 부분
	const [Success, setSuccess] = useState(false);
	const inputName = useRef();
	const inputEmail = useRef();
	const inputMsg = useRef();
	const form = useRef();

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs.sendForm('service_xvbck36', 'template_5lrdzsn', form.current, 'DuVGSRIP4uXIG234N').then(
			(result) => {
				console.log(result.text);
				setSuccess(true);
				inputName.current.value = '';
				inputEmail.current.value = '';
				inputMsg.current.value = '';
			},
			(error) => {
				console.log(error.text);
				setSuccess(false);
			}
		);
	};

	return (
		<Layout name={'Contact'} bg={'Location.jpg'}>
			<div id='map' ref={container}></div>
			<button onClick={() => setTraffic(!Traffic)}>{Traffic ? '교통정보 off' : '교통정보 on'}</button>
			<ul className='branch'>
				{infos.current.map((info, idx) => {
					return (
						<li key={idx} onClick={() => setIndex(idx)} className={Index === idx ? 'on' : ''}>
							{info.title}
						</li>
					);
				})}
			</ul>

			<div id='formBox'>
				<form ref={form} onSubmit={sendEmail}>
					<input type='hidden' name='to_name' value='taewook' />
					<label>Name</label>
					<input type='text' name='from_name' ref={inputName} />
					<label>Email</label>
					<input type='email' name='reply_to' ref={inputEmail} />
					<label>Message</label>
					<textarea name='message' ref={inputMsg} />
					<input type='submit' value='Send' />
				</form>
			</div>
			{Success && '메일이 성공적으로 발송되었습니다.'}
		</Layout>
	);
}

export default Contact;
