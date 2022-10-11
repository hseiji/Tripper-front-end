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
  user: {},
  accessTkn: "",
};

export const AppContext = createContext(initialState);

export const AppProvider = ({ children }) => {

  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    console.log("Loading Plans ...");

    const config = {
      headers: { Authorization: `Bearer ${state.accessTkn}` }
    };

    const loadP = async () => {
      try {
        // const plans = await Axios.get(`/api/plans/${state.user.id}`);
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
        console.log(error);
      }
    }
    loadP();

  },[state.user]);

  useEffect(() => {
    const loadE = async () => {
      console.log("Loading Events ...");

      // const config = {
      //   headers: { Authorization: `Bearer ${state.accessTkn}` }
      // };

      try {
        const events = await Axios.get(`/api/events/${state.selectedPlan}`)

        dispatch({
          type: "SET_EVENTS",
          payload: {
            events: events.data.rows,
          },
        });

        // if (state.user !== undefined) {
        //   const events = await Axios.get(`/api/events/`, config)
        //   dispatch({
        //     type: "SET_EVENTS",
        //     payload: {
        //       events: events.data.rows,
        //     },
        //   });
        // }
        
      } catch (error) {
        if (state.user.name === "") {
          dispatch({
            type: "SET_EVENTS",
            payload: {
              events: [],
            },
          });
        }        
        console.log(error);
      }
    }
    loadE();
  }, [state.plans])

    
  const addPlan = (planName) => {
    const info = { userId: state.user.id, planName: planName };
    Axios.put(`/api/plans/${state.user.id}`, { info }).then((res) => {
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
    logoutUser
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
