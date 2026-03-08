# FullStackChallengeNo1
Truuth Hiring Full Stack Challenge

Architecture:
The application uses a React frontend deployed on Vercel and a Node.js + Express backend implemented as Vercel serverless functions. Prisma ORM is used to interact with a PostgreSQL database. Authentication is handled using JWT tokens with a middleware protecting API routes.

Document Upload:
File uploads are handled using Multer. Uploaded documents are temporarily processed by the backend for classification using the Truuth Document Classifier API. For passport and driver licence uploads, the classifier validates that the document type matches the expected document before marking it as IN_PROGRESS.

Architecture Decisions:
• Prisma was used for database interaction to simplify schema management and queries.
• JWT authentication was implemented for secure API access.
• Serverless deployment on Vercel was chosen for simplicity and fast deployment.
• File uploads are processed in memory due to serverless environment limitations.

Shortcuts Taken:
• The Truuth Verify API integration was temporarily disabled due to AWS Signature v4 credential configuration complexity.
• Documents are stored as temporary file paths instead of permanent object storage.
• Background verification worker is mocked rather than fully implemented.

Known Limitations:
• Uploaded files are not persisted in cloud storage (e.g., S3).
• Verification API integration is not fully implemented.
• Serverless file handling requires memory processing which may limit large uploads.
• No retry logic or queue system for verification processing.

Future Improvements:
• Integrate Truuth Verify API with AWS Signature v4 authentication.
• Store documents in cloud object storage such as AWS S3.
• Implement background processing using a queue worker.
• Add better frontend error handling and upload progress indicators.
