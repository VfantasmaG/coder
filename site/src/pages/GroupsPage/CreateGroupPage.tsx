import { createGroup } from "api/queries/groups";
import type { FC } from "react";
import { Helmet } from "react-helmet-async";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { pageTitle } from "utils/page";
import CreateGroupPageView from "./CreateGroupPageView";

export const CreateGroupPage: FC = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const createGroupMutation = useMutation(createGroup(queryClient, "default"));

	return (
		<>
			<Helmet>
				<title>{pageTitle("Create Group")}</title>
			</Helmet>
			<CreateGroupPageView
				onSubmit={async (data) => {
					const newGroup = await createGroupMutation.mutateAsync(data);
					navigate(`/deployment/groups/${newGroup.name}`);
				}}
				error={createGroupMutation.error}
				isLoading={createGroupMutation.isLoading}
			/>
		</>
	);
};
export default CreateGroupPage;
