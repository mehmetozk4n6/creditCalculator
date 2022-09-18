import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useCallback,
} from "react";
import { VscGithub } from "react-icons/vsc";

type Props = {};
export type MyRef = {
  changeMode: () => void;
};

const Footer = (props: Props, ref: React.Ref<MyRef> | undefined) => {
  const [whitefooter, setwhitefooter] = useState(false);

  // footer ın modunu değiştirmektedir
  useImperativeHandle(ref, () => ({
    changeMode: () => {
      setwhitefooter(!whitefooter);
    },
  }));

  return (
    <div
      // ref={ref}
      className={`${
        whitefooter ? "bg-white text-black" : "bg-black text-white"
      } flex flex-row-reverse px-4 py-2`}
    >
      <a href="https://github.com/mehmetozk4n6">
        <VscGithub size={"2em"} />
      </a>
    </div>
  );
};

export default forwardRef(Footer);
