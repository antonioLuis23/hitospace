import { Flex, HStack, Box, VStack } from "@chakra-ui/layout";
import {
  useColorModeValue,
  useDisclosure,
  chakra,
  VisuallyHidden,
  Button,
  IconButton,
  CloseButton,
  Link,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import NextLink from "next/link";
import { ColorModeSwitcher } from "../ColorModeSwitcher";

const NavNotLoggedIn = () => {
  const bg = useColorModeValue("#F8F8F8", "#131823");
  const mobileNav = useDisclosure();

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
          <Flex>
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
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <ColorModeSwitcher />

            <HStack
              spacing={1}
              mr={1}
              color="gray.700"
              display={{ base: "none", md: "inline-flex" }}
            >
              <Button variant="ghost">Recursos</Button>
              <Button variant="ghost">Blog</Button>
              <Link as={NextLink} href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
            </HStack>
            <Button colorScheme="gray" size="sm">
              <Link as={NextLink} href="/register">
                Começar
              </Link>
            </Button>
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
                  onClick={mobileNav.onClose}
                />

                <Button w="full" variant="ghost">
                  Recursos
                </Button>
                <Button w="full" variant="ghost">
                  Blog
                </Button>
                <Link as={NextLink} href="/login">
                  <Button w="full" variant="ghost">
                    Login
                  </Button>
                </Link>
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
};

export default NavNotLoggedIn;
