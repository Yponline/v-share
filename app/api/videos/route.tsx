import authOptions from "@/app/auth/AuthOptions";
import { formSchemaB } from "@/app/formSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions);
		if (!session) {
			return NextResponse.json({}, { status: 401 });
		}

		const body = await request.json();

		const validation = formSchemaB.safeParse(body);
		if (!validation.success) {
			return NextResponse.json(validation.error.format(), { status: 400 });
		}

		const newVideo = await prisma.video.create({
			data: {
				title: body.title,
				category: body.category,
				description: body.description,
				publicId: body.publicId,
			},
		});
		console.log(newVideo);

		return NextResponse.json(newVideo, { status: 201 });
	} catch (err) {
		console.error("POST /api/videos error:", err);

		// Return proper JSON even on crash (very helpful for debugging)
		return NextResponse.json(
			{
				error: "Internal server error",
				message: err instanceof Error ? err.message : "Unknown error",
			},
			{ status: 500 },
		);
	}
}
