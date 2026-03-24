"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";

const DeleteBtn = () => {
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
					<Flex mt="4" gap='3'>
						<AlertDialog.Cancel>
							<Button variant="soft" color="gray">
								Cancel
							</Button>
						</AlertDialog.Cancel>
						<AlertDialog.Action>
							<Button color="red">Delete Video</Button>
						</AlertDialog.Action>
					</Flex>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</>
	);
};

export default DeleteBtn;
