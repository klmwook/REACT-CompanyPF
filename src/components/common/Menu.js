import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';

const Menu = forwardRef((props, ref) => {
	const active = { color: 'aqua' };
	const [Open, setOpen] = useState(false);

	useImperativeHandle(ref, () => {
		return { toggle: () => setOpen(!Open) };
	});

	//이 부분은 계속 가지고 있기 때문에 굳이 remove 함수로 변경 하지 않아도 된다
	useEffect(() => {
		window.addEventListener('resize', () => {
			if (window.innerWidth >= 1200) setOpen(false);
		});
	}, []);

	return (
		<AnimatePresence>
			{Open && (
				<motion.nav id='mobilePanel' initial={{ opacity: 0, x: -200 }} animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }} exit={{ opacity: 0, x: -200, transition: { duration: 0.5 } }}>
					<h1 onClick={() => setOpen(false)}>
						<Link to='/'>LOGO</Link>
					</h1>

					<ul id='gnbMo' onClick={() => setOpen(false)}>
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
});

export default Menu;
