'use client';
import { TrashIcon } from '@radix-ui/react-icons';
import {
  AlertDialog,
  Button,
  Flex,
  Inset,
  Table,
  TableBody,
} from '@radix-ui/themes';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color='red'>
          <TrashIcon className='mr-1' /> Delete Issue
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 500 }}>
        <AlertDialog.Title>Delete Users</AlertDialog.Title>
        <AlertDialog.Description size='2'>
          Are you sure you want to delete this issue? This action is permanent
          and cannot be undone.
        </AlertDialog.Description>

        <Flex gap='3' justify='end'>
          <AlertDialog.Cancel>
            <Button variant='soft' color='gray'>
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color='red'>Confirm</Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
