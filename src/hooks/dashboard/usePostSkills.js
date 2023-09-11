import axios from "axios";
import { useCookies } from "react-cookie";

const usePostSkills = () => {
  const [, setCookie] = useCookies(["student_id"]);
  return async (student_id, skills) => {
    try {
      await axios.post(`https://api.projectszero.tech/skills/${student_id}`, {
        skill: skills,
          "UIUX": 6,
          "backend": 7,
          "business analysis": 9,
          "design thinking": 5,
          "frontend": 8
      });
      setCookie("student_id", student_id);
      alert("送出成功");
    } catch (error) {
      alert(error);
    }
  };
};

export default usePostSkills;
