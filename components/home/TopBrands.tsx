const brands = [
  { name: 'NONIN', color: '#003087' },
  { name: 'Riester', color: '#CC0000' },
  { name: 'Nasco Healthcare', color: '#005B8E' },
  { name: 'ROMED', color: '#1B2B6B' },
  { name: 'OMRON', color: '#003399' },
  { name: 'Welch Allyn', color: '#003366' },
  { name: '3M', color: '#CC0000' },
  { name: 'Beurer', color: '#1B6E3B' },
  { name: 'Thera-Band', color: '#8B0000' },
  { name: 'Medline', color: '#0055A5' },
]

export default function TopBrands() {
  return (
    <section className="py-12" style={{ backgroundColor: '#F5F7FA' }}>
      <div className="max-w-7xl mx-auto px-4">
        <h2
          className="text-2xl font-extrabold text-center mb-8"
          style={{ color: '#1B2B6B', fontFamily: 'var(--font-jakarta), sans-serif' }}
        >
          Top Brands
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {brands.map(({ name, color }) => (
            <div
              key={name}
              className="flex items-center justify-center px-4 py-5 bg-white border border-gray-200 rounded-lg cursor-pointer grayscale hover:grayscale-0 hover:scale-105 hover:shadow-md hover:border-navy transition-all duration-200"
            >
              <span
                className="font-extrabold text-sm tracking-wide text-center"
                style={{ color, fontFamily: 'var(--font-jakarta), sans-serif' }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
