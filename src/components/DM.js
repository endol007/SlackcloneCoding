import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {createDM } from "../redux/async/dm";
import { useDispatch } from "react-redux"; 

const DM = ({ dm, currentUser }) => {
  const dispatch = useDispatch();
  
  const createDirectMessage = () => {
    if(currentUser){
      dispatch(createDM({ userId: currentUser.id, otherUserId: dm.id }));
      }
  }
  
  return (
    <NavLinkWrapper
      onClick={() => {
        createDirectMessage();
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
