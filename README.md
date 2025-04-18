
# Blog Backend

This project is a backend implementation for a blog application built using **Node.js**, **Express**, **MongoDB**, and **EJS** as the templating engine. It includes features like user authentication, blog post management, and pagination.

---

## Features

- **Home Page**: Displays a list of blog posts with pagination.
- **Post Details**: View individual blog posts.
- **Search Functionality**: Search for blog posts by title or content.
- **Admin Panel**: Manage blog posts and user authentication.
- **Contact Page**: A form to contact the blog owner.
- **Authentication**: Login and registration functionality with hashed passwords.

---

## File Structure

### 1. **`app.js`**
   - The main entry point of the application.
   - Sets up middleware, connects to the database, and starts the server.
   - Configures session management, static file serving, and the EJS templating engine.

### 2. **`servers/routes/main.js`**
   - Contains the main routes for the application:
     - `/`: Displays the home page with a list of blog posts.
     - `/post/:id`: Displays a single blog post based on its ID.
     - `/search`: Handles search functionality for blog posts.
     - `/contact`: Displays the contact page.

### 3. **`servers/routes/admin.js`**
   - Handles admin-related routes:
     - `/admin`: Displays the admin login page.
     - `/register`: Handles user registration.
     - `/dashboard`: Displays the admin dashboard (protected by authentication middleware).

### 4. **`servers/model/user.js`**
   - Defines the `User` schema using Mongoose.
   - Fields:
     - `username`: A unique string for the user's name.
     - `password`: A hashed string for the user's password.

### 5. **`servers/model/post.js`**
   - Defines the `Post` schema using Mongoose.
   - Fields:
     - `title`: The title of the blog post.
     - `body`: The content of the blog post.
     - `createdAt`: The date the post was created.

### 6. **`views/index.ejs`**
   - The EJS template for the home page.
   - Displays a list of blog posts with pagination.

### 7. **`views/post.ejs`**
   - The EJS template for displaying a single blog post.

### 8. **`views/contact.ejs`**
   - The EJS template for the contact page.
   - Includes a form for users to send messages.

### 9. **`views/layout/main.ejs`**
   - The main layout file for the application.
   - Wraps around individual views and includes common elements like the header and footer.

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/blog-backend.git
   cd blog-backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create a .env file in the root directory and add the following:
     ```
     PORT=5000
     MONGODB_URL=mongodb://localhost:27017/blog
     JWT_SECRET=your_secret_key
     ```

4. **Start the Server**:
   ```bash
   npm start
   ```

5. **Access the Application**:
   - Open your browser and navigate to `http://localhost:5000`.

---

## Usage

### Home Page
- Displays the latest blog posts with pagination.
- Click on a post title to view its details.

### Admin Panel
- Navigate to `/admin` to log in as an admin.
- Use `/register` to create a new admin account.

### Contact Page
- Navigate to `/contact` to send a message to the blog owner.

---

## Dependencies

- **Node.js**: JavaScript runtime.
- **Express**: Web framework for Node.js.
- **Mongoose**: MongoDB object modeling for Node.js.
- **EJS**: Templating engine for rendering dynamic HTML.
- **bcrypt**: For hashing passwords.
- **jsonwebtoken**: For generating and verifying JWT tokens.
- **dotenv**: For managing environment variables.
- **connect-mongo**: MongoDB session store for Express.

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact

For any inquiries or issues, please contact:
- **Email**: [natnaelb382@gmail.com](mailto:natnaelb382@gmail.com)
- **Telegram**: [@NatnaellB](http://t.me/NatnaellB)5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact

For any inquiries or issues, please contact:
- **Email**: [natnaelb382@gmail.com](mailto:natnaelb382@gmail.com)
- **Telegram**: [@NatnaellB](http://t.me/NatnaellB)
