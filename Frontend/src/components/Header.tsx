import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Home', to: '/selectCharacter' },
  { label: 'Customize Chat', to: '/selectVisuals' },
  { label: 'Generate Image', to: '/generateImg' },
  { label: 'Chat', to: '/chatpage' },
  { label: 'Payment', to: '/payment' },
  { label: 'Login / Sign Up', to: '/login' },
];

const Header: React.FC = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="glass-card rounded-none border-0 border-b border-white/10 backdrop-blur-xl bg-dark-900/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/selectCharacter" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-accent-500/30 group-hover:shadow-accent-500/50 transition-all duration-300">
              UA
            </div>
            <span className="font-bold text-lg gradient-text hidden sm:block">ChatAI</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-accent-500/20 text-accent-400 border border-accent-500/30'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden btn-ghost p-2"
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            <div className="space-y-1">
              <span className={`block h-0.5 w-5 bg-white transition-transform duration-200 ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-0.5 w-5 bg-white transition-opacity duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-5 bg-white transition-transform duration-200 ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 px-4 py-3 space-y-1 animate-fade-in">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-accent-500/20 text-accent-400'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
