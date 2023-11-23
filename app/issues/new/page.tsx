'use client';

import {
  Button,
  Callout,
  Text,
  TextField,
  TextFieldInput,
} from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createIssueSchema } from '@/app/validationSchema';

type IssueForm = z.infer<typeof createIssueSchema>;

function NewIssuePage() {
  const [error, setError] = useState('');

  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mb-2'>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className='space-y-3'
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post('/api/issues', data);
            router.push('/issues');
          } catch (error) {
            setError('An expected error occured.');
          }
        })}
      >
        <TextField.Root>
          <TextFieldInput placeholder='Title' {...register('title')} />
        </TextField.Root>
        {errors.title && (
          <Text color='red' as='p'>
            {errors.title.message}
          </Text>
        )}

        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} />
          )}
        />
        {errors.description && (
          <Text color='red' as='p'>
            {errors.description.message}
          </Text>
        )}

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
}

export default NewIssuePage;
