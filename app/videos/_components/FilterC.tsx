"use client";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

const FilterC = () => {
	const router = useRouter();
	return (
		<Select
			onValueChange={(filter) => {
				const qury = filter ? `?category=${filter}` : "";
				router.push("videos" + qury);
			}}>
			<SelectTrigger className="w-45">
				<SelectValue placeholder="Category" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectItem value="all">All</SelectItem>
					<SelectItem value="movie">Movie</SelectItem>
					<SelectItem value="music">Music</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export default FilterC;
