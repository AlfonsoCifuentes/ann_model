'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Notification Context
const NotificationContext = createContext()

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])

  const addNotification = (notification) => {
    const id = Date.now() + Math.random()
    const newNotification = {
      id,
      type: 'info',
      duration: 5000,
      position: 'top-right',
      ...notification
    }

    setNotifications(prev => [...prev, newNotification])

    // Auto remove after duration
    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, newNotification.duration)
    }

    return id
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      clearAllNotifications
    }}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}

// Notification Container
function NotificationContainer() {
  const { notifications } = useNotification()

  // Group notifications by position
  const notificationsByPosition = notifications.reduce((acc, notification) => {
    const position = notification.position || 'top-right'
    if (!acc[position]) acc[position] = []
    acc[position].push(notification)
    return acc
  }, {})

  const getPositionClasses = (position) => {
    const positions = {
      'top-left': 'top-4 left-4',
      'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
      'top-right': 'top-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
      'bottom-right': 'bottom-4 right-4',
      'center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
    }
    return positions[position] || positions['top-right']
  }

  return (
    <>
      {Object.entries(notificationsByPosition).map(([position, positionNotifications]) => (
        <div
          key={position}
          className={`fixed z-[9999] ${getPositionClasses(position)} max-w-sm w-full pointer-events-none`}
        >
          <div className="space-y-2 pointer-events-auto">
            <AnimatePresence>
              {positionNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  position={position}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </>
  )
}

// Individual Notification Item
function NotificationItem({ notification, position }) {
  const { removeNotification } = useNotification()
  const [progress, setProgress] = useState(100)

  // Progress bar animation
  useEffect(() => {
    if (notification.duration <= 0) return

    const interval = setInterval(() => {
      setProgress(prev => {
        const decrement = (100 / notification.duration) * 100
        return Math.max(0, prev - decrement)
      })
    }, 100)

    return () => clearInterval(interval)
  }, [notification.duration])

  const getIcon = (type) => {
    const icons = {
      success: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      error: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
      warning: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
      info: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
    return icons[type] || icons.info
  }

  const getColorClasses = (type) => {
    const colors = {
      success: 'bg-green-50 border-green-200 text-green-800',
      error: 'bg-red-50 border-red-200 text-red-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      info: 'bg-gray-50 border-gray-200 text-gray-800'
    }
    return colors[type] || colors.info
  }

  const getProgressColor = (type) => {
    const colors = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      warning: 'bg-yellow-500',
      info: 'bg-gray-500'
    }
    return colors[type] || colors.info
  }

  const getAnimationDirection = (position) => {
    if (position.includes('left')) return { x: -100 }
    if (position.includes('right')) return { x: 100 }
    if (position.includes('top')) return { y: -100 }
    if (position.includes('bottom')) return { y: 100 }
    return { scale: 0.9, opacity: 0 }
  }

  return (
    <motion.div
      initial={getAnimationDirection(position)}
      animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
      exit={getAnimationDirection(position)}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      layout
      className={`relative overflow-hidden rounded-lg border shadow-lg backdrop-blur-sm ${getColorClasses(notification.type)}`}
    >
      {/* Progress bar */}
      {notification.duration > 0 && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-black/10">
          <motion.div
            className={`h-full ${getProgressColor(notification.type)}`}
            initial={{ width: '100%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start space-x-3">
          {/* Icon */}
          <div className="flex-shrink-0 mt-0.5">
            {getIcon(notification.type)}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {notification.title && (
              <h4 className="font-inter font-medium text-sm mb-1">
                {notification.title}
              </h4>
            )}
            
            <p className="font-inter text-sm opacity-90">
              {notification.message}
            </p>

            {/* Actions */}
            {notification.actions && (
              <div className="mt-3 flex space-x-2">
                {notification.actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      action.onClick && action.onClick()
                      if (action.closeOnClick !== false) {
                        removeNotification(notification.id)
                      }
                    }}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                      action.variant === 'primary'
                        ? 'bg-current text-white hover:opacity-90'
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={() => removeNotification(notification.id)}
            className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// Toast shorthand functions
export function useToast() {
  const { addNotification } = useNotification()

  return {
    success: (message, options = {}) => addNotification({
      type: 'success',
      message,
      ...options
    }),
    
    error: (message, options = {}) => addNotification({
      type: 'error',
      message,
      duration: 0, // Don't auto-dismiss errors
      ...options
    }),
    
    warning: (message, options = {}) => addNotification({
      type: 'warning',
      message,
      ...options
    }),
    
    info: (message, options = {}) => addNotification({
      type: 'info',
      message,
      ...options
    }),

    custom: (options) => addNotification(options)
  }
}

// Floating Action Notification
export function FloatingActionNotification({ 
  message, 
  action, 
  onDismiss,
  className = "" 
}) {
  const [isVisible, setIsVisible] = useState(true)

  const handleDismiss = () => {
    setIsVisible(false)
    setTimeout(() => onDismiss && onDismiss(), 300)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
          className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 ${className}`}
        >
          <div className="bg-black text-white px-6 py-4 rounded-full shadow-2xl flex items-center space-x-4 backdrop-blur-sm">
            <span className="font-inter text-sm font-medium">
              {message}
            </span>
            
            {action && (
              <button
                onClick={action.onClick}
                className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-100 transition-colors font-inter text-sm font-medium"
              >
                {action.label}
              </button>
            )}
            
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Status Banner
export function StatusBanner({ type = 'info', message, actions, onDismiss }) {
  const [isVisible, setIsVisible] = useState(true)

  const getColorClasses = (type) => {
    const colors = {
      success: 'bg-green-600 text-white',
      error: 'bg-red-600 text-white',
      warning: 'bg-yellow-500 text-black',
      info: 'bg-gray-600 text-white'
    }
    return colors[type] || colors.info
  }

  const handleDismiss = () => {
    setIsVisible(false)
    setTimeout(() => onDismiss && onDismiss(), 300)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`w-full ${getColorClasses(type)} overflow-hidden`}
        >
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="font-inter text-sm font-medium">
                  {message}
                </span>
                
                {actions && (
                  <div className="flex space-x-2">
                    {actions.map((action, index) => (
                      <button
                        key={index}
                        onClick={action.onClick}
                        className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-xs font-medium transition-colors"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {onDismiss && (
                <button
                  onClick={handleDismiss}
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
