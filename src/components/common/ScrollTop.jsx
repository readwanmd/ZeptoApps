import { useEffect, useState } from 'react';

const ScrollTop = () => {
	const [showBackToTop, setShowBackToTop] = useState(false);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	useEffect(() => {
		const onPageScroll = () => {
			if (window.scrollY > 600) {
				setShowBackToTop(true);
			} else {
				setShowBackToTop(false);
			}
		};

		const debounce = (func, wait) => {
			let timeout;
			return (...args) => {
				clearTimeout(timeout);
				timeout = setTimeout(() => func(...args), wait);
			};
		};

		const debouncedScroll = debounce(onPageScroll, 100);

		window.addEventListener('scroll', debouncedScroll);

		return () => {
			window.removeEventListener('scroll', debouncedScroll);
		};
	}, []);

	return (
		<button
			onClick={scrollToTop}
			className={`scroll-top-button ${showBackToTop ? 'show' : ''}`}
		>
			<ScrollIcon />
		</button>
	);
};

const ScrollIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="#ffffff"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M16 12l-4 -4l-4 4" />
		<path d="M12 16v-8" />
		<path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
	</svg>
);

export default ScrollTop;
