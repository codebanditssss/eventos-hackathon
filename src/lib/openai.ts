import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default openai

// AI Event Planning Functions
export const generateEventPlan = async (eventDetails: {
  name: string
  type: string
  attendees: number
  duration: string
  budget?: number
  location?: string
}) => {
  const prompt = `
    Create a comprehensive event plan for:
    - Event Name: ${eventDetails.name}
    - Type: ${eventDetails.type}
    - Expected Attendees: ${eventDetails.attendees}
    - Duration: ${eventDetails.duration}
    ${eventDetails.budget ? `- Budget: $${eventDetails.budget}` : ''}
    ${eventDetails.location ? `- Location: ${eventDetails.location}` : ''}

    Please provide:
    1. Detailed timeline/schedule
    2. Budget breakdown (if budget provided)
    3. Vendor checklist
    4. Task assignments
    5. Risk mitigation strategies
  `

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    })

    return completion.choices[0]?.message?.content || 'Failed to generate event plan'
  } catch (error) {
    console.error('Error generating event plan:', error)
    throw new Error('Failed to generate event plan')
  }
}

export const summarizeFeedback = async (feedback: string[]) => {
  const prompt = `
    Summarize the following event feedback and provide actionable insights:
    
    ${feedback.join('\n\n')}
    
    Please provide:
    1. Overall sentiment (positive/negative/neutral)
    2. Key themes and patterns
    3. Top 3 areas for improvement
    4. Top 3 strengths to maintain
    5. Specific recommendations for future events
  `

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
    })

    return completion.choices[0]?.message?.content || 'Failed to summarize feedback'
  } catch (error) {
    console.error('Error summarizing feedback:', error)
    throw new Error('Failed to summarize feedback')
  }
}
