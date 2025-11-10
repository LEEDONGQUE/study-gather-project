export default function StatusBadge({ status }) {
  console.log("받은 status:", status);

  const isRecruiting = status === "모집중";

  //api명세서 :status:모집마감일때가 없어서(모집없음으로 줄지 모집x로 줄지 ㅁ어떤데이터로 줄지 모르니깐) 모집중이 아니면 모두 모집마감으로 처리
  const color = isRecruiting ? "#DBEAFE" : "#9e9e9e";
  const textColor = isRecruiting ? "#2563EB" : "#ffffff"; 
  const displayText = isRecruiting ? "모집중" : "모집마감";

  return (
    <span
      style={{
        backgroundColor: color,
        color: textColor,
        borderRadius: "12px",
        padding: "6px 12px",
        fontSize: "12px",
        fontWeight: "500",
        margin: "5px",
        border: isRecruiting ? "1px solid #60A5FA" : "1px solid #bdbdbd",
      }}
    >
      {displayText}
    </span>
  );
}
