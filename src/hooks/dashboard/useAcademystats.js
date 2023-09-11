import useSWRFetch from "../useSWRFetch";

const get_sum = (departments, data) => {
    let sum = 0;
    for (const department of departments) {
      sum += parseInt(data[department]) || 0;
    }
    return sum;
  };
  
  const useAcademystats = () => {
    const { data } = useSWRFetch("https://api.projectszero.tech/getAcademyStats");
    // 在此添加其他學院
    const collegeDepartments = {
      "創新學院": ["創新領域學士學位學程"],
      "理學院": ["心理所一般組", "數學系", "物理學系", "心理學系"],
      "電資學院": ["電機工程學系", "資訊工程學系", "資訊工程研究所"],
      "工學院": ["生物機電工程學系", "材料科學與工程學系", "工程科學及海洋工程學系"],
      "社會科學院": ["經濟學系", "經濟系", "科際整合法律學研究所"],
      "文學院":["戲劇學系", "外國語文學系 / 圖書資訊學系", "歷史學系", "外國語文學系/社會學系"],
      "生醫學院":["物理治療學系", "醫學工程學系", "生醫電資所"],
      "管理學院":["工商管理學系 科技管理組", "工商管理學系", "會計學系", "國際企業學系", "資訊管理學系"]
    };
  
    const Merged = {};
  
    if (data) {
      for (const college in collegeDepartments) {
        Merged[college] = parseInt(get_sum(collegeDepartments[college], data));
      }
    };
  
  let labels = data && Object.keys(Merged);
  let values = data && Object.values(Merged);
  return {
    labels, values
  };
};

export default useAcademystats;