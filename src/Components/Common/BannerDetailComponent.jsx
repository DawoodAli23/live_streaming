import React, { useEffect, useState } from "react";
import "../../Assets/styles/CardDetailss.scss";
import DetailsIcon from "./DetailsIcon";
import VideoPlayer from "./VideoPlayer";
import ClapprPlayer from "./ClapprPlayer";
import axiosInstance from "../../api";
import axios from "axios";
import { url as url1 } from "../../helper/url";
// import LiveChat from "../NameLiveChat";
import "../../Assets/styles/DetailComponent.scss";

function BannerDetailComponent({ data, url }) {
  const [show, setShow] = useState(true);
  // const [videoPlayer, setVideoPlayer] = useState(false);
  // setTimeout(() => setShow(true), 10000);
  const getData = async () => {
    try {
      const response = await axios.get(url);
      setShow(true);
    } catch (error) {
      setShow(false);
    }
  };
  useEffect(() => {
    getData();
  }, [url]);
  return (
    <div className="flex !justify-center clapper-palyer">
      {!show ? (
        <div className="detail-clapper-player-container">
          <div className=" mt-2 flex h-full detail-clapper-player">
            <ClapprPlayer url="https://main.fhdsports.live/hdstreamlive/hdembed/6.m3u8" />
          </div>
        </div>
      ) : (
        <div
          className=" w-[60vw] h-[50vh] watch-img mb-4"
          style={{
            background: `linear-gradient(-60deg, #${
              data?.data?.competitors?.filter(
                (comp) => comp.homeAway == "home"
              )[0].color === "ffffff"
                ? "808080"
                : data?.data?.competitors?.filter(
                    (comp) => comp.homeAway == "home"
                  )[0].color
            } 50%, #${
              data?.data?.competitors?.filter(
                (comp) => comp.homeAway == "home"
              )[0].alternateColor === "ffffff"
                ? "808080"
                : data?.data?.competitors?.filter(
                    (comp) => comp.homeAway == "home"
                  )[0].alternateColor
            } 50%)`,
          }}
        >
          <div
            className="placeAndTime"
            style={{
              width: "92%",
              height: "3vh",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              margin: "auto",
            }}
          ></div>
          <img
            className="mx-auto watch-img w-[100vw] h-[50vh]"
            src={url1 + "\\" + data?.image?.replace("uploads\\", "")}
          />
          {/* <div className="" style={{ marginTop: "25px" }}>
            <DetailsIcon
              iconsData={data?.data?.competitors?.map((comp) => ({
                iconUrl: comp.logo,
                name: comp.name,
              }))}
            />
          </div> */}
        </div>
      )}
    </div>
  );
}

export default BannerDetailComponent;
