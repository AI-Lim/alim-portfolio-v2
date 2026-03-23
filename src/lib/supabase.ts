import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// ── Projects ──────────────────────────────────────────────────────
export async function getProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function upsertProject(project: any) {
  const { data, error } = await supabase
    .from('projects')
    .upsert(project)
    .select()
  if (error) throw error
  return data
}

export async function deleteProject(id: string) {
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) throw error
}

// ── Blog ──────────────────────────────────────────────────────────
export async function getBlogPosts() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function getAllBlogPosts() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function upsertBlogPost(post: any) {
  const { data, error } = await supabase
    .from('blog_posts')
    .upsert(post)
    .select()
  if (error) throw error
  return data
}

export async function deleteBlogPost(id: string) {
  const { error } = await supabase.from('blog_posts').delete().eq('id', id)
  if (error) throw error
}

// ── CreaLab ───────────────────────────────────────────────────────
export async function getCrealabVideos() {
  const { data, error } = await supabase
    .from('crealab_videos')
    .select('*')
    .order('series', { ascending: true })
    .order('episode_num', { ascending: true })
  if (error) throw error
  return data ?? []
}

export async function upsertCrealabVideo(video: any) {
  const { data, error } = await supabase
    .from('crealab_videos')
    .upsert(video)
    .select()
  if (error) throw error
  return data
}

export async function deleteCrealabVideo(id: string) {
  const { error } = await supabase.from('crealab_videos').delete().eq('id', id)
  if (error) throw error
}

// ── Services ──────────────────────────────────────────────────────
export async function getServices() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data ?? []
}

export async function upsertService(service: any) {
  const { data, error } = await supabase
    .from('services')
    .upsert(service)
    .select()
  if (error) throw error
  return data
}

export async function deleteService(id: string) {
  const { error } = await supabase.from('services').delete().eq('id', id)
  if (error) throw error
}

// ── Skills ────────────────────────────────────────────────────────
export async function getSkills() {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('level', { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function upsertSkill(skill: any) {
  const { data, error } = await supabase
    .from('skills')
    .upsert(skill)
    .select()
  if (error) throw error
  return data
}

export async function deleteSkill(id: string) {
  const { error } = await supabase.from('skills').delete().eq('id', id)
  if (error) throw error
}

// ── Upload image ──────────────────────────────────────────────────
export async function uploadImage(file: File, bucket = 'portfolio') {
  const ext  = file.name.split('.').pop()
  const name = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(name, file, { upsert: true })
  if (error) throw error
  const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(name)
  return publicUrl
}

// ── Auth admin ────────────────────────────────────────────────────
export async function adminLogin(password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? 'abdelalimbachabi@gmail.com',
    password,
  })
  if (error) throw error
  return data
}

export async function adminLogout() {
  await supabase.auth.signOut()
}

export async function getAdminSession() {
  const { data } = await supabase.auth.getSession()
  return data.session
}