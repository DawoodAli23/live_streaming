import React, { useEffect, useState } from "react";
import MainSlider from "../../Components/MainSlider";
import SliderHeader from "../../Components/Common/SliderHeader";
import CardSlider from "../../Components/Common/CardSlider";
import getEvents from "../../api/getEvents";
import Footer from "../../Components/Footer";

function Home() {
  const [data, setData] = useState([]);
  const getData = async () => {
    const { data: response } = await getEvents();
    setData(response.events);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className=" main-home-page relative" style={{ overflow: "hidden" }}>
        <div className="relative">
          <MainSlider />
          <div className="nfl-view">
            <SliderHeader title="NFL Live" link="nfl" />
          </div>
          <CardSlider
            data={data.filter((card) => {
              return card.channel.TVCategory.name == "NFL";
            })}
            type="NFL"
          />
          <SliderHeader title="NHL Live" link="nhl" />
          <CardSlider
            data={data.filter((card) => card.channel.TVCategory.name == "NHL")}
            type="NHL"
          />
          <SliderHeader title="NBA Live" link="nba" />
          <CardSlider
            data={data.filter((card) => card.channel.TVCategory.name == "NBA")}
            type="NBL"
          />
          <SliderHeader title="MLB Live" link="mlb" />
          <CardSlider
            data={data.filter((card) => card.channel.TVCategory.name == "MLB")}
            type="MLB"
          />
        </div>
      </div>
      <div className="mt-3 ">
        <Footer />
      </div>
    </>
  );
}

export default Home;
