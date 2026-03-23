import { formSchemaB } from "@/app/formSchema";
import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
	request: NextRequest,
	context: { params: Promise<{ id: string }> }, // ← important change here
) {
	try {
		// Await params before using it
		const { id } = await context.params;

		const body = await request.json();
		const result = formSchemaB.safeParse(body);

		if (!result.success) {
			return NextResponse.json(result.error.format(), { status: 400 });
		}

		// Use the awaited id
		const video = await prisma.video.findUnique({
			where: { id },
			select: { id: true },
		});

		if (!video) {
			return NextResponse.json({ error: "Video not found" }, { status: 404 });
		}

		// Better: use validated data instead of raw body
		const data = result.data;

		const updated = await prisma.video.update({
			where: { id },
			data: {
				// Use validated & typed data (safer than body.title)
				title: data.title,
				description: data.description,
				// thumbnailUrl: data.thumbnailUrl,
				// published: data.published,
				// etc. — only fields your schema allows
			},
			select: {
				id: true,
				title: true,
				description: true,
				publicId: true,
			},
		});

		return NextResponse.json(updated); // ← return actual data is better than string "updated"
	} catch (error) {
		if (
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === "P2025"
		) {
			return NextResponse.json({ error: "Video not found" }, { status: 404 });
		}

		console.error(error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
