// @/app/login/page.tsx
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

const AuthPage = ({ params }: { params: { slug: string } }) => {
  return (
    <section className="flex justify-center bg-ivory-200 items-center min-h-screen">
      <div className="w-[400px] p-4 bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="px-6 py-4 flex flex-col justify-content items-center">
          <div className="font-bold text-primary text-3xl">Makerhub</div>
          <p className="text-black text-3xl font-bold mt-6">
            {params.slug === "signup" ? "Create An Account" : "Welcome back"}
          </p>
          <p className="text-sm mt-1">
            {params.slug === "signup"
              ? "Join us and start building today"
              : "Sign in to continue your journey"}
          </p>

          <form
            className="w-full"
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <button
              type="submit"
              className="text-white w-full mt-6  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"
            >
              <svg
                className="mr-2 -ml-1 w-4 h-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Continue with Google<div></div>
            </button>
          </form>

          <span className="text-sm mt-6">
            {params.slug === "signup"
              ? "Already have an account?"
              : "Don't have an account?"}
            <a
              className="text-primary"
              href={params.slug === "signup" ? "/auth/login" : "/auth/signup"}
            >
              {params.slug === "signup" ? " Sign in" : " Sign up"}
            </a>
          </span>
        </div>
      </div>
    </section>
  );
};

export default AuthPage;
