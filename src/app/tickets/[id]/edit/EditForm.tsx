'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Ticket } from '@/app/types/tickets';
import { updateTicket } from '@/app/api';

interface EditFormProps {
  ticket: Ticket,
}

export default function EditForm({ ticket }: EditFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
      handleSubmit,
      control,
      setValue,
      formState: { errors },
    } = useForm<Ticket>({
      defaultValues: {
          title: ticket?.title,
          body: ticket?.body,
          priority: ticket?.priority,
          userEmail: ticket?.userEmail,
      }
    });

  const editTicket = async (data: Ticket): Promise<void> => {
    const res = await updateTicket({
      id: data.id,
      title: data.title,
      body: data.body,
      priority: data.priority,
      userEmail: data.userEmail,
    }, ticket.id);
    if (!(res instanceof Error)) {
      router.refresh();
      router.push('/tickets');
    }
  }

  const onSubmit: SubmitHandler<Ticket> = async (data): Promise<void> => {
      setIsLoading(true);
      await editTicket(data);
    };

    useEffect(() => {
      setValue('title', ticket?.title);
      setValue('body', ticket?.body);
      setValue('priority', ticket?.priority);
      setValue('userEmail', ticket?.userEmail);
    }, [ticket, setValue]);
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-1/2" noValidate>
        <label>
          <span>Title:</span>
          <Controller
            name="title"
            control={control}
            rules={{
                required: 'This field is required.',
                minLength: {
                  value: 2,
                  message: 'Please enter more than 2 characters.'
                },
              }}
            render={({ field: { value, onChange }}) => (
                <input
                    required 
                    type="text"
                    onChange={onChange}
                    value={value}
                />
            )}
          />
        <p className='mb-2 text-red-500'>{errors?.title ? errors?.title?.message : null}</p>
        </label>
        <label>
          <span>Body:</span>
          <Controller
            name="body"
            control={control}
            rules={{
              required: 'This field is required.',
              minLength: {
                value: 2,
                message: 'Please enter more than 2 characters.'
              },
            }}
            render={({ field: { value, onChange }}) => (
                <textarea
                    required
                    onChange={onChange}
                    value={value}
                />
            )}
          />
          <p className='mb-2 text-red-500'>{errors?.body ? errors?.body?.message : null}</p>
        </label>
        <label>
          <span>Priority:</span>
          <Controller
            name="priority"
            control={control}
            rules={{
              required: 'This field is required.',
            }}
            render={({ field: { value, onChange }}) => (
                <select 
                    onChange={onChange}
                    value={value}
                >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                </select>
            )}
          />
          <p className='mb-2 text-red-500'>{errors?.priority ? errors?.priority?.message : null}</p>
        </label>
        <label>
          <span>User Email:</span>
          <Controller
            name="userEmail"
            control={control}
            rules={{
                required: 'This field is required.',
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: 'Please enter a valid email.'
                }
              }}
            render={({ field: { value, onChange }}) => (
                <input
                    required 
                    type="text"
                    onChange={onChange}
                    value={value}
                />
            )}
          />
          <p className='mb-2 text-red-500'>{errors?.userEmail ? errors?.userEmail?.message : null}</p>
        </label>
        <button 
          className="btn-primary" 
          disabled={isLoading}
        >
        {isLoading ? <span>Editing...</span> : null}
        {!isLoading ? <span>Edit Ticket</span> : null}
      </button>
      </form>
    )
  }
