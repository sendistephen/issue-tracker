import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/prisma/client';

const createIssueSchema = z.object({
  title: z.string().min(1, 'Title is required.').max(255),
  description: z.string().min(1, 'Description is required'),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  // Get the body of the request
  const body = await request.json();

  //   validate body object
  const valid = createIssueSchema.safeParse(body);

  // client sends invalid data
  if (!valid.success)
    return NextResponse.json(valid.error.format(), { status: 400 });

  // Now body is valid-> insert new issue in db
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });
  //   Return the created issue to the client
  return NextResponse.json(newIssue, { status: 201 });
}
