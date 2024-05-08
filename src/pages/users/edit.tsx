import { Col, Form, Input, InputNumber, Row, Select } from "antd";
import { Edit, useSelect } from "@refinedev/antd";
import { useForm } from "@refinedev/antd";
import { UPDATE_USER_MUTATION } from "@/graphql/mutations";
import CustomAvatar from "@/components/custom-avatar";
import { getNameInitials } from "@/utilities";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { UsersSelectQuery } from "@/graphql/types";
import { USERS_SELECT_QUERY } from "@/graphql/queries";
import SelectOptionWithAvatar from "@/components/select-option-with-avatar";
import {
  businessTypeOptions,
  companySizeOptions,
  industryOptions,
} from "@/constants";

const EditPage = () => {
  const { saveButtonProps, formProps, formLoading, queryResult } = useForm({
    redirect: false,
    meta: {
      gqlMutation: UPDATE_USER_MUTATION,
    },
  });

  const { avatarUrl, name } = queryResult?.data?.data || {};

  const { selectProps, queryResult: queryResultUsers } = useSelect<
    GetFieldsFromList<UsersSelectQuery>
  >({
    resource: "users",
    optionLabel: "name",
    pagination: {
      mode: "off",
    },

    meta: {
      gqlQuery: USERS_SELECT_QUERY,
    },
  });

  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col xs={24} xl={12}>
          <Edit
            isLoading={formLoading}
            saveButtonProps={saveButtonProps}
            breadcrumb={false}
          >
            <Form {...formProps} layout="vertical">
              <CustomAvatar
                shape="square"
                src={avatarUrl}
                name={getNameInitials(name || "")}
                style={{
                  width: 96,
                  height: 96,
                  marginBottom: "24px",
                }}
              />
              <Form.Item label="User name" name="name">
                <Input placeholder="Enter updated User Name" />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input placeholder="Enter updated Email address" />
              </Form.Item>
              <Form.Item label="Phone" name="phone">
                <Input placeholder="Enter new Phone Number" />
              </Form.Item>
              <Form.Item label="Job Title" name="jobTitle">
                <Input placeholder="Enter new Job Title" />
              </Form.Item>
              <Form.Item label="Timezone" name="timezone">
                <Input placeholder="Enter new Timezone" />
              </Form.Item>
              <Form.Item label="Role" name="role" rules={[{ required: true }]}>
                <Select
                  placeholder="Enter new Role"
                  options={[
                    { value: "ADMIN", label: "Admin" },
                    { value: "SALES_INTERN", label: "Project Investigator" },
                    { value: "SALES_MANAGER", label: "Team Member" },
                    { value: "SALES_PERSON", label: "Team Leader" },
                  ]}
                />
              </Form.Item>
            </Form>
          </Edit>
        </Col>
        <Col xs={24} xl={12}>
          {/* <CompanyContactsTable /> */}
        </Col>
      </Row>
    </div>
  );
};

export default EditPage;
