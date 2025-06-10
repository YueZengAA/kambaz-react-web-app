import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ENROLLMENT_API = `${REMOTE_SERVER}/api/enrollments`;

export const enroll = async (userId: string, courseId: string) => {
  const response = await axios.post(ENROLLMENT_API, { user: userId, course: courseId });
  return response.data;
};

export const unenroll = async (enrollmentId: string) => {
  const response = await axios.delete(`${ENROLLMENT_API}/${enrollmentId}`);
  return response.data;
};

export const fetchEnrollments = async () => {
  const { data } = await axios.get(ENROLLMENT_API);
  return data;
};