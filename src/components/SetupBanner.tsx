'use client'

import { useState } from 'react'
import { AlertCircle, X } from 'lucide-react'
import { isSupabaseConfigured } from '@/lib/supabase'

export default function SetupBanner() {
  const [dismissed, setDismissed] = useState(false)
  const configured = isSupabaseConfigured()

  if (configured || dismissed) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-white px-4 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">
            🚀 <strong>Demo Mode:</strong> Supabase not configured. Create <code className="bg-amber-600 px-1 py-0.5 rounded">.env.local</code> with your keys. See <code className="bg-amber-600 px-1 py-0.5 rounded">SETUP_GUIDE.md</code>
          </p>
        </div>
        <button 
          onClick={() => setDismissed(true)}
          className="text-white hover:text-amber-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

