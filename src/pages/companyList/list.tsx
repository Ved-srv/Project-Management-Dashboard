import CustomAvatar from "@/components/custom-avatar";
import { Text } from "@/components/text";
import { COMPANIES_LIST_QUERY } from "@/graphql/queries";
import { Company } from "@/graphql/schema.types";
import { currencyNumber } from "@/utilities";
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

export const CompanyList = ({ children }: React.PropsWithChildren) => {
  /* This hook provides a way to programmatically navigate within the application.
  It internally uses the routing mechanism provided by the framework or library being used (e.g., React Router). */

  const go = useGo();
  const { tableProps, filters } = useTable({
    resource: "companies",
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
      gqlQuery: COMPANIES_LIST_QUERY,
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
                  resource: "companies",
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
          <Table.Column<Company> // Provided the type of <company> data that is returned by your GraphQL API so that it doesn't complain regarding the record.
            dataIndex="name"
            title="Company Title"
            defaultFilteredValue={getDefaultFilter("id", filters)}
            filterIcon={<SearchOutlined />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Search Company" />
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
          <Table.Column<Company>
            dataIndex="totalRevenue"
            title="Open deals amount"
            render={(value, company) => (
              <Text>
                {currencyNumber(company?.dealsAggregate?.[0].sum?.value || 0)}
              </Text>
            )}
          />
          <Table.Column<Company>
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
