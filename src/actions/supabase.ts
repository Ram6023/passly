"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { encrypt } from "./cipher";
import { supabase } from "@/lib/supabase";

export const addPassword = async (passwordData: {
    title: string;
    username: string;
    password: string;
    category: string;
    email?: string;
    notes?: string;
    url?: string;
}) => {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();
        if (!user) {
            throw new Error("User not found");
        }

        const encryptedPassword = encrypt(passwordData.password);
        const { data, error } = await supabase
            .from("passwords")
            .insert([
                {
                    userId: user.id,
                    title: passwordData.title,
                    userName: passwordData.username,
                    password: encryptedPassword,
                    email: passwordData.email,
                    category: passwordData.category,
                    notes: passwordData.notes,
                    url: passwordData.url,
                },
            ])
            .select()
            .single();

        if (error) throw error;

        console.log("Password saved:", data);
        revalidatePath("/pw");
        return data;
    } catch (error) {
        console.error("Failed to save password:", error);
        return null;
    }
};

export const fetchPasswords = async () => {
    try {
        const { getUser } = getKindeServerSession();
        const user = await getUser();
        if (!user) {
            throw new Error("User not found");
        }

        const { data, error } = await supabase
            .from("passwords")
            .select("*")
            .eq("userId", user.id);

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Failed to fetch passwords:", error);
        return null;
    }
};

export const deletePassword = async (passwordId: string) => {
    try {
        const { error } = await supabase
            .from("passwords")
            .delete()
            .eq("id", passwordId);

        if (error) throw error;

        revalidatePath("/pw");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete password:", error);
        return null;
    }
};

export const updatePassword = async (passwordData: {
    id: string;
    title: string;
    username: string;
    password: string;
    category: string;
    email?: string;
    notes?: string;
    url?: string;
}) => {
    try {
        const encryptedPassword = encrypt(passwordData.password);
        const { data, error } = await supabase
            .from("passwords")
            .update({
                title: passwordData.title,
                userName: passwordData.username,
                password: encryptedPassword,
                email: passwordData.email,
                category: passwordData.category,
                notes: passwordData.notes,
                url: passwordData.url,
            })
            .eq("id", passwordData.id)
            .select()
            .single();

        if (error) throw error;

        console.log("Password updated:", data);
        revalidatePath("/pw");
        return data;
    } catch (error) {
        console.error("Failed to update password:", error);
        return null;
    }
};

export const passwordById = async (passwordId: string) => {
    try {
        const { data, error } = await supabase
            .from("passwords")
            .select("*")
            .eq("id", passwordId)
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Failed to fetch password:", error);
        return null;
    }
};
