import type { ExternalTypes } from "./externals.types";
import type { InternalTypes } from "./internals.types";
import type { StatsAttendance } from "./stats.types";

export interface Attendance {
    stats: StatsAttendance,
    internals: InternalTypes[],
    externals: ExternalTypes[]
}