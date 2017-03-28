var express = require("Express");
var router = express.Router();
var mongoose = require("mongoose");

var EmployeeSchema = mongoose.Schema({
  name : String,
  position : String,
  salary : Number
});

var Employees = mongoose.model("Employees", EmployeeSchema);

router.get("/", function(req, res)
{
  Employees.find(function(err, allEmployees)
  {
    if(err)
    {
      console.log(err);
      res.sendStatus(500);
    }
    else
    {
      res.send(allEmployees);
    }
  });
});

router.post("/add", function(req, res)
{
  var employee = new Employees();
  employee.id = req.body.id;
  employee.name = req.body.name;
  employee.position = req.body.position;
  employee.salary = req.body.salary;
  employee.save(function(err, savedEmployee)
  {
    if(err)
    {
      console.log(err);
      res.sendStatus(500);
    }
    else
    {
      res.send(savedEmployee);
    }
  });
});

router.delete("/delete/:id", function(req, res)
{
  var id = req.params.id;
  Employees.findByIdAndRemove(id, function(err, deletedEmployee)
  {
    if(err)
    {
      console.log(err);
      res.sendStatus(500);
    }
    else
    {
      res.send(deletedEmployee);
    }
  });
});

router.put("/edit/:id", function(req, res)
{
  var id = req.params.id;
  Employees.findById(req.params.id, function(err, updatedEmployee)
  {
    if(err)
    {
      console.log(err);
      res.sendStatus(500);
    }
    else
    {
      updatedEmployee.salary = req.body.salary || updatedEmployee.salary;
      updatedEmployee.save(function(err, updatedEmployee)
      {
        if(err)
        {
          console.log(err);
          res.sendStatus(500);
        }
        else
        {
          res.send(updatedEmployee);
        }
      });
    }
  });
});


module.exports = router;
