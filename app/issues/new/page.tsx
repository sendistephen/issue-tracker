'use client';

import { Button, Callout, TextField, TextFieldInput } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';
import { InfoCircledIcon } from '@radix-ui/react-icons';
interface IssueForm {
  title: string;
  description: string;
}

function NewIssuePage() {
  const [error, setError] = useState('');
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const router = useRouter();

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

        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder='Description' {...field} />
          )}
        />
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
}

export default NewIssuePage;
