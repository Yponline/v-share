import { Card } from "@/components/ui/card";
import prisma from "@/prisma/client";
import "next-cloudinary/dist/cld-video-player.css";
import { notFound } from "next/navigation";
import DeleteBtn from "./DeleteBtn";
import Description from "./Description";
import EditBtn from "./EditBtn";
import Title from "./Title";
import VideoPlayer from "./VideoPlayer";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/AuthOptions";

interface Props {
	params: Promise<{ id: string }>;
}

const VideoDetailPage = async ({ params }: Props) => {
	const session = await getServerSession(authOptions);
	const { id } = await params;

	if (!id) notFound();

	const video = await prisma.video.findUnique({
		where: { id },
	});

	if (!video) notFound();

	return (
		<div className="mx-auto md:max-w-6xl md:w-7/12 ">
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
				{session && (
					<div className="flex flex-col gap-4 items-start justify-center ">
						<EditBtn id={video.id} />
						<DeleteBtn id={video.id} />
					</div>
				)}
			</Card>
		</div>
	);
};

export default VideoDetailPage;
