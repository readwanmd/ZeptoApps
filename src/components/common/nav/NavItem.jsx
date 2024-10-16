import { NavLink } from 'react-router-dom';

const NavItem = ({ to, children, onClick }) => (
	<li>
		<NavLink
			to={to}
			onClick={onClick}
			className={({ isActive }) =>
				`block py-1 px-4 rounded font-bold ${
					isActive ? 'bg-blue-700 text-white  ' : ''
				}`
			}
		>
			{children}
		</NavLink>
	</li>
);

export default NavItem;
