import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  UpdateNotification,
  getNotifications,
  sendNotifications,
  sendNotificationsAll,
} from "../../Apis/notificationApis";

export const useQuizNotification = ( token) => {
  const queryClient = useQueryClient();

  const queryData = useQuery({
    queryKey: ["notificationsHistory"],
    queryFn: () => getNotifications(token),
  });

  const updateNotificationMutation = useMutation({
    mutationFn: (data) => UpdateNotification(token, data),
    onSuccess: () => queryClient.invalidateQueries(),
  });


  const sendNotificationMutation = useMutation({
    mutationFn: (data) => sendNotifications(data),
    queryKey: ["sendNotifications"],

  })


  const sendNotificationsAllMutation = useMutation({
    mutationFn:sendNotificationsAll,
  })

  return { queryData, updateNotificationMutation,sendNotificationMutation ,sendNotificationsAllMutation}; 
};
