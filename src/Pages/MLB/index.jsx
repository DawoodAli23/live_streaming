import React, { useEffect, useState } from "react";
import Nav from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import Card from "../../Components/Common/Card";
import getEvents from "../../api/getEvents";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DashHeader from "../../Components/Dashboard/DashHeader";
import { Helmet } from "react-helmet";

function MLB() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    const { data: response } = await getEvents();
    setData(
      response.events.filter((card) => card.channel.TVCategory.name === "MLB")
    );
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const skeletonProps = {
    baseColor: "#170f2c", // Dark background color
    highlightColor: "#332e47", // Lighter highlight for the animation effect
  };

  return (
    <>
      <Helmet>
        <title>
          Watch MLB Live | Stream Major League Baseball in 4K on PixelSport TV
        </title>
        <meta
          name="description"
          content="Catch every MLB game live in HD and 4K on PixelSport TV. Stream Major League Baseball and never miss a home run or playoff moment."
        />
      </Helmet>
      <div>
        <div
          style={{
            minHeight: "100vh",
            overflow: "hidden !important",
          }}
        >
          <Nav />
          <DashHeader title={"MLB LIVE"} subtitle="MLB" />
          {loading ? (
            <div className="flex items-center justify-center relative pt-2">
              <div className="w-[93%] md:w-[73%] mb-4">
                <Skeleton
                  height={200}
                  count={3}
                  {...skeletonProps}
                  style={{ marginBottom: "20px" }}
                />
              </div>
            </div>
          ) : (
            <Card data={data} title={"MLB LIVE"} subtitle="MLB" />
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default MLB;
