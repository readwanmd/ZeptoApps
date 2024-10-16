import { useState } from 'react';

const MultiSelectDropdown = ({ handleCategory }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedItems, setSelectedItems] = useState([]);
	const languages = [
		'Culture/Civilization/Society',
		'Fiction',
		'Gender & Sexuality Studies',
		'Literature',
		'Science-Fiction & Fantasy',
		'Poetry',
		'History - American',
		'Humour',
		'Travel & Geography',
		'History - British',
		'Children & Young Adult Reading',
		'History - General',
		'Biographies',
		'Music',
		'Teaching & Education',
		'History - Medieval/The Middle Ages',
		'Psychiatry/Psychology',
		'Philosophy & Ethics',
		'Politics',
		'Performing Arts/Film',
	];

	const toggleDropdown = () => setIsOpen(!isOpen);

	const toggleItem = (item) => {
		setSelectedItems((prev) =>
			prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
		);
	};

	const handleSubmit = () => {
		handleCategory(selectedItems);
		toggleDropdown();
	};

	const handleReset = () => {
		setSelectedItems([]);
		toggleDropdown();
	};

	return (
		<div className="relative min-w-[320px] max-md:w-[345px] w-full">
			<div
				className={`flex items-center justify-between px-4 py-1 max-md:py-2 rounded-lg cursor-pointer bg-white shadow-md`}
				onClick={toggleDropdown}
			>
				<span className="text-base font-normal text-gray-800">
					{selectedItems.length > 0
						? `${selectedItems.length} Selected`
						: 'Select Genre'}
				</span>
				<span
					className={`flex items-center justify-center text-white text-sm rounded-full bg-blue-400 transition-transform duration-300 ${
						isOpen ? 'rotate-180' : ''
					}`}
				>
					<span>🔽</span>
				</span>
			</div>

			{isOpen && (
				<div className="absolute top-[55px] max-md:top-[45px] w-full rounded-lg bg-white shadow-md z-20 max-h-96  flex flex-col">
					<ul className="flex-1 overflow-y-scroll">
						{languages.map((lang, index) => (
							<li
								key={index}
								className={`flex items-center h-[50px] cursor-pointer transition-colors duration-300 px-4 rounded-lg hover:bg-blue-50 ${
									selectedItems.includes(lang) ? 'bg-blue-50' : ''
								}`}
								onClick={() => toggleItem(lang)}
							>
								<span
									className={`flex items-center justify-center h-4 w-4 rounded border-[1.5px] mr-3 transition-all duration-300 ${
										selectedItems.includes(lang)
											? 'bg-blue-500 border-blue-500'
											: 'border-gray-400'
									}`}
								>
									{selectedItems.includes(lang) && <span>✅</span>}
								</span>
								<span className="text-base font-normal text-gray-800">
									{lang}
								</span>
							</li>
						))}
					</ul>
					<div className="flex">
						<button
							onClick={handleReset}
							className="w-full text-white py-2 bg-red-500"
						>
							Reset
						</button>
						<button
							onClick={handleSubmit}
							className="w-full text-white py-2 bg-blue-600"
						>
							Submit
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default MultiSelectDropdown;
