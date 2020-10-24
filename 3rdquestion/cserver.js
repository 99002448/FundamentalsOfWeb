const app = require("express")();

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/2.html");
})

app.listen(1234, ()=>{
    console.log("Client App running at 1234");
})