const AppReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_TO_MAP":
      console.log("ADD_TO_MAP: ", payload.events);

      let events = payload.events;
      let results = payload.results;
      return { ...state, events, results };

    case "DELETE_FROM_MAP":
      console.log("DELETE_FROM_MAP: ", payload.events);

      events = payload.events;
      return { ...state, events };

    case "SET_KEYWORD":
      console.log("SET_KEYWORD: ", payload);

      let keyword = payload.keyword;
      return { ...state, keyword };

    case "SET_LOCATION":
      console.log("SET_LOCATION: ", payload);

      let location = payload.location;
      return { ...state, location };

    case "SET_RESULTS":
      console.log("SET_RESULTS: ", payload);

      results = payload.results;
      return { ...state, results };

    case "UPDATE_ICON_COLOR":
      console.log("UPDATE_ICON_COLOR: ", payload.events);

      events = payload.events;
      return { ...state, events };

    case "SET_USER":
      console.log("SET_USER: ", payload.user);

      let user = payload.user;
      return { ...state, user };

    case "SET_EVENTS":
      console.log("SET_EVENTS: ", payload.events);

      events = payload.events;
      return { ...state, events };

    case "SET_PLANS":
      console.log("SET_PLANS: ", payload.plans);

      let plans = payload.plans;
      let selectedPlan = payload.plans[0].id;
      return { ...state, plans, selectedPlan };

    case "CHANGE_PLAN":
      console.log("CHANGE_PLAN: ", payload);

      events = payload.events;
      selectedPlan = payload.selectedPlan;
      return { ...state, events, selectedPlan };

    case "ROUTES_SWITCH":
      console.log("ROUTES_SWITCH: ", payload.showRoutes);

      let routes = payload.showRoutes;
      return { ...state, routes };

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};
export default AppReducer;
