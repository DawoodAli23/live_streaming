import React, { useEffect, useState } from "react";
import Nav from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import Card from "../../Components/Common/Card";
import getEvents from "../../api/getEvents";

function MLB() {
  const [data, setData] = useState([]);
  const getData = async () => {
    const { data: response } = await getEvents();
    setData(
      response.events.filter((card) => card.channel.TVCategory.name == "MLB")
    );
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div
        style={{
          minHeight: "100vh",
          overflow: "hidden !important",
        }}
      >
        <Nav />
        <Card data={data} title={"MLB LIVE"} subtitle="MLB" />
      </div>
      <Footer />
    </div>
  );
}

export default MLB;
