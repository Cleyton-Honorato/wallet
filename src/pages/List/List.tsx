import { useEffect, useMemo, useState } from "react";

import ContentHeader from "../../components/ContentHeader/ContentHeader";
import SelectInput from "../../components/SelectInput/SelectInput";
import { getSelectMonths, getSelectYears } from "../../api";

import HistoryFinanceCard from "../../components/HistoryFinanceCard/HistoryFinanceCard";

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";

import { Container, Content, Filters } from "./styles";
import { formatCurrency } from "../../utils/formatCurrenry";
import { formatDate } from "../../utils/formatDate";

type Params = { type: string };
interface RouteParams {
  match: {
    params: Params;
  };
}

interface Data {
  description: string;
  amountFormatted: string;
  frequency: string;
  dateFormatted: string;
  tagColor: string;
}

export default function List({ match }: RouteParams) {
  const [data, setData] = useState<Array<Data>>([]);

  const { type } = match.params;

  const title = useMemo(() => {
    return type === "entry-balance" ? "Entrada" : "Saída";
  }, [type]);

  const lineColor = useMemo(() => {
    return type === "entry-balance" ? "#F7931B" : "#E44C4E";
  }, [type]);

  const listData = useMemo(() => {
    return type === "entry-balance" ? gains : expenses;
  }, [type]);

  useEffect(() => {
    const response = listData.map((item) => {
      return {
        description: item.description,
        amountFormatted: formatCurrency(Number(item.amount)),
        frequency: item.frequency,
        dateFormatted: formatDate(item.date),
        tagColor: item.frequency === "recorrente" ? "#4E41F0" : "#E44C4E",
      };
    });

    setData(response);
  }, []);

  return (
    <Container>
      <ContentHeader title={title} lineColor={lineColor}>
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
        {data.map((item, index) => (
          <HistoryFinanceCard
            key={index}
            tagColor={item.tagColor}
            title={item.description}
            subtitle={item.dateFormatted}
            amount={item.amountFormatted}
          />
        ))}
      </Content>
    </Container>
  );
}
