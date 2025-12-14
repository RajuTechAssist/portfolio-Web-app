# 3D Portfolio Website - Raju

A modern, aesthetic 3D portfolio website built with React, Three.js, and Framer Motion. Features an immersive 3D background with animated geometric shapes, particles, and smooth scroll animations.

## 🌟 Features

- **3D Background Scene**: Interactive Three.js scene with animated sphere, floating geometric shapes, and particle system
- **Modern Hero Section**: Eye-catching hero with 3D elements, gradient orbs, and glass morphism effects
- **Smooth Animations**: Framer Motion powered animations with parallax scrolling effects
- **Responsive Design**: Mobile-first approach ensuring great experience across all devices
- **Performance Optimized**: Optimized 3D rendering with device pixel ratio support
- **SEO Ready**: Proper meta tags and semantic HTML structure

## 🚀 Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Lightning-fast build tool
- **Three.js** (0.160.0) - 3D graphics library
- **@react-three/fiber** (8.15.0) - React renderer for Three.js
- **@react-three/drei** (9.88.0) - Useful helpers for react-three-fiber
- **Framer Motion** (11.18.2) - Animation library
- **React Router** (6.26.0) - Client-side routing
- **Lucide React** (0.439.0) - Beautiful icons

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠️ Development

```bash
# Run linting
npm run lint

# Format code
npm run format

# Type checking
npm run type-check
```

## 📂 Project Structure

```
src/
├── components/
│   ├── 3d/              # 3D components (Scene3D)
│   ├── animations/      # Animation components
│   ├── common/          # Reusable components (Header, Footer, Button)
│   └── sections/        # Page sections
├── pages/               # Page components
├── styles/              # CSS files
├── hooks/               # Custom React hooks
├── services/            # API services
└── utils/               # Utility functions
```

## 🎨 Customization

### Colors
Edit the CSS variables in `src/styles/colors.css` to change the color scheme.

### 3D Scene
Modify `src/components/3d/Scene3D.jsx` to customize:
- Particle count and appearance
- Geometric shapes
- Lighting and camera settings

### Hero Content
Update personal information in `src/pages/Home.jsx`:
- Name and tagline
- Description
- Social media links

## 📱 Social Links

- GitHub: [RajuTechAssist](https://github.com/RajuTechAssist)
- LinkedIn: [raju-52b130247](https://www.linkedin.com/in/raju-52b130247/)

## 🔧 Configuration

### Vite Configuration
See `vite.config.js` for build and development server settings.

### ESLint
See `eslint.config.js` for linting rules.

## 📄 License

This project is open source and available for personal use.

## 👨‍💻 Developer

**Raju** - Software Developer

---

Made with ❤️ using React, Three.js, and modern web technologies.
