"use client";

import { Store } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

export default function StoreProvider({
  children,
  store,
}: {
  children: React.ReactNode;
  store: Store;
}) {
  return <Provider store={store}>{children}</Provider>;
}
