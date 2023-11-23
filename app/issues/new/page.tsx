'use client';

import { Button, TextField, TextFieldInput } from '@radix-ui/themes';
import SimpleMDE, { SimpleMDEReactProps } from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { Controller, useForm } from 'react-hook-form';
import { useMemo } from 'react';

function NewIssuePage() {
  const { register, control } = useForm();

  return (
    <div className='max-w-xl space-y-3'>
      <TextField.Root>
        <TextFieldInput placeholder='Title' />
      </TextField.Root>

      <SimpleMDE  placeholder='Description' />

      <Button>Submit New Issue</Button>
    </div>
  );
}

export default NewIssuePage;
