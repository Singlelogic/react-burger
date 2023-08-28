export function parseIngredients(ingredients) {
  let groupIngredient = {};

  for (const ingredient of ingredients) {
    const type = ingredient.type;
    if (!(type in groupIngredient)) groupIngredient[type] = [];
    groupIngredient[type].push(ingredient);
  }

  return groupIngredient;
}
