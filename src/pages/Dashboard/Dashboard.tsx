import React from "react";

import ContentHeader from "../../components/ContentHeader/ContentHeader";
import SelectInput from "../..//components/SelectInput/SelectInput";
import { getSelectMonths } from "../../api";

import { Container } from "./styles";

const Dashboard: React.FC = () => {
  return (
    <Container>
      <ContentHeader title="Contente header">
        <SelectInput options={getSelectMonths} />
      </ContentHeader>
    </Container>
  );
};

export default Dashboard;
