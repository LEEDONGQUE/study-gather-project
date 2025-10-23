export default function StatusBadge({ status }) {
  console.log("받은 status:", status);

  const color = status === "모집중" ? "#DBEAFE" : "#9e9e9e";

  return (
    <span
      style={{
        backgroundColor: color,
        color: "#2563EB",
        borderRadius: "12px",
        padding: "6px 12px",
        fontSize: "12px",
        fontWeight: "500",
        margin:"5px",
        border: "1px solid #60A5FA"  /* 회색 */

      }}
    >
      {status}
    </span>
  );
}
