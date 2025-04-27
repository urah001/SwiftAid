// app/signup/page.tsx
"use client";

import { Button } from "@/components/ui/button";
//import { register } from "@/lib/kinde"; // Your Kinde signup function
import Image from "next/image";
import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black-50 p-4">
      <div className="bg-zinc shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <Image
          src="/logo.png"
          alt="SafePulse Logo"
          width={80}
          height={80}
          className="mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold mb-2 text-green-700">MEDAlert</h1>
        <p className="mb-6 text-gray-500">
          Create an account to help reduce emergencies around the school
          enviroment
        </p>
        <Button
          //  onClick={register}
          className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-2"
        >
          Sign Up with Kinde
        </Button>
        <p className="mt-4 text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-green-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
