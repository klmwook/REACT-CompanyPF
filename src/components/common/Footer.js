import { useSelector } from 'react-redux';

function Footer() {
	const Department = useSelector((store) => store.departmentReducer.department);

	return (
		<footer>
			<h1>DCODELAB</h1>
			<p>2023 DCODELAB &copy; ALL RIGHTS RESERVED.</p>
			<p>{`This Company was founded by ${Department[0]?.name} in 1995`}</p>
		</footer>
	);
}

export default Footer;
