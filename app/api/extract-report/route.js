import { getOpenAI } from "@/lib/openai";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const openai = getOpenAI();
        const { imageBase64 } = await request.json();

        if (!imageBase64) {
            return NextResponse.json(
                { error: "No image provided" },
                { status: 400 }
            );
        }

        const systemPrompt = `You are a medical report extraction AI for HelixCare. Extract structured data from health/lab reports (CBC, lipid profile, thyroid, blood sugar, urine, etc.).

Return ONLY valid JSON in this exact structure:
{
  "reportType": "string (e.g., Complete Blood Count, Lipid Profile, HbA1c, Thyroid Panel)",
  "reportDate": "string (YYYY-MM-DD if visible, else 'unknown')",
  "labName": "string or 'unknown'",
  "patientInfo": {
    "age": "string or 'unknown'",
    "gender": "string or 'unknown'"
  },
  "tests": [
    {
      "name": "string (test name)",
      "value": "string (the measured value)",
      "unit": "string (g/dL, mg/dL, etc.)",
      "normalRange": "string",
      "status": "normal" | "low" | "high" | "borderline"
    }
  ],
  "summary": "string (2-3 sentence overview of the report)",
  "flags": ["string array of abnormal or concerning findings; empty array if all normal"],
  "recommendations": ["string array of 2-3 next-step recommendations based on the values"]
}

If the image is not a medical report, return:
{ "error": "not_a_medical_report", "message": "This does not appear to be a health report." }`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: systemPrompt },
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Extract all structured data from this health report." },
                        {
                            type: "image_url",
                            image_url: { url: imageBase64 },
                        },
                    ],
                },
            ],
            response_format: { type: "json_object" },
            max_tokens: 2000,
        });

        const result = JSON.parse(completion.choices[0].message.content);
        return NextResponse.json(result);
    } catch (error) {
        console.error("Report extraction error:", error);
        return NextResponse.json(
            { error: "Failed to extract report", details: error.message },
            { status: 500 }
        );
    }
}