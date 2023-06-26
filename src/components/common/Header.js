//Link - 기본 링크 기능
//NavLink - 기본 링크 기능 + 활성화 기능
import { Link, NavLink } from 'react-router-dom';

function Header() {
	const active = 'on';

	return (
		<header>
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
		</header>
	);
}

export default Header;
