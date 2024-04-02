import baseUrl from "./baseUrl";

const CalendarUrls = {
    getAllCalendar: `${baseUrl}/api/v1/calendar/getAllCalendar/`,
    getEventOnDate: `${baseUrl}/api/v1/calendar/getEventOnDate/`,
    updateCalender: `${baseUrl}/api/v1/calendar/updateCalendar`
}
export default CalendarUrls;