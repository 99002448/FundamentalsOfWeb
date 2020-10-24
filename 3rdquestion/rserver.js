const app = require('express')();
const parser = require("body-parser");
const fs = require("fs");
const dir = __dirname;
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
let emps = [];
function readData(){
    const filename = "data.json";
    const jsonContent = fs.readFileSync(filename, 'utf-8');
    emps = JSON.parse(jsonContent);
}

function saveData(){
    const filename = "data.json";
    const jsonData = JSON.stringify(emps);
    fs.writeFileSync(filename, jsonData, 'utf-8');
}
app.get("/emps", (req, res)=>{
    readData();
    res.send(JSON.stringify(emps));    
})

app.get("/emps/:id", (req, res)=>{
    const newName = req.params.id;
    if(emps.length == 0){
        readData();
    }
    let foundRec = emps.find((e) => e.newName == newName);
    if(foundRec == null)
        throw "Employee not found";
    res.send(JSON.stringify(foundRec))
})

app.put("/emps", (req, res)=>{
    if(emps.length == 0)
        readData();
    let body = req.body;
    for (let index = 0; index < emps.length; index++) {
        let h1 = emps[index];
        if (h1.empName == body.empName) {
            h1.empBranch = body.empBranch;
            h1.empDept = body.empDept;
            saveData();
            res.send("emp updated successfully");
        }
    }
})
app.post('/emps', (req, res)=>{
    if (emps.length == 0)
        readData();
    let body = req.body;
    emps.push(body);  
    saveData();
    res.send("Employee added successfully");
})
app.delete("/emps/:id", (req, res)=>{
  throw "Error";  
})

app.listen(1234, ()=>{
    console.log("Server available at 4567");
})