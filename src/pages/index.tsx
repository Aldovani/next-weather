import Image from "next/image";
import { api } from "../services/api";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { SiWindicss } from "react-icons/si";
import { BsMoisture } from "react-icons/bs";
import { FiSunrise, FiSunset } from "react-icons/fi";
import {
  Grid,
  Aside,
  Main,
  CurrentDay,
  Input,
  Button,
  LabelSearch,
  StatsSun,
  CityName,
} from "../styles/home";
import List from "../components/List";
import { useEffect, useState } from "react";
import Data from "../components/Data";

export default function Home({ dataApi }) {
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);

  async function getApiByCity() {
    const response = await api.get(
      `weather?format=json-cors&key=89ddc67e&city_name=${input || "São paulo"}`
    );
    setData(response.data.results);
  }
  async function getApiByCoords(lon, lat) {
    const response = await api.get(
      `weather?format=json-cors&key=89ddc67e&lat=${lat}&lon=${lon}&user_ip=remote`
    );
    console.log(response);
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
    <Grid>
      <Main>
        <Data />

        <List forecast={data?.forecast} />
      </Main>

      <Aside>
        <LabelSearch htmlFor="search">
          <Input
            type="text"
            id="search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Procurar..."
          />
          <Button onClick={getApiByCity}>
            <HiOutlineLocationMarker size={"1.5rem"} color="#fdfdfd" />
          </Button>
        </LabelSearch>
        <CurrentDay>
          <CityName>
            <HiOutlineLocationMarker size={"1.5rem"} color="#fdfdfd" />

            <span>{data?.city}</span>
          </CityName>
          <Image
            src={`/${data?.condition_slug}.svg`}
            alt=""
            width={150}
            height={150}
          />

          <div className="info-day">
            <h2>{data?.temp}°</h2>
            <p>{data?.description}</p>

            <div className="flex">
              <SiWindicss size={"1.5rem"} />
              <h2>{data?.wind_speedy}</h2>
            </div>

            <div className="flex">
              <BsMoisture size={"1.5rem"} />
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
    </Grid>
  );
}

export async function getServerSideProps(context) {
  const response = await fetch(
    `https://api.hgbrasil.com/weather?format=json-cors&key=${process.env.API_KEY}&city_name=sao-paulo`
  );
  const data = await response.json();

  return {
    props: {
      dataApi: data.results,
    },
  };
}
