// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Global variable to hold the Prisma client instance
const globalForPrisma = global as unknown as {
	prisma: PrismaClient | undefined;
};

// Reuse the existing instance if available, otherwise create a new one
export const prisma =
	globalForPrisma.prisma ||
	new PrismaClient({
		// You can add logging or other options here
		// log: ['query', 'info', 'warn', 'error'],
	});

export default prisma;

// In development, store the Prisma client instance on the global object
// to avoid creating new instances with every hot-reload
if (process.env.NODE_ENV !== "production") {
	globalForPrisma.prisma = prisma;
}
