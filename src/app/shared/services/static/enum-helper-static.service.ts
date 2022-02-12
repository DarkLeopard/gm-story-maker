export class EnumHelperStaticService {
  /** Get all enum keys */
  // @ts-ignore
  public static getAllEnumKeys<T>(_enum: any): T[] {
    return Object.keys(_enum)
      // @ts-ignore
      .map((key) => _enum[key])
      .filter((x) => typeof x === 'string');
  }

  /** Get all enum values. Use with number enums only.  */
  public static getAllEnumNum<T>(_enum: T): number[] {
    return EnumHelperStaticService.getAllEnumKeys(_enum).map(
      // @ts-ignore
      (key) => _enum[key] as unknown as number,
    );
  }
}
