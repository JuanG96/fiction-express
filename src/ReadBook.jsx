import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CustomText from "./components/CustomText";
import Metrics from "./components/Metrics";
import Reader from "./components/Reader";

const ReadBook = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState(null);
  const [bookTitle, setBookTitle] = useState("");

  const handleFinishReading = (newMetrics) => {
    setMetrics(newMetrics);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBack}>Volver</BackButton>
        <CustomText tag="h1" color="rgba(255, 87, 34, 1)">
          {bookTitle}
        </CustomText>
      </Header>

      {!metrics ? (
        <Reader
          onFinishReading={handleFinishReading}
          onBookTitle={setBookTitle}
        />
      ) : (
        <Metrics metrics={metrics} />
      )}
    </Container>
  );
};

export default ReadBook;

const Container = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackButton = styled.button`
  position: absolute;
  left: 0;
  font-size: 16px;
  padding: 8px 12px;
  background: rgba(76, 175, 80, 1);
  color: rgba(255, 255, 255, 1);
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
