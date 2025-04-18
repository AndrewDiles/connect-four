import { memo } from "react";
import styled from "styled-components";
const SpecialMessage = ({ message }) => {
  return <Message>{message}</Message>;
};

export default memo(SpecialMessage);

const Message = styled.p`
  margin: auto;
  position: absolute;
  bottom: 0;
  width: fit-content;
  padding: 0 0.4em;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  left: 50%;
  transform: translateX(-50%);
`;
