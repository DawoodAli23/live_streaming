import React, { useEffect, useState } from "react";
import MainSlider from "../../Components/MainSlider";
import SliderHeader from "../../Components/Common/SliderHeader";
import CardSlider from "../../Components/Common/CardSlider";
import getEvents from "../../api/getEvents";
import Footer from "../../Components/Footer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    const { data: response } = await getEvents();
    setData(response.events);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  // Skeleton color and animation customization
  const skeletonProps = {
    baseColor: "#170f2c", // Dark background color
    highlightColor: "#332e47", // Lighter highlight for the animation effect
  };

  return (
    <>
      <div className="relative" style={{ overflow: "hidden" }}>
        <div className="relative">
          <MainSlider />
          <div className="nfl-view">
            <SliderHeader title="MLB Live" link="mlb" />
          </div>

          {loading ? (
            <Skeleton height={200} count={1} {...skeletonProps} />
          ) : (
            <CardSlider
              data={data.filter(
                (card) => card.channel.TVCategory.name === "MLB"
              )}
              type="MLB"
            />
          )}

          <SliderHeader title="NHL Live" link="nhl" />

          {loading ? (
            <Skeleton height={200} count={1} {...skeletonProps} />
          ) : (
            <CardSlider
              data={data.filter(
                (card) => card.channel.TVCategory.name === "NHL"
              )}
              type="NHL"
            />
          )}

          <SliderHeader title="NBA Live" link="nba" />

          {loading ? (
            <Skeleton height={200} count={1} {...skeletonProps} />
          ) : (
            <CardSlider
              data={data.filter(
                (card) => card.channel.TVCategory.name === "NBA"
              )}
              type="NBL"
            />
          )}
          <SliderHeader title="NFL Live" link="nfl" />
          {loading ? (
            <Skeleton height={200} count={1} {...skeletonProps} />
          ) : data.filter((card) => card.channel.TVCategory.name === "NFL")
              ?.length ? (
            <>
              <CardSlider
                data={data.filter(
                  (card) => card.channel.TVCategory.name === "NFL"
                )}
                type="NFL"
              />
            </>
          ) : (
            <>
              <div className="h-[15.2vh] flex items-center">
                <CardSlider
                  data={data.filter(
                    (card) => card.channel.TVCategory.name === "NFL"
                  )}
                  type="NFL"
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-3 ">
        <Footer />
      </div>
    </>
  );
}

export default Home;
