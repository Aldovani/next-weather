import React from "react";
import Image from "next/image";

import { Container, Card, GroupList, Temp, Loading } from "./styled";
type ListProps = {
  forecast: {
    weekday: string;
    condition: string;
    description: string;
    max: number;
    min: number;
  }[];
};

const List = ({ forecast }: ListProps) => {
  if (!forecast) return <Loading title="Carregando" />;
  else forecast.length = 6;

  return (
    <Container>
      <GroupList>
        {forecast.map((item, i) => (
          <Card key={i}>
            <p>{item.weekday}</p>
            <Image
              src={`/${item.condition}.svg`}
              alt={item.condition}
              title={item.description}
              width={150}
              height={100}
            />
            <Temp>
              <p className="max">{item.max}°</p>
              <p className="min">{item.min}°</p>
            </Temp>
          </Card>
        ))}
      </GroupList>
    </Container>
  );
};

export default List;
