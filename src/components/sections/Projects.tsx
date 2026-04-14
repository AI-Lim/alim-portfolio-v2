'use client'
import { useEffect, useState, useRef } from 'react'
import { getProjects } from '@/lib/supabase'
import { motion, useScroll, useTransform } from 'framer-motion'
import { TrendingUp, Eye, Brain, Image as ImageIcon, BarChart3, Users, Footprints, Globe, Shirt, Palette, Cpu, X, ZoomIn, ArrowUpRight, Github } from 'lucide-react'

const ICON_MAP: Record<string, any> = {
  TrendingUp, Eye, Brain, Image: ImageIcon, BarChart3,
  Users, Footprints, Globe, Shirt, Palette, Cpu,
}

const CATS = ['Tout', 'IA & Dev', 'CM & Contenu', 'Design']
const CAT_ICONS: Record<string, any> = { 'IA & Dev': Cpu, 'CM & Contenu': Users, 'Design': Palette }
function ProjectCard({ p, i }: { p: any; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .5, delay: (i % 3) * .1 }}
      whileHover={{ y: -5, boxShadow: '0 16px 48px rgba(37,79,36,.1)' }}
      style={{
        background: '#fff',
        border: '1px solid rgba(37,79,36,.08)',
        borderRadius: '8px', padding: 'clamp(20px,3vw,28px)',
        display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden', cursor: 'default',
      }}
    >
      {/* Barre top hover */}
      <motion.div
        initial={{ width: '0%' }}
        whileHover={{ width: '100%' }}
        style={{
          position: 'absolute', top: 0, left: 0, height: '2px',
          background: 'linear-gradient(to right, #254f24, #bdce5e)',
          borderRadius: '8px 8px 0 0',
        }}
        transition={{ duration: .4 }}
      />

      {p.featured && (
        <div style={{
          position: 'absolute', top: '14px', right: '14px',
          background: 'rgba(189,206,94,.15)', border: '1px solid rgba(189,206,94,.5)',
          borderRadius: '20px', padding: '3px 10px',
          fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase' as const,
          fontWeight: 700, color: '#254f24', fontFamily: "'DM Sans',sans-serif",
        }}>Featured</div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(37,79,36,.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <p.icon size={19} color="#254f24" strokeWidth={1.7}/>
        </div>
        <span style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase' as const, fontWeight: 700, color: '#9a9a90', fontFamily: "'DM Sans',sans-serif" }}>{p.cat}</span>
      </div>

      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(17px,2.2vw,22px)', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.2, marginBottom: '10px' }}>{p.title}</div>

      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', lineHeight: 1.75, color: '#5a5a5a', marginBottom: '20px', flex: 1 }}>{p.desc}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
        {p.techs.map((t: string) => (
          <span key={t} style={{ background: 'rgba(37,79,36,.06)', color: '#254f24', padding: '3px 9px', borderRadius: '4px', fontSize: '10px', fontWeight: 600, fontFamily: "'DM Sans',sans-serif" }}>{t}</span>
        ))}
      </div>

      {p.link ? (
        <a href={p.link} target="_blank" rel="noopener noreferrer" style={{
          display: 'inline-flex', alignItems: 'center', gap: '7px',
          background: '#254f24', color: '#f5f2eb',
          padding: '9px 18px', borderRadius: '4px',
          fontSize: '10px', fontWeight: 700,
          fontFamily: "'DM Sans',sans-serif",
          letterSpacing: '1.5px', textTransform: 'uppercase' as const,
          textDecoration: 'none', alignSelf: 'flex-start',
          transition: 'background .2s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = '#bdce5e'}
          onMouseLeave={e => e.currentTarget.style.background = '#254f24'}
        >
          <ArrowUpRight size={12} color="#f5f2eb" strokeWidth={2}/> {p.linkLabel}
        </a>
      ) : (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '7px',
          border: '1px solid rgba(37,79,36,.15)', color: '#9a9a90',
          padding: '9px 18px', borderRadius: '4px',
          fontSize: '10px', fontWeight: 700,
          fontFamily: "'DM Sans',sans-serif",
          letterSpacing: '1.5px', textTransform: 'uppercase' as const,
          alignSelf: 'flex-start',
        }}>
          <Github size={12} color="#9a9a90" strokeWidth={2}/> {p.linkLabel}
        </div>
      )}
    </motion.div>
  )
}

function DesignCard({ p, i, onOpen }: { p: any; i: number; onOpen: (p: any) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .5, delay: (i % 3) * .1 }}
      whileHover={{ y: -5, boxShadow: '0 16px 48px rgba(37,79,36,.12)' }}
      onClick={() => onOpen(p)}
      style={{
        background: '#fff', border: '1px solid rgba(37,79,36,.08)',
        borderRadius: '8px', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        cursor: 'pointer',
      }}
    >
      <div style={{ height: 'clamp(200px,28vw,280px)', overflow: 'hidden', background: 'rgba(37,79,36,.04)', position: 'relative' }}>
        <motion.img
          src={p.image} alt={p.title}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: .5 }}
          style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '16px', display: 'block' }}
        />
        {p.featured && (
          <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(189,206,94,.9)', borderRadius: '20px', padding: '3px 10px', fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase' as const, fontWeight: 700, color: '#254f24', fontFamily: "'DM Sans',sans-serif" }}>Featured</div>
        )}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(37,79,36,0)', transition: 'background .3s' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(37,79,36,.12)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(37,79,36,0)'}
        >
          <ZoomIn size={24} color="#fff" strokeWidth={2} style={{ opacity: 0 }}/>
        </div>
      </div>
      <div style={{ padding: 'clamp(16px,2.5vw,22px)', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(17px,2.2vw,21px)', fontWeight: 700, color: '#1a1a1a', marginBottom: '8px' }}>{p.title}</div>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', lineHeight: 1.7, color: '#5a5a5a', marginBottom: '16px', flex: 1 }}>{p.desc}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {p.techs.map((t: string) => (
            <span key={t} style={{ background: 'rgba(37,79,36,.06)', color: '#254f24', padding: '3px 9px', borderRadius: '4px', fontSize: '10px', fontWeight: 600, fontFamily: "'DM Sans',sans-serif" }}>{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function Lightbox({ project, onClose }: { project: any; onClose: () => void }) {
  if (!project) return null
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(0,0,0,.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
    >
      <motion.div
        initial={{ scale: .92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        onClick={e => e.stopPropagation()}
        style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', maxWidth: '680px', width: '100%' }}
      >
        <div style={{ background: 'rgba(37,79,36,.04)', padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '360px' }}>
          <img src={project.image} alt={project.title} style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}/>
        </div>
        <div style={{ padding: '20px 28px', borderTop: '1px solid rgba(37,79,36,.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '20px', fontWeight: 700, color: '#1a1a1a', marginBottom: '4px' }}>{project.title}</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: '#9a9a90' }}>{project.desc}</div>
          </div>
          <button onClick={onClose} style={{ background: '#254f24', border: 'none', borderRadius: '6px', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: '16px' }}>
            <X size={16} color="#f5f2eb" strokeWidth={2}/>
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null)
const [activeCat, setActiveCat] = useState('Tout')
const [lightbox,  setLightbox]  = useState<any>(null)
const [projects,  setProjects]  = useState<any[]>([])
const [loading,   setLoading]   = useState(true)

useEffect(() => {
  getProjects()
    .then(data => setProjects(data.map((p: any) => ({
      ...p,
      cat:       p.tag,
      desc:      p.description,
      linkLabel: p.link_label,
      image:     p.image_url,
      icon:      ICON_MAP[p.icon] ?? TrendingUp,
    }))))
    .catch(() => {})
    .finally(() => setLoading(false))
}, [])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const headerY = useTransform(scrollYProgress, [0,1], [40, -40])

  const filtered = activeCat === 'Tout' ? projects : projects.filter(p => p.cat === activeCat)

  return (
    <section ref={ref} id="projects" className="torn-top" style={{
      background: '#f5f2eb',
      padding: 'clamp(60px,10vw,100px) clamp(20px,5vw,56px)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <motion.div style={{ y: headerY, marginBottom: 'clamp(32px,5vw,48px)' }}>
          <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="eyebrow">Ce que je construis</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .1 }} className="section-title">
            Mes <span className="acc">réalisations</span>
          </motion.h2>
        </motion.div>

        {/* Filtres */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: 'clamp(32px,5vw,48px)' }}>
          {CATS.map(cat => {
            const isActive = activeCat === cat
            const CatIcon = CAT_ICONS[cat]
            return (
              <motion.button key={cat} onClick={() => setActiveCat(cat)} whileHover={{ scale: 1.03 }} whileTap={{ scale: .97 }} style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                padding: '9px 20px', borderRadius: '4px',
                border: `1px solid ${isActive ? '#254f24' : 'rgba(37,79,36,.2)'}`,
                background: isActive ? '#254f24' : 'transparent',
                color: isActive ? '#f5f2eb' : '#5a5a5a',
                fontFamily: "'DM Sans',sans-serif", fontSize: '10px', fontWeight: 700,
                letterSpacing: '2px', textTransform: 'uppercase' as const, cursor: 'pointer',
              }}>
                {CatIcon && <CatIcon size={11} color={isActive ? '#bdce5e' : '#9a9a90'} strokeWidth={2}/>}
                {cat}
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '14px', color: isActive ? '#bdce5e' : '#9a9a90' }}>
                  {cat === 'Tout' ? projects.length : projects.filter(p => p.cat === cat).length}
                </span>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Grille */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,300px),1fr))', gap: '20px' }}>
          {filtered.map((p, i) => (
            p.image
              ? <DesignCard key={p.title} p={p} i={i} onOpen={setLightbox}/>
              : <ProjectCard key={p.title} p={p} i={i}/>
          ))}
        </div>

        {lightbox && <Lightbox project={lightbox} onClose={() => setLightbox(null)}/>}

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ marginTop: 'clamp(40px,6vw,64px)', display: 'flex', justifyContent: 'center' }}>
          <a href="https://github.com/AI-Lim" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Github size={14} color="#254f24" strokeWidth={2}/> Voir tout mon GitHub <ArrowUpRight size={14} color="#254f24" strokeWidth={2}/>
          </a>
        </motion.div>
      </div>
    </section>
  )
}