import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from './dojo.png'

export default function Navbar() {
  return (
    <nav>
        <h1>Helpdesk</h1>
        <Link href="/">Dashboard</Link>
        <br />
        <Link href="/tickets">Tickets</Link>
      </nav>
  )
}
