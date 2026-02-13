import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { CourseEntity } from '../../types';
import { randomUUID } from 'crypto';

const COURSE_REGISTRY: CourseEntity[] = [
  {
    id: 'course-ceu-001',
    title: 'Computational Surface Systems 101',
    description:
      'Flagship HSW experience focused on evidence-based material decisions, performance trade-offs, and documentation artifacts.',
    creditHours: 1,
    hsw: true,
    sectorFocus: ['Workplace', 'Hospitality', 'Healthcare'],
    status: 'pilot',
    updatedAt: new Date().toISOString(),
    modules: [
      {
        id: 'act-01',
        title: 'Act 01 · Project Context',
        objective: 'Align brief, constraints, and success criteria inside MR CEU Studio.',
        durationMinutes: 8,
        status: 'ready to launch',
      },
      {
        id: 'act-03',
        title: 'Act 03 · Surface Customization',
        objective: 'Drive computational changes to panels and immediately understand buildability impact.',
        durationMinutes: 12,
        status: 'builder preview',
        actId: 3,
      },
      {
        id: 'act-06',
        title: 'Act 06 · HSW Assessment',
        objective: 'Scenario-based quiz that references the exact design log created by the learner.',
        durationMinutes: 6,
        status: 'draft',
        actId: 6,
      },
    ],
    documents: [
      {
        id: 'doc-brief',
        label: 'Studio Brief (PDF)',
        type: 'brief',
        url: undefined,
        ingestionStatus: 'queued',
      },
      {
        id: 'doc-spec',
        label: 'CSI Specification Starter',
        type: 'spec',
        url: undefined,
        ingestionStatus: 'missing',
      },
    ],
  },
];

function asArray<T>(value: T | T[] | undefined): T[] | undefined {
  if (value === undefined) return undefined;
  return Array.isArray(value) ? value : [value];
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const { status } = req.query;
      let result = [...COURSE_REGISTRY];

      if (typeof status === 'string') {
        result = result.filter((course) => course.status === status);
      }

      return res.status(200).json({ count: result.length, courses: result });
    }

    if (req.method === 'POST') {
      const payload =
        typeof req.body === 'string' && req.body.length ? JSON.parse(req.body) : req.body;

      const { title, description, creditHours, sectorFocus } = payload ?? {};

      if (!title || !description || !creditHours) {
        return res.status(400).json({
          error: 'title, description, and creditHours are required to register a course shell',
        });
      }

      const newCourse: CourseEntity = {
        id: randomUUID(),
        title: String(title).trim(),
        description: String(description).trim(),
        creditHours: Number(creditHours),
        hsw: Boolean(payload?.hsw ?? true),
        sectorFocus: (asArray<string>(sectorFocus) ?? ['Workplace']) as CourseEntity['sectorFocus'],
        status: 'draft',
        updatedAt: new Date().toISOString(),
        modules: payload?.modules ?? [],
        documents: payload?.documents ?? [],
      };

      COURSE_REGISTRY.push(newCourse);

      return res.status(202).json({
        message: 'Course registered in-memory. Connect persistence before launching Phase 2.',
        course: newCourse,
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || 'Course registry error' });
  }
}
