import { useActionState as useActionStateReact } from "react";

export function useActionState<State, InitialState>(
  action: (state: Awaited<State>) => State | Promise<State>,
  initialState: InitialState,
  permalink?: string,
): [
  state: Awaited<State> | InitialState,
  dispatch: () => void,
  isPending: boolean,
];

export function useActionState<State, InitialState, Payload>(
  action: (state: Awaited<State>, payload: Payload) => State | Promise<State>,
  initialState: InitialState,
  permalink?: string,
): [
  state: Awaited<State> | InitialState,
  dispatch: (payload: Payload) => void,
  isPending: boolean,
];
export function useActionState(
  action: Parameters<typeof useActionStateReact>[0],
  initialState: Parameters<typeof useActionStateReact>[1],
  permalink?: string,
) {
  return useActionStateReact(action, initialState, permalink);
}
