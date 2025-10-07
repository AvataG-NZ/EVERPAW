import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  useEffect(() => {
    const footer = document.querySelector('.glass-footer');
    const divider = document.querySelector('.fluent-divider-footer');

    const handleFooterMouseMove = (e: MouseEvent) => {
      const footerElement = e.currentTarget as HTMLElement;
      const rect = footerElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      footerElement.style.setProperty('--mouse-x', `${x}%`);
      footerElement.style.setProperty('--mouse-y', `${y}%`);

      if (divider) {
        (divider as HTMLElement).style.setProperty('--mouse-x', `${x}%`);
      }
    };

    if (footer) {
      footer.addEventListener('mousemove', handleFooterMouseMove as EventListener);
    }

    return () => {
      if (footer) {
        footer.removeEventListener('mousemove', handleFooterMouseMove as EventListener);
      }
    };
  }, []);

  return (
    <footer className="relative border-t border-white/20 glass-footer backdrop-blur-xl bg-white/15">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          <div>
            <img
              src="/LOGOd.png"
              alt="EverPaw"
              className="h-12 mb-6"
            />
            <p className="text-white/60 text-sm leading-relaxed">
              Empowering pet parents with smart technology for healthier, happier companions.
            </p>
          </div>

          <div>
            <h3 className="text-orange-500 font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link to="/features" className="text-white/70 hover:text-orange-400 transition-colors text-sm">Features</Link></li>
              <li><Link to="/shop" className="text-white/70 hover:text-orange-400 transition-colors text-sm">Shop</Link></li>
              <li><Link to="/pricing" className="text-white/70 hover:text-orange-400 transition-colors text-sm">Pricing</Link></li>
              <li><Link to="/beta" className="text-white/70 hover:text-orange-400 transition-colors text-sm">Beta Program</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-orange-500 font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-white/70 hover:text-orange-400 transition-colors text-sm">About</Link></li>
              <li><Link to="/contact" className="text-white/70 hover:text-orange-400 transition-colors text-sm">Contact</Link></li>
              <li><Link to="/careers" className="text-white/70 hover:text-orange-400 transition-colors text-sm">Careers</Link></li>
              <li><Link to="/press" className="text-white/70 hover:text-orange-400 transition-colors text-sm">Press</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-orange-500 font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/help" className="text-white/70 hover:text-orange-400 transition-colors text-sm">Help Center</Link></li>
              <li><Link to="/shipping" className="text-white/70 hover:text-orange-400 transition-colors text-sm">Shipping</Link></li>
              <li><Link to="/returns" className="text-white/70 hover:text-orange-400 transition-colors text-sm">Returns</Link></li>
              <li><Link to="/warranty" className="text-white/70 hover:text-orange-400 transition-colors text-sm">Warranty</Link></li>
            </ul>
          </div>
        </div>

        <div className="relative pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 fluent-divider-footer">
          <p className="text-white/60 text-sm text-center md:text-left">© 2026 EverPaw — All rights reserved</p>
          <div className="flex items-center flex-wrap justify-center gap-4 md:space-x-6 md:gap-0">
            <Link to="/privacy" className="text-white/70 hover:text-orange-400 transition-colors text-sm">Privacy</Link>
            <Link to="/terms" className="text-white/70 hover:text-orange-400 transition-colors text-sm">Terms</Link>
            <Link to="/cookies" className="text-white/70 hover:text-orange-400 transition-colors text-sm">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
