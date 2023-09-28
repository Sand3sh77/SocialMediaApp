import axios from "axios";
import { useQuery } from "react-query";


export default function usePosts(userId:number){
    return useQuery(['posts',userId], ()=>{
         return axios.get(
            `http://localhost/social/api/functions/posts?id=${userId}`
        )
    } );

}

