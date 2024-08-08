import React, { useEffect, useState } from "react";
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column, Pie, Line } from "@ant-design/plots";
import { Table, Card, Row, Col, Statistic } from "antd";
import Authorised from "../utils/auth";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: `Product ${i}`,
    status: `Status ${i}`,
  });
}

const Dashboard = () => {
  const [salesData, setSalesData] = useState([
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 5000 },
    { month: "Apr", sales: 7000 },
    { month: "May", sales: 2000 },
    { month: "Jun", sales: 4000 },
    { month: "Jul", sales: 3000 },
    { month: "Aug", sales: 6000 },
    { month: "Sep", sales: 7000 },
    { month: "Oct", sales: 8000 },
    { month: "Nov", sales: 9000 },
    { month: "Dec", sales: 10000 },
  ]);

  const [topProducts, setTopProducts] = useState([
    { product: "Product A", sales: 12000 },
    { product: "Product B", sales: 9000 },
    { product: "Product C", sales: 8000 },
    { product: "Product D", sales: 7000 },
    { product: "Product E", sales: 6000 },
  ]);

  const [inventoryData, setInventoryData] = useState([
    { product: "Product A", quantity: 100, status: "In Stock" },
    { product: "Product B", quantity: 50, status: "Low Stock" },
    { product: "Product C", quantity: 0, status: "Out of Stock" },
    { product: "Product D", quantity: 20, status: "Low Stock" },
    { product: "Product E", quantity: 80, status: "In Stock" },
  ]);

  useEffect(() => {
    // Fetch and set salesData, topProducts, and inventoryData from your API
  }, []);

  const salesConfig = {
    data: salesData,
    xField: "month",
    yField: "sales",
    color: ({ month }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      month: {
        alias: "Month",
      },
      sales: {
        alias: "Sales",
      },
    },
  };

  const topProductsConfig = {
    appendPadding: 10,
    data: topProducts,
    angleField: 'sales',
    colorField: 'product',
    radius: 1,
    innerRadius: 0.64,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
    statistic: {
      title: {
        offsetY: -4,
        style: {
          fontSize: 14,
        },
        formatter: () => 'Top Products',
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: 24,
        },
        formatter: (datum) => datum ? `${datum.product}` : '',
      },
    },
  };

  const inventoryConfig = {
    data: inventoryData,
    xField: 'product',
    yField: 'quantity',
    seriesField: 'status',
    color: ['#FF4D4F', '#52C41A'],
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    yAxis: {
      title: {
        text: 'Quantity',
      },
    },
  };

  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Sales"
              value={112893}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<BsArrowUpRight />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Average Order Value"
              value={93.24}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<BsArrowDownRight />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total Orders"
              value={1126}
              valueStyle={{ color: '#3f8600' }}
              prefix={<BsArrowUpRight />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <div className="mt-4">
        <h3 className="mb-5 title">Sales Trends</h3>
        <div>
          <Column {...salesConfig} />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-5 title">Top Products</h3>
        <div>
          <Pie {...topProductsConfig} />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-5 title">Inventory Status</h3>
        <div>
          <Line {...inventoryConfig} />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="mb-5 title">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
