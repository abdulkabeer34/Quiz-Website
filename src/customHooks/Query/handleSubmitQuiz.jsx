import React from 'react'
import {useQuery,useMutation} from "@tanstack/react-query";
import { HandleSubmit } from '../../Apis';

export const useHandleSubmitQuizQuery = () => {
   const mutation = useMutation({
    mutationFn:(data)=>HandleSubmit(data),
    queryKey:["handleSubmit"]
   })

   return {mutation};
}
