import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import gravatar from "gravatar";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/modules/userSlice";
import { history } from "../redux/configureStore";
import { getUser } from "../redux/async/user";

const Header = (props) => {
  const dispatch = useDispatch();
  const [showProfile, setShowProfile] = useState(false);
  // const { currentUser } = useSelector((state) => state.user);
  const currentUser = {
    email: "seanstainability@gmail.com",
    nickname: "sean",
  };
  const onClickProfile = useCallback(() => {
    setShowProfile((prev) => !prev);
  }, []);

  const onLogOut = useCallback(() => {
    dispatch(logOut());
    history.push("/");
  }, []);

  return (
    <>
      <HeaderWrapper>
        <RightMenu>
          <span onClick={onClickProfile}>
            <ProfileImg
              src={gravatar.url(currentUser.email, { s: "28px", d: "retro" })}
              alt={currentUser.nickname}
            />
          </span>
          {showProfile && (
            <ProfileModal>
              <div>
                <img
                  src={gravatar.url(currentUser.email, {
                    s: "28px",
                    d: "retro",
                  })}
                  alt={currentUser.nickname}
                />
                <div>
                  <span id="profile-name">{currentUser.nickname}</span>
                  <span id="profile-active">Active</span>
                </div>
              </div>
              <div style={{ padding: "8px 0", margin: "0" }}>
                <hr style={{ margin: "0", width: "100%" }} />
              </div>
              <LogOutButton onClick={onLogOut}>로그아웃</LogOutButton>
            </ProfileModal>
          )}
        </RightMenu>
      </HeaderWrapper>
    </>
  );
};

const HeaderWrapper = styled.header`
  height: 38px;
  background: #350d36;
  color: #ffffff;
  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.1);
`;

const RightMenu = styled.div`
  float: right;
  cursor: pointer;
`;

const ProfileImg = styled.img`
  width: 28px;
  height: 28px;
  position: absolute;
  top: 5px;
  right: 16px;
`;

const ProfileModal = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 76px;
  padding: 20px 0px;
  border: 1px solid gray;
  box-shadow: 0 0 0 1px var(--saf-0), 0 4px 12px 0 rgba(0, 0, 0, 0.12);
  background-color: rgba(var(--sk_foreground_min_solid, 248, 248, 248), 1);
  max-width: 360px;
  min-width: 200px;
  z-index: 1012;
  max-height: calc(100vh - 20px);
  border-radius: 6px;
  color: rgb(29, 28, 29);
  position: absolute;
  top: 38px;
  right: 16px;

  & img {
    display: inline-flex;
    width: 36px;
    height: 36px;
  }

  & > div {
    display: flex;
    margin: "0";
    padding: 0px 20px 0px 24px;
  }

  & > div > div {
    display: inline-flex;
    flex-direction: column;
    width: 80%;
    margin-left: 12px;
  }

  & #profile-name {
    font-weight: bold;
    // display: inline-flex;
  }

  & #profile-active {
    font-size: 13px;
    padding: 4px 0;
    // display: inline-flex;
  }
`;

const LogOutButton = styled.button`
  border: none;
  width: 100%;
  background: transparent;
  display: block;
  height: 28px;
  padding: 5px 24px 5px 24px;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: #1363a3;
    color: #fff;
  }
`;

export default Header;
