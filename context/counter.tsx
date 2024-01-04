"use client";

import React, { Dispatch, createContext, useReducer } from "react";

import { StateType, ActionType } from "../types";

const initialState: StateType = {
  page: 1,
};

const reducer = (state: StateType, action: ActionType) => {
  console.log("state", state, "action", action);
  switch (action.type) {
    case "INCREMENT":
      return { ...state, page: state.page + 1 };
    case "RESET":
      return { ...state, page: 1 };
    default:
      return state;
  }
};

export const CounterContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

export const CounterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
};
