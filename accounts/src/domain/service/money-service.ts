export class MoneyService {
  public static toCents(amount: number) {
    return amount * 100;
  }

  public static toReal(amount: number) {
    return amount / 100;
  }
}
