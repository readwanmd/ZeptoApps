import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import BookCard from '../components/Books/BookCard';
import { useWishlist } from '../hooks/useWishlist';

const WishlistPage = () => {
	const { wishlist, removeFromWishlist } = useWishlist();
	const [search] = useOutletContext();
	const [displayBook, setDisplayBook] = useState([]);

	// Filter books based on the search query
	useEffect(() => {
		const filterBooks = (title) => {
			if (title) {
				const filteredBooks = wishlist.filter((book) =>
					book.title.toLowerCase().includes(title.toLowerCase())
				);
				setDisplayBook(filteredBooks);
			} else {
				setDisplayBook(wishlist || []);
			}
		};

		filterBooks(search);
	}, [wishlist, search]);

	return (
		<div className="container flex flex-wrap justify-center gap-8 mt-8">
			{displayBook.length > 0 ? (
				displayBook.map((book) => (
					<BookCard
						key={book.id}
						book={book}
						isInWishlist={wishlist.some((item) => item.id === book.id)}
						addToWishlist={() => {
							return;
						}}
						removeFromWishlist={() => removeFromWishlist(book.id)}
					/>
				))
			) : (
				<p>No books in your wishlist.</p>
			)}
		</div>
	);
};

export default WishlistPage;
