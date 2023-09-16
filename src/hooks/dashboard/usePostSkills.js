import axios from "axios";
import { useCookies } from "react-cookie";

const usePostSkills = () => {
  const [, setCookie] = useCookies(["student_id"]);
  return async (student_id, skills) => {
    try {
      await axios.post(`https://api.projectszero.tech/skills/${student_id}`, {
        "UIUX": skills["UIUX"],
        "backend": skills["backend"],
        "business analysis": skills["business analysis"],
        "design thinking": skills["design thinking"],
        "frontend": skills["frontend"],
      });
      setCookie("student_id", student_id);
      alert("送出成功");
      console.log(student_id)
      console.log(skills);
    } catch (error) {
      alert(error);
    }
  };
};

export default usePostSkills;
