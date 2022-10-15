import React, { createContext, useEffect, useReducer } from "react";
import AppReducer from "./useAppReducer";
import Axios from "axios";

const initialState = {
  events: [],
  results: [],
  location: "",
  keyword: "",
  plans: [],
  selectedPlan: 0,
  showRoutes: false,
  user: {},
  accessTkn: "",
};

export const AppContext = createContext(initialState);

export const AppProvider = ({ children }) => {

  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    const config = { headers: { Authorization: `Bearer ${state.accessTkn}` } };
    const loadP = async () => {
      try {
        if (state.accessTkn === "") {
          console.log("Not logged in");
          return;
        }
        console.log("Loading Plans ...");
        const plans = await Axios.get(`/api/plans/`, config);
        dispatch({
          type: "SET_PLANS",
          payload: {
            plans: plans.data.rows,
          },
        });
      } catch (error) {
        if (state.user.name === "") {
          dispatch({
            type: "SET_PLANS",
            payload: {
              plans: [],
            },
          });
        }
        console.log("Error while loading plans: ", error);
      }
    }
    loadP();

  },[state.user]);

  useEffect(() => {
    const loadE = async () => {
      const config = { headers: { Authorization: `Bearer ${state.accessTkn}` } };
      console.log("selectedPlan: ", state.selectedPlan);
      
      try {
        if (state.accessTkn === "") {
          console.log("Not logged in");
          return;
        }
        console.log("Loading Events ...");
        const events = await Axios.get(`/api/events/${state.selectedPlan}`, config)
        console.log("config:", config);
        dispatch({
          type: "SET_EVENTS",
          payload: {
            events: events.data.rows,
          },
        });        
      } catch (error) {
        if (state.user.name === "") {
          dispatch({
            type: "SET_EVENTS",
            payload: {
              events: [],
            },
          });
        }        
        console.log("Error while setting events: ", error);
      }
    }
    loadE();
  }, [state.plans])

    
  const addPlan = async (planName) => {
    // console.log("Adding plan...");
    try {
      const info = { userId: state.user.id, planName: planName, userEmail: state.user.email };
      const config = { headers: { Authorization: `Bearer ${state.accessTkn}` } };
  
      await Axios.put(`/api/plans/${state.user.id}`, { info }, config);
      const res = await Axios.get(`/api/plans/`, config);

      console.log("reloading plans...");
      dispatch({
        type: "SET_PLANS",
        payload: {
          plans: res.data.rows,
        },
      });
      const res2 = await Axios.get(`/api/events/${state.selectedPlan}`, config)
      dispatch({
        type: "SET_EVENTS",
        payload: {
          events: res2.data.rows,
        },
      });
    } catch (error) {
      console.log("Error adding plan: ", error);
    }
  };

  const changePlan = async (planId) => {
    
    console.log("on changePlan to: ", planId);
    const config = { headers: { Authorization: `Bearer ${state.accessTkn}` } };
    const res = await Axios.get(`/api/events/${planId}`, config)

    dispatch({
      type: "CHANGE_PLAN",
      payload: {
        events: res.data.rows,
        selectedPlan: planId,
      },
    });
    
  };

  const addToMap = async (event) => {
    
    const config = { headers: { Authorization: `Bearer ${state.accessTkn}` } };
    const updatedMap = state.events.concat(event);
    const updatedResults = state.results.filter((res) => event.id !== res.id);
    const selectedPlan = state.selectedPlan;

    console.log("EVENT ADDED: ", event);

    await Axios.put(`/api/events/${selectedPlan}`, { event }, config);

    dispatch({
      type: "ADD_TO_MAP",
      payload: {
        events: updatedMap,
        results: updatedResults,
      },
    });
  };

  const deleteFromMap = async (id) => {
    const updatedMap = state.events.filter((el) => el.id !== id);
    const config = { headers: { Authorization: `Bearer ${state.accessTkn}` } };
    console.log("state.events: ", state.events);
    console.log("eventId: ", id);
    console.log("updatedMap: ", updatedMap);

    await Axios.delete(`/api/events/id/${id}`, config)
    console.log("Deleted");
    
    dispatch({
      type: "DELETE_FROM_MAP",
      payload: {
        events: updatedMap,
      },
    });
  };

  const deletePlan = async (planId) => {
    const updatedPlans = state.plans.filter((el) => el.id !== Number(planId));
    const config = { headers: { Authorization: `Bearer ${state.accessTkn}` } };
    // console.log("state.plans: ", state.plans);
    // console.log("planId: ", planId);
    // console.log("updatedPlans: ", updatedPlans);

    await Axios.delete(`/api/plans/${planId}`, config);
    dispatch({
      type: "DELETE_PLAN",
      payload: {
        plans: updatedPlans,
      },
    });
  };  

  const setResults = (data) => {
    dispatch({
      type: "SET_RESULTS",
      payload: {
        results: data,
      },
    });
  };

  const changeIconColor = async (id) => {
    const index = state.events.findIndex((ele) => ele.id === id);
    const config = { headers: { Authorization: `Bearer ${state.accessTkn}` } };
    
    //Mark as done/undone
    state.events[index].done = !state.events[index].done;

    await Axios.put(`/api/events/done/${id}`, "",config)
    console.log("Marked as done!");

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
  };

  const setKeyword = (data) => {
    state.keyword = data;
    dispatch({
      type: "SET_KEYWORD",
      payload: {
        keyword: state.keyword,
      },
    });    
  };

  const loginUser = async (user) => {

    try {
      const res = await Axios.post(`/api/users/login`, user);

      dispatch({
        type: "SET_USER",
        payload: {
          user: {
            id: res.data.user_id,
            name: res.data.user_name, 
            email: res.data.user_email,
            password: "",
            lat: res.data.lat,
            lng: res.data.lng,            
          },
          accessTkn: res.data.accessToken,
        },
      });
      
    } catch (error) {
      console.log(error); 
    }

  };

  const logoutUser = async () => {
    try {
      dispatch({
        type: "SET_USER",
        payload: {
          user: {
            id: "",
            name: "",
            email: "",
            password: "",
            lat: "",
            lng: "",
          }
        },
        accessTkn: "",
      });


    } catch (error) {
      console.log(error);
    }
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
    loginUser,
    accessTkn: state.accessTkn,
    logoutUser,
    deletePlan,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
