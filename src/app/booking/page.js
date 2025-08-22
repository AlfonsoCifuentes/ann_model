import { Calendar, Clock, MapPin, Users, Camera, Film } from 'lucide-react'
import BookingForm from '../../components/BookingForm'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Book MODEL_NAME - Professional Modeling & Acting Services',
  description: 'Book MODEL_NAME for fashion shoots, commercial campaigns, runway shows, and acting projects. Professional rates and availability.',
}

const serviceTypes = [
  {
    icon: Camera,
    title: 'Fashion Photography',
    description: 'Editorial shoots, lookbooks, and fashion campaigns',
    duration: '2-8 hours',
    price: 'From $500/day'
  },
  {
    icon: Users,
    title: 'Commercial Campaigns',
    description: 'Brand campaigns, advertisements, and commercial work',
    duration: '1-3 days',
    price: 'From $1,000/day'
  },
  {
    icon: MapPin,
    title: 'Runway Shows',
    description: 'Fashion week, designer shows, and runway events',
    duration: '2-6 hours',
    price: 'From $300/show'
  },
  {
    icon: Film,
    title: 'Acting Projects',
    description: 'Film, television, commercials, and theater',
    duration: 'Variable',
    price: 'Quote on request'
  }
]

const bookingInfo = [
  {
    title: 'Advance Notice',
    description: 'Minimum 48 hours notice required for all bookings'
  },
  {
    title: 'Travel',
    description: 'Available for international assignments. Travel expenses covered by client.'
  },
  {
    title: 'Usage Rights',
    description: 'Commercial usage rights available. Social media usage included in all packages.'
  },
  {
    title: 'Cancellation',
    description: '24-hour cancellation policy. 50% fee for cancellations within 24 hours.'
  }
]

export default function BookingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6">
                Book Professional Services
              </h1>
              <p className="text-lg text-brand-muted max-w-2xl mx-auto">
                Available for fashion photography, commercial campaigns, runway shows, 
                and acting projects worldwide. Let's create something extraordinary together.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding bg-brand-bg/30">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
                Services Available
              </h2>
              <p className="text-brand-muted">
                Professional modeling and acting services for diverse projects
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {serviceTypes.map((service, index) => {
                const IconComponent = service.icon
                return (
                  <div 
                    key={index}
                    className="bg-brand-bg/50 p-6 rounded-lg text-center hover:bg-brand-bg/70 transition-colors duration-300"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-brand-accent/10 rounded-full flex items-center justify-center">
                      <IconComponent className="text-brand-accent" size={24} />
                    </div>
                    <h3 className="font-playfair font-semibold text-lg mb-2 text-brand-fg">
                      {service.title}
                    </h3>
                    <p className="text-brand-muted text-sm mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-center text-xs text-brand-accent">
                        <Clock size={12} className="mr-1" />
                        {service.duration}
                      </div>
                      <div className="text-brand-fg font-medium text-sm">
                        {service.price}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Booking Form Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Form */}
                <div>
                  <h2 className="text-3xl font-playfair font-bold mb-6">
                    Request Booking
                  </h2>
                  <p className="text-brand-muted mb-8">
                    Fill out the form below with your project details. I'll respond 
                    within 24 hours with availability and a custom quote.
                  </p>
                  <BookingForm />
                </div>

                {/* Booking Information */}
                <div>
                  <h3 className="text-2xl font-playfair font-bold mb-6">
                    Booking Information
                  </h3>
                  
                  <div className="space-y-6 mb-8">
                    {bookingInfo.map((info, index) => (
                      <div key={index} className="border-l-2 border-brand-accent pl-4">
                        <h4 className="font-medium text-brand-fg mb-1">
                          {info.title}
                        </h4>
                        <p className="text-brand-muted text-sm leading-relaxed">
                          {info.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Contact Info */}
                  <div className="bg-brand-bg/30 p-6 rounded-lg">
                    <h4 className="font-playfair font-semibold text-lg mb-4 text-brand-accent">
                      Direct Contact
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-brand-muted text-sm">Email</span>
                        <p className="text-brand-fg">CONTACT_EMAIL</p>
                      </div>
                      <div>
                        <span className="text-brand-muted text-sm">Phone</span>
                        <p className="text-brand-fg">CONTACT_PHONE</p>
                      </div>
                      <div>
                        <span className="text-brand-muted text-sm">Management</span>
                        <p className="text-brand-fg">MANAGEMENT_CONTACT</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding bg-brand-bg/30">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-brand-muted">
                  Common questions about booking and working together
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-brand-bg/50 p-6 rounded-lg">
                  <h3 className="font-medium text-brand-fg mb-2">
                    What's included in a standard day rate?
                  </h3>
                  <p className="text-brand-muted text-sm leading-relaxed">
                    Standard day rates include 8 hours of shooting time, basic hair and makeup, 
                    wardrobe styling consultation, and social media usage rights. Travel within 
                    the city limits is included.
                  </p>
                </div>

                <div className="bg-brand-bg/50 p-6 rounded-lg">
                  <h3 className="font-medium text-brand-fg mb-2">
                    Do you work internationally?
                  </h3>
                  <p className="text-brand-muted text-sm leading-relaxed">
                    Yes, I'm available for international assignments. Travel expenses, 
                    accommodation, and visa requirements are covered by the client. 
                    Extended international bookings require advance planning.
                  </p>
                </div>

                <div className="bg-brand-bg/50 p-6 rounded-lg">
                  <h3 className="font-medium text-brand-fg mb-2">
                    What about usage rights for commercial work?
                  </h3>
                  <p className="text-brand-muted text-sm leading-relaxed">
                    Commercial usage rights are negotiated based on the scope of usage, 
                    duration, and territory. Social media usage is included in all packages. 
                    Extended commercial rights require additional licensing fees.
                  </p>
                </div>

                <div className="bg-brand-bg/50 p-6 rounded-lg">
                  <h3 className="font-medium text-brand-fg mb-2">
                    How far in advance should I book?
                  </h3>
                  <p className="text-brand-muted text-sm leading-relaxed">
                    For best availability, book 1-2 weeks in advance. Rush bookings are 
                    possible with 48 hours notice (subject to availability) and may include 
                    a rush fee. Major campaigns and international work require longer lead times.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
