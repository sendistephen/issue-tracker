'use client';
import { Button, Box, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import IssueStatusFilter from './IssueStatusFilter';
import SortDropdown from '../_components/SortDropdown';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const IssueActions = ({
  currentSortColumn,
}: {
  currentSortColumn?: string;
}) => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const handleSortChange = (order: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('orderDir', order);

    if (currentSortColumn) {
      params.set('orderBy', currentSortColumn);
    }

    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <Flex mb='5' justify='between'>
      <Flex gap='4'>
        <IssueStatusFilter />
        <SortDropdown onSortChange={handleSortChange} />
      </Flex>
      <Button>
        <Link href='/issues/new'>New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
