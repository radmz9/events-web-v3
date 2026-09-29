import { AttendaceTable } from "./student/AttendanceTable"
import { Student } from "./student/Student"

export const DetailsPage = () => {
    return(
        <div>
            <Student />
            <AttendaceTable />
        </div>
    )
}