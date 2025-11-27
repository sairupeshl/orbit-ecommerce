# Orbit - Full Stack Aerospace related E-Commerce Platform
#### Video Demo: https://youtu.be/WL6v7EZAHIE
#### Description:

Submitted this as my Final Project for Harvard University's CS50x. Orbit is a specialized, full stack e-commerce platform designed for the aerospace industry, supplying aerospace-related products to engineers and hobbyists. I selected an aerospace theme to align with my passion and academic background. Unlike simple static websites, Orbit relies on a decoupled architecture where a **React.js** frontend communicates with a separate **Node.js/Express** backend via a RESTful API. The application allows users to browse technical products, view detailed specifications in a modal interface, manage a dynamic shopping cart and perform a simulated checkout process.

The project was conceived to address the challenge of **state management** in web applications. I wanted to move beyond the server-side rendering (Jinja) taught in earlier weeks of CS50 and explore **Client-Side Rendering (CSR)**, where the browser handles the UI logic and the server focuses solely on data and asset delivery.

### Distinctiveness and Complexity

This project satisfies the distinctiveness and complexity requirements by implementing a fully separated "MERN-style" stack (adapting Mongo to SQLite for portability). This deviates significantly from the material taught in the course in several ways:

1.  **Architecture:** Instead of using Flask to render HTML templates on the server, this project uses **React (Vite)** to render the UI dynamically in the browser. This required learning and implementing React Hooks (`useState`, `useEffect`, `useMemo`) to manage the application state without page reloads.
2.  **API Design:** The backend does not return HTML. Instead, it exposes JSON endpoints (`/api/products`). This required me to build a REST API capable of handling GET requests and serving static assets (images) simultaneously.
3.  **Database Management:** I implemented a custom seeding script (`seed.js`) to programmatically populate and reset the database with aerospace-specific inventory. This allows for rapid testing and ensures the database schema is consistent every time the application is deployed.
4.  **Complex State Logic:** The shopping cart is not stored in a database session but is managed entirely in the frontend memory. Logic was required to handle adding duplicate items (incrementing quantity rather than adding a new row), calculating live totals using `reduce` functions, and removing items selectively.

### File Structure and Functionality

The project is organized into two main directories: `backend` and `frontend`.

#### Backend (`/backend`)
The backend is built with Node.js and Express.

* **`server.js`**: This is the entry point of the API. It configures the Express server, enables CORS (Cross Origin Resource Sharing) to allow the frontend to communicate with it, and defines the routes.
    * *Static Asset Serving:* A key challenge was handling images. I implemented a middleware using `express.static` to map the `/images` URL route to the local `/public` directory. This allows the frontend to request, for example, `http://localhost:5001/images/rocket.jpg`, and receive the file directly from the server's disk.
    * *API Routes:* The `/api/products` endpoint queries the SQLite database and returns a JSON array of product objects.
* **`database.js`**: This module manages the connection to the SQLite database (`shop.db`). It ensures the connection is established once and exported for use in other files.
* **`seed.js`**: A utility script designed to be run manually. It drops the existing `products` table, recreates the schema, and inserts a predefined array of data (Aerospace products). This was essential for debugging, allowing me to reset the application state instantly if data became corrupted.

#### Frontend (`/frontend`)
The frontend is a Single Page Application (SPA) built with React and Vite. It utilizes Tailwind CSS for a utility-first styling approach, ensuring the application is fully responsive and maintains a consistent design system without writing custom CSS files.

* **`src/App.jsx`**: The main controller component. It handles the initial data fetching using `useEffect`. Crucially, it maps the backend data structure (which uses keys like `desc` and `img`) to the frontend's expected format (`description` and `imageUrl`), handling the full URL construction dynamically.
* **`src/components/Header.jsx`**: Displays the branding and the cart icon. It receives the `cartCount` as a prop to display a notification badge that updates instantly in real-time as items are added.
* **`src/components/ProductCard.jsx`**: A reusable component for rendering individual items in the grid. It uses CSS transforms for hover effects and prevents event bubbling so that clicking the "Add" button doesn't accidentally trigger the "Open Details" modal.
* **`src/components/ProductModal.jsx`**: A detailed view that overlays the screen. It implements a backdrop blur effect and handles the display of the image, the product name and a long form description that don't fit on the main card.
* **`src/components/CartDrawer.jsx`**: A slide out sidebar that manages the user's selected items. It maps through the `cart` state array to render items and includes logic to increment or decrement quantities. It uses the `reduce` method to calculate the subtotal dynamically.
* **`src/components/CheckoutModal.jsx`**: A mock checkout form. It captures user input (Name and Address) and provides a success feedback loop, clearing the cart state upon completion to simulate a finished transaction.

### Design Decisions & Challenges

**1. Image Handling:**
One of the biggest hurdles was managing product images. Initially, I used external placeholder URLs, but they were unreliable. I switched to hosting images locally in the backend. I ran into 404 errors because the frontend (running on port 5173) couldn't see files on the backend (port 5001). I solved this by configuring `express.static` in the backend and prepending the backend URL to the image paths during the data fetching process in React.

**2. Database Choice:**
I opted for **SQLite** over MongoDB. While MongoDB is popular for the MERN stack, SQLite allowed me to keep the database as a single file (`shop.db`) within the project folder. This would make the project portable and easier for others to run without needing to set up a cloud Atlas account or install local MongoDB services.

**3. Component Splitting:**
Initially, I attempted to use a single `App.jsx` for all the code. As the logic grew, debugging became difficult. I refactored the code into the `components/` folder. This not only made the code more readable but also allowed me to reuse icons and styles efficiently across different parts of the application.

**4. Styling:**
I opted for Tailwind CSS rather than traditional CSS or Bootstrap, which enabled faster prototyping. Its utility-first classes let me build grid layouts and modal components directly within the JSX, keeping styling tightly integrated with the component structure.

### How to Run
1.  **Backend:**
    ```bash
    cd backend
    npm install
    node seed.js  # Initializes the database
    node server.js
    ```
2.  **Frontend:** (Open a new terminal)
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

### Future Improvements
Given more time, I would implement:
* **JWT Authentication:** To allow users to create accounts and view past orders.
* **Payment Gateway:** Integration with Stripe to handle real transactions.
* **Search & Filtering:** A search bar to filter the product grid by name or category.