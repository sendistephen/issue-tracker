import Pagination from '@/app/components/Pagination';
import prisma from '@/prisma/client';
import { Issue, Status } from '@prisma/client';
import IssueActions from './IssueActions';
import IssueTable, { columnNames } from './IssueTable';
import { Metadata } from 'next';

type Props = {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    orderDir: 'asc' | 'desc';
    page: string;
  };
};

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: searchParams.orderDir || 'asc' }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const issueCount = await prisma.issue.count({ where: { status } });

  return (
    <div className='space-y-4'>
      <IssueActions currentSortColumn={searchParams.orderBy} />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        itemCount={issueCount}
        currentPage={page}
      />
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default IssuesPage;

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues.',
};
