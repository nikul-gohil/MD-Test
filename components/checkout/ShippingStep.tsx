'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  firstname: z.string().min(1, 'Required'),
  lastname: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(7, 'Invalid phone'),
  company: z.string().optional(),
  street: z.string().min(3, 'Required'),
  city: z.string().min(2, 'Required'),
  region: z.string().optional(),
  postcode: z.string().min(3, 'Required'),
  country: z.string().min(2, 'Required'),
})

export type ShippingData = z.infer<typeof schema>

interface ShippingStepProps {
  onNext: (data: ShippingData) => void
  defaultValues?: Partial<ShippingData>
}

export default function ShippingStep({ onNext, defaultValues }: ShippingStepProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ShippingData>({
    resolver: zodResolver(schema),
    defaultValues: { country: 'IE', ...defaultValues },
  })

  const field = (name: keyof ShippingData, label: string, required = true, placeholder = '') => (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        {...register(name)}
        placeholder={placeholder || label}
        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors"
      />
      {errors[name] && <p className="text-xs text-red-500 mt-1">{errors[name]?.message}</p>}
    </div>
  )

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-4">
      <h2 className="text-lg font-bold mb-4" style={{ color: '#1B2B6B', fontFamily: 'var(--font-jakarta), sans-serif' }}>
        Shipping Information
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {field('firstname', 'First Name')}
        {field('lastname', 'Last Name')}
      </div>
      {field('email', 'Email Address')}
      {field('phone', 'Phone Number')}
      {field('company', 'Company / Practice', false)}
      {field('street', 'Street Address')}
      <div className="grid grid-cols-2 gap-4">
        {field('city', 'City')}
        {field('postcode', 'Postcode / Eircode')}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {field('region', 'County / Region', false)}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Country<span className="text-red-500 ml-0.5">*</span></label>
          <select
            {...register('country')}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400 bg-white"
          >
            <option value="IE">Ireland</option>
            <option value="GB">United Kingdom</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
            <option value="NL">Netherlands</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-lg text-white font-bold text-sm uppercase tracking-wide hover:opacity-90 transition-opacity mt-2"
        style={{ backgroundColor: '#F15A24', fontFamily: 'var(--font-jakarta), sans-serif' }}
      >
        Continue to Payment →
      </button>
    </form>
  )
}
