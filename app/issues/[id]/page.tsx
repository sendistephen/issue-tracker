import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from '../_components/EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from '../_components/DeleteIssueButton';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import AssigneeSelect from './AssigneeSelect';
import { cache } from 'react';

interface Props {
  params: { id: string };
}
const fetchIssue = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: { id: issueId },
  })
);

const IssueDetailsPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const issue = await fetchIssue(parseInt(params.id));

  if (!issue) notFound();

  return (
    <Grid
      columns={{
        initial: '1',
        sm: '5',
      }}
      gap='5'
    >
      <Box className='md:col-span-4'>
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction='column' gap='2'>
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id));

  return {
    title: issue?.title,
    description: `Details of ${issue?.description}`,
  };
}

export default IssueDetailsPage;
