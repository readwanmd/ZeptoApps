import { Link } from 'react-router-dom';

const NotFoundPage = () => {
	return (
		<div className="container">
			<div className="w-full h-screen flex justify-center items-center flex-col text-center">
				<h4 className="text-4xl md:text-6xl font-semibold pb-8 text-blue-600">
					404 Not Found
				</h4>
				<p className="text-xl">The page is not exist!</p>

				<div className="mt-4">
					<p className="text-xl">Here are some helpful links instead</p>
					<div className="space-x-2 mt-2 text-lg">
						<Link to="/" className="underline">
							Home
						</Link>
						<Link to="/wishlist" className="underline">
							Wishlist
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
export default NotFoundPage;
