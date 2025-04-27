// app/login/page.tsx
"use client";

import { Button } from "@/components/ui/button"; // Assuming you have a button component
//import { login } from "@/lib/kinde"; // Your Kinde login function
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background/95 p-4">
      <div className="bg-background/10 shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <Image
          src="/logo.png"
          alt="SafePulse Logo"
          width={80}
          height={80}
          className="mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold mb-2 text-blue-700">Welcome Back</h1>
        <p className="mb-6 text-gray-500">
          Login to report or respond to emergencies
        </p>
        <Link href={"/dashboard"}>
        <Button
          // onClick={login}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-2"
          >
          Login with Kinde
        </Button>
          </Link>
        <p className="mt-4 text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/signup" className="text-green-600 hover:underline">
            signup
          </Link>
        </p>
      </div>
    </main>
  );
}
