const http = require('http');
const fs = require('fs');

const homeFile = fs.readFileSync('home.html', 'utf-8');//read file home.html


const replaceVal = (tempVal,orgVal)=>{
    let temperature = tempVal.replace("{%tempVal%}",orgVal.main.temp);
    temperature = temperature.replace("{%tempMin%}",orgVal.main.temp_min);
    temperature = temperature.replace("{%tempMax%}",orgVal.main.temp_max);
    temperature = temperature.replace("{%location%}",orgVal.name);
    temperature = temperature.replace("{%country%}",orgVal.sys.country);
    return temperature;
}

const server = http.createServer((req, res) => {
    if (req.url == '/') {
        var requests = require('requests');
        requests('https://api.openweathermap.org/data/2.5/weather?q=ghazipur&appid=9f550b7171516cd607fb89fcd860a94f')
            .on('data', function (chunk) {
                const objData = JSON.parse(chunk);
                const arrayData = [objData];
                // console.log(arrayData);
                const realTimeData = arrayData
                .map((val) => replaceVal(homeFile,val)).join("");
                res.write(realTimeData);
                // console.log(realTimeData);
            })
            .on('end', function (err) {
                if (err) return console.log('connection closed due to errors', err);
                res.end();
            });
    }

})

server.listen(3000,"127.0.0.1",()=>{
    console.log("Listening to port 3000");
});
