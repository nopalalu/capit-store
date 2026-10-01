import connDB from "@/config/db";
import User from "@/models/User";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { userId } = getAuth(request)
        await connDB()
        let user = await User.findById(userId)
        if (!user) {
            // Self-heal: user exists in Clerk but was never synced to DB
            // (e.g. signed up before the Inngest webhook was configured)
            const client = await clerkClient()
            const clerkUser = await client.users.getUser(userId)
            user = await User.create({
                _id: userId,
                email: clerkUser.emailAddresses[0]?.emailAddress || "",
                name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
                imageUrl: clerkUser.imageUrl,
            })
        }
        return NextResponse.json({ success: true, user })
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })
    }
}