'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/src/utils/supabase/client';
import { ebGaramond, spaceGrotesk } from '@/src/app/ui/fonts';
import { Suspense } from 'react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/dashboard';
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else if (data.user) {
        setMessage('Login successful! Redirecting...');
        router.push(redirectTo);
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
        },
      });

      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${spaceGrotesk.className} relative flex min-h-screen bg-bark`}>
      {/* Left Side - Decorative */}
      <div className="relative hidden shrink-0 lg:block lg:w-[25.9%]">
        <div className="absolute inset-0">
          <Image
            src="/decorative-pattern-red.svg"
            alt="Decorative pattern"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Heading */}
        <div className="relative z-10 px-[3.6%] pt-[55px]">
          <h1 className={`${ebGaramond.className} text-[clamp(40px,4.4vw,64px)] font-medium leading-[0.9] text-black`}>
            Discover,
            <br />
            connect, and
            <br />
            then
            <br />
            <em className="italic text-cream">discover again</em>
          </h1>
        </div>
      </div>

      {/* Right Side - Cream Form Panel */}
      <div className="flex flex-1 overflow-y-auto bg-cream lg:rounded-l-[30px]">
        {/* Form content with proportional padding */}
        <div className="w-full px-6 py-8 sm:px-10 lg:px-[8%] lg:py-0">
          {/* Logo */}
          <div className="flex justify-center lg:justify-start">
            <Link href="/">
              <Image
                src="/marketing-page-assets/il-foro-logo.png"
                alt="Il Foro Logo"
                width={213}
                height={213}
                className="h-auto w-[150px] sm:w-[180px] lg:w-[14.8vw] lg:max-w-[213px]"
                priority
              />
            </Link>
          </div>

          {/* Title */}
          <h2 className="mb-[5.7%] mt-[1.6%] text-center text-3xl font-bold text-black lg:text-left lg:text-[32px]">
            Log In
          </h2>

          {/* Alert Messages */}
          {error && (
            <div className="mt-[24px] rounded-lg border border-red-400 bg-red-50 p-3 text-red-700">
              {error}
            </div>
          )}

          {message && (
            <div className="mt-[24px] rounded-lg border border-green-400 bg-green-50 p-3 text-green-700">
              {message}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin}>
            {/* Form Grid */}
            <div className="grid grid-cols-1 gap-x-[39px] gap-y-[40px] sm:grid-cols-2">
              {/* Email - spans full width */}
              <fieldset className="h-[73px] rounded-lg border border-dark-gray px-[23px] py-[10px] sm:col-span-2">
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

              {/* Password - spans full width */}
              <fieldset className="h-[73px] rounded-lg border border-dark-gray px-[23px] py-[10px] sm:col-span-2">
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

            {/* Buttons Row */}
            <div className="mt-[74px] grid grid-cols-1 gap-[39px] sm:grid-cols-2">
              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="flex h-[67px] items-center justify-center gap-[10px] rounded-lg border border-dark-gray px-6 text-xl font-medium text-dark-gray transition-all hover:bg-dark-gray/5 disabled:opacity-50"
              >
                <span>{loading ? 'Logging in...' : 'Log In'}</span>
                <Image
                  src="/marketing-page-assets/HeroWelcome-assets/arrow-up-right.svg"
                  alt="Arrow"
                  width={13}
                  height={14}
                  className="inline-block"
                />
              </button>

              {/* Google Login Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="flex h-[67px] items-center justify-center gap-6 rounded-lg border border-dark-gray px-6 text-xl font-medium text-dark-gray transition-all hover:bg-dark-gray/5 disabled:opacity-50"
              >
                <Image
                  src="/google-icon.svg"
                  alt="Google"
                  width={38}
                  height={38}
                  className="inline-block"
                />
                <span>{loading ? 'Signing in...' : 'Log In With Google'}</span>
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="mt-[45px] pb-10 text-center">
            <Link
              href="/signup"
              className="text-xl font-medium text-dark-gray hover:underline"
            >
              Don't have an account? Sign Up
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

