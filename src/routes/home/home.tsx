import React, { FC } from "react";
import { NerdMan } from "../../components/nerdman/nerd-man";
import { ComicBox } from "../../components/comic-box/comic-box";
import { Link } from "react-router-dom";
import { useMedia, BreakPoints } from "../../use-media-query";

export interface HomeLinkProps {
  to: string;
}
export const HomeLink: FC<HomeLinkProps> = ({ children, to }) => {
  return (
    <div style={{ margin: "1rem" }}>
      <ComicBox className="test" style={{ color: "black", margin: ".75rem" }}>
        <Link to={to} className="comic-font">
          {children}
        </Link>
      </ComicBox>
    </div>
  );
};

export const Home = () => {
  const { LG, MD, SM, XL } = BreakPoints;
  const iconWidth = useMedia(
    [SM, MD, LG, XL],
    ["70%", "50%", "50%", "50%"],
    "90%"
  );

  return (
    <>
      <div style={{ width: iconWidth, margin: "auto auto" }}>
        <NerdMan />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <HomeLink to="/remote-control">Remote</HomeLink>
        <HomeLink to="/about">About</HomeLink>
      </div>
    </>
  );
};
