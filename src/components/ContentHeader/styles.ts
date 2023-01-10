import styled from "styled-components";

interface TitleContainerProps {
  lineColor?: string;
}

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  margin-bottom: 25px;
`;

export const TitleContainer = styled.div<TitleContainerProps>`
  > h1 {
    color: ${(props) => props.theme.colors.textPrimaryColor};

    &::after {
      content: "";
      display: block;
      width: 55px;
      border-bottom: 10px solid
        ${(props) =>
          props.lineColor ? props.lineColor : props.theme.colors.warning};
    }
  }
`;

export const Controllers = styled.div`
  display: flex;
`;
