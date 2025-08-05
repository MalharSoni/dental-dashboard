import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          ✅ Dashboard is Working!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your Next.js dental dashboard is successfully deployed
        </p>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="font-semibold mb-2">Available Pages:</h2>
            <div className="space-y-1 text-sm">
              <div>• <Link href="/overview" className="text-blue-600 hover:underline">Overview Dashboard</Link></div>
              <div>• <Link href="/appointments" className="text-blue-600 hover:underline">Appointments</Link></div>
              <div>• <Link href="/call-logs" className="text-blue-600 hover:underline">Call Logs</Link></div>
              <div>• <Link href="/voicemails" className="text-blue-600 hover:underline">Voicemails</Link></div>
              <div>• <Link href="/ai-agents" className="text-blue-600 hover:underline">AI Agents</Link></div>
              <div>• <Link href="/login" className="text-blue-600 hover:underline">Login</Link></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
