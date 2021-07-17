import React, { useCallback } from "react";
import Grid from "../elements/Grid";
import Input from "../elements/Input";
import Button from "../elements/Button";
import styled from "styled-components";

const Login = (props) => {
  const logIn = useCallback(() => {
    window.location.href = "/workspace/channel/일반";
  }, []);

  return (
    <Grid is_center>
      <Grid>
        <Grid
          width="30%"
          padding="48px 0 40px"
          text="Slack"
          display="inline-block"
        ></Grid>
        <Grid
          width="40%"
          padding="48px 0 40px"
          text="Slack"
          display="inline-block"
        >
          <a href="/">
            <img
              alt="Slack"
              src="https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg"
              height="34"
              title="Slack"
            ></img>
          </a>
        </Grid>
        <Grid
          width="30%"
          padding="48px 0 40px"
          text="Slack"
          display="inline-block"
        >
          <text>슬랙을 처음 사용하시나요?</text>
          <br />
          <A href="/signup">계정 생성</A>
        </Grid>
      </Grid>
      <LoginText>Slack에 로그인</LoginText>
      <Grid>
        <SubText>
          <strong>직장에서 사용하는 이메일 주소</strong>를 사용하는 것이
          좋습니다.
        </SubText>
      </Grid>
      <Grid width="400px" display="inline-block">
        <Input
          text="name@work-email.com"
          type="email"
          margin="20px 0 0 0"
        ></Input>
        <Input text="password" type="password" margin="20px 0 20px 0"></Input>
        <Button text="이메일로 로그인" _onClick={logIn}></Button>
      </Grid>
    </Grid>
  );
};

const LoginText = styled.h1`
  font-size: 48px;
`;
const SubText = styled.div`
  font-size: 18px;
  line-height: 27px;
  color: #454245;
`;
const A = styled.a`
  cursor: pointer;
  text-decortaion: underline;
`;

export default Login;
