import BookCard from '../components/Books/BookCard';
import { useWishlist } from '../hooks/useWishlist';

const WishlistPage = () => {
	const { wishlist, removeFromWishlist } = useWishlist();

	return (
		<div className="container flex flex-wrap justify-center gap-8">
			{wishlist.length > 0 ? (
				wishlist.map((book) => (
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
