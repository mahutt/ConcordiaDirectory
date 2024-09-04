import { useState, useRef } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Features from './components/Features'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const focusInput = () => searchInputRef.current?.focus()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 to-red-700 text-white font-sans">
      <header className="container mx-auto pb-8 pt-32">
        <h1 className="tracking-tight text-6xl font-bold text-center mb-2 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 bg-clip-text text-transparent">
          Concordia Directory
        </h1>
        <p className="text-xl text-center">Connecting Minds Across Campus</p>
      </header>

      <main className="container mx-auto mt-12">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search for people..."
              className="w-full py-4 px-6 rounded-full bg-white/10 backdrop-blur-md text-white placeholder-slate-200 focus:outline-none focus:ring-2 focus:ring-red-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <MagnifyingGlassIcon className="absolute size-6 right-4 top-1/2 transform -translate-y-1/2" />
          </div>
          <Features focusInput={focusInput} />
        </div>
      </main>
    </div>
  )
}

export default App
