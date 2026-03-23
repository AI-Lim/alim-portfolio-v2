'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Award, Globe, Cpu, Trophy, Code2, Server, Brain, Code, Sparkles, Users, Mic, Zap, MessageCircle, Wrench, Languages } from 'lucide-react'

const certifications = [
  { icon: Award,   title: 'Community Manager Certifié', org: 'TITA by MTN',             date: 'Avril 2025' },
  { icon: Globe,   title: 'Deep Learning Indaba 2025',  org: 'Kigali, Rwanda',           date: 'Août 2025'  },
  { icon: Cpu,     title: 'TensorFlow / Keras Bootcamp',org: 'Free Bootcamp Certificate', date: '2024'       },
  { icon: Trophy,  title: 'Bénin Multimodal IA Hackathon', org: 'Certificate of Participation', date: '2024' },
]

const techSkills = [
  { label: 'Python',              level: 78, icon: Code     },
  { label: 'React.js',            level: 65, icon: Code2    },
  { label: 'TensorFlow / Keras',  level: 60, icon: Cpu      },
  { label: 'Flask',               level: 55, icon: Server   },
  { label: 'NLP / IA multimodale',level: 62, icon: Brain    },
  { label: 'Selenium / Scraping', level: 58, icon: Globe    },
]

const softSkills = [
  { label: 'Créativité',    level: 95, icon: Sparkles       },
  { label: 'Leadership',    level: 82, icon: Users          },
  { label: 'Storytelling',  level: 90, icon: Mic            },
  { label: 'Adaptabilité',  level: 88, icon: Zap            },
  { label: 'Communication', level: 85, icon: MessageCircle  },
]

const tools = [
  { label: 'Canva',               icon: 'Palette',    cat: 'Design'    },
  { label: 'Figma',               icon: 'Figma',      cat: 'Design'    },
  { label: 'VS Code',             icon: 'Code2',      cat: 'Dev'       },
  { label: 'GitHub',              icon: 'Github',     cat: 'Dev'       },
  { label: 'Google Colab',        icon: 'Cpu',        cat: 'Dev'       },
  { label: 'Jupyter',             icon: 'Terminal',   cat: 'Dev'       },
  { label: 'Pandas',              icon: 'BarChart3',  cat: 'Dev'       },
  { label: 'CapCut',              icon: 'Video',      cat: 'Contenu'   },
  { label: 'DaVinci Resolve',     icon: 'Film',       cat: 'Contenu'   },
  { label: 'TikTok',              icon: 'Smartphone', cat: 'Contenu'   },
  { label: 'Meta Business Suite', icon: 'LayoutGrid', cat: 'Marketing' },
  { label: 'Google Analytics',    icon: 'TrendingUp', cat: 'Marketing' },
  { label: 'Notion',              icon: 'BookOpen',   cat: 'Prod'      },
  { label: 'Trello',              icon: 'Kanban',     cat: 'Prod'      },
  { label: 'ChatGPT',             icon: 'Bot',        cat: 'IA'        },
  { label: 'Hugging Face',        icon: 'Brain',      cat: 'IA'        },
]

const languages = [
  { label: 'Français', level: 95, flag: '🇫🇷', note: 'Courant'        },
  { label: 'Anglais',  level: 68, flag: '🇬🇧', note: 'Intermédiaire'  },
  { label: 'Fon',      level: 50, flag: '🇧🇯', note: ''               },
]

const CAT_COLORS: Record<string, string> = {
  Design: '#bdce5e', Dev: '#254f24', Contenu: '#7a9e3b',
  Marketing: '#e8a020', Prod: '#9ab34a', IA: '#4a7a30',
}

function ProgressBar({ level, color = '#bdce5e', delay = 0, dark = false }: {
  level: number; color?: string; delay?: number; dark?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [filled, setFilled] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setFilled(true); obs.disconnect() } },
      { threshold: .3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{
      height: '4px',
      background: dark ? 'rgba(255,255,255,.1)' : 'rgba(37,79,36,.08)',
      borderRadius: '4px', overflow: 'hidden', marginTop: '8px',
    }}>
      <div style={{
        height: '100%',
        width: filled ? `${level}%` : '0%',
        background: `linear-gradient(to right, ${color}, ${dark ? '#fff' : '#bdce5e'})`,
        borderRadius: '4px',
        transition: `width 1.1s ${delay}s cubic-bezier(.22,1,.36,1)`,
      }}/>
    </div>
  )
}

function CertCard({ c, index }: { c: typeof certifications[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .5, delay: index * .1 }}
      whileHover={{ y: -3, borderColor: 'rgba(189,206,94,.5)', background: 'rgba(189,206,94,.1)' }}
      style={{
        background: 'rgba(255,255,255,.06)',
        border: '1px solid rgba(189,206,94,.2)',
        borderRadius: '8px', padding: '20px',
        display: 'flex', gap: '16px', alignItems: 'flex-start',
        cursor: 'default', position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', left: 0, top: '15%', bottom: '15%',
        width: '2px', background: '#bdce5e', borderRadius: '2px', opacity: .7,
      }}/>
      <div style={{
        width: '44px', height: '44px', borderRadius: '8px',
        background: 'rgba(189,206,94,.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <c.icon size={20} color="#bdce5e" strokeWidth={1.6}/>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(12px,1.4vw,14px)', fontWeight: 700, color: '#f5f2eb', marginBottom: '4px' }}>{c.title}</div>
        <div style={{ fontSize: '11px', color: 'rgba(245,242,235,.5)', fontFamily: "'DM Sans',sans-serif" }}>{c.org}</div>
      </div>
      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '14px', letterSpacing: '1px', color: '#bdce5e', opacity: .7, flexShrink: 0 }}>{c.date}</div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef<HTMLElement>(null)
  const ref2 = useRef<HTMLElement>(null)
  const [activeCat, setActiveCat] = useState<string | null>(null)

  const { scrollYProgress: sp1 } = useScroll({ target: ref,  offset: ['start end', 'end start'] })
  const { scrollYProgress: sp2 } = useScroll({ target: ref2, offset: ['start end', 'end start'] })

  const headerY1 = useTransform(sp1, [0,1], [40, -40])
  const headerY2 = useTransform(sp2, [0,1], [40, -40])
  const col1Y    = useTransform(sp2, [0,1], [60, -30])
  const col2Y    = useTransform(sp2, [0,1], [90, -20])

  return (
    <>
      {/* ── BLOC 1 — SOMBRE : Certifications ── */}
      <section ref={ref} id="skills" className="torn-top" style={{
        background: '#254f24',
        padding: 'clamp(60px,10vw,100px) clamp(20px,5vw,56px)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', userSelect: 'none' }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(80px,18vw,220px)', color: 'rgba(255,255,255,.025)', letterSpacing: '-4px', lineHeight: 1 }}>CERT</div>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div style={{ y: headerY1, marginBottom: 'clamp(36px,5vw,56px)' }}>
            <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }} style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase' as const, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, color: '#bdce5e', opacity: .7, display: 'block', marginBottom: '10px' }}>Reconnaissance</motion.span>
            <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7, delay: .1 }} style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px,5vw,60px)', fontWeight: 900, color: '#f5f2eb', lineHeight: 1 }}>
              Certifications<br/><span style={{ color: '#bdce5e', fontStyle: 'italic' }}>&amp; distinctions</span>
            </motion.h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: '16px' }}>
            {certifications.map((c, i) => <CertCard key={c.title} c={c} index={i}/>)}
          </div>
        </div>
      </section>

      {/* ── BLOC 2 — CLAIR : Compétences + Outils + Langues ── */}
      <section ref={ref2} className="torn-top" style={{
        background: '#ede9de',
        padding: 'clamp(60px,10vw,100px) clamp(20px,5vw,56px)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div style={{ y: headerY2, marginBottom: 'clamp(40px,6vw,64px)' }}>
            <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="eyebrow">Savoir-faire</motion.span>
            <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .1 }} className="section-title">
              Compétences &amp; <span className="acc">outils</span>
            </motion.h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))', gap: 'clamp(40px,6vw,72px)', alignItems: 'start' }}>

            {/* COL GAUCHE */}
            <motion.div style={{ y: col1Y, display: 'flex', flexDirection: 'column', gap: '48px' }}>

              {/* Tech */}
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#254f24', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Code2 size={16} color="#bdce5e" strokeWidth={1.8}/>
                  </div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '22px', letterSpacing: '2px', color: '#1a1a1a' }}>Techniques</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {techSkills.map((s, i) => (
                    <div key={s.label}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                        <s.icon size={13} color="#254f24" strokeWidth={1.8}/>
                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', fontWeight: 600, color: '#1a1a1a' }}>{s.label}</span>
                      </div>
                      <ProgressBar level={s.level} color="#254f24" delay={i * .08}/>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Soft */}
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .6, delay: .1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#bdce5e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Sparkles size={16} color="#254f24" strokeWidth={1.8}/>
                  </div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '22px', letterSpacing: '2px', color: '#1a1a1a' }}>Soft Skills</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {softSkills.map((s, i) => (
                    <div key={s.label}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                        <s.icon size={13} color="#bdce5e" strokeWidth={1.8} style={{ filter: 'brightness(.7)' }}/>
                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', fontWeight: 600, color: '#1a1a1a' }}>{s.label}</span>
                      </div>
                      <ProgressBar level={s.level} color="#bdce5e" delay={i * .08}/>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* COL DROITE */}
            <motion.div style={{ y: col2Y, display: 'flex', flexDirection: 'column', gap: '48px' }}>

              {/* Outils */}
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Wrench size={16} color="#f5f2eb" strokeWidth={1.8}/>
                  </div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '22px', letterSpacing: '2px', color: '#1a1a1a' }}>Outils</div>
                </div>

                {/* Filtres */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                  {['Tous', 'Dev', 'Design', 'Contenu', 'Marketing', 'Prod', 'IA'].map(cat => (
                    <motion.button
                      key={cat}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: .97 }}
                      onClick={() => setActiveCat(cat === 'Tous' ? null : cat)}
                      style={{
                        padding: '4px 12px', borderRadius: '20px',
                        border: `1px solid ${(cat === 'Tous' && !activeCat) || activeCat === cat ? '#254f24' : 'rgba(37,79,36,.2)'}`,
                        background: (cat === 'Tous' && !activeCat) || activeCat === cat ? '#254f24' : 'transparent',
                        color: (cat === 'Tous' && !activeCat) || activeCat === cat ? '#f5f2eb' : '#9a9a90',
                        fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase' as const,
                        fontWeight: 700, fontFamily: "'DM Sans',sans-serif", cursor: 'pointer',
                      }}
                    >{cat}</motion.button>
                  ))}
                </div>

                {/* Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {tools.filter(t => !activeCat || t.cat === activeCat).map((t, i) => (
                    <motion.div
                      key={t.label}
                      initial={{ opacity: 0, scale: .9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * .03 }}
                      whileHover={{ background: '#254f24', y: -2 }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '7px',
                        background: '#f5f2eb',
                        border: '1px solid rgba(37,79,36,.12)',
                        borderRadius: '6px', padding: '8px 14px',
                        cursor: 'default',
                      }}
                    >
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', fontWeight: 600, color: '#1a1a1a' }}>{t.label}</span>
                      <span style={{ fontSize: '8px', letterSpacing: '1.5px', textTransform: 'uppercase' as const, fontWeight: 700, color: CAT_COLORS[t.cat], opacity: .7 }}>{t.cat}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Langues */}
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .6, delay: .1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: 'rgba(189,206,94,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Languages size={16} color="#254f24" strokeWidth={1.8}/>
                  </div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '22px', letterSpacing: '2px', color: '#1a1a1a' }}>Langues</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {languages.map((l, i) => (
                    <div key={l.label}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '18px' }}>{l.flag}</span>
                          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', fontWeight: 600, color: '#1a1a1a' }}>{l.label}</span>
                        </div>
                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: '#9a9a90', fontStyle: 'italic' }}>{l.note}</span>
                      </div>
                      <ProgressBar level={l.level} color="#254f24" delay={i * .1}/>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}