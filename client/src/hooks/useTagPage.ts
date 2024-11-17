import { useEffect, useState } from "react";
import { getTagsWithQuestionNumber } from "../services/tagService";
import { TagResponseType } from "../types/entityTypes";

export const useTagPage = () => {
  const [tlist, setTlist] = useState<TagResponseType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getTagsWithQuestionNumber();
        setTlist(res || []);
      } catch (e) {
        console.error("Error fetching tags:", e);
      }
    };

    fetchData();
  }, []);

  return { tlist };
};
