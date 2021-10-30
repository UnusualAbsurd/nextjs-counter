const fetch = require('node-fetch');

fetch("http://localhost:3000/stats")
.then(resp => resp.json())
.then((res) => console.log(res));