import React from "react";

function DetailsDescription() {
  return (
    <div className="flex justify-center mt-8 ">
      <div className=" bg-[#190D39] w-[80rem] pt-12 pb-6 ps-7">
        <div className=" flex gap-3">
          <button class="bg-[#FE8805] hover:bg-[#0973F6] text-white text-sm font-medium py-[7px] px-4 rounded">
            <div className="flex gap-1">
              <svg
                fill="#FFFFFF"
                width="20px"
                height="20px"
                viewBox="-2 -3 24 24"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMinYMin"
                class="jam jam-screen"
              >
                <path d="M3 2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3zm0-2h14a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3zm4 16h6a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2z" />
              </svg>
              <label>Home</label>
            </div>
          </button>
          <button class="bg-[#FE8805] hover:bg-[#0973F6] text-white text-sm font-medium py-[7px] px-4 rounded">
            <div className="flex gap-1">
              <svg
                fill="#FFFFFF"
                width="20px"
                height="20px"
                viewBox="-2 -3 24 24"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMinYMin"
                class="jam jam-screen"
              >
                <path d="M3 2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3zm0-2h14a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3zm4 16h6a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2z" />
              </svg>
              <label>Away</label>
            </div>
          </button>
        </div>
        <div className="text-white pt-10">
          <h1 className="text-2xl font-semibold">
            Pittsburgh Steelers at Cleveland Browns
          </h1>
          <br />
          <p className="flex gap-2 text-lg items-center">
            <svg
              fill="#FFFFFF"
              width="20px"
              height="20px"
              viewBox="0 0 36 36"
              version="1.1"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
              //   xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <title>map-solid</title>
              <path
                class="clr-i-solid clr-i-solid-path-1"
                d="M33.31,7.35,25,9.94V14H23V10.29L14,5.68V9H12V5.27l-9.67,4A.53.53,0,0,0,2,9.75V30.45a.53.53,0,0,0,.74.49L12,27.12V23h2v4.53l9,4.61V28h2v3.79l8.63-2.7a.53.53,0,0,0,.37-.51V7.86A.53.53,0,0,0,33.31,7.35ZM14,21H12V17h2Zm0-6H12V11h2ZM25,26H23V22h2Zm0-6H23V16h2Z"
              ></path>
              <rect x="0" y="0" width="36" height="36" fill-opacity="0" />
            </svg>
            Cleveland Browns Stadium
          </p>
          <p className="flex gap-2 items-center">
            <svg
              fill="#FFFFFF"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
            >
              <path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M15.5,14c-0.3,0.5-0.9,0.6-1.4,0.4l-2.6-1.5C11.2,12.7,11,12.4,11,12V7c0-0.6,0.4-1,1-1s1,0.4,1,1v4.4l2.1,1.2C15.6,12.9,15.7,13.5,15.5,14z" />
            </svg>
            2023-11-19 13:00:00
          </p>
          <br />
          <button className="bg-[#118D04] hover:bg-white text-white hover:text-[#118D04] font-bold py-2 px-4 rounded flex gap-1 items-center">
            <svg
              fill="#FFFFFF"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z" />
            </svg>
            <p className="text-sm font-medium"> Add to Watchlist</p>
          </button>
        </div>
      </div>
      ;
    </div>
  );
}

export default DetailsDescription;