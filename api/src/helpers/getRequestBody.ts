import { InvalidBodyError } from "../types";
import { Env } from "../../functions/courses/importation";

export const getRequestBody = <T>(
  context: EventContext<Env, any, Record<string, unknown>>
) => {
  try {
    return context.request.json<T>();
  } catch {
    throw new InvalidBodyError();
  }
};
