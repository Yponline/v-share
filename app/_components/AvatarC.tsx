import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "next-auth";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

const AvatarC = ({ data }: { data: Session | null }) => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Avatar className="hover:cursor-pointer">
					<AvatarImage src={data?.user?.image || undefined} />
					<AvatarFallback>{data?.user?.name}</AvatarFallback>
				</Avatar>
			</PopoverTrigger>
			<PopoverContent className="w-80">
				<Link
					href="/api/auth/signout"
					className="block px-4 py-3 text-sm text-muted-foreground hover:text-foreground 
             hover:bg-accent rounded-md transition-colors duration-200 
             font-medium active:scale-[0.985]">
					Signout
				</Link>
			</PopoverContent>
		</Popover>
	);
};

export default AvatarC;
