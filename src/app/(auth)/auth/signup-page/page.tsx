"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ebGaramond } from "@/app/ui/fonts";
import { type SignupFormData, INITIAL_FORM_DATA } from "./types";
import StepCreateAccount from "./steps/StepCreateAccount";
import StepAboutYou from "./steps/StepAboutYou";
import StepInterests from "./steps/StepInterests";
import StepCompetitionPrefs from "./steps/StepCompetitionPrefs";
import StepExperience from "./steps/StepExperience";
import StepMotivation from "./steps/StepMotivation";
import StepFinal from "./steps/StepFinal";
import { createClient } from "@/utils/supabase/client";
import { signUpUser, saveOAuthProfile } from "./actions";

const TOTAL_STEPS = 7;

const STEP_QUOTES: React.ReactNode[] = [
  <>
    Find what
    <br />
    inspires <em className="text-cream">you</em>
  </>,
  <>
    Tell us
    <br />
    about <em className="text-cream">yourself</em>
  </>,
  <>
    What
    <br />
    <em className="text-cream">excites</em>
    <br />
    you?
  </>,
  <>
    How do
    <br />
    you <em className="text-cream">compete</em>?
  </>,
  <>
    Share your
    <br />
    <em className="text-cream">experience</em>
  </>,
  <>
    What
    <br />
    <em className="text-cream">drives</em>
    <br />
    you?
  </>,
  <>
    You&apos;re
    <br />
    almost
    <br />
    <em className="text-cream">there</em>
  </>,
];

const STEP_TITLES = [
  "Create Account",
  "About You",
  "Your Interests",
  "Competition Preferences",
  "Your Experience",
  "What Drives You",
  "Almost There",
];

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 13.2004 13.9166"
      fill="currentColor"
      className={`w-[13px] h-[14px] inline-block ${className}`}
    >
      <path d="M12.5883,5.9254l-10.86,-5.783c-0.912,-0.487 -1.968,0.356 -1.68,1.342l1.488,5.153c0.06,0.214 0.06,0.428 0,0.642l-1.488,5.153c-0.288,0.986 0.768,1.829 1.68,1.342l10.86,-5.783c0.185,-0.1 0.34,-0.248 0.448,-0.428c0.107,-0.179 0.164,-0.384 0.164,-0.593c0,-0.209 -0.057,-0.414 -0.164,-0.594c-0.108,-0.18 -0.263,-0.327 -0.448,-0.427z" />
    </svg>
  );
}

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stepFromUrl = searchParams.get("step");
  const code = searchParams.get("code");
  const initialStep = stepFromUrl
    ? Math.min(TOTAL_STEPS, Math.max(2, parseInt(stepFromUrl, 10) || 1))
    : 1;
  const [step, setStep] = useState(initialStep);
  const [formData, setFormData] = useState<SignupFormData>(INITIAL_FORM_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isOAuthUser, setIsOAuthUser] = useState(false);

  // If OAuth redirected to /signup?code=... instead of /auth/callback, send the code to the callback so the session is created, then user is redirected to /signup?step=2
  useEffect(() => {
    if (!code) return;
    const next = encodeURIComponent("/signup?step=2");
    router.replace(`/auth/callback?code=${encodeURIComponent(code)}&next=${next}`);
  }, [code, router]);

  // Detect if user is already authenticated via OAuth (came from step=2 redirect)
  useEffect(() => {
    if (!stepFromUrl) return;
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setIsOAuthUser(true);
        // Pre-fill name/email from the OAuth provider
        const meta = user.user_metadata ?? {};
        updateFormData({
          email: user.email ?? "",
          firstName: meta.full_name?.split(" ")[0] ?? meta.first_name ?? "",
          lastName: meta.full_name?.split(" ").slice(1).join(" ") ?? meta.last_name ?? "",
          username: meta.preferred_username ?? meta.name ?? "",
        });
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (code) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-olive font-space-grotesk">
        <div className="text-cream">Completing sign in...</div>
      </div>
    );
  }

  const updateFormData = (updates: Partial<SignupFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    if (!isOAuthUser && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setStep(1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setLoading(true);
    setError(null);

    const result = isOAuthUser
      ? await saveOAuthProfile(formData)
      : await signUpUser(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setLoading(false);
    if (!isOAuthUser && result.requiresConfirmation) {
      setSubmitted(true);
    } else {
      router.push("/dashboard");
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const returnToSignup = `${window.location.origin}/auth/callback?next=${encodeURIComponent("/signup?step=2")}`;
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: returnToSignup,
      },
    });
    if (oauthError) {
      setError(oauthError.message);
      setLoading(false);
    }
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === TOTAL_STEPS) {
      await handleSubmit();
    } else {
      handleNext();
    }
  };

  const stepProps = { formData, updateFormData };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepCreateAccount {...stepProps} />;
      case 2:
        return <StepAboutYou {...stepProps} />;
      case 3:
        return <StepInterests {...stepProps} />;
      case 4:
        return <StepCompetitionPrefs {...stepProps} />;
      case 5:
        return <StepExperience {...stepProps} />;
      case 6:
        return <StepMotivation {...stepProps} />;
      case 7:
        return <StepFinal {...stepProps} />;
      default:
        return null;
    }
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-olive px-6 font-space-grotesk">
        <div className="max-w-md rounded-2xl bg-cream px-10 py-12 text-center shadow-lg">
          <Image
            src="/il_foro_logo_signup.png"
            alt="Il Foro Logo"
            width={120}
            height={120}
            className="mx-auto mb-6 h-auto w-[100px]"
          />
          <h2 className="mb-3 text-4xl font-medium">
            Check your email
          </h2>
          <p className="mb-6 text-base text-dark-gray/70">
            We sent a confirmation link to{" "}
            <span className="font-semibold text-dark-gray">{formData.email}</span>.
            Click it to activate your account, then log in.
          </p>
          <Link
            href="/login"
            className="inline-flex h-[52px] items-center justify-center rounded-lg border border-dark-gray px-8 text-base font-medium text-dark-gray transition-all hover:bg-dark-gray/5"
          >
            Go to Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-olive font-space-grotesk">
      {/* Left Side - Decorative */}
      <div className="relative hidden shrink-0 lg:block lg:w-[25.9%]">
        <div className="absolute inset-0">
          <Image
            src="/decorative-pattern.svg"
            alt="Decorative pattern"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 px-[3.6%] pt-[55px]">
          <h1
            className={`${ebGaramond.className} text-[clamp(40px,4.4vw,64px)] font-medium leading-[0.9] text-black`}
          >
            {STEP_QUOTES[step - 1]}
          </h1>
        </div>
      </div>

      {/* Right Side - Cream Form Panel */}
      <div className="flex flex-1 overflow-y-auto bg-cream lg:rounded-l-[30px]">
        <div className="w-full px-6 py-8 sm:px-10 lg:px-[8%] lg:py-0">
          {/* Header: Logo + Progress */}
          <div className="flex items-center justify-between">
            <div className="flex justify-center lg:justify-start">
              <Image
                src="/il_foro_logo_signup.png"
                alt="Il Foro Logo"
                width={213}
                height={213}
                className="h-auto w-[120px] sm:w-[150px] lg:w-[14.8vw] lg:max-w-[180px]"
              />
            </div>

            {/* Progress Dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: TOTAL_STEPS }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    if (i + 1 < step) setStep(i + 1);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i + 1 === step
                      ? "w-8 bg-olive"
                      : i + 1 < step
                        ? "w-2.5 cursor-pointer bg-olive/60"
                        : "w-2.5 bg-dark-gray/20"
                  }`}
                  aria-label={`Step ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Step Title */}
          <h2 className="mb-[5.7%] mt-[1.6%] text-center text-3xl font-bold text-black lg:text-left lg:text-[32px]">
            {STEP_TITLES[step - 1]}
          </h2>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 rounded-lg border border-red-400 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Step Content */}
          <form onSubmit={onFormSubmit}>
            {renderStep()}

            {/* Navigation */}
            {step === 1 ? (
              <>
                <div className="mt-[74px] grid grid-cols-1 gap-[39px] sm:grid-cols-2">
                  <button
                    type="submit"
                    className="flex h-[67px] items-center justify-center gap-[10px] rounded-lg border border-dark-gray px-6 text-xl font-medium text-dark-gray transition-all hover:bg-dark-gray/5"
                  >
                    <span className="font-space-grotesk">Create Account</span>
                    <ArrowRight />
                  </button>

                  <button
                    type="button"
                    onClick={handleGoogleSignup}
                    className="flex h-[67px] items-center justify-center gap-6 rounded-lg border border-dark-gray px-6 text-xl font-medium text-dark-gray transition-all hover:bg-dark-gray/5"
                  >
                    <Image
                      src="/google-icon.svg"
                      alt="Google"
                      width={38}
                      height={38}
                      className="inline-block"
                    />
                    <span className="font-space-grotesk">
                      Sign Up With Google
                    </span>
                  </button>
                </div>

                <div className="mt-[45px] pb-10 text-center">
                  <Link
                    href="/login"
                    className="text-xl font-medium text-dark-gray hover:underline font-space-grotesk"
                  >
                    Already Have An Account?
                  </Link>
                </div>
              </>
            ) : (
              <div className="mt-[74px] grid grid-cols-2 gap-[39px] pb-10">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex h-[67px] items-center justify-center gap-[10px] rounded-lg border border-dark-gray px-6 text-xl font-medium text-dark-gray transition-all hover:bg-dark-gray/5"
                >
                  <ArrowRight className="rotate-180" />
                  <span className="font-space-grotesk">Back</span>
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className={`flex h-[67px] items-center justify-center gap-[10px] rounded-lg border px-6 text-xl font-medium transition-all disabled:opacity-50 ${
                    step === TOTAL_STEPS
                      ? "border-olive bg-olive text-cream hover:bg-olive/90"
                      : "border-dark-gray text-dark-gray hover:bg-dark-gray/5"
                  }`}
                >
                  <span>
                    {loading && step === TOTAL_STEPS
                      ? "Creating account..."
                      : step === TOTAL_STEPS
                        ? "Complete Sign Up"
                        : "Next"}
                  </span>
                  {!loading && <ArrowRight />}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-olive">
          <div className="text-cream">Loading...</div>
        </div>
      }
    >
      <SignupContent />
    </Suspense>
  );
}
