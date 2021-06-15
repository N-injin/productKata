export default interface IDateService {
    dateMinusMonths(monthsToSubtract: number): Date;

    dateMinusYears(yearsToSubtract: number): Date;
}
