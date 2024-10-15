import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import BookPage from '../pages/BookPage';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import WishlistPage from '../pages/WishlistPage';

const AppRoutes = () => {
	return (
		<>
			<Routes>
				<Route element={<MainLayout />}>
					<Route path="/" element={<HomePage />} />
					<Route path="/wishlist" element={<WishlistPage />} />
					<Route path="/book/:id" element={<BookPage />} />
				</Route>

				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</>
	);
};
export default AppRoutes;
