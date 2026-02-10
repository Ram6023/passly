"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AVATAR_OPTIONS = [
    // Modern / AI Illustrated
    { style: "notionists", seeds: ["Felix", "Aneka", "Midnight", "Shadow", "Spark", "Gizmo"] },
    { style: "dylan", seeds: ["Blue", "Red", "Green", "Yellow", "Purple", "Orange"] },

    // Feminine leaning
    { style: "lorelei", seeds: ["Aneka", "Jasmine", "Maya", "Lulu"] },
    { style: "avataaars", seeds: ["Sophia", "Olivia", "Emma", "Isabella"] },

    // Masculine leaning
    { style: "adventurer", seeds: ["Felix", "Max", "Leo", "Jack"] },
    { style: "open-peeps", seeds: ["George", "Henry", "Arthur", "Oscar"] },

    // Fun / Mixed
    { style: "bottts", seeds: ["Beeper", "Robby", "Spark", "Gizmo"] },
    { style: "pixel-art", seeds: ["Mario", "Link", "Zelda", "Cloud"] },
];

export function AvatarSelector({
    currentAvatar,
    userName,
    onAvatarChange,
    trigger,
}: {
    currentAvatar: string;
    userName: string;
    onAvatarChange: (newAvatar: string) => void;
    trigger?: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);

    // Generate a list of avatar options
    const avatarOptions = AVATAR_OPTIONS.flatMap((group) =>
        group.seeds.map((seed) => `https://api.dicebear.com/9.x/${group.style}/svg?seed=${seed}`)
    );

    const handleApply = (avatarUrl: string) => {
        onAvatarChange(avatarUrl);
        setOpen(false);
        toast.success("Avatar updated!");
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <button className="relative group overflow-hidden rounded-full w-8 h-8 md:w-10 md:h-10 border-2 border-primary/20 hover:border-primary transition-all">
                        <Image
                            src={currentAvatar || `https://api.dicebear.com/9.x/notionists/svg?seed=${userName}`}
                            alt="User Avatar"
                            fill
                            unoptimized
                            className="object-cover"
                        />
                    </button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Choose your Avatar</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 p-4">
                    {avatarOptions.map((url, index) => (
                        <button
                            key={index}
                            onClick={() => handleApply(url)}
                            className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all hover:scale-110 ${currentAvatar === url ? "border-primary ring-2 ring-primary/20" : "border-transparent"
                                }`}
                        >
                            <Image src={url} alt={`Avatar option ${index}`} fill unoptimized />
                        </button>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}
