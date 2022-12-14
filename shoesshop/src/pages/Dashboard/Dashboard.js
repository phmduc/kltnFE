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
  const [users, setUsers] = useState([]);
  const [mostSold, setMostSold] = useState([]);
  const [bestseller, setBestseller] = useState([]);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
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
              const order = await axios.post("/api/order/date", {
                fromDate: from,
                toDate: to,
              });

              const user = await axios.post("/api/users/date", {
                fromDate: from,
                toDate: to,
              });
              setUsers(user.data);
              setOrders(order.data.sortOrders);
              setMostSold(order.data.soldestProduct);
            }}
          >
            X??c nh???n
          </button>
          <div className="row">
            <div className="col-4">
              <div className="box">
                <span className="title">T???ng h??a ????n</span>
                <span className="info">{orders.length}</span>
              </div>
            </div>
            <div className="col-4">
              <div className="box">
                <span className="title">T???ng doanh thu</span>
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
                <span className="title">T???ng s??? s???n ph???m b??n ra</span>
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
            <div className="col-4">
              <div className="box">
                <span className="title">S??? t??i kho???n tham gia</span>
                <span className="info">{users.length}</span>
              </div>
            </div>
            <div className="col-8">
              <div className="box">
                <span className="title">S???n ph???m b??n ch???y nh???t</span>
                <span className="info">
                  {mostSold.length !== 0 ? mostSold.name : "empty"}
                </span>
              </div>
            </div>
            <div className="col-12">
              <div className="box">
                <div className="w-100 d-flex justify-content-between">
                  <span className="title">Doanh thu theo n??m</span>{" "}
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
            <div className="col-12">
              <div className="box">
                <div className="w-100 d-flex justify-content-between">
                  <span className="title">L?????ng ng?????i d??ng theo n??m</span>{" "}
                  <Space direction="vertical">
                    <DatePicker
                      picker="year"
                      onChange={async (e) => {
                        const response = await axios.post("/api/users/year", {
                          year: e.$y,
                        });
                        setData1(response.data);
                      }}
                    />
                  </Space>
                </div>
                <BarChart
                  width={1000}
                  height={400}
                  data={data1}
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
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="total" fill="#8884d8" />
                </BarChart>
              </div>
            </div>
            <div className="col-12">
              <div className="box">
                <div className="w-100 d-flex justify-content-between">
                  <span className="title">S???n ph???m b??n ch???y nh???t theo n??m</span>{" "}
                  <Space direction="vertical">
                    <DatePicker
                      picker="year"
                      onChange={async (e) => {
                        const response = await axios.post(
                          "/api/order/bestseller/year",
                          {
                            year: e.$y,
                          }
                        );
                        setBestseller(response.data);
                      }}
                    />
                  </Space>
                </div>
                <table className="table seller">
                  <thead>
                    <tr>
                      <th scope="col" className="text-center">
                        STT
                      </th>
                      <th scope="col">S???n ph???m</th>
                      <th scope="col" className="text-center">
                        S??? l?????ng b??n ra
                      </th>
                      <th scope="col" className="text-center">
                        T???ng doanh thu
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bestseller.map((elem, index) => {
                      return (
                        <tr>
                          <th scope="row" className="text-center">
                            {index + 1}
                          </th>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="img-wrap">
                                <img src={elem.img} alt="" />
                              </div>
                              <span>{elem.name}</span>
                            </div>
                          </td>
                          <td className="text-center">
                            <span>{elem.count}</span>
                          </td>
                          <td className="text-center">
                            <span>
                              {Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(elem.total)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Admin>
  );
}

export default Dashboard;
