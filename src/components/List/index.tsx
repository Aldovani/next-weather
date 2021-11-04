import React from "react";
import Image from "next/image";

import { Container, Card, GroupList, Temp ,Loading} from "./styled";

const List = ({ forecast }: any) => {
  if (!forecast) return     <Loading title="Carregando" />
  ;
  else {
    forecast.length = 6;
  }
  return (
    <Container>
      <GroupList>
        {forecast?.map((item: any, i) => (
          <Card key={i}>
            <p>{item?.weekday}</p>
            <Image
              src={`/${item?.condition}.svg`}
              alt={item?.condition}
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
