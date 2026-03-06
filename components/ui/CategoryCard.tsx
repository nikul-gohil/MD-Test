import { LucideIcon } from 'lucide-react'

interface CategoryCardProps {
  name: string
  count: number
  icon: LucideIcon
  color?: string
}

export default function CategoryCard({ name, count, icon: Icon, color = '#EBF3FF' }: CategoryCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 group cursor-pointer py-2">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-200"
        style={{ backgroundColor: color }}
      >
        <Icon size={32} style={{ color: '#1B2B6B' }} />
      </div>
      <p className="text-xs font-semibold text-center text-gray-800 leading-tight">
        {name}
      </p>
      <p className="text-xs text-gray-400">{count} Products</p>
    </div>
  )
}
