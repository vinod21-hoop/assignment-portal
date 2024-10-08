This is a backend system for an assignment submission portal where users can upload assignments and admins can accept or reject them.

### Setup

1. Install dependencies:

npm install

2. Create a `.env` file in the root directory with the following content:

MONGODB_URI=mongodb://localhost:27017/assignment-portal
JWT_SECRET=your_jwt_secret_here

3. Start the server:

npm start

For development with auto-restart:
npm run dev
## API Endpoints

### User Endpoints

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - User login
- `POST /api/users/upload` - Upload an assignment (requires authentication)
- `GET /api/users/admins` - Fetch all admins (requires authentication)

### Admin Endpoints

- `POST /api/admins/register` - Register a new admin
- `POST /api/admins/login` - Admin login
- `GET /api/admins/assignments` - View assignments tagged to the admin (requires authentication)
- `POST /api/admins/assignments/:id/accept` - Accept an assignment (requires authentication)
- `POST /api/admins/assignments/:id/reject` - Reject an assignment (requires authentication)

## Authentication

This system uses JWT for authentication. Include the JWT token in the `Authorization` header of your requests:

Authorization: Bearer `<your_token_here>`

## Error Handling

The API will return appropriate HTTP status codes and error messages for invalid requests or server errors.