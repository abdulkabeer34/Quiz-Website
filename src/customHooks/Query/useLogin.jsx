import { useQuery, useMutation } from "@tanstack/react-query";
import { getLogins, verifyData } from "../../Apis";

export const useLoginQuery = (onSuccess) => {
  const { signup ,login} = verifyData();

  const loginData = useQuery({
    queryKey: ["loginData"],
    queryFn: getLogins,
    onSuccess:()=>onSuccess && onSuccess,
  });

  const singupMuation = useMutation({ queryKey: ["logindata"], queryFn: signup });
  const loginMutation = useMutation({ queryKey: ["logindata"], queryFn: login });

  return { loginData, singupMuation, loginMutation};
};
