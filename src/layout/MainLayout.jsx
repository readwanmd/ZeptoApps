import { Outlet } from 'react-router-dom';
import { Footer, NavBar, ScrollTop } from '../components';

const MainLayout = () => {
	return (
		<main>
			<NavBar />

			<Outlet />

			<ScrollTop />
			<Footer />
		</main>
	);
};
export default MainLayout;
