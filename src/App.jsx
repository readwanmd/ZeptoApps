import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes/AppRoutes';

const App = () => {
	return (
		<>
			<BrowserRouter>
				<AppRoutes />
			</BrowserRouter>

			<ToastContainer
				position="top-right"
				autoClose={1500}
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
