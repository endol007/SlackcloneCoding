import React from "react";
import ChannelInfoModal from "./ChannelInfoModal";
import styled from "styled-components";
import gravatar from "gravatar";

const ChatHeader = ({ current, currentUsers }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <React.Fragment>
      <ChatHeaderBox>
        <ChatHeaderTextbox>{current?.otherUserId}</ChatHeaderTextbox>
        <Wrap>
          <ModalBtn onClick={openModal}>
            <I
              src={gravatar.url(currentUsers?.email, { s: "28px", d: "retro" })}
              alt={currentUsers?.nickname}
            ></I>
            <T>{currentUsers?.length || 1}</T>
          </ModalBtn>
          <ChannelInfoModal
            open={modalOpen}
            close={closeModal}
          ></ChannelInfoModal>
        </Wrap>
      </ChatHeaderBox>
    </React.Fragment>
  );
};

const ChatHeaderBox = styled.div`
  z-index: 202;
  height: 49px;
  display: flex;
  box-shadow: 0 1px 0 0 var(--saf-0);
  flex-shrink: 0;
  box-sizing: inherit;
  padding: 10px 16px 10px 20px;
  border-bottom: 1px solid rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
`;
const ChatHeaderTextbox = styled.div`
  display: flex;
  flex: 1 1 0;
  align-items: baseline;
  font-size: 20px;
  line-height: 2.5;
  font-weight: 600;
`;
const Wrap = styled.div`
    display: flex;
    flex: 0 0 1;
    margin-left: auto
    align-items: center;
    z-index: 0;
`;
const ModalBtn = styled.button`
  background: none;
  border: 0;
  margin: 10px;
  cursor: pointer;
  --saf-0: rgba(var(--sk_foreground_max, 29, 28, 29), 0.13);
  box-shadow: 0 0 0 1px var(--saf-0);
  border-radius: 4px;
  color: rgba(var(--sk_foreground_max, 29, 28, 29), 7);
  width: 44px;
  align-items: center;
`;
const I = styled.img`
  width: 18px;
  height: 18px;
  display: inline-block;
`;
const T = styled.span`
  margin: "4px";
  --saf-0: rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
  color: rgba(var(--sk_foreground_max, 29, 28, 29), 0.7);
`;

export default ChatHeader;
