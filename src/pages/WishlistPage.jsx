import BookCard from '../components/Books/BookCard';
import data from '../data/data.json';
import { useWishlist } from '../hooks/useWishlist';

const WishlistPage = () => {
	const { wishlist, removeFromWishlist } = useWishlist();

	// Filter data to only include books that are in the wishlist
	const wishlistData = data.results.filter((book) =>
		wishlist.includes(book.id)
	);

	return (
		<div className="container flex flex-wrap justify-center gap-8">
			{wishlistData.length > 0 ? (
				wishlistData.map((book) => (
					<BookCard
						key={book.id}
						book={book}
						isInWishlist={true}
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
