const Footer = () => {
	const date = new Date();
	return (
		<section className="mt-8 bg-blue-600 text-white">
			<div className="container flex justify-center gap-2 py-3 text-center">
				<span>©️ All right reserved</span>
				<span>
					<img
						className="invert"
						src="/public/assets/IconBook.svg"
						alt="logo"
					/>
				</span>{' '}
				<span>{date.getFullYear()}</span>
			</div>
		</section>
	);
};
export default Footer;
