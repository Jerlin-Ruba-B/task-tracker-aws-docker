
const mongoose = require('mongoose');
const os = require('os');

beforeAll(async () => {
  await mongoose.connect(
    'mongodb://127.0.0.1:27017/task_tracker_test',
    {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,

      // Fix MongoDB driver metadata issue in Jest
      runtimeAdapters: {
        os: os
      }
    }
  );

  console.log('Jest: MongoDB connected successfully');
}, 15000);

afterEach(async () => {
  if (mongoose.connection.readyState === 1) {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  }
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}, 15000);
