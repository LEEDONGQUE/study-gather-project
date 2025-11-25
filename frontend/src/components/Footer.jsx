import styled from "styled-components";
import footerImg from "../assets/login_logo.png"; // 너가 쓰는 실제 경로로 변경!

const Footer = () => {
  return (
    <Big_wrapper>
      {/* <img src={footerImg} alt="footer" /> */}
      <p>"Become a hub of Innovation"</p>
      <p>Copyright © 2025 Web Project Team 3. All rights reserved.</p>
    </Big_wrapper>
  );
};

export default Footer;

const Big_wrapper = styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  row-gap: 0;
  justify-items: center;
  margin-top: 40px; /* ⬅ border 위에 여백 생김 */

  border-top: 1px solid #dcdcdc;

  p {
    margin: 0;
    padding: 0;
  }

  /* 첫 번째 문장 */
  p:nth-of-type(1) {
    margin: 20px;
    color: #0a2a66; /* 남색 계열 */
    font-size: 20px; /* 글자 크게 */
    font-weight: 600;
  }

  /* 두 번째 문장 */
  p:nth-of-type(2) {
    color: #b5b5b5; /* 연한 회색 */
    font-size: 12px;
  }
`;
