'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
// used to redirect the user on form submit

// This will remain a server component, as we may have non interactive elements around the form
export default function CreateForm(): JSX.Element {
  const router = useRouter();

  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [userEmail, setUserEmail] = useState('');
  const [priority, setPriority] = useState<string>('low');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const ticket = {
      title, body, priority, userEmail
    }

    const res = await fetch('http://localhost:4000/tickets', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticket)
    });

    if (res.status === 201) {
      // Requests the route in the background and refetch new data
      router.refresh();
      router.push('/tickets');
    }
  }

  return (
        <form onSubmit={handleSubmit} className="w-1/2">
      <label>
        <span>Title:</span>
        <input
          required 
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </label>
      <label>
        <span>Body:</span>
        <textarea
          required
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />
      </label>
      <label>
        <span>Priority:</span>
        <select 
          onChange={(e) => setPriority(e.target.value)}
          value={priority}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </label>
      <label>
        <span>User Email:</span>
        <input
          required 
          type="text"
          onChange={(e) => setUserEmail(e.target.value)}
          value={userEmail}
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
