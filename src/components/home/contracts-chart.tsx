import { AreaChartOutlined, DollarOutlined } from "@ant-design/icons";
import { Card } from "antd";
import React from "react";
import { Text } from "../text";
import { Area, AreaConfig } from "@ant-design/plots";
import { useList } from "@refinedev/core";
import { DASHBOARD_DEALS_CHART_QUERY } from "@/graphql/queries";
import { mapDealsData } from "@/utilities/helpers";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { DashboardDealsChartQuery } from "@/graphql/types"; // generated for us by codegen
// import { title } from "process";

const ContractsChart = () => {
  const { data } = useList<GetFieldsFromList<DashboardDealsChartQuery>>({
    // <the type of data the useList hook will return<>>
    resource: "dealStages",
    filters: [
      {
        field: "title",
        operator: "in",
        value: ["WON", "LOST"],
      },
    ],
    meta: {
      gqlQuery: DASHBOARD_DEALS_CHART_QUERY,
    },
  });
  console.log(data, "data");
  const contractData = React.useMemo(() => {
    return mapDealsData(data?.data);
  }, [data?.data]);

  console.log(contractData, "yo");

  const config: AreaConfig = {
    data: contractData,
    xField: "timeText",
    yField: "value",
    isStack: false,
    seriesField: "state",
    animation: true,
    startOnZero: false,
    smooth: true,
    legend: {
      offsetY: -6,
      itemName: {
        formatter: (text: string) => {
          if (text === "Won") {
            return "Successful";
          } else if (text === "Lost") {
            return "Unsuccessful";
          }
          return text;
        },
      },
    },
    yAxis: {
      tickCount: 6,
      label: {
        formatter: (v: string) => `₹${Number(v) / 10000} lacs`,
      },
    },
    tooltip: {
      formatter: (data) => {
        return {
          name:
            data.state === "Won"
              ? "Successful"
              : data.state === "Lost"
                ? "Unsuccessful"
                : data.state,
          value: data.value,
        };
      },
    },
  };

  return (
    <Card
      style={{ height: "100%" }}
      headStyle={{ padding: "8px 16px" }}
      bodyStyle={{ padding: "24px 24px 0px 24px" }}
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <DollarOutlined />
          <Text size="sm" style={{ marginLeft: "0.5rem" }}>
            Contracts
          </Text>
        </div>
      }
    >
      <Area {...config} height={325} />{" "}
      {/* Area component is coming from antD plots */}
    </Card>
  );
};

export default ContractsChart;
