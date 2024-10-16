export function extractCategories(data) {
	const categories = new Set();

	data.forEach((item) => {
		item.bookshelves.forEach((shelf) => {
			if (shelf.startsWith('Browsing: ')) {
				const category = shelf.replace('Browsing: ', '').trim();
				categories.add(category);
			}
		});
	});

	return Array.from(categories);
}
