import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { actions } from '../../actions';
import { useWishlist } from '../../hooks/useWishlist';
import { booksReducer, initialState } from '../../reducer/booksReducer';
import BookCard from './BookCard';

const Books = () => {
	const [search] = useOutletContext();
	const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
	const [state, dispatch] = useReducer(booksReducer, initialState);
	const [page, setPage] = useState(1); // Track the current page
	const totalPages = state?.books?.count
		? Math.ceil(state.books.count / state.books.results.length)
		: 1;
	const [displayBook, setDisplayBook] = useState([]);

	// Fetch books based on the current page
	useEffect(() => {
		const getBooks = async () => {
			// Check if the data for the current page is already in cache
			if (state.cache[page]) {
				// Serve data from cache
				dispatch({
					type: actions.books.DATA_FETCHED,
					data: state.cache[page],
				});
			} else {
				// Fetch data from the API
				dispatch({ type: actions.books.DATA_FETCHING });
				try {
					const res = await axios.get(
						`https://gutendex.com/books/?page=${page}`
					);
					if (res.status === 200) {
						dispatch({
							type: actions.books.DATA_FETCHED,
							data: res.data,
							page, // pass the page number to cache it
						});
					}
				} catch (error) {
					console.error(error);
					dispatch({
						type: actions.books.DATA_FETCH_ERROR,
						error: error.message,
					});
				}
			}
		};

		getBooks();
	}, [page, state.cache]);

	// Filter books based on the search query
	useEffect(() => {
		const filterBooks = (title) => {
			if (title) {
				const filteredBooks = state?.books?.results.filter((book) =>
					book.title.toLowerCase().includes(title.toLowerCase())
				);
				setDisplayBook(filteredBooks);
			} else {
				setDisplayBook(state?.books?.results || []);
			}
		};

		filterBooks(search);
	}, [search, state?.books?.results]);

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
				{displayBook.length > 0
					? displayBook.map((book) => (
							<BookCard
								key={book.id}
								book={book}
								isInWishlist={wishlist.some((item) => item.id === book.id)}
								addToWishlist={() => addToWishlist(book)}
								removeFromWishlist={() => removeFromWishlist(book.id)}
							/>
					  ))
					: state?.books?.results?.map((book) => (
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
					className={`px-4 py-2 rounded bg-blue-500 text-white ${
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
					className={`px-4 py-2 rounded bg-blue-500 text-white ${
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
