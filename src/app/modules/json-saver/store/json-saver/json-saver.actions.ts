export namespace JsonSaverActions {
  const ACTION_NAME: string = '[JsonSaver]';

  export class Load {
    public static readonly type = `${ACTION_NAME} Load data from json.`;

    constructor(
      public file: File,
    ) { }
  }

  export class Save {
    public static readonly type = `${ACTION_NAME} Save data to json.`;
  }
}
