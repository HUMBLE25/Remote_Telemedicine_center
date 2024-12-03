import Header from "@/components/Header";
import Introduction from "@/components/Introduction";
import LandingSection from "@/components/LandingSection";
import TraumaCard from "@/components/TraumaCard";
import styles from '@/styles/HomePage.module.css';

const traumaTypes = [
  { id: 'burn', name: '화상', image: '/images/burn.svg' },
  { id: 'cut', name: '철과상', image: '/images/cut.svg' },
  { id: 'bruise', name: '타박상', image: '/images/bruise.svg' },
  { id: 'sprain', name: '염좌', image: '/images/sprain.svg' },
];

export default function HomePage() {
  return (
    <div className={`${styles.container} min-h-screen`}>
      {/* Header 컴포넌트 */}
      <Header />

      {/* 랜딩 섹션 */}
      <LandingSection/>

      {/* 외상 선택 카드 */}
      <section className={`${styles.traumaSection} w-full my-8 `}>
        <h2 className={styles.title}>{`"어디가 아파서 오셨나요?"`}</h2>
        <div className={`${styles.traumaGrid}`}>
          {traumaTypes.map((trauma) => (
            <TraumaCard key={trauma.id} trauma={trauma} />
          ))}
        </div>
      </section>

      {/* Introduction 컴포넌트 */}
      <Introduction />
    </div>
  );
}