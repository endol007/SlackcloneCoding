import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { createDM, getDMChat } from "../redux/async/dm";
import { useDispatch, useSelector } from "react-redux";

const DM = ({ dm, currentUser }) => {
  const dispatch = useDispatch();
  const { currentDM } = useSelector((state) => state.dm);

  const createDirectMessage = () => {
    if (currentUser) {
      dispatch(createDM({ userId: currentUser.id, otherUserId: dm.id }));
      // dispatch(getDMChat({ dmsId: currentDM?.dmsId, userId: currentUser.id }));
    }
  };

  // const getDirectMessageChat = () => {
  //   if (currentDM) {
  //     dispatch(
  //       getDMChat({ dmsId: currentDM[0]?.dmsId, userId: currentUser.id })
  //     );
  //   }
  // };

  return (
    <NavLinkWrapper
      onClick={() => {
        createDirectMessage();
        // getDirectMessageChat();
      }}
      key={dm?.id}
      activeClassName="active"
      activeStyle={{ fontWeight: "bold" }}
      to={`/workspace/chat/${dm?.id}`}
    >
      <span>
        # {dm?.nickname} {currentUser?.id === dm?.id && <span> (나)</span>}
      </span>
    </NavLinkWrapper>
  );
};

const NavLinkWrapper = styled(NavLink)`
  &:hover {
    background-color: #340e36;
  }
`;
export default DM;
