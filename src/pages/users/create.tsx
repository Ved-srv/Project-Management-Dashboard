import { UserList } from "./list";
import { Form, Input, Modal, Select } from "antd";
import { useModalForm, useSelect } from "@refinedev/antd";
import { useGo } from "@refinedev/core";
import { ADD_USER_MUTATION } from "@/graphql/mutations";
import { USERS_SELECT_QUERY } from "@/graphql/queries";
import SelectOptionWithAvatar from "@/components/select-option-with-avatar";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { UsersSelectQuery } from "@/graphql/types";

const CreateUsers = () => {
  const go = useGo(); // for navigation

  const goToListPage = () => {
    go({
      to: { resource: "users", action: "list" }, // we simply go back to the list of companies
      options: { keepQuery: true },
      type: "replace", // sine we wanna close the modal
    });
  };

  const { formProps, modalProps } = useModalForm({
    action: "create",
    defaultVisible: true,
    resource: "users",
    redirect: false,
    mutationMode: "pessimistic",
    onMutationSuccess: goToListPage,
    meta: {
      gqlMutation: ADD_USER_MUTATION,
    },
  });

  return (
    <UserList>
      <Modal
        {...modalProps}
        mask={true}
        onCancel={goToListPage}
        title="Add New"
        width={512}
      >
        <Form {...formProps} layout="vertical">
          <Form.Item label="User name" name="name" rules={[{ required: true }]}>
            <Input placeholder="Please Enter a User Name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input placeholder="Please Enter an Email" />
          </Form.Item>
          <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
            <Input placeholder="Please Enter a Phone Number" />
          </Form.Item>
          <Form.Item
            label="Job Title"
            name="jobTitle"
            rules={[{ required: true }]}
          >
            <Input placeholder="Please Enter a Job Title" />
          </Form.Item>
          <Form.Item
            label="Timezone"
            name="timezone"
            rules={[{ required: true }]}
          >
            <Input placeholder="Please Enter a Timezone" />
          </Form.Item>
          <Form.Item label="Role" name="role" rules={[{ required: true }]}>
            <Select
              placeholder="Please Select a Role"
              options={[
                { value: "ADMIN", label: "Admin" },
                { value: "SALES_INTERN", label: "Project Investigator" },
                { value: "SALES_MANAGER", label: "Team Member" },
                { value: "SALES_PERSON", label: "Team Leader" },
                // Add more role options as needed
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </UserList>
  );
};

export default CreateUsers;
