import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import MultiSelectDropdown from '../MultipleSelectDropdown';
import NavItem from './NavItem';

const navItem = [
	{ to: '/', title: 'Home' },
	{ to: '/wishlist', title: 'Wishlist' },
];

const NavBar = ({ handleSearch, handleCategory }) => {
	let location = useLocation();

	const navRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	const handleNavItemClick = () => {
		if (isOpen) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (navRef.current && !navRef.current.contains(event.target) && isOpen) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<nav ref={navRef} className="sticky top-0 z-40 bg-white shadow-lg">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<NavLink
					to="/"
					className="w-24 h-12 overflow-hidden flex justify-center items-center"
				>
					<img src="/assets/IconBook.svg" alt="icon" />
				</NavLink>

				<button
					type="button"
					className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-900 rounded-lg md:hidden "
					aria-expanded={isOpen}
					onClick={handleToggle}
				>
					<img src="/assets/IconMenu.svg" alt="icon" />
				</button>
				<div
					className={`w-full md:block md:w-auto ${isOpen ? 'block' : 'hidden'}`}
				>
					<ul className="font-medium flex flex-col items-center p-4 max-md:gap-3 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-4 md:mt-0 md:border-0 md:bg-white ">
						{location.pathname === '/wishlist' || (
							<div className="">
								<MultiSelectDropdown handleCategory={handleCategory} />
							</div>
						)}
						<input
							onChange={(e) => handleSearch(e)}
							type="search"
							placeholder="Search by title..."
							className="max-md:w-full border-2 pl-2 pr-1 py-1 rounded-md outline-none focus:border-1 focus:border-gray-600"
						/>
						{navItem.map((item, index) => (
							<NavItem key={index} to={item.to} onClick={handleNavItemClick}>
								{item.title}
							</NavItem>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
