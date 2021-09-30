import { Box, Grid, Heading, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useLayoutsQuery } from "../../generated/graphql";
import AddLayoutButton from "./AddLayoutButton";
import LayoutCard from "./LayoutCard";
import ModalAddLayout from "./ModalAddLayout";

const AddCompanyLayout = () => {
  const { data, loading, refetch } = useLayoutsQuery();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!loading && !data) {
    return <Text>Você não possui Layouts.</Text>;
  }
  if (loading && !data) {
    return <Text>Carregando...</Text>;
  }
  if (!loading && data) {
    return (
      <Box>
        <Heading fontWeight={500}>Seus Layouts</Heading>
        <Grid templateColumns="repeat(3,1fr)" gap={2} mt={4}>
          {data &&
            data.layouts &&
            data.layouts.map((layout) => (
              <LayoutCard key={layout.id} layout={layout} />
            ))}
          <AddLayoutButton onClickButton={onOpen} />
          <ModalAddLayout
            isOpen={isOpen}
            onClose={onClose}
            refetchLayout={refetch}
          />
        </Grid>
      </Box>
    );
  }
};

export default AddCompanyLayout;
