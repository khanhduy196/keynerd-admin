import React from "react";
import parse from "html-react-parser";

type HTMLParserProps = {
  value: string;
};

const HTMLParser: React.FC<HTMLParserProps> = ({ value }) => {
  return <div>{parse(value)}</div>;
};

export default HTMLParser;
