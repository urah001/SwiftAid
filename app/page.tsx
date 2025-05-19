import Link from "next/link";
//import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">SwiftAid</span>
            <span>Response System</span>
          </div>
          <nav className="flex items-center gap-4">
            {/* login link */}
            <LoginLink>
              {/* <Link href={"/api/auth/login?"}> */}
                <Button variant="ghost">Log in</Button>
              {/* </Link> */}
            </LoginLink>

            {/* Registration link */}
            <RegisterLink>
              {/* <Link href={"/api/auth/register?"}> */}
                <Button>Sign up</Button>
              {/* </Link> */}
            </RegisterLink>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                   CUSTECH Campus Emergency Response System
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Quick medical assistance for campus emergencies. Report
                    incidents and get help fast.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <RegisterLink>
                    <Button size="lg" className="gap-1">
                      Register Now
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </RegisterLink>
                  <Link href="/about">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[350px] rounded-full bg-gradient-to-r from-primary to-primary/50 p-1">
                  <div className="h-full w-full rounded-full bg-background flex items-center justify-center">
                    <div className="text-center space-y-2 p-6">
                      <h3 className="text-2xl font-bold">Emergency Response</h3>
                      <p className="text-gray-500">
                        Fast. Reliable. Life-saving.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Report emergencies in three simple steps
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our system is designed to get medical help to those who need
                  it as quickly as possible.
                </p>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">
                    1. Sign up with your student ID
                  </h3>
                  <p className="text-gray-500">
                    Register using your matriculation number and add your
                    medical information.
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">2. Report an emergency</h3>
                  <p className="text-gray-500">
                    Quickly submit details about the emergency and location
                    using campus landmarks.
                  </p>
                </div>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">3. Help arrives</h3>
                  <p className="text-gray-500">
                    Medical staff receives the alert with all necessary
                    information and responds promptly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-gray-500">
            © 2025 SwiftAid Response System. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
