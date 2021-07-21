import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const DM = ({ dm, currentUser }) => {
  
  return (
    <NavLinkWrapper
      key={dm?.id}
      activeClassName="active"
      activeStyle={{ fontWeight: "bold" }}
      to={`/workspace/chat/${dm?.dmsId}`}
    >
      <span>
        # {dm?.User.nickname}{" "}
        {currentUser?.id === dm?.User.id && <span> (나)</span>}
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
