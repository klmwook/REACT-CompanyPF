import { useState, useEffect } from 'react';

function News() {
	const dummy = [
		{ title: 'Hell1', content: 'come to the next level' },
		{ title: 'Hell2', content: 'come to the next level' },
		{ title: 'Hell3', content: 'come to the next level' },
		{ title: 'Hell4', content: 'come to the next level' },
		{ title: 'Hell5', content: 'come to the next level' },
		{ title: 'Hell6', content: 'come to the next level' },
	];

	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return dummy;
	};
	const [Posts] = useState(getLocalData());

	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Posts));
	}, []);

	return (
		<section id='news' className='myScroll'>
			{Posts.map((post, idx) => {
				if (idx >= 4) return null;
				return (
					<article key={idx}>
						<h3>{post.title}</h3>
						<p>{post.content}</p>
					</article>
				);
			})}
		</section>
	);
}

export default News;
