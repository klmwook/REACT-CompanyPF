import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../common/Layout';

function Department() {
	const Members = useSelector((store) => store.memberReducer.members);

	return (
		<Layout name={'Department'} txt={'hello-World'}>
			{Members.map((member, idx) => {
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
