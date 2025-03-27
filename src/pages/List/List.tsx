import { useEffect, useMemo, useState } from "react";

import ContentHeader from "../../components/ContentHeader/ContentHeader";
import SelectInput from "../../components/SelectInput/SelectInput";
// import { getSelectMonths, getSelectYears } from "../../api";

import HistoryFinanceCard from "../../components/HistoryFinanceCard/HistoryFinanceCard";

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";

import { Container, Content, Filters } from "./styles";
import { formatCurrency } from "../../utils/formatCurrenry";
import { formatDate } from "../../utils/formatDate";
import { useUniqueYears } from "../../hooks/useYear";
import listOfMonths from "../../utils/months";

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
  const month = String(new Date().getMonth() + 1);
  const year = String(new Date().getFullYear());

  const [data, setData] = useState<Array<Data>>([]);
  const [monthSelected, setMonthSelected] = useState<string>(month);
  const [yearSelected, setYearSelected] = useState<string>(year);

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

  const years = useUniqueYears(listData);

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        label: month,
        value: index + 1,
      };
    });
  }, []);

  useEffect(() => {
    const response = listData
      .filter((item) => {
        const date = new Date(item.date);
        const month = String(date.getMonth() + 1);
        const year = String(date.getFullYear());

        return month === monthSelected && year === yearSelected;
      })
      .map((item) => {
        return {
          description: item.description,
          amountFormatted: formatCurrency(Number(item.amount)),
          frequency: item.frequency,
          dateFormatted: formatDate(item.date),
          tagColor: item.frequency === "recorrente" ? "#4E41F0" : "#E44C4E",
        };
      });

    setData(response);
  }, [listData, monthSelected, yearSelected, data.length]);

  return (
    <Container>
      <ContentHeader title={title} lineColor={lineColor}>
        <SelectInput
          defaultValue={month}
          options={months}
          onChange={(e) => setMonthSelected(e.target.value)}
        />
        <SelectInput
          defaultValue={year}
          options={years}
          onChange={(e) => setYearSelected(e.target.value)}
        />
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
