import { memo } from 'react';
import { useSelector } from 'react-redux';

function Vids() {
	const Vids = useSelector((store) => store.youtube.data);
	console.log(Vids);

	return (
		<section id='vids' className='myScroll'>
			{Vids.map((vid, idx) => {
				if (idx >= 5) return null;

				return (
					<acticle key={idx}>
						<div className='pic'>
							<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
						</div>
					</acticle>
				);
			})}
		</section>
	);
}

export default memo(Vids);
