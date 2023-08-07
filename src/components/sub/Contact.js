import Layout from '../common/Layout';
import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import { useThrottle } from '../../hooks/useThrottle';

function Contact() {
	const container = useRef(null);
	const form = useRef(null);
	const inputName = useRef(null);
	const inputEmail = useRef(null);
	const inputMsg = useRef(null);
	const [Traffic, setTraffic] = useState(false);
	const [Location, setLocation] = useState(null);
	const [Index, setIndex] = useState(0);
	const [Success, setSuccess] = useState(false);

	const { kakao } = window;
	const info = useRef([
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

	//marker의 정보값을 useMemo로 메모이제이션 해야 되는 이유
	//해당 정보값이 바뀌지않는 static한 값이 아니고 State에 의해서 계속 변경되는 값이기 때문에
	//내부에 index State값이 바뀔때마 임시로 메모이제이션을 풀기 위해서 useMemo에 Index State를 의존성 배열에 등록해야 되기 때문
	const marker = useMemo(() => {
		return new kakao.maps.Marker({
			position: info.current[Index].latlng,
			image: new kakao.maps.MarkerImage(info.current[Index].imgSrc, info.current[Index].imgSize, info.current[Index].imgPos),
		});
	}, [Index, kakao]);

	//폼메일 전송 함수
	const sendEmail = (e) => {
		e.preventDefault();

		emailjs.sendForm('service_4wnjvjd', 'template_651z7ig', form.current, '23g8RepczesqKPoIX').then(
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

	const setCenter = useCallback(() => {
		console.log('setCenter');
		Location?.setCenter(info.current[Index].latlng);
	}, [Index, Location]);

	//커스텀훅은 다른 hook안쪽에서 호출이 불가능하므로
	//useThrottle을 활용해야 되는 함수가 useEffect안쪽에 있다면
	//밖으로 꺼내서 useThrottle적용한다음 또다른 useEffect안쪽에서 이벤트 연결
	const setCenter2 = useThrottle(setCenter);

	useEffect(() => {
		container.current.innerHTML = '';
		const mapInstance = new kakao.maps.Map(container.current, { center: info.current[Index].latlng, level: 3 });
		marker.setMap(mapInstance);
		mapInstance.addControl(new kakao.maps.MapTypeControl(), kakao.maps.ControlPosition.TOPRIGHT);
		mapInstance.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);
		setLocation(mapInstance);

		//지도영역에 휠 기능 비활성화
		mapInstance.setZoomable(false);
	}, [kakao, Index, marker]);

	useEffect(() => {
		window.addEventListener('resize', setCenter2);
		return () => window.removeEventListener('resize', setCenter2);
	}, [setCenter2]);

	useEffect(() => {
		Traffic ? Location?.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC) : Location?.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic, Location, kakao]);

	return (
		<Layout name={'Contact'} bg={'Location.jpg'}>
			<div id='map' ref={container}></div>
			<button onClick={() => setTraffic(!Traffic)}>{Traffic ? 'Traffic ON' : 'Traffic OFF'}</button>

			<ul className='branch'>
				{info.current.map((el, idx) => {
					return (
						<li key={idx} onClick={() => setIndex(idx)} className={idx === Index ? 'on' : ''}>
							{el.title}
						</li>
					);
				})}
			</ul>

			<div id='formBox'>
				<form ref={form} onSubmit={sendEmail}>
					<label>Name</label>
					<input type='text' name='name' ref={inputName} />
					<label>Email</label>
					<input type='email' name='email' ref={inputEmail} />
					<label>Message</label>
					<textarea name='message' ref={inputMsg} />
					<input type='submit' value='Send' />
				</form>
				{Success && <p>메일이 성공적으로 발송되었습니다.</p>}
			</div>
		</Layout>
	);
}

export default Contact;
