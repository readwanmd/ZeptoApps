import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './routes/AppRoutes';

const App = () => {
	useEffect(() => {
		toast.dark('API takes time to give response. Please Consider it.', {
			autoClose: 5000,
		});
	}, []);

	return (
		<>
			<BrowserRouter>
				<AppRoutes />
			</BrowserRouter>

			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={true}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</>
	);
};
export default App;
