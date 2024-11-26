import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { actionCreators } from "../state";

export const useActions = () => {
    const dispatch = useDispatch();

    return useMemo(() => {
        return bindActionCreators(actionCreators, dispatch);
    }, [dispatch]);
};
