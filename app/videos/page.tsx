import prisma from "@/prisma/client";
import Link from "next/link";
import { Button } from "@radix-ui/themes";
import { Plus } from "lucide-react";
import CldImageWrapper from "./CldImageWrapper"; // or wherever it is

export default async function VideosPage() {
	const videos = await prisma.video.findMany({
		orderBy: { createdAt: "desc" }, // ← added back (good practice)
	});

	return (
		<div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
			<div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
				<h1 className="text-3xl font-bold text-gray-900">Videos</h1>

				<Link href="/videos/new-video">
					<Button variant="solid" size="3" className="gap-2">
						<Plus size={18} />
						Add Video
					</Button>
				</Link>
			</div>

			{videos.length === 0 ? (
				<div className="flex flex-col items-center justify-center py-20 text-center">
					<p className="mb-6 text-xl text-gray-600">No videos yet</p>
					<Link href="/videos/new-video">
						<Button variant="soft" size="3">
							Add your first video
						</Button>
					</Link>
				</div>
			) : (
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					{videos.map((video) => (
						<Link
							key={video.id}
							href={`/videos/${video.id}`}
							className="group block overflow-hidden rounded-xl border bg-white shadow hover:shadow-lg hover:border-blue-400 transition dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-blue-600">
							<div className="relative aspect-video bg-black/10">
								<CldImageWrapper
									src={video.publicId}
									width={640}
									height={360}
									alt={video.title || "Video thumbnail"}
									assetType="video"
									crop="thumb"
									gravity="auto"
									quality="auto"
									format="auto"
									className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
									// time="3"          // ← uncomment if you want a specific frame
								/>

								{/* Play overlay */}
								<div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
									<div className="rounded-full bg-white/20 p-5 backdrop-blur-sm">
										<svg
											className="h-10 w-10 text-white"
											fill="currentColor"
											viewBox="0 0 24 24">
											<path d="M8 5v14l11-7z" />
										</svg>
									</div>
								</div>
							</div>

							<div className="p-4">
								<h3 className="line-clamp-2 font-medium text-gray-900 dark:text-white">
									{video.title}
								</h3>

								{video.description?.trim() && (
									<p className="mt-1.5 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
										{video.description}
									</p>
								)}

								<p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
									{new Date(video.createdAt).toLocaleDateString("en-US", {
										year: "numeric",
										month: "short",
										day: "numeric",
									})}
								</p>
							</div>
						</Link>
					))}
				</div>
			)}
		</div>
	);
}

export const dynamic = "force-dynamic";
