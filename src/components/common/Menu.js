/*
--Redux-toolkit으로 client State 전역 관리하는 작업 순서--
	{open : false} false면 메뉴 제거 / true면 메뉴 오픈
	menuSlice.js를 만들어서 위의 정보값을 초기 전역 state로 등록
	reducer에는 해당 전역 state 값을 변경해주는 함수를 등록
	해당 함수를 원하는 컴포넌트에서 자유롭게 호출해서 전역 state 변경 하도록 
*/
import { close } from '../../redux/meneSlice';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';

function Menu() {
	const dispatch = useDispatch();
	const active = { color: 'aqua' };
	const menu = useSelector((store) => store.menu.open);

	return (
		<AnimatePresence>
			{menu && (
				<motion.nav
					id='mobilePanel'
					initial={{ opacity: 0, x: -200 }}
					animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
					exit={{ opacity: 0, x: -200, transition: { duration: 0.5 } }}
					onClick={() => dispatch(close())}
				>
					<h1>
						<Link to='/'>LOGO</Link>
					</h1>

					<ul id='gnbMo'>
						<li>
							<NavLink to='/department' activeStyle={active}>
								Department
							</NavLink>
						</li>
						<li>
							<NavLink to='/community' activeStyle={active}>
								Community
							</NavLink>
						</li>
						<li>
							<NavLink to='/gallery' activeStyle={active}>
								Gallery
							</NavLink>
						</li>
						<li>
							<NavLink to='/youtube' activeStyle={active}>
								Youtube
							</NavLink>
						</li>
						<li>
							<NavLink to='/contact' activeStyle={active}>
								Contact
							</NavLink>
						</li>
						<li>
							<NavLink to='/member' activeStyle={active}>
								Member
							</NavLink>
						</li>
					</ul>
				</motion.nav>
			)}
		</AnimatePresence>
	);
}

export default Menu;
