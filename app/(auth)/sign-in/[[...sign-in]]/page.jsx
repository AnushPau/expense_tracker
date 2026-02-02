import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-zinc-950 overflow-hidden">

      <div className="pointer-events-none absolute -inset-40 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 blur-[150px]" />

      <div className="relative z-10">
        <SignIn />
      </div>

    </div>
  );
}
