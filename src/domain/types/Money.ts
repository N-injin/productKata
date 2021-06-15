export class Money {
    private readonly value: number;
    private readonly currency: string;


    constructor(value: number, currency: string) {
        this.value = value;
        this.currency = currency;
    }

    getValue(): number {
        return this.value;
    }

    getCurrency(): string {
        return this.currency;
    }

    add(other: Money): Money {
        if (other.getCurrency() !== this.getCurrency()) {
            throw new Error('Cannot add two different currencies');
        }

        return new Money(this.getValue() + other.getValue(), this.currency);
    }
}