export namespace StoryRoutingConstants {
  export const MAIN_ROUTE = 'stories';

  export function getFullLink(route: StoryRoutingConstants): string {
    return `/${MAIN_ROUTE}/${route}`;
  }

  export function getStoryLink(id: number): string {
    return `/${getFullLink(StoryRoutingConstants.Story)}/${id}`;
  }
}

export enum StoryRoutingConstants {
  Story = 'story',
  List = 'list',
}
