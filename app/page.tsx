import prisma from '@/prisma/client';
import { Flex, Grid } from '@radix-ui/themes';
import IssueChart from './IssueChart';
import IssueSummary from './IssueSummary';
import LatestIssues from './LatestIssues';
import { Metadata } from 'next';

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } });
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } });
  const InProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' },
  });
  return (
    <Grid columns={{ initial: '1', md: '2' }} gap='4'>
      <Flex direction='column' gap='4'>
        <IssueSummary open={open} closed={closed} inProgress={InProgress} />
        <IssueChart open={open} inProgress={InProgress} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summary of project issues.',
};
