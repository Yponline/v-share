import Link from "next/link";
import { FaPlayCircle } from "react-icons/fa";

const NavBar = () => {
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
				<li>
					<Link href="/dashboard" className="text-zinc-600 hover:text-black">
						Dashboard
					</Link>
				</li>

				<li>
					<Link href="/videos" className="text-zinc-600 hover:text-black">
						Videos
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
