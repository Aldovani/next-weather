import Image from "next/image";
import { api } from "../services/api";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { SiWindicss } from "react-icons/si";
import { BsMoisture } from "react-icons/bs";
import { FiSunrise, FiSunset } from "react-icons/fi";
import {
  BackGround,
  Aside,
  Main,
  CurrentDay,
  Input,
  Button,
  LabelSearch,
  StatsSun,
  Container,
  CityName,
} from "../styles/home";
import List from "../components/List";
import { useEffect, useState } from "react";
import Data from "../components/Data";

type DataApiProps = {
  currently: string;
  condition_slug: string;
  city: string;
  temp: string;
  sunset: string;
  sunrise: string;
  description: string;
  wind_speedy: string;
  humidity: string;
  forecast: {
    weekday: string;
    condition: string;
    description: string;
    max: number;
    min: number;
  }[];
};
type HomeProps = {
  dataApi: DataApiProps;
  apiKey: string;
};

export default function Home({ dataApi, apiKey }: HomeProps) {
  const [input, setInput] = useState("");
  const [data, setData] = useState({} as DataApiProps);

  async function getApiByCity() {
    const response = await api.get(
      `weather?format=json-cors&key=${apiKey}&city_name=${input || "São paulo"}`
    );
    setData(response.data.results);
    setInput("");
  }
  async function getApiByCoords(lon, lat) {
    const response = await api.get(
      `weather?format=json-cors&key=${apiKey}&lat=${lat}&lon=${lon}&user_ip=remote`
    );
    setData(response.data.results);
  }

  useEffect(() => {
    setData(dataApi);
    try {
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        getApiByCoords(longitude, latitude);
      });
    } catch (error) {
      console.log(error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BackGround className={data?.currently}>
      <Container>
        <Main className={data?.currently}>
          <Data />

          <List forecast={data.forecast} />
        </Main>

        <Aside className={data.currently}>
          <LabelSearch
            onSubmit={(e) => {
              e.preventDefault();
              getApiByCity();
            }}
          >
            <Input
              type="text"
              id="search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Procurar..."
              autoComplete="off"
              autoFocus
              
            />
            <Button type="submit">
              <HiOutlineLocationMarker size={"1.5rem"} color="#fdfdfd" />
            </Button>
          </LabelSearch>
          <CurrentDay className={data?.currently}>
            <CityName>
              <HiOutlineLocationMarker
                title="localização"
                size={"1.5rem"}
                color="#fdfdfd"
              />

              <span>{data.city}</span>
            </CityName>
            <Image
              src={`/${data.condition_slug}.svg`}
              alt={data.condition_slug}
              title={data.description}
              width={150}
              height={150}
            />

            <div className="info-day">
              <h2>{data.temp}°</h2>
              <p>{data.description}</p>

              <div className="flex">
                <SiWindicss title="velocidade do vento" size={"1.5rem"} />
                <h2>{data?.wind_speedy}</h2>
              </div>

              <div className="flex">
                <BsMoisture title="umidade do ar" size={"1.5rem"} />
                <h2>{data?.humidity}%</h2>
              </div>
            </div>
          </CurrentDay>

          <StatsSun>
            <div>
              <FiSunrise title="Nascer do sol" size={"2rem"} color="#fDfDfD" />
              <p>{data?.sunrise}</p>
            </div>
            <div>
              <FiSunset size={"2rem"} color="#fDfDfD" title="Por do sol" />
              <p>{data?.sunset}</p>
            </div>
          </StatsSun>
        </Aside>
      </Container>
    </BackGround>
  );
}

export async function getServerSideProps(context) {
  let data;
  try {
    const response = await fetch(
      `https://api.hgbrasil.com/weather?format=json-cors&key=${process.env.API_KEY}&city_name=sao-paulo`
    );
    data = await response.json();
  } catch (error) {
    console.log(error);
    data.results = {
      currently: "dia",
      condition_slug: "cloudly_day",
      city: "dobrada",
      temp: "19",
      sunset: "5:31 am",
      sunrise: "6:30 pm",
      description: "Parcialmente nublado",
      wind_speedy: "1.54",
      humidity: "30",
      forecast: [
        { weekday: "dom", condition: "cloudly_day", max: "33", min: "19",description:"Nublado" },
        { weekday: "dom", condition: "cloudly_day", max: "33", min: "19",description:"Nublado" },
        { weekday: "dom", condition: "cloudly_day", max: "33", min: "19",description:"Nublado" },
        { weekday: "dom", condition: "cloudly_day", max: "33", min: "19",description:"Nublado" },
        { weekday: "dom", condition: "cloudly_day", max: "33", min: "19",description:"Nublado" },
        { weekday: "dom", condition: "cloudly_day", max: "33", min: "19",description:"Nublado" },
       
      ],
    };
  }

  return {
    props: {
      dataApi: data.results,
      apiKey: process.env.API_KEY,
    },
  };
}
