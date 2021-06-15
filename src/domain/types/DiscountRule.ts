export default class DiscountRule {
    private readonly _value: number;
    private readonly _limitToTriggerDiscount: number;

    constructor(value: number, limitToTriggerDiscount: number) {
        this._value = value;
        this._limitToTriggerDiscount = limitToTriggerDiscount;
    }

    get value(): number {
        return this._value;
    }

    get limitToTriggerDiscount(): number {
        return this._limitToTriggerDiscount;
    }
}