import fs from 'fs';

// Path to your JSON file
const filePath = './cleaned_data.json';

// Read the JSON file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err.message);
    return;
  }

  try {
    // Parse the JSON data
    const products = JSON.parse(data);

    // Verify the data is an array
    if (!Array.isArray(products)) {
      throw new Error('JSON data is not an array');
    }

    // Add `id` field to each product
    const updatedProducts = products.map((product, index) => ({
      ...product,
      id: index + 1, // Assign a unique ID starting from 1
    }));

    // Convert back to JSON string
    const updatedData = JSON.stringify(updatedProducts, null, 2);

    // Write the updated JSON back to the file
    fs.writeFile(filePath, updatedData, 'utf8', (err) => {
      if (err) {
        console.error('Error writing to the file:', err.message);
        return;
      }
      console.log('File successfully updated with `id` field!');
    });
  } catch (error) {
    console.error('Error processing JSON data:', error.message);
  }
});
