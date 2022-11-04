export default class Food {
  macroCaloriesMap = {
    kcal: 1,
    fat: 9,
    carbs: 4,
    protein: 4,
  };

  constructor(options) {
    this.name = options.name;
    this.nutritionPer100g = { ...options.nutritionPer100g };
    this.gramLimits = { ...options.gramLimits };
  }

  calories(grams, macro = 'kcal') {
    return (this.nutritionPer100g[macro] / 100) * grams * this.macroCaloriesMap[macro];
  }

  clampGrams(grams) {
    if (this.gramLimits.fixed) {
      return this.gramLimits.fixed;
    }

    let clamped = Math.max(grams, this.gramLimits.min || 0);

    if (this.gramLimits.max) {
      clamped = Math.min(clamped, this.gramLimits.max);
    }

    return clamped;
  }
}
