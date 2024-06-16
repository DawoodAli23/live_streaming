import React, { useEffect, useState } from "react";
import avatar from "../../utils/images/avatar.png";
import plan from "../../utils/images/plan.png";
import { Link, useNavigate } from "react-router-dom";
import getUserPayments from "../../api/getUserPayment";
import bankDetails from "../../api/getBankDetails";
import getStats from "../../api/getStats";
import makeRequest from "../../api/makeRequest";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
function Plans({ userData, variant }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/profile");
  };
  const handleSelecPlanClick = () => {
    navigate("/membership_plan");
  };
  const [accNo, setAccNo] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const [bankSwift, setBankSwift] = useState("");
  const [iban, setIban] = useState("");
  const [bankAddress, setBankAddress] = useState("");
  const [inputValue, setInputValue] = useState();
  const [copyMessage, setCopyMessage] = useState("");
  const [userCount, setUserCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(
    localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : {}
  );

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const getUserBankDetails = async () => {
    try {
      const response = await bankDetails(data._id);
      if (response?.data?.bankDetails?.length) {
        setAccNo(response?.data?.bankDetails[0]?.accountNo);
        setBeneficiary(response?.data?.bankDetails[0]?.beneficiary);
        setBankSwift(response?.data?.bankDetails[0]?.bankSwift);
        setIban(response?.data?.bankDetails[0]?.iban);
        setBankAddress(response?.data?.bankDetails[0]?.bankAddress);
      }
      console.log(response?.data?.bankDetails);
    } catch (error) {
      console.log(error);
    }
  };
  const getUserStats = async () => {
    try {
      const response = await getStats();
      setUserCount(response.data.data.userCount);
      setTotalAmount(response.data.data.totalAmount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBankDetails();
    getUserStats();
  }, []);
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(data._id)
      .then(() => {
        setCopyMessage("URL Copied!");
      })
      .catch((err) => {
        setCopyMessage("Copy failed");
        console.error("Failed to copy!", err);
      });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const confirmRequest = async () => {
    try {
      const response = await makeRequest();
      handleClose();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (copyMessage) {
      const timer = setTimeout(() => {
        setCopyMessage("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copyMessage]);

  // const data = JSON.parse(localStorage.getItem("data"));
  if (variant === "secondary")
    return (
      <div className=" bg-[#0D0620]  py-5">
        <div className="flex flex-row flex-wrap w-[68%] mx-auto affiliate-dash-main justify-around text-white bg-[#130A2D] px-8 py-10 rounded  gap-5">
          <div
            className="flex flex-col gap-3 justify-start items-start md:w-[30%] affiliates-card w-[25vw] p-3 bg-center rounded-xl"
            style={{
              backgroundColor: "#1F1340",
              backgroundImage: `url(${plan})`,
              height: "max-cotent",
            }}
          >
            <p className="text-xl mb-2">
              My Details
              <div
                className="w-10 rounded-lg text-blue-500 bg-blue-500"
                style={{ paddingTop: "2px" }}
              />
            </p>
            <div className=" flex flex-col gap-3">
              <div className="flex ">
                <p>Acc. Number:</p>
                <div
                  className="w-auto flex items-center justify-center bg-[#362B53] rounded ml-2 p-1 px-3"
                  style={{ fontSize: "11px" }}
                >
                  {accNo}
                </div>
              </div>
              <div className="flex ">
                <p>Beneficiary Name:</p>
                <div
                  className="w-auto  flex items-center justify-center bg-[#362B53] rounded ml-2 p-1 px-2"
                  style={{ fontSize: "11px" }}
                >
                  {beneficiary}
                  {/* November, 01, 2023 */}
                </div>
              </div>
              <div className="flex ">
                <p>Bank Swift:</p>
                <div
                  className="w-auto  flex items-center justify-center bg-[#362B53] rounded ml-2 p-1 px-2"
                  style={{ fontSize: "11px" }}
                >
                  {bankSwift}
                  {/* November, 01, 2023 */}
                </div>
              </div>
              <div className="flex ">
                <p>IBAN:</p>
                <div
                  className="w-auto  flex items-center justify-center bg-[#362B53] rounded ml-2 p-1 px-2"
                  style={{ fontSize: "11px" }}
                >
                  {iban}
                  {/* November, 01, 2023 */}
                </div>
              </div>
              <div className="flex ">
                <p>Bank Address:</p>
                <div
                  className="w-auto  flex items-center justify-center bg-[#362B53] rounded ml-2 p-1 px-2"
                  style={{ fontSize: "11px" }}
                >
                  {bankAddress}
                  {/* November, 01, 2023 */}
                </div>
              </div>

              <div>
                <button class="bg-gradient-to-r mt-2 from-[#00C4FF] to-[#0074FF] hover:bg-gradient-to-l text-white font-normal py-2 px-4 rounded flex flex-row gap-2  justify-center items-center ">
                  <Link to="/bank_details">Edit</Link>
                </button>
              </div>
            </div>
          </div>

          <div
            className="flex flex-col gap-3 justify-start items-start md:w-[30%] affiliates-card w-[25vw] p-4 bg-center rounded-xl"
            style={{
              backgroundColor: "#1F1340",
              backgroundImage: `url(${plan})`,
              height: "max-cotent",
            }}
          >
            <p className="text-xl mb-2">
              Generated URL
              <div
                className="w-10 rounded-lg bg-blue-500"
                style={{ paddingTop: "2px" }}
              />
            </p>
            <div>
              <input
                class="appearance-none bg-[#22134E] text-white h-[5vh] block w-full text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none "
                id="grid-first-name"
                type="text"
                value={data?._id}
                onChange={handleInputChange}
              />
              <button
                class="bg-gradient-to-r from-[#00C4FF] to-[#0074FF] hover:bg-gradient-to-l text-white font-normal py-2 px-4 mt-3 mb-2 rounded flex flex-row gap-2  justify-center items-center "
                onClick={copyToClipboard}
              >
                Copy to Clipboard
              </button>
              {copyMessage && <p>{copyMessage}</p>}
            </div>
          </div>
          <div
            className="flex flex-col gap-3 justify-start items-start md:w-[30%] affiliates-card w-[25vw] p-3 bg-center rounded-xl"
            style={{
              backgroundColor: "#1F1340",
              backgroundImage: `url(${plan})`,
              height: "max-cotent",
            }}
          >
            <p className="text-xl mb-2">
              My History
              <div
                className="w-10 rounded-lg text-blue-500 bg-blue-500"
                style={{ paddingTop: "2px" }}
              />
            </p>
            <div className=" flex flex-col gap-3">
              <div className="flex ">
                <p>Current Earnings:</p>
                <div
                  className="w-auto flex items-center justify-center bg-[#362B53] rounded ml-2 p-1 px-3"
                  style={{ fontSize: "11px" }}
                >
                  {userCount}
                </div>
              </div>
              <div className="flex ">
                <p>Signed Up:</p>
                <div
                  className="w-auto  flex items-center justify-center bg-[#362B53] rounded ml-2 p-1 px-2"
                  style={{ fontSize: "11px" }}
                >
                  {totalAmount}
                  {/* November, 01, 2023 */}
                </div>
              </div>

              <div>
                <button
                  class="bg-gradient-to-r mt-2 from-[#00C4FF] to-[#0074FF] hover:bg-gradient-to-l text-white font-normal py-2 px-4 rounded flex flex-row gap-2  justify-center items-center "
                  onClick={handleClickOpen}
                >
                  Request
                </button>
              </div>
            </div>
          </div>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to Withdraw $300 Amount?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              autoFocus
              onClick={() => {
                confirmRequest();
              }}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  else
    return (
      <div className="md:px-40 bg-[#0D0620]  py-5">
        <div className="flex flex-row flex-wrap w-[80%] mx-auto dash-main justify-around text-white bg-[#130A2D] py-10 rounded  gap-5  ">
          <div className="flex flex-col justify-center items-center ">
            <img src={avatar} className="w-40"></img>
            <p className="pt-2">{data?.name}</p>
            <p>{data?.email}</p>
            <button
              class="bg-gradient-to-r from-[#00C4FF] to-[#0074FF] hover:bg-gradient-to-l text-white font-normal py-2 px-4 mt-2 rounded flex flex-row gap-2  justify-center items-center "
              onClick={handleClick}
            >
              <svg
                className="feather feather-edit "
                fill="none"
                height="16"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit
            </button>
          </div>
          <div
            className="flex flex-col gap-3 justify-start items-start w-[24vw] h-[25vh] dash-card p-3 bg-center rounded-xl"
            style={{
              backgroundColor: "#1F1340",
              backgroundImage: `url(${plan})`,
            }}
          >
            <p className="text-xl">
              My Subscription
              <div
                className="w-10 rounded-lg text-blue-500 bg-blue-500"
                style={{ paddingTop: "2px" }}
              />
            </p>
            <div className=" flex flex-col gap-3">
              <div className="flex ">
                <p>Current Plan:</p>
                <div
                  className="w-auto flex items-center justify-center bg-[#362B53] rounded ml-2 p-1 px-3"
                  style={{ fontSize: "11px" }}
                >
                  {userData?.[0]?.packageId?.name}
                </div>
              </div>
              <div className="flex ">
                <p>Subscription expires on:</p>
                <div
                  className="w-auto  flex items-center justify-center bg-[#362B53] rounded ml-2 p-1 px-2"
                  style={{ fontSize: "11px" }}
                >
                  {data?.expiryDate &&
                    new Date(data.expiryDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  {/* November, 01, 2023 */}
                </div>
              </div>

              <div>
                <button
                  class="bg-gradient-to-r mt-2 from-[#00C4FF] to-[#0074FF] hover:bg-gradient-to-l text-white font-normal py-2 px-4 rounded flex flex-row gap-2  justify-center items-center "
                  onClick={handleSelecPlanClick}
                >
                  Select Plan
                </button>
              </div>
            </div>
          </div>

          <div
            className="flex flex-col gap-3 justify-start items-start w-[20vw] h-[25vh] dash-card p-4 bg-center rounded-xl"
            style={{
              backgroundColor: "#1F1340",
              backgroundImage: `url(${plan})`,
            }}
          >
            <p className="text-xl">
              Last Invoice
              <div
                className="w-10 rounded-lg bg-blue-500"
                style={{ paddingTop: "2px" }}
              />
            </p>

            <div className="flex ">
              <p>Date:</p>
              <div
                className="w-auto  flex items-center justify-center bg-[#362B53] rounded ml-2 p-1 px-3"
                style={{ fontSize: "12px" }}
              >
                {userData?.[0]?.createdAt?.split("T")[0]}
              </div>
            </div>
            <div className="flex ">
              <p>Plan: </p>
              <div
                className="w-auto  flex items-center justify-center bg-[#362B53] rounded ml-2 p-1 px-3"
                style={{ fontSize: "12px" }}
              >
                {userData?.[0]?.packageId.name}
              </div>
            </div>
            <div className="flex ">
              <p>Amount:</p>
              <div
                className="w-auto  flex items-center justify-center bg-[#362B53] rounded ml-2 p-1 px-3"
                style={{ fontSize: "12px" }}
              >
                $ {userData?.[0]?.packageId.amount}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Plans;
