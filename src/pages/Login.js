import React, { useState, useEffect } from "react";
import Grid from "../elements/Grid";
import Input from "../elements/Input";
import Button from "../elements/Button";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { logIn } from "../redux/async/user";
import { history } from "../redux/configureStore";

const Login = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState();    //아이디 상태값 저장
  const [password, setPassword] = useState();  // 비밀번호 상태값 저장
  const session = sessionStorage.getItem("access_token"); // 세션 저장
  
  const loginInput = {
    email: email,
    password: password,
  };

  const login = () => {    // 로그인 함수
    if (email === "" || password === "") {
      window.alert("아이디 혹은 패스워드를 입력하세요");
      return;
    }
    dispatch(logIn(loginInput));
  };

  useEffect(() => {
    if (session) {
      history.push("/workspace");
    }
  }, [session]);  //세션을 가지고 있으면 로그인페이지로 안넘어 오도록 처리

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
          _onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></Input>
        <Input
          text="password"
          type="password"
          margin="20px 0 20px 0"
          _onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></Input>
        <Button text="이메일로 로그인" _onClick={login}></Button>
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
