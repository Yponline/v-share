"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	InputGroupTextarea,
} from "@/components/ui/input-group";

import { CldUploadWidget, CldImage } from "next-cloudinary";
import { useState } from "react";
import { Video } from "@prisma/client";

interface Props {
	video?: Video;
}

// Use the schema you want to send to the API
export const formSchemaB = z.object({
	title: z
		.string()
		.min(5, "Title must be at least 5 characters.")
		.max(32, "Title must be at most 32 characters."),
	description: z
		.string()
		.min(10, "Description must be at least 10 characters.")
		.max(100, "Description must be at most 100 characters."),
	publicId: z.string().min(1, "Please upload a video first"),
});

type FormValues = z.infer<typeof formSchemaB>;

export function VideoForm({ video }: Props) {
	const [previewPublicId, setPreviewPublicId] = useState<string | null>(null);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchemaB),
		defaultValues: {
			title: video?.title ?? "",
			description: video?.description ?? "",
			publicId: video?.publicId ?? "", // assuming Video has publicId field
		},
		mode: "onChange", // optional: better real-time validation
	});

	const { handleSubmit, setValue, formState, reset } = form;

	async function onSubmit(data: FormValues) {
		try {
			toast.info("Uploading video...", { id: "video-upload" });

			const response = await axios.post("/api/videos", data, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			toast.dismiss("video-upload");
			toast.success("Video uploaded successfully!");

			console.log("Server response:", response.data);

			// Optional: reset form + preview after success
			reset();
			setPreviewPublicId(null);
		} catch (err: any) {
			toast.dismiss("video-upload");

			const message =
				err.response?.data?.message ||
				err.message ||
				"Failed to upload video. Please try again.";

			toast.error(message);
			console.error("Upload error:", err);
		}
	}

	return (
		<div className="flex flex-col sm:flex-row gap-8">
			<Card className="w-full sm:max-w-md border-none shadow-none md:shadow">
				<CardHeader>
					<CardTitle>Video Upload</CardTitle>
					<CardDescription>Share your videos for free</CardDescription>
				</CardHeader>
				<CardContent>
					<form id="video-upload-form" onSubmit={handleSubmit(onSubmit)}>
						<FieldGroup>
							{/* Title */}
							<Controller
								name="title"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="title">Title</FieldLabel>
										<Input
											{...field}
											id="title"
											placeholder="Enter video title"
											autoComplete="off"
											aria-invalid={fieldState.invalid}
										/>
										{fieldState.error && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>

							{/* Description */}
							<Controller
								name="description"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="description">Description</FieldLabel>
										<InputGroup>
											<InputGroupTextarea
												{...field}
												id="description"
												placeholder="Describe your video..."
												rows={6}
												className="min-h-24 resize-none"
												aria-invalid={fieldState.invalid}
											/>
											<InputGroupAddon align="block-end">
												<InputGroupText className="tabular-nums">
													{field.value?.length || 0}/100
												</InputGroupText>
											</InputGroupAddon>
										</InputGroup>
										<FieldDescription>
											Max 100 characters. Be clear and engaging.
										</FieldDescription>
										{fieldState.error && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>

							{/* Hidden field for publicId – controlled via setValue */}
							<Controller
								name="publicId"
								control={form.control}
								render={({ fieldState }) => (
									<>
										{fieldState.error && (
											<div className="text-destructive text-sm mt-1">
												{fieldState.error.message}
											</div>
										)}
									</>
								)}
							/>
							{/* Upload & Preview Area */}
							<div className="flex flex-col items-start gap-4">
								<CldUploadWidget
									uploadPreset="hotkmv5r" // ← make sure this preset allows video!
									// You can also pass resource_type: "video" in signature / preset config
									onSuccess={(result, { widget }) => {
										if (result.event !== "success") return;

										const info = result.info as {
											public_id: string;
											resource_type: string;
										};

										console.log("Uploaded:", info);

										if (info.resource_type !== "video") {
											toast.warning("Please upload a video file");
											return;
										}

										// Save to form + preview
										setValue("publicId", info.public_id, {
											shouldValidate: true,
										});
										setPreviewPublicId(info.public_id);

										widget.close();
									}}
									onQueuesEnd={(result, { widget }) => {
										// Optional: close if user cancels / queue ends
									}}>
									{({ open }) => (
										<Button type="button" onClick={() => open()}>
											Select Video
										</Button>
									)}
								</CldUploadWidget>

								{previewPublicId && (
									<div className="border rounded overflow-hidden bg-black/40">
										<CldImage
											src={previewPublicId}
											width={320}
											height={180}
											alt="Video thumbnail preview"
											assetType="video"
											crop="thumb"
											// or choose exact time:
											// time="5"           // 5 seconds in
											// or range: time="0:10" (first 10s → picks best frame)
										/>
										<p className="text-xs text-center text-muted-foreground p-2">
											Video uploaded ready to submit
										</p>
									</div>
								)}
							</div>
						</FieldGroup>
					</form>
				</CardContent>

				<CardFooter>
					<div className="flex gap-3 w-full sm:w-auto">
						<Button
							type="button"
							variant="outline"
							onClick={() => {
								reset();
								setPreviewPublicId(null);
							}}>
							Reset
						</Button>
						{video ? (
							<Button
								type="submit"
								form="video-upload-form"
								disabled={formState.isSubmitting}>
								{formState.isSubmitting ? "Updating..." : "Update Video Data"}
							</Button>
						) : (
							<Button
								type="submit"
								form="video-upload-form"
								disabled={formState.isSubmitting}>
								{formState.isSubmitting ? "Uploading..." : "Upload Video"}
							</Button>
						)}
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
