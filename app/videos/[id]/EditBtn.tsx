import { Button } from "@radix-ui/themes";
import Link from "next/link";


const EditBtn = ({ id }: { id: string }) => {
	return (
		<Link href={`${id}/edit`}>
			<Button className="hover:cursor-pointer">Edit</Button>
		</Link>
	);
};

export default EditBtn;
