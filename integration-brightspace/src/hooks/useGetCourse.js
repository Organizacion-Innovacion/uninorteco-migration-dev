import axios from "axios";
import { useEffect, useState } from "react";

const API = "https://uninortetest.brightspace.com/d2l/api/lp/1.35/courses/81269";
const config = {
  method: "get",
  maxBodyLength: Infinity,
  url: API,
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjgwMDdjYzEwLWM5YjAtNDViOC1hZGEyLWJhYzRkNzhmZjM1OSIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2OTQwMzA1MzQsImV4cCI6MTY5NDAzNDEzNCwiaXNzIjoiaHR0cHM6Ly9hcGkuYnJpZ2h0c3BhY2UuY29tL2F1dGgiLCJhdWQiOiJodHRwczovL2FwaS5icmlnaHRzcGFjZS5jb20vYXV0aC90b2tlbiIsInN1YiI6IjQ2MDAzIiwidGVuYW50aWQiOiJkYjM0ODZkNS1jNjk2LTQ1YTQtYTQ2ZC1lNWE2MmM5ODAzNjgiLCJhenAiOiIzZjIwNjBkNi02YTliLTQ4ZWUtOTYzNi1lNmNiNjhiZTNjMzYiLCJzY29wZSI6ImFsZXJ0czphbGVydHM6cmVhZCBncmFkZXM6Z3JhZGVzZXR0aW5nczpyZWFkIG9yZ2FuaXphdGlvbnM6b3JnYW5pemF0aW9uOnJlYWQgb3JndW5pdHM6Y291cnNlOnJlYWQgdXNlcnM6b3duX3Byb2ZpbGU6cmVhZCB1c2Vyczpwcm9maWxlOnJlYWQgdXNlcnM6dXNlcmRhdGE6cmVhZCIsImp0aSI6ImRiNGZkZTI4LTc3MGEtNDgyOC1hZGI2LTg5ODNjNzIzNzJiZCJ9.PLRvzy-0RlpMBaaWUL-xfBUybzxwGAWK0Q7DLZ2mL8SiB5Swgiap5Hot6v5A-l7_QZhCrke5sR2m15M7GEKewgAlbXiJhLVEEuWHKrg24mPuAC3FXBU-paiz0lkZcjfVoLT7G_WvVFg-E68ahqD-4fFzkPeQo2viOiqyJnRZ78EluQhVC1osDrfMjyYmOy98jMRuiHIsilzn5fNIhWECT_C26ZxRkrN2cOSJvliERiVlttgh0yqlL21ekpJpbIOwgZaFwcKgUhMnxLyYSeAvfsoAL-zcr-8PW4bo0XmRulSfJyRpsFravfnGVB1PpuMSKQeeavcf_AQrwWbV79N2ZQ",
  },
};

export function useGetCourse() {
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios(config)
      .then((response) => {
        setCourse(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  }, []);

  return { course, loading, error };
}

export default useGetCourse;
