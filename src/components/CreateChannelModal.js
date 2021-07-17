import React, { useState, useCallback } from "react";
import "./modal.css";
import styled from "styled-components";
import Input from "../elements/Input";

const CreateChannelModal = (props) => {
  const { open, close } = props;
  const [value, setValue] = useState("");

  const onChangeValue = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const createChannel = useCallback(() => {
    console.log("채널 생성", value);
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
            <main>
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
                  value={value}
                  onChange={onChangeValue}
                ></Input>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <ButtonWrapper onClick={createChannel}>생성</ButtonWrapper>
              </div>
            </main>
          </section>
        ) : null}
      </div>
    </React.Fragment>
  );
};

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
`;

export default CreateChannelModal;
