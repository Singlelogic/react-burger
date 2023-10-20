import { FC } from "react";

import styles from "./nutrient.module.css";


interface INutrient {
  title: string;
  value: number;
}

const Nutrient: FC<INutrient> = ({ title, value }) => {
  return (
    <span className={styles.nutrient}>
      <span className="text text_type_main-default text_color_inactive">
        {title}
      </span>
      <span className="text text_type_digits-default text_color_inactive">
        {value}
      </span>
    </span>
  )
}

export default Nutrient;
