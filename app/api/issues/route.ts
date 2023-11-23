import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { createIssueSchema } from '../../validationSchema';

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
