export type Ingredient = {
    name: string;
    baseQuantity: number;
    unit: string;
    pricePerUnit: number;
    isMonthlyStaple: boolean;
  };
  
  export type Dish = {
    id: number;
    dish: string;
    ingredients: Ingredient[];
  };
  
  export const dishes: Dish[] = [
    {
      id: 1,
      dish: "Biryani",
      ingredients: [
        { name: "Rice", baseQuantity: 0.4, unit: "KG", pricePerUnit: 200, isMonthlyStaple: true },
        { name: "Chicken", baseQuantity: 0.3, unit: "KG", pricePerUnit: 450, isMonthlyStaple: false },
        { name: "Yogurt", baseQuantity: 50, unit: "g", pricePerUnit: 120, isMonthlyStaple: false },
        { name: "Masala", baseQuantity: 30, unit: "g", pricePerUnit: 100, isMonthlyStaple: true },
        { name: "Oil", baseQuantity: 20, unit: "ML", pricePerUnit: 550, isMonthlyStaple: true },
      ],
    },
    {
      id: 2,
      dish: "Pasta",
      ingredients: [
        { name: "Pasta", baseQuantity: 0.2, unit: "KG", pricePerUnit: 150, isMonthlyStaple: true },
        { name: "Cheese", baseQuantity: 0.1, unit: "KG", pricePerUnit: 500, isMonthlyStaple: false },
        { name: "Sauce", baseQuantity: 100, unit: "ML", pricePerUnit: 250, isMonthlyStaple: false },
      ],
    },
    {
      id: 3,
      dish: "Aloo Gosht",
      ingredients: [
        { name: "Beef", baseQuantity: 0.25, unit: "KG", pricePerUnit: 700, isMonthlyStaple: false },
        { name: "Potato", baseQuantity: 1, unit: "Piece", pricePerUnit: 40, isMonthlyStaple: false },
        { name: "Onion", baseQuantity: 0.5, unit: "Piece", pricePerUnit: 60, isMonthlyStaple: false },
        { name: "Tomato", baseQuantity: 0.5, unit: "Piece", pricePerUnit: 80, isMonthlyStaple: false },
        { name: "Masala", baseQuantity: 20, unit: "g", pricePerUnit: 100, isMonthlyStaple: true },
        { name: "Oil", baseQuantity: 20, unit: "ML", pricePerUnit: 550, isMonthlyStaple: true },
      ],
    },
    {
      id: 4,
      dish: "Daal Chawal",
      ingredients: [
        { name: "Masoor Daal", baseQuantity: 0.15, unit: "KG", pricePerUnit: 220, isMonthlyStaple: true },
        { name: "Rice", baseQuantity: 0.3, unit: "KG", pricePerUnit: 200, isMonthlyStaple: true },
        { name: "Onion", baseQuantity: 0.5, unit: "Piece", pricePerUnit: 60, isMonthlyStaple: false },
        { name: "Tomato", baseQuantity: 0.5, unit: "Piece", pricePerUnit: 80, isMonthlyStaple: false },
        { name: "Masala", baseQuantity: 15, unit: "g", pricePerUnit: 100, isMonthlyStaple: true },
        { name: "Oil", baseQuantity: 15, unit: "ML", pricePerUnit: 550, isMonthlyStaple: true },
      ],
    },
    {
      id: 5,
      dish: "Chicken Karahi",
      ingredients: [
        { name: "Chicken", baseQuantity: 0.3, unit: "KG", pricePerUnit: 450, isMonthlyStaple: false },
        { name: "Tomato", baseQuantity: 1, unit: "Piece", pricePerUnit: 80, isMonthlyStaple: false },
        { name: "Garlic", baseQuantity: 10, unit: "g", pricePerUnit: 200, isMonthlyStaple: true },
        { name: "Ginger", baseQuantity: 10, unit: "g", pricePerUnit: 300, isMonthlyStaple: true },
        { name: "Masala", baseQuantity: 25, unit: "g", pricePerUnit: 100, isMonthlyStaple: true },
        { name: "Oil", baseQuantity: 20, unit: "ML", pricePerUnit: 550, isMonthlyStaple: true },
      ],
    },
    {
      id: 6,
      dish: "Anda Paratha",
      ingredients: [
        { name: "Egg", baseQuantity: 1, unit: "Piece", pricePerUnit: 30, isMonthlyStaple: false },
        { name: "Flour", baseQuantity: 0.15, unit: "KG", pricePerUnit: 90, isMonthlyStaple: true },
        { name: "Oil", baseQuantity: 15, unit: "ML", pricePerUnit: 550, isMonthlyStaple: true },
        { name: "Masala", baseQuantity: 5, unit: "g", pricePerUnit: 100, isMonthlyStaple: true },
      ],
    },
  ];