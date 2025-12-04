# Authentication System Documentation

## Overview
A complete JWT-based authentication system with user management for the Pharma Test application.

## Features Implemented

### Backend (Node.js/Express/MongoDB)

#### 1. User Model (`model/userModel.js`)
- **Fields:**
  - Email (unique, validated, required)
  - Password (hashed with bcrypt, min 6 characters)
  - Name (required)
  - Role (user/admin, default: user)
  - Avatar (optional URL)
  - Phone (optional)
  - isActive (default: true)
  - lastLogin
  - refreshToken
  - resetPasswordToken & resetPasswordExpires

- **Security:**
  - Automatic password hashing on save
  - Password comparison method
  - Reset token generation with expiry

#### 2. JWT Middleware (`middleware/auth.js`)
- **Token Generation:**
  - Access Token: 15 minutes expiry
  - Refresh Token: 7 days expiry
  
- **Middleware Functions:**
  - `protect` - Validates JWT and attaches user to request
  - `authorize(...roles)` - Role-based access control
  - `isLoggedIn` - Optional authentication check

#### 3. Authentication Controller (`controller/authController.js`)
- **Endpoints:**
  - `POST /api/auth/register` - User registration
  - `POST /api/auth/login` - User login with JWT tokens
  - `POST /api/auth/refresh-token` - Refresh access token
  - `POST /api/auth/logout` - Logout (clears refresh token)
  - `GET /api/auth/me` - Get current user profile
  - `PUT /api/auth/profile` - Update profile (name, phone, avatar)
  - `PUT /api/auth/change-password` - Change password
  - `POST /api/auth/forgot-password` - Request password reset
  - `POST /api/auth/reset-password` - Reset password with token

#### 4. User Management Controller (`controller/userController.js`)
**Admin Only Routes:**
- `GET /api/users` - List all users (pagination, filtering, search)
- `POST /api/users` - Create new user
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Frontend (Next.js/React/TypeScript)

#### 1. Auth Context (`context/AuthContext.tsx`)
- **Global State:**
  - user (User | null)
  - accessToken, refreshToken
  - isLoading
  - isAuthenticated (computed)
  - isAdmin (computed)

- **Methods:**
  - `login(email, password)` - Authenticate user
  - `register(email, password, name, phone)` - Create account
  - `logout()` - Clear auth state
  - `updateProfile(data)` - Update user profile
  - `changePassword(current, new)` - Change password

- **Features:**
  - Auto-load tokens from localStorage
  - Auto-refresh expired access tokens
  - Role-based redirect after login
  - Token verification on mount

#### 2. Authentication Pages

**Login Page** (`auth/login/page.tsx`)
- Email/password form
- Show/hide password toggle
- Remember me checkbox
- Forgot password link
- Register link
- Bilingual support (EN/VI)
- Error handling and loading states

**Register Page** (`auth/register/page.tsx`)
- Full registration form (name, email, phone, password, confirm)
- Password strength validation
- Auto-login after registration
- Bilingual support

**Forgot Password** (`auth/forgot-password/page.tsx`)
- Email input for password reset
- Backend sends reset token email
- Success confirmation

**Reset Password** (`auth/reset-password/page.tsx`)
- Token validation from URL
- New password input with confirmation
- Auto-redirect to login after success

#### 3. Profile Management

**Profile Page** (`profile/page.tsx`)
- View user information
- Edit mode for updating profile
- Avatar display
- Role badge (admin/user)
- Last login timestamp
- Links to change password
- Quick navigation to home/admin

**Change Password** (`profile/change-password/page.tsx`)
- Current password verification
- New password with confirmation
- Password requirements display
- Success feedback

#### 4. Protected Routes

**ProtectedRoute Component** (`components/ProtectedRoute.tsx`)
- Authentication check
- Role-based authorization
- Loading state while verifying
- Auto-redirect to login if not authenticated
- Admin-only route support

**Admin Layout** (`admin/layout.tsx`)
- Wrapped with `ProtectedRoute(requireAdmin: true)`
- User menu with avatar
- Profile and logout options
- Admin-only access

## Configuration

### Backend Environment Variables (`.env`)
```env
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=pharma_test_jwt_secret_key_2024_change_this_in_production
JWT_REFRESH_SECRET=pharma_test_jwt_refresh_secret_key_2024_change_this_in_production
```

### Frontend Environment Variables (`.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Security Features

1. **Password Security:**
   - Bcrypt hashing with salt rounds
   - Minimum 6 characters
   - Password not returned in queries (select: false)

2. **JWT Security:**
   - Short-lived access tokens (15 min)
   - Long-lived refresh tokens (7 days)
   - Refresh tokens stored in database
   - Token verification middleware

3. **Role-Based Access:**
   - User and Admin roles
   - Protected routes with role checks
   - Admin-only endpoints for user management

4. **Password Reset:**
   - Cryptographically secure reset tokens
   - 10-minute token expiry
   - Token hashing in database

## Usage

### Starting the Backend
```bash
cd php-pharma-backend
npm install  # Install dependencies (bcryptjs, jsonwebtoken)
node app.js  # Start server on port 5000
```

### Starting the Frontend
```bash
cd php-pharma-test
npm install
npm run dev  # Start Next.js dev server
```

### Creating First Admin User
Since registration creates regular users by default, you need to create an admin user directly in MongoDB:

**Option 1: Using MongoDB Compass or Atlas UI**
1. Connect to your MongoDB database
2. Navigate to the `users` collection
3. Insert a new document:
```json
{
  "email": "admin@pharmatest.com",
  "password": "$2a$10$hashedPasswordHere",  // Use bcrypt to hash password
  "name": "Admin User",
  "role": "admin",
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Option 2: Create a seed script**
Create `php-pharma-backend/seedAdmin.js`:
```javascript
const mongoose = require('mongoose');
const User = require('./model/userModel');
require('dotenv').config();

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI);
  
  const admin = await User.create({
    email: 'admin@pharmatest.com',
    password: 'admin123',  // Will be auto-hashed
    name: 'Admin User',
    role: 'admin'
  });
  
  console.log('Admin created:', admin.email);
  process.exit(0);
}

createAdmin().catch(console.error);
```

Run: `node seedAdmin.js`

## API Testing

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "Test User",
    "phone": "1234567890"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Get Profile (Protected)
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Refresh Token
```bash
curl -X POST http://localhost:5000/api/auth/refresh-token \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "YOUR_REFRESH_TOKEN"
  }'
```

## Frontend Authentication Flow

1. **User Login:**
   - User enters credentials on `/auth/login`
   - `login()` calls API and receives tokens
   - Tokens stored in localStorage
   - User redirected to admin panel (if admin) or home (if user)

2. **Protected Routes:**
   - Component wrapped with `<ProtectedRoute>`
   - Checks `isAuthenticated` from AuthContext
   - Redirects to login if not authenticated
   - Checks role for admin routes

3. **Token Refresh:**
   - Access token expires after 15 minutes
   - API returns 401 Unauthorized
   - Frontend automatically calls refresh token endpoint
   - New access token stored and request retried

4. **Logout:**
   - User clicks logout
   - `logout()` clears tokens from localStorage
   - Calls backend to clear refresh token
   - Redirects to login page

## Admin Features

1. **Admin Dashboard:** `/admin`
   - Protected with `requireAdmin: true`
   - Only accessible to users with `role: "admin"`

2. **User Management:**
   - View all users
   - Create new users
   - Edit user details and roles
   - Delete users
   - Search and filter users

3. **User Menu:**
   - Avatar display
   - Profile link
   - Change password link
   - Logout button

## Bilingual Support

All authentication pages support English and Vietnamese:
- Login, Register, Forgot Password, Reset Password
- Profile and Change Password pages
- Uses LanguageContext for global language switching
- Translations from `locales/en.json` and `locales/vi.json`

## Next Steps

1. **Email Integration:**
   - Set up email service (SendGrid, AWS SES, etc.)
   - Implement actual email sending for password reset
   - Add email verification on registration

2. **Enhanced Security:**
   - Add rate limiting to prevent brute force attacks
   - Implement CSRF protection
   - Add two-factor authentication (2FA)
   - Add account lockout after failed attempts

3. **User Management UI:**
   - Create admin pages for user management
   - Add user list with pagination
   - Add user edit/delete functionality
   - Add user search and filtering

4. **Audit Logging:**
   - Log authentication attempts
   - Track user actions
   - Monitor suspicious activities

5. **Session Management:**
   - Allow users to view active sessions
   - Allow users to revoke sessions
   - Track login history

## File Structure

```
php-pharma-backend/
├── model/
│   └── userModel.js          # User schema and methods
├── controller/
│   ├── authController.js     # Authentication logic
│   └── userController.js     # User management logic
├── middleware/
│   └── auth.js               # JWT middleware
├── route/
│   ├── authRoute.js          # Auth endpoints
│   └── userRoute.js          # User management endpoints
├── .env                      # Environment variables
├── app.js                    # Main server file
└── package.json              # Dependencies

php-pharma-test/
├── app/
│   ├── context/
│   │   ├── AuthContext.tsx       # Global auth state
│   │   └── LanguageContext.tsx   # Language state
│   ├── components/
│   │   └── ProtectedRoute.tsx    # Route protection
│   ├── auth/
│   │   ├── login/page.tsx        # Login page
│   │   ├── register/page.tsx     # Registration page
│   │   ├── forgot-password/page.tsx  # Forgot password
│   │   └── reset-password/page.tsx   # Reset password
│   ├── profile/
│   │   ├── page.tsx              # Profile view/edit
│   │   └── change-password/page.tsx  # Change password
│   ├── admin/
│   │   └── layout.tsx            # Admin layout with auth
│   └── layout.tsx                # Root layout with providers
├── .env.local                    # Frontend environment
└── package.json
```

## Troubleshooting

**Backend won't start:**
- Check MongoDB connection string in `.env`
- Ensure bcryptjs and jsonwebtoken are installed
- Check port 5000 is not in use

**Login fails:**
- Check backend is running on port 5000
- Verify `NEXT_PUBLIC_API_URL` in frontend `.env.local`
- Check browser console for CORS errors
- Verify user exists in database

**Token expired:**
- Access tokens expire after 15 minutes
- Use refresh token to get new access token
- Refresh tokens expire after 7 days

**Cannot access admin routes:**
- Verify user has `role: "admin"` in database
- Check AuthContext is loaded
- Verify token is valid

**Password reset not working:**
- Email functionality requires email service setup
- Currently returns success but doesn't send email
- Add email service integration for production

## Production Checklist

- [ ] Change JWT_SECRET and JWT_REFRESH_SECRET to secure random strings
- [ ] Set up email service for password reset
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Set up proper error logging
- [ ] Configure CORS for production domain
- [ ] Set secure cookie options
- [ ] Add input validation and sanitization
- [ ] Set up monitoring and alerts
- [ ] Create admin user securely
- [ ] Review and test all security features
- [ ] Set up database backups
- [ ] Configure environment variables in production
