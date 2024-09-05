import React from 'react'
import {
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/solid'

export interface Person {
  id: number
  name: string
  title: string
  department: string
  email: string | null
  phone: string | null
  location: string | null
}
export const Card: React.FC<Person> = ({
  name,
  title,
  department,
  email,
  phone,
  location,
}) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 mt-6 flex flex-row flex-wrap justify-between gap-3">
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold">{name}</h2>
        <div className="flex flex-col text-slate-300 leading-snug">
          <div>{title}</div>
          <div>{department}</div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div>
          <EnvelopeIcon className="size-6 inline-block mr-2 text-cyan-500" />
          {email ? email : <span className="opacity-50">unavailable</span>}
        </div>
        <div>
          <PhoneIcon className="size-6 inline-block mr-2 text-purple-400" />
          {phone ? phone : <span className="opacity-50">unavailable</span>}
        </div>
        <div>
          <BuildingOfficeIcon className="size-6 inline-block mr-2 text-emerald-500" />
          {location ? (
            location
          ) : (
            <span className="opacity-50">unavailable</span>
          )}
        </div>
      </div>
    </div>
  )
}
