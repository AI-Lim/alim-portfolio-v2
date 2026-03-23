export type Project = {
  id: string
  title: string
  tag: string
  icon: string
  description: string
  techs: string[]
  link?: string
  link_label?: string
  image_url?: string
  featured: boolean
  status?: string
  created_at: string
}

export type BlogPost = {
  id: string
  title: string
  category: string
  date: string
  summary: string
  content: string
  image_url?: string
  pin_color: string
  note_color: string
  published: boolean
  created_at: string
}

export type CreaLabVideo = {
  id: string
  title: string
  series?: string
  episode_num?: number
  description?: string
  thumbnail_url?: string
  tiktok_url?: string
  status: 'available' | 'coming_soon'
  created_at: string
}

export type Service = {
  id: string
  num: string
  icon: string
  title: string
  short_title: string
  description: string
  items: string[]
  accent: string
  sort_order: number
}

export type Skill = {
  id: string
  label: string
  level: number
  icon: string
  category: string
}