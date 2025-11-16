const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'YOUR_secret_key',
    mongoUri: "mongodb+srv://ersapatel_db_user:admin123@codecraftercluster.5xoussw.mongodb.net/Final_Project?appName=CodeCrafterCluster"
  };
  
  export default config;
  