import React from "react";
import styled from "styled-components"
import Grid from "../elements/Grid"
const ChatBox = (props) => {
    return(
        <React.Fragment>
                <ChatBoxWrap>
                    <InputBox></InputBox>
                </ChatBoxWrap>

        </React.Fragment>
    )
}
const ChatBoxWrap = styled.div`
    height: 15vh;
`;
const InputBox = styled.div`
    border: 1px solid rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
    border-radius: 4px;
    height: 79px;
    padding: 10px 15px 10px 15px;
    margin: 0 15px;
`;


export default ChatBox;