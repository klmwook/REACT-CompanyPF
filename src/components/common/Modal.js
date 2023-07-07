import { forwardRef, useState, useEffect, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

//forwordRef - 자식 컴포넌트 요소를 호출하는 부모 컴포넌트에 역으로 참조해서 전달
const Modal = forwardRef((props, ref) => {
	const [Open, setOpen] = useState(false);

	//자식 컴포넌트가 아닌 특정 커스텀 객체를 부모로 전달
	useImperativeHandle(ref, () => {
		return { Open: () => setOpen(true) };
	});

	useEffect(() => {
		Open ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto');
	}, [Open]);

	return (
		<AnimatePresence>
			{Open && (
				// 모션은 걸고 싶은 컴포넌트에 motion.지정 initial(모션시작), animate(모션완료), exit(사라지는 모션) 속성 지정
				//x(가로축), y(세로축), rotate(회전), scale(확대축소)
				<motion.aside
					className='modal'
					initial={{ opacity: 0, x: '100%' }}
					animate={{ opacity: 1, x: '0%', transition: { duration: 0.5 } }}
					exit={{ opacity: 0, scale: 0, transition: { duration: 0.5, delay: 0.5 } }}
				>
					<motion.div className='con' initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.5 } }} exit={{ opacity: 0, transition: { delay: 0 } }}>
						{props.children}
					</motion.div>
					<motion.span
						className='close'
						onClick={() => setOpen(false)}
						initial={{ opacity: 0, y: 100 }}
						animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } }}
						exit={{ opacity: 0, x: -100, transition: { duration: 0.5, delay: 0 } }}
					>
						close
					</motion.span>
				</motion.aside>
			)}
		</AnimatePresence>
	);
});

export default Modal;
