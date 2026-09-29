import { EventAttendance } from "./EventAttendance"
import { EventInfo } from "./EventInfo"

export const EventView = () => {
    return(
        <div className="max-w-7xl mx-auto space-y-8">
            <EventInfo />
            <EventAttendance />
        </div>
    )
}