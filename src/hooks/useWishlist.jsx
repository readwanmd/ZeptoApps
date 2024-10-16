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

	// Add entire book object to wishlist
	const addToWishlist = (book) => {
		const isAlreadyInWishlist = wishlist.some((item) => item.id === book.id);

		if (!isAlreadyInWishlist) {
			setWishlist((prevWishlist) => [...prevWishlist, book]);
			toast.success(`"${book.title}" added to wishlist.`);
		}
	};

	// Remove item from wishlist by comparing book IDs
	const removeFromWishlist = (id) => {
		setWishlist((prevWishlist) =>
			prevWishlist.filter((book) => book.id !== id)
		);
		toast.error(`Book with id ${id} removed from wishlist.`);
	};

	return { wishlist, addToWishlist, removeFromWishlist };
};
