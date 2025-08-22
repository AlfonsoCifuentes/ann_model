import { Play, Download, ExternalLink } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Acting Reel - MODEL_NAME',
  description: 'Watch MODEL_NAME\'s professional acting reel showcasing range and talent across various roles and projects.',
}

const reelProjects = [
  {
    title: 'Short Film - "Mirrors"',
    role: 'Lead Actress',
    director: 'Director Name',
    year: '2024',
    description: 'Dramatic role exploring themes of identity and self-discovery.'
  },
  {
    title: 'Commercial - Luxury Brand',
    role: 'Brand Ambassador',
    director: 'Director Name',
    year: '2024',
    description: 'High-end commercial campaign showcasing elegance and sophistication.'
  },
  {
    title: 'Music Video - "Eternal"',
    role: 'Lead',
    director: 'Director Name',
    year: '2023',
    description: 'Artistic music video with contemporary dance elements.'
  }
]

export default function ReelPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6">
                Acting Reel
              </h1>
              <p className="text-lg text-brand-muted max-w-2xl mx-auto">
                Showcasing my range as an actress through diverse roles and performances. 
                From dramatic scenes to commercial work, explore my acting journey.
              </p>
            </div>

            {/* Main Video Player */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="relative aspect-video bg-brand-bg/50 rounded-lg overflow-hidden">
                <div className="flex items-center justify-center h-full bg-gray-800">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-brand-accent rounded-full flex items-center justify-center">
                      <Play className="text-brand-bg ml-1" size={32} />
                    </div>
                    <h3 className="text-xl font-playfair font-semibold mb-2">
                      Professional Acting Reel
                    </h3>
                    <p className="text-brand-muted mb-4">
                      Upload your reel video to /public/videos/reel.mp4
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button className="btn-primary flex items-center space-x-2">
                        <Play size={18} />
                        <span>Play Reel</span>
                      </button>
                      <button className="btn-secondary flex items-center space-x-2">
                        <Download size={18} />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Video Details */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <h4 className="font-medium text-brand-accent mb-1">Duration</h4>
                  <p className="text-brand-fg">2:30 min</p>
                </div>
                <div>
                  <h4 className="font-medium text-brand-accent mb-1">Quality</h4>
                  <p className="text-brand-fg">4K Ultra HD</p>
                </div>
                <div>
                  <h4 className="font-medium text-brand-accent mb-1">Updated</h4>
                  <p className="text-brand-fg">March 2024</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="section-padding bg-brand-bg/30">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
                Featured in Reel
              </h2>
              <p className="text-brand-muted text-lg">
                Projects and performances showcased in my acting reel
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reelProjects.map((project, index) => (
                <div 
                  key={index}
                  className="bg-brand-bg/50 p-6 rounded-lg"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-playfair font-semibold text-lg text-brand-fg">
                      {project.title}
                    </h3>
                    <span className="text-sm text-brand-accent bg-brand-accent/10 px-2 py-1 rounded">
                      {project.year}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <p className="text-brand-accent text-sm font-medium">
                      {project.role}
                    </p>
                    <p className="text-brand-muted text-sm">
                      Directed by {project.director}
                    </p>
                  </div>
                  
                  <p className="text-brand-fg text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills & Training */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
                  Acting Skills & Training
                </h2>
                <p className="text-brand-muted text-lg">
                  Professional training and specialized skills
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-playfair font-semibold mb-6 text-brand-accent">
                    Training & Education
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-brand-accent rounded-full mt-2 flex-shrink-0" />
                      <span className="text-brand-fg">Method Acting Technique</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-brand-accent rounded-full mt-2 flex-shrink-0" />
                      <span className="text-brand-fg">Meisner Technique</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-brand-accent rounded-full mt-2 flex-shrink-0" />
                      <span className="text-brand-fg">Screen Acting Workshop</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-brand-accent rounded-full mt-2 flex-shrink-0" />
                      <span className="text-brand-fg">Voice & Diction Training</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-playfair font-semibold mb-6 text-brand-accent">
                    Special Skills
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-brand-accent rounded-full mt-2 flex-shrink-0" />
                      <span className="text-brand-fg">Fluent Spanish & English</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-brand-accent rounded-full mt-2 flex-shrink-0" />
                      <span className="text-brand-fg">Contemporary Dance</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-brand-accent rounded-full mt-2 flex-shrink-0" />
                      <span className="text-brand-fg">Stage Combat</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-brand-accent rounded-full mt-2 flex-shrink-0" />
                      <span className="text-brand-fg">Horseback Riding</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="section-padding bg-brand-accent/10">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
                Interested in Working Together?
              </h2>
              <p className="text-lg text-brand-muted mb-8">
                I'm always excited about new acting opportunities and creative collaborations. 
                Let's discuss your project and how I can bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/booking" className="btn-primary">
                  Book for Project
                </a>
                <a href="/contact" className="btn-secondary">
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
