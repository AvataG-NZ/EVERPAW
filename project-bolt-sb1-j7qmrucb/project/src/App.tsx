import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { UnifiedBackground } from './components/UnifiedBackground';
import CartDrawer from './components/CartDrawer';
import RewardsDrawer from './components/RewardsDrawer';
import { CartProvider } from './contexts/CartContext';
import { RewardsProvider } from './contexts/RewardsContext';
import { Home } from './pages/Home';

const Features = lazy(() => import('./pages/Features').then(m => ({ default: m.Features })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Shop = lazy(() => import('./pages/Shop').then(m => ({ default: m.Shop })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Cookies = lazy(() => import('./pages/Cookies'));
const Careers = lazy(() => import('./pages/Careers'));
const Press = lazy(() => import('./pages/Press'));
const HelpCenter = lazy(() => import('./pages/HelpCenter'));
const Shipping = lazy(() => import('./pages/Shipping'));
const Returns = lazy(() => import('./pages/Returns'));
const Warranty = lazy(() => import('./pages/Warranty'));
const Pricing = lazy(() => import('./pages/Pricing'));
const BetaProgram = lazy(() => import('./pages/BetaProgram'));

function AppContent() {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      window.scrollTo(0, 0);
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setIsTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [location, displayLocation]);

  return (
    <div className="min-h-screen relative">
      <UnifiedBackground />
      <Navigation />
      <CartDrawer />
      <RewardsDrawer />
      <div
        className="transition-opacity duration-300"
        style={{ opacity: isTransitioning ? 0 : 1 }}
      >
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="glass-strong border border-white/20 rounded-3xl p-8">
              <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        }>
          <Routes location={displayLocation}>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/press" element={<Press />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/warranty" element={<Warranty />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/beta" element={<BetaProgram />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <RewardsProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </RewardsProvider>
  );
}

export default App;
