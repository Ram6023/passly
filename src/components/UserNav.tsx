"use client";

import { useState, useEffect } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { AvatarSelector } from "./AvatarSelector";
import Image from "next/image";

export function UserNav({ user }: { user: any }) {
    const [avatar, setAvatar] = useState<string>("");

    useEffect(() => {
        // Load avatar from localStorage on mount
        const savedAvatar = localStorage.getItem(`passly_avatar_${user.id}`);
        if (savedAvatar) {
            setAvatar(savedAvatar);
        } else {
            setAvatar(`https://api.dicebear.com/9.x/notionists/svg?seed=${user.given_name || user.id}`);
        }
    }, [user.id, user.given_name]);

    const handleAvatarChange = (newAvatar: string) => {
        setAvatar(newAvatar);
        localStorage.setItem(`passly_avatar_${user.id}`, newAvatar);
    };

    return (
        <div className="flex items-center gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="relative overflow-hidden rounded-full w-8 h-8 md:w-10 md:h-10 border-2 border-primary/20 hover:border-primary transition-all shadow-sm">
                        <Image
                            src={avatar || `https://api.dicebear.com/9.x/notionists/svg?seed=${user.id}`}
                            alt="User Avatar"
                            fill
                            unoptimized
                            className="object-cover"
                        />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user.given_name || "Friend"}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {user.email || "No email found"}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
                        <AvatarSelector
                            currentAvatar={avatar}
                            userName={user.given_name || user.id}
                            onAvatarChange={handleAvatarChange}
                            trigger={
                                <div className="flex w-full cursor-pointer items-center px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                                    Change Avatar
                                </div>
                            }
                        />
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="cursor-pointer text-red-500 focus:text-red-500">
                        <LogoutLink>
                            Logout
                        </LogoutLink>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
