import type { Metadata } from 'next'
import RegisterForm from '@/components/account/RegisterForm'

export const metadata: Metadata = {
  title: 'Create Account | MedGuard',
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ backgroundColor: '#F5F7FA' }}>
      <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-md">
        <h1 className="text-2xl font-extrabold mb-1" style={{ color: '#1B2B6B', fontFamily: 'var(--font-jakarta), sans-serif' }}>
          Create Account
        </h1>
        <p className="text-sm text-gray-500 mb-6">Join MedGuard for faster checkout and order tracking.</p>
        <RegisterForm />
      </div>
    </div>
  )
}
