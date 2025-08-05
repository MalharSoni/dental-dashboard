import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto p-8">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-professional">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-2xl">✓</span>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🎨 <span className="text-gradient">Premium</span> Dashboard Ready!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your competitive dental practice management system with modern design is live
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Link href="/dashboard" className="card-modern p-6 hover:shadow-professional-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">📊</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600">Dashboard Overview</h3>
              <p className="text-sm text-gray-600">Premium analytics and insights</p>
            </Link>
            
            <Link href="/dashboard/appointments" className="card-modern p-6 hover:shadow-professional-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">📅</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-green-600">Appointments</h3>
              <p className="text-sm text-gray-600">Advanced scheduling system</p>
            </Link>
            
            <Link href="/dashboard/call-logs" className="card-modern p-6 hover:shadow-professional-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">📞</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-purple-600">Call Logs</h3>
              <p className="text-sm text-gray-600">Professional call tracking</p>
            </Link>
            
            <Link href="/dashboard/voicemails" className="card-modern p-6 hover:shadow-professional-lg transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold">🎵</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-yellow-600">Voicemails</h3>
              <p className="text-sm text-gray-600">AI-powered transcription</p>
            </Link>
          </div>
          
          <Link 
            href="/dashboard" 
            className="btn-primary px-8 py-4 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
          >
            Launch Premium Dashboard →
          </Link>
        </div>
      </div>
    </div>
  )
}
