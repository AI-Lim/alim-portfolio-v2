'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Brain, Palette, Shirt, Footprints, Rabbit, Music } from 'lucide-react'

const universeNodes = [
  { icon: Brain,      label: 'IA & Tech',  desc: 'SMARTB · FRIARE Africa · ACXSIT · TensorFlow · PyTorch', pos: { top: '13%', left: '50%' } },
  { icon: Palette,    label: 'Création',   desc: 'CM Freelance · Montage vidéo · Design graphique',         pos: { top: '33%', left: '14%' } },
  { icon: Shirt,      label: 'BAYO',       desc: 'Marque crochet afro-moderne · Mode fait main · Bénin',    pos: { top: '33%', left: '86%' } },
  { icon: Footprints, label: 'Danse',      desc: 'Performance · Expression corporelle · Scène',             pos: { top: '67%', left: '18%' } },
  { icon: Rabbit,     label: 'Élevage',    desc: '13 lapins · Entrepreneuriat terrain · Vie authentique',   pos: { top: '67%', left: '82%' } },
  { icon: Music,      label: 'Musique',    desc: 'En construction… bientôt un son',                         pos: { top: '86%', left: '50%' } },
]

const CX = 650, CY = 650, TOTAL = 1300
const INNER_R = 150, PETAL_R1 = 195, PETAL_R2 = 430, PETAL_R2_ACTIVE = 495

const angleOf = (i: number) => (i * 60 - 90) * (Math.PI / 180)
const pt = (cx: number, cy: number, r: number, angle: number) => ({
  x: cx + r * Math.cos(angle),
  y: cy + r * Math.sin(angle),
})

function Petal({ index, active, onEnter, onLeave }: {
  index: number; active: number | null;
  onEnter: () => void; onLeave: () => void
}) {
  const node     = universeNodes[index]
  const isActive = active === index
  const isOther  = active !== null && !isActive

  const angle  = angleOf(index)
  const angleL = angleOf(index - 0.42)
  const angleR = angleOf(index + 0.42)
  const r2     = isActive ? PETAL_R2_ACTIVE : PETAL_R2

  const p1 = pt(CX, CY, PETAL_R1, angleL)
  const p2 = pt(CX, CY, PETAL_R1, angleR)
  const p3 = pt(CX, CY, r2, angleR)
  const p4 = pt(CX, CY, r2, angleL)

  const iconP = pt(CX, CY, (PETAL_R1 + r2) / 2 - 10 + (isActive ? 14 : 0), angle)
  const textP = pt(CX, CY, (PETAL_R1 + r2) / 2 + 22 + (isActive ? 14 : 0), angle)

  const pathD = `M ${p1.x} ${p1.y} A ${PETAL_R1} ${PETAL_R1} 0 0 1 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${r2} ${r2} 0 0 0 ${p4.x} ${p4.y} Z`

  return (
    <g style={{ cursor: 'pointer', transition: 'all .45s cubic-bezier(.22,1,.36,1)' }}
      onMouseEnter={onEnter} onMouseLeave={onLeave}
    >
      <motion.path
        d={pathD}
        animate={{
          fill: isActive ? 'rgba(189,206,94,1)' : 'rgba(255,255,255,0.07)',
          opacity: isOther ? .35 : 1,
        }}
        transition={{ duration: .45 }}
        stroke="rgba(189,206,94,0.25)"
        strokeWidth={isActive ? 1.5 : 1}
      />
      {isActive && (
        <path d={pathD}
          fill="rgba(189,206,94,0.12)"
          style={{ filter: 'blur(8px)' }}
        />
      )}

      {/* Icône via foreignObject */}
      <foreignObject
        x={iconP.x - 30} y={iconP.y - 30}
        width={60} height={60}
        style={{ opacity: isOther ? .4 : 1, transition: 'opacity .4s', pointerEvents: 'none' }}
      >
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <node.icon
            size={isActive ? 52 : 40}
            color={isActive ? '#254f24' : '#f5f2eb'}
            strokeWidth={1.6}
          />
        </div>
      </foreignObject>

      {/* Label */}
      <text
        x={textP.x} y={textP.y}
        textAnchor="middle" dominantBaseline="middle"
        fill={isActive ? '#254f24' : '#f5f2eb'}
        fontSize={isActive ? 22 : 17}
        fontFamily="'DM Sans', sans-serif"
        fontWeight={700}
        letterSpacing={1.5}
        style={{
          textTransform: 'uppercase',
          opacity: isOther ? .35 : isActive ? 1 : .75,
          transition: 'all .4s ease',
          pointerEvents: 'none', userSelect: 'none',
        }}
      >{node.label}</text>
    </g>
  )
}

export default function Universe() {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const activeNode = active !== null ? universeNodes[active] : null

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const wheelY   = useTransform(scrollYProgress, [0,1], [60,  -60])
  const panelY   = useTransform(scrollYProgress, [0,1], [80,  -40])
  const headerY  = useTransform(scrollYProgress, [0,1], [30,  -30])
  const bgY      = useTransform(scrollYProgress, [0,1], [0,   40])

  return (
    <section ref={ref} id="universe" style={{
      background: '#254f24',
      padding: 'clamp(60px,10vw,100px) clamp(20px,5vw,56px)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Watermark parallax */}
      <motion.div style={{ y: bgY, position: 'absolute', bottom: '-40px', left: '-10px', pointerEvents: 'none', userSelect: 'none' }}>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(100px,22vw,260px)',
          color: 'rgba(255,255,255,.025)',
          letterSpacing: '-8px', lineHeight: 1,
        }}>BRAIN</div>
      </motion.div>

      {/* Header */}
      <motion.div style={{ y: headerY, textAlign: 'center', marginBottom: 'clamp(40px,6vw,64px)', position: 'relative', zIndex: 2 }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(32px,5vw,60px)',
            fontWeight: 900, color: '#f5f2eb',
          }}
        >Mon cerveau en carte</motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: .2, duration: .6 }}
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: '20px', color: 'rgba(245,242,235,.5)', marginTop: '8px',
          }}
        >6 univers · 1 seul Alim</motion.p>
      </motion.div>

      {/* Roue + panel */}
      <div style={{
        display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        gap: 'clamp(24px,5vw,72px)',
        flexWrap: 'wrap',
        position: 'relative', zIndex: 2,
      }}>

        {/* SVG Roue */}
        <motion.div style={{ y: wheelY, width: 'min(100vw,100vh,980px)', height: 'min(100vw,100vh,980px)', flexShrink: 0 }}>
          <svg viewBox={`0 0 ${TOTAL} ${TOTAL}`} style={{ width: '100%', height: '100%', overflow: 'visible' }}>

            {/* Lignes guide */}
            {universeNodes.map((_, i) => {
              const a = angleOf(i)
              const p = pt(CX, CY, PETAL_R2 + 16, a)
              return (
                <line key={i}
                  x1={CX} y1={CY} x2={p.x} y2={p.y}
                  stroke="#bdce5e" strokeWidth={0.4} strokeOpacity={0.08}
                  strokeDasharray="4 6"
                />
              )
            })}

            {/* Cercles guide */}
            <circle cx={CX} cy={CY} r={PETAL_R2+24} stroke="#bdce5e" strokeWidth={0.5} strokeOpacity={0.08} fill="none" strokeDasharray="3 8"/>
            <circle cx={CX} cy={CY} r={PETAL_R2+48} stroke="#bdce5e" strokeWidth={0.4} strokeOpacity={0.05} fill="none" strokeDasharray="2 12"/>

            {/* Pétales */}
            {universeNodes.map((_, i) => (
              <Petal key={i} index={i} active={active}
                onEnter={() => setActive(i)}
                onLeave={() => setActive(null)}
              />
            ))}

            {/* Centre */}
            <motion.circle cx={CX} cy={CY} r={INNER_R+2}
              animate={{ fill: activeNode ? '#bdce5e' : 'rgba(255,255,255,0.04)', stroke: activeNode ? '#bdce5e' : 'rgba(189,206,94,0.35)' }}
              strokeWidth={1.5}
              transition={{ duration: .45 }}
            />
            <circle cx={CX} cy={CY} r={INNER_R-12}
              fill="none" stroke="rgba(189,206,94,0.15)" strokeWidth={1} strokeDasharray="4 6"
            />

            {/* Texte centre */}
            <text x={CX} y={CY-10} textAnchor="middle"
              fill={activeNode ? '#254f24' : '#f5f2eb'}
              fontSize={activeNode ? 26 : 20}
              fontFamily="'DM Sans', sans-serif" fontWeight={700} letterSpacing={1}
              style={{ transition: 'all .3s', userSelect: 'none', textTransform: 'uppercase' }}
            >{activeNode ? activeNode.label : 'ALIM'}</text>
            <text x={CX} y={CY+18} textAnchor="middle"
              fill={activeNode ? '#254f24' : 'rgba(245,242,235,0.4)'}
              fontSize={18} fontFamily="'Caveat', cursive"
              style={{ transition: 'all .3s', userSelect: 'none' }}
            >{activeNode ? '→' : 'CreaBuilder'}</text>
          </svg>
        </motion.div>

        {/* Panel description */}
        <motion.div style={{ y: panelY, width: 'clamp(220px,28vw,320px)', minHeight: '240px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {activeNode ? (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .35 }}
            >
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '72px', lineHeight: 1,
                color: 'rgba(189,206,94,.15)', marginBottom: '-12px', userSelect: 'none',
              }}>{String((active ?? 0) + 1).padStart(2, '0')}</div>

              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(32px,4vw,48px)',
                color: '#bdce5e', letterSpacing: '2px', lineHeight: 1, marginBottom: '16px',
              }}>{activeNode.label}</div>

              <div style={{
                width: '40px', height: '2px',
                background: 'linear-gradient(to right, #bdce5e, transparent)',
                marginBottom: '16px',
              }}/>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {activeNode.desc.split(' · ').map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * .06 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#bdce5e', flexShrink: 0, opacity: .7 }}/>
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 'clamp(13px,1.5vw,15px)',
                      color: 'rgba(245,242,235,.65)', lineHeight: 1.8,
                    }}>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: .4 }}
            >
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(18px,2.2vw,24px)',
                color: 'rgba(245,242,235,.3)',
                fontStyle: 'italic', lineHeight: 1.6, marginBottom: '24px',
              }}>"Survole un pétale pour explorer mon univers."</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {universeNodes.map((_, i) => (
                  <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#bdce5e', opacity: .2 }}/>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Légende */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: .3, duration: .6 }}
        style={{
          display: 'flex', justifyContent: 'center',
          gap: 'clamp(16px,3vw,32px)', marginTop: 'clamp(40px,6vw,64px)',
          flexWrap: 'wrap', position: 'relative', zIndex: 2,
        }}
      >
        {universeNodes.map((n, i) => (
          <motion.button
            key={i}
            onClick={() => setActive(active === i ? null : i)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: .97 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: active === i ? 'rgba(189,206,94,.15)' : 'transparent',
              border: `1px solid ${active === i ? '#bdce5e' : 'rgba(189,206,94,.2)'}`,
              borderRadius: '20px', padding: '6px 14px',
              cursor: 'pointer', transition: 'all .3s ease',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '10px', letterSpacing: '1.5px',
              textTransform: 'uppercase', fontWeight: 700,
              color: active === i ? '#bdce5e' : 'rgba(245,242,235,.4)',
            }}
          >
            <n.icon size={11} color={active === i ? '#bdce5e' : 'rgba(245,242,235,.35)'} strokeWidth={2}/>
            {n.label}
          </motion.button>
        ))}
      </motion.div>
    </section>
  )
}