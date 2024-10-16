import { useEffect, useState } from 'react';
import BookCard from '../components/Books/BookCard';
import data from '../data/data.json';

const WishlistPage = () => {
	// Initialize wishlist from localStorage and parse it as an array
	const [wishlist, setWishlist] = useState(() => {
		const storedWishlist = localStorage.getItem('wishlist');
		return storedWishlist ? JSON.parse(storedWishlist) : [];
	});

	// Filter data to only include books that are in the wishlist
	const wishlistData = data.results.filter((book) =>
		wishlist.includes(book.id)
	);

	// Add item to wishlist
	const addToWishlist = (id) => {
		if (!wishlist.includes(id)) {
			setWishlist((prevWishlist) => [...prevWishlist, id]);
		}
	};

	// Remove item from wishlist
	const removeFromWishlist = (id) => {
		setWishlist((prevWishlist) =>
			prevWishlist.filter((itemId) => itemId !== id)
		);
	};

	// Update localStorage whenever wishlist changes
	useEffect(() => {
		localStorage.setItem('wishlist', JSON.stringify(wishlist));
	}, [wishlist]);

	return (
		<div className="container flex flex-wrap justify-center gap-8">
			{wishlistData.length > 0 ? (
				wishlistData.map((book) => (
					<BookCard
						key={book.id}
						book={book}
						wishlist={wishlist}
						addToWishlist={addToWishlist}
						removeFromWishlist={removeFromWishlist}
					/>
				))
			) : (
				<p>No books in your wishlist.</p>
			)}
		</div>
	);
};

export default WishlistPage;
