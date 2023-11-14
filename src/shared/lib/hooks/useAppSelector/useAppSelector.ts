import { StateSchema } from '@/app/providers/StorProvider';
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector;
