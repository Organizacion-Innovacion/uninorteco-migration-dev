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
      "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjgwMDdjYzEwLWM5YjAtNDViOC1hZGEyLWJhYzRkNzhmZjM1OSIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2OTQxMDIzMDksImV4cCI6MTY5NDEwNTkwOSwiaXNzIjoiaHR0cHM6Ly9hcGkuYnJpZ2h0c3BhY2UuY29tL2F1dGgiLCJhdWQiOiJodHRwczovL2FwaS5icmlnaHRzcGFjZS5jb20vYXV0aC90b2tlbiIsInN1YiI6IjQ2MDAzIiwidGVuYW50aWQiOiJkYjM0ODZkNS1jNjk2LTQ1YTQtYTQ2ZC1lNWE2MmM5ODAzNjgiLCJhenAiOiIzZjIwNjBkNi02YTliLTQ4ZWUtOTYzNi1lNmNiNjhiZTNjMzYiLCJzY29wZSI6ImFsZXJ0czphbGVydHM6cmVhZCBncmFkZXM6Z3JhZGVzZXR0aW5nczpyZWFkIG9yZ2FuaXphdGlvbnM6b3JnYW5pemF0aW9uOnJlYWQgb3JndW5pdHM6Y291cnNlOnJlYWQgdXNlcnM6b3duX3Byb2ZpbGU6cmVhZCB1c2Vyczpwcm9maWxlOnJlYWQgdXNlcnM6dXNlcmRhdGE6cmVhZCIsImp0aSI6ImI4ZTEyMjNmLWU5MzAtNDEzYy1iMGJjLTA0ZjJjYTc5NGRmMCJ9.VTxm1_vKZsLp6PQn9E1zmX-5fisTLCdzb1vfXadc_thcbH0_eKTbZwWI9SXPMZqy5RL2GqCp3ofnwDqgHuBOXadJnIPkXj_VpgQn6y9eAC92G4SSxpf8gIk63_eKJHAqPR_V3z4HJql-StRTGTUfFV1M1cSUrc40JcnvLTllNOXuRSNBijtN0tt3NIFNgtpS75CZDFov4xFIY162g11Vhv4XsNL9bWGK4RWbDa4U9-tNPhs73mRVAuciohlvZ6Y6EcU7mIY08zk_C2bf_EZYeJ1ffmgt6i-m8EktLMZrI5YLEtFwWVSpmk64j9kHIwF9y8umQjgh2o78kqJK2VuaEA",
  },
};

const config = {
  method: "get",
  maxBodyLength: Infinity,
  url: URL_ALERTS,
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjgwMDdjYzEwLWM5YjAtNDViOC1hZGEyLWJhYzRkNzhmZjM1OSIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2OTQxMDIzMDksImV4cCI6MTY5NDEwNTkwOSwiaXNzIjoiaHR0cHM6Ly9hcGkuYnJpZ2h0c3BhY2UuY29tL2F1dGgiLCJhdWQiOiJodHRwczovL2FwaS5icmlnaHRzcGFjZS5jb20vYXV0aC90b2tlbiIsInN1YiI6IjQ2MDAzIiwidGVuYW50aWQiOiJkYjM0ODZkNS1jNjk2LTQ1YTQtYTQ2ZC1lNWE2MmM5ODAzNjgiLCJhenAiOiIzZjIwNjBkNi02YTliLTQ4ZWUtOTYzNi1lNmNiNjhiZTNjMzYiLCJzY29wZSI6ImFsZXJ0czphbGVydHM6cmVhZCBncmFkZXM6Z3JhZGVzZXR0aW5nczpyZWFkIG9yZ2FuaXphdGlvbnM6b3JnYW5pemF0aW9uOnJlYWQgb3JndW5pdHM6Y291cnNlOnJlYWQgdXNlcnM6b3duX3Byb2ZpbGU6cmVhZCB1c2Vyczpwcm9maWxlOnJlYWQgdXNlcnM6dXNlcmRhdGE6cmVhZCIsImp0aSI6ImI4ZTEyMjNmLWU5MzAtNDEzYy1iMGJjLTA0ZjJjYTc5NGRmMCJ9.VTxm1_vKZsLp6PQn9E1zmX-5fisTLCdzb1vfXadc_thcbH0_eKTbZwWI9SXPMZqy5RL2GqCp3ofnwDqgHuBOXadJnIPkXj_VpgQn6y9eAC92G4SSxpf8gIk63_eKJHAqPR_V3z4HJql-StRTGTUfFV1M1cSUrc40JcnvLTllNOXuRSNBijtN0tt3NIFNgtpS75CZDFov4xFIY162g11Vhv4XsNL9bWGK4RWbDa4U9-tNPhs73mRVAuciohlvZ6Y6EcU7mIY08zk_C2bf_EZYeJ1ffmgt6i-m8EktLMZrI5YLEtFwWVSpmk64j9kHIwF9y8umQjgh2o78kqJK2VuaEA",
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
