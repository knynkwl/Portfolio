// easingUtils.ts

// Linear Ease
export const linearEase = (t: number) => t;

// Quadratic Eases
export const quadraticEaseIn = (t: number) => t * t;
export const quadraticEaseOut = (t: number) => 1 - Math.pow(1 - t, 2);
export const quadraticEaseInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

// Cubic Eases
export const cubicEaseIn = (t: number) => t * t * t;
export const cubicEaseOut = (t: number) => 1 - Math.pow(1 - t, 3);
export const cubicEaseInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1);

// Quartic Ease
export const quarticEaseIn = (t: number) => t * t * t * t;
export const quarticEaseOut = (t: number) => 1 - Math.pow(1 - t, 4);

// Quintic Ease
export const quinticEaseInOut = (t: number) => (t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2);
