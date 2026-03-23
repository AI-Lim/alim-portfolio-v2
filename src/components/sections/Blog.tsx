'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, X, PenLine } from 'lucide-react'

const ARTICLES = [
  {
    title: 'Deep Learning Indaba — Rwanda 2025',
    cat: 'Voyage & IA', date: 'Sept 2025',
    text: "Une semaine entourée des meilleurs cerveaux IA d'Afrique, à Kigali. Une expérience qui a changé ma vision.",
    image: '/assets/blog-rwanda.jpg',
    pinColor: '#254f24', noteColor: '#dcfce7',
    content: `✈️ J'ai mis mon téléphone en mode avion, direction le fuseau GMT+2.

Premier vol de ma vie… et c'était pour une bonne raison : assister au Deep Learning Indaba à Kigali, au Rwanda, la plus grande conférence dédiée à l'intelligence artificielle sur le continent africain.

Et j'ai eu la chance d'être sélectionné pour y participer.

Autant dire que le stress était au rendez-vous. Je me demandais si j'allais vraiment réussir à profiter de l'événement comme il le fallait. Heureusement, je n'étais pas seul : être accompagné de mes amis a rendu l'expérience beaucoup plus rassurante… et beaucoup plus mémorable.

Pendant une semaine entière, j'ai plongé dans un environnement unique : conférences de haut niveau, ateliers pratiques, discussions techniques et rencontres avec des passionnés venus de tout le continent.

Des doctorants de Lagos, des ingénieurs de Nairobi, des chercheurs de Cape Town… tous réunis avec un objectif commun : construire l'IA en Afrique, pour l'Afrique.

L'événement réunissait aussi de grands acteurs comme Google DeepMind, Apple, IBM et Microsoft, venus soutenir l'écosystème africain.

Mais ce qui m'a le plus marqué, ce n'est pas seulement le niveau des conférences. C'est l'énergie collective. Une sensation que quelque chose est en train de se construire. Ensemble.

Kigali m'a frappé par sa beauté. Le Rwanda est souvent appelé le pays des mille collines, et on comprend vite pourquoi. Chaque paysage donne l'impression d'être une carte postale vivante.

Je suis rentré à Cotonou avec des idées plein la tête, des contacts précieux et une conviction renforcée : l'Afrique n'est pas en retard sur l'IA. Elle construit simplement son propre chemin.

Urunana — main dans la main.`,
  },
  {
    title: 'Être multi-passionné dans un monde qui veut te spécialiser',
    cat: 'Réflexion', date: 'Mars 2026',
    text: "IA, danse, design, entrepreneuriat... Tout le monde veut te mettre dans une case. Mais et si c'était ta force ?",
    image: '/assets/blog-multi.jpg',
    pinColor: '#1a1a2e', noteColor: '#f1f5f9',
    content: `"Tu fais trop de choses à la fois."

C'est probablement la phrase que j'entends le plus souvent.

Au début, ça me faisait douter. On me disait que pour réussir, il fallait choisir une seule chose. Une seule compétence. Un seul domaine.

Mais la vérité, c'est que je n'ai jamais été une personne "d'une seule chose". J'aime créer. J'aime comprendre. J'aime explorer.

Être multipassionné, ce n'est pas un manque de focus. C'est une façon différente de voir le monde.

Chaque domaine que j'explore nourrit les autres. La danse m'a appris la discipline et l'expression. Le design m'a appris à penser visuellement, à simplifier. Et paradoxalement, ça m'a rendu meilleur développeur.

Oui, le monde moderne récompense les spécialistes. Mais le monde a aussi besoin de connecteurs. Des personnes capables de relier les idées, les disciplines, les cultures.

Parce que les grandes innovations naissent souvent à l'intersection de plusieurs mondes.

J'ai fini par accepter que je ne suis pas fait pour une seule case.

Je crée. Je construis. J'explore.

Et au lieu d'essayer de réduire toutes ces facettes… j'ai décidé de les assumer.

Je suis un CreaBuilder.`,
  },
  {
    title: 'Mon lapin, mes premières leçons d\'élevage',
    cat: 'Vie & Aventures', date: 'Mars 2026',
    text: "J'ai adopté deux lapins. Ils sont devenus 4, puis 8, puis 13. Ce que j'ai appris sur la patience et la responsabilité.",
    image: '/assets/blog-elevage.jpg',
    pinColor: '#be185d', noteColor: '#fce7f3',
    content: `Ça peut sembler anodin. Un lapin.

Mais pour moi, c'est devenu une véritable passion.

Au départ, ce n'était même pas un projet réfléchi. Je l'ai adopté un peu par impulsion, un peu par curiosité.

Aujourd'hui, je n'ai pas un lapin. J'en ai treize.

Et tout a commencé avec deux.

Quand j'ai commencé, je pensais que ce serait simple. Un petit animal calme, discret. Mais très vite, j'ai compris que prendre soin d'un être vivant demande quelque chose que mon quotidien de builder ne m'avait pas vraiment appris : la présence.

Observer. Être attentif aux petits signes. Comprendre sans paroles.

Mon quotidien est souvent rapide. Construire des projets. Apprendre. Créer. Je suis toujours en train d'avancer.

Mais les lapins ne fonctionnent pas comme ça. Ils t'obligent à ralentir. À t'asseoir et observer. À accepter que certaines choses prennent du temps.

Et paradoxalement, c'est peut-être l'une des leçons les plus précieuses qu'ils m'ont apportées.

Aujourd'hui, quand je regarde mes treize lapins, je ne vois pas seulement des animaux. Je vois une histoire.

Ils m'ont appris la patience, l'attention, et l'humilité face à la vie.

Comme quoi, parfois, les plus grandes leçons viennent simplement d'un petit lapin.`,
  },
]

const NOTE_POSITIONS = [
  { rot: '-3deg',   top: '6%',  left: '1%',  size: 'large'  },
  { rot: '2.5deg',  top: '4%',  left: '35%', size: 'medium' },
  { rot: '-1.5deg', top: '5%',  left: '67%', size: 'medium' },
]
const SIZE_MAP: Record<string, any> = {
  large:  { width: '268px', fontSize: '13.5px' },
  medium: { width: '224px', fontSize: '12.5px' },
}

function Pin({ color }: { color: string }) {
  return (
    <div style={{ position: 'absolute', top: '-11px', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
      <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: color, boxShadow: `0 2px 6px ${color}80`, position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)', width: '2px', height: '10px', background: `linear-gradient(to bottom, ${color}, rgba(0,0,0,.15))`, borderRadius: '1px' }}/>
      </div>
    </div>
  )
}

function StickyNote({ article: a, pos, index, onClick }: { article: any; pos: any; index: number; onClick: (a: any) => void }) {
  const sz = SIZE_MAP[pos.size]
  return (
    <motion.div
      style={{ position: 'absolute', top: pos.top, left: pos.left, width: sz.width, zIndex: 10 + index }}
      initial={{ rotate: parseFloat(pos.rot), y: 20, opacity: 0 }}
      whileInView={{ rotate: parseFloat(pos.rot), y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * .15, duration: .6, type: 'spring', stiffness: 100 }}
      whileHover={{ rotate: 0, scale: 1.04, zIndex: 50, y: -8 }}
      onClick={() => onClick(a)}
    >
      <Pin color={a.pinColor}/>
      <div style={{ background: a.noteColor, boxShadow: '4px 8px 24px rgba(0,0,0,.14)', overflow: 'hidden', cursor: 'pointer' }}>
        <div style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
          <motion.img src={a.image} alt={a.title} whileHover={{ scale: 1.06 }} transition={{ duration: .5 }} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}/>
          <div style={{ position: 'absolute', top: '8px', left: '8px', display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(0,0,0,.55)', backdropFilter: 'blur(6px)', borderRadius: '3px', padding: '3px 8px' }}>
            <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: a.pinColor }}/>
            <span style={{ fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase' as const, fontWeight: 700, color: '#fff', fontFamily: "'DM Sans',sans-serif" }}>{a.cat}</span>
          </div>
        </div>
        <div style={{ padding: '14px 16px 16px', position: 'relative' }}>
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: '22px', height: '22px', background: 'linear-gradient(225deg, rgba(0,0,0,.1) 50%, transparent 50%)' }}/>
          <h3 style={{ fontFamily: "'Caveat',cursive", fontSize: `calc(${sz.fontSize} + 1px)`, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.3, marginBottom: '7px' }}>{a.title}</h3>
          <p style={{ fontFamily: "'Caveat',cursive", fontSize: sz.fontSize, color: '#5a5a5a', lineHeight: 1.6, marginBottom: '12px' }}>{a.text}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,.07)', paddingTop: '9px' }}>
            <span style={{ fontFamily: "'Caveat',cursive", fontSize: '12px', color: '#9a9a90' }}>{a.date}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: "'DM Sans',sans-serif", fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' as const, color: a.pinColor }}>
              Lire <ArrowRight size={10} color={a.pinColor} strokeWidth={2.5}/>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ArticleDrawer({ article, onClose }: { article: any; onClose: () => void }) {
  if (!article) return null
  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,.45)', backdropFilter: 'blur(3px)' }}/>
      <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 'clamp(320px,90vw,540px)', background: '#f5f2eb', zIndex: 201, overflowY: 'auto', boxShadow: '-24px 0 80px rgba(0,0,0,.25)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ height: '260px', position: 'relative', flexShrink: 0 }}>
          <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}/>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px', background: 'linear-gradient(to bottom, transparent, #f5f2eb)' }}/>
          <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0,0,0,.5)', backdropFilter: 'blur(8px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={16} color="#fff" strokeWidth={2}/>
          </button>
          <div style={{ position: 'absolute', bottom: '16px', left: '24px', display: 'inline-flex', alignItems: 'center', gap: '6px', background: article.pinColor, borderRadius: '4px', padding: '5px 12px' }}>
            <span style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase' as const, fontWeight: 700, color: '#fff', fontFamily: "'DM Sans',sans-serif" }}>{article.cat}</span>
          </div>
        </div>
        <div style={{ padding: '24px 28px 48px', flex: 1 }}>
          <div style={{ fontFamily: "'Caveat',cursive", fontSize: '15px', color: '#9a9a90', marginBottom: '12px' }}>{article.date}</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(22px,4vw,28px)', fontWeight: 900, color: '#1a1a1a', lineHeight: 1.2, marginBottom: '20px' }}>{article.title}</h2>
          <div style={{ width: '36px', height: '2px', background: `linear-gradient(to right, ${article.pinColor}, transparent)`, marginBottom: '24px' }}/>
          {article.content.split('\n\n').map((para: string, i: number) => (
            <p key={i} style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '15px', lineHeight: 1.85, color: '#5a5a5a', marginBottom: '18px' }}>{para}</p>
          ))}
          <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '20px', borderTop: '1px solid rgba(37,79,36,.1)' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#254f24', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '14px', color: '#bdce5e' }}>A</span>
            </div>
            <div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', fontWeight: 700, color: '#1a1a1a' }}>Alim Bachabi</div>
              <div style={{ fontFamily: "'Caveat',cursive", fontSize: '12px', color: '#9a9a90' }}>The CreaBuilder ✦</div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default function Blog() {
  const ref = useRef<HTMLElement>(null)
  const [openArticle, setOpenArticle] = useState<any>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const headerY = useTransform(scrollYProgress, [0,1], [40, -40])
  const notesY  = useTransform(scrollYProgress, [0,1], [30, -30])

  return (
    <>
      <section ref={ref} id="blog" className="torn-top" style={{
        background: '#ede9de',
        padding: 'clamp(36px,5vw,60px) clamp(20px,5vw,56px)',
        position: 'relative', overflow: 'hidden', minHeight: '40vh',
      }}>
        <div style={{ position: 'relative', zIndex: 10 }}>
          <motion.div style={{ y: headerY, marginBottom: 'clamp(32px,5vw,48px)' }}>
            <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase' as const, fontFamily: "'DM Sans',sans-serif", fontWeight: 700, color: '#bdce5e', filter: 'brightness(.7)', display: 'block', marginBottom: '10px' }}>Vie & Réflexions</motion.span>
            <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .1 }} style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px,5vw,60px)', fontWeight: 900, color: '#1a1a1a', lineHeight: 1 }}>
              Mon <span style={{ fontStyle: 'italic', color: '#254f24' }}>journal</span>
            </motion.h2>
            <p style={{ fontFamily: "'Caveat',cursive", fontSize: '20px', color: '#9a9a90', marginTop: '10px' }}>mes voyages, réflexions, aventures — clique pour lire</p>
          </motion.div>

          {/* Desktop notes */}
          <motion.div style={{ y: notesY }} className="blog-desktop" style2={{ position: 'relative', width: '100%', height: 'clamp(440px,62vh,560px)', maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ position: 'relative', width: '100%', height: 'clamp(440px,62vh,560px)', maxWidth: '1100px', margin: '0 auto' }}>
              {ARTICLES.map((a, i) => (
                <StickyNote key={a.title} article={a} pos={NOTE_POSITIONS[i]} index={i} onClick={setOpenArticle}/>
              ))}
            </div>
          </motion.div>

          {/* Mobile cartes */}
          <div className="blog-mobile" style={{ display: 'none', flexDirection: 'column', gap: '16px' }}>
            {ARTICLES.map(a => (
              <motion.div key={a.title} onClick={() => setOpenArticle(a)} whileHover={{ y: -3 }} style={{ background: a.noteColor, borderRadius: '8px', overflow: 'hidden', boxShadow: '4px 8px 24px rgba(0,0,0,.1)', cursor: 'pointer' }}>
                <div style={{ height: '180px', overflow: 'hidden' }}>
                  <img src={a.image} alt={a.title} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}/>
                </div>
                <div style={{ padding: '16px' }}>
                  <h3 style={{ fontFamily: "'Caveat',cursive", fontSize: '16px', fontWeight: 700, color: '#1a1a1a', lineHeight: 1.3, marginBottom: '6px' }}>{a.title}</h3>
                  <p style={{ fontFamily: "'Caveat',cursive", fontSize: '13px', color: '#5a5a5a', lineHeight: 1.5, marginBottom: '10px' }}>{a.text}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,.07)', paddingTop: '8px' }}>
                    <span style={{ fontFamily: "'Caveat',cursive", fontSize: '12px', color: '#9a9a90' }}>{a.date}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: "'DM Sans',sans-serif", fontSize: '9px', fontWeight: 700, color: a.pinColor }}>
                      Lire <ArrowRight size={10} color={a.pinColor} strokeWidth={2.5}/>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} style={{ display: 'flex', justifyContent: 'center', marginTop: 'clamp(20px,3vw,32px)' }}>
            <a href="#contact" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <PenLine size={13} color="#254f24" strokeWidth={2}/> Bientôt plus d'articles
            </a>
          </motion.div>
        </div>

        <style>{`
          @media (max-width: 700px) { .blog-desktop { display: none !important; } .blog-mobile { display: flex !important; } }
        `}</style>
      </section>
      <ArticleDrawer article={openArticle} onClose={() => setOpenArticle(null)}/>
    </>
  )
}