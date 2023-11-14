import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
  Store,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { createReducerManager } from './reducerManager';
import { rtkApi } from '@/shared/api/rtkApi';
import { OptionalRecord } from '@/app/types/global';
import { DarkModeSchema } from '@/entities/DarkMode';
import { SessionSchema } from '@/entities/Session';

export interface StateSchema {
  darkMode: DarkModeSchema;
  session: SessionSchema;
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;
export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
  getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: StateSchema;
}

export type TStore = {
  reducerManager: ReturnType<typeof createReducerManager>;
} & Store;
