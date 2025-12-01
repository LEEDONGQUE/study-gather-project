import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logoImg from '../../assets/logo.png'; // 이미지 경로 확인 필요

const SignupPage = () => {
  const navigate = useNavigate();

  // 1. 상태 관리: 학번(studentNumber) 추가
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '', 
    studentNumber: '', // ★ 추가됨
    phone: '' 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // 학번은 숫자만 입력되도록 처리 (선택 사항)
    if (name === 'studentNumber') {
       const numericValue = value.replace(/[^0-9]/g, '');
       setFormData(prev => ({ ...prev, [name]: numericValue }));
       return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // 2. 유효성 검사
    if (!formData.email || !formData.password || !formData.name || !formData.phone || !formData.studentNumber) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // 3. 백엔드 API 요청 (백엔드 DTO 필드명에 맞춰서 전송)
      const requestBody = {
        studentNumber: formData.studentNumber, // ★ 백엔드 핵심 Key
        userName: formData.name,               // Backend: userName
        email: formData.email,
        password: formData.password,
        passwordCheck: formData.confirmPassword, // Backend: passwordCheck (필수)
        phoneNum: formData.phone               // Backend: phoneNum
      };

      // 백엔드 포트 8080 확인
      const response = await axios.post('http://localhost:8080/users/signup', requestBody);

      if (response.status === 200 || response.status === 201) {
        alert("회원가입이 완료되었습니다! 로그인 해주세요.");
        navigate('/login'); 
      }

    } catch (error) {
      console.error("회원가입 에러:", error);
      if (error.response) {
        // 백엔드(UserServiceImpl)에서 던지는 예외 메시지 표시 (예: "이미 사용 중인 학번입니다.")
        const msg = error.response.data.message || error.response.data.error || "오류가 발생했습니다.";
        alert(`가입 실패: ${msg}`);
      } else {
        alert("서버와 연결할 수 없습니다.");
      }
    }
  };

  return (
    <Container>
      <Logo src={logoImg} alt="Study Gather Logo" />
      <Title>회원가입</Title>
      <Form onSubmit={handleSignup}>
        
        {/* --- 학번 입력란 추가 --- */}
        <InputWrapper>
          <Label>학번</Label>
          <Input 
            type="text" 
            name="studentNumber" 
            value={formData.studentNumber} 
            onChange={handleChange} 
            placeholder="학번을 입력하세요 (예: 20230001)" 
            maxLength="10"
          />
        </InputWrapper>

        <InputWrapper>
          <Label>이메일</Label>
          <Input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="example@email.com" 
          />
        </InputWrapper>

        <InputWrapper>
          <Label>비밀번호</Label>
          <Input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            placeholder="비밀번호 입력" 
          />
        </InputWrapper>

        <InputWrapper>
          <Label>비밀번호 확인</Label>
          <Input 
            type="password" 
            name="confirmPassword" 
            value={formData.confirmPassword} 
            onChange={handleChange} 
            placeholder="비밀번호 재입력" 
          />
        </InputWrapper>

        <InputWrapper>
          <Label>이름 (닉네임)</Label>
          <Input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="이름을 입력하세요" 
          />
        </InputWrapper>

        <InputWrapper>
          <Label>전화번호</Label>
          <Input 
            type="text" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            placeholder="010-0000-0000" 
          />
        </InputWrapper>

        <SubmitButton type="submit">가입하기</SubmitButton>
      </Form>
    </Container>
  );
};

export default SignupPage;

// --- 스타일 컴포넌트 ---
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
`;

const Logo = styled.img`
  width: 150px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 30px;
`;

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: #555;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #174579;
  }
`;

const SubmitButton = styled.button`
  padding: 15px;
  background-color: #174579;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background-color: #123660;
  }
`;
