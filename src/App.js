import React, { useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import LoginLayout from "./components/LoginLayout";
import axios from "axios";
import AuthContextProvider from "./contexts/AuthContext";

var store = require("store");

export const itemContext = React.createContext();
const initialState = {
  id: 0,
  loggedIn: store.get("LoggedIn") ?? false,
  list: store.get("orderedItems") ?? [],
  totalItems: store.get("totalitems") ?? 0,
  totalCost: store.get("totalCost") ?? 0,
};
const myReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case "set_id":
      return { ...state, id: action.payload };
    case "addItem":
      let { list } = state;
      let { payload } = action;

      if (list === undefined || list.length === 0) {
        let newList = {
          ...state,
          list: [
            {
              ...payload,
              quantity: 1,
              diffDays: 0,
              fromDate: new Date().toISOString().split("T")[0],
              toDate: new Date().toISOString().split("T")[0],
            },
          ],
        };
        store.set("orderedItems", newList["list"]);
        return newList;
      } else if (list.filter((item) => item.id === payload.id).length === 0) {
        let newList = {
          ...state,
          list: [
            ...list,
            {
              ...payload,
              quantity: 1,
              diffDays: 0,
              fromDate: new Date().toISOString().split("T")[0],
              toDate: new Date().toISOString().split("T")[0],
            },
          ],
        };
        store.set("orderedItems", newList["list"]);
        return newList;
      } else {
        return state;
        // let newList =  {...state, list :list.map(item => item.id === payload.id ? {...item, quantity: item.quantity +1} :item) };
        // store.set("orderedItems", newList["list"]);
        // return newList;
      }
    case "deleteItem":
      let pll = action.payload;
      //console.log("in delete");
      const t = state.list.map((item) =>
        item.id === pll.id ? { ...item, quantity: item.quantity - 1 } : item
      );
      let newList = { ...state, list: t.filter((a) => a.quantity !== 0) };
      store.set("orderedItems", newList["list"]);
      if (store.get("orderedItems").length === 0) {
        store.set("totalitems", 0);
        store.set("totalCost", 0);
      }
      return newList;

    case "getTotalItems":
      if (state.list.length > 0) {
        let totalitems = {
          ...state,
          totalItems: state.list.map((a) => a.quantity).reduce((a, b) => a + b),
        };
        store.set("totalitems", totalitems["totalItems"]);
        return totalitems;
      } else return { ...state, totalItems: 0 };

    case "updateItems":
      // let { list1 } = state;
      console.log("update", state.list);
      store.set("orderedItems", state.list);
      return state;

    case "clearCart":
      // document.querySelectorAll('.addCart').forEach(element => {
      //   element.disabled = false;
      // });
      store.remove("orderedItems");
      store.remove("totalitems");
      return { ...state, list: [] };
    case "totalCost":
      if (state.list.length > 0) {
        store.set(
          "totalCost",
          state.list
            .map(
              (l) => l.quantity * l.price * (l.diffDays === 0 ? 1 : l.diffDays)
            )
            .reduce((a, b) => a + b)
        );
        return {
          ...state,
          totalCost: state.list
            .map(
              (l) => l.quantity * l.price * (l.diffDays === 0 ? 1 : l.diffDays)
            )
            .reduce((a, b) => a + b),
        };
      }
      break;
    case "setUser1":
      const user = {};
      if (localStorage.getItem("isLoggedIn") === true) {
        store.set("user", user[0]);
        return state;
      }
    case "checkUser":
      const pl = action.payload,
        u = action.user;
      if (pl.length) {
        const user = pl.filter((p) => p.mail === u.mail && p.psd === u.psd);
        if (user.length) {
          axios
            .put(
              `https://my-json-yumito-server.herokuapp.com/users/${user[0].id}`,
              { ...user[0], loggedIn: true }
            )
            .then((res) => {
              store.set("user", user[0]);
              store.set("loggedIn", true);
            })
            .catch((e) => alert("Something gone wrong"));

          return { ...state, loggedIn: true };
        } else {
          alert("Please enter valid credentials");
          store.set("loggedIn", false);
          return { ...state, loggedIn: false };
        }
      } else {
        console.log("User data not found");
      }
      break;

    case "logOut":
      store.clearAll();
      return {
        ...initialState,
        loggedIn: false,
        list: [],
        totalItems: 0,
        totalCost: 0,
      };

    //return {...state,}

    default:
      return state;
  }
};

function App() {
  const [myState, dispatch] = useReducer(myReducer, initialState);
  return (
    <div className="App">
      <itemContext.Provider value={{ state: myState, method: dispatch }}>
        <AuthContextProvider>
          <Router>
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => <DashboardLayout {...props} />}
              />
              <Route
                path="/login"
                render={(props) => <LoginLayout {...props} />}
              />
              <Route
                path="/register"
                render={(props) => <LoginLayout {...props} />}
              />
              <Route
                path="/menu"
                render={(props) => (
                  <DashboardLayout data={myState} {...props} />
                )}
              />
              <Route
                path="/editProfile"
                render={(props) => <DashboardLayout {...props} />}
              />
              <Route
                path="/checkout"
                render={(props) => <DashboardLayout {...props} />}
              />
              {/* <Route children={props=><Footer {...props}/>}/> */}
              {/* <Route children={props=><Navbar {...props}/>}/> */}
            </Switch>
          </Router>
        </AuthContextProvider>
      </itemContext.Provider>
    </div>
  );
}

export default App;
