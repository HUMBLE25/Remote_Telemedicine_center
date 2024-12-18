export const diagnosisEmailTemplate = (diagnosisResult: string) => `
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }
      .email-container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        margin-bottom: 20px;
      }
      .header img {
        width: 100px;
      }
      .header h1 {
        font-size: 24px;
        margin: 10px 0;
        color: #007acc;
      }
      .content {
        font-size: 16px;
        line-height: 1.6;
        color: #333;
        white-space: pre-line; /* 줄바꿈과 공백을 유지 */
      }
      .footer {
        margin-top: 20px;
        text-align: center;
        font-size: 14px;
        color: #777;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <img src="https://www.remotetraumacenter.site/favicon.ico" alt="Logo" />
        <h1>진단 결과</h1>
      </div>
      <div class="content">
        ${diagnosisResult.replace(/\n/g, "<br>")}
      </div>
      <div class="footer">
        &copy; 2024 RTC. All rights reserved.
      </div>
    </div>
  </body>
</html>
`;
