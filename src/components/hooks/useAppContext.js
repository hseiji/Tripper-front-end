import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./useAppReducer";
import Axios from "axios";

const initialState = {
  //Load events where user_id = 1 and plans[0] (initial)
  events: [],
  results: [],
  location: "",
  keyword: "",
  //Load plans where user_id = 1
  plans: [
    {
      id: 1,
      name: "Day in Toronto",
      user_id: 1,
    },
    {
      id: 2,
      name: "Fun Weekend",
      user_id: 1,
    },
  ],
  selectedPlan: 1,
  showRoutes: false,
  user: { name: "User", id: 1 },
};

export const AppContext = createContext(initialState);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    
    let email = "shakespeare@lighthouse.com";
    let password = "password";
    
    login(email,password);
    
  }, []);

  const login = (email, password) => {
    let user = { email, password };
    Axios.post("/api/users/login", { user }).then((res) => {
      dispatch({
        type: "SET_USER",
        payload: {
          user: { name: res.data.user[0].name, id: res.data.user[0].id },
        },
      });

      Axios.get(`/api/users/plans/user/${res.data.user[0].id}`).then((res) => {
        if (res.data.plan) {
          dispatch({
            type: "SET_PLANS",
            payload: {
              plans: res.data.plan,
            },
          });

          Axios.get(`/api/users/plans/${res.data.plan[0].id}`).then((res) => {
            dispatch({
              type: "SET_EVENTS",
              payload: {
                events: res.data.event,
              },
            });
          });
        }
      });
    });
  };

  const addPlan = (planName) => {
    const info = { userId: state.user.id, planName: planName };
    Axios.put("/api/users/plans", { info }).then((res) => {
      Axios.get(`/api/users/plans/user/${state.user.id}`).then((res) => {
        if (res.data.plan) {
          dispatch({
            type: "SET_PLANS",
            payload: {
              plans: res.data.plan,
            },
          });

          Axios.get(`/api/users/plans/${res.data.plan[0].id}`).then((res) => {
            dispatch({
              type: "SET_EVENTS",
              payload: {
                events: res.data.event,
              },
            });
          });
        }
      });
    });
  };

  const changePlan = (planId) => {
    Axios.get(`/api/users/plans/${planId}`).then((res) => {
      dispatch({
        type: "CHANGE_PLAN",
        payload: {
          events: res.data.event,
          selectedPlan: planId,
        },
      });
    });
  };

  const addToMap = (event) => {
    const updatedMap = state.events.concat(event);

    const updatedResults = state.results.filter((res) => event.id !== res.id);

    // console.log("updatedResults", updatedResults);

    const selectedPlan = state.selectedPlan;

    console.log("EVENT ADDED: ", event);

    Axios.put(`/api/users/plans/${selectedPlan}`, { event }).then((res) => {
      console.log(res);
    });

    dispatch({
      type: "ADD_TO_MAP",
      payload: {
        events: updatedMap,
        results: updatedResults,
      },
    });
  };

  const deleteFromMap = (id) => {
    const updatedMap = state.events.filter((el) => el.id !== id);
    console.log("deleteFromMap: ", updatedMap);
    console.log("id of deleted", id);

    Axios.delete(`/api/users/events/${id}`).then(() => {
      console.log("Cancelled.");
    });

    dispatch({
      type: "DELETE_FROM_MAP",
      payload: {
        events: updatedMap,
      },
    });
  };

  const setResults = (data) => {
    // console.log("addResults AppProvider: ", data);

    dispatch({
      type: "SET_RESULTS",
      payload: {
        results: data,
      },
    });
  };

  const changeIconColor = (id) => {
    const index = state.events.findIndex((ele) => ele.id === id);
    //Mark as done/undone
    state.events[index].done = !state.events[index].done;

    Axios.put(`/api/users/events/done/${id}`).then(() => {
      console.log("Marked as done!");
    });

    dispatch({
      type: "UPDATE_ICON_COLOR",
      payload: {
        events: state.events,
      },
    });
  };

  const onOffRoutes = () => {
    //Turn on/off routes available
    state.showRoutes = !state.showRoutes;

    dispatch({
      type: "ROUTES_SWITCH",
      payload: {
        events: state.showRoutes,
      },
    });
  };

  const setLocation = (data) => {
    state.location = data;
    dispatch({
      type: "SET_LOCATION",
      payload: {
        location: state.location,
      },
    });    
  }

  const setKeyword = (data) => {
    state.keyword = data;
    dispatch({
      type: "SET_KEYWORD",
      payload: {
        keyword: state.keyword,
      },
    });    
  }  

  const value = {
    events: state.events,
    login,
    user: state.user,
    addPlan,
    changePlan,
    addToMap,
    deleteFromMap,
    results: state.results,
    setResults,
    changeIconColor,
    plans: state.plans,
    showRoutes: state.showRoutes,
    onOffRoutes,
    location: state.location,
    setLocation,
    keyword: state.keyword,
    setKeyword,
    selectedPlan: state.selectedPlan,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
