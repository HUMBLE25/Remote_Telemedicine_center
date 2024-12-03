"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import styles from "@/styles/TraumaPage.module.css";
import TraumaHeader from "@/components/TraumaHeader";
import { useRouter } from "next/navigation";

const traumaType = {
  cut: "찰과상",
  burn: "화상",
  bruise: "타박상",
  sprain: "염좌",
};

const traumaDetails = {
  burn: ["열 화상", "화학 화상", "전기 화상", "햇볕 화상"],
  cut: ["표피 찰과상 (가벼운 긁힘)", "진피 찰과상 (출혈이 생긴 긁힘)", "부분층 찰과상 (출혈과 부기)", "전층 찰과상 (매우 깊은 외상)"],
  bruise: ["경미한 타박상 (피부 표면에만 발생)", "주등도 타박상 (부기와 멍)", "심부 타박상 (상당한 통증과 부종, 움직임에 제약)", "관절 타박상 (관절 부위에 발생한 타박상)"],
  sprain: ["1도 염좌 (인대가 약간 늘어나거나 미세하게 찢어짐)", "2도 염좌 (인대가 부분적으로 찢어지고 움직임에 제한)", "3도 염좌 (인대가 완전히 찢어지고 심각한 통증)", "만성 염좌 (선천성 염좌)"],
};

const injuryLocations = ["손", "팔", "다리", "얼굴", "기타"];

const TraumaPage = () => {
  const router = useRouter();
  const { id } = useParams() as { id: keyof typeof traumaDetails };
  const [selectedDetail, setSelectedDetail] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [painLevel, setPainLevel] = useState(1);
  const [additionalInfo, setAdditionalInfo] = useState(""); // 추가 정보 상태
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [diagnosisResult, setDiagnosisResult] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("진단 중.");

  useEffect(() => {
    if (isSubmitting) {
      const interval = setInterval(() => {
        setLoadingMessage((prev) =>
          prev === "진단 중..."
            ? "진단 중."
            : prev === "진단 중.."
            ? "진단 중..."
            : "진단 중.."
        );
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isSubmitting]);

  const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDetail(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedLocations((prev) =>
      prev.includes(value)
        ? prev.filter((location) => location !== value)
        : [...prev, value]
    );
  };

  const handlePainLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPainLevel(value);

    const slider = e.target;
    const percentage = ((value - 1) / (Number(slider.max) - 1)) * 100;
    slider.style.background = `linear-gradient(to right, #007acc ${percentage}%, #ccc ${percentage}%)`;
  };

  const handleSubmit = async () => {
    const requestData = {
      traumaType: selectedDetail,
      locations: selectedLocations,
      painLevel,
      additionalInfo, // 추가 정보 포함
    };

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/diagnosis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
      const responseData = await response.json();
      console.log("API 응답:", responseData);

      if (response.ok && responseData.data) {
        router.push(
          `/diagnosis/result?diagnosis=${encodeURIComponent(responseData.data.diagnosis)}`
        );
      } else {
        console.error("API 응답 데이터가 유효하지 않습니다:", responseData);
        alert(`에러: ${responseData.message || "유효하지 않은 응답"}`);
      }
    } catch (error) {
      console.error("데이터 전송 오류:", error);
      alert("진단 요청 중 문제가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <TraumaHeader />
      <h1 className={styles.title}>{`'${traumaType[id]}'을 선택하셨습니다.`}</h1>

      <div className={styles.section}>
        <h2 className={styles.subtitle}>외상 세부 종류를 선택하세요.</h2>
        {traumaDetails[id]?.map((detail) => (
          <label key={detail} className={styles.radioWrapper}>
            <div className={styles.radioText}>{detail}</div>
            <input
              type="radio"
              name="detail"
              value={detail}
              checked={selectedDetail === detail}
              onChange={handleDetailChange}
              className={styles.radioInput}
            />
          </label>
        ))}
      </div>

      <div className={styles.section}>
        <h2 className={styles.subtitle}>상처 부위가 어디인가요?</h2>
        {injuryLocations.map((location) => (
          <label key={location} className={styles.checkboxWrapper}>
            <div className={styles.checkboxText}>{location}</div>
            <input
              type="checkbox"
              value={location}
              checked={selectedLocations.includes(location)}
              onChange={handleLocationChange}
              className={styles.checkboxInput}
            />
          </label>
        ))}
      </div>

      <div className={styles.section}>
        <h2 className={styles.subtitle}>고통을 척도로 표현한다면 어느 정도인가요?</h2>
        <input
          type="range"
          min="1"
          max="10"
          value={painLevel}
          onChange={handlePainLevelChange}
          className={styles.range}
          style={{
            background: `linear-gradient(to right, #007acc ${
              ((painLevel - 1) / 9) * 100
            }%, #ccc ${(painLevel / 10) * 100}%)`,
          }}
        />
        <div className={styles.painScale}>
          <span>1</span>
          <span>10</span>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.subtitle}>추가적으로 남기고 싶은 내용을 입력해주세요.</h2>
        <textarea
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          placeholder="어떤 이유로 다쳤는지, 추가적으로 전달하고 싶은 내용을 작성해주세요."
          className={styles.textarea}
        />
      </div>

      <button onClick={handleSubmit} className={styles.submitButton} disabled={isSubmitting}>
        {isSubmitting ? loadingMessage : "진단 완료"}
      </button>

      {diagnosisResult && (
        <div className={styles.resultSection}>
          <h2 className={styles.subtitle}>진단 결과</h2>
          <p className={styles.resultText}>{diagnosisResult}</p>
        </div>
      )}
    </div>
  );
};

export default TraumaPage;
