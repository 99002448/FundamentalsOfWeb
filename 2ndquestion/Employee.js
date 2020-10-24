const app = require('express')();
const parser = require("body-parser");
const fs = require("fs");
const dir = __dirname;
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
let hotels = [];
function readData(){
    const filename = "empData.json";//new file... 
    const jsonContent = fs.readFileSync(filename, 'utf-8');
    hotels = JSON.parse(jsonContent);
}
function saveData(){
    const filename = "empData.json";
    const jsonData = JSON.stringify(emps);
    fs.writeFileSync(filename, jsonData, 'utf-8');
}
app.get("/hotels", (req, res)=>{
    readData();
    res.send(JSON.stringify(emps));    
})
app.get("/emps/:id", (req, res)=>{
    const hotelid = req.params.id;
    if(emps.length == 0){
        readData();
    }
    let Record = emps.find((d) => d.empId == empid);
    if(Record == null)
        throw "Employee not found";
    res.send(JSON.stringify(Record))
})
app.put("/hotels", (req, res)=>{
    if(emps.length == 0)
        readData();
    let body = req.body;
    for (let index = 0; index < emps.length; index++) {
        let element =emps[index];
        if (element.empId == body.empId) {
            element.empName = body.empName;
            element.empBranch = body.empBranch;
            element.empDept = body.empDept;
            saveData();
            res.send("Employee updated successfully");
        }
    }
    
})
app.post('/emps', (req, res)=>{
    if (emps.length == 0)
        readData();
    let body = req.body;
    emps.push(body);  
    saveData();
    res.send("Employees added successfully");
})
app.delete("/emps/:id", (req, res)=>{
    const empid = req.params.id;
    if(emps.length == 0){
        readData();
    }
    let Record = emps.find((d) => d.empId == empid);
    let index = emps.indexOf(Record)
    emps.splice(index,1);
    res.send("Employees deleted Successfully");
})

app.listen(4567, ()=>{
    console.log("Server available at 4567");
})
