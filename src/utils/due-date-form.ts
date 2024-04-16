import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { DEFAULT_DATE_FIELD_FORMAT } from "constants/date";

dayjs.extend(utc);
dayjs.extend(timezone);

const DEFAULT_OFFSET_IN_MINS = 7 * 60;
const DEFAULT_TIME_STRING = "23:59:59";
const DEFAULT_TIME_FORMAT = "HH:mm:ss";

export const getDateTime = (dateOnly: string): Date => {
  return dayjs(
    `${dateOnly} ${DEFAULT_TIME_STRING}`,
    `${DEFAULT_DATE_FIELD_FORMAT} ${DEFAULT_TIME_FORMAT}`
  )
    .utcOffset(DEFAULT_OFFSET_IN_MINS)
    .toDate();
};

export const getInitialDueDate = (): Date => {
  const dateString = dayjs().add(7, "day").format(DEFAULT_DATE_FIELD_FORMAT);
  const initialDueDate = getDateTime(dateString);
  return initialDueDate;
};
export const getDateFieldValue = (dueDate: Date) => {
  return dayjs(dueDate).format(DEFAULT_DATE_FIELD_FORMAT);
};
