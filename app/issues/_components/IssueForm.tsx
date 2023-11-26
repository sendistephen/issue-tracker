'use client';

import { ErrorMessage, Spinner } from '@/app/components';
import { issueSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Button, Callout, TextField, TextFieldInput } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (error) {
      setError('An expected error occured.');
    }
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
      <form className='space-y-3' onSubmit={onSubmit}>
        <TextField.Root>
          <TextFieldInput
            defaultValue={issue?.title}
            placeholder='Title'
            {...register('title')}
          />
        </TextField.Root>
        {errors.title && <ErrorMessage>{errors.title?.message}</ErrorMessage>}

        <Controller
          name='description'
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} />
          )}
        />
        {errors.description && (
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        )}

        <Button disabled={isSubmitting}>
          Submit New Issue {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
