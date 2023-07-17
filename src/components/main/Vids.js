import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function Vids() {
	const Vids = useSelector((store) => store.youtube.data);
	console.log(Vids);

	return (
		<section id='vids' className='myScroll'>
			<Swiper
				modules={[Autoplay, Pagination, Navigation]}
				loop={true}
				spaceBetween={30}
				slidesPerView={1}
				centeredSlides={true}
				autoplay={{ delay: 2000, disableOnInteraction: true }}
				pagination={{ clickable: true }}
				navigation={true}
				breakpoints={{
					1200: {
						slidesPerView: 3,
						spaceBetween: 50,
					},
				}}
			>
				{Vids.map((vid, idx) => {
					if (idx >= 5) return null;

					return (
						<SwiperSlide key={idx}>
							<div className='inner'>
								<div className='pic'>
									<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
								</div>
								<h2>{vid.snippet.title.length >= 30 ? vid.snippet.title.substr(0, 30) + '...' : vid.snippet.title}</h2>
								<p>{vid.snippet.description.length >= 100 ? vid.snippet.description.substr(0, 100) + '...' : vid.snippet.description}</p>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</section>
	);
}

export default memo(Vids);
