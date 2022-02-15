import {NgxsDevtoolsOptions} from '@ngxs/devtools-plugin/src/symbols';
import {NgxsLoggerPluginOptions} from '@ngxs/logger-plugin/src/symbols';
import {NgxsConfig} from '@ngxs/store/src/symbols';
import {environment} from '../../environments/environment';
import {
  DatabaseStateModule,
  DatabaseStates,
} from './database';
import {
  EntitiesStateModule,
  EntitiesStates,
} from './models';

export const STATES_MODULES = [DatabaseStateModule, ...DatabaseStates, EntitiesStateModule, ...EntitiesStates];

export const OPTIONS_CONFIG: Partial<NgxsConfig> = {
  developmentMode: !environment.production,
};

export const DEVTOOLS_REDUX_CONFIG: NgxsDevtoolsOptions = {
  disabled: environment.production,
};

export const LOGGER_CONFIG: NgxsLoggerPluginOptions = {
  disabled: environment.production,
};
