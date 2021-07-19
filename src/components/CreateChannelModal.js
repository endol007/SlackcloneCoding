import React, { useState, useCallback } from "react";
import "./modal.css";
import styled from "styled-components";
import Input from "../elements/Input";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { createChannel } from "../redux/async/channel";

const CreateChannelModal = (props) => {
  const dispatch = useDispatch();
  const { open, close } = props;
  const { title } = useParams();
  // console.log(title);

  const userList = [];
  const [channelTitle, setChannelTitle] = useState("");
  const [channelUsers, setChannelUsers] = useState(userList);

  const onChangeInput = useCallback((e) => {
    console.log(e.target.value);
  }, []);

  const onChangeChannelTitle = useCallback((e) => {
    setChannelTitle(e.target.value);
  }, []);

  const onChangeChannelUsers = useCallback((e) => {
    setChannelUsers(e.target.value);
  }, []);

  const onSubmitCreateChannel = useCallback(() => {
    console.log("채널 생성하기", channelTitle);
    if (!channelTitle) {
      return;
    }
    dispatch(createChannel({ title: channelTitle, userList: channelUsers }));
  }, []);

  return (
    <React.Fragment>
      <div
        className={open ? "openModal modal" : "modal"}
        style={{ color: "#000" }}
      >
        {open ? (
          <section style={{ lineHeight: "34px" }}>
            <header>
              <h1 style={{ margin: 0, fontSize: "28px" }}>채널 생성</h1>
              <button className="close" onClick={close}>
                {" "}
                &times;{" "}
              </button>
            </header>
            <FormWrapper onSubmit={onSubmitCreateChannel}>
              <div style={{ color: "#A9A9A9", lineHeight: "1.5" }}>
                채널은 팀이 소통하는 공간입니다. 채널은 주제(예: 마케팅)를
                중심으로 구성하는 것이 가장 좋습니다.
              </div>
              <div>
                <label style={{ fontWeight: "bold" }}>이름</label>
                <Input
                  type="text"
                  text="프로젝트-"
                  margin="0 0 20px 0"
                  padding="4px 46px 4px 16px"
                  font_size="18px !important"
                  value={channelTitle}
                  onChange={onChangeChannelTitle}
                ></Input>
              </div>
              <div>
                <label style={{ fontWeight: "bold" }}>사용자 추가</label>
                <FieldSetWrapper>
                  <div>
                    <span style={{ marginRight: "4px" }}>
                      <input
                        type="radio"
                        name="member"
                        value="total"
                        onChange={onChangeInput}
                        checked
                      />
                    </span>
                    <span>
                      <b>워크스페이스</b>의 모든 멤버 추가
                    </span>
                  </div>
                  <div>
                    <span style={{ marginRight: "4px" }}>
                      <input
                        type="radio"
                        name="member"
                        value="certain"
                        onChange={onChangeInput}
                      />
                    </span>
                    <span>특정 사용자 추가</span>
                  </div>
                  <div style={{ marginLeft: "20px" }}>
                    <div>
                      <input type="checkbox" id="scales" name="member"></input>
                      <label htmlFor="scales">동환</label>
                    </div>
                    <div>
                      <input type="checkbox" id="scales" name="member"></input>
                      <label htmlFor="scales">민영</label>
                    </div>
                  </div>
                </FieldSetWrapper>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <ButtonWrapper
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid #000",
                    color: "#000",
                    marginRight: "6px",
                  }}
                >
                  지금은 건너뛰기
                </ButtonWrapper>
                <ButtonWrapper>생성</ButtonWrapper>
              </div>
            </FormWrapper>
          </section>
        ) : null}
      </div>
    </React.Fragment>
  );
};

const FieldSetWrapper = styled.fieldset`
  margin-bottom: 12px;
  border: none;
  padding: 0;
  margin: 0 0 20px;
`;

const FormWrapper = styled.form`
  padding: 16px;
`;

const ButtonWrapper = styled.button`
  transition: all 80ms linear;
  background: #007a5a;
  color: #fff;
  font-weight: 900;
  box-shadow: none;
  font-size: 15px;
  height: 36px;
  min-width: 80px;
  padding: 0 12px 1px;
  margin-right: 0;
  outline: none;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  align-items: center;

  &:hover {
    box-shadow: 0 1px 4px rgb(0 0 0 / 30%);
  }
`;

export default CreateChannelModal;
