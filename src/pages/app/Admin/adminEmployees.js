import { Avatar, Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import './adminEmployees.css';
import EventForm from "./eventForm";


function AdminEmployees({event}) {

//NO FORMS
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);


  const getCustomers = () => {
    return fetch("https://raw.githubusercontent.com/CristianCaro915/MockarooWeB/main/employee.json").then((res) => res.json());
  };

  useEffect(() => {
    setLoading(true);
    getCustomers().then((res) => {
      setDataSource(res);
      setLoading(false);
    });
  }, []);

  let a=0;
  let b=0;
  function getTotalPayment(dataSource) {
    for (const emp of dataSource) {
      b = parseFloat(emp.earnings.replace("$", ""));
      a = a + b
    }
    return a;
  }
  const total = getTotalPayment(dataSource);

  let arreglo=[];
  for (const x of dataSource){
    arreglo.push(x);
  }
  arreglo.sort((a, b) => parseFloat(b.earnings.replace("$", "")) - parseFloat(a.earnings.replace("$", "")));
  let primerosTres = arreglo.slice(0, 3);


  return (
    <div>
      <div>
        <Space size={5} direction="vertical">
          <Typography.Title level={10}>Employees</Typography.Title>
          <Table
            loading={loading}
            columns={[
              {
                title: "Image",
                dataIndex: "image",
                render: (link) => {
                  return <Avatar src={link} />;
                },
              },
              {
                title: "First Name",
                dataIndex: "first_name",
              },
              {
                title: "Last Name",
                dataIndex: "last_name",
              },
              {
                title: "Role",
                dataIndex: "role",
              },
              {
                title: "Phone number",
                dataIndex: "phone",
              },
              {
                title: "Email",
                dataIndex: "email",
              },
              {
                title: "Gender",
                dataIndex: "gender",
              },
              {
                title: "Earnings",
                dataIndex: "earnings",
              }
            ]}
            dataSource={dataSource}
            pagination={{
              pageSize: 5,
            }}
          ></Table>
        </Space>
      </div>
      <h2>Best employees of the week</h2>
      <div className="card-container">
        {primerosTres.map(item => (
          <div className="card">
            <Card style={{ width: '18rem'}}>
              <Card.Img className="image" variant="top" src={item.image} />
              <Card.Body>
                <Card.Title>{item.first_name} {item.last_name}</Card.Title>
                <Card.Text>
                  Obtained one of the best earnings with the value of: {item.earnings} from a total of ${total}. Which is around
                  %{(parseFloat(item.earnings.replace("$", ""))/total*100).toFixed(2)} of the total.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
        <EventForm/>
    </div>

  );
}
export default AdminEmployees;


