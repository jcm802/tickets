import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from './dojo.png'

export default function Navbar(): JSX.Element {
  return (
    <nav>
        {/* <Image
            src={Logo}
            alt='Dojo Helpdesk Logo'
            width={70}
            quality={100} */}
            {/* // This placeholder shows when the image is loading
        //     placeholder='blur'
        // /> */}
        <h1>My Company</h1>
        <Link href="/">Dashboard</Link>
        <br />
        <Link href="/tickets">Tickets</Link>
      </nav>
  )
}
