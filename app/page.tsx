import prisma from '@/prisma/client';
import Pagination from './components/Pagination';
import { Avatar, Box, Card, Flex, Heading, Table } from '@radix-ui/themes';
import Link from 'next/link';
import { IssueStatusBadge } from './components';
import IssueSummary from './IssueSummary';
import IssueChart from './IssueChart';

export default async function Home() {
  const issues = await prisma.issue.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 5,
    include: { assignedToUser: true },
  });
  const open = await prisma.issue.count({ where: { status: 'OPEN' } });
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } });
  const InProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' },
  });
  return (
    <Flex direction='column' gap='4'>
      <IssueSummary open={open} closed={closed} inProgress={InProgress} />
      <Card>
        <Heading size='4'>Latest Issues</Heading>
        <Table.Root>
          <Table.Body>
            {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Flex justify='between' align='center'>
                    <Flex direction='column' align='start' gap='2'>
                      <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                      <IssueStatusBadge status={issue.status} />
                    </Flex>
                    {issue.assignedToUserId && (
                      <Avatar
                        src={issue.assignedToUser?.image!}
                        fallback='?'
                        radius='full'
                        size='2'
                      />
                    )}
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Card>
      <IssueChart open={open} inProgress={InProgress} closed={closed} />
    </Flex>
  );
}
