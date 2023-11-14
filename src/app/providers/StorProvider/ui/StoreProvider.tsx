import {
  CombinedState,
  PreloadedState,
  ReducersMapObject,
} from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { NoInfer, Provider } from 'react-redux';
import { StateSchema } from '../config/StateSchema';
import { createReduxStore } from '../config/store';

export interface StoreProviderProps {
  children?: ReactNode;
  initialState?: PreloadedState<CombinedState<NoInfer<StateSchema>>>;
  asyncReducers?: ReducersMapObject<StateSchema>;
}
export const StoreProvider = (props: StoreProviderProps) => {
  const { children, initialState, asyncReducers } = props;
  const store = createReduxStore(initialState, asyncReducers);
  return <Provider store={store}>{children}</Provider>;
};
