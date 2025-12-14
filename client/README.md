# Adventure Triangle - Pre-Launch Landing Page

> **Official pre-launch landing page for Adventure Triangle - The world's first global adventure ecosystem**

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)

## 🌟 Live Demo

- **Deployment**: [Vercel Link Here]
- **Repository**: [GitHub Repo Link]

## 📋 Assignment Completion

This landing page fulfills all requirements for the Adventure Triangle Frontend Developer assignment:

### ✅ Required Sections Implemented
- [x] Hero Section with powerful tagline and CTA buttons
- [x] About Adventure Triangle
- [x] Partner Onboarding CTA
- [x] Launch Event CTA / Registration Form
- [x] Beta User Registration Form
- [x] Our Mission - Water | Air | Land Adventures
- [x] #FeelTheAdventure Campaign Section
- [x] Social Media Integration (Facebook, LinkedIn, Instagram, TikTok)
- [x] Footer (Legal + Contact + About)

### 🎨 Technical Requirements Met
- [x] Next.js 14 with App Router
- [x] TailwindCSS for styling
- [x] Clean, modern UI with smooth animations
- [x] Fully responsive (desktop + mobile)
- [x] Forms connected to backend API
- [x] TypeScript for type safety
- [x] Optimized performance

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The application will run at `http://localhost:3000`

## 🏗️ Project Structure

```
client/
├── app/
│   ├── components/
│   │   ├── About/
│   │   │   └── About.tsx
│   │   ├── Hero/
│   │   │   ├── Hero.tsx
│   │   │   └── Hero.module.css
│   │   ├── Mission/
│   │   │   └── Mission.tsx
│   │   ├── Campaign/
│   │   │   └── Campaign.tsx
│   │   └── Registration/
│   │       ├── BetaForm.tsx
│   │       ├── PartnerSection.tsx
│   │       └── LaunchEvent.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── (static assets)
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## 🎯 Key Features

### 1. Hero Section
- Animated gradient background with floating orbs
- Powerful tagline with text gradient effects
- Dual CTA buttons for different user types
- Smooth fade-in animations

### 2. About Adventure Triangle
- Glass-morphism card design
- Three-column grid showcasing Water, Air, Land
- Responsive layout with hover effects

### 3. Mission Section
- Interactive tab system for three elements
- Detailed missions and activities per element
- Dynamic color theming based on selected element
- Animated transitions

### 4. #FeelTheAdventure Campaign
- Story carousel with real testimonials
- Social media integration buttons
- Hashtag campaign promotion
- Auto-rotating stories

### 5. Registration Forms

#### Beta User Form
- Multi-step user input
- Adventure interest selection (Water, Air, Land)
- Experience level dropdown
- Location capture
- Real-time validation
- Success/error messaging

#### Partner Registration
- Benefits showcase
- Call-to-action modal
- Integration with backend API

#### Launch Event RSVP
- Simple email capture
- Inline registration
- Confirmation messaging

### 6. Footer
- Legal links
- Contact information
- Social media links
- Copyright information

## 🎨 Design System

### Color Palette
```css
--water-deep: #0f172a;
--water-light: #0ea5e9;
--air-sky: #e0f2fe;
--air-cloud: #f8fafc;
--land-dark: #14532d;
--land-light: #4ade80;
--accent: #f97316;
```

### Typography
- **Headings**: Outfit (Google Fonts)
- **Body**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 700, 800

### Components
- Glass-morphism cards with backdrop blur
- Smooth cubic-bezier animations
- Responsive grid layouts
- Interactive hover states

## 🔌 API Integration

The landing page connects to the Adventure Triangle backend API:

### Endpoints Used
```typescript
POST /api/v1/users/register
POST /api/v1/partners/register
POST /api/v1/events/register
```

### Configuration
API proxy configured in `next.config.ts`:
```typescript
async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: 'http://localhost:5000/api/:path*',
    },
  ];
}
```

## 📱 Responsive Design

- **Desktop**: Full-width hero, multi-column layouts
- **Tablet**: Adjusted grid columns, readable typography
- **Mobile**: Single-column stack, touch-friendly buttons

Breakpoints follow Tailwind CSS standards.

## ⚡ Performance Optimizations

- Next.js Image optimization
- Font optimization with `next/font`
- CSS-in-JS with minimal runtime
- Code splitting by route
- Lazy loading for components
- Minimal external dependencies

## 🧪 Testing

```bash
# Run ESLint
npm run lint

# Type checking
npx tsc --noEmit
```

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import repository in Vercel
3. Configure environment variables:
   - `NEXT_PUBLIC_API_URL` (if using external API)
4. Deploy automatically

### Manual Build

```bash
npm run build
npm start
```

## 🎯 Why I Want to Join Adventure Triangle

I've always believed technology should enable real human experiences, not replace them. Adventure Triangle embodies this perfectly—using digital innovation to unlock physical exploration.

This assignment wasn't just about building a landing page; it was about crafting the first impression for a movement that will democratize adventure worldwide. Every animation, every form field, every pixel was designed with the end user in mind—someone looking to break free from routine and discover their next great story.

I bring:
- **Technical Excellence**: Clean, scalable, performant code
- **Design Sensibility**: User-first approach with modern aesthetics
- **Ownership Mentality**: Treating this like my own product
- **Genuine Passion**: Adventure Triangle's mission resonates deeply

I'm ready to help build the infrastructure that powers thousands of life-changing adventures. Let's make #FeelTheAdventure a global phenomenon.

## 📄 License

Proprietary - Adventure Triangle 2025

## 👨‍💻 Author

**Kanchan Singh**
- Email: kanchan.matulsi@gmail.com
- GitHub: 
- LinkedIn: 

---

**Built with ❤️ for Adventure Triangle**

*Submission Date: [Current Date]*