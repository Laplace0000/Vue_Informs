export async function fetch0(url){
  try {
      const response = await fetch(url); // Fetch the data from the provided URL
      const data = await response.json(); // Parse the data
      return data; // Return the fetched data
  } catch (error) {
      console.error("Error fetching data:", error);
      return null; // Return null in case of an error
  }
};

//Niels' datafetcher
export function fetch3(vm, endpoint, dataProperty) {
  const headers = new Headers();
  
  // Ensure 'token' is defined and not empty
  if (!token) {
    console.error('Token is missing or undefined.');
    return;
  }

  headers.set('Token', token);  // Set the custom Token header
  headers.set('Content-Type', 'application/json');  // Set the Content-Type header
  headers.set('Forward-URL', `https://api.informsgrc.dk/internal/api.php/records/${endpoint}`);  // Set the Forward-URL header

  // Log headers for debugging
  console.log('Request Headers:', [...headers.entries()]);

  // Return a Promise to allow for async/await usage
  return fetch(`https://api.informsgrc.dk/internal/proxy-new.php`, {
    method: 'GET',  // Specify the request method
    headers: headers,
    credentials: 'include',  // Include cookies and other credentials in the request
  })
  .then(response => {
    if (!response.ok) {
      return response.text().then(text => {
        throw new Error('Network response was not ok: ' + text);
      });
    }
    return response.json();
  })
  .then(data => {
    // Update the Vue instance's data property
    if (data.records) {
      vm[dataProperty] = data.records;
    } else {
      vm[dataProperty] = data;
    }
  })
  .catch(error => {
    console.error(`Error fetching data for ${dataProperty}:`, error);
    throw error;  // Re-throw the error to be handled by the calling code
  });
}


//Niels' datafetcher refactored to use async and await instead of promise an .then
export async function fetch2(vm, endpoint, dataProperty) {
  const headers = new Headers();
  
  // Ensure 'token' is defined and not empty
  if (!token) {
    console.error('Token is missing or undefined.');
    return;
  }

  headers.set('Token', token);  // Set the custom Token header
  headers.set('Content-Type', 'application/json');  // Set the Content-Type header
  headers.set('Forward-URL', `https://api.informsgrc.dk/internal/api.php/records/${endpoint}`);  // Set the Forward-URL header

  // Log headers for debugging
  console.log('Request Headers:', [...headers.entries()]);

  try {
    const response = await fetch(`${endpoint}`, {
      method: 'GET',  // Specify the request method
      headers: headers,
      credentials: 'include',  // Include cookies and other credentials in the request
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error('Network response was not ok: ' + errorText);
    }

    const data = await response.json();

    // Update the Vue instance's data property
    if (data.records) {
      vm[dataProperty] = data.records;
    } else {
      vm[dataProperty] = data;
    }
  } catch (error) {
    console.error(`Error fetching data for ${dataProperty}:`, error);
    throw error;  // Re-throw the error to be handled by the calling code
  }
}


