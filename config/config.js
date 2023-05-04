export default {
    port: process.env.PORT || 8000,
    ip: process.env.HOST || '0.0.0.0',
    mongo: {
      uri: process.env.MONGO_URL || 'mongodb://localhost:27017/clientmanagement'
    },
    jwtSecret: process.env.JWT_SECRET || 'jkl!±@£!@ghj1237'
  };
  