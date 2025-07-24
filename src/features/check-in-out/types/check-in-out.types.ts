export interface CheckInData {
  VisitorID: number;
  HostID: number;
  Purpose: string;
}

export interface CheckOutData {
  VisitID: number;
  CheckOutTime?: Date;
}

export interface ActiveVisit {
  VisitID: number;
  VisitorID: number;
  HostID: number;
  visitorName: string;
  hostName: string;
  company: string;
  Purpose: string;
  CheckInTime: Date;
  duration: string;
  Status: 'Checked In';
}

export interface CheckInResponse {
  VisitID: number;
  success: boolean;
  message: string;
}

export interface CheckOutResponse {
  success: boolean;
  message: string;
  duration: string;
}