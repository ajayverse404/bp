import { Button } from '@/components/Button'
import { Container } from '@/components/Container'

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      <Container className="relative z-10 text-center text-slate-900">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 mb-8">
          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium text-blue-800">Robotics Training Center</span>
        </div>

        {/* Main headline */}
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-tight sm:text-7xl mb-6">
          Build the Future with{' '}
          <span className="text-yellow-500">Try Catch</span>{' '}
          <span className="text-blue-600">Robotics</span>
        </h1>

        {/* Description */}
        <p className="mx-auto max-w-2xl text-lg tracking-tight text-slate-600 mb-10">
          Empowering middle school students with hands-on robotics education. Learn programming, engineering, and problem-solving through exciting robot challenges.
        </p>

        {/* Call to action buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <Button 
            href="/register" 
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Start Your Journey →
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center bg-blue-100 rounded-lg p-6">
            <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">5+</div>
            <div className="text-sm text-blue-800">Students Trained</div>
          </div>
          <div className="text-center bg-blue-100 rounded-lg p-6">
            <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">3+</div>
            <div className="text-sm text-blue-800">Robot Types</div>
          </div>
          <div className="text-center bg-blue-100 rounded-lg p-6">
            <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">98%</div>
            <div className="text-sm text-blue-800">Success Rate</div>
          </div>
          <div className="text-center bg-blue-100 rounded-lg p-6">
            <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">5★</div>
            <div className="text-sm text-blue-800">Parent Rating</div>
          </div>
        </div>
      </Container>
    </div>
  )
}
