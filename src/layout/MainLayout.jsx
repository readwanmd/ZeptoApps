import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, NavBar, ScrollTop } from '../components';

const MainLayout = () => {
	const [search, setSearch] = useState('');

	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

	return (
		<main>
			<NavBar handleSearch={handleSearch} />

			<Outlet context={[search]} />

			<ScrollTop />
			<Footer />
		</main>
	);
};
export default MainLayout;

// const [count, setCount] = useOutletContext();
// const [count, setCount] = React.useState(0);
// return <Outlet context={[count, setCount]} />;
