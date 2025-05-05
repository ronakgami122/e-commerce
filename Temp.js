fetch('https://fakestoreapi.com/users')
  .then(response => response.json())
  .then(data => console.log(data));