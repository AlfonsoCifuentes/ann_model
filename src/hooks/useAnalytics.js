'use client'

import { useEffect, useRef } from 'react'

// Hook para tracking de eventos
export const useAnalytics = () => {
  // Track page views
  const trackPageView = (page) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_title: page,
        page_location: window.location.href,
      })
    }
  }

  // Track custom events
  const trackEvent = (eventName, parameters = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        event_category: parameters.category || 'engagement',
        event_label: parameters.label,
        value: parameters.value,
        ...parameters
      })
    }
  }

  // Track scroll depth
  const trackScrollDepth = (depth) => {
    trackEvent('scroll_depth', {
      category: 'engagement',
      label: `${depth}%`,
      value: depth
    })
  }

  // Track time on page
  const trackTimeOnPage = (timeInSeconds) => {
    trackEvent('time_on_page', {
      category: 'engagement',
      value: Math.round(timeInSeconds)
    })
  }

  return {
    trackPageView,
    trackEvent,
    trackScrollDepth,
    trackTimeOnPage
  }
}

// Hook para tracking de scroll depth
export const useScrollTracking = () => {
  const { trackScrollDepth } = useAnalytics()
  const trackedDepths = useRef(new Set())

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const scrollPercent = Math.round((scrolled / scrollHeight) * 100)

      // Track at 25%, 50%, 75%, 90% intervals
      const milestones = [25, 50, 75, 90]
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !trackedDepths.current.has(milestone)) {
          trackedDepths.current.add(milestone)
          trackScrollDepth(milestone)
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [trackScrollDepth])
}

// Hook para tracking de tiempo en página
export const useTimeTracking = () => {
  const { trackTimeOnPage } = useAnalytics()
  const startTime = useRef(Date.now())

  useEffect(() => {
    const handleBeforeUnload = () => {
      const timeSpent = (Date.now() - startTime.current) / 1000
      trackTimeOnPage(timeSpent)
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [trackTimeOnPage])
}

// Hook para tracking de interactions
export const useInteractionTracking = () => {
  const { trackEvent } = useAnalytics()

  const trackClick = (element, label) => {
    trackEvent('click', {
      category: 'interaction',
      label: `${element} - ${label}`
    })
  }

  const trackImageView = (imageSrc, context) => {
    trackEvent('image_view', {
      category: 'content',
      label: imageSrc,
      context
    })
  }

  const trackContactAttempt = (method) => {
    trackEvent('contact_attempt', {
      category: 'conversion',
      label: method
    })
  }

  const trackPortfolioInteraction = (action, category) => {
    trackEvent('portfolio_interaction', {
      category: 'portfolio',
      label: `${action} - ${category}`
    })
  }

  return {
    trackClick,
    trackImageView,
    trackContactAttempt,
    trackPortfolioInteraction
  }
}

// Componente para inicializar tracking
export const AnalyticsProvider = ({ children }) => {
  useScrollTracking()
  useTimeTracking()

  return children
}

// Componente de Google Analytics
export const GoogleAnalytics = () => {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID

  if (!GA_ID) return null

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `,
        }}
      />
    </>
  )
}

// Utilidades para performance monitoring
export const usePerformanceMonitoring = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Track page load time
      window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart
        
        if (window.gtag) {
          window.gtag('event', 'page_load_time', {
            event_category: 'performance',
            value: Math.round(loadTime)
          })
        }
      })

      // Track Core Web Vitals
      if ('web-vital' in window) {
        import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
          getCLS(metric => reportWebVital(metric))
          getFID(metric => reportWebVital(metric))
          getFCP(metric => reportWebVital(metric))
          getLCP(metric => reportWebVital(metric))
          getTTFB(metric => reportWebVital(metric))
        })
      }
    }
  }, [])

  const reportWebVital = (metric) => {
    if (window.gtag) {
      window.gtag('event', metric.name, {
        event_category: 'web_vitals',
        value: Math.round(metric.value),
        metric_id: metric.id,
        metric_delta: metric.delta,
      })
    }
  }
}

export default {
  useAnalytics,
  useScrollTracking,
  useTimeTracking,
  useInteractionTracking,
  usePerformanceMonitoring,
  AnalyticsProvider,
  GoogleAnalytics
}
