import { NextResponse } from 'next/server'
import { generateAIInsights, type EventData } from '@/lib/openai'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { eventData } = body as { eventData: EventData }

    if (!eventData) {
      return NextResponse.json({ error: 'Event data required' }, { status: 400 })
    }

    const insights = await generateAIInsights(eventData)

    return NextResponse.json({ insights })
  } catch (error) {
    console.error('AI insights error:', error)
    return NextResponse.json(
      { error: 'Failed to generate insights' },
      { status: 500 }
    )
  }
}

