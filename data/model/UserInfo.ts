import { z } from "zod";

export const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  id: z.string(),
  handle: z.string(),
  image: z.string(),
});

export type User = z.infer<typeof userSchema>;

export const userList = z.object({
  name: z.string(),
  email: z.string().email(),
  id: z.string(),
  handle: z.string(),
  image: z.string(),
});

export type UserList = z.infer<typeof userList>;
