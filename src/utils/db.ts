import mysql, { Connection } from 'mysql2/promise';

/**
 * 데이터베이스 이름
 * 환경 변수 또는 기본값 사용
 */
const DB_NAME = process.env.DB_NAME || 'trauma_care';

/**
 * MySQL 연결 설정
 */
const connectionConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'trauma_user',
  password: process.env.DB_PASSWORD || 'password',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  database: DB_NAME, // 디버깅용으로 추가
};

/**
 * 데이터베이스 연결 및 초기화
 */
export async function initDB(): Promise<Connection> {
  try {
    // 기본 연결 생성
    console.log('연결 시도 중:', connectionConfig); // 디버깅용 로그 추가
    const connection = await mysql.createConnection(connectionConfig);
    console.log('MySQL 서버에 연결되었습니다.');

    // 데이터베이스가 존재하지 않으면 생성
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    console.log(`데이터베이스 '${DB_NAME}'가 확인되었습니다.`);

    // 생성된 데이터베이스로 연결 전환
    await connection.query(`USE \`${DB_NAME}\`;`);
    console.log(`데이터베이스 '${DB_NAME}'에 연결되었습니다.`);

    // 테이블 생성 (예시)
    await createTables(connection);

    return connection;
  } catch (error) {
    console.error('데이터베이스 초기화 중 오류 발생:', error);
    throw error;
  }
}

// 필요한 테이블
// 사용자 테이블
// 진단 결과 테이블
/**
 * 데이터베이스 테이블 생성
 * @param connection MySQL 연결 객체
 */
async function createTables(connection: Connection): Promise<void> {
  try {
    // 진단 데이터 테이블 생성
    await connection.query(`
      CREATE TABLE IF NOT EXISTS diagnosis (
        id INT AUTO_INCREMENT PRIMARY KEY,
        trauma_type VARCHAR(255) NOT NULL,
        locations TEXT NOT NULL,
        pain_level INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('테이블 `diagnosis`가 확인되었습니다.');
  } catch (error) {
    console.error('테이블 생성 중 오류 발생:', error);
    throw error;
  }
}

/**
 * 디버깅용 MySQL 연결 테스트
 * 이 함수는 별도로 실행해 연결 상태를 확인할 수 있습니다.
 */
export async function testConnection() {
  try {
    const connection = await mysql.createConnection(connectionConfig);
    console.log('MySQL 연결 성공');
    await connection.end();
  } catch (err) {
    console.error('MySQL 연결 실패:', err);
  }
}

// 디버깅을 위해 즉시 실행
(async () => {
  await testConnection();
})();
