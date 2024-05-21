import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPastQuizHistory, updatePastQuizHistory } from "../../Apis";


export const useQuizHistory = (shouldInvalidateQueries,token) => {

  const queryClient = useQueryClient();


  const queryData = useQuery({
    queryKey: ["getQuizPastHistory"],
    queryFn:()=> getPastQuizHistory(token),
  })

  const mutation = useMutation({
    mutationFn: updatePastQuizHistory,
    
    onSuccess: () => {
    shouldInvalidateQueries &&   queryClient.invalidateQueries("getQuizPastHistory");
    }
  });

  return { queryData ,mutation};
};
