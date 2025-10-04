import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
})

export async function POST(request: Request) {
  try {
    const { answers } = await request.json()

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ 
        error: 'OpenAI API key not configured',
        blueprint: null
      }, { status: 200 })
    }

    const prompt = `You are an expert event planner. Create a detailed event blueprint based on these details:

Event Name: ${answers.eventName}
Event Type: ${answers.eventType}
Expected Attendees: ${answers.attendees}
Budget: $${answers.budget}
Duration: ${answers.duration}
Goals: ${answers.goals}

Generate a comprehensive event blueprint with the following sections:
1. Timeline with 5 phases (pre-planning, planning, execution, event day, post-event) - each with specific tasks
2. Budget breakdown across 6 categories with percentages
3. 4 vendor recommendations with specific company suggestions and estimated costs
4. Venue requirements (layout, capacity, features)
5. 8 marketing strategies
6. 5 potential risks with mitigation strategies

Format the response as a JSON object with this exact structure:
{
  "eventName": "event name",
  "eventType": "type",
  "timeline": [{"phase": "name", "duration": "timeframe", "tasks": ["task1", "task2"]}],
  "budget": [{"category": "name", "amount": "$X", "percentage": Y}],
  "vendors": [{"type": "category", "recommendations": ["vendor1", "vendor2"], "estimated": "$X"}],
  "venue": {"layout": "description", "capacity": "number", "features": ["feature1"]},
  "marketing": ["strategy1", "strategy2"],
  "risks": [{"risk": "description", "mitigation": "solution"}]
}`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert event planning AI assistant. Provide detailed, actionable event blueprints in valid JSON format only.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    })

    const responseText = completion.choices[0].message.content
    
    // Try to parse JSON from the response
    let blueprint
    try {
      // Remove markdown code blocks if present
      const cleanedResponse = responseText?.replace(/```json\n?/g, '').replace(/```\n?/g, '') || '{}'
      blueprint = JSON.parse(cleanedResponse)
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError)
      return NextResponse.json({ 
        error: 'Failed to parse blueprint',
        blueprint: null
      }, { status: 200 })
    }

    return NextResponse.json({ blueprint })

  } catch (error: any) {
    console.error('Blueprint API Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate blueprint', blueprint: null },
      { status: 200 }
    )
  }
}

