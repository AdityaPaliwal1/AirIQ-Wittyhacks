fetch('https://airiq.ashutosh7i.repl.co/old')
  .then(response => response.json())
  .then(data => {
    // Work with the JSON data here
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
