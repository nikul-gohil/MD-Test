'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { magentoFetch } from '@/lib/magentoFetch'
import { CREATE_CUSTOMER, GENERATE_TOKEN, GET_CUSTOMER } from '@/lib/queries/customer'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'
import { Eye, EyeOff } from 'lucide-react'

const schema = z.object({
  firstname: z.string().min(1, 'Required'),
  lastname: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Minimum 8 characters'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, { message: "Passwords don't match", path: ['confirmPassword'] })

type FormData = z.infer<typeof schema>

export default function RegisterForm() {
  const router = useRouter()
  const setToken = useAuthStore((s) => s.setToken)
  const setCustomer = useAuthStore((s) => s.setCustomer)
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    setLoading(true)
    try {
      await magentoFetch(CREATE_CUSTOMER, {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
      })
      const tokenRes = await magentoFetch<{ generateCustomerToken: { token: string } }>(
        GENERATE_TOKEN, { email: data.email, password: data.password }
      )
      const token = tokenRes?.generateCustomerToken?.token
      if (token) {
        setToken(token)
        const customerRes = await magentoFetch<{ customer: { firstname: string; lastname: string; email: string } }>(GET_CUSTOMER, {}, token)
        if (customerRes?.customer) setCustomer(customerRes.customer)
      }
      toast.success('Account created!')
      router.push('/account/dashboard')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const field = (name: keyof FormData, label: string, type = 'text') => (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1">{label}<span className="text-red-500 ml-0.5">*</span></label>
      <input
        {...register(name)}
        type={type}
        placeholder={label}
        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors"
      />
      {errors[name] && <p className="text-xs text-red-500 mt-1">{errors[name]?.message}</p>}
    </div>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {field('firstname', 'First Name')}
        {field('lastname', 'Last Name')}
      </div>
      {field('email', 'Email Address', 'email')}

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Password<span className="text-red-500 ml-0.5">*</span></label>
        <div className="relative">
          <input
            {...register('password')}
            type={showPw ? 'text' : 'password'}
            placeholder="Min. 8 characters"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 pr-10 text-sm outline-none focus:border-orange-400 transition-colors"
          />
          <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
      </div>

      {field('confirmPassword', 'Confirm Password', 'password')}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg text-white font-bold text-sm uppercase tracking-wide hover:opacity-90 transition-opacity disabled:opacity-60"
        style={{ backgroundColor: '#F15A24', fontFamily: 'var(--font-jakarta), sans-serif' }}
      >
        {loading ? 'Creating Account…' : 'Create Account'}
      </button>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link href="/account/login" className="text-orange-500 font-semibold hover:text-orange-600">
          Sign in
        </Link>
      </p>
    </form>
  )
}
