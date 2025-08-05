import Link from 'next/link'

export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          🎉 SUCCESS!
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          Your dental dashboard is deployed and working!
        </p>
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <h2 className="font-semibold text-gray-800 mb-2">What&apos;s Working:</h2>
          <div className="text-sm text-gray-600 space-y-1">
            <div>✅ Next.js deployment</div>
            <div>✅ Environment variables</div>
            <div>✅ Routing system</div>
            <div>✅ Build process</div>
          </div>
        </div>
        <div className="space-y-2">
          <Link href="/" className="block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            ← Back to Home
          </Link>
          <Link href="/overview" className="block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Go to Dashboard →
          </Link>
        </div>
      </div>
    </div>
  )
}