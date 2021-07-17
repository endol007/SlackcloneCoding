import React from "react";
import styled from "styled-components"
import Grid from "../elements/Grid"
const ChatBox = (props) => {
    return(
        <React.Fragment>
                <ChatBoxWrap>
                    <InputBox>
                        <InputText placeholder="#일반에게 메세지보내기"></InputText>
                        <IconBox>
                            <IconBoxItem>
                                <Image1 src="https://image.flaticon.com/icons/png/512/1330/1330254.png">
                                </Image1>
                            </IconBoxItem>
                            <IconBoxItem>
                                <Image1 src="https://image.flaticon.com/icons/png/512/1330/1330254.png">
                                </Image1>
                                <Image1 src="https://image.flaticon.com/icons/png/512/1330/1330254.png">
                                </Image1>
                                <Image1 src="https://image.flaticon.com/icons/png/512/1330/1330254.png">
                                </Image1>
                            </IconBoxItem>
                            <IconBoxItem>
                                <Image1 src="https://image.flaticon.com/icons/png/512/1330/1330254.png">
                                </Image1>
                                <Image1 src="https://image.flaticon.com/icons/png/512/1330/1330254.png">
                                </Image1>
                                <Image1 src="https://image.flaticon.com/icons/png/512/1330/1330254.png">
                                </Image1>
                                <Image1 src="https://image.flaticon.com/icons/png/512/1330/1330254.png">
                                </Image1>
                                <SendButton>
                                    <SendImage src="https://image.flaticon.com/icons/png/512/2391/2391067.png">
                                    
                                    </SendImage>
                                </SendButton>
                            </IconBoxItem>
                        </IconBox>
                    </InputBox>
                </ChatBoxWrap>

        </React.Fragment>
    )
}
const ChatBoxWrap = styled.div`
    height: 10vh;
`;
const InputBox = styled.div`
    border: 1px solid rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
    border-radius: 4px;
    height: 79px;
    display: grid;
    margin: 0 10px 0 10px;
    grid-template-rows: 35px 44px;

`;
const InputText = styled.input`
    margin: 0 auto;
    width: 95%;
    border: none;
`;

const IconBox = styled.div`
    display: grid;
    grid-template-columns: 15% 35% 50%;
`;
const IconBoxItem = styled.div`
    margin: 6px 6px;
`;
const Image1 = styled.img`
    height: 25px;
`;
const SendButton = styled.button`
    height: 30px;
    float: right;
    background-color: tansparent;
    pointer: cursor;
    border: none;
`;
const SendImage = styled.img`
    height: 30px;

`;

export default ChatBox;