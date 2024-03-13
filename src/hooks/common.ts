import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { TAppDispatch, TRootState } from "../store";

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
export const useAppDispatch = () => useDispatch<TAppDispatch>();
