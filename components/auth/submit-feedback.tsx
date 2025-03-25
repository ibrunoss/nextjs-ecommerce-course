import { ReactNode } from "react";

import { Render } from "@/components/common/render";

type SubmitFeedbackProps = {
  error: boolean;
  message: ReactNode;
};

export const SubmitFeedback = ({ error, message }: SubmitFeedbackProps) => {
  return (
    <Render when={error}>
      <div className="text-center text-destructive">{message}</div>
    </Render>
  );
};
