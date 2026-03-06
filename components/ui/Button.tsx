import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'cart'
  size?: 'sm' | 'md' | 'lg'
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-semibold transition-all duration-150 rounded cursor-pointer'

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3 text-base',
  }

  const variants = {
    primary: 'text-white hover:opacity-90',
    outline: 'border-2 border-white text-white hover:bg-white hover:text-navy',
    ghost: 'bg-gray-100 text-navy hover:bg-orange-500 hover:text-white',
    cart: 'w-full bg-gray-100 text-navy text-sm font-semibold hover:bg-orange-500 hover:text-white',
  }

  const variantStyle =
    variant === 'primary'
      ? { backgroundColor: '#F15A24', ...props.style }
      : {}

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      style={variantStyle}
      {...props}
    >
      {children}
    </button>
  )
}
