import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { Route, Switch } from "react-router-dom";
import ChannelList from "../components/ChannelList";
import DMList from "../components/DMList";
import Channels from "./Channels";
import Chats from "./Chats";
import { getUser } from "../redux/async/user";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { getChannels, getchannelsUsers } from "../redux/async/channel";
import { socket_workspace} from "../socket/socket";

const Workspace = (props) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state)=> state.user);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getchannelsUsers());
  }, []);

  useEffect(()=> {
    if(currentUser){
    socket_workspace.on("main", (data)=> {
      dispatch((getChannels({userId: currentUser.id})))
    })
  }
  }, [socket_workspace, currentUser]);

  return (
    <>
      {sessionStorage.getItem("access_token") ? (
        <React.Fragment>
          <Header currentUser={currentUser} />
          <WorkspaceWrapper>
            <ChannelsWrapper>
              <WorkspaceName>항해99</WorkspaceName>
              <MenuScroll>
                <ChannelList currentUser={currentUser} />
                <DMList currentUser={currentUser} />
              </MenuScroll>
              <div></div>
            </ChannelsWrapper>
            <ChatsWrapper>
              <Switch>
                <Route
                  path="/workspace/channel/:channel"
                  component={Channels}
                />
                <Route
                  path="/workspace/chat/:dmId"
                  // render={() => <Chats currentUser={currentUser} />}
                  component={Chats}
                />
              </Switch>
            </ChatsWrapper>
          </WorkspaceWrapper>
        </React.Fragment>
      ) : (
        history.push("/")
      )}
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
  height: calc(100vh - 38px);
  // overflow-y: auto;
`;

const ChatsWrapper = styled.div`
  flex: 1;
`;
