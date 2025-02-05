import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { json } from 'stream/consumers';

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Your Password does not match")
    }
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })

      const data = response.json();
      if(!response.ok){
        setError("Registration failed");
      }

      router.push("/login")

    } catch (error) {
      
    }
  }


  //    router.push("/login");
  return (
    <div>Register</div>
  )
}

export default Register