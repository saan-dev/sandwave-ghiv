"use client";

import React, { Dispatch, createContext, useReducer } from "react";

import { CounterType, ActionType } from "../types";

const initialState: CounterType = {
  page: 1,
};

const reducer = (state: CounterType, action: ActionType) => {
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
  state: CounterType;
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
