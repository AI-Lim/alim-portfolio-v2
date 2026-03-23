'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { GraduationCap, Award, Globe, FlaskConical, TrendingUp, Rabbit, Fingerprint } from 'lucide-react'

const badges = [
  { icon: GraduationCap, title: 'Licence IA — IFRI-UAC',       sub: '2022 – présent · Abomey-Calavi',            tag: 'Formation'    },
  { icon: Award,         title: 'Certifié CM — TITA by MTN',   sub: 'Avril 2025',                                tag: 'Certification'},
  { icon: Globe,         title: 'Deep Learning Indaba 2025',   sub: 'Kigali, Rwanda · Août 2025',                tag: 'Événement'    },
  { icon: FlaskConical,  title: 'FRIARE Africa',               sub: 'Recherche & Innovation · depuis avril 2024', tag: 'Recherche'    },
  { icon: TrendingUp,    title: '+100K vues de contenu',       sub: 'TikTok, Instagram, Facebook',               tag: 'Impact'       },
  { icon: Rabbit,        title: '13 lapins (oui vraiment)',    sub: 'Éleveur · Entrepreneuriat terrain',         tag: 'Vie réelle'   },
]

function Field({ label, value, accent = false, wide = false }: {
  label: string; value: string; accent?: boolean; wide?: boolean
}) {
  return (
    <div style={{
      gridColumn: wide ? 'span 2' : 'span 1',
      borderBottom: '1px solid rgba(37,79,36,.13)',
      paddingBottom: '10px',
    }}>
      <div style={{
        fontSize: '8px', letterSpacing: '2.5px', textTransform: 'uppercase',
        fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
        color: '#9a9a90', marginBottom: '5px',
      }}>{label}</div>
      <div style={{
        fontFamily: accent ? "'Bebas Neue', sans-serif" : "'DM Sans', sans-serif",
        fontSize: accent ? 'clamp(18px,2.5vw,24px)' : 'clamp(12px,1.5vw,14px)',
        fontWeight: accent ? 400 : 600,
        color: accent ? '#254f24' : '#1a1a1a',
        letterSpacing: accent ? '2px' : '0.3px',
        lineHeight: 1.2,
      }}>{value}</div>
    </div>
  )
}

function Badge({ b, index }: { b: typeof badges[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .5, delay: index * .08 }}
      whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(37,79,36,.13)' }}
      style={{
        background: '#f5f2eb',
        border: '1px solid rgba(37,79,36,.1)',
        borderRadius: '6px',
        padding: '20px',
        display: 'flex', flexDirection: 'column', gap: '14px',
        cursor: 'default',
        transition: 'border-color .35s',
        position: 'relative', overflow: 'hidden',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(189,206,94,.5)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(37,79,36,.1)' }}
    >
      {/* Barre top */}
      <motion.div
        initial={{ width: '0%' }}
        whileHover={{ width: '100%' }}
        style={{
          position: 'absolute', top: 0, left: 0,
          height: '2px',
          background: 'linear-gradient(to right, #254f24, #bdce5e)',
          borderRadius: '6px 6px 0 0',
        }}
        transition={{ duration: .4 }}
      />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <motion.div
          whileHover={{ background: '#254f24' }}
          style={{
            width: '48px', height: '48px',
            background: 'rgba(37,79,36,.07)',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, transition: 'background .35s',
          }}
        >
          <b.icon size={22} color="#254f24" strokeWidth={1.6}/>
        </motion.div>
        {b.tag && (
          <div style={{
            fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase',
            fontWeight: 700, color: '#bdce5e', filter: 'brightness(.75)',
            fontFamily: "'DM Sans', sans-serif",
          }}>{b.tag}</div>
        )}
      </div>

      <div>
        <div style={{ fontSize: 'clamp(13px,1.5vw,15px)', fontWeight: 700, color: '#1a1a1a', marginBottom: '5px', fontFamily: "'DM Sans', sans-serif" }}>{b.title}</div>
        <div style={{ fontSize: '12px', color: '#9a9a90', lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>{b.sub}</div>
      </div>
    </motion.div>
  )
}

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const cardY  = useTransform(scrollYProgress, [0,1], [40, -40])
  const badgeY = useTransform(scrollYProgress, [0,1], [60, -20])

  return (
    <section ref={ref} id="about" style={{
      background: '#ede9de',
      padding: 'clamp(60px,10vw,100px) clamp(20px,5vw,56px)',
      position: 'relative',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Eyebrow + titre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          style={{ marginBottom: '48px' }}
        >
          <span className="eyebrow">À propos</span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(32px,5vw,56px)',
            fontWeight: 900, color: '#1a1a1a',
            lineHeight: 1.1, marginTop: '8px',
          }}>
            Qui suis-<span style={{ color: '#254f24' }}>je</span>
          </h2>
        </motion.div>

        {/* Citation hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          style={{ marginBottom: 'clamp(48px,7vw,80px)', position: 'relative', display: 'inline-block' }}
        >
          {/* Guillemet décoratif */}
          <div style={{
            position: 'absolute', top: '-24px', left: '-16px',
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(80px,14vw,140px)',
            color: '#bdce5e', opacity: .18,
            lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
          }}>"</div>

          <blockquote style={{ margin: 0, padding: '0 0 0 8px' }}>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(28px,5.5vw,64px)',
              fontWeight: 900, lineHeight: 1.1,
              color: '#1a1a1a', letterSpacing: '-1px',
            }}>
              Je suis{' '}
              <em style={{ color: '#254f24', fontStyle: 'italic', position: 'relative' }}>
                multipotentiel.
                <svg viewBox="0 0 300 12" style={{
                  position: 'absolute', bottom: '-6px', left: 0,
                  width: '100%', height: '10px', overflow: 'visible',
                }} preserveAspectRatio="none">
                  <path d="M 0 8 Q 75 2 150 8 Q 225 14 300 8"
                    stroke="#bdce5e" strokeWidth="2.5" fill="none"
                    strokeLinecap="round" opacity="0.7"
                  />
                </svg>
              </em>
            </div>
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(28px,5.5vw,64px)',
              fontWeight: 900, lineHeight: 1.1,
              color: '#1a1a1a', letterSpacing: '-1px', marginTop: '8px',
            }}>
              Je refuse de{' '}
              <span style={{ color: 'transparent', WebkitTextStroke: '2px #254f24' }}>choisir.</span>
            </div>
          </blockquote>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,340px),1fr))',
          gap: 'clamp(32px,5vw,64px)',
          alignItems: 'start',
        }}>

          {/* ── CARTE D'IDENTITÉ ── */}
          <motion.div style={{ y: cardY }}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .8 }}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              {/* Header */}
              <div style={{
                background: '#254f24',
                borderRadius: '10px 10px 0 0',
                padding: '18px 24px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div>
                  <div style={{
                    fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase',
                    color: 'rgba(245,242,235,.5)', fontFamily: "'DM Sans',sans-serif",
                    fontWeight: 700, marginBottom: '4px',
                  }}>République du Créatif</div>
                  <div style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '22px', letterSpacing: '3px', color: '#f5f2eb',
                  }}>CARTE D'IDENTITÉ</div>
                </div>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  border: '2px solid rgba(245,242,235,.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Fingerprint size={20} color="rgba(245,242,235,.6)" strokeWidth={1.4}/>
                </div>
              </div>

              {/* Corps */}
              <div style={{
                background: '#fff',
                border: '1px solid rgba(37,79,36,.1)',
                borderTop: 'none',
                borderRadius: '0 0 10px 10px',
                padding: '24px',
              }}>
                {/* Photo + nom */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '24px' }}>
                 <div style={{
  width: '90px', flexShrink: 0,
  border: '2px solid rgba(37,79,36,.12)',
  borderRadius: '4px', overflow: 'hidden',
  aspectRatio: '3/4',
}}>
  <img
    src="/assets/photo.jpg"
    alt="Alim Bachabi"
    style={{
      width: '100%', height: '100%',
      objectFit: 'cover', objectPosition: 'top',
      filter: 'sepia(6%) contrast(1.05)',
    }}
  />
</div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'center' }}>
                    <div style={{ borderBottom: '1px solid rgba(37,79,36,.13)', paddingBottom: '10px' }}>
                      <div style={{ fontSize: '8px', letterSpacing: '2.5px', textTransform: 'uppercase', fontFamily: "'DM Sans',sans-serif", fontWeight: 700, color: '#9a9a90', marginBottom: '5px' }}>Nom complet</div>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(20px,3vw,28px)', color: '#254f24', letterSpacing: '2px', lineHeight: 1.1 }}>ALIM<br/>BACHABI</div>
                    </div>
                    <div style={{ borderBottom: '1px solid rgba(37,79,36,.13)', paddingBottom: '10px' }}>
                      <div style={{ fontSize: '8px', letterSpacing: '2.5px', textTransform: 'uppercase', fontFamily: "'DM Sans',sans-serif", fontWeight: 700, color: '#9a9a90', marginBottom: '5px' }}>Titre</div>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', fontWeight: 600, color: '#1a1a1a' }}>The CreaBuilder</div>
                    </div>
                  </div>
                </div>

                {/* Champs */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 24px', marginBottom: '24px' }}>
                  <Field label="Nationalité"  value="Béninois 🇧🇯" />
                  <Field label="Ville"        value="Cotonou" />
                  <Field label="Formation"    value="Licence IA — IFRI-UAC" accent />
                  <Field label="Statut"       value="Fondateur · Étudiant"  accent />
                  <Field label="Entreprises"  value="SMARTB · BAYO"                    wide />
                  <Field label="Passions"     value="IA · Danse · Storytelling · Création" wide />
                </div>

                {/* MRZ */}
                <div style={{
                  background: 'rgba(37,79,36,.04)',
                  border: '1px dashed rgba(37,79,36,.15)',
                  borderRadius: '4px', padding: '12px 16px',
                  fontFamily: "'Courier New', monospace",
                  fontSize: '10px', color: '#9a9a90',
                  letterSpacing: '1.5px', lineHeight: 1.8, userSelect: 'none',
                }}>
                  BACHABI{'<'}{'<'}ALIM{'<'}{'<'}{'<'}{'<'}CREABUILDER{'<'}{'<'}BJ<br/>
                  IA{'<'}DANSE{'<'}STORYTELLING{'<'}{'<'}{'<'}2025{'<'}{'<'}{'<'}
                </div>
              </div>

              {/* Citation */}
              <blockquote style={{
                marginTop: '24px',
                borderLeft: '3px solid #bdce5e',
                padding: '14px 20px',
                background: 'rgba(189,206,94,.07)',
                borderRadius: '0 4px 4px 0',
                fontFamily: "'Caveat', cursive",
                fontSize: 'clamp(17px,2.2vw,21px)',
                color: '#254f24', lineHeight: 1.6,
              }}>
                "Je crée. Je construis. Je laisse une trace."
              </blockquote>
            </motion.div>
          </motion.div>

          {/* ── BADGES ── */}
          <motion.div style={{ y: badgeY, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{
              fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase',
              fontFamily: "'DM Sans',sans-serif", fontWeight: 700,
              color: '#9a9a90', marginBottom: '8px',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(37,79,36,.12)' }}/>
              Expériences
              <div style={{ flex: 1, height: '1px', background: 'rgba(37,79,36,.12)' }}/>
            </div>
            {badges.map((b, i) => <Badge key={b.title} b={b} index={i} />)}
          </motion.div>

        </div>
      </div>
    </section>
  )
}