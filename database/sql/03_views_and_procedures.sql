-- Views and Stored Procedures for Visitor Management System

-- =============================================
-- VIEW: Active Visits with Details
-- =============================================
CREATE VIEW vw_ActiveVisits AS
SELECT 
    v.VisitID,
    v.CheckInTime,
    v.Purpose,
    vis.VisitorID,
    vis.FirstName + ' ' + vis.LastName AS VisitorName,
    vis.Company AS VisitorCompany,
    vis.ContactNumber AS VisitorContact,
    vis.Email AS VisitorEmail,
    h.HostID,
    h.FirstName + ' ' + h.LastName AS HostName,
    h.Department AS HostDepartment,
    h.ContactNumber AS HostContact,
    DATEDIFF(MINUTE, v.CheckInTime, GETDATE()) AS MinutesInside
FROM Visits v
INNER JOIN Visitors vis ON v.VisitorID = vis.VisitorID
INNER JOIN Hosts h ON v.HostID = h.HostID
WHERE v.Status = 'Checked In' AND v.CheckOutTime IS NULL;

-- =============================================
-- VIEW: Daily Visit Summary
-- =============================================
CREATE VIEW vw_DailyVisitSummary AS
SELECT 
    CAST(v.CheckInTime AS DATE) AS VisitDate,
    COUNT(*) AS TotalVisits,
    COUNT(CASE WHEN v.Status = 'Checked In' THEN 1 END) AS ActiveVisits,
    COUNT(CASE WHEN v.Status = 'Checked Out' THEN 1 END) AS CompletedVisits,
    AVG(CASE 
        WHEN v.CheckOutTime IS NOT NULL 
        THEN DATEDIFF(MINUTE, v.CheckInTime, v.CheckOutTime) 
        END) AS AvgVisitDurationMinutes
FROM Visits v
GROUP BY CAST(v.CheckInTime AS DATE);

-- =============================================
-- VIEW: Visitor History with Visit Count
-- =============================================
CREATE VIEW vw_VisitorHistory AS
SELECT 
    vis.VisitorID,
    vis.FirstName,
    vis.LastName,
    vis.Company,
    vis.ContactNumber,
    vis.Email,
    vis.CreatedDate,
    COUNT(v.VisitID) AS TotalVisits,
    MAX(v.CheckInTime) AS LastVisitDate,
    COUNT(CASE WHEN v.Status = 'Checked In' THEN 1 END) AS ActiveVisits
FROM Visitors vis
LEFT JOIN Visits v ON vis.VisitorID = v.VisitorID
GROUP BY vis.VisitorID, vis.FirstName, vis.LastName, vis.Company, 
         vis.ContactNumber, vis.Email, vis.CreatedDate;

-- =============================================
-- STORED PROCEDURE: Check In Visitor
-- =============================================
CREATE PROCEDURE sp_CheckInVisitor
    @VisitorID INT,
    @HostID INT,
    @Purpose NVARCHAR(500)
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @NewVisitID INT;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- Validate visitor exists
        IF NOT EXISTS (SELECT 1 FROM Visitors WHERE VisitorID = @VisitorID)
        BEGIN
            RAISERROR('Visitor not found', 16, 1);
            RETURN;
        END
        
        -- Validate host exists
        IF NOT EXISTS (SELECT 1 FROM Hosts WHERE HostID = @HostID)
        BEGIN
            RAISERROR('Host not found', 16, 1);
            RETURN;
        END
        
        -- Check if visitor already has active visit
        IF EXISTS (SELECT 1 FROM Visits WHERE VisitorID = @VisitorID AND Status = 'Checked In')
        BEGIN
            RAISERROR('Visitor already has an active visit', 16, 1);
            RETURN;
        END
        
        -- Create new visit
        INSERT INTO Visits (VisitorID, HostID, Purpose, CheckInTime, Status)
        VALUES (@VisitorID, @HostID, @Purpose, GETDATE(), 'Checked In');
        
        SET @NewVisitID = SCOPE_IDENTITY();
        
        COMMIT TRANSACTION;
        
        -- Return the new visit details
        SELECT 
            v.VisitID,
            v.CheckInTime,
            v.Purpose,
            vis.FirstName + ' ' + vis.LastName AS VisitorName,
            h.FirstName + ' ' + h.LastName AS HostName
        FROM Visits v
        INNER JOIN Visitors vis ON v.VisitorID = vis.VisitorID
        INNER JOIN Hosts h ON v.HostID = h.HostID
        WHERE v.VisitID = @NewVisitID;
        
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;

-- =============================================
-- STORED PROCEDURE: Check Out Visitor
-- =============================================
CREATE PROCEDURE sp_CheckOutVisitor
    @VisitID INT
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- Validate visit exists and is active
        IF NOT EXISTS (SELECT 1 FROM Visits WHERE VisitID = @VisitID AND Status = 'Checked In')
        BEGIN
            RAISERROR('Active visit not found', 16, 1);
            RETURN;
        END
        
        -- Update visit
        UPDATE Visits 
        SET CheckOutTime = GETDATE(),
            Status = 'Checked Out'
        WHERE VisitID = @VisitID;
        
        COMMIT TRANSACTION;
        
        -- Return updated visit details
        SELECT 
            v.VisitID,
            v.CheckInTime,
            v.CheckOutTime,
            DATEDIFF(MINUTE, v.CheckInTime, v.CheckOutTime) AS DurationMinutes,
            vis.FirstName + ' ' + vis.LastName AS VisitorName,
            h.FirstName + ' ' + h.LastName AS HostName
        FROM Visits v
        INNER JOIN Visitors vis ON v.VisitorID = vis.VisitorID
        INNER JOIN Hosts h ON v.HostID = h.HostID
        WHERE v.VisitID = @VisitID;
        
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END;

-- =============================================
-- STORED PROCEDURE: Get Visit Report
-- =============================================
CREATE PROCEDURE sp_GetVisitReport
    @StartDate DATE = NULL,
    @EndDate DATE = NULL,
    @HostID INT = NULL,
    @VisitorID INT = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    -- Set default dates if not provided
    IF @StartDate IS NULL SET @StartDate = CAST(GETDATE() AS DATE);
    IF @EndDate IS NULL SET @EndDate = CAST(GETDATE() AS DATE);
    
    SELECT 
        v.VisitID,
        v.CheckInTime,
        v.CheckOutTime,
        v.Purpose,
        v.Status,
        CASE 
            WHEN v.CheckOutTime IS NOT NULL 
            THEN DATEDIFF(MINUTE, v.CheckInTime, v.CheckOutTime)
            ELSE DATEDIFF(MINUTE, v.CheckInTime, GETDATE())
        END AS DurationMinutes,
        vis.VisitorID,
        vis.FirstName + ' ' + vis.LastName AS VisitorName,
        vis.Company AS VisitorCompany,
        vis.ContactNumber AS VisitorContact,
        h.HostID,
        h.FirstName + ' ' + h.LastName AS HostName,
        h.Department AS HostDepartment
    FROM Visits v
    INNER JOIN Visitors vis ON v.VisitorID = vis.VisitorID
    INNER JOIN Hosts h ON v.HostID = h.HostID
    WHERE 
        CAST(v.CheckInTime AS DATE) BETWEEN @StartDate AND @EndDate
        AND (@HostID IS NULL OR v.HostID = @HostID)
        AND (@VisitorID IS NULL OR v.VisitorID = @VisitorID)
    ORDER BY v.CheckInTime DESC;
END;