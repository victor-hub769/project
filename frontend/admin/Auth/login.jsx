import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import publicApi from "../../../api/publicApi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault();
    const { data } = await publicApi.post("/admin/login", loginData);
    console.log(data);
    if (data.message === "admin authenticated successfully") {
      Cookies.set("admintoken", data.token);
      // navigate("/admin");
      window.open('/admin', '_self')
    }
  };

  return (
    <div className="formBody">
      {" "}
      <div className="formStyle">
        <Form onSubmit={login} className="formm">
          <h3> Admin Login </h3>
          <Row>
            <Col>
              <Form.Control
                placeholder="Email"
                required
                type="text"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    email: e.target.value,
                  })
                }
              />
              <br/>
              <Form.Control
                placeholder="Password"
                required
                type="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    password: e.target.value,
                  })
                }
              />
            </Col>
          </Row>
          <br/>
          <button type="submit" className="btnAdmin admin-btn-full">
            Submit
          </button>
        </Form>
      </div>{" "}
    </div>
  );
};
export default Login;