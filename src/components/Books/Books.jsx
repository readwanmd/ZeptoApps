import { useEffect, useState } from 'react';
import data from '../../data/data.json';
import BookCard from './BookCard';

const Books = () => {
	const [wishlist, setWishlist] = useState(() => {
		const storedWishlist = localStorage.getItem('wishlist');
		return storedWishlist ? JSON.parse(storedWishlist) : [];
	});

	useEffect(() => {
		localStorage.setItem('wishlist', JSON.stringify(wishlist));
	}, [wishlist]);

	const addToWishlist = (id) => {
		console.log('Adding to wishlist:', id);
		console.log('Current wishlist:', wishlist);
		if (!wishlist.includes(id)) {
			setWishlist((prevWishlist) => [...prevWishlist, id]);
		}
	};

	const removeFromWishlist = (id) => {
		console.log('Removing from wishlist:', id);
		console.log('Current wishlist:', wishlist);
		setWishlist((prevWishlist) =>
			prevWishlist.filter((itemId) => itemId !== id)
		);
	};

	console.log('Wishlist state:', wishlist);
	console.log('Sample book ID:', data.results[0]?.id);

	return (
		<div className="container flex flex-wrap justify-center gap-8">
			{data.results.length &&
				data.results.map((book) => (
					<BookCard
						key={book.id}
						book={book}
						wishlist={wishlist}
						addToWishlist={addToWishlist}
						removeFromWishlist={removeFromWishlist}
					/>
				))}
		</div>
	);
};

export default Books;
