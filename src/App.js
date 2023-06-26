import Footer from './components/common/Footer';
import Header from './components/common/Header';
import Visual from './components/main/Visual';
import Community from './components/sub/Community';
import Contact from './components/sub/Contact';
import Department from './components/sub/Department';
import Gallery from './components/sub/Gallery';
import Member from './components/sub/Member';
import Youtube from './components/sub/Youtube';

function App() {
	return (
		<>
			<Header />

			<Visual />
			<Department />
			<Community />
			<Gallery />
			<Youtube />
			<Contact />
			<Member />

			<Footer />
		</>
	);
}

export default App;
