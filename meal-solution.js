import chalk from 'chalk';

export default class MealSolution {
  grams = [];

  get grams() {
    return [...this.grams];
  }

  set grams(value) {
    this.grams = [...value];
  }

  constructor(options) {
    this.targets = { ...options.targets };
    this.foods = options.foods;
    this.changeRate = options.changeRate;
  }

  initRandomGrams() {
    this.grams = this.foods.map(() => Math.random() * 300);
  }

  fitness() {
    const totalKcal = this.totalCalories();
    const { fat, carbs, protein } = this.macroSplit();

    const kcalDiff = Math.abs(this.targets.calories - totalKcal);
    const fatDiff = Math.abs(this.targets.fat - fat);
    const carbsDiff = Math.abs(this.targets.carbs - carbs);
    const proteinDiff = Math.abs(this.targets.protein - protein);

    return kcalDiff + fatDiff + carbsDiff + proteinDiff;
  }

  mutate() {
    this.grams = this.grams.map((grams, i) => {
      const change = Math.random() * (this.changeRate * 2) - this.changeRate;
      return this.foods[i].clampGrams(grams + change);
    });
  }

  macroSplit() {
    const totalKcal = this.totalCalories();

    const totalFatKcal = this.sumCaloriesForMacro('fat');
    const totalCarbsKcal = this.sumCaloriesForMacro('carbs');
    const totalProteinKcal = this.sumCaloriesForMacro('protein');

    const fat = (totalFatKcal / totalKcal) * 100;
    const carbs = (totalCarbsKcal / totalKcal) * 100;
    const protein = (totalProteinKcal / totalKcal) * 100;

    return { fat, carbs, protein };
  }

  totalCalories() {
    return this.sumCaloriesForMacro();
  }

  sumCaloriesForMacro(macro) {
    return this.foods.reduce((sum, currentFood, i) => {
      sum += currentFood.calories(this.grams[i], macro);
      return sum;
    }, 0);
  }

  log() {
    console.log(
      chalk.green.bold(this.foods.map((food, i) => `${food.name}: ${Math.round(this.grams[i])}g`).join(', '))
    );
    console.log(chalk.green(`Calories: ${Math.round(this.totalCalories())}kcal`));
    const { fat, carbs, protein } = this.macroSplit();
    console.log(
      chalk.green(`Fat: ${Math.round(fat)}%, Carbs: ${Math.round(carbs)}%, Protein: ${Math.round(protein)}%`)
    );
  }
}
