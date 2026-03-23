'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Globe, Palette, Figma, Users, Brain, Video, ChevronRight, ChevronDown, ArrowRight, Check, Lightbulb } from 'lucide-react'

const services = [
  { num: '01', icon: Globe,   title: 'Développement Web',    short: 'Sites & Apps React',     accent: '#bdce5e', desc: "Conception et développement de sites web modernes, landing pages performantes et applications React. Du design à la mise en ligne.", items: ['Sites vitrines & landing pages','Applications React / Next.js','Intégration API & backend Flask','Déploiement Vercel / Render','Optimisation SEO & performance'] },
  { num: '02', icon: Palette, title: 'Design Graphique',     short: 'Logos & Identités',      accent: '#e8a020', desc: "Création d'identités visuelles fortes, logos mémorables, affiches et supports de communication.", items: ['Logo & charte graphique complète','Affiches, flyers & bannières','Supports print & digital','Branding de marque','Illustrations & icônes custom'] },
  { num: '03', icon: Figma,   title: 'Figma / UI-UX',        short: 'Maquettes & Prototypes', accent: '#a78bfa', desc: "Conception d'interfaces utilisateur intuitives et esthétiques sur Figma. Du wireframe au prototype cliquable.", items: ['Wireframes & maquettes UI','Prototypes interactifs Figma','Design system & composants','Audit UX & recommandations','Handoff développeur'] },
  { num: '04', icon: Users,   title: 'Community Management', short: 'Réseaux & Contenu',      accent: '#7a9e3b', desc: "Gestion complète de ta présence sur les réseaux sociaux. Stratégie éditoriale, création de contenu, animation.", items: ['Stratégie éditoriale mensuelle','Création de posts & visuels','Gestion Instagram, TikTok, Facebook','Animation & engagement communauté','Reporting & analyse des stats'] },
  { num: '05', icon: Brain,   title: 'Intelligence Artificielle', short: 'IA & Data',        accent: '#bdce5e', desc: "Développement de solutions IA sur mesure : modèles de prédiction, NLP, automatisation et analyse de données.", items: ['Modèles de prédiction & classification','NLP & traitement de texte','Scraping & collecte de données','Tableaux de bord analytiques','Automatisation de processus'] },
  { num: '06', icon: Video,   title: 'Montage Vidéo',         short: 'Reels & Contenu',       accent: '#f472b6', desc: "Montage de vidéos professionnelles pour les réseaux sociaux, reels Instagram/TikTok, vidéos de présentation.", items: ['Reels Instagram & TikTok','Vidéos de présentation','Motion design & animations','Sous-titrage & habillage','CapCut'] },
]

const LIGHT_ACCENTS = ['#e8a020','#a78bfa','#f472b6']

function ServiceBtn({ sv, isActive, onClick }: { sv: any; isActive: boolean; onClick: () => void }) {
  return (
    <motion.button onClick={onClick} whileHover={{ x: isActive ? 0 : 4 }} style={{
      display: 'flex', alignItems: 'center', gap: '14px',
      padding: '16px 18px', borderRadius: '8px', border: 'none',
      background: isActive ? 'rgba(255,255,255,.07)' : 'transparent',
      cursor: 'pointer', textAlign: 'left', width: '100%',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', left: 0, top: '15%', bottom: '15%', width: '2px', background: sv.accent, opacity: isActive ? 1 : 0, transition: 'opacity .25s', borderRadius: '2px' }}/>
      <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '12px', letterSpacing: '1px', color: isActive ? sv.accent : 'rgba(255,255,255,.2)', transition: 'color .25s', flexShrink: 0, width: '18px' }}>{sv.num}</span>
      <div style={{ width: '36px', height: '36px', borderRadius: '7px', flexShrink: 0, background: isActive ? `${sv.accent}22` : 'rgba(255,255,255,.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .25s' }}>
        <sv.icon size={16} color={isActive ? sv.accent : 'rgba(255,255,255,.3)'} strokeWidth={1.7}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', fontWeight: 700, color: isActive ? '#f5f2eb' : 'rgba(255,255,255,.4)', transition: 'color .25s', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sv.title}</div>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', color: 'rgba(255,255,255,.2)', marginTop: '1px' }}>{sv.short}</div>
      </div>
      <div style={{ opacity: isActive ? 1 : 0, transform: isActive ? 'translateX(0)' : 'translateX(-4px)', transition: 'all .25s', flexShrink: 0 }}>
        <ChevronRight size={13} color={sv.accent} strokeWidth={2.5}/>
      </div>
    </motion.button>
  )
}

function ServicePanel({ sv }: { sv: any }) {
  const isLight = LIGHT_ACCENTS.includes(sv.accent)
  return (
    <motion.div
      key={sv.num}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: .35 }}
      style={{
        background: 'rgba(255,255,255,.04)', border: `1px solid ${sv.accent}22`,
        borderRadius: '12px', padding: 'clamp(24px,4vw,44px)',
        position: 'relative', overflow: 'hidden', height: '100%',
      }}
    >
      <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '180px', height: '180px', borderRadius: '50%', border: `1px solid ${sv.accent}`, opacity: .07, pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', bottom: '-8px', right: '20px', fontFamily: "'Bebas Neue',sans-serif", fontSize: '110px', lineHeight: 1, color: sv.accent, opacity: .04, userSelect: 'none', pointerEvents: 'none' }}>{sv.num}</div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
        <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: `${sv.accent}18`, border: `1px solid ${sv.accent}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <sv.icon size={24} color={sv.accent} strokeWidth={1.6}/>
        </div>
        <span style={{ fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase' as const, fontWeight: 700, color: sv.accent, opacity: .7, fontFamily: "'DM Sans',sans-serif" }}>Service {sv.num}</span>
      </div>

      <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(22px,3vw,34px)', fontWeight: 900, color: '#f5f2eb', lineHeight: 1.1, marginBottom: '12px' }}>{sv.title}</h3>
      <div style={{ width: '36px', height: '2px', background: `linear-gradient(to right, ${sv.accent}, transparent)`, marginBottom: '18px' }}/>
      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(13px,1.4vw,14px)', lineHeight: 1.8, color: 'rgba(245,242,235,.55)', marginBottom: '24px' }}>{sv.desc}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
        {sv.items.map((item: string) => (
          <motion.div key={item} whileHover={{ background: 'rgba(255,255,255,.06)', x: 4 }} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '9px 12px', background: 'rgba(255,255,255,.03)', borderRadius: '6px', border: '1px solid rgba(255,255,255,.04)' }}>
            <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: `${sv.accent}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
              <Check size={9} color={sv.accent} strokeWidth={2.5}/>
            </div>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: 'rgba(245,242,235,.65)', lineHeight: 1.5 }}>{item}</span>
          </motion.div>
        ))}
      </div>

      <motion.a href="#contact" whileHover={{ y: -2, boxShadow: `0 8px 24px ${sv.accent}40` }} style={{
        display: 'inline-flex', alignItems: 'center', gap: '9px',
        background: sv.accent, color: isLight ? '#1a1a1a' : '#254f24',
        padding: '12px 24px', borderRadius: '4px',
        fontFamily: "'DM Sans',sans-serif", fontSize: '10px', fontWeight: 700,
        letterSpacing: '2px', textTransform: 'uppercase' as const, textDecoration: 'none',
      }}>
        Demander un devis <ArrowRight size={12} color={isLight ? '#1a1a1a' : '#254f24'} strokeWidth={2}/>
      </motion.a>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const headerY = useTransform(scrollYProgress, [0,1], [40, -40])

  return (
    <section ref={ref} id="services" className="torn-top" style={{
      background: '#1a1a1a',
      padding: 'clamp(60px,10vw,100px) clamp(20px,5vw,56px)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', bottom: '-20px', right: '-10px', fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(80px,16vw,200px)', color: 'rgba(255,255,255,.02)', pointerEvents: 'none', userSelect: 'none', letterSpacing: '-4px', lineHeight: 1 }}>WORK</div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <motion.div style={{ y: headerY, marginBottom: 'clamp(36px,5vw,56px)' }}>
          <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase' as const, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, color: '#bdce5e', opacity: .6, display: 'block', marginBottom: '10px' }}>Ce que je propose</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .1 }} style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px,5vw,60px)', fontWeight: 900, color: '#f5f2eb', lineHeight: 1 }}>
            Mes <span style={{ color: '#bdce5e', fontStyle: 'italic' }}>services</span>
          </motion.h2>
        </motion.div>

        {/* Desktop */}
        <div className="services-layout">
          <div>
            {services.map((sv, i) => (
              <ServiceBtn key={sv.num} sv={sv} isActive={active === i} onClick={() => setActive(i)}/>
            ))}
            <div style={{ marginTop: '12px', padding: '14px 18px', border: '1px dashed rgba(255,255,255,.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Lightbulb size={14} color="rgba(255,255,255,.2)" strokeWidth={1.6}/>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: 'rgba(255,255,255,.2)', lineHeight: 1.5 }}>
                Autre besoin ?<br/>
                <a href="#contact" style={{ color: '#bdce5e', opacity: .6, textDecoration: 'none', fontWeight: 600 }}>Parlons-en →</a>
              </div>
            </div>
          </div>
          <ServicePanel sv={services[active]}/>
        </div>

        {/* Mobile accordéon */}
        <div className="services-mobile">
          {services.map((sv, i) => (
            <div key={sv.num} style={{ border: `1px solid ${active === i ? sv.accent + '30' : 'rgba(255,255,255,.06)'}`, borderRadius: '8px', overflow: 'hidden', transition: 'border-color .3s' }}>
              <button onClick={() => setActive(active === i ? -1 : i)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 18px', border: 'none', cursor: 'pointer', background: active === i ? 'rgba(255,255,255,.06)' : 'rgba(255,255,255,.02)', textAlign: 'left' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '7px', flexShrink: 0, background: active === i ? `${sv.accent}22` : 'rgba(255,255,255,.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <sv.icon size={15} color={active === i ? sv.accent : 'rgba(255,255,255,.3)'} strokeWidth={1.7}/>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', fontWeight: 700, color: active === i ? '#f5f2eb' : 'rgba(255,255,255,.5)' }}>{sv.title}</div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', color: 'rgba(255,255,255,.2)', marginTop: '1px' }}>{sv.short}</div>
                </div>
                <motion.div animate={{ rotate: active === i ? 180 : 0 }} transition={{ duration: .3 }}>
                  <ChevronDown size={14} color={active === i ? sv.accent : 'rgba(255,255,255,.2)'} strokeWidth={2}/>
                </motion.div>
              </button>
              {active === i && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ padding: '0 18px 20px' }}>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', lineHeight: 1.7, color: 'rgba(245,242,235,.5)', marginBottom: '16px' }}>{sv.desc}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
                    {sv.items.map((item: string) => (
                      <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <Check size={10} color={sv.accent} strokeWidth={2.5} style={{ marginTop: '3px', flexShrink: 0 }}/>
                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: 'rgba(245,242,235,.6)', lineHeight: 1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: sv.accent, color: LIGHT_ACCENTS.includes(sv.accent) ? '#1a1a1a' : '#254f24', padding: '10px 20px', borderRadius: '4px', fontFamily: "'DM Sans',sans-serif", fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, textDecoration: 'none' }}>
                    Demander un devis <ArrowRight size={11} strokeWidth={2}/>
                  </a>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .services-layout { display: grid; grid-template-columns: 280px 1fr; gap: clamp(20px,3vw,40px); align-items: start; }
        .services-mobile { display: none; flex-direction: column; gap: 8px; }
        @media (max-width: 860px) { .services-layout { display: none; } .services-mobile { display: flex; } }
      `}</style>
    </section>
  )
}