import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import MyNavbar from "./components/MyNavbar";
import PuppiesForSale from "./pages/PuppiesForSale";
import PuppiesForRent from "./pages/DogsForRent";
import DogDescription from "./pages/DogDecription";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import PolicyPage from "./pages/PolicyPage";
import SignInCustomer from "./pages/SignInCustomer";
import PurchasePage from "./pages/PurchasePage";
import CreateCustomerAccount from "./pages/CreateCustomerAccount";
import SignInAdmin from "./pages/SignInAdmin";
import AdminHome from "./pages/AdminHome";
import UserContext from "./components/UserContext";
import CartContext from "./components/CartContext";

const MyRoute = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [cart, setCart] = useState([]);
  const userContextValue = { user, setUser };
  const cartContextValue = { cart, setCart };

  
  return (
    <UserContext.Provider value={userContextValue}>
      <CartContext.Provider value={cartContextValue}>
        <Router>
          <Switch>
            <Route exact path="/loginCustomer">
              <SignInCustomer />
            </Route>
            <Route exact path="/">
              <MyNavbar />
              <Home />
            </Route>
            <Route path="/sale">
              <MyNavbar />
              <PuppiesForSale />
            </Route>
            <Route path="/rent">
              <MyNavbar />
              <PuppiesForRent />
            </Route>
            <Route path="/details/:id">
              <MyNavbar />
              <DogDescription />
            </Route>
            <Route path="/contact">
              <MyNavbar />
              <Contact />
            </Route>
            <Route path="/policy">
              <MyNavbar />
              <PolicyPage />
            </Route>
            <Route path="/purchase">
              <MyNavbar />
              <PurchasePage />
            </Route>
            <Route path="/create">
              <MyNavbar />
              <CreateCustomerAccount />
            </Route>
            <Route path="/loginAdmin">
              <MyNavbar />
              <SignInAdmin />
            </Route>
            <Route path="/admin">
              <MyNavbar />
              <AdminHome />
            </Route>
            <Route path="/contact">
              <MyNavbar />
              <Contact/>
            </Route>
          </Switch>
          <Footer />
        </Router>
      </CartContext.Provider>
    </UserContext.Provider>
  );
};

export default MyRoute;
