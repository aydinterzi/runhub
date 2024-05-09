import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-dvh flex items-center justify-center">
      <SignIn path="/sign-in" />
    </div>
  );
}
