import { useState, useRef, useEffect } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Features from './components/Features'
import { Card, Person } from './components/Card'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [people, setPeople] = useState<Person[]>([])

  const searchInputRef = useRef<HTMLInputElement>(null)
  const focusInput = () => searchInputRef.current?.focus()

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/?search=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => setPeople(data))
      .catch((error) => console.error(error))
  }, [searchQuery])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 to-red-700 text-white font-sans px-4 flex flex-col">
      <header className="container mx-auto pb-8 pt-32">
        <h1 className="tracking-tight text-5xl font-bold text-center mb-2 pb-2 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 bg-clip-text text-transparent">
          Concordia Directory
        </h1>
        <p className="text-xl text-center">Connecting Minds Across Campus</p>
      </header>

      <main className="container mx-auto mt-12 flex-1">
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
          {people.map((person) => (
            <Card key={person.id} {...person} />
          ))}
          {people.length == 0 && <Features focusInput={focusInput} />}
        </div>
      </main>
      <footer className="mt-auto text-center opacity-50 py-4">
        <p>Last updated: N/A</p>
      </footer>
    </div>
  )
}

export default App
