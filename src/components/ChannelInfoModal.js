import React, {useState, useCallback} from "react";
import styled from "styled-components";
import "./modal.css";

const ChannelInfoModal = (props) => {
    const {open, close, header} = props;
    const [certain, setCertain] = useState(false);

    const onChangeInput = useCallback((e) => {
        if (e.target.value === "certain") {
          setCertain(true);
        } else {
          setCertain(false);
        }
      }, []);

    const userList = [
        {
          id: 1,
          nickname: "민영",
        },
        {
          id: 2,
          nickname: "동환",
        },
      ];
    return(
        <React.Fragment>
            <div className={open ? "openModal modal":"modal"}>
            { open ? (
                <section>
                    <header>
                        #일반
                        <button className="close" onClick={close}> &times; </button>
                    </header>
                    <main>
                        <UserListWrap>
                            <UserList>
                                <UserImg></UserImg>
                                <UserNickname>사용자ID</UserNickname>
                            </UserList>
                        </UserListWrap>
                        <FieldSetWrapper>
                            <div>
                                <label htmlFor="certain">
                                <input
                                    id="certain"
                                    type="radio"
                                    name="member"
                                    value="certain"
                                    onChange={onChangeInput}
                                />
                                &nbsp;특정 사용자 추가
                                </label>
                            </div>
                            {certain && (
                                <div style={{ marginLeft: "20px" }}>
                                {userList.map((user) => {
                                    return (
                                    <div>
                                        <label htmlFor={user.id}>
                                        <input
                                            type="checkbox"
                                            id={user.id}
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

                        {props.children}
                    </main>
                </section>
            ) : null

            }
            </div>
        </React.Fragment>
    )
}
const UserListWrap = styled.div`
    width: 100%;
    height: 60px;
    padding: 0 16px;
    & > div {
        margin: 10px 0px 10px 16px
    }
`;
const UserList = styled.div`
    width: 100%;
    height: 36px;
    display: flex;
`;
const UserImg = styled.div`
    background-image: url("https://image.flaticon.com/icons/png/512/456/456212.png");
    background-size: cover;
    width: 36px;
    height: 36px;
    display: inline-block;
`;
const UserNickname = styled.div`
    margin-top: 10px;
    margin-left: 10px;

`;
const FieldSetWrapper = styled.fieldset`
  margin-bottom: 12px;
  border: none;
  padding: 0;
  margin: 0 0 20px;
`;

export default ChannelInfoModal;