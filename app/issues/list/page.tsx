import { IssueStatusBadge } from '@/app/components';
import prisma from '@/prisma/client';
import { Issue, Status } from '@prisma/client';
import { Flex, Table } from '@radix-ui/themes';
import { default as Link, default as NextLink } from 'next/link';
import IssueActions from './IssueActions';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import Pagination from '@/app/components/Pagination';

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

  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: 'Title', value: 'title' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    {
      label: 'Created',
      value: 'createdAt',
      className: 'hidden md:table-cell',
    },
  ];

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
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

      <Table.Root variant='surface' className='my-2'>
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: column.value,
                    },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && (
                  <ArrowUpIcon className='inline' />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className='flex md:hidden text-xs  '>
                  <span className='mr-2 text-slate-500'>
                    <IssueStatusBadge status={issue.status} />
                  </span>{' '}
                  |
                  <span className='ml-2 text-slate-500'>
                    {issue.createdAt.toDateString()}
                  </span>
                </div>
              </Table.RowHeaderCell>
              <Table.RowHeaderCell className='hidden md:table-cell'>
                <IssueStatusBadge status={issue.status} />
              </Table.RowHeaderCell>
              <Table.Cell className='hidden md:table-cell'>
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
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
