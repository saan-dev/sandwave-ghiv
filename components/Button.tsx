"use client";

import { ButtonProps } from "@/types";

const Button = ({ isDisabled, btnType, classes, title }: ButtonProps) => (
  <button
    disabled={isDisabled}
    type={btnType || "submit"}
    className={`${classes}`}
  >
    {title}
  </button>
);

export default Button;
