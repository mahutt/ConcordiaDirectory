import React from 'react'
import { ToastRef } from './Toast'
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

export interface CardProps {
  person: Person
  toastRef: React.RefObject<ToastRef>
}

export const Card: React.FC<CardProps> = ({
  person: { name, title, department, email, phone, location },
  toastRef,
}) => {
  const copy = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const value = e.currentTarget.innerText
    if (!value) return
    navigator.clipboard.writeText(value)
    toastRef.current?.display('Copied to clipboard')
  }
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
        <div onClick={copy} className="cursor-pointer">
          <EnvelopeIcon className="size-6 inline-block mr-2 text-cyan-500" />
          {email ? email : <span className="opacity-50">unavailable</span>}
        </div>
        <div onClick={copy} className="cursor-pointer">
          <PhoneIcon className="size-6 inline-block mr-2 text-purple-400" />
          {phone ? phone : <span className="opacity-50">unavailable</span>}
        </div>
        <div onClick={copy} className="cursor-pointer">
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
