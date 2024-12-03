import styles from '@/styles/Introduction.module.css';

const teamMembers = [
  {
    name: 'KimJingyeom',
    email: 'wlsrua1007@gmail.com',
    github: 'https://github.com/HUMBLE25',
  },
  {
    name: 'KimSeyeon',
    email: 'kimseyeon@example.com',
    github: 'https://github.com/snowball03',
  },
];
export default function Introduction() {
  return (
    <section className={styles.introductionSection}>
      <h2 className={styles.title}>Introduction</h2>
      <div className={styles.cardContainer}>
        {teamMembers.map((member) => (
          <div key={member.name} className={styles.card}>
            <div className={styles.name}>{member.name}</div>
            <div className={styles.hiddenInfo}>
              <p className={styles.email}>{member.email}</p>
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.github}
              >
                Visit GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}