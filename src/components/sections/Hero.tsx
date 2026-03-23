'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight, MapPin, Sparkles, BookOpen, Eye, Layers, Rabbit } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import Image from 'next/image'
import { Cpu, Footprints, Shirt, Rocket } from 'lucide-react'

const stats = [
  { n: '3+',    l: 'Ans en IA',    icon: <BookOpen size={14} color="#bdce5e" strokeWidth={1.8}/> },
  { n: '100K+', l: 'Vues créées',  icon: <Eye      size={14} color="#bdce5e" strokeWidth={1.8}/> },
  { n: '2',     l: 'Marques',      icon: <Layers   size={14} color="#bdce5e" strokeWidth={1.8}/> },
  { n: '13',    l: 'Lapins',       icon: <Rabbit   size={14} color="#bdce5e" strokeWidth={1.8}/> },
]


const tags = [
  { label: 'IA',     icon: <Cpu       size={11} color="#f5f0e8" strokeWidth={2}/> },
  { label: 'Danse',  icon: <Footprints size={11} color="#f5f0e8" strokeWidth={2}/> },
  { label: 'BAYO',   icon: <Shirt     size={11} color="#f5f0e8" strokeWidth={2}/> },
  { label: 'SMARTB', icon: <Rocket    size={11} color="#f5f0e8" strokeWidth={2}/> },
]
const tagPositions = [
  { top: '8%',     left:  '-52px' },
  { top: '28%',    right: '-60px' },
  { bottom: '28%', left:  '-60px' },
  { bottom: '10%', right: '-52px' },
]

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // Parallax layers
  const bgY       = useTransform(scrollYProgress, [0,1], ['0%',  '30%'])
  const textY     = useTransform(scrollYProgress, [0,1], ['0%',  '18%'])
  const photoY    = useTransform(scrollYProgress, [0,1], ['0%',  '10%'])
  const tagsY     = useTransform(scrollYProgress, [0,1], ['0%',  '22%'])

  return (
    <section ref={ref} id="hero" style={{
      minHeight: '100svh',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '100px clamp(20px,5vw,56px) 80px',
      position: 'relative', overflow: 'hidden',
      background: '#f5f2eb',
    }}>

      {/* Fond parallax — grille de points */}
      <motion.div style={{ y: bgY, position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <svg width="100%" height="100%" style={{ opacity: .6 }}>
          {Array.from({ length: 8 }, (_, row) =>
            Array.from({ length: 12 }, (_, col) => (
              <circle key={`${row}-${col}`}
                cx={col * 110 + 55} cy={row * 110 + 55} r="1.5"
                fill="rgba(37,79,36,.15)"
              />
            ))
          )}
          <line x1="0" y1="120" x2="100%" y2="120" stroke="rgba(37,79,36,.06)" strokeWidth="1"/>
          <line x1="0" y1="780" x2="100%" y2="780" stroke="rgba(37,79,36,.06)" strokeWidth="1"/>
        </svg>
      </motion.div>

      {/* Watermark parallax */}
      <motion.div style={{ y: bgY }} aria-hidden="true" className="wm">20</motion.div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 'clamp(32px,6vw,80px)',
        alignItems: 'center',
        position: 'relative', zIndex: 5,
        maxWidth: '1200px', margin: '0 auto', width: '100%',
      }}>

        {/* ── GAUCHE ── */}
        <motion.div style={{ y: textY }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .2, duration: .7 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontFamily: "'Caveat', cursive",
              fontSize: 'clamp(15px,2.2vw,20px)',
              color: '#254f24', marginBottom: '12px',
            }}
          >
            <Sparkles size={16} color="#bdce5e" strokeWidth={1.5}/>
            Bienvenue dans mon univers
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .3, duration: .7 }}
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(72px,13vw,168px)',
              lineHeight: .82, color: '#1a2e1a',
              letterSpacing: '-2px',
            }}
          >ALIM</motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .35, duration: .7 }}
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(38px,7vw,104px)',
              lineHeight: 1, color: 'transparent',
              WebkitTextStroke: '2px #254f24',
              letterSpacing: '5px',
              marginLeft: 'clamp(6px,1.5vw,20px)',
            }}
          >BACHABI</motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .5, duration: .6 }}
            style={{
              fontSize: 'clamp(10px,1.3vw,12px)', fontWeight: 600,
              letterSpacing: '3px', textTransform: 'uppercase',
              color: 'rgba(26,46,26,.5)',
              margin: '16px 0 24px', lineHeight: 1.8,
            }}
          >
            The CreaBuilder &middot;{' '}
            <span style={{ color: '#254f24' }}>Étudiant IA</span>
            {' '}&middot; Danseur &middot;{' '}
            <span style={{ color: '#254f24' }}>Fondateur</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .6, duration: .6 }}
            style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}
          >
            <HeroBtn href="#projects" primary>
              Voir mes projets <ArrowRight size={13}/>
            </HeroBtn>
            <HeroBtn href="#contact">
              Me contacter <ArrowUpRight size={13}/>
            </HeroBtn>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .7, duration: .6 }}
            style={{
              display: 'flex', gap: 'clamp(12px,2.5vw,28px)',
              flexWrap: 'wrap', paddingTop: '24px',
              borderTop: '1px solid rgba(37,79,36,.12)',
            }}
          >
            {stats.map(s => (
              <div key={s.l} style={{ flexShrink: 0 }}>
                <div style={{ fontSize: '16px', marginBottom: '2px' }}>{s.icon}</div>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(22px,3.5vw,36px)',
                  color: '#254f24', lineHeight: 1,
                }}>{s.n}</div>
                <div style={{
                  fontSize: '10px', color: '#7a7a6a',
                  letterSpacing: '1px', textTransform: 'uppercase', marginTop: '3px',
                }}>{s.l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── DROITE — Polaroid ── */}
        <motion.div style={{ y: photoY, display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', maxWidth: '340px', width: '100%' }}>

            {/* Tags parallax */}
            <motion.div style={{ y: tagsY }}>
              {tags.map((tag, i) => (
                <motion.div
                  key={tag.label}
                  style={{
                    position: 'absolute', ...tagPositions[i],
                    background: '#254f24', color: '#f5f0e8',
                    display: 'flex', alignItems: 'center', gap: '6px',
                    fontSize: '10px', fontWeight: 700,
                    letterSpacing: '1.5px', textTransform: 'uppercase',
                    padding: '6px 14px', borderRadius: '3px',
                    boxShadow: '2px 4px 16px rgba(37,79,36,.2)',
                    whiteSpace: 'nowrap', zIndex: 10,
                  }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
                >
                  <span>{tag.icon}</span> {tag.label}
                </motion.div>
              ))}
            </motion.div>

            {/* Polaroid */}
            <motion.div
              whileHover={{ rotate: 0, scale: 1.02 }}
              initial={{ rotate: 2 }}
              style={{
                background: '#fff',
                padding: '12px 12px 52px',
                boxShadow: '6px 10px 40px rgba(37,79,36,.16), 0 2px 8px rgba(0,0,0,.08)',
                position: 'relative', zIndex: 2,
                rotate: 2,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div style={{
  width: '100%',
  height: 'clamp(240px,38vw,400px)',
  overflow: 'hidden',
}}>
  <img
    src="/assets/photo.jpg"
    alt="Alim Bachabi"
    style={{
      width: '100%', height: '100%',
      objectFit: 'cover', objectPosition: 'top',
      filter: 'sepia(8%) contrast(1.05)',
    }}
  />
</div>
              <div style={{
                position: 'absolute', bottom: '14px', left: 0, right: 0,
                textAlign: 'center',
                fontFamily: "'Caveat', cursive",
                fontSize: '16px', color: '#4a4a3a',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              }}>
                <MapPin size={13} color="#4a4a3a"/>
                Abomey-Calavi, Bénin 🇧🇯
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        animate={{ opacity: [.5, 1, .5] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: 'absolute', bottom: '28px',
          left: 'clamp(20px,5vw,56px)',
          display: 'flex', alignItems: 'center', gap: '10px',
          zIndex: 10,
        }}
      >
        <div style={{ width: '36px', height: '1px', background: '#254f24', opacity: .5 }}/>
        <span style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(37,79,36,.5)' }}>Scroll</span>
      </motion.div>
    </section>
  )
}

function HeroBtn({ href, children, primary }: { href: string; children: React.ReactNode; primary?: boolean }) {
  const [h, setH] = useState(false)
  return (
    <a href={href} style={{
      display: 'inline-flex', alignItems: 'center', gap: '8px',
      padding: '11px 24px',
      background: h ? (primary ? '#1e3f1d' : 'rgba(37,79,36,.06)') : (primary ? '#254f24' : 'transparent'),
      color: primary ? '#f5f2eb' : '#254f24',
      border: `2px solid ${primary ? '#254f24' : 'rgba(37,79,36,.3)'}`,
      borderRadius: '3px',
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '11px', fontWeight: 700,
      letterSpacing: '2px', textTransform: 'uppercase',
      textDecoration: 'none',
      transition: 'all .25s',
      transform: h ? 'translateY(-2px)' : 'none',
    }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >{children}</a>
  )
}