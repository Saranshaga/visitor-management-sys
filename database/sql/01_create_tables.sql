-- Visitor Management System Database Schema
-- SQL Server / MySQL Compatible

-- Create Database (Optional - uncomment if needed)
-- CREATE DATABASE VisitorManagementSystem;
-- USE VisitorManagementSystem;

-- =============================================
-- Table: Visitors
-- =============================================
CREATE TABLE Visitors (
    VisitorID INT IDENTITY(1,1) PRIMARY KEY,  -- Auto-increment primary key
    FirstName NVARCHAR(100) NOT NULL,         -- Visitor's first name
    LastName NVARCHAR(100) NOT NULL,          -- Visitor's last name
    Company NVARCHAR(200) NULL,               -- Company name (optional)
    ContactNumber NVARCHAR(20) NULL,          -- Phone number (optional)
    Email NVARCHAR(255) NULL,                 -- Email address (optional)
    CreatedDate DATETIME2 DEFAULT GETDATE(),  -- Record creation timestamp
    
    -- Constraints
    CONSTRAINT CHK_Visitor_Email CHECK (Email IS NULL OR Email LIKE '%_@_%'),
    CONSTRAINT CHK_Visitor_Names CHECK (LEN(TRIM(FirstName)) > 0 AND LEN(TRIM(LastName)) > 0)
);

-- =============================================
-- Table: Hosts
-- =============================================
CREATE TABLE Hosts (
    HostID INT IDENTITY(1,1) PRIMARY KEY,     -- Auto-increment primary key
    FirstName NVARCHAR(100) NOT NULL,         -- Host's first name
    LastName NVARCHAR(100) NOT NULL,          -- Host's last name
    Department NVARCHAR(100) NULL,            -- Department (optional)
    ContactNumber NVARCHAR(20) NULL,          -- Phone number (optional)
    
    -- Constraints
    CONSTRAINT CHK_Host_Names CHECK (LEN(TRIM(FirstName)) > 0 AND LEN(TRIM(LastName)) > 0)
);

-- =============================================
-- Table: Visits
-- =============================================
CREATE TABLE Visits (
    VisitID INT IDENTITY(1,1) PRIMARY KEY,    -- Auto-increment primary key
    VisitorID INT NOT NULL,                   -- Foreign key to Visitors table
    HostID INT NOT NULL,                      -- Foreign key to Hosts table
    Purpose NVARCHAR(500) NOT NULL,           -- Purpose of visit
    CheckInTime DATETIME2 DEFAULT GETDATE(), -- Check-in timestamp
    CheckOutTime DATETIME2 NULL,              -- Check-out timestamp (optional)
    Status NVARCHAR(20) DEFAULT 'Checked In', -- Visit status
    
    -- Foreign Key Constraints
    CONSTRAINT FK_Visits_Visitor FOREIGN KEY (VisitorID) REFERENCES Visitors(VisitorID)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_Visits_Host FOREIGN KEY (HostID) REFERENCES Hosts(HostID)
        ON DELETE CASCADE ON UPDATE CASCADE,
    
    -- Check Constraints
    CONSTRAINT CHK_Visit_Status CHECK (Status IN ('Checked In', 'Checked Out')),
    CONSTRAINT CHK_Visit_Times CHECK (CheckOutTime IS NULL OR CheckOutTime >= CheckInTime),
    CONSTRAINT CHK_Visit_Purpose CHECK (LEN(TRIM(Purpose)) > 0)
);

-- =============================================
-- Indexes for Performance
-- =============================================

-- Index on Visitor email for quick lookup
CREATE NONCLUSTERED INDEX IX_Visitors_Email 
ON Visitors (Email) 
WHERE Email IS NOT NULL;

-- Index on Visitor names for search
CREATE NONCLUSTERED INDEX IX_Visitors_Names 
ON Visitors (LastName, FirstName);

-- Index on Host names for search
CREATE NONCLUSTERED INDEX IX_Hosts_Names 
ON Hosts (LastName, FirstName);

-- Index on Visit dates for reporting
CREATE NONCLUSTERED INDEX IX_Visits_CheckInTime 
ON Visits (CheckInTime);

-- Index on Visit status for active visits
CREATE NONCLUSTERED INDEX IX_Visits_Status 
ON Visits (Status);

-- Composite index for visitor visits
CREATE NONCLUSTERED INDEX IX_Visits_Visitor_Date 
ON Visits (VisitorID, CheckInTime);

-- Composite index for host visits
CREATE NONCLUSTERED INDEX IX_Visits_Host_Date 
ON Visits (HostID, CheckInTime);