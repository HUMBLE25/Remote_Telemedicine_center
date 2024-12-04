"use client"
import { useEffect, useState } from "react";
import styles from "@/styles/Header.module.css";

export default function Header() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // 현재 날짜 가져오기
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, "0");
    
    // 요일 이름 배열
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const weekday = weekdays[date.getDay()]; // 요일 인덱스 가져오기

    // "YYYY.MM.DD (요일)" 형식으로 설정
    setCurrentDate(`${year}.${month}.${day} (${weekday})`);
  }, []); // 빈 배열로 한 번만 실행

  return (
    <header className={styles.header}>
      {/* 우측 정렬된 요소 */}
      <div className={styles.headerRight}>
        {/* <button className={styles.button}>LOGIN</button>  */}
        {/* 로그인 기능 구현전까지는 보류 */}
        <p className={styles.date}>DATE: {currentDate}</p>
      </div>
    </header>
    
  );
}
