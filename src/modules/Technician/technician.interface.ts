export interface TUpdateTechnicianProfile {
  bio?: string;
  experience?: number;
  hourlyRate?: number;
  location?: string;
}

export interface TUpdateAvailability {
  day: string;
  startTime: string;
  endTime: string;
  isAvailable?: boolean;
}

export interface TUpdateBookingStatus {
  status:
    | "ACCEPTED"
    | "DECLINED"
    | "IN_PROGRESS"
    | "COMPLETED";
}