'use client'

import { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import { useLang } from '@/lib/LangContext'

const navLinks = [
  { label: 'À propos',  href: '#about'    },
  { label: 'Univers',   href: '#universe' },
  { label: 'Projets',   href: '#projects' },
  { label: 'CreaLab',   href: '#crealab'  },
  { label: 'Services',  href: '#services' },
  { label: 'Journal',   href: '#blog'     },
  { label: 'Contact',   href: '#contact'  },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const { lang, setLang } = useLang()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 900,
        background: scrolled ? 'rgba(245,242,235,.97)' : 'rgba(245,242,235,.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${scrolled ? 'rgba(37,79,36,.15)' : 'transparent'}`,
        transition: 'all .4s',
      }}>
        {/* Ligne top */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: 'linear-gradient(to right, transparent, #bdce5e, #254f24, #bdce5e, transparent)',
          opacity: .6,
        }} />

        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          padding: '0 clamp(20px,4vw,48px)',
          display: 'flex', alignItems: 'center',
          height: '64px', gap: '24px',
        }}>

          {/* Logo */}
          <a href="#hero" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <div style={{ fontFamily: "'Caveat', cursive", fontSize: '11px', letterSpacing: '3px', color: 'rgba(37,79,36,.5)', textTransform: 'uppercase' }}>the</div>
            <div style={{ fontFamily: "'Caveat', cursive", fontSize: '22px', fontWeight: 700, color: '#254f24', lineHeight: 1 }}>CreaBuilder</div>
          </a>

          {/* Links desktop */}
          <ul className="hide-mobile" style={{
            flex: 1, display: 'flex', gap: 'clamp(12px,2vw,28px)',
            listStyle: 'none', alignItems: 'center', justifyContent: 'center',
          }}>
            {navLinks.map(link => (
              <li key={link.label}>
                <a href={link.href} style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '11px', fontWeight: 700,
                  color: 'rgba(37,79,36,.6)',
                  textDecoration: 'none', letterSpacing: '2px',
                  textTransform: 'uppercase',
                  transition: 'color .2s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#254f24')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(37,79,36,.6)')}
                >{link.label}</a>
              </li>
            ))}
          </ul>

          {/* Droite — lang + CTA */}
          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            {/* Bouton langue */}
            <button
             onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              style={{
                background: 'none',
                border: '1.5px solid rgba(37,79,36,.2)',
                color: '#254f24',
                padding: '5px 12px', borderRadius: '3px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '11px', fontWeight: 700,
                letterSpacing: '2px', cursor: 'pointer',
                transition: 'all .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#254f24'; e.currentTarget.style.color = '#f5f2eb' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#254f24' }}
            >{lang === 'fr' ? 'EN' : 'FR'}</button>

            {/* CTA */}
            <a href="#contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: '#254f24', color: '#f5f2eb',
              padding: '9px 20px', borderRadius: '3px',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px', fontWeight: 700,
              letterSpacing: '2px', textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all .3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#bdce5e'; e.currentTarget.style.color = '#254f24' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#254f24'; e.currentTarget.style.color = '#f5f2eb' }}
            >
              Travailler ensemble
              <ArrowUpRight size={13} />
            </a>
          </div>

          {/* Hamburger mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hide-desktop"
            style={{
              background: 'none', border: '1px solid rgba(37,79,36,.2)',
              padding: '8px', borderRadius: '3px',
              cursor: 'pointer', marginLeft: 'auto',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {menuOpen ? <X size={20} color="#254f24" /> : <Menu size={20} color="#254f24" />}
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 800,
        background: '#f5f2eb',
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'all' : 'none',
        transition: 'opacity .35s',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '20px',
      }}>
        {navLinks.map((link, i) => (
          <a key={link.label} href={link.href}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(36px,7vw,52px)',
              color: '#254f24', textDecoration: 'none',
              letterSpacing: '4px',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `all .4s ${i * 0.06}s`,
            }}
          >{link.label}</a>
        ))}

        {/* Lang mobile */}
        <button
  onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}>{lang === 'fr' ? 'EN' : 'FR'}</button>
      </div>
    </>
  )
}


// Dans le composant, remplace useState lang par :
