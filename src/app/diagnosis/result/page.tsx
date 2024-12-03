import { Suspense } from "react";
import DiagnosisResultPage from "./DiagnosisResultPage";

export default function Page() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <DiagnosisResultPage />
    </Suspense>
  );
}
