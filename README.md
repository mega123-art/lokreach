# LocoLab - Content Creator & Brand Collaboration Platform

A full-stack platform connecting brands with local content creators across India.

## 🚀 Features

- **Role-based Authentication**: Separate dashboards for creators, brands, and admins
- **Location-based Discovery**: Find creators by city/region
- **Campaign Management**: Create and manage marketing campaigns
- **Creator Profiles**: Detailed analytics and performance metrics
- **Flexible Rewards**: Support for both monetary and barter collaborations
- **Admin Panel**: Manage creator profiles and platform content

## 🛠️ Tech Stack

### Frontend
- React 19 with Vite
- React Router for navigation
- Axios for API calls
- Custom CSS with modern design system

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- Bcrypt for password hashing
- Multer for file uploads

## 📦 Project Structure

```
project/
├── frontend/          # React frontend application
├── backend/           # Node.js backend API
└── package.json       # Root package.json for scripts
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd locolab-platform
```

### 2. Install Dependencies
```bash
npm run install:all
```

### 3. Environment Configuration

#### Backend Environment (.env)
Create `backend/.env` file:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/locolab?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

#### Frontend Environment (.env)
Create `frontend/.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Development Setup
```bash
# Run both frontend and backend
npm run dev:both

# Or run separately:
npm run dev:backend    # Backend only
npm run dev:frontend   # Frontend only
```

## 🚀 Deployment

### Backend Deployment (Render)

1. **Create Render Account**: Sign up at [render.com](https://render.com)

2. **Create Web Service**:
   - Connect your GitHub repository
   - Select the `backend` folder as root directory
   - Set build command: `npm install`
   - Set start command: `npm start`

3. **Environment Variables** (in Render dashboard):
   ```
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret-key
   NODE_ENV=production
   FRONTEND_URL=https://your-vercel-app.vercel.app
   ```

4. **Deploy**: Render will automatically deploy your backend

### Frontend Deployment (Vercel)

1. **Create Vercel Account**: Sign up at [vercel.com](https://vercel.com)

2. **Import Project**:
   - Connect your GitHub repository
   - Set root directory to `frontend`
   - Framework preset: Vite

3. **Environment Variables** (in Vercel dashboard):
   ```
   VITE_API_URL=https://your-render-app.onrender.com/api
   ```

4. **Deploy**: Vercel will automatically deploy your frontend

### Important Configuration Updates

After deployment, update these files with your actual URLs:

#### `frontend/.env.production`
```env
VITE_API_URL=https://your-actual-render-app.onrender.com/api
```

#### `backend/src/index.js` (CORS configuration)
```javascript
const allowedOrigins = [
  'https://your-actual-vercel-app.vercel.app',
  // ... other origins
];
```

## 🔐 User Roles & Access

### Content Creator
- Create profile with social media metrics
- Browse available campaigns
- Apply to brand campaigns
- View performance analytics

### Brand
- Search creators by location and niche
- Create marketing campaigns
- Star/save favorite creators
- Manage campaign collaborations

### Admin
- Manage creator profiles
- Approve/edit creator information
- Platform oversight and moderation

## 📱 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/forgot-password` - Password reset
- `GET /api/auth/check-username` - Username availability

### Campaigns
- `POST /api/campaigns` - Create campaign
- `GET /api/campaigns/all` - Get all campaigns
- `GET /api/campaigns/brand/:id` - Get brand campaigns
- `PATCH /api/campaigns/:id/star/:creatorId` - Star creator

### Creators
- `GET /api/creators` - Search creators by location
- `GET /api/creators/all` - Get all creators
- `GET /api/creators/profile/:id` - Get creator profile

### Admin
- `GET /api/admin/creators/pending` - Get pending creators
- `GET /api/admin/creators/fulfilled` - Get active creators
- `PATCH /api/admin/creators/:id` - Update creator profile

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Ensure backend CORS is configured with your frontend URL
   - Check that environment variables are set correctly

2. **Authentication Issues**:
   - Verify JWT_SECRET is set in backend environment
   - Check that API URLs are correct in frontend

3. **Database Connection**:
   - Ensure MongoDB URI is correct and accessible
   - Check database permissions and network access

4. **File Upload Issues**:
   - Verify upload directory exists and has write permissions
   - Check file size limits in backend configuration

### Debug Mode

Enable debug logging by setting `NODE_ENV=development` in backend environment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team

---

**Note**: This is a demo application. For production use, implement additional security measures, error handling, and monitoring.