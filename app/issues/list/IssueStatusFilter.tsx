'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

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
  const searchParams = useSearchParams();

  const handleStatusChange = (selectedStatus: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('status', selectedStatus);

    const orderBy = searchParams.get('orderBy') || 'defaultOrderByValue'; // Replace 'defaultOrderByValue' with a suitable default or keep as is
    const orderDir = searchParams.get('orderDir') || 'defaultOrderDirValue'; // Replace 'defaultOrderDirValue' with a suitable default or keep as is

    params.set('orderBy', orderBy);
    params.set('orderDir', orderDir);

    router.push(`/issues/list?${params.toString()}`);
  };

  return (
    <Select.Root
      defaultValue={searchParams.get('status') || ''}
      onValueChange={handleStatusChange}
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
