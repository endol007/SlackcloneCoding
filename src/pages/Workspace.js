import React from "react";

import styled from "styled-components";
import Header from "../components/Header";

import { Route, Switch } from "react-router-dom";
import ChannelList from "../components/ChannelList";
import DMList from "../components/DMList";
import Channels from "./Channels";
import Chats from "./Chats";

const Workspace = (props) => {
  return (
    <>
      <Header />
      <WorkspaceWrapper>
        <ChannelsWrapper>
          <WorkspaceName>항해99</WorkspaceName>
          <MenuScroll>
            <ChannelList />
            <DMList />
          </MenuScroll>
          <div></div>
        </ChannelsWrapper>
        <ChatsWrapper>
          <Switch>
            <Route path="/workspace/channel/:title" component={Channels} />
            <Route path="/workspace/chat/:id" component={Chats} />
          </Switch>
        </ChatsWrapper>
      </WorkspaceWrapper>
    </>
  );
};

export default Workspace;

const WorkspaceWrapper = styled.div`
  display: flex;
  flex: 1;
`;

const ChannelsWrapper = styled.nav`
  width: 260px;
  display: inline-flex;
  flex-direction: column;
  background: #3f0e40;
  color: rgb(188, 171, 188);
  vertical-align: top;

  & a {
    padding-left: 36px;
    color: inherit;
    text-decoration: none;
    height: 28px;
    line-height: 28px;
    display: flex;
    align-items: center;

    &.selected {
      color: white;
    }
  }

  & .bold {
    color: white;
    font-weight: bold;
  }

  & .count {
    margin-left: auto;
    background: #cd2553;
    border-radius: 16px;
    display: inline-block;
    font-size: 12px;
    font-weight: 700;
    height: 18px;
    line-height: 18px;
    padding: 0 9px;
    color: white;
    margin-right: 16px;
  }

  & h2 {
    height: 36px;
    line-height: 36px;
    margin: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 15px;
  }
`;

const WorkspaceName = styled.button`
  width: 100%;
  height: 49px;
  line-height: 49px;
  text-align: left;
  border: none;
  border-top: 1px solid rgb(82, 38, 83);
  border-bottom: 1px solid rgb(82, 38, 83);
  font-weight: 900;
  font-size: 18px;
  background: transparent;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 0 54px 0 16px;
  margin: 0;
  color: white;
  cursor: pointer;
`;

const MenuScroll = styled.div`
  height: 90vh;
`;

const ChatsWrapper = styled.div`
  flex: 1;
`;
