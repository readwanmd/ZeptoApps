import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const useWishlist = () => {
	const [wishlist, setWishlist] = useState(() => {
		const storedWishlist = localStorage.getItem('wishlist');
		return storedWishlist ? JSON.parse(storedWishlist) : [];
	});

	// Update localStorage whenever wishlist changes
	useEffect(() => {
		localStorage.setItem('wishlist', JSON.stringify(wishlist));
	}, [wishlist]);

	// Add item to wishlist
	const addToWishlist = (id) => {
		if (!wishlist.includes(id)) {
			setWishlist((prevWishlist) => [...prevWishlist, id]);
			toast.success(`Book with id ${id} added to wishlist.`);
		}
	};

	// Remove item from wishlist
	const removeFromWishlist = (id) => {
		setWishlist((prevWishlist) =>
			prevWishlist.filter((itemId) => itemId !== id)
		);
		toast.error(`Book with id ${id} removed from wishlist.`);
	};

	return { wishlist, addToWishlist, removeFromWishlist };
};
