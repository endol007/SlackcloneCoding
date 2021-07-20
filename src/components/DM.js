import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const DM = ({ dm, currentUser }) => {
  return (
    <NavLinkWrapper
      key={dm.id}
      activeClassName="active"
      activeStyle={{ fontWeight: "bold" }}
      to={`/workspace/chat/${dm.id}/${dm.otherUserId}`}
    >
      <span>
        # {dm.otherUserId}{" "}
        {currentUser.id === dm.otherUserId && <span> (나)</span>}
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
