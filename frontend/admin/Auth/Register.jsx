import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import publicApi from "../../../api/publicApi";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

const Register = () => {
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const register = async (e) => {
    e.preventDefault();
    const { data } = await publicApi.post("/admin/register", registerData);
    console.log(data);
    if (data.message === "Admin Created Successfully") {
      navigate("/admin/login");
    }
  };

  return (
    <div className="formBody">
      <div className="formStyle">
        {" "}
        <Form onSubmit={register} className="formm">
          <h3> Admin Register</h3>
          <Row className="mb-3">
            <Col>
              <Form.Control
                placeholder="First name"
                required
                type="text"
                value={registerData.firstName}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    firstName: e.target.value,
                  })
                }
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="LastName"
                required
                type="text"
                value={registerData.lastName}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    lastName: e.target.value,
                  })
                }
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              {" "}
              <Form.Control
                placeholder="Email"
                required
                type="text"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    email: e.target.value,
                  })
                }
              />{" "}
            </Col>
            <Col>
              {" "}
              <Form.Control
                placeholder="Password"
                required
                type="password"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    password: e.target.value,
                  })
                }
              />
            </Col>
          </Row>
          <button type="submit" className="btnAdmin admin-btn-full">
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
};
export default Register;
