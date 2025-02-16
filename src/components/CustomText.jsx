import React from "react";
import styled from "styled-components";

const CustomText = ({ tag = "p", fontSize, fontWeight, color, children }) => {
  return (
    <StyledText
      as={tag}
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
    >
      {children}
    </StyledText>
  );
};

const StyledText = styled.p`
  font-size: ${(props) => `${props.fontSize}px`};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color || "rgba(24, 24, 25, 1)"};
  margin: 0;
`;

export default CustomText;
