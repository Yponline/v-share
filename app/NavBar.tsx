import Link from "next/link";
import { FaPlayCircle } from "react-icons/fa";

const NavBar = () => {
	const links = [
		{ label: "Dashboard", href: "/dashboard" },
		{ label: "Videos", href: "/videos" },
	];
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
						<Link href={link.href} className="text-zinc-600 hover:text-black">
							{link.label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default NavBar;
