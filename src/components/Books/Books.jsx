import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { actions } from '../../actions';
import { useWishlist } from '../../hooks/useWishlist';
import { booksReducer, initialState } from '../../reducer/booksReducer';
import BookCard from './BookCard';

const Books = () => {
	const [search, categories] = useOutletContext();
	const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
	const [state, dispatch] = useReducer(booksReducer, initialState);
	const [page, setPage] = useState(1);
	const totalPages = state?.books?.count
		? Math.ceil(state.books.count / state.books.results.length)
		: 1;

	// Fetch books based on the current page, search, and categories
	useEffect(() => {
		const getBooks = async () => {
			dispatch({ type: actions.books.DATA_FETCHING });
			try {
				let url = `https://gutendex.com/books/?page=${page}`;

				// Add search query if present
				if (search) {
					url += `&search=${encodeURIComponent(search)}`;
				}

				// Add categories as topics if present
				if (categories && categories.length > 0) {
					categories.forEach((category) => {
						url += `&topic=${encodeURIComponent(category)}`;
					});
				}

				const res = await axios.get(url);
				if (res.status === 200) {
					dispatch({
						type: actions.books.DATA_FETCHED,
						data: res.data,
						page,
					});
				}
			} catch (error) {
				console.error(error);
				dispatch({
					type: actions.books.DATA_FETCH_ERROR,
					error: error.message,
				});
			}
		};

		getBooks();
	}, [page, search, categories]);

	// Pagination controls
	const handlePrevious = () => {
		if (state?.books?.previous !== null && page > 1) {
			setPage((prevPage) => prevPage - 1);
		}
	};

	const handleNext = () => {
		if (state.books && state.books.next !== null && page < totalPages) {
			setPage((prevPage) => prevPage + 1);
		}
	};

	if (state.loading) {
		return <div className="text-center mt-8">Loading...</div>;
	}

	if (state.error) {
		return <div className="text-center mt-8 text-red-500">{state.error}</div>;
	}

	return (
		<div className="container mx-auto">
			<div className="flex flex-wrap justify-center gap-8 mt-8">
				{state?.books?.results?.map((book) => (
					<BookCard
						key={book.id}
						book={book}
						isInWishlist={wishlist.some((item) => item.id === book.id)}
						addToWishlist={() => addToWishlist(book)}
						removeFromWishlist={() => removeFromWishlist(book.id)}
					/>
				))}
			</div>

			{/* Pagination */}
			<div className="flex justify-center mt-8 space-x-4">
				<button
					onClick={handlePrevious}
					disabled={state?.books?.previous === null}
					className={`px-4 py-2 rounded bg-blue-600 text-white ${
						state?.books?.previous === null
							? 'opacity-50 cursor-not-allowed'
							: ''
					}`}
				>
					Previous
				</button>
				<span className="px-4 py-2 text-gray-700">
					Page {page} of {totalPages}
				</span>
				<button
					onClick={handleNext}
					disabled={state?.books?.next === null || page >= totalPages}
					className={`px-4 py-2 rounded bg-blue-600 text-white ${
						state?.books?.next === null || page >= totalPages
							? 'opacity-50 cursor-not-allowed'
							: ''
					}`}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default Books;
