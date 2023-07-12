import Layout from '../common/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { setMembers } from '../../redux/action';

function Department() {
	const Members = useSelector((store) => store.memberReducer.members);
	//dispatch를 사용하기 위해서는 꼭 이런식으로 한번 해줘야지 쓸 수 있다.
	const dispatch = useDispatch();

	return (
		<Layout name={'Department'} txt={'hello-World'}>
			<button
				onClick={() => {
					//버튼 클릭 시 기존 State 값을 Deep copy
					const newMembers = [...Members];
					//Deep copy 된 참조형 자료 State 정보값을 변경 후
					newMembers[0].name = 'Emma';
					//action 생성 함수의 인수로 넣어 새로운 액션 객체 생성
					const newAction = setMembers(newMembers);
					console.log(newAction);
					//그렇게 만들어진 액션 객체를 dispatch를 통해 리듀서에 전달
					//dispatch를 하지 않으면 데이터만 변경되고 데이터가 화면에 변경 되지 않는다.
					dispatch(newAction);
				}}
			>
				멤버 데이터 변경
			</button>
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
