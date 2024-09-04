import { useState, useRef } from 'react'
import {
  MagnifyingGlassIcon,
  UserIcon,
  SparklesIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const focusInput = () => searchInputRef.current?.focus()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-600 to-red-700 text-white font-sans">
      <header className="container mx-auto pb-8 pt-32">
        <h1 className="text-6xl font-bold text-center mb-2 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 bg-clip-text text-transparent">
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

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              onClick={focusInput}
              icon={<UserIcon className="w-12 h-12 text-cyan-500" />}
              title="Comprehensive Directory"
              description="Access profiles of students, faculty, and staff in one place."
            />
            <FeatureCard
              onClick={focusInput}
              icon={<SparklesIcon className="w-12 h-12 text-purple-400" />}
              title="Advanced Search"
              description="Find people by name, department, interests, or expertise."
            />
            <FeatureCard
              onClick={focusInput}
              icon={<ChevronRightIcon className="w-12 h-12 text-emerald-500" />}
              title="Connect Instantly"
              description="Search results include publicly available contact information."
            />
          </div>
        </div>
      </main>
    </div>
  )
}

interface FeatureCardProps {
  onClick?: () => void
  icon: React.ReactNode
  title: string
  description: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  onClick,
  icon,
  title,
  description,
}) => (
  <div
    onClick={onClick}
    className="bg-white/5 backdrop-blur-lg rounded-xl p-6 transition-all duration-300 hover:bg-white/10 hover:scale-105"
  >
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p>{description}</p>
  </div>
)

export default App
