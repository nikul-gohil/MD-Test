import Link from 'next/link'
import {
  Truck,
  Lock,
  Headphones,
  PackageCheck,
  Facebook,
  Youtube,
  Linkedin,
  Instagram,
  MapPin,
  Phone,
  Mail,
  Clock,
} from 'lucide-react'

const quickLinks1 = [
  'Consumables',
  'Diagnostics',
  'Equipment & Furniture',
  'First Aid',
  'Hygiene',
  'Minor Surgery',
  'Physiotherapy',
  'Simulation',
]

const quickLinks2 = [
  'Terms & Conditions',
  'Privacy Policy',
  'Disclaimer',
  'Returns & Refunds',
  'Delivery Information',
  'WEEE Recycling',
]

const trustItems = [
  { icon: Truck, title: 'Free Delivery', subtitle: 'On orders over €75.00' },
  { icon: Lock, title: 'Secure Payment', subtitle: '100% secure payment' },
  { icon: Headphones, title: 'Support', subtitle: '24/7 amazing services' },
  { icon: PackageCheck, title: 'Easy Returns', subtitle: 'Orders €50 or more' },
]

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0F1A45' }} className="text-white">
      {/* Trust Icons Row */}
      <div className="border-b border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustItems.map(({ icon: Icon, title, subtitle }) => (
            <div key={title} className="flex items-center gap-3">
              <div
                style={{ backgroundColor: '#F15A24' }}
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              >
                <Icon size={16} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm">{title}</p>
                <p className="text-xs text-white/60">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: About */}
          <div>
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4">
              <div className="grid grid-cols-3 gap-0.5">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full"
                    style={{
                      backgroundColor: i === 4 ? '#E53935' : '#ffffff',
                      width: '5px',
                      height: '5px',
                    }}
                  />
                ))}
              </div>
              <span className="font-extrabold text-lg tracking-widest text-white">MEDGUARD</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              Ireland's leading supplier of professional medical and healthcare supplies. Serving hospitals, clinics, and care homes for over 15 years.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mb-5">
              {[Facebook, Youtube, Linkedin, Instagram].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 transition-colors"
                >
                  <Icon size={14} />
                </Link>
              ))}
            </div>
            {/* Certifications */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-white/50">
              <span className="border border-white/20 px-2 py-1 rounded">VAT: IE1234567X</span>
              <span className="border border-white/20 px-2 py-1 rounded">CRO: 123456</span>
              <span className="border border-white/20 px-2 py-1 rounded text-green-400">ISO 9001</span>
              <span className="border border-white/20 px-2 py-1 rounded text-green-400">ISO 13485</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3
              className="font-bold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-white/10"
              style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks1.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-sm text-white/60 hover:text-orange-400 transition-colors flex items-center gap-1.5"
                  >
                    <span style={{ color: '#F15A24' }}>›</span> {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: More Links */}
          <div>
            <h3
              className="font-bold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-white/10"
              style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
            >
              Information
            </h3>
            <ul className="space-y-2.5">
              {quickLinks2.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-sm text-white/60 hover:text-orange-400 transition-colors flex items-center gap-1.5"
                  >
                    <span style={{ color: '#F15A24' }}>›</span> {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h3
              className="font-bold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-white/10"
              style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
            >
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-2.5 text-sm text-white/60">
                <MapPin size={16} className="shrink-0 mt-0.5" style={{ color: '#F15A24' }} />
                <span>Unit 6/7, Block 4, Ashbourne Business Park, Ashbourne, Co. Meath, Ireland, A84 PD74</span>
              </li>
              <li className="flex gap-2.5 text-sm text-white/60">
                <Phone size={16} className="shrink-0" style={{ color: '#F15A24' }} />
                <div>
                  <p>01 835 2111</p>
                  <p>01 835 2112</p>
                </div>
              </li>
              <li className="flex gap-2.5 text-sm text-white/60">
                <Mail size={16} className="shrink-0" style={{ color: '#F15A24' }} />
                <a href="mailto:info@medguard.ie" className="hover:text-orange-400 transition-colors">
                  info@medguard.ie
                </a>
              </li>
              <li className="flex gap-2.5 text-sm text-white/60">
                <Clock size={16} className="shrink-0 mt-0.5" style={{ color: '#F15A24' }} />
                <div>
                  <p>Mon–Thu: 8am–5:30pm</p>
                  <p>Fri: 8am–3:30pm</p>
                  <p>Sat–Sun: Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Certifications */}
          <div className="flex items-center gap-2">
            {['ISO 9001', 'ISO 13485', 'CE Mark'].map((cert) => (
              <span
                key={cert}
                className="text-xs border border-white/20 px-2.5 py-1 rounded text-white/50"
              >
                {cert}
              </span>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-xs text-white/40 text-center">
            © {new Date().getFullYear()} MedGuard Professional Healthcare Supplies. All rights reserved.
          </p>

          {/* Payment logos */}
          <div className="flex items-center gap-2">
            {['VISA', 'MC', 'MAESTRO', 'PLUS'].map((card) => (
              <span
                key={card}
                className="text-xs font-bold bg-white/10 border border-white/20 px-2 py-1 rounded text-white/70"
              >
                {card}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
