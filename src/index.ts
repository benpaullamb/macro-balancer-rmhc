// import logUpdate from 'log-update';
import chalk from 'chalk';
// import Food from './food.js';
import MealSolution from './meal-solution.js';

// const foodA = new Food({
//   name: 'Chicken Breast',
//   nutritionPer100g: {
//     kcal: 106,
//     fat: 1.1,
//     carbs: 0,
//     protein: 24
//   }
// });

// const foodB = new Food({
//   name: 'Wholegrain Rice',
//   nutritionPer100g: {
//     kcal: 164,
//     fat: 2.5,
//     carbs: 31,
//     protein: 3.7
//   },
//   gramLimits: {
//     max: 250
//   }
// });

// const foodC = new Food({
//   name: 'Broccoli',
//   nutritionPer100g: {
//     kcal: 34,
//     fat: 0.7,
//     carbs: 3.2,
//     protein: 2.5
//   },
//   gramLimits: {
//     max: 200
//   }
// });

export const rmhcMealSolution = (
  targets: any,
  foods: any,
  iterations = 1000000,
  changeRate = 50
) => {
  const solution = new MealSolution({
    targets,
    foods,
    changeRate
  });

  solution.initRandomGrams();

  let bestSolution = solution.grams;
  let bestFitness = solution.fitness();

  for (let i = 0; i < iterations; i++) {
    solution.mutate();
    const mutatedFitness = solution.fitness();

    if (mutatedFitness < bestFitness) {
      bestSolution = solution.grams;
      bestFitness = mutatedFitness;
      // logUpdate(chalk.gray(`Fitness: ${bestFitness.toFixed(2)} (i: ${i})`));
    } else {
      solution.grams = bestSolution;
    }
  }

  return solution;
};

// const result = rmhcMealSolution(
//   {
//     calories: 700,
//     carbs: 50,
//     fat: 20,
//     protein: 30
//   },
//   [foodA, foodB, foodC]
// );

// result.log();
