"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

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
import { formSchemaF } from "../../formSchema";

interface CloudnaryResults {
	public_id: string;
}

// react function
export function VideoForm() {
	const [public_id, setPublicId] = useState("results");

	const form = useForm<z.infer<typeof formSchemaF>>({
		resolver: zodResolver(formSchemaF),
		defaultValues: {
			title: "",
			description: "",
		},
	});

	// submitting data function
	function onSubmit(data: z.infer<typeof formSchemaF>) {
		// Toast Info
		toast("You submitted the following values:", {
			description: (
				<pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
					<code>{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
			position: "bottom-right",
			classNames: {
				content: "flex flex-col gap-2",
			},
			style: {
				"--border-radius": "calc(var(--radius)  + 4px)",
			} as React.CSSProperties,
		});

		console.log(data, public_id);
	}

	return (
		<div className="flex space-x-6">
			<Card className="w-full sm:max-w-md border-none shadow-none md:shadow ">
				<CardHeader>
					<CardTitle>Video Upload</CardTitle>
					<CardDescription>Share Ur Videos Free</CardDescription>
				</CardHeader>
				<CardContent>
					<form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
						<FieldGroup>
							{/* tittle */}
							<Controller
								name="title"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="form-rhf-demo-title">Title</FieldLabel>
										<Input
											{...field}
											id="form-rhf-demo-title"
											aria-invalid={fieldState.invalid}
											placeholder="Enter Video Title"
											autoComplete="off"
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>

							{/* description */}
							<Controller
								name="description"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="form-rhf-demo-description">
											Description
										</FieldLabel>
										<InputGroup>
											<InputGroupTextarea
												{...field}
												id="form-rhf-demo-description"
												placeholder="Describe ur video."
												rows={6}
												className="min-h-24 resize-none"
												aria-invalid={fieldState.invalid}
											/>
											<InputGroupAddon align="block-end">
												<InputGroupText className="tabular-nums">
													{field.value.length}/100 characters
												</InputGroupText>
											</InputGroupAddon>
										</InputGroup>
										<FieldDescription>
											Include steps to reproduce, expected behavior, and what
											actually happened.
										</FieldDescription>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>

							{/* UploadBTN  */}
						</FieldGroup>
					</form>
				</CardContent>
				<CardFooter>
					<Field orientation="horizontal">
						<Button
							type="button"
							variant="outline"
							onClick={() => form.reset()}>
							Reset
						</Button>
						<Button type="submit" form="form-rhf-demo">
							Submit
						</Button>
					</Field>
				</CardFooter>
			</Card>
			<div>
				<CldUploadWidget
					uploadPreset="hotkmv5r"
					onSuccess={(result, { widget }) => {
						console.log("Upload SUCCESS! Full result:", result);
						console.log("Useful info:", result?.info); // ← this has public_id, secure_url, etc.
						// Example: result.info.secure_url → ready to save/use
						if (result.event !== "success") {
							return;
						}

						const info = result.info as CloudnaryResults;

						setPublicId(info.public_id);
						widget.close(); // Optional: auto-close widget after success
					}}>
					{({ open }) => {
						return <button onClick={() => open()}>Upload an Image</button>;
					}}
				</CldUploadWidget>
				{/* Preview display  */}
				{public_id && (
					<div>
						<CldImage
							width="192"
							height="192"
							src={public_id}
							deliveryType="upload"
							alt="Description of my image"
						/>
					</div>
				)}
			</div>
		</div>
	);
}
