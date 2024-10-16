import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { actions } from '../actions';

import Modal from '../components/common/Modal';
import { useWishlist } from '../hooks/useWishlist';
import { bookReducer, initialState } from '../reducer/bookReducer';

const BookPage = () => {
	let { id } = useParams();
	const [state, dispatch] = useReducer(bookReducer, initialState);
	const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
	const isInWishlist = wishlist.includes(Number(id));
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedBookId, setSelectedBookId] = useState(null);
	console.log({ wishlist });

	useEffect(() => {
		const getBook = async () => {
			dispatch({ type: actions.book.DATA_FETCHING });
			try {
				const res = await axios.get(`https://gutendex.com/books/${id}`);
				if (res.status === 200) {
					dispatch({
						type: actions.book.DATA_FETCHED,
						data: res.data,
					});
				}
			} catch (error) {
				console.error(error);
				dispatch({ type: actions.book.DATA_FETCH_ERROR, error: error.message });
			}
		};

		getBook();
	}, [id]);

	if (state.loading) {
		return (
			<div className="container my-8 flex justify-center">
				<p className="text-xl font-semibold">Loading book details...</p>
			</div>
		);
	}

	if (state.error) {
		return (
			<div className="container my-8 flex justify-center">
				<p className="text-red-600 text-xl font-semibold">
					Error: {state.error} - Failed to load book data.
				</p>
			</div>
		);
	}

	const { id: bookId, title, authors, subjects, formats } = state.book;
	console.log({ isInWishlist });

	const handleRemoveClick = (id) => {
		setSelectedBookId(Number(id));
		setIsModalOpen(true);
		console.log('Selected Book for removal:', id);
	};

	const confirmRemove = () => {
		console.log({ selectedBookId });

		removeFromWishlist(selectedBookId);
		setIsModalOpen(false);
	};

	return (
		<div className="container my-8 flex justify-center">
			<div className="max-w-3xl flex flex-col rounded-lg md:flex-row border-2 border-gray-400 shadow-md">
				<img
					className="h-96 w-full rounded-t-md object-cover md:h-auto md:w-48 md:!rounded-none md:!rounded-s-lg"
					src={formats && formats['image/jpeg']}
					alt="Book cover"
				/>
				<div className="flex flex-col justify-start p-6">
					<h5 className="mb-4 text-xl font-medium">{title}</h5>
					<p className="text-base">
						<span className="font-semibold">Book Id: </span>
						{bookId}
					</p>
					<p className="mb-4 text-base">
						<span className="font-semibold">By </span>
						{authors && authors.map((author) => author.name).join(', ')}
					</p>
					<div className="">
						{subjects &&
							subjects.slice(0, 3).map((subject, index) => (
								<span
									key={index}
									className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
								>
									#{subject.split(' -- ')[0]}
								</span>
							))}
					</div>

					<div className="mt-4">
						{isInWishlist ? (
							<button
								onClick={() => handleRemoveClick(id)}
								type="button"
								className="flex items-center gap-2 rounded bg-red-500 px-2 pb-2 pt-2.5 text-sm font-semibold leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out"
							>
								Remove from Wishlist
								<img
									src="/assets/heart_filled.svg"
									alt="Remove from wishlist"
								/>
							</button>
						) : (
							<button
								onClick={() => addToWishlist(bookId)}
								type="button"
								className="flex items-center gap-2 rounded bg-blue-700 px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out"
							>
								Add to Wishlist
								<img src="/assets/heart.svg" alt="Add to wishlist" />
							</button>
						)}
					</div>
				</div>
			</div>

			{/* Modal for confirming wishlist removal */}
			<Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<h3 className="text-lg font-semibold">Confirm Removal</h3>
				<p>Are you sure you want to remove this book from your wishlist?</p>
				<div className="flex justify-end mt-4">
					<button
						onClick={() => setIsModalOpen(false)}
						className="mr-2 px-4 py-2 bg-gray-300 rounded-lg"
					>
						Cancel
					</button>
					<button
						onClick={confirmRemove}
						className="px-4 py-2 bg-red-500 text-white rounded-lg"
					>
						Remove
					</button>
				</div>
			</Modal>
		</div>
	);
};

export default BookPage;
