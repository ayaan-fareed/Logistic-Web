'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.scss';

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { name: 'Services', href: isHome ? '#services' : '/services' },
    { name: 'Approach', href: isHome ? '#approach' : '/about' },
    { name: 'Insights', href: isHome ? '#insights' : '/insights' },
    { name: 'Contact', href: isHome ? '#contact' : '/contact' },
  ];

  return (
    <>
      <header className={`${styles.navbar} ${scrolled ? styles.navbarSolid : ''}`}>
        <Link href="/" className={styles.logo} aria-label="United Carriers home">
          <span>UNITED</span>
          <span>CARRIERS</span>
        </Link>

        <nav className={styles.navLinks} aria-label="Primary navigation">
          {links.map((link) => (
            <Link key={link.name} href={link.href}>
              {link.name}
            </Link>
          ))}
        </nav>

        <Link href={isHome ? '#tracking' : '/tracking'} className={styles.trackButton}>
          Live tracking <span>↗</span>
        </Link>

        <button
          className={styles.menuButton}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <i />
          <i />
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}