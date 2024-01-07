const express = require("express");
const { json } = require("express/lib/response");
const fs = require("fs");

const app = express();

const port = 3000;

app.use(express.json());

app.get('/get', (req, res) => {
    // console.log(req);
    fs.readFile("./data.json", (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(data);

        }
    })

})

app.post('/post', (req, res) => {
    // console.log(req);
    // const { name, phone_no } = req.body;
    const newData = req.body;
    // console.log(newData);
    fs.readFile("./data.json", (err, data) => {
        const prevValue = JSON.parse(data);
        // console.log(prevValue);
        const toWrite = [...prevValue, newData]
        // console.log(toWrite);

        fs.writeFile("./data.json", JSON.stringify(toWrite), (err) => {
            if (err) {
                console.log(err);
                res.send(err)
            }
            else {
                // console.log("File Written Succesfullly!!\n");
                res.send("Data sent Succesfully")

            }
        })
    })

})


app.listen(port, () => {
    console.log(`Server Started at port ${port}`);
})


