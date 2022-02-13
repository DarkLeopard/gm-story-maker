import {isPlatformBrowser} from '@angular/common';
import {
  FactoryProvider,
  InjectionToken,
  Injector,
  PLATFORM_ID,
} from '@angular/core';

function windowFactory(injector: Injector): Window {
  const platformId = injector.get<InjectionToken<object>>(PLATFORM_ID);

  return isPlatformBrowser(platformId)
    ? // eslint-disable-next-line no-restricted-globals
    window
    : // TODO: Добавить типизацию
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ({} as any);
}

export const WINDOW = new InjectionToken<Window>('Window');

export const WINDOW_PROVIDER: FactoryProvider = {
  provide: WINDOW,
  deps: [Injector],
  useFactory: windowFactory,
};
