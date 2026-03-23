'use client'

import dynamic from 'next/dynamic'

const Navbar   = dynamic(() => import('@/components/Navbar'),   { ssr: false })
const Hero     = dynamic(() => import('@/components/sections/Hero'),     { ssr: false })
const About    = dynamic(() => import('@/components/sections/About'),    { ssr: false })
const Universe = dynamic(() => import('@/components/sections/Universe'), { ssr: false })
const Skills   = dynamic(() => import('@/components/sections/Skills'),   { ssr: false })
const Ventures = dynamic(() => import('@/components/sections/Ventures'), { ssr: false })
const Projects = dynamic(() => import('@/components/sections/Projects'), { ssr: false })
const CreaLab  = dynamic(() => import('@/components/sections/CreaLab'),  { ssr: false })
const Services = dynamic(() => import('@/components/sections/Services'), { ssr: false })
const Blog     = dynamic(() => import('@/components/sections/Blog'),     { ssr: false })
const Contact  = dynamic(() => import('@/components/sections/Contact'),  { ssr: false })
const Footer   = dynamic(() => import('@/components/sections/Footer'),   { ssr: false })

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Universe />
        <Skills />
        <Ventures />
        <Projects />
        <CreaLab />
        <Services />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  )
}