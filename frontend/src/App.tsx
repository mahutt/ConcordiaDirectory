import { useState, useRef, useEffect } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Toast, { ToastRef } from './components/Toast'
import Features from './components/Features'
import { Card, Person } from './components/Card'
import useQueryParam from './hooks/useQueryParam'

function App() {
  const [searchQuery, setSearchQuery] = useQueryParam('query', '')
  const [offset, setOffset] = useState(0)
  const [people, setPeople] = useState<Person[]>([])

  const [headerHeight, setHeaderHeight] = useState('auto')
  const [focused, setFocused] = useState(false)
  const [queryExhausted, setQueryExhausted] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const headerContentRef = useRef<HTMLInputElement>(null)
  const focusInput = () => searchInputRef.current?.focus()

  const mainRef = useRef<HTMLDivElement>(null)
  const toastRef = useRef<ToastRef>(null)

  useEffect(() => {
    if (searchQuery.length === 0) {
      setPeople([])
      return
    }
    setQueryExhausted(false)
    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/search?query=${searchQuery}&limit=10&offset=0`
    )
      .then((response) => response.json())
      .then((data) => setPeople(data))
      .then(() => setOffset(10))
      .catch((error) => console.error(error))
  }, [searchQuery])

  const fetchMore = () => {
    if (offset < 1 || queryExhausted) return
    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/search?query=${searchQuery}&limit=10&offset=${offset}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          setQueryExhausted(true)
          return
        }
        setOffset((prev) => prev + 10)
        setPeople((prev) => [...prev, ...data])
      })
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    const handleScroll = () => {
      if (mainRef.current) {
        const rect = mainRef.current.getBoundingClientRect()
        const windowHeight =
          window.innerHeight || document.documentElement.clientHeight
        const isNearBottom = rect.bottom - windowHeight < 100
        if (isNearBottom) {
          window.removeEventListener('scroll', handleScroll)
          fetchMore()
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [people, searchQuery])

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerContentRef.current) {
        const height = headerContentRef.current.offsetHeight
        setHeaderHeight(`${height}px`)
      }
    }

    updateHeaderHeight()
    window.addEventListener('resize', updateHeaderHeight)

    return () => window.removeEventListener('resize', updateHeaderHeight)
  }, [])

  return (
    <div className="text-white font-sans flex flex-col">
      <Toast ref={toastRef} />
      <header
        className="bg-gradient-to-b from-orange-600 to-red-700"
        style={{
          height: searchQuery !== '' ? '0' : headerHeight,
          overflow: 'hidden',
          transition: 'height 0.3s ease-in-out',
        }}
      >
        <div ref={headerContentRef} className="container mx-auto pb-8 pt-32">
          <h1 className="tracking-tight text-5xl font-bold text-center mb-2 pb-2 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 bg-clip-text text-transparent">
            Concordia Directory
          </h1>
          <p className="text-xl text-center">Faculty Search Engine</p>
        </div>
      </header>
      <main className="flex-1 bg-red-700" ref={mainRef}>
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="sticky top-0 z-40 py-5 relative px-2">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search for people..."
                className="w-full py-4 px-6 rounded-full bg-white/10 backdrop-blur-md text-white placeholder-slate-200 focus:outline-none focus:ring-2 focus:ring-red-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
              />
              <MagnifyingGlassIcon className="absolute size-6 right-6 top-1/2 transform -translate-y-1/2" />
            </div>
            {people.map((person) => (
              <Card key={person.id} person={person} toastRef={toastRef} />
            ))}
            {people.length == 0 && searchQuery === '' && (
              <div
                className={`transition-all duration-300 ease-in-out ${
                  focused
                    ? 'opacity-0 invisible pointer-events-none'
                    : 'opacity-100 visible pointer-events-auto'
                }`}
              >
                <Features focusInput={focusInput} />
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="mt-auto text-center py-4 bg-red-700">
        <p className="opacity-50">Last updated: N/A</p>
      </footer>
    </div>
  )
}

export default App
