// server.js
import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ db.json 불러오기
const DB_PATH = "./data.json";

// DELETE 엔드포인트 직접 구현
app.delete("/study_list/:id", (req, res) => {
  const id = Number(req.params.id);

  // db.json 읽기
  const db = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));

  // study_list.data.studies 배열에서 해당 id 삭제
  const prevLength = db.study_list.data.studies.length;
  db.study_list.data.studies = db.study_list.data.studies.filter(
    (s) => Number(s.study_id) !== id
  );

  // 파일 다시 저장
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));

  const newLength = db.study_list.data.studies.length;
  if (newLength < prevLength) {
    res.json({
      code: "OK",
      message: `스터디 ${id} 삭제 완료`,
    });
  } else {
    res.status(404).json({
      code: "NOT_FOUND",
      message: `스터디 ${id}를 찾을 수 없습니다.`,
    });
  }
});

app.listen(3002, () => {
  console.log("🚀 Custom Express server running on port 3002");
});
