// "use client"; // Client Component 선언
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/TraumaCard.module.css';

type TraumaCardProps = {
  trauma: { id: string; name: string; image: string };
};

export default function TraumaCard({ trauma }: TraumaCardProps) {
  return (
    <Link href={`/trauma/${trauma.id}`}className={styles.card}>
      {/* 이미지 섹션 */}
      <div className={styles.imageWrapper}>
        <Image
          src={trauma.image}
          alt={trauma.name}
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>

      {/* 텍스트 섹션 */}
      <p className={styles.text}>{trauma.name}</p>
    </Link>
  );
}
