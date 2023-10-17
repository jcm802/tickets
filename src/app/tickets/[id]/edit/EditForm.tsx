'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Params, Ticket } from '@/app/types/tickets';
import { updateTicket } from '@/app/api';

interface EditFormProps {
  ticket: Ticket,
}

export default function EditForm({ ticket }: EditFormProps): JSX.Element {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
  
    const {
        handleSubmit,
        control,
        setValue,
      } = useForm<Ticket>({
        defaultValues: {
            title: ticket?.title,
            body: ticket?.body,
            priority: ticket?.priority,
            user_email: ticket?.user_email,
        }
      });

    const createNewTicket = async (data: Ticket): Promise<void> => {
      const res = await updateTicket({
        id: data.id,
        title: data.title,
        body: data.body,
        priority: data.priority,
        user_email: data.user_email,
      }, ticket.id);
      if (!(res instanceof Error)) {
        router.push('/tickets');
      }
    }

    const onSubmit: SubmitHandler<Ticket> = async (data): Promise<void> => {
        setIsLoading(true);
        await createNewTicket(data);
      };

      useEffect(() => {
        setValue('title', ticket?.title);
        setValue('body', ticket?.body);
        setValue('priority', ticket?.priority);
        setValue('user_email', ticket?.user_email);
      }, [ticket, setValue]);
  
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-1/2">
        <label>
          <span>Title:</span>
          <Controller
            name="title"
            control={control}
            rules={{
                required: 'This field is required.',
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
        </label>
        <label>
          <span>Body:</span>
          <Controller
            name="body"
            control={control}
            rules={{
                required: 'This field is required.',
              }}
            render={({ field: { value, onChange }}) => (
                <textarea
                    required
                    onChange={onChange}
                    value={value}
                />
            )}
          />
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
        </label>
        <label>
          <span>User Email:</span>
          <Controller
            name="user_email"
            control={control}
            rules={{
                required: 'This field is required.',
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