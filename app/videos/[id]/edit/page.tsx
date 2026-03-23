import prisma from "@/prisma/client";
import { VideoForm } from "../../_components/VideoForm";
import { notFound } from "next/navigation";

interface Props {
	params: Promise<{ id: string }>;
}
const page = async ({ params }: Props) => {
	const { id } = await params;

	if (!id) notFound();

	const video = await prisma.video.findUnique({
		where: { id },
	});

	if (!video) notFound();
	return (
		<div className="px-5">
			<VideoForm video={video} />
		</div>
	);
};

export default page;
