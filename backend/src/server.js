const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;
const useDb = String(process.env.USE_DB || 'false').toLowerCase() === 'true';

const start = async () => {
  if (useDb) {
    await connectDB();
  } else {
    console.log('Starting API without database connection (USE_DB=false)');
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

start().catch((error) => {
  console.error('Server failed to start:', error.message);
  process.exit(1);
});
