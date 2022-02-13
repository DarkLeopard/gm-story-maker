export namespace StoryRoutingConstants {
  export const MAIN_ROUTE = 'stories';

  export function getFullLink(route: StoryRoutingConstants): string {
    return `/${MAIN_ROUTE}/${route}`;
  }

  export function getStoryLink(id: number): string {
    return `/${getFullLink(StoryRoutingConstants.Story)}/${id}`;
  }

  export function getChapterLink(id: number): string {
    return `/${getFullLink(StoryRoutingConstants.Chapter)}/${id}`;
  }
}

export enum StoryRoutingConstants {
  Chapter = 'chapter',
  Story = 'story',
  List = 'list',
}
