import axios from "axios";
import { useQuery } from "react-query";
import Api from "../api/Api";

export default function usePosts(
  userId: number,
  calledFrom: string,
  paramsId: number
) {
  return useQuery(["posts", userId, calledFrom], () => {
    return axios.post(
      `${Api}api/functions/posts/posts`,
      {
        id: userId,
        location: calledFrom,
        paramsId: paramsId,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      }
    );
  });
}
