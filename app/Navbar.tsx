'use client';
import Link from 'next/link';
import React from 'react';
import { AiFillBug } from 'react-icons/ai';
import classnames from 'classnames';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from '@radix-ui/themes';
import { Skeleton } from '@/app/components';

function Navbar() {
  return (
    <nav className='border-b mb-5 px-5 py-3'>
      <Container>
        <Flex justify='between'>
          <Flex align='center' gap='2'>
            <Link href='/'>
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
}

export default Navbar;

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === 'loading') return <Skeleton width='3rem' />;

  if (status === 'unauthenticated')
    return <Link href='/api/auth/signin'>Sign in</Link>;

  return (
    <Box>
      {status === 'authenticated' && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              size='2'
              radius='full'
              src={session.user!.image!}
              fallback='?'
              className='cursor-pointer'
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text>{session.user?.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href='/api/auth/signout'>Sign out</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </Box>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues/list' },
  ];

  return (
    <ul className='flex space-x-6'>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classnames({
              'text-zinc-800': link.href === currentPath,
              'text-zinc-500': link.href !== currentPath,
              'hover:text-zinc-800 transition-colors': true,
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};
