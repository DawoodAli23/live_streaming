import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import DetailsComponent from "../../Components/Common/DetailsComponent";
import DetailsDescription from "../../Components/Common/DetailsDescription";
import TeamScore from "../../Components/Common/TeamScore";
import DetailsSlider from "../../Components/Common/BannerSlider";
import getEventById from "../../api/eventById";
import { useParams } from "react-router-dom";
import getSpecificDetails from "../../api/slider.api";
import BannerDetailComponent from "../../Components/Common/BannerDetailComponent";
import BannerDetailsDescription from "../../Components/Common/BannerDetailsDescription";
import axios from "axios";
function BannerPage() {
  const [url, setUrl] = useState("");
  const params = useParams();
  const [data, setData] = useState(null);
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
    const { data: response } = await getSpecificDetails(params.id);
    setData(response?.data);
    const result = await checkUrl(response?.data?.liveTV?.server1URL);
    if (result) {
      setUrl(response?.data?.liveTV?.server1URL);
    } else {
      setUrl(response?.data?.liveTV?.server2URL);
    }
  };
  useMemo(() => {
    getData();
  }, [params.id]);

  console.log(data);

  return (
    <div>
      <Navbar />
      <BannerDetailComponent data={data} url={url} />
      <BannerDetailsDescription data={data} setUrl={setUrl} />
      {/* <TeamScore /> */}
      <div className="mt-6 w-[61%] bg-[#130A2D] mx-auto h-[28vh] flex flex-col p-3 mb-2 banner-slidess">
        <h3 className="text-white font-medium text-2xl">You May Also Like</h3>
        <div className="w-[100vw] mt-4 ml-9  banner-slide-card mb-5 ">
          <DetailsSlider />
        </div>
      </div>
      <Footer className="mt-5" />
    </div>
  );
}

export default BannerPage;
