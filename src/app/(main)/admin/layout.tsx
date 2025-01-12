import { auth } from "@/lib/auth";
import { db, user } from "@/lib/drizzle/db";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/sidebar";
import type { Metadata } from "next";
export const metadata: Metadata = {
	title: {
		absolute: "Admin | Stardust",
		template: " %s | Stardust",
	},
};
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
	const userSession = await auth();
	const [{ isAdmin }] = await db
		.select({ isAdmin: user.isAdmin })
		.from(user)
		.where(eq(user.email, userSession?.user?.email as string));
	if (!isAdmin) {
		return redirect("/");
	}
	return (
		<>
			<AdminSidebar />
			<div className="ml-48 h-full">{children}</div>
		</>
	);
}
