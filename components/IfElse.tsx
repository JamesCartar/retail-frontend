import type { ReactNode } from "react";

interface Props {
  isTrue: boolean;
  ifBlock: ReactNode;
  elseBlock: ReactNode;
}

const IfElse = ({ isTrue, ifBlock, elseBlock }: Props) => {
  return <>{isTrue ? ifBlock : elseBlock}</>;
};

export default IfElse;
