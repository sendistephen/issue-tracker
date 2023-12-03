import { Skeleton } from '@/app/components';
import { Table } from '@radix-ui/themes';
import IssueActions from './IssueActions';

const LoadingIssuesPage = () => {
  const issues = [1, 2, 3, 4, 5];
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
            <Table.Row key={issue}>
              <Table.RowHeaderCell>
                <Skeleton />
                <div className='flex md:hidden text-xs  '>
                  <span className='mr-2 text-slate-500'>
                    <Skeleton />
                  </span>{' '}
                  |
                  <span className='ml-2 text-slate-500'>
                    <Skeleton />
                  </span>
                </div>
              </Table.RowHeaderCell>
              <Table.RowHeaderCell className='hidden md:table-cell'>
                <Skeleton />
              </Table.RowHeaderCell>
              <Table.Cell className='hidden md:table-cell'>
                <Skeleton />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default LoadingIssuesPage;
