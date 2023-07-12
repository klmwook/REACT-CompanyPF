import { useSelector } from 'react-redux';

function Footer() {
	const Members = useSelector((store) => store.memberReducer.members);

	return (
		<footer>
			<h1>DCODELAB</h1>
			<p>2023 DCODELAB &copy; ALL RIGHTS RESERVED.</p>
			{/* 첫 렌더링 사이클에선 객체값이 없으므로 옵셔널 체이닝 처리 */}
			<p>{`This Institute was established by ${Members[0]?.name} in 1995`}</p>
		</footer>
	);
}

export default Footer;
