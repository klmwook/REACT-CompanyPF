import { memo } from 'react';
import { UseSelector, useSelector } from 'react-redux';

function Vids() {
	const youtube = useSelector((store) => store.youtubeReducer.youtube);

	return (
		<section id='vids' className='myScroll'>
			{youtube.map((vid, idx) => {
				if (idx >= 4) return null;
				return <img src={vid.snippet.thumbnails.medium.url} alt={vid.snippet.title} key={idx} />;
			})}
		</section>
	);
}

export default memo(Vids);
