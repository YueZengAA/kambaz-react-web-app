import { createSlice } from "@reduxjs/toolkit";
import * as db from "../Database";

export interface User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  role: string;
  loginId: string;
  section: string;
  lastActivity: string;
  totalActivity: string;
}

export interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface AccountState {
  currentUser: User | null;
  enrollments: Enrollment[];
}


const initialState: AccountState = {
  currentUser: null,
  enrollments: db.enrollments,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    toggleEnrollment: (state, action) => {
      const { userId, courseId } = action.payload;
      const index = state.enrollments.findIndex(
        (e) => e.user === userId && e.course === courseId
      );

      if (index !== -1) {
        // Unenroll
        state.enrollments.splice(index, 1);
      } else {
        // Enroll
        const newId = (
          Math.max(0, ...state.enrollments.map((e) => parseInt(e._id))) + 1
        ).toString();
        state.enrollments.push({ _id: newId, user: userId, course: courseId });
      }
    },
  },
});

export const { setCurrentUser, toggleEnrollment } = accountSlice.actions;
export default accountSlice.reducer;