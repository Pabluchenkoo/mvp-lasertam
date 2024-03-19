import { Avatar, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import './adminEmployees.css';
import { FormattedMessage, useIntl } from 'react-intl';

//Otra vista
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function AdminEmployees() {
    //FORMS
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [professional,setProfessional] = useState('');
    const [comentarios, setComentarios] = useState('');

    const hableSubmit = (e) => {
        e.preventDefault();
        const reservation = {title, startDate, endDate, professional, comentarios};
        console.log(reservation);
    }
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
          <Typography.Title level={10}><FormattedMessage id={"adminEmployees.employess"}/></Typography.Title>
          <Table
            loading={loading}
            columns={[
              {
                title: <FormattedMessage id={"adminEmployees.image"}/>,
                dataIndex: "image",
                render: (link) => {
                  return <Avatar alt="imagen_empleados" src={link} />;
                },
              },
              {
                title: <FormattedMessage id={"adminEmployees.firstname"}/>,
                dataIndex: "first_name",
              },
              {
                title: <FormattedMessage id={"adminEmployees.lastname"}/>,
                dataIndex: "last_name",
              },
              {
                title: <FormattedMessage id={"adminEmployees.role"}/>,
                dataIndex: "role",
              },
              {
                title: <FormattedMessage id={"adminEmployees.number"}/>,
                dataIndex: "phone",
              },
              {
                title: <FormattedMessage id={"adminEmployees.email"}/>,
                dataIndex: "email",
              },
              {
                title: <FormattedMessage id={"adminEmployees.gender"}/>,
                dataIndex: "gender",
              },
              {
                title: <FormattedMessage id={"adminEmployees.earnings"}/>,
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
      <h2><FormattedMessage id={"adminEmployees.bestEmployee"}/></h2>
      <div className="card-container">
        {primerosTres.map(item => (
          <div className="card">
            <Card style={{ width: '18rem'}}>
              <Card.Img className="image" variant="top" src={item.image} />
              <Card.Body>
                <Card.Title>{item.first_name} {item.last_name}</Card.Title>
                <Card.Text>
                  <FormattedMessage id={"adminEmployees.description1"}/>: {item.earnings} <FormattedMessage id={"adminEmployees.description2"}/> ${total}.
                  <FormattedMessage id={"adminEmployees.description3"}/> %{(parseFloat(item.earnings.replace("$", ""))/total*100).toFixed(2)} 
                  <FormattedMessage id={"adminEmployees.description4"}/>.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>

  );
}
export default AdminEmployees;