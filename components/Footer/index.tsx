import Image from "next/image";
import React from "react";
import { VscGithub } from "react-icons/vsc";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="bg-black text-white flex flex-row-reverse px-4 py-2">
      <a href="https://github.com/mehmetozk4n6">
        <VscGithub size={"2em"} />
      </a>
    </div>
  );
};

export default Footer;
