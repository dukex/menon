import { Course } from "@/api";
import Header from "../Header";
import Lessons from "../Lessons";

export default function Imported({ course }: { course: Course }) {
  return (
    <>
      <Header course={course} />
      <Lessons course={course} />
    </>
  );
}
