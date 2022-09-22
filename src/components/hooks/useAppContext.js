import React, { createContext, useEffect, useReducer } from "react";
import AppReducer from "./useAppReducer";
import Axios from "axios";

const initialState = {
  //Load events where user_id = 1 and plans[0] (initial)
  events: [],
  results: [],
  location: "",
  keyword: "",
  plans: [],
  selectedPlan: 0,
  showRoutes: false,
  user: { 
      name: "Shakespeare", 
      id: 1,
      email: "shakespeare@lighthouse.com",
      password: "password",
      lat: "43.6532976025993",
      lng: "-79.38359538925825"
  },
};

export const AppContext = createContext(initialState);

export const AppProvider = ({ children }) => {

  const [state, dispatch] = useReducer(AppReducer, initialState);

  
  const loadPlans = async () => {

    // Set up plans and events
    // Axios.get(`/api/plans/${state.user.id}`)
    //   .then((res) => {
    //     dispatch({
    //       type: "SET_PLANS",
    //       payload: {
    //         plans: res.data.rows,
    //       },
    //     });
    //   })
    //   .then(() => {
    //     Axios.get(`/api/events/${state.selectedPlan}`)
    //     .then((res) => {
    //       dispatch({
    //         type: "SET_EVENTS",
    //         payload: {
    //           events: res.data.rows,
    //         },
    //       });
    //     })
    //   })

    const resPlan = await Axios.get(`/api/plans/${state.user.id}`);
    dispatch({
      type: "SET_PLANS",
      payload: {
        plans: resPlan.data.rows,
      },
    });

    console.log("respPlan:", resPlan.data.rows);
    const resEvent = await Axios.get(`/api/plans/${resPlan.data.rows[0].id}`);
    dispatch({
      type: "SET_EVENTS",
      payload: {
        events: resEvent.data.rows,
      },
    });

  }
  

  useEffect(() => {

    console.log("Loading Plans and Events...");
    loadPlans();

  },[]);

    
  const addPlan = (planName) => {
    const info = { userId: state.user.id, planName: planName };
    Axios.put("/api/plans/", { info }).then((res) => {
      Axios.get(`/api/plans/${state.user.id}`).then((res) => {
        if (res.data.plan) {
          dispatch({
            type: "SET_PLANS",
            payload: {
              plans: res.data.rows,
            },
          });

          Axios.get(`/api/events/${res.data.plans[0].id}`).then((res) => {
            dispatch({
              type: "SET_EVENTS",
              payload: {
                events: res.data.rows,
              },
            });
          });
        }
      });
    });
  };

  const changePlan = (planId) => {
    Axios.get(`/api/events/${planId}`).then((res) => {
      console.log("changing plan to: ", planId);
      dispatch({
        type: "CHANGE_PLAN",
        payload: {
          events: res.data.rows,
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

    Axios.put(`/api/events/${selectedPlan}`, { event }).then((res) => {
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

    Axios.delete(`/api/events/id/${id}`).then(() => {
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

    Axios.put(`/api/events/done/${id}`).then(() => {
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
