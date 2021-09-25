import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React, { Fragment, useState } from "react";
import NextLink from "next/link";
import { isServer } from "../../utils/isServer";
import {
  useMeQuery,
  useLogoutMutation,
  namedOperations,
} from "../../generated/graphql";
import { setAccessToken } from "../../lib/accessToken";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import NavNotLoggedIn from "./NavNotLoggedIn";
import NavLoggedIn from "./NavLoggedIn";
interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const [logout, { loading: logoutFetching }] = useLogoutMutation({
    refetchQueries: [namedOperations.Query.Me],
  });
  const { data, loading, error } = useMeQuery({ fetchPolicy: "no-cache" });
  let body = null;

  if (loading) {
  } else if (!data?.me) {
    body = (
      // <Fragment>
      //   <NextLink href="/login">
      //     <Link color="white" mr={2}>
      //       Login
      //     </Link>
      //   </NextLink>
      //   <NextLink href="/register">
      //     <Link color="white">Register</Link>
      //   </NextLink>
      // </Fragment>
      <NavNotLoggedIn />
    );
  } else {
    body = (
      <NavLoggedIn />
      //   <Flex>
      //     <ColorModeSwitcher />
      //     <Box mr={2}>{data.me.username}</Box>
      //     <NextLink href="/">
      //       <Button variant="link" color="white" mr={4}>
      //         Início
      //       </Button>
      //     </NextLink>
      //     <NextLink href="/admin">
      //       <Button variant="link" color="white" mr={4}>
      //         Admin
      //       </Button>
      //     </NextLink>
      //     <Button
      //       onClick={async () => {
      //         console.log("entrou button logout click");
      //         setAccessToken("");
      //         await logout();
      //       }}
      //       isLoading={logoutFetching}
      //       variant="link"
      //     >
      //       Logout
      //     </Button>
      //   </Flex>
    );
  }
  return <React.Fragment>{body}</React.Fragment>;
  // <Flex zIndex={2} position="sticky" top={0} bg="tan" p={4}>
  //   <Box ml={"auto"}>{body}</Box>
  // </Flex>
};
export default NavBar;
