// src/utils/trpc.ts

import { createReactQueryHooks } from "@trpc/react";

// @ts-ignore
export const trpc = createReactQueryHooks<AppRouter>();
