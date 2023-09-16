import axios from "axios";

async function useSkills(student_id) {
  try {
    const response = await axios.get(`https://api.projectszero.tech/skills/${student_id}`);
    const data = response.data;
    console.log(student_id);
    console.log("haha", data);
    return Object.values(data);
  } catch (error) {
    console.error('An error occurred while fetching skills data:', error);
    throw error;
  }
}

export default useSkills;
