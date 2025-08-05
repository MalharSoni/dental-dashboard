export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          ✅ Deployment Working!
        </h1>
        <p className="text-lg text-gray-600">
          Your Next.js app is successfully deployed on Vercel
        </p>
        <div className="mt-8 space-y-2">
          <a href="/overview" className="block text-blue-600 hover:underline">
            → Go to Dashboard Overview
          </a>
          <a href="/login" className="block text-blue-600 hover:underline">
            → Go to Login Page
          </a>
        </div>
      </div>
    </div>
  )
}