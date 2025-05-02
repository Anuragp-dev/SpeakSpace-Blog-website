import { auth, signOut, signIn } from '@/auth'
import { redirect } from 'next/dist/server/api-utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = async () => {

  const session = await auth()
  return (
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
      <nav className='flex items-center justify-between'>
        <Link href={'/'}>
          <Image src={'/logo.png'} alt='logo' width={40} height={40}></Image>
        </Link>

        <div className='flex items-center gap-5 text-black'>
          {session && session?.user ? (
            <>
              <Link href={'/startup/create'}>
                <span>Create</span>
              </Link>

              <form action={async () => {
                'use server'

                await signOut({ redirectTo: '/' })

              }}>
                <span>Logout</span>
              </form>


              <Link href={`/user/${session?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>

          ) : (

            <>
              <form action={async () => {
                'use server';

                await signIn("github");

              }}>

                <button type='submit'>
                  <span>Login</span>
                </button>
              </form>
            </>
          )}
        </div>
      </nav>
    </header >
  )
}

export default Navbar
