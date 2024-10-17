import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar, ScrollTop } from '../components';

const MainLayout = () => {
	const [search, setSearch] = useState('');
	const [categories, setCategories] = useState(null);
	const [book, setBook] = useState(null);

	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

	const handleCategory = (data) => {
		setCategories(data);
	};

	return (
		<main>
			<NavBar handleSearch={handleSearch} handleCategory={handleCategory} />

			<Outlet context={[search, categories, book, setBook]} />

			<ScrollTop />
			{/* <Footer /> */}
		</main>
	);
};
export default MainLayout;
