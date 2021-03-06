import styled from 'styled-components'
import React from 'react'

import { loginAxios } from "../../redux/modules/user";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


function Login() {

    const usernameRef = React.useRef(null);
    const passwordRef = React.useRef(null);
  
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginFunction = async () => {
        if (
          usernameRef.current.value === "" ||
          passwordRef.current.value === "" ||
          usernameRef.current.value === " " ||
          passwordRef.current.value === " " ||
          usernameRef.current.value === null ||
          passwordRef.current.value === null
        ) {
          alert("아이디, 비밀번호를 채워주세요!");
          return false;
        }
        document.getElementById("LoginBtn").disabled = true;
        try {
          await dispatch(
            loginAxios(usernameRef.current.value, passwordRef.current.value)
          ).then((success) => {
            console.log(success);
            if (success === true) {
              navigate("/");
              alert("로그인되었습니다!");
            } else {
              document.getElementById("LoginBtn").disabled = false;
            }
          });
        } catch (err) {
          console.log("Error >>", err);
          document.getElementById("LoginBtn").disabled = false;
        }
      };


    return(
        <LoginWrap>
            <LoginTitle>
             회원 로그인
            </LoginTitle>
            <InputWrap>
                <InLeft>
                    <Labellogin>아이디</Labellogin>
                    <Labellogin>패스워드</Labellogin>
                </InLeft>
                <Inright>
                    <Input ref={usernameRef}></Input>
                    <Input ref={passwordRef}></Input>
                </Inright>
            </InputWrap>
            <LoginBtn onClick={loginFunction} id="LoginBtn">로그인하기</LoginBtn>
        </LoginWrap>
        )
}


const LoginWrap = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    margin-top: 70px;
    margin-bottom: 120px;
`

const LoginTitle = styled.div`
    font-size: 40px;
    font-weight: bold;
    color: #81C784;
`

const InputWrap = styled.div`
    width: 700px;
    height: 200px;
    display: flex;
    margin-top: 30px;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    /* border: 1px solid black; */
`

const InLeft = styled.div`
    /* border: 1px solid black; */
    width: 250px;
    height: 150px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-end;
`

const Inright = styled.div`
    /* border: 1px solid black; */
    width: 400px;
    height: 150px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
`

const Input = styled.input`
    padding: 10px;
    width: 300px;
    height: 10px;
    outline: none;
    margin-bottom: 20px;
    border: none;
    border-bottom: 1px solid #81C784;
`

const Labellogin = styled.span`
    font-size: 20px;
    height: 35px;
    font-weight: bold;
    /* border: 1px solid black; */
    margin-bottom: 20px;
    width: 100px;
`

const LoginBtn = styled.button`
    width: 200px;
    height: 50px;
    outline: none;
    border: none;
    cursor: pointer;
    color: white;
    background-color: #81C784;
    font-size: 20px;
    font-weight: bold;
    border-radius: 10px;
`


export default Login