export const errorHandler = (error: Error) => {
  console.error('------------------------------------------------');
  console.error('UNEXPECTED ERROR OCCURRED:');
  console.error(error);
  console.error('------------------------------------------------');
};