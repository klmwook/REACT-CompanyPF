import { useState, useEffect } from 'react';
import Layout from '../common/Layout';

function Member() {
	const initVal = {
		userid: '',
		pwd1: '',
		pwd2: '',
		email: '',
	};

	const [Val, setVal] = useState(initVal);

	//현재 입력하고 있는 input 요소의 name, value 값을 비구조화할당으로 뽑아서 출력
	const handleChange = (e) => {
		const { name, value } = e.target;
		//기존 초기 Val State 값을 deep copy해서 현재 입력하고 있는 항목의 name값과 value값으로 기존 State를 덮어쓰기 해서 변경 (불변성 유지)
		setVal({ ...Val, [name]: value });
	};

	const check = (value) => {
		//인수로 현재 State 값을 전달 받아서 항목별로 에러메세지를 객체로 반환하는 함수
		//반환되는 에러메시지가 있으면 인증 실패
		//반환되는 에러메시지가 없으면 인증 성공
		const errs = {};
		const eng = /[a-zA-Z]/;
		const num = /[0-9]/;
		const spc = /[~!@#$%^&*()_+]/;

		if (value.userid.length < 5) {
			errs.userid = '아이디를 5글자 이상 입력하세요.';
		}
		if (value.pwd1.length < 5 || !eng.test(value.pwd1) || !num.text(value.pwd1) || !spc.test(value.pwd1)) {
			errs.pwd1 = '비밀번호는 5글자 이상, 영문, 숫자, 특수문자를 모두 포함하세요.';
		}
		if (value.pwd1 !== value.pwd2 || !value.pwd2) {
			errs.pwd2 = '두개의 비밀번호를 동일하게 입력 하세요.';
		}
		if (value.email.length < 8 || !/@/.test(value.email)) {
			errs.email = '이메일 주소는 8글자 이상 @를 포함하세요.';
		}

		return errs;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('현재 State 값', Val);
		//check가 반호나하는 인증 메세지가 있으면 해당 메시지를 화면에 출력하고 전송 중지
		//그렇지 않으면 인증 성공
		console.log(check(Val));
	};

	useEffect(() => {
		console.log(Val);
	}, [Val]);

	return (
		<Layout name={'Member'}>
			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend className='h'>회원가입 폼 양식</legend>
					<table>
						<tbody>
							{/* user id */}
							<tr>
								<th scope='row'>
									<label htmlFor='userid'>USER ID</label>
								</th>
								<td>
									<input type='text' name='userid' id='userid' placeholder='아이디를  입력하세요.' onChange={handleChange} />
								</td>
							</tr>

							{/* password */}
							<tr>
								<th>
									<label htmlFor='pwd1'>PASSWORD</label>
								</th>
								<td>
									<input type='password' name='pwd1' id='pwd1' placeholder='비밀번호를 입력하세요' onChange={handleChange} />
								</td>
							</tr>

							{/* re password */}
							<tr>
								<th>
									<label htmlFor='pwd2'>RE-PASSWORD</label>
								</th>
								<td>
									<input type='password' name='pwd2' id='pwd2' placeholder='비밀번호를 재 입력하세요' onChange={handleChange} />
								</td>
							</tr>

							{/* e mail */}
							<tr>
								<th>
									<label htmlFor='email'>E-MAIL</label>
								</th>
								<td>
									<input type='text' name='email' id='email' placeholder='이메일 주소를 입력하세요' onChange={handleChange} />
								</td>
							</tr>

							{/* btn set */}
							<tr>
								<th colSpan='2'>
									<input type='reset' value='CANCEL' />
									<input type='submit' value='SEND' />
								</th>
							</tr>
						</tbody>
					</table>
				</fieldset>
			</form>
		</Layout>
	);
}

export default Member;
