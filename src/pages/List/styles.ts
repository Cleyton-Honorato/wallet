import styled from "styled-components";

export const Container = styled.div``;

export const Content = styled.div``;

export const Filters = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;

  .tag-filter {
    font-size: 18px;
    font-weight: 500;
    background: none;
    color: ${(props) => props.theme.colors.textPrimaryColor};

    margin: 0 10px;

    transition: opacity 0.3s;

    opacity: 0.4;

    &:hover {
      opacity: 0.7;
    }
  }

  .tag-filter-recurrent::after {
    content: "";
    display: block;
    width: 100%;
    margin: 0.4rem 0 0 0;
    border-bottom: 0.4rem solid ${(props) => props.theme.colors.success};
    border-radius: 5px;
  }

  .tag-filter-eventual::after {
    content: "";
    display: block;
    width: 100%;
    margin: 0.4rem 0 0 0;
    border-bottom: 0.4rem solid ${(props) => props.theme.colors.warning};
    border-radius: 5px;
  }

  .actived {
    opacity: 1;
  }
`;
