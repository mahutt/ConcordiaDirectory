import {
  UserIcon,
  SparklesIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid'

interface FeaturesProps {
  focusInput: () => void
}

const Features: React.FC<FeaturesProps> = ({ focusInput }) => {
  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
      <FeatureCard
        onClick={focusInput}
        icon={<UserIcon className="w-12 h-12 text-cyan-500" />}
        title="Comprehensive Directory"
        description="Access all faculty information in one place."
      />
      <FeatureCard
        onClick={focusInput}
        icon={<SparklesIcon className="w-12 h-12 text-purple-400" />}
        title="Advanced Search"
        description="Find people by name, department, and more."
      />
      <FeatureCard
        onClick={focusInput}
        icon={<ChevronRightIcon className="w-12 h-12 text-emerald-500" />}
        title="Connect Instantly"
        description="Search results include publicly available contact information."
      />
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
    className="bg-white/5 backdrop-blur-lg rounded-xl p-6 transition-all duration-300 hover:bg-white/10 hover:scale-105 cursor-pointer"
  >
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p>{description}</p>
  </div>
)

export default Features
