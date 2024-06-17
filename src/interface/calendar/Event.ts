import { RecurrenceRule } from "react-native-calendar-events";

export type Event = {
    id_calendar: number;
    title: string;
    time_start: Date;
    time_end: Date;
    description: string;
    color: string;
    is_all_day: boolean;
    category: number;
    location: string; 
    recurrence_exception: string;
    recurrence_id: number;
    recurrence_rule: string;
    start_timezone: string;
    end_timezone: string;
};