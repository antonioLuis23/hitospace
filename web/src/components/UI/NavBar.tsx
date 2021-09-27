import React from "react";
import { useMeQuery } from "../../generated/graphql";
import NavLoggedIn from "./NavLoggedIn";
import NavNotLoggedIn from "./NavNotLoggedIn";
interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const { data, loading, error } = useMeQuery({ fetchPolicy: "no-cache" });
  let body = null;

  if (loading) {
  } else if (!data?.me) {
    console.log("not logged navbar");
    body = <NavNotLoggedIn />;
  } else {
    console.log("logged navbar");
    body = <NavLoggedIn />;
  }
  return <React.Fragment>{body}</React.Fragment>;
};
export default NavBar;
