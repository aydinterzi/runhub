import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  UserProfile,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import ModeToggle from "./DarkModeToggle";

const Navbar = () => {
  return (
    <nav className="sticky z-[100] h-14 top-0 left-0 w-full border-b ">
      <MaxWidthWrapper>
        <div className="flex h-14 justify-between items-center">
          <Link href="/" className="font-semibold z-40 text-xl text-black">
            run<span className="bg-orange-500">hub</span>
          </Link>
          <div className="flex items-center gap-8">
            <ModeToggle />
            <SignedOut>
              <Button>
                <SignInButton />
              </Button>
            </SignedOut>
            <SignedIn>
              <Button>
                <Link className="font-medium" href="/organize">
                  organize a run
                </Link>
              </Button>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
