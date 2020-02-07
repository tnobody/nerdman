import "./styles.css";
import { FC } from "react";
import React from "react";

export const ComicBox: FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = (props) => {
  return (
    <div className="box box1">
      <div className="oddboxinner">
          <div {...props}></div>
      </div>
    </div>
  );
};
