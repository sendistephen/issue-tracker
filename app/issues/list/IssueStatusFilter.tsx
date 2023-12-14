'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

type StatusOption = {
  label: string;
  value: string;
};
const status: StatusOption[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Open', value: Status.OPEN },
  { label: 'In Progress', value: Status.IN_PROGRESS },
  { label: 'Closed', value: Status.CLOSED },
];

const IssueStatusFilter = () => {
  const router = useRouter();

  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status ? `?status=${status}` : '';
        router.push('/issues/list' + query);
      }}
    >
      <Select.Trigger placeholder='Filter by status' />
      <Select.Content>
        {status.map((status) => (
          <Select.Item key={status.value} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};
export default IssueStatusFilter;
