/* eslint-disable no-self-compare */
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Course } from "../interfaces/Course";
import { Notification } from "../interfaces/Alert";

const URL_ALERTS =
  "https://uninortetest.brightspace.com/d2l/api/lp/1.35/alerts/user/46003";
const URL_COURSE = "https://uninortetest.brightspace.com/d2l/api/lp/1.35/courses/81269";
const configCourse = {
  method: "get",
  maxBodyLength: Infinity,
  url: URL_COURSE,
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjgwMDdjYzEwLWM5YjAtNDViOC1hZGEyLWJhYzRkNzhmZjM1OSIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2OTQyMDYyNTIsImV4cCI6MTY5NDIwOTg1MiwiaXNzIjoiaHR0cHM6Ly9hcGkuYnJpZ2h0c3BhY2UuY29tL2F1dGgiLCJhdWQiOiJodHRwczovL2FwaS5icmlnaHRzcGFjZS5jb20vYXV0aC90b2tlbiIsInN1YiI6IjQ2MDAzIiwidGVuYW50aWQiOiJkYjM0ODZkNS1jNjk2LTQ1YTQtYTQ2ZC1lNWE2MmM5ODAzNjgiLCJhenAiOiIzZjIwNjBkNi02YTliLTQ4ZWUtOTYzNi1lNmNiNjhiZTNjMzYiLCJzY29wZSI6ImFsZXJ0czphbGVydHM6cmVhZCBncmFkZXM6Z3JhZGVzZXR0aW5nczpyZWFkIG9yZ2FuaXphdGlvbnM6b3JnYW5pemF0aW9uOnJlYWQgb3JndW5pdHM6Y291cnNlOnJlYWQgdXNlcnM6b3duX3Byb2ZpbGU6cmVhZCB1c2Vyczpwcm9maWxlOnJlYWQgdXNlcnM6dXNlcmRhdGE6cmVhZCIsImp0aSI6IjRlYTU4ZDkyLTBhMDUtNGRmYy1hMjYxLWZmZjc5M2Q0MGM0ZiJ9.DvyXwMavXD-w6aOQF6Of_Ur-Mcf6QNDSqykLamqYqposnHhnaJ3sgr5n9QFeJVCQz8XgvsA-IX-PmpabewLAiimEdu0hLW6jDpneSaMJmDJH4slW6KUBkxcirXVCRV1eC3HzWNMXQ_ZEwQynYd9F_ozMYkLtjJ6o-ZZ-EONqDCMeBZFY1NNzadp5totac_1MWVRv6izOq8gRxKfAqLuAaYBqPcDzzSgN-u2EFdsKp8qLDzG2gEKXb4uD9_7zVC_IJ4lsJS3Mb-iLGKQiXC0ezWPRiyZmmUcFS6dV-xHHt70F2zN1_lNEtxVkBh9OqmPkmI-D2f1qxyxko0YB9qgeCw",
  },
};

const config = {
  method: "get",
  maxBodyLength: Infinity,
  url: URL_ALERTS,
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjgwMDdjYzEwLWM5YjAtNDViOC1hZGEyLWJhYzRkNzhmZjM1OSIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2OTQyMDYyNTIsImV4cCI6MTY5NDIwOTg1MiwiaXNzIjoiaHR0cHM6Ly9hcGkuYnJpZ2h0c3BhY2UuY29tL2F1dGgiLCJhdWQiOiJodHRwczovL2FwaS5icmlnaHRzcGFjZS5jb20vYXV0aC90b2tlbiIsInN1YiI6IjQ2MDAzIiwidGVuYW50aWQiOiJkYjM0ODZkNS1jNjk2LTQ1YTQtYTQ2ZC1lNWE2MmM5ODAzNjgiLCJhenAiOiIzZjIwNjBkNi02YTliLTQ4ZWUtOTYzNi1lNmNiNjhiZTNjMzYiLCJzY29wZSI6ImFsZXJ0czphbGVydHM6cmVhZCBncmFkZXM6Z3JhZGVzZXR0aW5nczpyZWFkIG9yZ2FuaXphdGlvbnM6b3JnYW5pemF0aW9uOnJlYWQgb3JndW5pdHM6Y291cnNlOnJlYWQgdXNlcnM6b3duX3Byb2ZpbGU6cmVhZCB1c2Vyczpwcm9maWxlOnJlYWQgdXNlcnM6dXNlcmRhdGE6cmVhZCIsImp0aSI6IjRlYTU4ZDkyLTBhMDUtNGRmYy1hMjYxLWZmZjc5M2Q0MGM0ZiJ9.DvyXwMavXD-w6aOQF6Of_Ur-Mcf6QNDSqykLamqYqposnHhnaJ3sgr5n9QFeJVCQz8XgvsA-IX-PmpabewLAiimEdu0hLW6jDpneSaMJmDJH4slW6KUBkxcirXVCRV1eC3HzWNMXQ_ZEwQynYd9F_ozMYkLtjJ6o-ZZ-EONqDCMeBZFY1NNzadp5totac_1MWVRv6izOq8gRxKfAqLuAaYBqPcDzzSgN-u2EFdsKp8qLDzG2gEKXb4uD9_7zVC_IJ4lsJS3Mb-iLGKQiXC0ezWPRiyZmmUcFS6dV-xHHt70F2zN1_lNEtxVkBh9OqmPkmI-D2f1qxyxko0YB9qgeCw",
  },
};

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [course, setCourse] = useState<Course | undefined>(undefined);
  const hasFetchedCourse = useRef(false);

  useEffect(() => {
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
  }, []);

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
