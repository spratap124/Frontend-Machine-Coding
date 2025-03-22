import React, { useState } from "react";
import "./styles.css";

type Node = {
  id: number;
  name: string;
  isFolder?: boolean;
  isExpanded?: boolean;
  childrens?: Node[];
};

type FolderTreeProps = {
  list: Node[];
};

const FolderTree: React.FC<FolderTreeProps> = ({ list }) => {
  const [isExpanded, setIsExpanded] = useState<{ [key: string]: boolean }>({});

  const handleOnClick = (nodeName: string) => {
    setIsExpanded((prev) => ({
      ...prev,
      [nodeName]: !prev[nodeName],
    }));
  };

  return (
    <div className="wrapper">
      {list.map((node) => (
        <div key={node.name} className="container">
          <div className="fileOrFolder">
            <div className="leftContent">
              {node.isFolder && (
                <span
                  className="arrow"
                  onClick={() => handleOnClick(node.name)}
                >
                  {isExpanded[node.name] ? "\u25BD" : "\u25B7"}
                </span>
              )}
              {node.name}
            </div>
            <div className="rightContent">
              {node.isFolder && <span className="add">+</span>}
            </div>
          </div>
          {node.childrens && isExpanded[node.name] && (
            <div className="childrens">
              <FolderTree list={node.childrens} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FolderTree;
