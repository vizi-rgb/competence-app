export const getValueFromHtmlSelect = (event: Event): string => {
  const selectElement: HTMLSelectElement = event.target as HTMLSelectElement;
  return selectElement.value;
};
