import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Channel = ({ channel }) => {
  return (
    <NavLinkWrapper
      key={channel.title}
      activeClassName="active"
      activeStyle={{ fontWeight: "bold" }}
      to={`/workspace/channel/${channel.title}`}
    >
      <span># {channel.title}</span>
    </NavLinkWrapper>
  );
};

const NavLinkWrapper = styled(NavLink)`
  &:hover {
    background-color: #340e36;
  }
`;

export default Channel;
