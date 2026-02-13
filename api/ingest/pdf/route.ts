import type { VercelRequest, VercelResponse } from '@vercel/node';
import { randomUUID } from 'crypto';
import type { IngestionJob } from '../../../types';

const ACTIVE_JOBS = new Map<string, IngestionJob>();

function parseBody<T = any>(req: VercelRequest): T {
  if (typeof req.body === 'string' && req.body.length) {
    return JSON.parse(req.body);
  }
  return (req.body || {}) as T;
}

function queueJobResolution(jobId: string) {
  setTimeout(() => {
    const job = ACTIVE_JOBS.get(jobId);
    if (!job || job.status !== 'queued') return;

    ACTIVE_JOBS.set(jobId, {
      ...job,
      status: 'ready',
      notes: 'PDF parsed and ready for downstream intelligence layer.',
    });
  }, 1500).unref?.();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'POST') {
      const body = parseBody<{ courseId?: string; fileName?: string; pdfUrl?: string; fileBase64?: string; submittedBy?: string }>(req);
      const { courseId, fileName, pdfUrl, fileBase64, submittedBy } = body;

      if (!courseId || !fileName) {
        return res.status(400).json({ error: 'courseId and fileName are required' });
      }

      if (!pdfUrl && !fileBase64) {
        return res.status(400).json({ error: 'Provide either pdfUrl or fileBase64' });
      }

      const job: IngestionJob = {
        id: randomUUID(),
        courseId,
        fileName,
        status: 'queued',
        submittedBy,
        submittedAt: new Date().toISOString(),
      };

      ACTIVE_JOBS.set(job.id, job);
      queueJobResolution(job.id);

      return res.status(202).json({ job });
    }

    if (req.method === 'GET') {
      const { jobId } = req.query;
      if (typeof jobId === 'string') {
        const job = ACTIVE_JOBS.get(jobId);
        if (!job) {
          return res.status(404).json({ error: 'Job not found' });
        }
        return res.status(200).json({ job });
      }

      return res.status(200).json({ jobs: Array.from(ACTIVE_JOBS.values()) });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || 'PDF ingestion error' });
  }
}
