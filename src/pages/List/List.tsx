import React from "react";

import ContentHeader from "../../components/ContentHeader/ContentHeader";
import SelectInput from "../../components/SelectInput/SelectInput";
import { getSelectMonths, getSelectYears } from "../../api";

import HistoryFinanceCard from "../../components/HistoryFinanceCard/HistoryFinanceCard";

import { Container, Content, Filters } from "./styles";

export default function List() {
  return (
    <Container>
      <ContentHeader title="Saída">
        <SelectInput options={getSelectYears} />
        <SelectInput options={getSelectMonths} />
      </ContentHeader>

      <Filters>
        <button
          type="button"
          className="tag-filter tag-filter-recurrent"
          id="recurrent"
        >
          Recorrentes
        </button>

        <button
          type="button"
          className="tag-filter tag-filter-eventual"
          id="Eventuel"
        >
          Eventuais
        </button>
      </Filters>

      <Content>
        <HistoryFinanceCard
          tagColor="#E44C4E"
          title="Conta de luz"
          subtitle={new Date().toString()}
          amount={125}
        />
      </Content>
    </Container>
  );
}
