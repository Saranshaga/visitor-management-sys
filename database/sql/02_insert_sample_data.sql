-- Sample Data for Visitor Management System
-- Insert test data for development and testing

-- =============================================
-- Insert Sample Visitors
-- =============================================
INSERT INTO Visitors (FirstName, LastName, Company, ContactNumber, Email, CreatedDate) VALUES
('John', 'Smith', 'Tech Solutions Inc', '+1-555-0101', 'john.smith@techsolutions.com', '2024-01-15 09:00:00'),
('Sarah', 'Johnson', 'Marketing Pro Ltd', '+1-555-0102', 'sarah.j@marketingpro.com', '2024-01-16 10:30:00'),
('Michael', 'Brown', 'Brown Consulting', '+1-555-0103', 'michael@brownconsulting.com', '2024-01-17 11:15:00'),
('Emily', 'Davis', 'Creative Agency', '+1-555-0104', 'emily.davis@creative.com', '2024-01-18 14:20:00'),
('David', 'Wilson', 'Wilson & Associates', '+1-555-0105', 'david.wilson@associates.com', '2024-01-19 16:45:00'),
('Lisa', 'Anderson', 'Global Enterprises', '+1-555-0106', 'lisa.anderson@global.com', '2024-01-20 08:30:00'),
('Robert', 'Taylor', 'Taylor Industries', '+1-555-0107', 'robert.taylor@industries.com', '2024-01-21 13:10:00'),
('Jennifer', 'Martinez', 'Martinez Law Firm', '+1-555-0108', 'jennifer@martinezlaw.com', '2024-01-22 15:25:00'),
('Christopher', 'Garcia', 'Garcia Construction', '+1-555-0109', 'chris.garcia@construction.com', '2024-01-23 12:40:00'),
('Amanda', 'Rodriguez', 'Rodriguez Design Studio', '+1-555-0110', 'amanda@rodriguezdesign.com', '2024-01-24 17:55:00');

-- =============================================
-- Insert Sample Hosts
-- =============================================
INSERT INTO Hosts (FirstName, LastName, Department, ContactNumber) VALUES
('Alice', 'Cooper', 'Human Resources', '+1-555-1001'),
('Bob', 'Miller', 'Engineering', '+1-555-1002'),
('Carol', 'White', 'Marketing', '+1-555-1003'),
('Daniel', 'Lee', 'Sales', '+1-555-1004'),
('Eva', 'Thompson', 'Finance', '+1-555-1005'),
('Frank', 'Harris', 'Operations', '+1-555-1006'),
('Grace', 'Clark', 'Legal', '+1-555-1007'),
('Henry', 'Lewis', 'IT Support', '+1-555-1008'),
('Iris', 'Walker', 'Executive', '+1-555-1009'),
('Jack', 'Hall', 'Customer Service', '+1-555-1010');

-- =============================================
-- Insert Sample Visits
-- =============================================
-- Recent and active visits
INSERT INTO Visits (VisitorID, HostID, Purpose, CheckInTime, CheckOutTime, Status) VALUES
-- Today's active visits
(1, 1, 'Job Interview - Software Engineer Position', '2024-07-24 09:00:00', NULL, 'Checked In'),
(2, 3, 'Marketing Campaign Discussion', '2024-07-24 10:30:00', NULL, 'Checked In'),
(3, 2, 'Technical Consultation', '2024-07-24 11:15:00', NULL, 'Checked In'),

-- Today's completed visits
(4, 4, 'Sales Presentation', '2024-07-24 08:00:00', '2024-07-24 09:30:00', 'Checked Out'),
(5, 5, 'Financial Review Meeting', '2024-07-24 14:00:00', '2024-07-24 15:30:00', 'Checked Out'),

-- Yesterday's visits
(6, 6, 'Operations Planning Session', '2024-07-23 09:30:00', '2024-07-23 11:00:00', 'Checked Out'),
(7, 7, 'Legal Consultation', '2024-07-23 13:00:00', '2024-07-23 14:30:00', 'Checked Out'),
(8, 8, 'IT System Setup', '2024-07-23 15:00:00', '2024-07-23 16:45:00', 'Checked Out'),

-- Previous week's visits
(9, 9, 'Executive Meeting', '2024-07-22 10:00:00', '2024-07-22 11:30:00', 'Checked Out'),
(10, 10, 'Customer Support Training', '2024-07-22 14:00:00', '2024-07-22 17:00:00', 'Checked Out'),
(1, 2, 'Follow-up Technical Discussion', '2024-07-21 11:00:00', '2024-07-21 12:00:00', 'Checked Out'),
(2, 4, 'Marketing Strategy Review', '2024-07-20 13:30:00', '2024-07-20 15:00:00', 'Checked Out'),
(3, 1, 'HR Policy Discussion', '2024-07-19 09:00:00', '2024-07-19 10:30:00', 'Checked Out'),
(4, 3, 'Brand Collaboration Meeting', '2024-07-18 16:00:00', '2024-07-18 17:30:00', 'Checked Out'),
(5, 5, 'Budget Planning Session', '2024-07-17 14:30:00', '2024-07-17 16:00:00', 'Checked Out');

-- =============================================
-- Verification Queries
-- =============================================
-- Uncomment these to verify data insertion

-- SELECT COUNT(*) as TotalVisitors FROM Visitors;
-- SELECT COUNT(*) as TotalHosts FROM Hosts;
-- SELECT COUNT(*) as TotalVisits FROM Visits;
-- 
-- SELECT 
--     v.FirstName + ' ' + v.LastName as VisitorName,
--     h.FirstName + ' ' + h.LastName as HostName,
--     vt.Purpose,
--     vt.CheckInTime,
--     vt.Status
-- FROM Visits vt
-- JOIN Visitors v ON vt.VisitorID = v.VisitorID
-- JOIN Hosts h ON vt.HostID = h.HostID
-- WHERE vt.Status = 'Checked In'
-- ORDER BY vt.CheckInTime DESC;