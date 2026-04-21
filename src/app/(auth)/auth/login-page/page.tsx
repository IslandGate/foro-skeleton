"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { ebGaramond, spaceGrotesk } from "@/app/ui/fonts";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else if (data.user) {
        router.push(redirectTo);
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
        },
      });

      if (error) {
        setError(error.message);
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${spaceGrotesk.className} relative flex min-h-screen bg-bark`}
    >
      {/* Left Side – Decorative */}
      <div className="relative hidden shrink-0 overflow-hidden lg:block lg:w-[25.9%]">
        <Image
          src="/decorative-pattern-red.svg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-10 px-[51px] pt-[45px]">
          <h1
            className={`${ebGaramond.className} text-[clamp(40px,4.4vw,64px)] font-medium leading-[0.91]`}
          >
            Discover, connect and then{" "}
            <em className="italic text-cream">discover again</em>
          </h1>
        </div>
      </div>

      {/* Right Side – Form */}
      <div className="flex flex-1 overflow-y-auto bg-cream lg:rounded-l-[30px]">
        <div className="w-full px-6 py-8 sm:px-10 lg:px-[8%] lg:py-0">
          <div className="flex justify-center lg:justify-start">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Il Foro Logo"
                width={213}
                height={213}
                className="h-auto w-[150px] sm:w-[180px] lg:w-[14.8vw] lg:max-w-[213px]"
                priority
              />
            </Link>
          </div>

          <h2 className="mb-8 mt-2 text-center text-3xl font-bold text-black lg:text-left lg:text-[32px]">
            Login
          </h2>

          {error && (
            <div className="mb-6 rounded-lg border border-red-400 bg-red-50 p-3 text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-12">
              <fieldset className="h-[73px] rounded-lg border border-dark-gray px-[23px] py-[10px]">
                <legend className="px-2 text-base font-medium text-dark-gray">
                  Email
                </legend>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-base text-dark-gray focus:outline-none"
                  required
                  disabled={loading}
                />
              </fieldset>

              <fieldset className="h-[73px] rounded-lg border border-dark-gray px-[23px] py-[10px]">
                <legend className="px-2 text-base font-medium text-dark-gray">
                  Password
                </legend>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-base text-dark-gray focus:outline-none"
                  required
                  disabled={loading}
                />
              </fieldset>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-[39px] sm:grid-cols-2">
              <button
                type="submit"
                disabled={loading}
                className="flex h-[67px] items-center justify-center gap-2.5 rounded-lg border border-dark-gray px-6 text-xl font-medium text-dark-gray transition-all hover:bg-dark-gray/5 disabled:opacity-50"
              >
                <span>{loading ? "Logging in..." : "Log in"}</span>
                <Image
                  src="/arrow-right.svg"
                  alt=""
                  width={13}
                  height={14}
                />
              </button>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="flex h-[67px] items-center gap-6 rounded-lg border border-dark-gray px-[27px] text-xl font-medium text-dark-gray transition-all hover:bg-dark-gray/5 disabled:opacity-50"
              >
                <Image
                  src="/google-icon.svg"
                  alt=""
                  width={38}
                  height={38}
                />
                <span>
                  {loading ? "Signing in..." : "Log in With Google"}
                </span>
              </button>
            </div>
          </form>

          <div className="mt-10 pb-10 text-center">
            <Link
              href="/waitlist"
              className="text-xl font-medium text-dark-gray underline hover:text-black"
            >
              Don&apos;t Already Have an Account?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
