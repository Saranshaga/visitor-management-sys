# API Documentation

This document outlines the planned API endpoints for the Visitor Management System backend integration.

## Base URL

```
Production: https://api.vms.your-domain.com/v1
Development: http://localhost:3001/api/v1
```

## Authentication

All API endpoints require authentication using JWT tokens.

### Headers

```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

## Endpoints

### Authentication

#### POST /auth/login
Login to the system

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "role": "admin"
    }
  }
}
```

#### POST /auth/logout
Logout from the system

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Visitors

#### GET /visitors
Get all visitors with pagination and filtering

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `search` (string): Search term
- `company` (string): Filter by company
- `dateFrom` (string): Filter from date (YYYY-MM-DD)
- `dateTo` (string): Filter to date (YYYY-MM-DD)

**Response:**
```json
{
  "success": true,
  "data": {
    "visitors": [
      {
        "VisitorID": 1,
        "FirstName": "John",
        "LastName": "Doe",
        "Company": "ABC Corp",
        "ContactNumber": "+1234567890",
        "Email": "john.doe@abc.com",
        "CreatedDate": "2024-01-20T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "pages": 3
    }
  }
}
```

#### POST /visitors
Create a new visitor

**Request Body:**
```json
{
  "FirstName": "John",
  "LastName": "Doe",
  "Company": "ABC Corp",
  "ContactNumber": "+1234567890",
  "Email": "john.doe@abc.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "VisitorID": 1,
    "FirstName": "John",
    "LastName": "Doe",
    "Company": "ABC Corp",
    "ContactNumber": "+1234567890",
    "Email": "john.doe@abc.com",
    "CreatedDate": "2024-01-20T10:30:00Z"
  }
}
```

#### GET /visitors/:id
Get visitor by ID

**Response:**
```json
{
  "success": true,
  "data": {
    "VisitorID": 1,
    "FirstName": "John",
    "LastName": "Doe",
    "Company": "ABC Corp",
    "ContactNumber": "+1234567890",
    "Email": "john.doe@abc.com",
    "CreatedDate": "2024-01-20T10:30:00Z"
  }
}
```

#### PUT /visitors/:id
Update visitor information

**Request Body:**
```json
{
  "FirstName": "John",
  "LastName": "Smith",
  "Company": "XYZ Corp",
  "ContactNumber": "+1234567890",
  "Email": "john.smith@xyz.com"
}
```

#### DELETE /visitors/:id
Delete a visitor

**Response:**
```json
{
  "success": true,
  "message": "Visitor deleted successfully"
}
```

### Hosts

#### GET /hosts
Get all hosts

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "HostID": 1,
      "FirstName": "Jane",
      "LastName": "Smith",
      "Department": "Engineering",
      "ContactNumber": "+1234567891"
    }
  ]
}
```

#### POST /hosts
Create a new host

**Request Body:**
```json
{
  "FirstName": "Jane",
  "LastName": "Smith",
  "Department": "Engineering",
  "ContactNumber": "+1234567891"
}
```

#### PUT /hosts/:id
Update host information

#### DELETE /hosts/:id
Delete a host

### Visits

#### GET /visits
Get all visits with filtering

**Query Parameters:**
- `page` (number): Page number
- `limit` (number): Items per page
- `status` (string): Filter by status ('Checked In' | 'Checked Out')
- `visitorId` (number): Filter by visitor ID
- `hostId` (number): Filter by host ID
- `dateFrom` (string): Filter from date
- `dateTo` (string): Filter to date

**Response:**
```json
{
  "success": true,
  "data": {
    "visits": [
      {
        "VisitID": 1,
        "VisitorID": 1,
        "HostID": 1,
        "Purpose": "Business Meeting",
        "CheckInTime": "2024-01-20T09:00:00Z",
        "CheckOutTime": "2024-01-20T11:00:00Z",
        "Status": "Checked Out",
        "Visitor": {
          "FirstName": "John",
          "LastName": "Doe",
          "Company": "ABC Corp"
        },
        "Host": {
          "FirstName": "Jane",
          "LastName": "Smith",
          "Department": "Engineering"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 15,
      "pages": 2
    }
  }
}
```

#### POST /visits
Create a new visit (check-in)

**Request Body:**
```json
{
  "VisitorID": 1,
  "HostID": 1,
  "Purpose": "Business Meeting"
}
```

#### PUT /visits/:id/checkout
Check out a visitor

**Response:**
```json
{
  "success": true,
  "data": {
    "VisitID": 1,
    "CheckOutTime": "2024-01-20T11:00:00Z",
    "Status": "Checked Out",
    "Duration": "2 hours 15 minutes"
  }
}
```

### Reports

#### GET /reports/daily
Get daily visitor report

**Query Parameters:**
- `date` (string): Specific date (YYYY-MM-DD), defaults to today

**Response:**
```json
{
  "success": true,
  "data": {
    "date": "2024-01-20",
    "statistics": {
      "totalVisits": 25,
      "checkedIn": 5,
      "checkedOut": 20,
      "uniqueVisitors": 22,
      "averageVisitDuration": "1.5 hours"
    },
    "visits": [
      {
        "VisitID": 1,
        "Visitor": "John Doe",
        "Host": "Jane Smith",
        "CheckInTime": "09:00",
        "CheckOutTime": "11:00",
        "Duration": "2h 0m",
        "Purpose": "Business Meeting"
      }
    ]
  }
}
```

#### GET /reports/historical
Get historical reports

**Query Parameters:**
- `dateFrom` (string): Start date (YYYY-MM-DD)
- `dateTo` (string): End date (YYYY-MM-DD)
- `groupBy` (string): Group by 'day', 'week', or 'month'

#### GET /reports/analytics
Get analytics data

**Response:**
```json
{
  "success": true,
  "data": {
    "totalVisitors": 150,
    "totalVisits": 300,
    "averageVisitsPerDay": 12,
    "topCompanies": [
      {
        "company": "ABC Corp",
        "visits": 25
      }
    ],
    "topHosts": [
      {
        "host": "Jane Smith",
        "visits": 30
      }
    ],
    "visitsByHour": [
      { "hour": 9, "visits": 15 },
      { "hour": 10, "visits": 20 }
    ]
  }
}
```

#### GET /reports/export
Export reports in various formats

**Query Parameters:**
- `format` (string): 'csv', 'pdf', or 'excel'
- `type` (string): 'daily', 'historical', or 'analytics'
- `dateFrom` (string): Start date
- `dateTo` (string): End date

**Response:**
Returns file download

### Admin

#### GET /admin/dashboard
Get admin dashboard data

**Response:**
```json
{
  "success": true,
  "data": {
    "todayStats": {
      "visits": 25,
      "checkedIn": 5,
      "checkedOut": 20
    },
    "recentActivity": [
      {
        "type": "check_in",
        "visitor": "John Doe",
        "time": "2024-01-20T10:30:00Z"
      }
    ],
    "systemStatus": {
      "uptime": "99.9%",
      "lastBackup": "2024-01-20T02:00:00Z"
    }
  }
}
```

#### GET /admin/users
Get system users

#### POST /admin/users
Create new user

#### PUT /admin/users/:id
Update user

#### DELETE /admin/users/:id
Delete user

## Error Responses

All endpoints return errors in the following format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### Error Codes

- `VALIDATION_ERROR` - Request validation failed
- `AUTHENTICATION_ERROR` - Invalid or missing authentication
- `AUTHORIZATION_ERROR` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `CONFLICT` - Resource conflict (e.g., duplicate email)
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `INTERNAL_ERROR` - Server error

## Rate Limiting

- **Rate Limit**: 100 requests per 15-minute window per IP
- **Headers**:
  - `X-RateLimit-Limit`: Request limit
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Reset time

## Webhooks

The system supports webhooks for real-time notifications:

### Events
- `visitor.registered` - New visitor registered
- `visit.checked_in` - Visitor checked in
- `visit.checked_out` - Visitor checked out
- `host.created` - New host created

### Webhook Payload
```json
{
  "event": "visit.checked_in",
  "timestamp": "2024-01-20T10:30:00Z",
  "data": {
    "visitId": 1,
    "visitorName": "John Doe",
    "hostName": "Jane Smith"
  }
}
```