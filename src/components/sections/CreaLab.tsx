'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Play, Clock, ExternalLink, ChevronRight, Film, Tv, X, ChevronLeft } from 'lucide-react'
import { getCrealabVideos } from '@/lib/supabase'
import { useLang } from '@/lib/LangContext'
import { t } from '@/lib/i18n'

// Données statiques par défaut — remplacées par Supabase si dispo
const DEFAULT_SERIES = [
  {
    id: 'into-my-brain',
    type: 'serie',
    series: 'Into My Brain',
    thumbnail_url: null,
    description: "Un voyage cinématique dans la tête d'un créateur multipotentiel. Chaque épisode explore une facette du cerveau qui refuse de s'arrêter.",
    color: '#254f24',
    accent: '#bdce5e',
    episodes: [
      {
        id: 'imb-ep1',
        episode_num: 1,
        title: 'Le Multipotentiel',
        description: "Arrête de scroller et viens voir ce qu'il y a dans ma tête.",
        thumbnail_url: null,
        tiktok_url: null,
        status: 'coming_soon',
      },
    ],
  },
]

function SeriesThumbnail({ series, onClick }: { series: any; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      whileHover={{ scale: 1.04, zIndex: 10 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      style={{
        position: 'relative', cursor: 'pointer',
        borderRadius: '8px', overflow: 'hidden',
        aspectRatio: '16/9',
        background: series.thumbnail_url
          ? 'transparent'
          : `linear-gradient(135deg, ${series.color ?? '#254f24'}, #0a0f0a)`,
        border: '1px solid rgba(189,206,94,.15)',
        flexShrink: 0,
        width: 'clamp(220px, 28vw, 320px)',
      }}
    >
      {/* Thumbnail ou placeholder */}
      {series.thumbnail_url ? (
        <img
          src={series.thumbnail_url} alt={series.series}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '8px',
        }}>
          <Tv size={32} color="rgba(189,206,94,.4)" strokeWidth={1.5}/>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '20px', color: '#bdce5e', letterSpacing: '3px', textAlign: 'center', padding: '0 12px' }}>{series.series}</div>
        </div>
      )}

      {/* Overlay hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(10,15,10,.95) 0%, rgba(10,15,10,.4) 60%, transparent 100%)',
              display: 'flex', flexDirection: 'column',
              justifyContent: 'flex-end', padding: '16px',
            }}
          >
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '18px', color: '#bdce5e', letterSpacing: '2px', marginBottom: '4px' }}>{series.series}</div>
            <div style={{ fontSize: '11px', color: 'rgba(245,242,235,.6)', fontFamily: "'DM Sans',sans-serif", marginBottom: '10px', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{series.description}</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#bdce5e', color: '#254f24', padding: '5px 12px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: "'DM Sans',sans-serif", width: 'fit-content' }}>
              <Play size={10} fill="#254f24" color="#254f24" strokeWidth={2}/> Voir la série
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Badge épisodes */}
      <div style={{
        position: 'absolute', top: '8px', left: '8px',
        background: 'rgba(10,15,10,.8)', backdropFilter: 'blur(6px)',
        borderRadius: '4px', padding: '3px 8px',
        fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
        fontWeight: 700, color: '#bdce5e', fontFamily: "'DM Sans',sans-serif",
      }}>
        {series.episodes?.length ?? 0} ép.
      </div>
    </motion.div>
  )
}

function EpisodeRow({ ep, index, seriesAccent }: { ep: any; index: number; seriesAccent: string }) {
  const available = ep.status === 'available'

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * .06 }}
      whileHover={{ x: 6, background: 'rgba(255,255,255,.06)' }}
      style={{
        display: 'flex', alignItems: 'center', gap: '16px',
        padding: '14px 20px',
        background: 'rgba(255,255,255,.03)',
        border: '1px solid rgba(255,255,255,.06)',
        borderRadius: '8px', cursor: available ? 'pointer' : 'default',
      }}
    >
      {/* Numéro */}
      <div style={{
        fontFamily: "'Bebas Neue',sans-serif",
        fontSize: '28px', color: 'rgba(189,206,94,.25)',
        letterSpacing: '2px', flexShrink: 0, width: '36px', textAlign: 'right',
      }}>{String(ep.episode_num ?? index + 1).padStart(2, '0')}</div>

      {/* Miniature épisode */}
      <div style={{
        width: '100px', height: '56px', borderRadius: '6px',
        overflow: 'hidden', flexShrink: 0,
        background: ep.thumbnail_url
          ? 'transparent'
          : 'linear-gradient(135deg, rgba(37,79,36,.4), rgba(10,15,10,.8))',
        border: '1px solid rgba(255,255,255,.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}>
        {ep.thumbnail_url ? (
          <img src={ep.thumbnail_url} alt={ep.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
        ) : (
          <Film size={18} color="rgba(189,206,94,.3)" strokeWidth={1.5}/>
        )}
        {available && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,.3)' }}>
            <Play size={14} fill={seriesAccent} color={seriesAccent} strokeWidth={2}/>
          </div>
        )}
      </div>

      {/* Infos */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: '14px', fontWeight: 700,
          color: available ? '#f5f2eb' : 'rgba(245,242,235,.4)',
          marginBottom: '3px', overflow: 'hidden',
          textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{ep.title}</div>
        <div style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: '12px', color: 'rgba(245,242,235,.3)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{ep.description}</div>
      </div>

      {/* Status badge */}
      <div style={{
        padding: '4px 12px', borderRadius: '20px', flexShrink: 0,
        background: available ? `rgba(189,206,94,.15)` : 'rgba(255,255,255,.05)',
        border: `1px solid ${available ? 'rgba(189,206,94,.3)' : 'rgba(255,255,255,.1)'}`,
        fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase' as const,
        fontWeight: 700, fontFamily: "'DM Sans',sans-serif",
        color: available ? seriesAccent : 'rgba(245,242,235,.3)',
      }}>
        {available ? 'Disponible' : 'Bientôt'}
      </div>

      {/* Lien TikTok */}
      {ep.tiktok_url && (
        <a href={ep.tiktok_url} target="_blank" rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: 'rgba(189,206,94,.1)', borderRadius: '6px', textDecoration: 'none', flexShrink: 0 }}
        >
          <ExternalLink size={13} color="#bdce5e" strokeWidth={2}/>
        </a>
      )}
    </motion.div>
  )
}

function SeriesModal({ series, onClose }: { series: any; onClose: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 500, background: 'rgba(0,0,0,.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
      >
        <motion.div
          initial={{ scale: .92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: .95, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          onClick={e => e.stopPropagation()}
          style={{
            background: '#0d1a0c',
            border: '1px solid rgba(189,206,94,.15)',
            borderRadius: '16px', overflow: 'hidden',
            maxWidth: '800px', width: '100%',
            maxHeight: '85vh', display: 'flex', flexDirection: 'column',
          }}
        >
          {/* Header modal */}
          <div style={{
            background: series.thumbnail_url
              ? 'transparent'
              : `linear-gradient(135deg, ${series.color ?? '#254f24'}, #0a0f0a)`,
            position: 'relative', minHeight: '200px',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            padding: '24px 32px',
            flexShrink: 0,
          }}>
            {series.thumbnail_url && (
              <img src={series.thumbnail_url} alt={series.series} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}/>
            )}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0d1a0c 0%, rgba(13,26,12,.5) 60%, transparent 100%)' }}/>

            {/* Fermer */}
            <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0,0,0,.6)', backdropFilter: 'blur(6px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
              <X size={16} color="#fff" strokeWidth={2}/>
            </button>

            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase' as const, color: 'rgba(189,206,94,.5)', fontFamily: "'DM Sans',sans-serif", fontWeight: 700, marginBottom: '6px' }}>Série en cours</div>
              <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(28px,4vw,48px)', color: series.accent ?? '#bdce5e', letterSpacing: '4px', lineHeight: 1, marginBottom: '10px' }}>{series.series}</h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '14px', color: 'rgba(245,242,235,.6)', lineHeight: 1.7, maxWidth: '500px' }}>{series.description}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px' }}>
                <motion.div animate={{ scale: [1,1.3,1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#bdce5e' }}/>
                <span style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase' as const, fontWeight: 700, color: '#bdce5e', fontFamily: "'DM Sans',sans-serif" }}>En production</span>
                <span style={{ fontSize: '10px', color: 'rgba(245,242,235,.3)', fontFamily: "'DM Sans',sans-serif", marginLeft: '8px' }}>{series.episodes?.length ?? 0} épisode{(series.episodes?.length ?? 0) > 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>

          {/* Liste épisodes */}
          <div style={{ padding: '24px 32px', overflowY: 'auto', flex: 1 }}>
            <div style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase' as const, color: 'rgba(189,206,94,.4)', fontFamily: "'DM Sans',sans-serif", fontWeight: 700, marginBottom: '16px' }}>Épisodes</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {(series.episodes ?? []).map((ep: any, i: number) => (
                <EpisodeRow key={ep.id} ep={ep} index={i} seriesAccent={series.accent ?? '#bdce5e'}/>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function CreaLab() {
  const ref = useRef<HTMLElement>(null)
  const { lang } = useLang()
  const txt = t[lang].crealab

  const [tab, setTab]               = useState<'séries'|'courts'>('séries')
  const [seriesData, setSeriesData] = useState<any[]>([])
  const [selected, setSelected]     = useState<any>(null)
  const [loading, setLoading]       = useState(true)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const headerY  = useTransform(scrollYProgress, [0,1], [40, -40])
  const contentY = useTransform(scrollYProgress, [0,1], [60, -20])

  useEffect(() => {
    getCrealabVideos()
      .then(videos => {
        if (!videos.length) { setSeriesData(DEFAULT_SERIES); return }

        // Grouper par série
        const grouped: Record<string, any> = {}
        videos.forEach(v => {
          const key = v.series ?? 'Sans série'
          if (!grouped[key]) {
            grouped[key] = {
              id: key,
              type: v.type ?? 'serie',
              series: key,
              thumbnail_url: v.thumbnail_url,
              description: v.description,
              color: '#254f24', accent: '#bdce5e',
              episodes: [],
            }
          }
          grouped[key].episodes.push(v)
        })
        setSeriesData(Object.values(grouped))
      })
      .catch(() => setSeriesData(DEFAULT_SERIES))
      .finally(() => setLoading(false))
  }, [])

  const series = seriesData.filter(s => s.type === 'serie' || s.type === 'série')
  const shorts  = seriesData.filter(s => s.type === 'short' || s.type === 'court')

  return (
    <>
      <section ref={ref} id="crealab" className="torn-top" style={{
        background: '#0a0f0a',
        padding: 'clamp(60px,10vw,100px) clamp(20px,5vw,56px)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Fond radial */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(37,79,36,.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(189,206,94,.05) 0%, transparent 50%)', pointerEvents: 'none' }}/>

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>

          {/* Header */}
          <motion.div style={{ y: headerY, marginBottom: '48px' }}>
            <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase' as const, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, color: '#bdce5e', opacity: .6, display: 'block', marginBottom: '10px' }}>{txt.eyebrow}</motion.span>
            <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .1 }} style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px,5vw,60px)', fontWeight: 900, color: '#f5f2eb', lineHeight: 1, marginBottom: '16px' }}>
              {txt.title} <span style={{ color: '#bdce5e', fontStyle: 'italic' }}>{txt.titleAcc}</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: .2 }} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(14px,1.8vw,17px)', color: 'rgba(245,242,235,.5)', lineHeight: 1.8, maxWidth: '600px' }}>{txt.desc}</motion.p>
          </motion.div>

          {/* Tabs */}
          <motion.div style={{ y: contentY }}>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '48px', background: 'rgba(255,255,255,.04)', borderRadius: '8px', padding: '4px', width: 'fit-content', border: '1px solid rgba(255,255,255,.06)' }}>
              {([['séries', Tv], ['courts', Film]] as const).map(([tabName, Icon]) => (
                <motion.button key={tabName} onClick={() => setTab(tabName as any)} whileHover={{ scale: 1.03 }} whileTap={{ scale: .97 }} style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '10px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                  background: tab === tabName ? '#254f24' : 'transparent',
                  color: tab === tabName ? '#bdce5e' : 'rgba(245,242,235,.4)',
                  fontFamily: "'DM Sans',sans-serif", fontSize: '12px', fontWeight: 700,
                  letterSpacing: '1.5px', textTransform: 'uppercase' as const, transition: 'all .25s',
                }}>
                  <Icon size={14} strokeWidth={2}/> {tabName === 'séries' ? txt.tabs[0] : txt.tabs[1]}
                </motion.button>
              ))}
            </div>

            {/* ── SÉRIES ── */}
            {tab === 'séries' && (
              <div>
                {/* Rangée horizontale style Netflix */}
                <div style={{ position: 'relative', marginBottom: '60px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase' as const, color: 'rgba(189,206,94,.5)', fontFamily: "'DM Sans',sans-serif", marginBottom: '20px' }}>
                    {txt.tabs[0]} · {series.length} {series.length > 1 ? 'séries' : 'série'}
                  </div>
                  {loading ? (
                    <div style={{ display: 'flex', gap: '16px', overflow: 'hidden' }}>
                      {[1,2,3].map(i => (
                        <div key={i} style={{ width: 'clamp(220px,28vw,320px)', aspectRatio: '16/9', borderRadius: '8px', background: 'rgba(255,255,255,.04)', flexShrink: 0, animation: 'pulse 2s infinite' }}/>
                      ))}
                    </div>
                  ) : series.length > 0 ? (
                    <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '12px', scrollbarWidth: 'thin', scrollbarColor: 'rgba(189,206,94,.2) transparent' }}>
                      {series.map(s => (
                        <SeriesThumbnail key={s.id} series={s} onClick={() => setSelected(s)}/>
                      ))}
                    </div>
                  ) : (
                    <EmptySlot txt={txt}/>
                  )}
                </div>

                {/* Section "À venir" */}
                <div style={{ background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.06)', borderRadius: '12px', padding: '32px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
                    <motion.div animate={{ scale: [1,1.3,1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#bdce5e' }}/>
                    <span style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase' as const, color: '#bdce5e', fontFamily: "'DM Sans',sans-serif", fontWeight: 700 }}>Bientôt sur The CreaLab</span>
                  </div>
                  <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '14px', color: 'rgba(245,242,235,.3)', lineHeight: 1.7 }}>
                    Abonne-toi sur TikTok pour ne rien rater.{' '}
                    <a href="https://tiktok.com/@alim.bachabi" target="_blank" rel="noopener noreferrer" style={{ color: '#bdce5e', textDecoration: 'none', fontWeight: 600 }}>@alim.bachabi →</a>
                  </p>
                </div>
              </div>
            )}

            {/* ── COURTS MÉTRAGES ── */}
            {tab === 'courts' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', padding: '80px 24px', background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.06)', borderRadius: '12px' }}>
                <Film size={48} color="rgba(189,206,94,.2)" strokeWidth={1} style={{ marginBottom: '16px' }}/>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(20px,3vw,28px)', color: 'rgba(245,242,235,.3)', fontStyle: 'italic', marginBottom: '12px' }}>{txt.soon}</div>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '14px', color: 'rgba(245,242,235,.2)', lineHeight: 1.7 }}>{txt.soonDesc}</p>
              </motion.div>
            )}
          </motion.div>
        </div>

        <style>{`@keyframes pulse { 0%,100%{opacity:.5} 50%{opacity:1} }`}</style>
      </section>

      {/* Modal série */}
      {selected && <SeriesModal series={selected} onClose={() => setSelected(null)}/>}
    </>
  )
}

function EmptySlot({ txt }: { txt: any }) {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <div style={{ width: 'clamp(220px,28vw,320px)', aspectRatio: '16/9', borderRadius: '8px', background: 'rgba(255,255,255,.03)', border: '1px dashed rgba(189,206,94,.15)', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <Tv size={28} color="rgba(189,206,94,.2)" strokeWidth={1.5}/>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: 'rgba(245,242,235,.2)' }}>Bientôt</div>
      </div>
    </div>
  )
}