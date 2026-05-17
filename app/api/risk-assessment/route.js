import { getOpenAI } from "@/lib/openai";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const openai = getOpenAI();
    const { answers } = await request.json();

    const systemPrompt = `You are a preventive health AI assistant for HelixCare, an India-focused preventive genetics platform.
Analyze the user's self-reported health information, family history, and lifestyle to identify potential genetic and lifestyle risk indicators.

IMPORTANT RULES:
- You are NOT diagnosing. You are identifying risk indicators that warrant professional screening.
- Focus on conditions common in India: sickle cell anemia, thalassemia, diabetes type 2, hypertension, cardiovascular disease, hereditary cancers, PCOS, vitamin deficiencies.
- Be empathetic, factual, and culturally aware.
- Always recommend appropriate professional screening.
- Consider ethnicity, region, and family patterns when assessing risk.

Return ONLY valid JSON in this exact structure:
{
  "overallRiskLevel": "low" | "moderate" | "high",
  "overallScore": number (0-100),
  "riskFactors": [
    {
      "condition": "string",
      "riskScore": number (0-100),
      "level": "low" | "moderate" | "high",
      "reasoning": "string (2-3 sentences explaining WHY this risk exists for this user)",
      "recommendedScreening": "string (specific test name)",
      "urgency": "routine" | "soon" | "priority",
      "ageToScreen": "string (e.g., 'now', 'by age 30', 'annually after 35')"
    }
  ],
  "topRecommendations": [
    "string action 1",
    "string action 2",
    "string action 3"
  ],
  "lifestyleInsights": [
    "string lifestyle observation 1",
    "string lifestyle observation 2"
  ],
  "summary": "string (3-4 sentences, empathetic, clear, actionable)"
}

Generate at least 4 risk factors. Make reasoning specific to the user's actual answers, not generic.`;

    const userPrompt = `Analyze this user's responses and generate a comprehensive preventive health risk report:\n\n${JSON.stringify(answers, null, 2)}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const result = JSON.parse(completion.choices[0].message.content);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Risk assessment error:", error);
    return NextResponse.json(
      { error: "Failed to generate risk assessment", details: error.message },
      { status: 500 }
    );
  }
}