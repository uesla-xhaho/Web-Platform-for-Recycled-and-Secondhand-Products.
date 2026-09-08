IF DB_ID('CircularMarketplace') IS NULL
BEGIN
  CREATE DATABASE CircularMarketplace;
END;
GO

USE CircularMarketplace;
GO

-- Tables are created/updated automatically by Sequelize sync when the backend starts.
-- If you prefer migration-driven SQL DDL, add migration scripts in this folder.
