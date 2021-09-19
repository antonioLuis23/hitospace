import { withUrqlClient } from "next-urql";
import React from "react";
import { useByeQuery } from "../generated/graphql";
import withApollo from "../lib/apollo";

const Bye = () => {
  const { data, loading, error } = useByeQuery();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log(error);
    return <div>err</div>;
  }
  if (!data) {
    return <div>no data</div>;
  }
  return <div>{data.bye}</div>;
};

export default withApollo(Bye);
