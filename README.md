# BrightLearn - Personal Tutor Selection Platform

A modern web application that connects students with expert tutors for personalized one-on-one learning experiences. Students can browse tutor profiles, view detailed information, and enroll with their chosen tutor through a secure payment system.

## 🌟 Features

### For Students
- **Browse Tutors**: Search and filter through verified expert tutors
- **Detailed Profiles**: View comprehensive tutor information including education, experience, ratings, and subjects taught
- **Advanced Filtering**: Filter by subject, price range, and location
- **Secure Enrollment**: Complete enrollment process with payment integration
- **User Authentication**: Student login and registration system

### For Tutors
- **Professional Profiles**: Showcase qualifications, experience, and expertise
- **Subject Specialization**: Highlight specific subjects and topics taught
- **Availability Management**: Display teaching schedules and availability
- **Student Reviews**: Show ratings and student testimonials
- **Tutor Registration**: Dedicated signup process for tutors

### Platform Features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Real-time Search**: Instant search and filtering capabilities
- **Payment Processing**: Secure enrollment fee collection
- **User Management**: Complete authentication and user session handling

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/brightlearn.git
   cd brightlearn
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5174` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Usage

### Demo Credentials

#### Student Login
- **Email**: `student@example.com`
- **Password**: `password123`

#### Tutor Login
- **Email**: `tutor@example.com`
- **Password**: `password123`

### How to Use

1. **Browse Tutors**
   - Visit the homepage to see featured tutors
   - Use the search bar to find specific tutors or subjects
   - Apply filters by subject, price range, or location

2. **View Tutor Profiles**
   - Click on any tutor card to view detailed information
   - Review education, experience, certifications, and student reviews
   - Check availability and pricing information

3. **Enroll with a Tutor**
   - Click "Enroll Now" on the tutor's profile
   - Complete the payment form with your information
   - Submit payment to secure your enrollment

4. **User Registration**
   - Click "Sign Up" in the header
   - Choose between Student or Tutor registration
   - Fill in required information and create your account

## 🛠️ Technology Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **React Hook Form** - Form handling and validation
- **Lucide React** - Beautiful icon library
- **React Hot Toast** - Toast notifications

### Styling
- **CSS3** - Custom CSS with modern features
- **CSS Grid & Flexbox** - Responsive layouts
- **CSS Variables** - Consistent theming
- **CSS Animations** - Smooth transitions and effects

### Development Tools
- **ESLint** - Code linting and formatting
- **Git** - Version control

## 📁 Project Structure

```
brightlearn/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images and other assets
│   ├── App.jsx            # Main application component
│   ├── App.css            # Global styles
│   ├── index.css          # Base styles
│   └── main.jsx           # Application entry point
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── eslint.config.js       # ESLint configuration
└── README.md              # Project documentation
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#2563eb` - Main brand color
- **Secondary Gold**: `#fbbf24` - Accent color
- **Success Green**: `#059669` - Success states
- **Error Red**: `#dc2626` - Error states
- **Neutral Grays**: Various shades for text and backgrounds

### Typography
- **Font Family**: Inter (system font fallback)
- **Font Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold)

### Components
- **Cards**: Tutor profiles, course listings
- **Buttons**: Primary, secondary, outline variants
- **Forms**: Input fields, select dropdowns, checkboxes
- **Navigation**: Header, footer, breadcrumbs

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory for environment-specific configuration:

```env
VITE_API_URL=your_api_endpoint
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### Customization
- **Colors**: Modify CSS variables in `src/App.css`
- **Content**: Update tutor data in `src/App.jsx`
- **Styling**: Customize components in their respective CSS sections

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts to deploy

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure build settings if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

### Development Guidelines
- Follow the existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Unsplash** - High-quality images for tutor profiles
- **Lucide** - Beautiful and consistent icons
- **React Community** - Excellent documentation and tools

## 📞 Support

For support, email support@brightlearn.com or create an issue in the GitHub repository.

## 🔮 Roadmap

### Upcoming Features
- [ ] Real-time messaging between students and tutors
- [ ] Video call integration for online sessions
- [ ] Calendar scheduling system
- [ ] Progress tracking and analytics
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Advanced payment options
- [ ] Tutor verification system

### Version History
- **v1.0.0** - Initial release with core functionality
- **v1.1.0** - Added user authentication system
- **v1.2.0** - Enhanced tutor profiles and filtering

---

**Made with ❤️ for better education**
