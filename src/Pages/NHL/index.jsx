import React, { useEffect, useState } from "react";
import Nav from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import Card from "../../Components/Common/Card";
import getEvents from "../../api/getEvents";

function NHL() {
  const [data, setData] = useState([]);
  const getData = async () => {
    const { data: response } = await getEvents();
    setData(
      response.events.filter((card) => card.channel.TVCategory.name == "NHL")
    );
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div
        style={{
          minHeight: "100%",
          overflow: "hidden !important",
        }}
      >
        <Nav />
        <Card data={data} title={"NHL LIVE"} subtitle="NHL" />
      </div>
      <Footer />
    </>
  );
}

export default NHL;
