import type { Metadata } from 'next'
import LoginForm from '@/components/account/LoginForm'

export const metadata: Metadata = {
  title: 'Sign In | MedGuard',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ backgroundColor: '#F5F7FA' }}>
      <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-md">
        <h1 className="text-2xl font-extrabold mb-1" style={{ color: '#1B2B6B', fontFamily: 'var(--font-jakarta), sans-serif' }}>
          Sign In
        </h1>
        <p className="text-sm text-gray-500 mb-6">Welcome back to MedGuard</p>
        <LoginForm />
      </div>
    </div>
  )
}
