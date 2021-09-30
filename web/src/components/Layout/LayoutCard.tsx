import { Box, Flex, Heading } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/system";
import React from "react";
import { LayoutsQuery } from "../../generated/graphql";
import Card from "../UI/Card";
import { useRouter } from "next/router";

interface CompanyLayoutType {
  layout: LayoutsQuery["layouts"][0];
}
const LayoutCard: React.FC<CompanyLayoutType> = ({ layout }) => {
  const router = useRouter();
  const onClickLayout = () => {
    router.push("/admin/" + layout.id);
  };

  return (
    <Card
      title={layout.name}
      sizeHeading="md"
      sizePy="2rem"
      keyId={layout.id}
      clickFunction={onClickLayout}
    ></Card>
  );
};

export default LayoutCard;
