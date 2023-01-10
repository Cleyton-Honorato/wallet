import styled from "styled-components";

interface TagProps {
  color: string;
}

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: ${(props) => props.theme.colors.tertiary};
  list-style: none;
  border-radius: 0.5em;
  margin: 10px 0;
  padding: 12px 10px;

  cursor: pointer;
  transition: all 0.3s;

  position: relative;

  &:hover {
    opacity: 0.7;
    transform: translateX(10px);
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 10px;
  }
`;

export const Tag = styled.div<TagProps>`
  background-color: ${(props) => props.color};
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  height: 100%;

  position: absolute;
  left: 0;
`;
