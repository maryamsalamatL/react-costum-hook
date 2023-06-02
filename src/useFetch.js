// import { useState, useEffect } from "react";
// import axios from "axios";

// const useFetch = (url) => {
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   useEffect(() => {
//     setLoading(true);
//     setData(null);
//     setError(null);
//     axios
//       .get(url)
//       .then((res) => {
//         setLoading(false);
//         setData(res.data);
//       })
//       .catch((err) => {
//         setLoading(false);
//         setError(err.message);
//       });
//   }, [url]);
//   return { loading, data, error };
// };
// export default useFetch;

import { useReducer, useEffect } from "react";
import axios from "axios";

const initialValues = {
  loading: false,
  data: null,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.fetchRequest: {
      return { ...state, loading: true, data: null, error: null };
    }
    case actions.fetchSuccess: {
      return { ...state, loading: false, data: action.payload, error: null };
    }
    case actions.fetchFailure: {
      return { ...state, loading: false, data: null, error: action.payload };
    }
    default:
      return state;
  }
};

const actions = {
  fetchRequest: "FETCH_DATA_REQUEST",
  fetchSuccess: "FETCH_DATA_SUCCESS",
  fetchFailure: "FETCH_DATA_FAILURE",
};

const useFetch = (url) => {
  const [state, dispatch] = useReducer(reducer, initialValues);

  useEffect(() => {
    dispatch({ type: actions.fetchRequest });
    axios
      .get(url)
      .then((res) => {
        dispatch({ type: actions.fetchSuccess, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: actions.fetchFailure, payload: err.message });
      });
  }, [url]);
  return state;
};
export default useFetch;
