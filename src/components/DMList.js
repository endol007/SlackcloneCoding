import React, { useState, useCallback, useEffect } from "react";
import { ArrowDropDown, ArrowDropUp } from "@styled-icons/material-outlined";
import { CollapseButton } from "./ChannelList";
import DM from "./DM";
import { useSelector, useDispatch } from "react-redux";
import { getDMList } from "../redux/async/dm";

const DMList = ({ currentUser }) => {
  const dispatch = useDispatch();
  const [collapse, setCollapse] = useState(true);
  const { dmList } = useSelector((state) => state.dm);

  useEffect(() => {
    if (currentUser) {
      dispatch(getDMList({ userId: currentUser.id }));
    }
  }, [currentUser]);

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
