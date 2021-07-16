import React, { useState, useCallback } from "react";
import styled from "styled-components";

const Header = (props) => {
  const [showProfile, setShowProfile] = useState(false);

  const onClickProfile = useCallback(() => {
    setShowProfile((prev) => !prev);
  }, []);

  const onLogOut = useCallback(() => {}, []);

  const userData = {
    email: "seanstainability@gmail.com",
    nickname: "sean",
  };

  return (
    <>
      <HeaderWrapper>
        <RightMenu>
          <span onClick={onClickProfile}>
            <ProfileImg />
          </span>
          {showProfile && (
            <ProfileModal>
              <div style={{ display: "flex" }}>
                <img
                  // src={}
                  alt={userData.nickname}
                  style={{ backgroundColor: "#fff" }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span id="profile-name">{userData.nickname}</span>
                  <span id="profile-active">Active</span>
                </div>
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
  background-color: #fff;
`;

const ProfileModal = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 77px;
  padding: 20px 20px 12px 24px;
  border: 1px solid rgb(29, 28, 29);
  border-radius: 8px;
  color: rgb(29, 28, 29);
  position: absolute;
  top: 38px;
  right: 16px;

  & img {
    display: flex;
    width: 36px;
    height: 36px;
  }

  & > div {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }

  & #profile-name {
    font-weight: bold;
    display: inline-flex;
  }

  & #profile-active {
    font-size: 13px;
    padding: 4px 0;
    display: inline-flex;
  }
`;

const LogOutButton = styled.button`
  border: none;
  width: 100%;
  border-top: 1px solid rgb(29, 28, 29);
  background: transparent;
  display: block;
  height: 36px;
  padding: 5px 24px 5px 24px;
  outline: none;
  cursor: pointer;
`;

export default Header;
