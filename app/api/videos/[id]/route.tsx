import { formSchemaB } from "@/app/formSchema";
import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
	request: NextRequest,
	{ params }: { params: { id: string } },
) {
	try {
		const body = await request.json();
		const result = formSchemaB.safeParse(body);

		if (!result.success) {
			return NextResponse.json(result.error.format(), { status: 400 });
		}

		const data = result.data;

		const video = await prisma.video.update({
			where: { id: params.id },
			data: {
				// Only the fields you allow to be updated via PATCH
				title: data.title,
				description: data.description,
			},
			select: {
				id: true,
				title: true,
				description: true,
				publicId: true,
			},
		});

		return NextResponse.json(video);
	} catch (error) {
		// Prisma throws NotFoundError when record doesn't exist
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === "P2025") {
				return NextResponse.json({ error: "Video not found" }, { status: 404 });
			}
		}

		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
