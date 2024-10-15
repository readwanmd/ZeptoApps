import { Outlet } from 'react-router-dom';
import { Footer, Navbar, ScrollTop } from '../components';

const MainLayout = () => {
	return (
		<main>
			<Navbar />

			<Outlet />

			<ScrollTop />
			<Footer />
		</main>
	);
};
export default MainLayout;
