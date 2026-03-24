"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPlayCircle } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";

const NavBar = () => {
	const { status, data: session } = useSession();

	const links = [
		{ label: "Dashboard", href: "/dashboard" },
		{ label: "Videos", href: "/videos" },
	];

	const pathname = usePathname();

	return (
		<nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
			{/* logo  */}
			<Link
				href="/"
				className="flex items-center space-x-2 border border-black rounded-2xl px-2 py-0.5 text-black hover:text-zinc-700">
				<span>
					<FaPlayCircle />
				</span>
				<p>V-Share</p>
			</Link>
			{/* links */}
			<ul className="flex space-x-6">
				{links.map((link) => (
					<li key={link.label}>
						<Link
							href={link.href}
							className={`text-zinc-600 hover:text-black ${pathname === link.href ? "border-b border-black text-black" : "border-none"}`}>
							{link.label}
						</Link>
					</li>
				))}
			</ul>
			<Box>
				{status === "authenticated" && (
					<Link href="/api/auth/signout">Signout</Link>
				)}
				{status === "unauthenticated" && (
					<Link href="/api/auth/signin">Signin</Link>
				)}
			</Box>
		</nav>
	);
};

export default NavBar;
