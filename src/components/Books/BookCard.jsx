import { useState } from 'react';
import Modal from '../common/Modal';

const BookCard = ({ book, wishlist, addToWishlist, removeFromWishlist }) => {
	const isInWishlist = wishlist.includes(book?.id);
	const [tooltipVisible, setTooltipVisible] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedBookId, setSelectedBookId] = useState(null);

	// Function to handle removing from wishlist with confirmation
	const handleRemoveClick = (id) => {
		setSelectedBookId(id); // Save the book id for removal
		setIsModalOpen(true); // Open the modal
	};

	// Function to confirm the removal
	const confirmRemove = () => {
		removeFromWishlist(selectedBookId);
		setIsModalOpen(false); // Close the modal
	};

	return (
		<div className="relative block rounded-lg bg-white shadow-md w-96">
			<div className="overflow-hidden rounded-t-lg bg-blue-50 bg-cover bg-no-repeat flex justify-center">
				<img
					className="h-[281px]"
					src={book?.formats['image/jpeg']}
					alt={'feature image'}
				/>
			</div>
			<div className="p-6 text-surface">
				<h5 className="truncate mb-2 text-xl font-medium leading-tight">
					{book?.title}
				</h5>
				<p className="mb-4 text-base">
					<span className="font-semibold">By </span>
					{book?.authors.map((author) => author.name).join(', ')}
				</p>

				<div className="">
					{book?.subjects.slice(0, 3).map((subject, index) => (
						<span
							key={index}
							className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
						>
							#{subject.split(' -- ')[0]}
						</span>
					))}
				</div>
			</div>

			<div className="absolute top-[239px] w-full">
				<div className="flex justify-between">
					<button
						type="button"
						className="inline-block rounded bg-blue-700 px-3 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out"
					>
						Book Id: {book?.id}
					</button>

					<div>
						{isInWishlist ? (
							<button
								onClick={() => handleRemoveClick(book?.id)} // Open modal before removing
								type="button"
								className="inline-block rounded bg-red-500 px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out"
								onMouseEnter={() => setTooltipVisible(true)}
								onMouseLeave={() => setTooltipVisible(false)}
							>
								<img
									src="/assets/heart_filled.svg"
									alt={'remove from wishlist'}
								/>
							</button>
						) : (
							<button
								onClick={() => addToWishlist(book?.id)} // Add to wishlist
								type="button"
								className="inline-block rounded bg-blue-700 px-2 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out"
								onMouseEnter={() => setTooltipVisible(true)}
								onMouseLeave={() => setTooltipVisible(false)}
							>
								<img src="/assets/heart.svg" alt={'add to wishlist'} />
							</button>
						)}

						{tooltipVisible && (
							<div
								id="tooltip"
								role="tooltip"
								className="absolute right-0 z-10 px-3 py-2 text-sm text-white bg-gray-700 rounded-lg shadow-sm transition-opacity duration-300"
							>
								{isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
							</div>
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

export default BookCard;
