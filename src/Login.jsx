import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(formData.username, formData.password)) {
      navigate("/library");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <Container>
      <Card>
        <Title>¡Bienvenido!</Title>
        {error && <ErrorText>{error}</ErrorText>}
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="username"
            placeholder="Usuario"
            value={formData.username}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
          />
          <Button type="submit">Iniciar sesión</Button>
        </form>
      </Card>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffeb3b;
`;

const Card = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  width: 350px;
  text-align: center;
`;

const Title = styled.h1`
  color: #ff5722;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  &:focus {
    border-color: #ff5722;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  margin-top: 15px;
  &:hover {
    background: #388e3c;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin: 5px 0;
`;
