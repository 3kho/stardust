import { db } from "@/lib/drizzle/db";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import type { Metadata } from "next";
export const metadata: Metadata = {
	title: "Sessions",
};
export default async function AdminPage() {
	const data = await db.query.session.findMany({
		with: {
			user: true,
		},
	});
	return (
		<div className="flex h-full flex-col">
			<h1 className="py-6 text-3xl font-bold">Sessions</h1>
			<section className="-ml-8">
				<DataTable data={data} columns={columns} />
			</section>
		</div>
	);
}
