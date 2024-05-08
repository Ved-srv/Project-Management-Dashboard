import CustomAvatar from "@/components/custom-avatar";
import { Text } from "@/components/text";
import { USERS_SELECT_QUERY } from "@/graphql/queries";
import { User } from "@/graphql/schema.types";

import { SearchOutlined } from "@ant-design/icons";
import {
  CreateButton,
  DeleteButton,
  EditButton,
  FilterDropdown,
  List,
} from "@refinedev/antd";
import { useTable } from "@refinedev/antd";
import { getDefaultFilter, useGo } from "@refinedev/core";
import { Input, Space, Table } from "antd";

export const UserList = ({ children }: React.PropsWithChildren) => {
  /* This hook provides a way to programmatically navigate within the application.
  It internally uses the routing mechanism provided by the framework or library being used (e.g., React Router). */

  const go = useGo();
  const { tableProps, filters } = useTable({
    resource: "users",
    onSearch: (values) => {
      return [
        {
          field: "name",
          operator: "contains",
          value: values.name,
        },
      ];
    },
    pagination: {
      pageSize: 12,
    },
    sorters: {
      initial: [
        {
          field: "createdAt",
          order: "desc",
        },
      ],
    },
    filters: {
      initial: [
        {
          field: "name",
          operator: "contains",
          value: undefined,
        },
      ],
    },
    meta: {
      gqlQuery: USERS_SELECT_QUERY,
    },
  });
  return (
    <div>
      <List
        breadcrumb={false}
        headerButtons={() => (
          <CreateButton
            onClick={() => {
              go({
                to: {
                  resource: "users",
                  action: "create",
                },
                options: {
                  keepQuery: true, // current query parameters will be merged with the new query parameters.
                },
                type: "replace" /* "replace" replaces the current entry in the history stack. So when you navigate using "replace",
            the current page is replaced by the new one, and if you hit the back button, you'll skip the replaced page and go directly to the page before it.
            This can be useful in scenarios like form submissions, where you don't want users to go back to the form after submitting it. */,
              });
            }}
          />
        )}
      >
        <Table {...tableProps} pagination={{ ...tableProps.pagination }}>
          <Table.Column<User> // Provided the type of <User> data that is returned by your GraphQL API so that it doesn't complain regarding the record.
            dataIndex="name"
            title="Users"
            defaultFilteredValue={getDefaultFilter("id", filters)}
            filterIcon={<SearchOutlined />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Search User" />
              </FilterDropdown>
            )}
            render={(value, record) => (
              <Space>
                <CustomAvatar
                  shape="square"
                  name={record.name}
                  src={record.avatarUrl}
                />
                <Text style={{ whiteSpace: "nowrap" }}>{record.name}</Text>
              </Space>
            )}
          />

          <Table.Column<User>
            dataIndex="jobTitle"
            title="Job Title"
            render={(value) => <Text>{value}</Text>}
          />

          <Table.Column<User>
            dataIndex="id"
            title="Actions"
            fixed="right"
            render={(value) => (
              <Space>
                <EditButton hideText size="small" recordItemId={value} />
                <DeleteButton hideText size="small" recordItemId={value} />
              </Space>
            )}
          />
        </Table>
      </List>
      {children}
    </div>
  );
};
