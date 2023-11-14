import { AppDispatch } from '@/app/providers/StorProvider';
import { useDispatch } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
