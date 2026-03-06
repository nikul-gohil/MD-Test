import { Truck, Lock, Headphones, PackageCheck } from 'lucide-react'

const items = [
  {
    icon: Truck,
    title: 'Free Delivery',
    subtitle: 'On orders over €75.00 or x4t',
  },
  {
    icon: Lock,
    title: 'Secure Payment',
    subtitle: '100% secure payment',
  },
  {
    icon: Headphones,
    title: 'Support',
    subtitle: '24/7 amazing services',
  },
  {
    icon: PackageCheck,
    title: 'Easy Returns',
    subtitle: 'Orders $50 or more',
  },
]

export default function TrustBar() {
  return (
    <section style={{ backgroundColor: '#0F1A45' }} className="py-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map(({ icon: Icon, title, subtitle }) => (
          <div key={title} className="flex items-center gap-4">
            <div
              style={{ backgroundColor: '#F15A24' }}
              className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
            >
              <Icon size={22} className="text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm" style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}>
                {title}
              </p>
              <p className="text-white/50 text-xs leading-tight">{subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
