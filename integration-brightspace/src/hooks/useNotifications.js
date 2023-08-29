import axios from "axios";
import { useEffect, useState } from "react";

const API = "https://uninortetest.brightspace.com/d2l/api/lp/1.35/alerts/user/46003";
const config = {
  method: "get",
  maxBodyLength: Infinity,
  url: "https://uninortetest.brightspace.com/d2l/api/lp/1.35/alerts/user/46003",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjgwMDdjYzEwLWM5YjAtNDViOC1hZGEyLWJhYzRkNzhmZjM1OSIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2OTMzNDg1NzEsImV4cCI6MTY5MzM1MjE3MSwiaXNzIjoiaHR0cHM6Ly9hcGkuYnJpZ2h0c3BhY2UuY29tL2F1dGgiLCJhdWQiOiJodHRwczovL2FwaS5icmlnaHRzcGFjZS5jb20vYXV0aC90b2tlbiIsInN1YiI6IjQ2MDAzIiwidGVuYW50aWQiOiJkYjM0ODZkNS1jNjk2LTQ1YTQtYTQ2ZC1lNWE2MmM5ODAzNjgiLCJhenAiOiIzZjIwNjBkNi02YTliLTQ4ZWUtOTYzNi1lNmNiNjhiZTNjMzYiLCJzY29wZSI6ImFsZXJ0czphbGVydHM6cmVhZCBncmFkZXM6Z3JhZGVzZXR0aW5nczpyZWFkIG9yZ2FuaXphdGlvbnM6b3JnYW5pemF0aW9uOnJlYWQgb3JndW5pdHM6Y291cnNlOnJlYWQgdXNlcnM6b3duX3Byb2ZpbGU6cmVhZCB1c2Vyczpwcm9maWxlOnJlYWQgdXNlcnM6dXNlcmRhdGE6cmVhZCIsImp0aSI6ImE1YjJlNDYzLTM2Y2YtNGUxYi1hNGJiLTBjMmM1ZjMxYjIzNiJ9.3U_WpBa6VNMFZB1JS5wpkchE7gz-rv9F9o3FpBmUUPPuwe5z010PQyR4He-YGhpt1FGIboQ5oKi8eqmdH-lVy2mDcs6Qwma1HIAGreITqT1G9bIyeEgi5zWJCNyrxgP1LPFFalBaMaUVm1qU_xQjDddan1hcxOJfrEP_urh1RyK5QNdw-pGfVinXLM3FxqhA_NbSssZrHihPbq3h3ntzkXLmikuiuXcI08XLefA_n7UE-bhW24W1tXpmTwiJi22vDqI3laczKB7x9f29XHmXb_1t_eNaUCPMtUi-n2Q4u3ukFd6-gqJeriI7oRvqbxkKL3nOH6jidFqSav95nGRjlw",
  },
};

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios(config)
      .then((response) => {
        setNotifications(response.data.Objects);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  }, []);

  return { notifications, loading, error };
}
