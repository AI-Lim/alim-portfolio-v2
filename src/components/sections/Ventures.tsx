'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Rocket, Shirt, Zap, Heart } from 'lucide-react'
import Image from 'next/image'

const ventures = [
  {
    id: 'smartb',
    tag: 'Ville Intelligente · IA',
    tagIcon: Rocket,
    name: 'SMART-B',
    logo: '/assets/smartb-logo.png',
    tagline: 'Sustainable · Modern · AI-Driven · Resilient · Traditional · Bénin',
    desc: "SMART-B vise à transformer les villes du Bénin en modèles écologiques et intelligents — pour un équilibre sain et évolutif au bénéfice de la population. L'IA y améliore la qualité de vie, préserve l'environnement et valorise le patrimoine culturel béninois.",
    techs: ['IA', 'Culture', 'Média', 'Impact Bénin'],
    status: 'En développement',
    statusIcon: Zap,
    accent: '#bdce5e',
    bg: '#254f24',
    dark: true,
    stats: [
      { n: '2024', l: 'Fondée' },
      { n: 'IA',   l: 'Cœur de métier' },
      { n: 'BJ',   l: 'Cotonou' },
    ],
  },
  {
    id: 'bayo',
    tag: 'Mode & Artisanat',
    tagIcon: Shirt,
    name: 'BAYO',
    logo: '/assets/bayo-logo.png',
    tagline: 'Fait main. Fait avec amour.',
    desc: "Marque de vêtements au crochet, afro-moderne, produite à la commande au Bénin. Chaque pièce est unique, pensée à la croisée de l'artisanat traditionnel et de l'esthétique contemporaine.",
    techs: ['Mode', 'Crochet', 'Artisanat', 'Sur commande'],
    status: 'Actif',
    statusIcon: Heart,
    accent: '#254f24',
    bg: '#ede9de',
    dark: false,
    stats: [
      { n: 'Main', l: 'Fait au crochet' },
      { n: 'BJ',   l: 'Made in Bénin'  },
      { n: '100%', l: 'Sur commande'   },
    ],
  },
]

export default function Ventures() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const headerY = useTransform(scrollYProgress, [0,1], [40,  -40])
  const card0Y  = useTransform(scrollYProgress, [0,1], [60,  -30])
  const card1Y  = useTransform(scrollYProgress, [0,1], [90,  -20])
  const bgY     = useTransform(scrollYProgress, [0,1], [0,   50])

  return (
    <section ref={ref} id="ventures" style={{
      background: '#1a1a1a',
      padding: 'clamp(60px,10vw,100px) clamp(20px,5vw,56px)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Watermark parallax */}
      <motion.div style={{ y: bgY, position: 'absolute', top: '50%', right: '-24px', transform: 'translateY(-50%)', pointerEvents: 'none', userSelect: 'none' }}>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(80px,16vw,200px)',
          color: 'rgba(255,255,255,.02)',
          letterSpacing: '-4px', lineHeight: 1,
        }}>BUILD</div>
      </motion.div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>

        {/* Header */}
        <motion.div style={{ y: headerY, marginBottom: 'clamp(40px,6vw,64px)' }}>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .6 }}
            style={{
              fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase',
              fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
              color: '#bdce5e', opacity: .6, display: 'block', marginBottom: '10px',
            }}
          >Ce que j'ai créé</motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .7, delay: .1 }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(32px,5vw,60px)',
              fontWeight: 900, color: '#f5f2eb', lineHeight: 1,
            }}
          >
            Mes <span style={{ color: '#bdce5e', fontStyle: 'italic' }}>entreprises</span>
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,380px),1fr))',
          gap: 'clamp(20px,3vw,32px)',
        }}>
          {ventures.map((v, i) => (
            <motion.div
              key={v.id}
              style={{ y: i === 0 ? card0Y : card1Y }}
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .7, delay: i * .15 }}
                whileHover={{ y: -6, boxShadow: v.dark ? '0 24px 64px rgba(0,0,0,.4)' : '0 24px 64px rgba(37,79,36,.15)' }}
                style={{
                  background: v.bg,
                  borderRadius: '12px',
                  padding: 'clamp(28px,4vw,44px)',
                  position: 'relative', overflow: 'hidden',
                  border: v.dark ? 'none' : '1px solid rgba(37,79,36,.12)',
                  cursor: 'default',
                }}
              >
                {/* Grain */}
                <div style={{
                  position: 'absolute', inset: 0, opacity: .03, pointerEvents: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
                }}/>

                {/* Cercles déco */}
                <div style={{ position: 'absolute', bottom: '-60px', right: '-60px', width: '220px', height: '220px', borderRadius: '50%', border: `1px solid ${v.accent}`, opacity: .08, pointerEvents: 'none' }}/>
                <div style={{ position: 'absolute', bottom: '-30px', right: '-30px', width: '140px', height: '140px', borderRadius: '50%', border: `1px solid ${v.accent}`, opacity: .1, pointerEvents: 'none' }}/>

                {/* Header — tag + logo */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    background: v.dark ? 'rgba(189,206,94,.12)' : 'rgba(37,79,36,.08)',
                    border: `1px solid ${v.accent}30`,
                    borderRadius: '20px', padding: '5px 14px',
                  }}>
                    <v.tagIcon size={11} color={v.accent} strokeWidth={2}/>
                    <span style={{
                      fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
                      fontWeight: 700, color: v.accent,
                      fontFamily: "'DM Sans', sans-serif",
                    }}>{v.tag}</span>
                  </div>

                  {/* Logo */}
                  <div style={{
                    width: '100px', height: '100px', borderRadius: '12px',
                    background: v.dark ? 'rgba(255,255,255,.08)' : 'rgba(37,79,36,.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '8px', flexShrink: 0,
                  }}>
                    <img
                      src={v.logo}
                      alt={`${v.name} logo`}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Nom */}
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(52px,8vw,88px)',
                  color: v.dark ? '#f5f2eb' : '#254f24',
                  lineHeight: .9, letterSpacing: '2px', marginBottom: '8px',
                }}>{v.name}</div>

                {/* Tagline */}
                <div style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: 'clamp(16px,2vw,20px)',
                  color: v.accent, marginBottom: '20px',
                  opacity: v.dark ? 1 : .8,
                }}>{v.tagline}</div>

                {/* Séparateur */}
                <div style={{
                  width: '40px', height: '1px',
                  background: `linear-gradient(to right, ${v.accent}, transparent)`,
                  marginBottom: '20px',
                }}/>

                {/* Description */}
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 'clamp(13px,1.5vw,15px)',
                  lineHeight: 1.8,
                  color: v.dark ? 'rgba(245,242,235,.65)' : '#5a5a5a',
                  marginBottom: '24px',
                }}>{v.desc}</p>

                {/* Stats */}
                <div style={{
                  display: 'flex', gap: '24px', flexWrap: 'wrap',
                  paddingTop: '20px', marginBottom: '24px',
                  borderTop: `1px solid ${v.dark ? 'rgba(255,255,255,.08)' : 'rgba(37,79,36,.1)'}`,
                }}>
                  {v.stats.map(s => (
                    <div key={s.l}>
                      <div style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: '22px', color: v.accent, lineHeight: 1,
                      }}>{s.n}</div>
                      <div style={{
                        fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase',
                        color: v.dark ? 'rgba(245,242,235,.4)' : '#9a9a90',
                        fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
                      }}>{s.l}</div>
                    </div>
                  ))}
                </div>

                {/* Techs + Status */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {v.techs.map(t => (
                      <span key={t} style={{
                        background: v.dark ? 'rgba(255,255,255,.07)' : 'rgba(37,79,36,.07)',
                        color: v.dark ? '#bdce5e' : '#254f24',
                        padding: '3px 10px', borderRadius: '4px',
                        fontSize: '10px', fontWeight: 600,
                        fontFamily: "'DM Sans', sans-serif",
                      }}>{t}</span>
                    ))}
                  </div>

                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    background: v.accent,
                    color: v.dark ? '#254f24' : '#f5f2eb',
                    padding: '6px 14px', borderRadius: '4px',
                    fontSize: '10px', fontWeight: 700,
                    fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: '1px', textTransform: 'uppercase',
                  }}>
                    <v.statusIcon size={11} color={v.dark ? '#254f24' : '#f5f2eb'} strokeWidth={2}/>
                    {v.status}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}