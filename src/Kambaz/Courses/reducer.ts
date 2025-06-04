import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import * as db from "../Database";

const initialState = {
    courses: db.courses as {
      _id: string;
      name: string;
      number: string;
      startDate: string;
      endDate: string;
      department: string;
      credits: number;
      description: string;
      creator?: string;
    }[],
    course: {
      _id: uuidv4(),
      name: "New Course",
      number: "NEW0000",
      startDate: "2025-09-01",
      endDate: "2025-12-15",
      department: "D000",
      credits: 3,
      description: "New course description",
      creator: ""
    },
  };
  

const courseSlice = createSlice({
  name: "courseReducer",
  initialState,
  reducers: {
    setCourse(state, action) {
      state.course = action.payload;
    },
    addCourse(state, action) {
      const newCourse = {
        ...action.payload,
        _id: uuidv4(),
      };
      state.courses.push(newCourse);
    },
    updateCourse(state, action) {
      const updated = action.payload;
      state.courses = state.courses.map((c) =>
        c._id === updated._id ? updated : c
      );
    },
    deleteCourse(state, action) {
      const courseId = action.payload;
      state.courses = state.courses.filter((c) => c._id !== courseId);
    },
  },
});

export const { setCourse, addCourse, updateCourse, deleteCourse } = courseSlice.actions;
export default courseSlice.reducer;
