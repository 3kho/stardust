import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
const inter = Inter({ subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--mono" });
const shouldDisplayMetadata = () =>
	process.env.METADATA_URL &&
	(headers().get("x-forwarded-host") ?? headers().get("host"))?.includes(new URL(process.env.METADATA_URL).host);
export function generateMetadata(): Metadata {
	return {
		title: {
			default: "Stardust",
			template: "%s | Stardust",
		},
		description: shouldDisplayMetadata()
			? "Stardust is the platform for streaming isolated desktop containers."
			: undefined,
		openGraph: shouldDisplayMetadata()
			? {
					title: "Stardust",
					description: "Stardust is the platform for streaming isolated desktop containers.",
					type: "website",
					url: "https://stardust.spaceness.one",
				}
			: undefined,
	};
}
export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.className} ${jetbrains.variable}`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					themes={["light", "dark", "slate", "zinc"]}
					enableSystem
					disableTransitionOnChange
				>
					<Toaster richColors theme="system" position="top-center" />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
