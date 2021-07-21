import React, { useState, useCallback } from "react";
import "./modal.css";
import styled from "styled-components";
import Input from "../elements/Input";
import { useDispatch, useSelector } from "react-redux";
import { createChannel } from "../redux/async/channel";
import { createDM } from "../redux/async/dm";

const CreateChannelModal = (props) => {
  const dispatch = useDispatch();
  const { open, close } = props;
  const [certain, setCertain] = useState(false);
  const [channelTitle, setChannelTitle] = useState("");
  const { getchannelsUsers } = useSelector((state) => state.channel);
  const { currentUser } = useSelector((state) => state.user);
  const onChangeInput = useCallback((e) => {
    if (e.target.value === "certain") {
      setCertain(true);
    } else {
      setCertain(false);
    }
  }, []);

  const checkedMember = () => {
    let member_length = document.getElementsByName("member").length;
    let membersChecked = [];
    if (document.getElementsByName("case")[0].checked === true) {
      getchannelsUsers.forEach((user) => {
        membersChecked.push(user.id);
      });
    } else {
      for (var i = 0; i < member_length; i++) {
        if (document.getElementsByName("member")[i].checked === true) {
          let target = document.getElementsByName("member")[i].value;
          membersChecked.push(target);
        }
      }
    }
    return membersChecked;
  };

  const onSubmitCreateChannel = (e) => {
    // e.preventDefault();
    if (channelTitle.trim() === "") {
      alert("채널명은 필수 입력사항입니다.");
      return;
    }
    let channelUsers = checkedMember();
    const createData = {
      title: channelTitle,
      userList: channelUsers,
      userId: currentUser.id,
    };
    // dispatch(
    //   createDM({
    //     userId: currentUser.id,
    //     otherUserId: channelUsers,
    //   })
    // );
    dispatch(createChannel(createData));
  };

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
            <FormWrapper>
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
                  _onChange={(e) => {
                    setChannelTitle(e.target.value);
                  }}
                ></Input>
              </div>
              <div>
                <label style={{ fontWeight: "bold" }}>사용자 추가</label>
                <FieldSetWrapper>
                  <div>
                    <label htmlFor="total">
                      <input
                        id="total"
                        type="radio"
                        name="case"
                        value="total"
                        onChange={onChangeInput}
                      />
                      &nbsp;<b>워크스페이스</b>의 모든 멤버 추가
                    </label>
                  </div>
                  <div>
                    <label htmlFor="certain">
                      <input
                        id="certain"
                        type="radio"
                        name="case"
                        value="certain"
                        onChange={onChangeInput}
                      />
                      &nbsp;특정 사용자 추가
                    </label>
                  </div>
                  {certain && (
                    <div style={{ marginLeft: "20px" }}>
                      {getchannelsUsers?.map((user) => {
                        return (
                          <div>
                            <label htmlFor={user.id}>
                              <input
                                type="checkbox"
                                id={user.email}
                                name="member"
                                value={user.id}
                              ></input>
                              {user.nickname}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </FieldSetWrapper>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <ButtonWrapper type="button" onClick={onSubmitCreateChannel}>
                  생성
                </ButtonWrapper>
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
