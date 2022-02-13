export namespace ChapterRoutingConstants {
  export const MAIN_ROUTE = 'chapters';

  export function getFullLink(route: ChapterRoutingConstants): string {
    return `/${MAIN_ROUTE}/${route}`;
  }

  export function getChapterLink(id: number): string {
    return `/${getFullLink(ChapterRoutingConstants.Chapter)}/${id}`;
  }
}

export enum ChapterRoutingConstants {
  Chapter = 'chapter',
  List = 'list',
}
