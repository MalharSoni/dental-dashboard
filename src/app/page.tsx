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
              <div>• <a href="/overview" className="text-blue-600 hover:underline">Overview Dashboard</a></div>
              <div>• <a href="/appointments" className="text-blue-600 hover:underline">Appointments</a></div>
              <div>• <a href="/call-logs" className="text-blue-600 hover:underline">Call Logs</a></div>
              <div>• <a href="/voicemails" className="text-blue-600 hover:underline">Voicemails</a></div>
              <div>• <a href="/ai-agents" className="text-blue-600 hover:underline">AI Agents</a></div>
              <div>• <a href="/login" className="text-blue-600 hover:underline">Login</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
