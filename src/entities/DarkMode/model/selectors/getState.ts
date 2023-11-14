import { StateSchema } from "@/app/providers/StorProvider";

export const getMode = (state: StateSchema) => state.darkMode.isDark;