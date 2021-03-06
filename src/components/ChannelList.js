import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { ArrowDropDown, ArrowDropUp } from "@styled-icons/material-outlined";
import { Add } from "@styled-icons/fluentui-system-filled";
import Channel from "./Channel";
import CreateChannelModal from "./CreateChannelModal";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getChannels } from "../redux/async/channel";

const ChannelList = ({ currentUser }) => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [collapse, setCollapse] = useState(true);
  const { channelList } = useSelector((state) => state.channel);

  useEffect(() => {
    if (currentUser) {
      dispatch(getChannels({ userId: currentUser.id }));
    }
  }, [getChannels, currentUser]); //등록된 채널 정보

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const toggleCollapse = useCallback(() => {
    setCollapse((prev) => !prev);
  }, []);

  return (
    <>
      <h2 style={{ paddingRight: "16px" }}>
        <CollapseButton onClick={toggleCollapse}>
          {collapse ? <ArrowDropDown /> : <ArrowDropUp />}
        </CollapseButton>
        <span>채널</span>
        <AddWrapper onClick={openModal}>
          <Add style={{ width: "16px", height: "16px" }} />
        </AddWrapper>
      </h2>
      <CreateChannelModal
        open={modalOpen}
        close={closeModal}
      ></CreateChannelModal>
      <div>
        {collapse &&
          channelList?.map((channel) => {
            return <Channel key={channel.id} channel={channel} />;
          })}
      </div>
    </>
  );
};

export const CollapseButton = styled.button`
  background: transparent;
  border: none;
  width: 28px;
  height: 28px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin-left: 10px;
  cursor: pointer;
`;

export const AddWrapper = styled.span`
  float: right;
  height: 16px;

  &:hover {
    & > svg {
      line-height: 100%;
      background: rgba(255, 255, 255, 0.1);
      padding: 4px;
      border-radius: 4px;
      outline: none;
    }
  }
`;

export default ChannelList;
