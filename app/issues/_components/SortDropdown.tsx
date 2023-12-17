'use client';
import { Select } from '@radix-ui/themes';
import { useSearchParams } from 'next/navigation';
type Props = {
  onSortChange: (value: string) => void;
};
const SortDropdown = ({ onSortChange }: Props) => {
  const searchParams = useSearchParams();

  const handleValueChange = (value: string) => {
    onSortChange(value);
  };
  return (
    <Select.Root
      defaultValue={searchParams.get('orderDir') || ''}
      onValueChange={handleValueChange}
    >
      <Select.Trigger placeholder='Sort by...' />
      <Select.Content>
        <Select.Item value='asc'>Ascending</Select.Item>
        <Select.Item value='desc'>Descending</Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

export default SortDropdown;
