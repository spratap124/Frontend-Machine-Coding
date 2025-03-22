import React from "react";

import Tree from "./tree";
import data from "./data.json";

const FolderTree = () => {
  return <Tree list={data} />;
};

export default FolderTree;
