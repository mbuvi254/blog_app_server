# Blog App Server

A robust blogging platform backend built with TypeScript, Node.js, and Express. Features user authentication, blog management, and profile management.

## 🚀 Features

- **User Authentication**
  - Register with email and password
  - Login/Logout functionality
  - JWT-based authentication with httpOnly cookies
  - Password strength validation
  - Password update functionality

- **User Profile**
  - View and update profile information
  - Manage personal blogs
  - Trash system for deleted blogs

- **Blog Management**
  - Create, read, update, and delete blogs
  - Soft delete functionality
  - Blog restoration from trash
  - Public and private blog visibility

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: SQL Server (via Prisma ORM)
- **Authentication**: JWT (JSON Web Tokens)
- **Security**:
  - bcryptjs for password hashing
  - zxcvbn for password strength validation
  - CORS protection
  - Cookie-based authentication
  - Environment variable configuration

## 📁 Project Structure

```
src/
├── config/            # Configuration files
│   └── database.ts    # Database connection
├── controllers/       # Request handlers
│   ├── authController.ts   # Authentication logic
│   ├── blogsController.ts  # Blog CRUD operations
│   ├── userController.ts   # User profile operations
│   ├── publicController.ts # Public endpoints
│   └── passwordHelpers.ts  # Password utilities
├── middlewares/       # Express middlewares
│   └── authMiddleware.ts   # Authentication middleware
├── routes/            # Route definitions
│   ├── authRoutes.ts
│   ├── blogRoutes.ts
│   ├── publicRoutes.ts
│   └── usersRoutes.ts
├── services/          # Business logic
│   └── userServices.ts
├── types/             # TypeScript type definitions
│   └── index.d.ts
└── utils/             # Utility functions
    └── jwt.ts         # JWT token handling
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- SQL Server
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd blog_app_server
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Database setup
   ```bash
   # Run database migrations
   npx prisma migrate dev --name init
   ```

5. Start the development server
   ```bash
   npm run dev
   ```

## 🔧 Configuration

Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
DATABASE_URL="sqlserver://USER:PASSWORD@HOST:PORT;database=DB_NAME;encrypt=true"
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## 📚 API Documentation

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user
- `PATCH /auth/password` - Update password
- `GET /auth/profile` - Get current user profile

### User Profile

- `GET /profile` - Get current user profile
- `PATCH /profile` - Update user profile
- `GET /profile/blogs` - Get current user's blogs
- `GET /profile/trash` - Get current user's trashed blogs

### Blogs

- `GET /blogs` - List all public blogs
- `POST /blogs` - Create a new blog
- `GET /blogs/:id` - Get a specific blog
- `PATCH /blogs/:id` - Update a blog
- `DELETE /blogs/:id` - Delete a blog
- `POST /blogs/:id/trash` - Move blog to trash
- `POST /blogs/:id/restore` - Restore blog from trash

## 🛡️ Security

- All sensitive routes are protected with JWT authentication
- Passwords are hashed using bcrypt
- CORS is configured to only allow requests from specified origins
- HTTP-only cookies are used for JWT storage
- Password strength validation using zxcvbn

## 🧪 Testing

To run tests:

```bash
npm test
```

## 🚀 Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Prisma](https://www.prisma.io/) - Next-generation ORM for Node.js & TypeScript
- [Express](https://expressjs.com/) - Fast, unopinionated web framework for Node.js
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
