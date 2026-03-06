const brands = [
  'DrugStore',
  'Medical Solutions',
  'National Hospital',
  'HealthCare Group',
  'GoodHealth',
  'Central Hospital',
]

export default function TrustedBrands() {
  return (
    <section className="bg-white py-10 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-7">
          Trusted by Leading Enterprises
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4">
          {brands.map((brand) => (
            <div
              key={brand}
              className="flex items-center justify-center px-6 py-3 border border-gray-200 rounded-lg grayscale hover:grayscale-0 hover:border-navy transition-all duration-200 cursor-pointer"
              style={{ minWidth: '130px' }}
            >
              <span
                className="font-bold text-sm tracking-wide text-gray-500"
                style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
              >
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
