//font awesome을 사용하기 위한 import
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//Link - 기본 링크 기능
//NavLink - 기본 링크 기능 + 활성화 기능
import { Link, NavLink } from 'react-router-dom';
import { useRef, memo } from 'react';

function Header({ type, menu }) {
	const toggleMenu = useRef(null);
	const active = 'on';

	return (
		//props로 전달되는 type값을 header의 class 명으로 지정해서 스타일 분기 처리
		<>
			<header className={type}>
				<h1>
					<Link to='/'>LOGO</Link>
				</h1>

				<ul id='gnb'>
					<li>
						<NavLink to='/department' activeClassName={active}>
							Department
						</NavLink>
					</li>
					<li>
						<NavLink to='/community' activeClassName={active}>
							Community
						</NavLink>
					</li>
					<li>
						<NavLink to='/gallery' activeClassName={active}>
							Gallery
						</NavLink>
					</li>
					<li>
						<NavLink to='/youtube' activeClassName={active}>
							Youtube
						</NavLink>
					</li>
					<li>
						<NavLink to='/contact' activeClassName={active}>
							Contact
						</NavLink>
					</li>
					<li>
						<NavLink to='/member' activeClassName={active}>
							Member
						</NavLink>
					</li>
				</ul>

				<FontAwesomeIcon
					icon={faBars}
					onClick={() => {
						menu.current.toggle();
					}}
				/>
			</header>
		</>
	);
}

export default memo(Header);
