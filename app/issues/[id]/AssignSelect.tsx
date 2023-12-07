'use client';
import { Select } from '@radix-ui/themes';

const AssignSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder='Assign...'>
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value='1'>Stephen Sendi</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Trigger>
    </Select.Root>
  );
};

export default AssignSelect;
