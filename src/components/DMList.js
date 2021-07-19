import React, { useState, useCallback, useEffect } from "react";

import { ArrowDropDown, ArrowDropUp } from "@styled-icons/material-outlined";
import { CollapseButton } from "./ChannelList";

import DM from "./DM";

const DMList = (props) => {
  const dmData = [
    {
      id: 1,
      user: {
        id: 1,
        nickname: "동우",
      },
      otherUser: {
        id: 1,
        nickname: "동우",
      },
    },
    {
      id: 2,
      user: {
        id: 1,
        nickname: "동우",
      },
      otherUser: {
        id: 2,
        nickname: "민영",
      },
    },
    {
      id: 3,
      user: {
        id: 1,
        nickname: "동우",
      },
      otherUser: {
        id: 3,
        nickname: "동환",
      },
    },
  ];

  const [onlineList, setOnlineList] = useState([]);
  const [collapse, setCollapse] = useState(true);

  useEffect(() => {
    setOnlineList([]);
  }, []);

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
        {/* <AddWrapper onClick={onClickAddDM}>
          <Add style={{ width: "16px", height: "16px" }} />
        </AddWrapper> */}
      </h2>
      <div>
        {collapse &&
          dmData?.map((dm) => {
            const isOnline = onlineList.includes(dm.id);
            return <DM key={dm.id} dm={dm} isOnline={isOnline} />;
          })}
      </div>
    </>
  );
};

export default DMList;
