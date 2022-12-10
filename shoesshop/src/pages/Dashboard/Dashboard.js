import { useState, useEffect } from "react";
import Admin from "../../layouts/Admin/Admin";
import "./Dashboard.css";
import React from "react";
import axios from "axios";
import { DatePicker, Space } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
const { RangePicker } = DatePicker;

function Dashboard() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [data, setData] = useState([]);
  const [orders, setOrders] = useState([]);
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(payload[0].value)}`}</p>
        </div>
      );
    }
    return null;
  };
  return (
    <Admin>
      <div className="container">
        <div className="dashboard">
          <Space direction="vertical" size={12}>
            <RangePicker
              format={"DD-MM-YYYY"}
              onChange={(e) => {
                setFrom(
                  new Date(
                    e[0].$d.getYear() + 1900,
                    e[0].$d.getMonth(),
                    e[0].$d.getDate() + 1
                  )
                );
                setTo(
                  new Date(
                    e[1].$d.getYear() + 1900,
                    e[1].$d.getMonth(),
                    e[1].$d.getDate() + 1
                  )
                );
              }}
            />
          </Space>
          <button
            className="btn mx-3"
            onClick={async () => {
              const response = await axios.post("/api/order/date", {
                fromDate: from,
                toDate: to,
              });
              setOrders(response.data);
            }}
          >
            Xác nhận
          </button>
          <div className="row">
            <div className="col-4">
              <div className="box">
                <span className="title">Tổng hóa đơn</span>
                <span className="info">{orders.length}</span>
              </div>
            </div>
            <div className="col-4">
              <div className="box">
                <span className="title">Tổng doanh thu</span>
                <span className="info">
                  {Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(
                    orders.reduce((previousValue, currentValue) => {
                      return previousValue + currentValue.totalPrice;
                    }, 0)
                  )}
                </span>
              </div>
            </div>
            <div className="col-4">
              <div className="box">
                <span className="title">Tổng số sản phẩm bán ra</span>
                <span className="info">
                  {orders.reduce((previousValue, currentValue) => {
                    let count = currentValue.orderItems.reduce((pre, curr) => {
                      return pre + curr.count;
                    }, 0);
                    return previousValue + count;
                  }, 0)}
                </span>
              </div>
            </div>
            <div className="col-12">
              <div className="box">
                <div className="w-50 d-flex justify-content-between">
                  <span className="title">Doanh thu theo năm</span>{" "}
                  <Space direction="vertical">
                    <DatePicker
                      picker="year"
                      onChange={async (e) => {
                        const response = await axios.post("/api/order/year", {
                          year: e.$y,
                        });
                        setData(response.data);
                      }}
                    />
                  </Space>
                </div>
                <BarChart
                  width={1000}
                  height={400}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="total" fill="#8884d8" />
                </BarChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Admin>
  );
}

export default Dashboard;
