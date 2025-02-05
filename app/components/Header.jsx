import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const Header = () => {
    const { data: session } = useSession();
    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <button onClick={handleSignOut}>Sign out</button>
            {session ? (
                <div>Welcome</div>
            ) :(
              <div>
                <Link href="/login">Log in</Link>
                <Link href="/login">Log in</Link>
              </div>
            )
            }
        </div>
    )
}

export default Header