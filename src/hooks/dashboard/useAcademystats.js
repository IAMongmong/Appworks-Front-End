import useSWRFetch from "../useSWRFetch";

const get_sum = (My_Class, data) => {
    let sum = 0
    for (const apt_name of My_Class) {
        sum += parseInt(data[apt_name]);
    }
    return parseInt(sum);
}



const useAcademystats = () => {
  const { data } = useSWRFetch("https://api.projectszero.tech/getAcademyStats");

  let Merged = {}
  const depart_creativity = ["創新領域學士學位學程"];
  if (data) {
    Merged["創新學院"] = parseInt(get_sum(depart_creativity, data));
  }
  const depart_science = ["心理所一般組", "數學系", "物理學系", "心理學系"];
  if (data) {
    Merged["理學院"] = parseInt(get_sum(depart_science, data));
  }
  const depart_eecs = ["電機工程學系", "資訊工程學系", "資訊工程研究所"];
  if (data) {
    Merged["電資學院"] = parseInt(get_sum(depart_eecs, data));
  }
  const depart_engine = ["生物機電工程學系", "材料科學與工程學系", "工程科學及海洋工程學系"];
  if (data) {
    Merged["工學院"] = parseInt(get_sum(depart_engine, data));
  }
  const depart_social = ["經濟學系", "經濟系", "科際整合法律學研究所"];
  if (data) {
    Merged["社會科學院"] = parseInt(get_sum(depart_social, data));
  }
  const depart_art = ["戲劇學系", "外國語文學系 / 圖書資訊學系", "歷史學系", "外國語文學系/社會學系"];
  if (data) {
    Merged["文學院"] = parseInt(get_sum(depart_art, data));
  }
  const depart_bio = ["物理治療學系", "醫學工程學系", "生醫電資所"];
  if (data) {
    Merged["生醫學院"] = parseInt(get_sum(depart_bio, data));
  }
  const depart_manage = ["工商管理學系 科技管理組", "工商管理學系", "會計學系", "國際企業學系", "資訊管理學系"];
  if (data) {
    Merged["管理學院"] = parseInt(get_sum(depart_manage, data));
  }
  let labels = data && Object.keys(Merged);
  let values = data && Object.values(Merged);
  return {
    labels, values
  };
};

export default useAcademystats;