import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/genai';
import type { IntelligenceTurn } from '../../../types';

const DEFAULT_MODEL = process.env.GOOGLE_GENAI_MODEL || 'gemini-1.5-flash';

function parseBody<T = any>(req: VercelRequest): T {
  if (typeof req.body === 'string' && req.body.length) {
    return JSON.parse(req.body);
  }
  return (req.body || {}) as T;
}

function buildSystemInstruction(courseId?: string, context?: Record<string, unknown>, transcript?: IntelligenceTurn[]): string {
  const contextLines: string[] = [];
  if (courseId) {
    contextLines.push(`Course Focus: ${courseId}`);
  }
  if (context) {
    contextLines.push(`Context JSON: ${JSON.stringify(context)}`);
  }
  if (transcript && transcript.length) {
    const lastTurns = transcript.slice(-5)
      .map((turn) => `${turn.role.toUpperCase()}: ${turn.content}`)
      .join('\n');
    contextLines.push('Recent Transcript:\n' + lastTurns);
  }

  return [
    'You are MR CEU Studio\'s Architect Intelligence layer.',
    'Respond with high-trust, actionable guidance grounded in Health, Safety, and Welfare outcomes.',
    'If you reference performance metrics, tie them back to how the learner logged evidence inside the studio.',
    'Do not hallucinate product specs. Offer next-step experiments when information is missing.',
    contextLines.join('\n'),
  ]
    .filter(Boolean)
    .join('\n\n');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const body = parseBody<{
      prompt?: string;
      courseId?: string;
      context?: Record<string, unknown>;
      transcript?: IntelligenceTurn[];
      practitionerEmail?: string;
    }>(req);

    if (!body.prompt) {
      return res.status(400).json({ error: 'prompt is required' });
    }

    const apiKey = process.env.GOOGLE_GENAI_API_KEY;
    let answer = '';
    let source: 'genai' | 'fallback';
    const metadata: Record<string, unknown> = {
      courseId: body.courseId ?? null,
      model: DEFAULT_MODEL,
    };

    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: DEFAULT_MODEL,
          systemInstruction: buildSystemInstruction(body.courseId, body.context, body.transcript),
        });

        const response = await model.generateContent([
          {
            role: 'user',
            parts: [{ text: body.prompt }],
          },
        ]);

        answer = response.response?.text() ||
          'The intelligence layer generated an empty response. Please retry in a moment.';
        source = 'genai';
        metadata.latencyMs = response.response?.usageMetadata?.totalTokenCount;
      } catch (error: any) {
        console.error('GenAI error', error);
        answer =
          'Studio Intelligence is available, but the upstream model could not be reached. I logged the failure so we can retry with traceability.';
        source = 'fallback';
        metadata.error = error?.message || 'genai_error';
      }
    } else {
      answer =
        'Studio Intelligence is staged for Phase 2. Add GOOGLE_GENAI_API_KEY to enable live responses, or continue using the deterministic workflows in the dashboard.';
      source = 'fallback';
    }

    return res.status(200).json({
      answer,
      source,
      metadata,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || 'Intelligence layer error' });
  }
}
