
import React from "react";
import { IconsDictionary } from "./IconDictionary";

export type IconProps = {
  iconKey: string;
  className: string;
  iconColor?: string;
  id?: string;
  width?: string;
  height?: string;
  onClick?: (e: React.MouseEvent) => void;
};

const Icon = ({ iconKey, className, iconColor, id, width, height, onClick }: IconProps) => {
  if (!(iconKey in IconsDictionary)) {
    throw "Could not find key in icons dictionary: " + iconKey;
  }
  const [defaultWidth, defaultHeight] = IconsDictionary[iconKey].viewBox.split(" ").slice(2);
  const iconWidth = width || defaultWidth;
  const iconHeight = height || defaultHeight;

  return (
    <svg
      className={className}
      viewBox={IconsDictionary[iconKey].viewBox}
      id={id}
      width={iconWidth}
      height={iconHeight}
      onClick={onClick}
    >
      <path fill={iconColor} d={IconsDictionary[iconKey].data} />
    </svg>
  );
};
export default Icon;