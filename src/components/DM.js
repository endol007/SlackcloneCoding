import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import DMList from "./DMList";

const DM = ({ dm }) => {
  // const { currentUser } = useSelector((state) => state.user);
  const currentUser = {
    id: 3,
    email: "dw1234",
    nickname: "hanghae1234",
  };

  return (
    <NavLinkWrapper
      key={DMList.title}
      activeClassName="active"
      activeStyle={{ fontWeight: "bold" }}
      to={`/workspace/chat/${dm.id}`}
    >
      <span>
        # {dm.nickname} {currentUser.id === dm.id && <span> (나)</span>}
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
