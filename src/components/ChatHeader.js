import React from "react";
import Grid from "../elements/Grid";
import ChannelInfoModal from "./ChannelInfoModal";
import styled from "styled-components";

const ChatHeader = (props) => {
    const [ modalOpen, setModalOpen ] = React.useState(false);

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    return (
        <React.Fragment>
            <ChatHeaderBox>
                <ChatHeaderTextbox>#일반</ChatHeaderTextbox>
                <Wrap>
                    <ModalBtn onClick={openModal}>
                    <I></I>
                    <T>4</T>
                    </ModalBtn>
                    <ChannelInfoModal open={modalOpen} close={closeModal}></ChannelInfoModal>
                </Wrap>
            </ChatHeaderBox>
        </React.Fragment>
    )
}

const ChatHeaderBox = styled.div`
    z-index: 202;
    height: 49px;
    display: flex;
    box-shadow: 0 1px 0 0 var(--saf-0);
    flex-shrink: 0;
    box-sizing: inherit;
    padding: 10px 16px 10px 20px;
    border-bottom: 1px solid rgba(var(--sk_foreground_low,29,28,29),0.13);
`;
const ChatHeaderTextbox = styled.div`
    display: flex;
    flex: 1 1 0;
    align-items: baseline;
    font-size: 20px;
    line-height: 1.46668;
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
    margin: 0;
    cursor: pointer;
    --saf-0: rgba(var(--sk_foreground_max,29,28,29),0.13);
    box-shadow: 0 0 0 1px  var(--saf-0);
    border-radius: 4px;
    color: rgba(var(--sk_foreground_max,29,28,29), 7);
    width: 44px;
    align-items: center;
`;
const I = styled.div`
    background-image: url("https://image.flaticon.com/icons/png/128/709/709579.png");
    background-size: cover;
    width: 18px;
    height: 18px;
    display: inline-block;
`;
const T = styled.span`
    margin: "0 0 4px 4px";
    --saf-0: rgba(var(--sk_foreground_low,29,28,29),0.13);
    color: rgba(var(--sk_foreground_max,29,28,29),.7);
`;

export default ChatHeader;