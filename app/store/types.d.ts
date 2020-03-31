declare module 'RootTypes' {
  import { StateType } from 'typesafe-actions';

  export type RootState = StateType<
    ReturnType<typeof import('./reducers').default>
  >;
}
