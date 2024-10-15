Breakdown of task, step-by-step checklist:

### 1. **Setup the Project Environment**

- [x] Create a new React project.
- [x] Install necessary packages (`react-router-dom`, `axios`).
- [ ] Set up `react-router-dom` for navigation.
- [ ] Set up folder structure for components, pages, and CSS.

### 2. **API Integration**

- [ ] Fetch the list of books using `axios` from the API: `https://gutendex.com/books`.
- [ ] Log the response in the console to verify the data structure.

### 3. **Homepage Layout**

- [ ] Create a **Navbar** component with links to Home, Wishlist, and Book Detail pages.
- [ ] Design a **BookCard** component to display:
  - Book cover image.
  - Title.
  - Author name.
  - Genre.
  - ID.
- [ ] Map through the API data and display a list of books using the **BookCard** component.

### 4. **Search Functionality**

- [ ] Implement a **SearchBar** component.
- [ ] Add functionality to filter books by title in real-time as the user types.

### 5. **Filter by Genre**

- [ ] Implement a **DropdownFilter** component.
- [ ] Add functionality to filter books by genre/topic using the dropdown.
- [ ] Combine the search and genre filter so both can be used together.

### 6. **Wishlist Functionality**

- [ ] Add a **Heart Icon** to each book card for wishlisting.
- [ ] Save wishlisted books to `localStorage`.
- [ ] Toggle the heart icon to add/remove books from the wishlist.
- [ ] Create a **Wishlist Page** that displays only the wishlisted books.

### 7. **Pagination**

- [ ] Implement pagination to display a limited number of books per page.
- [ ] Add "Next" and "Previous" buttons to navigate between pages.
- [ ] Display page numbers (e.g., 1, 2, 3...).

### 8. **Book Detail Page**

- [ ] Create a **BookDetail** component.
- [ ] Fetch and display the details of a book when a user clicks on it (using the book's ID from the API).
- [ ] Ensure the book detail page includes the title, author, genre, and description.

### 9. **Responsiveness**

- [ ] Ensure the layout is fully responsive.
- [ ] Test the design on both mobile and desktop views.

### 10. **Styling (Plain CSS)**

- [ ] Use plain CSS for styling.
- [ ] Ensure the design is clean, user-friendly, and aesthetically pleasing.

### 11. **LocalStorage for Search/Filter Preferences (Bonus)**

- [ ] Save the user’s search query and genre filter to `localStorage`.
- [ ] Persist the search and filter options when the page is refreshed.

### 12. **Optional Bonus (Animations)**

- [ ] Implement smooth animations for showing/hiding the books during search and filter actions.
