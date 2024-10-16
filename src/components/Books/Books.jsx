import data from '../../data/data.json';
import { useWishlist } from '../../hooks/useWishlist';

import BookCard from './BookCard';

const Books = () => {
	const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

	return (
		<div className="container flex flex-wrap justify-center gap-8">
			{data.results.length > 0 &&
				data.results.map((book) => (
					<BookCard
						key={book.id}
						book={book}
						isInWishlist={wishlist.includes(book.id)}
						addToWishlist={() => addToWishlist(book.id)}
						removeFromWishlist={() => removeFromWishlist(book.id)}
					/>
				))}
		</div>
	);
};

export default Books;
