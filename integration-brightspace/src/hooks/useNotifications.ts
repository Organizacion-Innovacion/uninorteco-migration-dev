/* eslint-disable no-self-compare */
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Course } from "../interfaces/Course";
import { Notification } from "../interfaces/Alert";

const URL_ALERTS =
  "https://uninortetest.brightspace.com/d2l/api/lp/1.35/alerts/user/46003";
const URL_COURSE = "https://uninortetest.brightspace.com/d2l/api/lp/1.35/courses/81269";

export function useNotifications(token: string) {
  const commonHeaders = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: URL_ALERTS,
    headers: commonHeaders,
  };

  const configCourse = {
    method: "get",
    maxBodyLength: Infinity,
    url: URL_COURSE,
    headers: commonHeaders,
  };
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [course, setCourse] = useState<Course | undefined>(undefined);
  const hasFetchedCourse = useRef(false);

  useEffect(() => {
    if (!token) {
      return; // Si el token es null o no está definido, no hagas la llamada a la API
    }
    setLoading(true);
    axios(config)
      .then((response) => {
        setNotifications(response.data.Objects);
        setLoading(false);
        console.log("response: ", response.data.Objects);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  }, [token]);

  useEffect(() => {
    if (notifications.length > 0 && !hasFetchedCourse.current) {
      axios(configCourse)
        .then((response) => {
          setCourse(response.data);
          setLoading(false);

          const newNotifications = notifications.map((notification: Notification) => ({
            ...notification,
            Course: response.data,
          }));

          setNotifications(newNotifications);
          hasFetchedCourse.current = true;
        })
        .catch((err) => {
          console.log(err);
          setError(true);
          setLoading(false);
        });
    }
  }, [notifications]);

  return { notifications, loading, error };
}
