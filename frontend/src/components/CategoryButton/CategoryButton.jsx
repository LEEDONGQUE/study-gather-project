import { IoShareOutline } from "react-icons/io5";




const categories = [
  { label: "전체", Icon: FaBook },
  { label: "공모전", Icon: FaTrophy },
  { label: "전공", Icon: MdWork },
  { label: "자격증", Icon: FaCertificate },
  { label: "외국어", Icon: FaLanguage },
];



export default function CategoryButton() {
  return (
    <button
      className={`category-btn ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      <img src={icon} alt={label} className="btn-icon" />
      <span>{label}</span>
    </button>
  );
}
