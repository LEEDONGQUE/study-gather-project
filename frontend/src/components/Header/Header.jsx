import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import searchIcon from "../../assets/search.svg";
import loginIcon from "../../assets/login.svg";

function Header() {
  return (
    <header className="header-container">
      <Link to="/" className="logo-link">
        <div className="logo-section">
          <img src={logoImg} alt="로고이미지" className="logo" />
          <div className="logo-text-wrapper">
            <span className="logo-title">STUDYHUB</span>
            <span className="logo-subtitle">STUDY GROUP PLATFORM</span>
          </div>
        </div>
      </Link>
      <nav className="main-nav">
        <NavLink to="/status" className="nav-link">
          모임 현황
        </NavLink>
        <NavLink to="/create" className="nav-link">
          모임 생성
        </NavLink>
        <NavLink to="/mypage" className="nav-link">
          마이페이지
        </NavLink>
      </nav>
      <div className="search-bar-container">
        <img src={searchIcon} alt="검색 아이콘" className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="스터디 모임 검색"
        />
      </div>
      <NavLink to="/login" className="login-button">
        <img src={loginIcon} alt="로그인 아이콘" className="login-icon" />
        <span className="login-text">로그인</span>
      </NavLink>
    </header>
  );
}

export default Header;
