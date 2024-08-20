export const useConvertStringHref = () => {
  const convertToKebabCase = (input: string): string => {
    return input.toLowerCase().replace(/\s+/g, '-');
  };

  return { convertToKebabCase };
};
