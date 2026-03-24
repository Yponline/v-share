"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteBtn = ({ id }: { id: string }) => {
	const router = useRouter();
	return (
		<>
			<AlertDialog.Root>
				<AlertDialog.Trigger>
					<Button className="" color="red">
						Delete
					</Button>
				</AlertDialog.Trigger>
				<AlertDialog.Content>
					<AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
					<AlertDialog.Description>
						Are u sure u want to delete this video?, this action can not be
						undone.
					</AlertDialog.Description>
					<Flex mt="4" gap="3">
						<AlertDialog.Cancel>
							<Button variant="soft" color="gray">
								Cancel
							</Button>
						</AlertDialog.Cancel>
						<AlertDialog.Action>
							<Button
								color="red"
								onClick={async () => {
									try {
										await axios.delete(`/api/videos/${id}`);
										router.push("/videos");
										router.refresh();
									} catch (err) {
										console.error(err);
										alert("Failed to delete the video");
									}
								}}>
								Delete Video
							</Button>
						</AlertDialog.Action>
					</Flex>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</>
	);
};

export default DeleteBtn;
