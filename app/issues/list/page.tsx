import { IssueStatusBadge } from '@/app/components';
import prisma from '@/prisma/client';
import { Button, Table } from '@radix-ui/themes';
import Link from 'next/link';
import IssueActions from './IssueActions';

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <div>
      <IssueActions />
      <Table.Root variant='surface' className='my-2'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>
              Created
            </Table.ColumnHeaderCell>
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
    </div>
  );
};

export const dynamic = 'force-dynamic';

export default IssuesPage;
