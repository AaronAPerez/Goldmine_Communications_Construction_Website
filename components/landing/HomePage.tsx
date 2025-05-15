import React from 'react'
import ContactForm from '../Contact/ContactForm'
import HeroWithLogo from '../Hero/HeroWithLogo'
import ServicesSection from '../Services/ServicesSection'
import ProjectShowcase from '../Projects/ProjectShowcase'



const HomePage = () => {
  return (
      <div className="flex flex-col min-h-screen overflow-hidden">
        {/* Hero Section - Premium Workplace Vending at Zero Cost */}
        <section
          id="hero"
          className="relative min-h-screen"
          aria-labelledby="hero-heading"
        >
              <HeroWithLogo/>
             
        </section>
        <section
          id="Services"
          className="relative min-h-screen"
          aria-labelledby="hero-heading"
        >
                <ServicesSection/>
        </section>
        <section
          id="project-showcase"
          className="relative min-h-screen"
          aria-labelledby="hero-heading"
        >
                <ProjectShowcase/>
        </section>
        <section
          id="hero"
          className="relative min-h-screen"
          aria-labelledby="hero-heading"
        >
                <ContactForm/>
        </section>

    </div>
  )
}

export default HomePage