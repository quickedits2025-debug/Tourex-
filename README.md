# Tourex Himalaya 🏔️

A modern, responsive, and luxury travel platform for Himachal Pradesh and Uttarakhand tour packages, road trips, and customized Himalayan expeditions.

## 🌟 Highlights
- **Destination Bento Grid**: Spiti Valley, Manali & Solang, Kedarnath & Tungnath, Rishikesh, Auli, Jibhi, Nainital Lake District, and Kasol.
- **Floating Booking & Inquiry Widget**: Interactive multi-tab booking widget for Tours, Private Cabs / Tempo Travellers, and Hotels.
- **Custom Itinerary Planner**: Interactive 4-step cost estimator allowing travelers to select destinations, group size, vehicle (Innova Crysta, Force Tempo, 4x4 Thar, Dzire), and stay categories with instant quotes and WhatsApp sharing.
- **Detailed Package Modals**: Day-by-day itineraries, inclusions, exclusions, packing tips, and high-altitude safety guidelines.
- **Supabase Backend**: Real-time integration with PostgreSQL database for handling reservations, custom inquiries, and newsletter subscriptions with Row Level Security (RLS).
- **Responsive Design**: Mobile-first, tablet-optimized, and desktop experience built with Tailwind CSS.

## 🛠️ Tech Stack
- **Frontend**: React 18, Vite 6, Tailwind CSS
- **Icons**: Lucide React
- **Backend / Database**: Supabase (PostgreSQL 17 with RLS)
- **Deployment**: Vite Build ready

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and provide your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-publishable-key
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

## 📄 License
MIT License. Built for Himalayan travelers with ❤️
