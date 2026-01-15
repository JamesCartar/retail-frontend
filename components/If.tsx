import type { ReactNode } from "react";

interface Props {
  isTrue: boolean;
  ifBlock: ReactNode;
}

const If = ({ isTrue, ifBlock }: Props) => {
  return <>{isTrue ? ifBlock : null}</>;
};

export default If;
