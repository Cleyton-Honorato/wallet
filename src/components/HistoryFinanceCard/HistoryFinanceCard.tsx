import React from "react";

import { Container, Tag } from "./styles";

interface HistoryFinanceCardProps {
  tagColor: string;
  title: string;
  subtitle: string;
  amount: number;
}

export default function HistoryFinanceCard(props: HistoryFinanceCardProps) {
  const { tagColor, title, subtitle, amount } = props;
  return (
    <Container>
      <Tag color={tagColor} />

      <div>
        <span>{title}</span>
        <small>{subtitle}</small>
      </div>

      <h3>{`R$ ${amount}`}</h3>
    </Container>
  );
}
