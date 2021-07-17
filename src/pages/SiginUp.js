import React from "react";
import Grid from "../elements/Grid";
import Input from "../elements/Input";
import Button from "../elements/Button";
import styled from "styled-components";

const SignUp = (props) => {
        return(
            <Grid is_center>
                <Grid>
                <Grid width="30%" padding="48px 0 40px" text="Slack" display="inline-block">
                </Grid>
                <Grid width="40%" padding="48px 0 40px" text="Slack" display="inline-block">
                    <a href="http://localhost:3000/login">
                    <img alt="Slack" src="https://a.slack-edge.com/bv1-9/slack_logo-ebd02d1.svg" height="34" title="Slack"></img>
                    </a>
                </Grid>
                <Grid width="30%" padding="48px 0 40px" text="Slack" display="inline-block">
                </Grid>
                </Grid>
                <LoginText>우선 회원가입 하기</LoginText>
                <Grid>
                    <SubText>
                        <strong>직장에서 사용하는 이메일 주소</strong>를 사용하는 것이 좋습니다.
                    </SubText>
                </Grid>
                <Grid width="400px" display="inline-block">
                    <Grid width="70%" margin="20px 0 0 0" display="inline-block">
                    <Input 
                        text="name@work-email.com"
                        type="email"
                    ></Input>
                    </Grid>
                    <Grid width="30%" margin="20px 0 0 0" display="inline-block">
                        <Button text="중복 확인"></Button>
                    </Grid>
                    <Input 
                        text="nickname"
                        type="text"
                        margin="20px 0 0 0"
                    ></Input>
                    <Input 
                        text="password"
                        type="password"
                        margin="20px 0 20px 0"
                    ></Input>
                    <Button 
                        text="이메일로 로그인"
                        _onClick={()=> {}}>
                    </Button>
                </Grid>
                <Grid margin="40px 0 0 0">
                    <p>이미 slack을 사용하고 있나요?</p>
                    <a href="/login">기존 워크스페이스에 로그인</a>
                </Grid>
    
            </Grid>
        )
    }
    
    const LoginText = styled.h1`
        font-size: 48px;
    `;
    const SubText = styled.div`
        font-size: 18px;
        line-height: 27px;
        color: #454245;
    `;

export default SignUp;