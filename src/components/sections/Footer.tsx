'use client'

import { motion } from 'framer-motion'
import { Heart, Instagram, Github, Linkedin, Facebook } from 'lucide-react'

const navLinks = [
  { label: 'À propos',  href: '#about'    },
  { label: 'Univers',   href: '#universe' },
  { label: 'Projets',   href: '#projects' },
  { label: 'CreaLab',   href: '#crealab'  },
  { label: 'Services',  href: '#services' },
  { label: 'Journal',   href: '#blog'     },
  { label: 'Contact',   href: '#contact'  },
]

const socials = [
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/alim.bachabi'                          },
  { icon: Facebook,  label: 'Facebook',  href: 'https://www.facebook.com/abdel.alim.bachabi'                 },
  { icon: Github,    label: 'GitHub',    href: 'https://github.com/ai-lim'                                   },
  { icon: Linkedin,  label: 'LinkedIn',  href: 'https://www.linkedin.com/in/alim-bachabi-033789301/'         },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ background: '#1a1a1a', position: 'relative', overflow: 'hidden' }}>
      <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(189,206,94,.4), transparent)' }}/>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(40px,6vw,64px) clamp(20px,5vw,56px) clamp(24px,4vw,40px)', display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: '32px' }}>

        {/* Logo */}
        <div>
          <a href="#hero" style={{ textDecoration: 'none', display: 'block' }}>
            <motion.div whileHover={{ color: '#bdce5e' }} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(32px,5vw,48px)', letterSpacing: '4px', color: '#f5f2eb', lineHeight: 1 }}>ALIM</motion.div>
          </a>
          <div style={{ fontFamily: "'Caveat',cursive", fontSize: '13px', color: 'rgba(245,242,235,.25)', marginTop: '2px' }}>The CreaBuilder ✦</div>
        </div>

        {/* Nav */}
        <nav style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 'clamp(16px,3vw,32px)' }}>
          {navLinks.map(l => (
            <motion.a key={l.label} href={l.href} whileHover={{ color: '#bdce5e' }} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase' as const, fontWeight: 700, color: 'rgba(245,242,235,.25)', textDecoration: 'none' }}>
              {l.label}
            </motion.a>
          ))}
        </nav>

        {/* Socials */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {socials.map(s => (
            <motion.a key={s.label} href={s.href} target="_blank" rel="noreferrer" title={s.label}
              whileHover={{ borderColor: 'rgba(189,206,94,.5)', background: 'rgba(189,206,94,.08)', color: '#bdce5e' }}
              style={{ width: '36px', height: '36px', borderRadius: '6px', border: '1px solid rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(245,242,235,.3)', textDecoration: 'none' }}
            >
              <s.icon size={15} strokeWidth={1.8}/>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Bas */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,.05)', padding: 'clamp(14px,2vw,20px) clamp(20px,5vw,56px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{ fontSize: '11px', color: 'rgba(245,242,235,.18)', fontFamily: "'DM Sans',sans-serif" }}>© {year} Abdel Alim Bachabi — Tous droits réservés</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'rgba(245,242,235,.18)', fontFamily: "'DM Sans',sans-serif" }}>
          <span>Fait avec</span>
          <Heart size={11} color="#bdce5e" strokeWidth={2} style={{ opacity: .7 }}/>
          <span>depuis Cotonou 🇧🇯</span>
        </div>
      </div>

      {/* Watermark */}
      <div style={{ position: 'absolute', bottom: '-16px', left: '50%', transform: 'translateX(-50%)', fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(60px,12vw,140px)', color: 'rgba(255,255,255,.02)', letterSpacing: '16px', userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap', lineHeight: 1 }}>ALIM BACHABI</div>
    </footer>
  )
}