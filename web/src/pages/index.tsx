import React from "react";
import CategoryZoomContainer from "../components/Category/CategoryZoomContainer";
import Hero from "../components/UI/Hero";
import Layout from "../components/UI/Layout";
import { useCategoriesQuery, useMeQuery } from "../generated/graphql";
import withApollo from "../lib/apollo";

const Index = () => {
  const { data: dataMe, loading: loadingMe } = useMeQuery({
    fetchPolicy: "no-cache",
  });
  const { data, loading } = useCategoriesQuery({ variables: { layoutId: 4 } });

  if (!dataMe?.me && !loading) {
    return (
      <Layout>
        <Hero />
      </Layout>
    );
  }

  if (!loading && data) console.log("data:", data);
  return (
    <React.Fragment>
      <CategoryZoomContainer data={data} loading={loading} isEditable={false} />
    </React.Fragment>
  );
};

export default withApollo(Index);
