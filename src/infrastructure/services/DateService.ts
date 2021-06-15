import IDateService from "./IDateService";

export default class DateService implements IDateService {
    dateMinusMonths(monthsToSubtract: number) {
        const currentDate = new Date();
        currentDate.setMonth(currentDate.getMonth() - monthsToSubtract);

        return currentDate;
    }

    dateMinusYears(yearsToSubtract: number) {
        const currentDate = new Date();
        currentDate.setFullYear(currentDate.getFullYear() - yearsToSubtract);

        return currentDate;
    }
}