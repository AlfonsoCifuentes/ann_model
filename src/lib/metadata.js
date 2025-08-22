// Metadata configuration for better SEO
export const siteMetadata = {
  title: 'Ana Nicoleta - Professional Model & Actress',
  description: 'Professional portfolio of Ana Nicoleta - International model and actress specializing in editorial, runway, commercial, and acting work.',
  keywords: [
    'Ana Nicoleta',
    'professional model',
    'actress',
    'fashion model',
    'editorial model',
    'runway model',
    'commercial model',
    'portfolio',
    'modeling',
    'acting',
    'fashion photography',
    'editorial photography',
    'beauty photography',
    'commercial photography'
  ],
  author: 'Ana Nicoleta',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://ana-nicoleta.com',
  image: '/photos/SVM05631.jpg',
  twitterHandle: '@ana_nicoleta',
  social: {
    instagram: 'https://instagram.com/ann__siedad.7',
    linkedin: 'https://linkedin.com/in/ana-nicoleta'
  }
}

// Generate structured data for better SEO
export const generatePersonStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Ana Nicoleta",
  "jobTitle": ["Professional Model", "Actress"],
  "description": "International professional model and actress specializing in editorial, runway, commercial, and acting work.",
  "image": `${siteMetadata.siteUrl}/photos/SVM05631.jpg`,
  "url": siteMetadata.siteUrl,
  "sameAs": [
    siteMetadata.social.instagram,
    siteMetadata.social.linkedin
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Freelance"
  },
  "knowsAbout": [
    "Fashion Modeling",
    "Editorial Photography",
    "Runway Modeling",
    "Commercial Photography",
    "Acting",
    "Portrait Photography"
  ]
})

// Page-specific metadata generators
export const generatePageMetadata = (page, customData = {}) => {
  const baseMetadata = {
    title: `${customData.title || page} | ${siteMetadata.title}`,
    description: customData.description || siteMetadata.description,
    keywords: [...siteMetadata.keywords, ...(customData.keywords || [])],
    openGraph: {
      title: customData.title || `${page} - ${siteMetadata.title}`,
      description: customData.description || siteMetadata.description,
      type: 'website',
      url: `${siteMetadata.siteUrl}/${page.toLowerCase()}`,
      image: customData.image || siteMetadata.image,
      locale: 'es_ES',
      alternateLocale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: customData.title || `${page} - ${siteMetadata.title}`,
      description: customData.description || siteMetadata.description,
      image: customData.image || siteMetadata.image,
      creator: siteMetadata.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${siteMetadata.siteUrl}/${page.toLowerCase()}`,
      languages: {
        'es-ES': `${siteMetadata.siteUrl}/es/${page.toLowerCase()}`,
        'en-US': `${siteMetadata.siteUrl}/en/${page.toLowerCase()}`,
      },
    },
  }

  return baseMetadata
}

export default siteMetadata
