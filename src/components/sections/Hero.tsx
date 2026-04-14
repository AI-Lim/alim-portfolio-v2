'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight, MapPin, Sparkles, BookOpen, Eye, Layers, Rabbit, Cpu, Footprints, Shirt, Rocket } from 'lucide-react'
import { useLang } from '@/lib/LangContext'
import { t } from '@/lib/i18n'

const stats = [
  { n: '3+',    l: { fr: 'Ans en IA',    en: 'Years in AI'   }, icon: BookOpen  },
  { n: '100K+', l: { fr: 'Vues créées',  en: 'Views created' }, icon: Eye       },
  { n: '2',     l: { fr: 'Marques',      en: 'Brands'        }, icon: Layers    },
  { n: '13',    l: { fr: 'Lapins',       en: 'Rabbits'       }, icon: Rabbit    },
]

const tags = [
  { label: 'IA',     icon: Cpu,        en: 'AI'    },
  { label: 'Danse',  icon: Footprints, en: 'Dance' },
  { label: 'BAYO',   icon: Shirt,      en: 'BAYO'  },
  { label: 'SMARTB', icon: Rocket,     en: 'SMARTB'},
]

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { lang } = useLang()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0,1], ['0%', '12%'])
  const textY  = useTransform(scrollYProgress, [0,1], ['0%', '8%'])

  return (
    <>
      <style>{`
        .hero-section {
          min-height: 100svh;
          background: #f5f2eb;
          padding: 100px 24px 80px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
        }
        .hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        .hero-left { min-width: 0; }
        .hero-right {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .hero-name-big {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(80px, 12vw, 160px);
          line-height: 0.85;
          color: #1a2e1a;
          letter-spacing: -2px;
          margin: 0;
        }
        .hero-name-outline {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(40px, 6vw, 100px);
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 2px #254f24;
          letter-spacing: 4px;
          margin: 0 0 0 clamp(4px, 1vw, 16px);
        }
        .hero-tagline {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(26,46,26,.5);
          margin: 14px 0 24px;
          line-height: 2;
        }
        .hero-ctas {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }
        .hero-stats {
          display: flex;
          gap: clamp(16px, 3vw, 32px);
          flex-wrap: wrap;
          padding-top: 24px;
          border-top: 1px solid rgba(37,79,36,.12);
        }
        .polaroid-wrap {
          position: relative;
          width: 100%;
          max-width: 320px;
        }
        .polaroid-card {
          background: #fff;
          padding: 12px 12px 48px;
          box-shadow: 6px 10px 40px rgba(37,79,36,.16);
          transform: rotate(2deg);
          transition: transform .4s, box-shadow .4s;
          position: relative;
          z-index: 2;
        }
        .polaroid-card:hover {
          transform: rotate(0deg) scale(1.02);
          box-shadow: 10px 18px 50px rgba(37,79,36,.22);
        }
        .polaroid-img {
          width: 100%;
          height: clamp(200px, 30vw, 340px);
          object-fit: cover;
          object-position: top;
          display: block;
          filter: sepia(8%) contrast(1.05);
        }
        .float-tag {
          position: absolute;
          background: #254f24;
          color: #f5f0e8;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 6px 12px;
          border-radius: 3px;
          white-space: nowrap;
          box-shadow: 2px 4px 16px rgba(37,79,36,.2);
          z-index: 10;
        }
        .scroll-hint {
          position: absolute;
          bottom: 28px;
          left: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 10;
        }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .hero-section {
            padding: 88px 20px 64px;
            align-items: flex-start;
          }
          .hero-inner {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .hero-right {
            order: -1;
          }
          .polaroid-wrap {
            max-width: 240px;
            margin: 0 auto;
          }
          .polaroid-img {
            height: 200px;
          }
          .float-tag {
            font-size: 9px;
            padding: 5px 10px;
          }
          .hero-tagline {
            font-size: 10px;
            letter-spacing: 2px;
          }
          .hero-stats {
            gap: 16px;
          }
          .scroll-hint {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .hero-section {
            padding: 80px 16px 56px;
          }
          .polaroid-wrap {
            max-width: 200px;
          }
          .float-tag {
            display: none;
          }
          .hero-ctas {
            flex-direction: column;
          }
          .hero-ctas a {
            text-align: center;
            justify-content: center;
          }
        }
      `}</style>

      <section ref={ref} id="hero" className="hero-section">

        {/* Grille de points fond */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
          {Array.from({ length: 6 }, (_, row) =>
            Array.from({ length: 10 }, (_, col) => (
              <circle key={`${row}-${col}`} cx={col * 130 + 65} cy={row * 130 + 65} r="1.5" fill="rgba(37,79,36,.1)"/>
            ))
          )}
        </svg>

        {/* Watermark */}
        <div aria-hidden="true" style={{
          position: 'absolute', right: '2%', top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(80px, 18vw, 280px)',
          color: 'rgba(189,206,94,.04)',
          lineHeight: 1, pointerEvents: 'none',
          userSelect: 'none', letterSpacing: '-4px',
        }}>20</div>

        <div className="hero-inner" style={{ position: 'relative', zIndex: 2 }}>

          {/* ── GAUCHE ── */}
          <motion.div className="hero-left" style={{ y: textY }}>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .2, duration: .6 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: "'Caveat', cursive", fontSize: 'clamp(14px, 2vw, 18px)', color: '#254f24', marginBottom: '10px' }}
            >
              <Sparkles size={14} color="#bdce5e" strokeWidth={1.5}/>
              {lang === 'fr' ? 'Bienvenue dans mon univers' : 'Welcome to my universe'}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .3, duration: .7 }}
            >
              <h1 className="hero-name-big">ALIM</h1>
              <h1 className="hero-name-outline">BACHABI</h1>
            </motion.div>

            <motion.p
              className="hero-tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: .5, duration: .6 }}
            >
              The CreaBuilder &middot;{' '}
              <span style={{ color: '#254f24' }}>{lang === 'fr' ? 'Étudiant IA' : 'AI Student'}</span>
              {' '}&middot; {lang === 'fr' ? 'Danseur' : 'Dancer'} &middot;{' '}
              <span style={{ color: '#254f24' }}>{lang === 'fr' ? 'Fondateur' : 'Founder'}</span>
            </motion.p>

            <motion.div
              className="hero-ctas"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .6, duration: .6 }}
            >
              <HeroBtn href="#projects" primary>
                {lang === 'fr' ? 'Voir mes projets' : 'See my work'} <ArrowRight size={13}/>
              </HeroBtn>
              <HeroBtn href="#contact">
                {lang === 'fr' ? 'Me contacter' : 'Contact me'} <ArrowUpRight size={13}/>
              </HeroBtn>
            </motion.div>

            <motion.div
              className="hero-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: .7, duration: .6 }}
            >
              {stats.map(s => (
                <div key={s.n} style={{ flexShrink: 0 }}>
                  <s.icon size={13} color="#bdce5e" strokeWidth={1.8} style={{ opacity: .8 }}/>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(20px, 3vw, 32px)', color: '#254f24', lineHeight: 1, marginTop: '4px' }}>{s.n}</div>
                  <div style={{ fontSize: '9px', color: '#7a7a6a', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '2px' }}>{s.l[lang]}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── DROITE — Polaroid ── */}
          <div className="hero-right">
            <motion.div
              className="polaroid-wrap"
              style={{ y: photoY }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .4, duration: .8 }}
            >
              {/* Tags flottants */}
              {tags.map((tag, i) => {
                const positions = [
                  { top: '8%',     left:  '-44px' },
                  { top: '30%',    right: '-52px' },
                  { bottom: '30%', left:  '-52px' },
                  { bottom: '10%', right: '-44px' },
                ]
                return (
                  <motion.div
                    key={tag.label}
                    className="float-tag"
                    style={positions[i]}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3.5 + i * .4, repeat: Infinity, delay: i * .6, ease: 'easeInOut' }}
                  >
                    <tag.icon size={10} color="#f5f0e8" strokeWidth={2}/>
                    {lang === 'fr' ? tag.label : tag.en}
                  </motion.div>
                )
              })}

              {/* Polaroid */}
              <div className="polaroid-card">
                <img
                  src="/assets/photo.jpg"
                  alt="Alim Bachabi"
                  className="polaroid-img"
                />
                <div style={{ position: 'absolute', bottom: '12px', left: 0, right: 0, textAlign: 'center', fontFamily: "'Caveat', cursive", fontSize: '14px', color: '#4a4a3a', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                  <MapPin size={12} color="#4a4a3a"/>
                  {lang === 'fr' ? 'Abomey-Calavi, Bénin 🇧🇯' : 'Cotonou, Benin 🇧🇯'}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="scroll-hint">
          <div style={{ width: '32px', height: '1px', background: '#254f24', opacity: .5 }}/>
          <span style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(37,79,36,.5)' }}>Scroll</span>
        </div>
      </section>
    </>
  )
}


function HeroBtn({
  href,
  children,
  primary,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  const [h, setH] = useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "12px 22px",
        background: h
          ? primary
            ? "#1e3f1d"
            : "rgba(37,79,36,.06)"
          : primary
          ? "#254f24"
          : "transparent",
        color: primary ? "#f5f2eb" : "#254f24",
        border: `2px solid ${
          primary ? "#254f24" : "rgba(37,79,36,.3)"
        }`,
        borderRadius: "3px",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "2px",
        textTransform: "uppercase",
        textDecoration: "none",
        transition: "all .25s",
        transform: h ? "translateY(-2px)" : "none",
      }}
    >
      {children}
    </a>
  )
}
