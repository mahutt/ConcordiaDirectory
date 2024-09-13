import { forwardRef, useImperativeHandle, useState, useEffect } from 'react'

interface ToastProps {
  duration?: number
}

export interface ToastRef {
  display: (text: string) => void
}

const Toast = forwardRef<ToastRef, ToastProps>(({ duration = 3000 }, ref) => {
  const [message, setMessage] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  useImperativeHandle(ref, () => ({
    display: (text: string) => {
      setMessage(text)
      setIsVisible(true)
      setTimeout(() => {
        setIsVisible(false)
      }, duration)
    },
  }))

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true)
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  if (!shouldRender) return null

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="bg-slate-900 text-white px-4 py-2 rounded-xl shadow-lg">
        {message}
      </div>
    </div>
  )
})

export default Toast
