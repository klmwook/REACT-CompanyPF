import { forwardRef, useState, useEffect, useImperativeHandle } from 'react';

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
		<>
			{Open && (
				<aside className='modal' ref={ref}>
					<div className='con'>{props.children}</div>
					<span className='close' onClick={() => setOpen(false)}>
						close
					</span>
				</aside>
			)}
		</>
	);
});

export default Modal;
