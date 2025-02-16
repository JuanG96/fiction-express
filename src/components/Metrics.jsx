import React from "react";
import styled from "styled-components";
import CustomText from "./CustomText";

const Metrics = ({ metrics }) => {
  if (!metrics) return null;

  return (
    <MetricsContainer>
      <CustomText tag="h2">Métricas de lectura</CustomText>
      <CustomText tag="p" fontSize={20} fontWeight={400}>
        <strong>Tiempo total:</strong> {metrics.totalTime} ms
      </CustomText>
      <CustomText tag="p" fontSize={20} fontWeight={400}>
        <strong>Tiempo promedio por página:</strong>{" "}
        {metrics.averageTime.toFixed(2)} ms
      </CustomText>
      <CustomText tag="p" fontSize={20} fontWeight={400}>
        <strong>Tiempo por página:</strong>{" "}
        {metrics.pageTimes.map((t, i) => (
          <span key={i}>
            Página {i + 1}: {t} ms
            {i < metrics.pageTimes.length - 1 && ", "}
          </span>
        ))}
      </CustomText>
    </MetricsContainer>
  );
};

export default Metrics;

const MetricsContainer = styled.div`
  max-width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1.5rem;
  width: 100%;
  background: rgba(250, 250, 250, 1);
  border-radius: 8px;
  text-align: left;
  font-size: 16px;
`;
