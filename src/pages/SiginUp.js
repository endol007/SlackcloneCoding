import React, {useRef, useState} from "react";
import Grid from "../elements/Grid";
import Input from "../elements/Input";
import Button from "../elements/Button";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux"
import { dupCheckUser, signUp } from "../redux/async/user";

const SignUp = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState();
  const [nickname, setNickname] = React.useState();
  const [password, setPassword] = React.useState();

  const email_double_check = () => {
    if (email === ""){
      window.alert("아이디를 입력해주세요!");
      return;
    }
    dispatch(dupCheckUser(email));
  }

  const signupdata = {
    email: email,
    nickname: nickname,
    password: password,
  }


  const signup = () => {
    if (email === "" || nickname === "" || password === "") {
      window.alert("아이디, 패스워드, 닉네임을 모두 입력해주세요!");
      return;
    }
    dispatch(signUp(signupdata));
    history.push("/Workspace");
  }
  

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
          <a href="http://localhost:3000/login">
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
        ></Grid>
      </Grid>
      <LoginText>우선 회원가입 하기</LoginText>
      <Grid>
        <SubText>
          <strong>직장에서 사용하는 이메일 주소</strong>를 사용하는 것이
          좋습니다.
        </SubText>
      </Grid>
      <Grid width="400px" display="inline-block">
        <Grid width="70%" margin="20px 0 0 0" display="inline-block">
          <Input text="name@work-email.com"
           _onChange={(e)=> {
            setEmail(e.target.value);
          }} type="email"></Input>
        </Grid>
        <Grid width="30%" margin="20px 0 0 0" display="inline-block">
          <Button text="중복 확인" _onClick={email_double_check}></Button>
        </Grid>
        <Input text="nickname" type="text" 
          _onChange={(e)=> {
            setNickname(e.target.value);
          }} margin="20px 0 0 0"></Input>
        <Input text="password" type="password" 
        _onChange={(e)=> {
            setPassword(e.target.value);
          }} margin="20px 0 20px 0"></Input>
        <Button text="이메일로 로그인" _onClick={signup}></Button>
      </Grid>
      <Grid margin="40px 0 0 0">
        <p>이미 slack을 사용하고 있나요?</p>
        <a href="/">기존 워크스페이스에 로그인</a>
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

export default SignUp;
