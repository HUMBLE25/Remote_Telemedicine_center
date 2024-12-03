"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "@/styles/DiagnosisResult.module.css";

const DiagnosisResultPage = () => {
  const searchParams = useSearchParams();
  const diagnosis = searchParams.get("diagnosis");
  const decodedDiagnosis = diagnosis ? decodeURIComponent(diagnosis) : null;

  const [currentDate, setCurrentDate] = useState("");
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("전송 중.");

  useEffect(() => {
    console.log("SearchParams:", decodedDiagnosis);

    // 현재 날짜 가져오기
    const today = new Date();
    const formattedDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`;
    setCurrentDate(formattedDate);
  }, [decodedDiagnosis]);

  // 전송 중 메시지를 변경하는 효과
  useEffect(() => {
    if (isSending) {
      const interval = setInterval(() => {
        setLoadingMessage((prev) =>
          prev === "전송 중..."
            ? "전송 중."
            : prev === "전송 중.."
            ? "전송 중..."
            : "전송 중.."
        );
      }, 500);

      return () => clearInterval(interval); // Cleanup
    }
  }, [isSending]);

  const handleSendEmail = async () => {
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, diagnosisResult: decodedDiagnosis }),
      });

      const responseData = await response.json();

      if (response.ok) {
        alert("이메일이 성공적으로 전송되었습니다!");
      } else {
        alert(`이메일 전송 실패: ${responseData.message}`);
      }
    } catch (error) {
      console.error("이메일 전송 오류:", error);
      alert("이메일 전송 중 오류가 발생했습니다.");
    } finally {
      setIsSending(false);
    }
  };

  if (!decodedDiagnosis) {
    return (
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.noResult}>진단 결과가 없습니다.</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>PRESCRIPTION</h1>
      <div className={styles.section}>
        <p className={styles.result}>{decodedDiagnosis}</p>
        <div className={styles.thanks}>
          <p className={styles.text}>감사합니다, 또 이용해 주세요!</p>
          <p className={styles.text}>언제나 당신의 완쾌를 희망합니다.</p>
          <p className={styles.text}>RTC {currentDate}.</p>
        </div>
        <div className={styles.getemail}>
          <p className={styles.text}>진단서를 메일 혹은 SMS로 받으시려면 다음 문항을 입력해주세요.</p>
          <div className={styles.emailContainer}>
            <label htmlFor="email" className={styles.emailLabel}>EMAIL</label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.emailInput}
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSending}
            />
            <button
              className={styles.sendButton}
              onClick={handleSendEmail}
              disabled={isSending}
            >
              {isSending ? loadingMessage : "받기"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisResultPage;
