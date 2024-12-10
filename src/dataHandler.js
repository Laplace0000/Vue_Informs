export const fetch0 = async (url) => {
  try {
      const response = await fetch(url); // Fetch the data from the provided URL
      const data = await response.json(); // Parse the data
      return data; // Return the fetched data
  } catch (error) {
      console.error("Error fetching data:", error);
      return null; // Return null in case of an error
  }
};
