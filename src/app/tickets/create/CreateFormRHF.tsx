'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Ticket } from '@/app/types/tickets';

export default function CreateFormRHF() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        handleSubmit,
        control,
      } = useForm<Ticket>({
        defaultValues: {
            title: '',
            body: '',
            priority: '',
            userEmail: '',
        }
      });

    const createNewTicket = async (data: Ticket): Promise<void> => {
        const res = await fetch('http://localhost:4000/tickets', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: data.title,
                body: data.body,
                priority: data.priority,
                userEmail: data.userEmail,
            })
    });

    if (res.status === 201) {
      // Requests the route in the background and refetch new data
      router.refresh();
      router.push('/tickets');
    }
    }

    const onSubmit: SubmitHandler<Ticket> = async (data): Promise<void> => {
        setIsLoading(true);
        await createNewTicket(data);
      };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-1/2" noValidate>
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
            name="userEmail"
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
        {isLoading ? <span>Adding...</span> : null}
        {!isLoading ? <span>Add Ticket</span> : null}
      </button>
      </form>
    )
  }
