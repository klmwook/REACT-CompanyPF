import { useEffect, useState } from 'react';
import Layout from '../common/Layout';
import axios from 'axios';

function Department() {
	const [Members, setMembers] = useState([]);

	//최초의 데이터를 가져와야 되기 때문에 useEffect를 사용
	useEffect(() => {
		axios.get(`${process.env.PUBLIC_URL}/DB/members.json`).then((data) => {
			console.log(data);
			setMembers(data.data.members);
		});
	}, []);

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
