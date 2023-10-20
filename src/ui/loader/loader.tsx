import { FC } from "react";

import style from "./loader.module.css";
import { LoaderSvg } from "./loader.svg";


interface ILoaderSizes {
  [key: string]: number,
}

const loaderSizes: ILoaderSizes = {
  small: 16,
  medium: 24,
  large: 40
};

interface ILoader {
  size: string;
  inverse?: boolean;
}

export const Loader: FC<ILoader> = ({ size, inverse = false }) => {
  const loaderColor = inverse ? '#fff' : '#3C39EC';
  const wrapperStyleKey = 'wrapper_' + size;

  return (
    <div className={style[wrapperStyleKey]}>
      <LoaderSvg color={loaderColor} size={loaderSizes[size as keyof ILoaderSizes]} />
    </div>
  );
};
