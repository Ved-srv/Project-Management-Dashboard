import { CalendarOutlined } from "@ant-design/icons";
import { Badge, Card, List } from "antd";
import { Text } from "../text";
import UpcomingEventsSkeleton from "../skeleton/upcoming-events";
import { getDate } from "@/utilities/helpers";
import { useList } from "@refinedev/core"; // also has a predefined loading state in it.
import { DASHBORAD_CALENDAR_UPCOMING_EVENTS_QUERY } from "@/graphql/queries";
import dayjs from "dayjs";

const UpcomingEvents = () => {
  const { data, isLoading } = useList({
    // UseList is a refine hook which allows us to fetch data from our API.
    resource: "events", // name of the resource
    pagination: { pageSize: 5 }, // applying pagination
    sorters: [
      // applying sorting
      {
        // sorted by start Date
        field: "startDate",
        order: "asc",
      },
    ],
    filters: [
      // applying filtering
      {
        field: "startDate",
        operator: "gte",
        value: dayjs().format("YYYY-MM-DD"),
      },
    ],
    // since we are using graphql we will have to define a specific graphql query as a meta field to this useList hook
    meta: {
      gqlQuery: DASHBORAD_CALENDAR_UPCOMING_EVENTS_QUERY,
    },
  });

  // alert(JSON.stringify(data)); // mock database created by refine.
  return (
    <Card
      style={{ height: "100%" }}
      headStyle={{ padding: "8px 16px" }}
      bodyStyle={{ padding: "0 1rem" }}
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <CalendarOutlined />̀
          <Text size="sm" style={{ marginLeft: "0.7rem" }}>
            Upcoming Events
          </Text>
        </div>
      }
    >
      {isLoading ? (
        <List
          itemLayout="horizontal"
          dataSource={Array.from({ length: 5 }).map((_, index) => ({
            id: index,
          }))}
          renderItem={() => <UpcomingEventsSkeleton />}
        ></List>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={data?.data || []}
          renderItem={(item) => {
            const renderDate = getDate(item.startDate, item.endDate);
            return (
              <List.Item>
                <List.Item.Meta
                  avatar={<Badge color={item.color} />}
                  title={<Text size="xs">{renderDate}</Text>}
                  description={
                    <Text ellipsis={{ tooltip: true }} strong>
                      {item.title}
                    </Text>
                  }
                />
              </List.Item>
            );
          }}
        />
      )}
      {!isLoading && data?.data.length === 0 && (
        <span
          style={{
            display: "block",
            justifyContent: "center",
            alignItems: "center",
            height: "220px",
          }}
        >
          No Upcoming Events
        </span>
      )}
    </Card>
  );
};

export default UpcomingEvents;
