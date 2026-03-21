// components/VideoPlayer.tsx  (or wherever you want to put it)
// Make sure to add "use client" because CldVideoPlayer uses client-side features (hooks, player controls, etc.)

"use client";

import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css"; // ← Important: import the CSS!

type VideoPlayerProps = {
	publicId: string; // Cloudinary public ID of the video
	width?: number | string; // e.g. 640, "100%", "640px"
	height?: number | string;
	alt?: string; // for accessibility
	id?: string; // optional custom player ID
	className?: string;
	// Add more props you might need from docs:
	// colors?: { base?: string; text?: string; accent?: string };
	// poster?: string | object;
	// transformation?: object;
	// autoPlay?: boolean;
	// muted?: boolean;
	// loop?: boolean;
	controls?: boolean;
} & Omit<
	React.ComponentProps<typeof CldVideoPlayer>,
	"src" | "width" | "height"
>;

export default function VideoPlayer({
	publicId,
	width = 640,
	height = 360,
	alt = "Video player",
	id = `video-${publicId.replace(/\//g, "-")}`, // auto-generate safe ID
	className = "",
	...rest
}: VideoPlayerProps) {
	return (
		<div className={`w-full max-w-[${width}px] ${className}`}>
			<CldVideoPlayer
				id={id}
				width={width}
				height={height}
				src={publicId} // <-- publicId goes here (string like "folder/video-name")
				// Optional useful defaults / overrides:
				// muted={true}
				// loop={true}
				// autoPlay={true}
				// controls={true}
				// poster="https://res.cloudinary.com/.../thumbnail.jpg"  // custom poster
				// colors={{ accent: "#2563eb", base: "#1e293b", text: "#f1f5f9" }} // custom theme
				// transformation={{ quality: "auto", fetch_format: "auto" }}
				{...rest}
			/>
		</div>
	);
}
