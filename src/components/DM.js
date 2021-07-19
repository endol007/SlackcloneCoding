import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import DMList from "./DMList";

const DM = ({ dm }) => {
  return (
    <NavLinkWrapper
      key={DMList.title}
      activeClassName="active"
      activeStyle={{ fontWeight: "bold" }}
      to={`/workspace/chat/${dm.id}`}
    >
      <span>
        # {dm.otherUser.nickname}{" "}
        {dm.user.id === dm.otherUser.id && <span> (나)</span>}
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
