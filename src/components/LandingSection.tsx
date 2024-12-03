import Image from "next/image";
import styles from '@/styles/LandingSection.module.css';

export default function LandingSection() {
  return (
    <section className={styles.landingSection}>
      {/* 구분선 위의 내용 */}
      <div className={styles.content}>
        {/* 텍스트 섹션 */}
        <div className={styles.text}>
          <h1 className={styles.heading}>Remote<br />Telemedicine<br />Center</h1>
          <br />
          <h2 className={styles.subheading}>원격 외상 진료 센터<br />RTC</h2>
        </div>

        {/* 구름 아이콘 */}
        <div className={styles.imageContainer}>
          <Image
            src="/images/cloud-firstaid.svg"
            alt="Cloud First Aid Icon"
            layout="responsive"
            width={1} // 너비 비율
            height={1} // 높이 비율
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>

      {/* 구분선 */}
      <div className={styles.divider}></div>
    </section>
  );
}
