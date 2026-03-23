'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Mail, Phone, Instagram, MapPin, Clock, ArrowUpRight, Send, Loader, Check, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE  = 'service_85076kf'
const EMAILJS_TEMPLATE = 'template_pw99zzb'
const EMAILJS_KEY      = 'Rj8kmVztUqEyjhBDn'

const contactItems = [
  { icon: Mail,      label: 'Email',              val: 'abdelalimbachabi@gmail.com', href: 'mailto:abdelalimbachabi@gmail.com'  },
  { icon: Phone,     label: 'WhatsApp / Tél',     val: '+229 0191910774',            href: 'tel:+2290191910774'                },
  { icon: Instagram, label: 'TikTok & Instagram', val: '@alim.bachabi',              href: 'https://instagram.com/alim.bachabi'},
  { icon: MapPin,    label: 'Localisation',       val: 'Abomey-Calavi',              href: '#'                                 },
]

function FormInput({ label, type = 'text', name, placeholder, value, onChange }: any) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{ fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase' as const, fontWeight: 700, color: 'rgba(245,242,235,.4)', fontFamily: "'DM Sans',sans-serif" }}>{label}</label>
      <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ background: focused ? 'rgba(255,255,255,.09)' : 'rgba(255,255,255,.05)', border: `1px solid ${focused ? 'rgba(189,206,94,.6)' : 'rgba(255,255,255,.08)'}`, borderRadius: '4px', padding: '13px 16px', fontFamily: "'DM Sans',sans-serif", fontSize: '14px', color: '#f5f2eb', outline: 'none', transition: 'all .25s', width: '100%', boxSizing: 'border-box' as const }}
      />
    </div>
  )
}

function FormTextarea({ label, name, placeholder, value, onChange }: any) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{ fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase' as const, fontWeight: 700, color: 'rgba(245,242,235,.4)', fontFamily: "'DM Sans',sans-serif" }}>{label}</label>
      <textarea name={name} placeholder={placeholder} value={value} onChange={onChange} rows={5}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ background: focused ? 'rgba(255,255,255,.09)' : 'rgba(255,255,255,.05)', border: `1px solid ${focused ? 'rgba(189,206,94,.6)' : 'rgba(255,255,255,.08)'}`, borderRadius: '4px', padding: '13px 16px', fontFamily: "'DM Sans',sans-serif", fontSize: '14px', color: '#f5f2eb', outline: 'none', resize: 'none', transition: 'all .25s', width: '100%', boxSizing: 'border-box' as const }}
      />
    </div>
  )
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const [form, setForm]     = useState({ from_name: '', from_email: '', message: '' })
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle')

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const headerY = useTransform(scrollYProgress, [0,1], [40, -40])
  const leftY   = useTransform(scrollYProgress, [0,1], [60, -30])
  const rightY  = useTransform(scrollYProgress, [0,1], [80, -20])

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async () => {
    if (!form.from_name || !form.from_email || !form.message) return
    setStatus('sending')
    try {
      await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, { from_name: form.from_name, from_email: form.from_email, message: form.message }, EMAILJS_KEY)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section ref={ref} id="contact" className="torn-top" style={{
      background: '#254f24',
      padding: 'clamp(60px,10vw,100px) clamp(20px,5vw,56px)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', bottom: '-40px', right: '-10px', fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(100px,22vw,280px)', color: 'rgba(255,255,255,.03)', pointerEvents: 'none', letterSpacing: '-8px', userSelect: 'none', lineHeight: 1 }}>TALK</div>
      <div style={{ position: 'absolute', top: '-80px', left: '-80px', width: '300px', height: '300px', borderRadius: '50%', border: '1px solid rgba(189,206,94,.08)', pointerEvents: 'none' }}/>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 5 }}>

        {/* Header */}
        <motion.div style={{ y: headerY, textAlign: 'center', marginBottom: 'clamp(48px,7vw,80px)' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(189,206,94,.12)', border: '1px solid rgba(189,206,94,.3)', borderRadius: '20px', padding: '6px 16px', marginBottom: '24px' }}>
            <motion.div animate={{ scale: [1, 1.3, 1], opacity: [1, .6, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#bdce5e', boxShadow: '0 0 8px #bdce5e' }}/>
            <span style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase' as const, fontWeight: 700, color: '#bdce5e', fontFamily: "'DM Sans',sans-serif" }}>Disponible pour des projets</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .1 }} style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(36px,6vw,72px)', fontWeight: 900, color: '#f5f2eb', lineHeight: 1, marginBottom: '16px' }}>
            Travaillons<br/><span style={{ color: '#bdce5e', fontStyle: 'italic' }}>ensemble</span>
          </motion.h2>
          <p style={{ fontFamily: "'Caveat',cursive", fontSize: '20px', color: 'rgba(245,242,235,.5)' }}>Un projet ? Une collab ? Une idée folle ? Je suis là.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 'clamp(32px,5vw,64px)', alignItems: 'start' }}>

          {/* Gauche */}
          <motion.div style={{ y: leftY }}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.06)', borderRadius: '8px', padding: '16px 18px', marginBottom: '24px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(189,206,94,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Clock size={18} color="#bdce5e" strokeWidth={1.6}/>
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#f5f2eb', fontFamily: "'DM Sans',sans-serif", marginBottom: '2px' }}>Temps de réponse</div>
                <div style={{ fontSize: '12px', color: 'rgba(245,242,235,.45)', fontFamily: "'DM Sans',sans-serif" }}>Généralement sous 24h</div>
              </div>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {contactItems.map((item, i) => (
                <motion.a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }}
                  whileHover={{ x: 6, background: 'rgba(189,206,94,.1)', borderColor: 'rgba(189,206,94,.25)' }}
                  style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none', color: '#f5f2eb', padding: '14px 16px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.06)', borderRadius: '8px' }}
                >
                  <div style={{ width: '38px', height: '38px', background: '#bdce5e', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <item.icon size={17} color="#254f24" strokeWidth={2}/>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase' as const, color: 'rgba(245,242,235,.35)', fontFamily: "'DM Sans',sans-serif", fontWeight: 700, marginBottom: '3px' }}>{item.label}</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#bdce5e', fontFamily: "'DM Sans',sans-serif" }}>{item.val}</div>
                  </div>
                  <ArrowUpRight size={14} color="rgba(189,206,94,.3)" strokeWidth={2}/>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Droite */}
          <motion.div style={{ y: rightY }}>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: .1 }}>
              {status === 'sent' ? (
                <div style={{ textAlign: 'center', padding: 'clamp(48px,8vw,80px) 24px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(189,206,94,.2)', borderRadius: '12px' }}>
                  <div style={{ width: '72px', height: '72px', background: 'rgba(189,206,94,.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '2px solid rgba(189,206,94,.4)' }}>
                    <Check size={34} color="#bdce5e" strokeWidth={2}/>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '28px', fontWeight: 700, color: '#bdce5e', marginBottom: '12px' }}>Message envoyé !</h3>
                  <p style={{ fontFamily: "'Caveat',cursive", fontSize: '18px', color: 'rgba(245,242,235,.6)', lineHeight: 1.6 }}>Je reviens vers toi très vite.<br/>Merci ! ✦</p>
                  <button onClick={() => { setStatus('idle'); setForm({ from_name: '', from_email: '', message: '' }) }} style={{ marginTop: '24px', background: 'transparent', border: '1px solid rgba(189,206,94,.3)', borderRadius: '4px', padding: '10px 24px', color: '#bdce5e', fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, cursor: 'pointer' }}>
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', borderRadius: '12px', padding: 'clamp(24px,4vw,40px)', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '28px', letterSpacing: '2px', color: '#f5f2eb', marginBottom: '4px' }}>Envoie-moi un message</div>
                    <div style={{ fontSize: '12px', color: 'rgba(245,242,235,.3)', fontFamily: "'DM Sans',sans-serif" }}>Tous les champs sont requis</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <FormInput label="Ton nom"   name="from_name"  placeholder="Qui es-tu ?"        value={form.from_name}  onChange={handleChange}/>
                    <FormInput label="Ton email" name="from_email" placeholder="ton@email.com" type="email" value={form.from_email} onChange={handleChange}/>
                  </div>
                  <FormTextarea label="Ton message" name="message" placeholder="Un projet, une collab, une idée folle..." value={form.message} onChange={handleChange}/>
                  {status === 'error' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.2)', borderRadius: '4px', padding: '10px 14px' }}>
                      <AlertCircle size={14} color="#ef4444" strokeWidth={2}/>
                      <span style={{ fontSize: '12px', color: '#ef4444', fontFamily: "'DM Sans',sans-serif" }}>Une erreur s'est produite. Réessaie ou contacte-moi directement.</span>
                    </div>
                  )}
                  <motion.button onClick={handleSubmit} disabled={status === 'sending'} whileHover={{ y: -2 }} style={{ background: status === 'sending' ? 'rgba(189,206,94,.5)' : '#bdce5e', color: '#254f24', border: 'none', borderRadius: '4px', padding: '15px 28px', fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, cursor: status === 'sending' ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%' }}>
                    {status === 'sending' ? <><Loader size={14} color="#254f24" strokeWidth={2}/> Envoi en cours...</> : <>Envoyer le message <Send size={14} color="#254f24" strokeWidth={2}/></>}
                  </motion.button>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}