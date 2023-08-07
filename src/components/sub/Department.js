import Layout from '../common/Layout';
import { useEffect, useState } from 'react';
import { useDepartmentQuery } from '../../hooks/useDepartmentQuery';

function Department() {
	const [Mounted, setMounted] = useState(true);
	const { data: Members, isSuccess } = useDepartmentQuery();

	useEffect(() => {
		return () => setMounted(false);
	}, []);

	return (
		<Layout name={'Department'} txt={'Hello-World'} bg={'Department.jpg'}>
			{isSuccess &&
				Mounted &&
				Members.map((member, idx) => {
					return (
						<article key={idx}>
							<div className='pic'>
								<img src={`${process.env.PUBLIC_URL}/img/${member.pic}`} alt={member.name} />
								<img src={`${process.env.PUBLIC_URL}/img/${member.pic}`} alt={member.name} />
							</div>
							<h2>{member.name}</h2>
							<p>{member.position}</p>
						</article>
					);
				})}
		</Layout>
	);
}

export default Department;
