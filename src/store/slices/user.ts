import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

// Define a type for the slice state
interface UserState {
	email: string | null
}

// Define the initial state using that type
const initialState: UserState = {
	email: null,
}

export const userSlice = createSlice({
	name: "user",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<string>) => {
			state.email = action.payload
		},
	},
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
