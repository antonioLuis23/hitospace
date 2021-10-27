import { InputGroup, InputLeftElement, Input } from "@chakra-ui/input";
import { Flex, HStack, Box, VStack } from "@chakra-ui/layout";
import {
  chakra,
  IconButton,
  useColorModeValue,
  CloseButton,
  Button,
  VisuallyHidden,
  Avatar,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  AiOutlineMenu,
  AiFillHome,
  AiOutlineInbox,
  AiOutlineSearch,
  AiFillBell,
  AiOutlineLogout,
} from "react-icons/ai";
import { FaTools } from "react-icons/fa";
import { BsFillCameraVideoFill } from "react-icons/bs";
import NextLink from "next/link";
import { setAccessToken } from "../../lib/accessToken";
import { useLogoutMutation, namedOperations } from "../../generated/graphql";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import Router from "next/router";

interface NavLoggedInType {
  onSearch: (e: any) => void;
}
const NavLoggedIn: React.FC<NavLoggedInType> = ({ onSearch }) => {
  const bg = useColorModeValue("#F8F8F8", "#131823");
  const mobileNav = useDisclosure();
  const [logout, { loading: logoutFetching }] = useLogoutMutation({
    refetchQueries: [namedOperations.Query.Me],
  });
  const [textSearched, setTextSearched] = useState("");
  const onTextSearched = (evt) => {
    setTextSearched(evt.target.value);
    onSearch(evt.target.value);
  };
  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <HStack display="flex" spacing={3} alignItems="center">
            <Box display={{ base: "inline-flex", md: "none" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color={useColorModeValue("gray.800", "inherit")}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />
              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  justifySelf="self-start"
                  onClick={mobileNav.onClose}
                />
                <Link as={NextLink} href="/">
                  <Button w="full" variant="ghost" leftIcon={<AiFillHome />}>
                    Início
                  </Button>
                </Link>
                <Link as={NextLink} href="/admin">
                  <Button
                    w="full"
                    variant="solid"
                    colorScheme="brand"
                    leftIcon={<FaTools />}
                  >
                    Admin
                  </Button>
                </Link>
                {/* <Button
                  w="full"
                  variant="ghost"
                  leftIcon={<BsFillCameraVideoFill />}
                >
                  Videos
                </Button> */}
              </VStack>
            </Box>
            <chakra.a
              href="/"
              title="Hitospace Home Page"
              display="flex"
              alignItems="center"
            >
              <VisuallyHidden>Hitospace</VisuallyHidden>

              <chakra.h1 fontSize="xl" fontWeight="medium" ml="2">
                Hitospace
              </chakra.h1>
            </chakra.a>

            <HStack spacing={3} display={{ base: "none", md: "inline-flex" }}>
              <Link as={NextLink} href="/">
                <Button variant="ghost" leftIcon={<AiFillHome />} size="sm">
                  Início
                </Button>
              </Link>
              <Link as={NextLink} href="/admin">
                <Button
                  variant="solid"
                  colorScheme="gray"
                  leftIcon={<FaTools />}
                  size="sm"
                >
                  Admin
                </Button>
              </Link>
              {/* <Button
                variant="ghost"
                leftIcon={<BsFillCameraVideoFill />}
                size="sm"
              >
                Videos
              </Button> */}
            </HStack>
          </HStack>
          <HStack
            spacing={3}
            display={mobileNav.isOpen ? "none" : "flex"}
            alignItems="center"
          >
            <ColorModeSwitcher />
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<AiOutlineSearch />}
              />
              <Input
                type="tel"
                placeholder="Pesquisar pessoas..."
                value={textSearched}
                onChange={onTextSearched}
              />
            </InputGroup>

            {/* <chakra.a
              p={3}
              color={useColorModeValue("gray.800", "inherit")}
              rounded="sm"
              _hover={{ color: useColorModeValue("gray.800", "gray.600") }}
            >
              <AiFillBell />
              <VisuallyHidden>Notifications</VisuallyHidden>
            </chakra.a> */}
            <Button
              variant="solid"
              colorScheme="gray"
              size="sm"
              p={4}
              onClick={async () => {
                console.log("entrou button logout click");
                setAccessToken("");
                await logout();
                Router.replace("/");
              }}
              isLoading={logoutFetching}
            >
              Sair
            </Button>
            <Avatar
              size="sm"
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
            />
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
};

export default NavLoggedIn;
