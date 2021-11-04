import React, { useEffect, useState } from "react";

const useClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const day = time.toLocaleDateString("pt-br", { weekday: "long" });
  const date = `${day}, ${time.getDate()} ${time.toLocaleDateString("pt-br", {
    month: "long",
  })} ${time.getFullYear()}`;

  return {
    time: time.toLocaleTimeString("pt-br", {
      hour: "numeric",
      hour12: true,
      minute: "numeric",
    }),
    date: date,
  };
};

import { Container } from "./styles";

const Data: React.FC = () => {
  const { time, date } = useClock();

  return (
    <Container>
      <h2>{time}</h2>
      <p>{date}</p>
    </Container>
  );
};

export default Data;
