// app/videos/[id]/page.tsx
// (keep as Server Component – no "use client" needed here)

import { Card } from "@/components/ui/card";
import prisma from "@/prisma/client";
import "next-cloudinary/dist/cld-video-player.css";
import { notFound } from "next/navigation";
import Description from "./Description";
import Title from "./Title";
import VideoPlayer from "./VideoPlayer";
import Link from "next/link";
import { Button } from "@radix-ui/themes";

interface Props {
	params: Promise<{ id: string }>;
}

const VideoDetailPage = async ({ params }: Props) => {
	const { id } = await params;

	if (!id) notFound();

	const video = await prisma.video.findUnique({
		where: { id },
	});

	if (!video) notFound();

	return (
		<div className="mx-auto md:max-w-6xl w-6/12 ">
			{/* Responsive wrapper with fixed aspect ratio */}
			<div className="aspect-video overflow-hidden rounded-t-2xl border border-gray-200 shadow-2xl dark:border-gray-700">
				<VideoPlayer
					publicId={video.publicId}
					width="16"
					height="9" // ← key change: use 100% inside aspect container
					className="h-full w-full"
				/>
			</div>
			<Card className="mx-auto w-full rounded-none gap-2 flex-row justify-between px-3">
				<div>
					<Title title={video.title} />

					{video.description && <Description description={video.description} />}
				</div>
				<div className="flex items-center justify-center">
					<Link href={`${id}/edit`}>
						<Button className="hover:cursor-pointer">Edit</Button>
					</Link>
				</div>
			</Card>
		</div>
	);
};

export default VideoDetailPage;
