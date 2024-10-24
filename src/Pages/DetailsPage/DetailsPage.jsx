import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import DetailsComponent from "../../Components/Common/DetailsComponent";
import DetailsDescription from "../../Components/Common/DetailsDescription";
import TeamScore from "../../Components/Common/TeamScore";
import DetailsSlider from "../../Components/Common/DetailsSlider";
import getEventById from "../../api/eventById";
import { useParams, useNavigate } from "react-router-dom";
import BannerDetailSlider from "../../Components/Common/BannerSlider";
import axios from "axios";
import canView from "../../api/canView";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import TheaterMode from "../../Components/TheaterMode";

function DetailsPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [url, setUrl] = useState(null);
  const containerRef = useRef(null);
  const params = useParams();
  const [data, setData] = useState(null);
  const [theaterMode, setTheaterMode] = useState(false);
  const toggleTheaterMode = () => {
    setTheaterMode((prevMode) => !prevMode);
  };
  const checkUrl = async () => {
    try {
      await axios.get(url, {
        headers: {
          "Content-type": "application/json",
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  };

  const getData = async () => {
    try {
      const { data: response } = await getEventById(params.id);
      scrollToTop();
      setData(response.events);

      const result = await checkUrl(response.events?.channel?.server2URL);
      if (result) {
        setUrl(response.events?.channel?.server2URL);
      } else {
        setUrl(response.events?.channel?.server1URL);
      }
      if (response.events.channel.TVAccess == "paid") {
        await canViewPage();
      } else {
        await canView();
      }
    } catch (error) {}
  };
  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  };
  useEffect(() => {
    getData();
    scrollToTop();
  }, [params.id]);

  const canViewPage = async () => {
    try {
      const result = await canView();
      if (localStorage.getItem("data")) {
        if (!result.data.flag) {
          navigate("/membership_plan");
        }
      } else {
        navigate("/signup?access=none");
      }
    } catch (error) {
      navigate("/signup?access=none");
    }
  };
  useEffect(() => {
    // canViewPage();
  }, []);

  return (
    <div
      ref={containerRef}
      className="App"
      style={{
        height: "100vh",
        overflowX: "hidden !important",
        overflowY: "auto",
      }}
      // style={{ height: "100vh" }}
    >
      {" "}
      <Navbar />
      <div>
        {theaterMode ? (
          <div>
            <TheaterMode
              data={data}
              setUrl={setUrl}
              url={url}
              setTheaterMode={setTheaterMode}
            />
          </div>
        ) : (
          <div>
            {url ? <DetailsComponent data={data} url={url} /> : <></>}
            <DetailsDescription
              data={data}
              setUrl={setUrl}
              toggleTheaterMode={toggleTheaterMode}
            />
            <TeamScore
              teamA={{
                name: data?.competitors1_name,
                score: data?.competitors1_score,
              }}
              teamB={{
                name: data?.competitors2_name,
                score: data?.competitors2_score,
              }}
            />
            <div
              className="mt-6 w-[80rem] h-[17rem] bg-[#130A2D] mx-auto pt-3 pb-6 ps-7 flex flex-col p-3 mb-4 "
              style={{ overflow: "hidden" }}
            >
              <h3 className="text-white font-medium text-2xl">
                You May Also Like
              </h3>
              <div className="w-[110rem] mt-4 mb-5 banner-slide-card">
                <DetailsSlider />
              </div>
            </div>
          </div>
        )}
      </div>
      {theaterMode ? <div></div> : <Footer />}
    </div>
  );
}

export default DetailsPage;
