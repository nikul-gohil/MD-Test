import { Check } from 'lucide-react'

interface StepIndicatorProps {
  currentStep: number
}

const STEPS = ['Shipping', 'Payment', 'Review']

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center mb-8">
      {STEPS.map((step, i) => {
        const stepNum = i + 1
        const isDone = stepNum < currentStep
        const isActive = stepNum === currentStep

        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors"
                style={{
                  backgroundColor: isDone ? '#22C55E' : isActive ? '#F15A24' : '#E5E7EB',
                  color: isDone || isActive ? '#fff' : '#9CA3AF',
                }}
              >
                {isDone ? <Check size={16} strokeWidth={3} /> : stepNum}
              </div>
              <span
                className="text-xs font-medium whitespace-nowrap"
                style={{ color: isActive ? '#F15A24' : isDone ? '#22C55E' : '#9CA3AF' }}
              >
                {step}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className="h-0.5 w-16 sm:w-24 mx-2 mb-4 transition-colors"
                style={{ backgroundColor: isDone ? '#22C55E' : '#E5E7EB' }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
