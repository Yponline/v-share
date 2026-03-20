// app/videos/[id]/page.tsx
// (keep as Server Component – no "use client" needed here)

import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import VideoPlayer from "./Player";
import "next-cloudinary/dist/cld-video-player.css";

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
		<div className="min-h-screen bg-gray-50 px-4 py-12 md:px-8">
			<div className="mx-auto max-w-6xl">
				<h1 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
					{video.title}
				</h1>

				{video.description && (
					<p className="mb-8 text-lg leading-relaxed text-gray-700">
						{video.description}
					</p>
				)}

				{/* Responsive wrapper with fixed aspect ratio */}
				<div className="aspect-video w-full overflow-hidden rounded-2xl border border-gray-200 shadow-2xl dark:border-gray-700">
					<VideoPlayer
						publicId={video.publicId}
						width="16"
						height="9" // ← key change: use 100% inside aspect container
						className="h-full w-full"
					/>
				</div>

				<div className="mt-6 text-sm text-gray-500">
					Added on{" "}
					{new Date(video.createdAt).toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</div>
			</div>
		</div>
	);
};

export default VideoDetailPage;
