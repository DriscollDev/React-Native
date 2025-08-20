// utils/dateUtils.ts

export const getDayOfWeek = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  
  // Check if it's today
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }
  
  // Check if it's tomorrow
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  }
  
  // Return day of week
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};
