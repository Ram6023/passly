import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { ThemeToggle } from "./themebutton";
import { UserNav } from "./UserNav";

export default async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <header className="fixed bg-background/20 border-b backdrop-blur-md p-2 w-full top-0 z-50">
      <nav className="w-full max-w-6xl mx-auto flex items-center justify-between">
        <Link href={"/pw"} className="flex items-center justify-center">
          <Image
            src={"/logo-base-256x256.png"}
            priority
            alt="Passly Logo"
            className="active:hue-rotate-60 transition-all hover:animate-spin"
            width={50}
            height={50}
          />
          <h1 className="text-2xl md:text-3xl font-bold">Passly</h1>
        </Link>
        <div className="flex gap-2 sm:gap-4 items-center">
          <ThemeToggle />
          {user ? (
            <UserNav user={user} />
          ) : (
            <LoginLink>
              <Button>Login</Button>
            </LoginLink>
          )}
        </div>
      </nav>
    </header>
  );
}
