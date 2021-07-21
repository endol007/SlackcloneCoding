import React, { useState, useCallback, useEffect } from "react";
import { ArrowDropDown, ArrowDropUp } from "@styled-icons/material-outlined";
import { CollapseButton } from "./ChannelList";
import DM from "./DM";
import { useSelector, useDispatch } from "react-redux";
import { getDmUsers } from "../redux/async/dm";
import { useParams } from "react-router-dom";
import useSocket from "../useSocket";
import { createDM } from "../redux/async/dm";

const DMList = ({ currentUser }) => {
  const { dmsId } = useParams();
  const dispatch = useDispatch();
  const [collapse, setCollapse] = useState(true);
  const { dmList } = useSelector((state) => state.dm);
  const [socket] = useSocket(dmsId);

  // const dmList = [
  //   {
  //     id: 1,
  //     User: {
  //       id: 4,
  //       email: "sean@gamil.com",
  //       nickname: "sean",
  //     },
  //     OtherUser: {
  //       id: 4,
  //       email: "sean@gmail.com",
  //       nickname: "sean",
  //     },
  //   },
  //   {
  //     id: 2,
  //     User: {
  //       id: 4,
  //       email: "sean@gamil.com",
  //       nickname: "sean",
  //     },
  //     OtherUser: {
  //       id: 2,
  //       email: "sparta@gmail.com",
  //       nickname: "sparta",
  //     },
  //   },
  // ];

  useEffect(() => {
    if (currentUser) {
      // console.log("getDmUsers", currentUser.id);
      dispatch(getDmUsers({ userId: currentUser.id }));
    }
  }, [currentUser]);

  useEffect(() => {
    socket?.on("dm", (data) => {
      console.log("dm", data);
    });
    console.log("socket on dm", socket?.hasListeners("dm"), socket);
    return () => {
      console.log("socket off dm", socket?.hasListeners("dm"));
      socket?.off("dm");
    };
  }, [socket]);

  const toggleCollapse = useCallback(() => {
    setCollapse((prev) => !prev);
  }, []);

  return (
    <>
      <h2 style={{ paddingRight: "16px" }}>
        <CollapseButton onClick={toggleCollapse}>
          {collapse ? <ArrowDropDown /> : <ArrowDropUp />}
        </CollapseButton>
        <span>다이렉트 메시지</span>
      </h2>
      <div>
        {collapse &&
          dmList?.map((dm) => {
            return <DM key={dm.id} dm={dm} currentUser={currentUser} />;
          })}
      </div>
    </>
  );
};

export default DMList;
