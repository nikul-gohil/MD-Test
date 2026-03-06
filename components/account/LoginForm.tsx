'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { magentoFetch } from '@/lib/magentoFetch'
import { GENERATE_TOKEN, GET_CUSTOMER } from '@/lib/queries/customer'
import { useAuthStore } from '@/store/authStore'
import toast from 'react-hot-toast'
import { Eye, EyeOff } from 'lucide-react'

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Required'),
})
type FormData = z.infer<typeof schema>

export default function LoginForm() {
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
      const tokenRes = await magentoFetch<{ generateCustomerToken: { token: string } }>(
        GENERATE_TOKEN,
        { email: data.email, password: data.password }
      )
      const token = tokenRes?.generateCustomerToken?.token
      if (!token) throw new Error('Invalid credentials')
      setToken(token)

      const customerRes = await magentoFetch<{ customer: { firstname: string; lastname: string; email: string } }>(
        GET_CUSTOMER, {}, token
      )
      if (customerRes?.customer) setCustomer(customerRes.customer)

      toast.success('Welcome back!')
      router.push('/account/dashboard')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address<span className="text-red-500 ml-0.5">*</span></label>
        <input
          {...register('email')}
          type="email"
          placeholder="you@example.com"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-orange-400 transition-colors"
        />
        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Password<span className="text-red-500 ml-0.5">*</span></label>
        <div className="relative">
          <input
            {...register('password')}
            type={showPw ? 'text' : 'password'}
            placeholder="••••••••"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 pr-10 text-sm outline-none focus:border-orange-400 transition-colors"
          />
          <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg text-white font-bold text-sm uppercase tracking-wide hover:opacity-90 transition-opacity disabled:opacity-60"
        style={{ backgroundColor: '#F15A24', fontFamily: 'var(--font-jakarta), sans-serif' }}
      >
        {loading ? 'Signing in…' : 'Sign In'}
      </button>

      <p className="text-center text-sm text-gray-500">
        Don&apos;t have an account?{' '}
        <Link href="/account/register" className="text-orange-500 font-semibold hover:text-orange-600">
          Create one
        </Link>
      </p>
    </form>
  )
}
