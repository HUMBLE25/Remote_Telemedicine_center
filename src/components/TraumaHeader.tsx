import Image from "next/image";
import Link from "next/link"; // Link 컴포넌트 임포트
import styles from '@/styles/TraumaHeader.module.css';

export default function TraumaHeader() {
  return (
    <header className={styles.header}>
      {/* 로고 */}
      <Link href="/" className={styles.imageContainer}>
        {/* Link로 로고를 감쌈 */}
        <Image
          src="/images/cloud-firstaid.svg"
          alt="Cloud First Aid Icon"
          layout="responsive"
          width={1} // 너비 비율
          height={1} // 높이 비율
          style={{ objectFit: "contain" }}
        />
      </Link>
      
      {/* 타이틀 */}
      <div className={styles.title}>
        RTC
      </div>
    </header>
  );
}
