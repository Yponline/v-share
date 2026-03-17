import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const page = () => {
	return (
		<div>
			<Link href="/videos/new-video">
				<Button>Add Video</Button>
			</Link>
		</div>
	);
};

export default page;
