import { useDepartmentQuery } from '../../hooks/useDepartmentQuery';

function Footer() {
	const { data: Department, isSuccess } = useDepartmentQuery();
	return (
		<footer>
			<h1>DCODELAB</h1>
			<p>2023 DCODELAB &copy; ALL RIGHTS RESERVED.</p>
			<p>{`This Company was founded by ${isSuccess && Department[0]?.name} in 2023`}</p>
		</footer>
	);
}

export default Footer;
