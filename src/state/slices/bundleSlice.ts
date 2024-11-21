import { createSlice } from "@reduxjs/toolkit";
import { BundleStartAction, BundleCompleteAction } from "../actions";

interface BundleState {
    [key: string]:
        | {
              loading: boolean;
              code: string;
              err: string;
          }
        | undefined;
}

const initialState: BundleState = {};

const bundleSlice = createSlice({
    name: "bundle",
    initialState,
    reducers: {
        bundleStart: (state: BundleState, action: BundleStartAction) => {
            state[action.payload.cellId] = {
                loading: true,
                code: "",
                err: "",
            };
        },
        bundleComplete: (state: BundleState, action: BundleCompleteAction) => {
            state[action.payload.cellId] = {
                loading: false,
                code: action.payload.bundle.code,
                err: action.payload.bundle.err,
            };
        },
    },
});

export default bundleSlice;
