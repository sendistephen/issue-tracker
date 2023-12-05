import { IssueStatusBadge } from '@/app/components';
import { Issue } from '@prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import Markdown from 'react-markdown';

const IssueDetails = async ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue?.title}</Heading>
      <Flex className='gap-2' my='2'>
        <IssueStatusBadge status={issue.status} />
        <Text>{issue?.createdAt.toDateString()}</Text>
      </Flex>
      <Card className='prose max-w-full'>
        <Markdown>{issue?.description}</Markdown>
      </Card>
    </>
  );
};

export default IssueDetails;
