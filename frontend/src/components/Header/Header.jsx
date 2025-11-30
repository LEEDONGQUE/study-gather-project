import { Link, NavLink } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import searchIcon from "../../assets/search.svg";
import loginIcon from "../../assets/login.svg";
import styled from "styled-components";
import { useModal } from "../../pages/login-page/useModal";
import { useEffect, useState } from "react";
import axios from "axios";

function Header() {
  const { openLogin } = useModal();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const hasToken = !!localStorage.getItem("accessToken");
    setIsLoggedIn(hasToken);

    const handleLogin = () => setIsLoggedIn(true);
    const handleLogout = () => setIsLoggedIn(false);

    window.addEventListener("login", handleLogin);
    window.addEventListener("logout", handleLogout);

    return () => {
      window.removeEventListener("login", handleLogin);
      window.removeEventListener("logout", handleLogout);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    delete axios.defaults.headers.common["Authorization"];

    setIsLoggedIn(false);

    window.dispatchEvent(new Event("logout"));
  };

  return (
    <HeaderContainer>
      <LogoSection>
        <Logo src={logoImg} alt="로고이미지" className="logo" />
        <LogoTextWrapper>
          <LogoTitle>STUDYHUB</LogoTitle>
          <LogoSubtitle>STUDY GROUP PLATFORM</LogoSubtitle>
        </LogoTextWrapper>
      </LogoSection>

      <MainNav>
        <StyledNavLink to="/status">모임 현황</StyledNavLink>
        <StyledNavLink to="/create">모임 생성</StyledNavLink>
        <StyledNavLink to="/mypage">마이페이지</StyledNavLink>
      </MainNav>

      <SearchBarContainer>
        <SearchIcon src={searchIcon} alt="검색 아이콘" />
        <SearchInput type="text" placeholder="스터디 모임 검색" />
      </SearchBarContainer>

      {isLoggedIn ? (
        <LoginButton type="button" onClick={handleLogout}>
          <LoginText>로그아웃</LoginText>
        </LoginButton>
      ) : (
        <LoginButton type="button" onClick={openLogin}>
          <img src={loginIcon} alt="로그인 아이콘" />
          <LoginText>로그인</LoginText>
        </LoginButton>
      )}
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.header`
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 32px;
  border-bottom: 1px solid #bec5cd;
`;

const LogoSection = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const Logo = styled.img`
  width: 40px; /* 필요 시 조정 */
  height: 40px; /* 필요 시 조정 */
  object-fit: contain;
`;

const LogoTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 12px;
`;

const LogoTitle = styled.span`
  color: #174579;
  font-size: 24px;
  font-weight: bold;
  line-height: 1.2;
`;

const LogoSubtitle = styled.span`
  color: #174579;
  font-size: 10px;
  line-height: 1.2;
`;

const MainNav = styled.nav`
  display: flex;
  gap: 50px;
  margin-left: 130px;
`;

/* NavLink의 활성 상태(.active)를 그대로 사용 */
const StyledNavLink = styled(NavLink)`
  color: #174579;
  font-family: "Noto Sans", sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 10px;
  transition: background-color 0.2s ease;

  &.active {
    background: #eef3fa;
  }
`;

const SearchBarContainer = styled.div`
  position: relative;
  margin-left: 130px;
`;

const SearchIcon = styled.img`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  pointer-events: none;
`;

const SearchInput = styled.input`
  border-radius: 10px;
  border: 1px solid #bec5cd;
  background: #f5f5f5;
  width: 350px;
  height: 42px;
  box-sizing: border-box;
  padding-left: 50px;
  font-size: 16px;
  color: #333;

  &::placeholder {
    color: #bec5cd;
  }
`;

/* 로그인 버튼은 NavLink로 처리 (밑줄 제거 포함) */
const LoginButton = styled(NavLink)`
  border-radius: 10px;
  border: 1px solid #bec5cd;
  margin-left: 20px;
  height: 42px;
  box-sizing: border-box;

  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-decoration: none;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const LoginIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

const LoginText = styled.span`
  color: #174579;
  font-family: "Inter", sans-serif;
  font-size: 15px;
  font-weight: 400;
`;