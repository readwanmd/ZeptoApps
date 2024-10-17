import axios from 'axios';
import { useEffect, useMemo, useReducer, useState } from 'react';
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

	useEffect(() => {
		const getBooks = async () => {
			dispatch({ type: actions.books.DATA_FETCHING });
			try {
				let url = `https://gutendex.com/books/?page=${page}`;

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
	}, [page, categories]);

	// Filter books on search term
	const filteredBooks = useMemo(() => {
		if (!search) return state?.books?.results || [];

		return (state?.books?.results || []).filter(
			(book) =>
				book.title.toLowerCase().includes(search.toLowerCase()) ||
				book.authors.some((author) =>
					author.name.toLowerCase().includes(search.toLowerCase())
				)
		);
	}, [state?.books?.results, search]);

	const totalPages = useMemo(() => {
		const totalItems = search ? filteredBooks.length : state?.books?.count || 0;
		const itemsPerPage = state?.books?.results?.length || 1;
		return Math.ceil(totalItems / itemsPerPage);
	}, [state?.books, filteredBooks, search]);

	const handlePrevious = () => {
		if (page > 1) {
			setPage((prevPage) => prevPage - 1);
		}
	};

	const handleNext = () => {
		if (page < totalPages) {
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
				{filteredBooks.length > 0 ? (
					filteredBooks.map((book) => (
						<BookCard
							key={book.id}
							book={book}
							isInWishlist={wishlist.some((item) => item.id === book.id)}
							addToWishlist={() => addToWishlist(book)}
							removeFromWishlist={() => removeFromWishlist(book.id)}
						/>
					))
				) : (
					<div className="text-center mt-8 text-xl">No books found</div>
				)}
			</div>

			{/* Pagination */}
			{filteredBooks.length > 0 && (
				<div className="flex justify-center mt-8 space-x-4">
					<button
						onClick={handlePrevious}
						disabled={page === 1}
						className={`px-4 py-2 rounded bg-blue-600 text-white ${
							page === 1 ? 'opacity-50 cursor-not-allowed' : ''
						}`}
					>
						Previous
					</button>
					<span className="px-4 py-2 text-gray-700">
						Page {page} of {totalPages}
					</span>
					<button
						onClick={handleNext}
						disabled={page >= totalPages}
						className={`px-4 py-2 rounded bg-blue-600 text-white ${
							page >= totalPages ? 'opacity-50 cursor-not-allowed' : ''
						}`}
					>
						Next
					</button>
				</div>
			)}
		</div>
	);
};

export default Books;
