function Layout({ name }) {
	return (
		<section className={`content ${name}`}>
			<figure></figure>

			<div className='inner'>
				<h1>{name}</h1>
			</div>
		</section>
	);
}

export default Layout;
