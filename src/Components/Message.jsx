// Message.js
import React, { useEffect, useRef, useState } from "react";
import Dots from "../Assets/Icons/dots.png";
import deleteMessage from "../api/deleteMessage";
import blockUser from "../api/blockUser";
const getMessageTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};
// TimeAgo.addDefaultLocale(en);
// TimeAgo.addLocale(ru);

const Message = ({ msg, index, isMod, messages, setMessages }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [openActionBoxIndex, setOpenActionBoxIndex] = useState(false);
  const actionBoxRef = useRef(null);
  const isLastMessage = index === messages.length - 1;
  // const toggleVisibility = (e) => {
  //   e.stopPropagation();
  //   setIsVisible(!isVisible);
  //   setOpenActionBoxIndex(index);
  // };
  const getRandomColor = () => {
    const colors = [
      "#A5F700",
      "#F766AE",
      "#F4F518",
      "#B93EB9",
      "#05CEF2",
      "#F6A71B",
      "#F6781D",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  const handleToggleActionBox = () => {
    if (openActionBoxIndex === index && isVisible) {
      setIsVisible(false);
      setOpenActionBoxIndex(null);
    } else {
      setIsVisible(true);
      setOpenActionBoxIndex(index);
    }
  };
  const currentTime = getMessageTime();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (actionBoxRef.current && !actionBoxRef.current.contains(e.target)) {
        setIsVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const deleteChat = async () => {
    try {
      const response = await deleteMessage(msg._id);
      let array = [...messages];
      array.splice(index, 1);
      console.log(array);
      setMessages(array);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const blockUserByUserId = async () => {
    try {
      const response = await blockUser({ userId: msg?.userId?._id });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <p
      className={`flex  p-1 justify-between w-[100%] msg-actions ${
        index % 2 === 0 ? "even-msg" : ""
      }`}
      style={{
        background: index % 2 === 0 ? "#1b1b1b" : "#3f3f3f",
        overflow: "visible",
      }}
    >
      <div className="flex p-1 w-[100%]">
        <div className=" h-[30px] mr-1">
          <img
            src="https://source.unsplash.com/random/person"
            alt=""
            className="w-[25px] h-[25px]"
          />
        </div>
        <div className="flex  w-[90%]">
          <span
            className="font-medium text-sm  "
            style={{
              minWidth: "60px",
              maxWidth: "120px",
              wordWrap: "break-word",
              overflow: "hidden",
              color: getRandomColor(),
            }}
          >
            {msg.userId.name} : ${isMod ? "hehehe" : "nonono"}
          </span>
          <div className="flex justify-between" style={{ width: "70%" }}>
            <span
              className="text-white ml-2 msg-text text-sm"
              style={{
                wordWrap: "break-word",
                overflow: "hidden",
              }}
            >
              {msg.message}
            </span>
          </div>
        </div>
        <div>
          <span className="text-white flex jusitfy-end items-end text-xs relative">
            {/* <ReactTimeAgo date={currentTime} locale="en-US" /> */}
          </span>
          <div className="relative" ref={actionBoxRef}>
            <button
              className="relative action-dot"
              onClick={handleToggleActionBox}
            >
              <img src={Dots} alt="" className="w-[20px]" />
            </button>
            {isVisible && openActionBoxIndex === index && (
              <div
                className="absolute w-[100px] h-auto border border-white flex flex-column action-box  bg-[#251947]"
                style={{
                  zIndex: "999",
                  left: "-430%",
                  top: isLastMessage ? "-290%" : "",
                  boxShadow: "1px 2px 9px 3px rgba(0,0,0,0.62)",
                }}
              >
                <span
                  className="border p-2 h-[50%] w-[100%] cursor-pointer px-2 text-white action-hover action-box1"
                  onClick={() => {
                    blockUserByUserId();
                  }}
                >
                  Block
                </span>
                <span
                  onClick={() => {
                    deleteChat();
                  }}
                  className="border p-2 h-[50%] w-[100%] cursor-pointer px-2 text-white action-hover action-box2 "
                >
                  Delete
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </p>
  );
};

export default Message;
