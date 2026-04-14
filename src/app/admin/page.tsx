'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, FolderOpen, BookOpen, Tv,
  LogOut, Plus, Edit2, Trash2, Eye, EyeOff, Save,
  X, Check, AlertCircle, Lock, Upload
} from 'lucide-react'
import {
  adminLogin, adminLogout, getAdminSession,
  getProjects, upsertProject, deleteProject,
  getAllBlogPosts, upsertBlogPost, deleteBlogPost,
  getCrealabVideos, upsertCrealabVideo, deleteCrealabVideo,
  uploadImage,
} from '@/lib/supabase'

type Tab = 'dashboard' | 'projects' | 'blog' | 'crealab'

// ── Login ─────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  const handleLogin = async () => {
    if (!password) return
    setLoading(true); setError('')
    try { await adminLogin(password); onLogin() }
    catch { setError('Mot de passe incorrect') }
    finally { setLoading(false) }
  }

  return (
    <div style={{ minHeight: '100svh', background: '#0a0f0a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        style={{ background: '#0d1a0c', border: '1px solid rgba(189,206,94,.15)', borderRadius: '16px', padding: '48px', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
        <div style={{ width: '56px', height: '56px', background: 'rgba(189,206,94,.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <Lock size={24} color="#bdce5e" strokeWidth={1.5}/>
        </div>
        <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '32px', color: '#bdce5e', letterSpacing: '4px', marginBottom: '8px' }}>ADMIN</h1>
        <p style={{ fontFamily: "'Caveat',cursive", fontSize: '16px', color: 'rgba(245,242,235,.4)', marginBottom: '32px' }}>The CreaBuilder Portfolio</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input type="password" placeholder="Mot de passe" value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={{ background: 'rgba(255,255,255,.05)', border: `1px solid ${error ? 'rgba(239,68,68,.5)' : 'rgba(189,206,94,.2)'}`, borderRadius: '8px', padding: '14px 16px', color: '#f5f2eb', fontFamily: "'DM Sans',sans-serif", fontSize: '14px', outline: 'none', textAlign: 'center', letterSpacing: '4px' }}
          />
          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', fontSize: '12px', fontFamily: "'DM Sans',sans-serif", justifyContent: 'center' }}>
              <AlertCircle size={13} strokeWidth={2}/> {error}
            </div>
          )}
          <motion.button onClick={handleLogin} disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: .98 }}
            style={{ background: '#bdce5e', color: '#254f24', border: 'none', borderRadius: '8px', padding: '14px', fontFamily: "'DM Sans',sans-serif", fontSize: '13px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? .6 : 1 }}>
            {loading ? 'Connexion...' : 'Entrer'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

// ── Sidebar ───────────────────────────────────────────────────────
function Sidebar({ active, setActive, onLogout, counts }: {
  active: Tab; setActive: (t: Tab) => void; onLogout: () => void
  counts: { projects: number; blog: number; crealab: number }
}) {
  const items: { id: Tab; icon: any; label: string; count?: number }[] = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'projects',  icon: FolderOpen,      label: 'Projets',  count: counts.projects },
    { id: 'blog',      icon: BookOpen,        label: 'Blog',     count: counts.blog     },
    { id: 'crealab',   icon: Tv,              label: 'CreaLab',  count: counts.crealab  },
  ]

  return (
    <div className="admin-sidebar" style={{ width: '240px', background: '#0d1a0c', borderRight: '1px solid rgba(189,206,94,.1)', display: 'flex', flexDirection: 'column', flexShrink: 0, height: '100svh', position: 'sticky', top: 0 }}>
      <div className="admin-logo" style={{ padding: '24px 20px', borderBottom: '1px solid rgba(189,206,94,.08)' }}>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '20px', color: '#bdce5e', letterSpacing: '3px' }}>CREABUILDER</div>
        <div style={{ fontFamily: "'Caveat',cursive", fontSize: '12px', color: 'rgba(189,206,94,.4)' }}>Administration</div>
      </div>
      <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {items.map(item => (
          <button key={item.id} onClick={() => setActive(item.id)}
            data-active={active === item.id ? 'true' : 'false'}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '11px 14px', borderRadius: '8px', border: 'none',
              background: active === item.id ? 'rgba(189,206,94,.12)' : 'transparent',
              color: active === item.id ? '#bdce5e' : 'rgba(245,242,235,.4)',
              fontFamily: "'DM Sans',sans-serif", fontSize: '13px', fontWeight: 600,
              cursor: 'pointer', textAlign: 'left', width: '100%',
              borderLeft: active === item.id ? '2px solid #bdce5e' : '2px solid transparent',
              transition: 'all .2s',
            }}
            onMouseEnter={e => { if (active !== item.id) e.currentTarget.style.background = 'rgba(255,255,255,.04)' }}
            onMouseLeave={e => { if (active !== item.id) e.currentTarget.style.background = 'transparent' }}
          >
            <item.icon size={16} strokeWidth={active === item.id ? 2 : 1.5}/>
            <span className="nav-label">{item.label}</span>
            {item.count !== undefined && (
              <span className="nav-count" style={{ marginLeft: 'auto', background: 'rgba(189,206,94,.15)', color: '#bdce5e', borderRadius: '10px', padding: '1px 8px', fontSize: '11px', fontWeight: 700 }}>
                {item.count}
              </span>
            )}
          </button>
        ))}
      </nav>
      <div className="admin-footer" style={{ padding: '12px', borderTop: '1px solid rgba(189,206,94,.08)' }}>
        <a href="/" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '8px', color: 'rgba(245,242,235,.3)', textDecoration: 'none', fontFamily: "'DM Sans',sans-serif", fontSize: '12px', marginBottom: '4px' }}>
          <Eye size={15} strokeWidth={1.5}/> Voir le site
        </a>
        <button onClick={onLogout}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,.1)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '8px', border: 'none', background: 'transparent', color: 'rgba(239,68,68,.6)', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", fontSize: '12px', width: '100%', textAlign: 'left', transition: 'background .2s' }}>
          <LogOut size={15} strokeWidth={1.5}/> Déconnexion
        </button>
      </div>
    </div>
  )
}

// ── Dashboard ─────────────────────────────────────────────────────
function Dashboard({ counts }: { counts: any }) {
  const cards = [
    { label: 'Projets',        value: counts.projects, icon: FolderOpen, color: '#bdce5e' },
    { label: 'Articles Blog',  value: counts.blog,     icon: BookOpen,   color: '#7a9e3b' },
    { label: 'Vidéos CreaLab', value: counts.crealab,  icon: Tv,         color: '#a78bfa' },
  ]
  return (
    <div style={{ padding: 'clamp(24px,4vw,40px)' }}>
      <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: '32px', fontWeight: 900, color: '#f5f2eb', marginBottom: '8px' }}>Tableau de bord</h1>
      <p style={{ fontFamily: "'Caveat',cursive", fontSize: '18px', color: 'rgba(245,242,235,.4)', marginBottom: '40px' }}>Bienvenue Alim 👋</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '20px', marginBottom: '40px' }}>
        {cards.map((c, i) => (
          <motion.div key={c.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * .1 }}
            style={{ background: '#0d1a0c', border: `1px solid ${c.color}22`, borderRadius: '12px', padding: '24px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: `${c.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <c.icon size={18} color={c.color} strokeWidth={1.8}/>
            </div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '40px', color: c.color, lineHeight: 1 }}>{c.value}</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: 'rgba(245,242,235,.4)', marginTop: '4px' }}>{c.label}</div>
          </motion.div>
        ))}
      </div>
      <div style={{ background: '#0d1a0c', border: '1px solid rgba(189,206,94,.1)', borderRadius: '12px', padding: '24px' }}>
        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', fontWeight: 700, color: '#bdce5e', marginBottom: '16px', letterSpacing: '2px', textTransform: 'uppercase' }}>Actions rapides</div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {['Ajouter un projet', 'Écrire un article', 'Nouvelle vidéo CreaLab'].map(label => (
            <div key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(189,206,94,.08)', border: '1px solid rgba(189,206,94,.15)', borderRadius: '8px', padding: '10px 16px', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: '#bdce5e', fontWeight: 600 }}>
              <Plus size={14} strokeWidth={2}/> {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Composants utilitaires ────────────────────────────────────────
function ImageUpload({ label, value, onChange }: { label: string; value: string; onChange: (url: string) => void }) {
  const [dragging,  setDragging]  = useState(false)
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return
    setUploading(true)
    try { const url = await uploadImage(file); onChange(url) }
    catch (e) { console.error(e) }
    finally { setUploading(false) }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <div>
      <label style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: 'rgba(245,242,235,.4)', fontFamily: "'DM Sans',sans-serif", display: 'block', marginBottom: '8px' }}>{label}</label>
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        style={{ border: `2px dashed ${dragging ? '#bdce5e' : 'rgba(189,206,94,.25)'}`, borderRadius: '8px', padding: '20px', textAlign: 'center', cursor: 'pointer', background: dragging ? 'rgba(189,206,94,.08)' : 'rgba(255,255,255,.03)', transition: 'all .2s', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', minHeight: '100px' }}
      >
        <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f) }}/>
        {uploading ? (
          <div style={{ color: '#bdce5e', fontFamily: "'DM Sans',sans-serif", fontSize: '13px' }}>Upload en cours...</div>
        ) : value ? (
          <>
            <img src={value} alt="preview" style={{ maxHeight: '120px', maxWidth: '100%', objectFit: 'contain', borderRadius: '4px' }}/>
            <div style={{ fontSize: '11px', color: 'rgba(189,206,94,.5)', fontFamily: "'DM Sans',sans-serif" }}>Clique ou dépose pour changer</div>
          </>
        ) : (
          <>
            <Upload size={24} color="rgba(189,206,94,.4)" strokeWidth={1.5}/>
            <div style={{ fontSize: '13px', color: 'rgba(245,242,235,.4)', fontFamily: "'DM Sans',sans-serif" }}>Dépose ton image ici ou clique</div>
            <div style={{ fontSize: '11px', color: 'rgba(245,242,235,.2)', fontFamily: "'DM Sans',sans-serif" }}>JPG, PNG, WebP</div>
          </>
        )}
      </div>
    </div>
  )
}

function FormField({ label, value, onChange, multiline, rows = 4, type = 'text' }: any) {
  const base: any = { background: 'rgba(255,255,255,.05)', border: '1px solid rgba(189,206,94,.15)', borderRadius: '6px', padding: '11px 14px', color: '#f5f2eb', fontFamily: "'DM Sans',sans-serif", fontSize: '13px', outline: 'none', width: '100%', boxSizing: 'border-box', resize: 'vertical' }
  return (
    <div>
      <label style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: 'rgba(245,242,235,.4)', fontFamily: "'DM Sans',sans-serif", display: 'block', marginBottom: '8px' }}>{label}</label>
      {multiline
        ? <textarea rows={rows} value={value ?? ''} onChange={e => onChange(e.target.value)} style={base}/>
        : <input type={type} value={value ?? ''} onChange={e => onChange(e.target.value)} style={{ ...base, height: type === 'color' ? '44px' : 'auto', padding: type === 'color' ? '4px' : '11px 14px', cursor: type === 'color' ? 'pointer' : 'text' }}/>
      }
    </div>
  )
}

function EditModal({ title, children, onClose, onSave, saving }: any) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(0,0,0,.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <motion.div initial={{ scale: .93, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: .95, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        style={{ background: '#0d1a0c', border: '1px solid rgba(189,206,94,.15)', borderRadius: '16px', maxWidth: '600px', width: '100%', maxHeight: '85vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(189,206,94,.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '22px', color: '#bdce5e', letterSpacing: '2px' }}>{title}</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '6px' }}>
            <X size={18} color="rgba(245,242,235,.4)" strokeWidth={2}/>
          </button>
        </div>
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {children}
        </div>
        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(189,206,94,.08)', display: 'flex', gap: '12px', justifyContent: 'flex-end', flexShrink: 0 }}>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: '8px', padding: '10px 20px', color: 'rgba(245,242,235,.6)', fontFamily: "'DM Sans',sans-serif", fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
            Annuler
          </button>
          <motion.button onClick={onSave} disabled={saving} whileHover={{ scale: 1.02 }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: saving ? 'rgba(189,206,94,.5)' : '#bdce5e', border: 'none', borderRadius: '8px', padding: '10px 20px', color: '#254f24', fontFamily: "'DM Sans',sans-serif", fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: saving ? 'not-allowed' : 'pointer' }}>
            {saving ? <><Check size={13} strokeWidth={2}/> Sauvegarde...</> : <><Save size={13} strokeWidth={2}/> Sauvegarder</>}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

function ActionBtn({ onClick, color, children }: any) {
  return (
    <button onClick={onClick}
      onMouseEnter={e => e.currentTarget.style.background = `${color}22`}
      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.05)'}
      style={{ width: '34px', height: '34px', borderRadius: '6px', border: 'none', background: 'rgba(255,255,255,.05)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .2s' }}>
      {children}
    </button>
  )
}

// ── Projects Manager ──────────────────────────────────────────────
function ProjectsManager() {
  const [projects, setProjects] = useState<any[]>([])
  const [editing,  setEditing]  = useState<any>(null)
  const [loading,  setLoading]  = useState(true)
  const [saving,   setSaving]   = useState(false)

  useEffect(() => { load() }, [])
  const load = async () => { setLoading(true); try { setProjects(await getProjects()) } finally { setLoading(false) } }

  const handleSave = async () => {
    if (!editing) return
    setSaving(true)
    try {
      await upsertProject({ ...editing, techs: typeof editing.techs === 'string' ? editing.techs.split(',').map((s: string) => s.trim()) : editing.techs })
      await load(); setEditing(null)
    } finally { setSaving(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce projet ?')) return
    await deleteProject(id); await load()
  }

  const blank = { title: '', tag: '', icon: 'Rocket', description: '', techs: '', link: '', link_label: '', image_url: '', featured: false, status: 'En développement' }

  return (
    <div style={{ padding: 'clamp(24px,4vw,40px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: '28px', fontWeight: 900, color: '#f5f2eb' }}>Projets</h1>
          <p style={{ color: 'rgba(245,242,235,.4)', fontSize: '14px', fontFamily: "'DM Sans',sans-serif", marginTop: '4px' }}>{projects.length} projet{projects.length > 1 ? 's' : ''}</p>
        </div>
        <motion.button onClick={() => setEditing(blank)} whileHover={{ scale: 1.04 }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#bdce5e', color: '#254f24', border: 'none', borderRadius: '8px', padding: '12px 20px', fontFamily: "'DM Sans',sans-serif", fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer' }}>
          <Plus size={14} strokeWidth={2}/> Nouveau
        </motion.button>
      </div>

      {loading ? <div style={{ color: 'rgba(245,242,235,.4)', fontFamily: "'DM Sans',sans-serif" }}>Chargement...</div> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {projects.map(p => (
            <motion.div key={p.id} whileHover={{ x: 4 }} style={{ display: 'flex', alignItems: 'center', gap: '16px', background: '#0d1a0c', border: '1px solid rgba(189,206,94,.08)', borderRadius: '10px', padding: '16px 20px' }}>
              {p.image_url && <img src={p.image_url} alt={p.title} style={{ width: '56px', height: '40px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }}/>}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '14px', fontWeight: 700, color: '#f5f2eb', marginBottom: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: 'rgba(245,242,235,.4)' }}>{p.tag} · {p.status}</div>
              </div>
              {p.featured && <span style={{ background: 'rgba(189,206,94,.15)', color: '#bdce5e', padding: '3px 10px', borderRadius: '20px', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: "'DM Sans',sans-serif", fontWeight: 700, flexShrink: 0 }}>Featured</span>}
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <ActionBtn onClick={() => setEditing(p)} color="#bdce5e"><Edit2 size={14} color="#bdce5e" strokeWidth={2}/></ActionBtn>
                <ActionBtn onClick={() => handleDelete(p.id)} color="#ef4444"><Trash2 size={14} color="#ef4444" strokeWidth={2}/></ActionBtn>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {editing && (
          <EditModal title={editing.id ? 'Modifier le projet' : 'Nouveau projet'} onClose={() => setEditing(null)} onSave={handleSave} saving={saving}>
            <FormField label="Titre"                        value={editing.title}       onChange={(v: string) => setEditing({ ...editing, title: v })}/>
            <FormField label="Tag / Catégorie"              value={editing.tag}         onChange={(v: string) => setEditing({ ...editing, tag: v })}/>
            <FormField label="Icône (Lucide)"               value={editing.icon}        onChange={(v: string) => setEditing({ ...editing, icon: v })}/>
            <FormField label="Description"                  value={editing.description} onChange={(v: string) => setEditing({ ...editing, description: v })} multiline/>
            <FormField label="Techs (séparées par virgule)" value={Array.isArray(editing.techs) ? editing.techs.join(', ') : editing.techs} onChange={(v: string) => setEditing({ ...editing, techs: v })}/>
            <FormField label="Lien"                         value={editing.link}        onChange={(v: string) => setEditing({ ...editing, link: v })}/>
            <FormField label="Label du lien"                value={editing.link_label}  onChange={(v: string) => setEditing({ ...editing, link_label: v })}/>
            <FormField label="Statut"                       value={editing.status}      onChange={(v: string) => setEditing({ ...editing, status: v })}/>
            <ImageUpload label="Image du projet" value={editing.image_url ?? ''} onChange={v => setEditing({ ...editing, image_url: v })}/>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input type="checkbox" id="featured" checked={editing.featured ?? false} onChange={e => setEditing({ ...editing, featured: e.target.checked })} style={{ width: '16px', height: '16px', accentColor: '#bdce5e' }}/>
              <label htmlFor="featured" style={{ color: 'rgba(245,242,235,.7)', fontFamily: "'DM Sans',sans-serif", fontSize: '13px' }}>Featured</label>
            </div>
          </EditModal>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Blog Manager ──────────────────────────────────────────────────
function BlogManager() {
  const [posts,   setPosts]   = useState<any[]>([])
  const [editing, setEditing] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving,  setSaving]  = useState(false)

  useEffect(() => { load() }, [])
  const load = async () => { setLoading(true); try { setPosts(await getAllBlogPosts()) } finally { setLoading(false) } }

  const handleSave = async () => {
    if (!editing) return
    setSaving(true)
    try { await upsertBlogPost(editing); await load(); setEditing(null) } finally { setSaving(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cet article ?')) return
    await deleteBlogPost(id); await load()
  }

  const handleToggle = async (post: any) => {
    await upsertBlogPost({ ...post, published: !post.published }); await load()
  }

  const blank = { title: '', category: '', date: '', summary: '', content: '', image_url: '', pin_color: '#254f24', note_color: '#dcfce7', published: false }

  return (
    <div style={{ padding: 'clamp(24px,4vw,40px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: '28px', fontWeight: 900, color: '#f5f2eb' }}>Blog</h1>
          <p style={{ color: 'rgba(245,242,235,.4)', fontSize: '14px', fontFamily: "'DM Sans',sans-serif", marginTop: '4px' }}>{posts.length} article{posts.length > 1 ? 's' : ''}</p>
        </div>
        <motion.button onClick={() => setEditing(blank)} whileHover={{ scale: 1.04 }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#bdce5e', color: '#254f24', border: 'none', borderRadius: '8px', padding: '12px 20px', fontFamily: "'DM Sans',sans-serif", fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer' }}>
          <Plus size={14} strokeWidth={2}/> Nouvel article
        </motion.button>
      </div>

      {loading ? <div style={{ color: 'rgba(245,242,235,.4)', fontFamily: "'DM Sans',sans-serif" }}>Chargement...</div> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {posts.map(p => (
            <motion.div key={p.id} whileHover={{ x: 4 }} style={{ display: 'flex', alignItems: 'center', gap: '16px', background: '#0d1a0c', border: '1px solid rgba(189,206,94,.08)', borderRadius: '10px', padding: '16px 20px' }}>
              {p.image_url && <img src={p.image_url} alt={p.title} style={{ width: '64px', height: '44px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }}/>}
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.published ? '#bdce5e' : 'rgba(255,255,255,.2)', flexShrink: 0 }}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '14px', fontWeight: 700, color: '#f5f2eb', marginBottom: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: 'rgba(245,242,235,.4)' }}>{p.category} · {p.date}</div>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <ActionBtn onClick={() => handleToggle(p)} color="#bdce5e">
                  {p.published ? <Eye size={14} color="#bdce5e" strokeWidth={2}/> : <EyeOff size={14} color="rgba(245,242,235,.4)" strokeWidth={2}/>}
                </ActionBtn>
                <ActionBtn onClick={() => setEditing(p)} color="#bdce5e"><Edit2 size={14} color="#bdce5e" strokeWidth={2}/></ActionBtn>
                <ActionBtn onClick={() => handleDelete(p.id)} color="#ef4444"><Trash2 size={14} color="#ef4444" strokeWidth={2}/></ActionBtn>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {editing && (
          <EditModal title={editing.id ? "Modifier l'article" : 'Nouvel article'} onClose={() => setEditing(null)} onSave={handleSave} saving={saving}>
            <FormField label="Titre"           value={editing.title}    onChange={(v: string) => setEditing({ ...editing, title: v })}/>
            <FormField label="Catégorie"       value={editing.category} onChange={(v: string) => setEditing({ ...editing, category: v })}/>
            <FormField label="Date"            value={editing.date}     onChange={(v: string) => setEditing({ ...editing, date: v })}/>
            <FormField label="Résumé court"    value={editing.summary}  onChange={(v: string) => setEditing({ ...editing, summary: v })} multiline/>
            <FormField label="Contenu complet" value={editing.content}  onChange={(v: string) => setEditing({ ...editing, content: v })} multiline rows={10}/>
            <ImageUpload label="Image de l'article" value={editing.image_url ?? ''} onChange={v => setEditing({ ...editing, image_url: v })}/>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <FormField label="Couleur épingle" value={editing.pin_color}  onChange={(v: string) => setEditing({ ...editing, pin_color: v })}  type="color"/>
              <FormField label="Couleur note"    value={editing.note_color} onChange={(v: string) => setEditing({ ...editing, note_color: v })} type="color"/>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input type="checkbox" id="pub" checked={editing.published ?? false} onChange={e => setEditing({ ...editing, published: e.target.checked })} style={{ width: '16px', height: '16px', accentColor: '#bdce5e' }}/>
              <label htmlFor="pub" style={{ color: 'rgba(245,242,235,.7)', fontFamily: "'DM Sans',sans-serif", fontSize: '13px' }}>Publié</label>
            </div>
          </EditModal>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── CreaLab Manager ───────────────────────────────────────────────
function CrealabManager() {
  const [videos,  setVideos]  = useState<any[]>([])
  const [editing, setEditing] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving,  setSaving]  = useState(false)

  useEffect(() => { load() }, [])
  const load = async () => { setLoading(true); try { setVideos(await getCrealabVideos()) } finally { setLoading(false) } }

  const handleSave = async () => {
    if (!editing) return
    setSaving(true)
    try { await upsertCrealabVideo(editing); await load(); setEditing(null) } finally { setSaving(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette vidéo ?')) return
    await deleteCrealabVideo(id); await load()
  }

  const blank = { title: '', series: 'Into My Brain', type: 'serie', episode_num: 1, description: '', thumbnail_url: '', tiktok_url: '', status: 'coming_soon' }

  return (
    <div style={{ padding: 'clamp(24px,4vw,40px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: '28px', fontWeight: 900, color: '#f5f2eb' }}>CreaLab</h1>
          <p style={{ color: 'rgba(245,242,235,.4)', fontSize: '14px', fontFamily: "'DM Sans',sans-serif", marginTop: '4px' }}>{videos.length} vidéo{videos.length > 1 ? 's' : ''}</p>
        </div>
        <motion.button onClick={() => setEditing(blank)} whileHover={{ scale: 1.04 }}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#bdce5e', color: '#254f24', border: 'none', borderRadius: '8px', padding: '12px 20px', fontFamily: "'DM Sans',sans-serif", fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer' }}>
          <Plus size={14} strokeWidth={2}/> Nouvelle vidéo
        </motion.button>
      </div>

      {loading ? <div style={{ color: 'rgba(245,242,235,.4)', fontFamily: "'DM Sans',sans-serif" }}>Chargement...</div> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {videos.map(v => (
            <motion.div key={v.id} whileHover={{ x: 4 }} style={{ display: 'flex', alignItems: 'center', gap: '16px', background: '#0d1a0c', border: '1px solid rgba(189,206,94,.08)', borderRadius: '10px', padding: '16px 20px' }}>
              {v.thumbnail_url
                ? <img src={v.thumbnail_url} alt={v.title} style={{ width: '80px', height: '45px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }}/>
                : <div style={{ width: '80px', height: '45px', background: 'rgba(189,206,94,.08)', borderRadius: '6px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Tv size={16} color="rgba(189,206,94,.3)" strokeWidth={1.5}/>
                  </div>
              }
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '14px', fontWeight: 700, color: '#f5f2eb', marginBottom: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.title}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: 'rgba(245,242,235,.4)' }}>{v.series} · Ép. {v.episode_num} · {v.status === 'available' ? '✅ Disponible' : '⏳ Bientôt'}</div>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <ActionBtn onClick={() => setEditing(v)} color="#bdce5e"><Edit2 size={14} color="#bdce5e" strokeWidth={2}/></ActionBtn>
                <ActionBtn onClick={() => handleDelete(v.id)} color="#ef4444"><Trash2 size={14} color="#ef4444" strokeWidth={2}/></ActionBtn>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {editing && (
          <EditModal title={editing.id ? 'Modifier la vidéo' : 'Nouvelle vidéo'} onClose={() => setEditing(null)} onSave={handleSave} saving={saving}>
            <FormField label="Titre"  value={editing.title}  onChange={(v: string) => setEditing({ ...editing, title: v })}/>
            <FormField label="Série"  value={editing.series} onChange={(v: string) => setEditing({ ...editing, series: v })}/>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <FormField label="Type (serie/short)" value={editing.type}               onChange={(v: string) => setEditing({ ...editing, type: v })}/>
              <FormField label="N° épisode"         value={String(editing.episode_num)} onChange={(v: string) => setEditing({ ...editing, episode_num: parseInt(v) || 1 })} type="number"/>
            </div>
            <FormField label="Description" value={editing.description} onChange={(v: string) => setEditing({ ...editing, description: v })} multiline/>
            <ImageUpload label="Miniature de l'épisode" value={editing.thumbnail_url ?? ''} onChange={v => setEditing({ ...editing, thumbnail_url: v })}/>
            <FormField label="Lien TikTok" value={editing.tiktok_url} onChange={(v: string) => setEditing({ ...editing, tiktok_url: v })}/>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' as const, color: 'rgba(245,242,235,.4)', fontFamily: "'DM Sans',sans-serif", display: 'block', marginBottom: '8px' }}>Statut</label>
              <select value={editing.status} onChange={e => setEditing({ ...editing, status: e.target.value })} style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(189,206,94,.2)', borderRadius: '6px', padding: '11px 14px', color: '#f5f2eb', fontFamily: "'DM Sans',sans-serif", fontSize: '13px', outline: 'none', width: '100%' }}>
                <option value="coming_soon">Bientôt</option>
                <option value="available">Disponible</option>
              </select>
            </div>
          </EditModal>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Page principale ───────────────────────────────────────────────
export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [activeTab,     setActiveTab]     = useState<Tab>('dashboard')
  const [counts,        setCounts]        = useState({ projects: 0, blog: 0, crealab: 0 })

  useEffect(() => { getAdminSession().then(session => setAuthenticated(!!session)) }, [])

  useEffect(() => {
    if (!authenticated) return
    Promise.all([getProjects(), getAllBlogPosts(), getCrealabVideos()])
      .then(([p, b, c]) => setCounts({ projects: p.length, blog: b.length, crealab: c.length }))
      .catch(() => {})
  }, [authenticated])

  if (authenticated === null) return (
    <div style={{ minHeight: '100svh', background: '#0a0f0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: 'rgba(189,206,94,.5)', fontFamily: "'DM Sans',sans-serif" }}>Vérification...</div>
    </div>
  )

  if (!authenticated) return <LoginScreen onLogin={() => setAuthenticated(true)}/>

  const handleLogout = async () => { await adminLogout(); setAuthenticated(false) }

  return (
    <>
      <style>{`
        .admin-layout { display: flex; min-height: 100svh; background: #0a0f0a; color: #f5f2eb; }
        .admin-main { flex: 1; overflow-y: auto; }
        @media (max-width: 768px) {
          .admin-layout { flex-direction: column; }
          .admin-sidebar {
            width: 100% !important; height: auto !important;
            position: fixed !important; bottom: 0 !important; top: auto !important;
            z-index: 100 !important; border-right: none !important;
            border-top: 1px solid rgba(189,206,94,.15) !important;
            flex-direction: row !important;
          }
          .admin-sidebar nav {
            flex-direction: row !important; padding: 6px 8px !important;
            justify-content: space-around !important; gap: 0 !important;
          }
          .admin-sidebar nav button {
            flex-direction: column !important; gap: 3px !important;
            padding: 8px 10px !important; border-left: none !important;
            border-bottom: 2px solid transparent !important;
            font-size: 9px !important; min-width: 56px !important;
          }
          .admin-sidebar nav button[data-active="true"] {
            border-bottom: 2px solid #bdce5e !important;
            border-left: none !important;
          }
          .nav-count { display: none !important; }
          .admin-logo, .admin-footer { display: none !important; }
          .admin-main { padding-bottom: 80px !important; }
        }
      `}</style>
      <div className="admin-layout">
        <Sidebar active={activeTab} setActive={setActiveTab} onLogout={handleLogout} counts={counts}/>
        <main className="admin-main">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .25 }}>
              {activeTab === 'dashboard' && <Dashboard counts={counts}/>}
              {activeTab === 'projects'  && <ProjectsManager/>}
              {activeTab === 'blog'      && <BlogManager/>}
              {activeTab === 'crealab'   && <CrealabManager/>}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </>
  )
}