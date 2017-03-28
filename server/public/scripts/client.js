var whichEmployee;
var editing = false;

$(document).ready(function()
{
  getEmployees();

  $("#newForm").on("submit", function(event)
  {
    event.preventDefault();
    var newSalary;
    if(editing)
    {
      console.log(whichEmployee);
      newSalary = $("#newSalary").val();
      console.log(newSalary);
      $.ajax(
        {
          type: "PUT",
          data: {salary: newSalary},
          url: "employees/edit/" + whichEmployee,
          success: function(res)
          {
            getEmployees();
          }
        });
    }
    else
    {
      var newEmployee = $("#newEmployee").val();
      var newPosition = $("#newPosition").val();
      newSalary = $("#newSalary").val();
          $.ajax(
            {
              type: "POST",
              url: "employees/add",
              data: {name: newEmployee, position: newPosition, salary: newSalary},
              success: function(res)
              {
                getEmployees();
                $("#newEmployee").val("");
                $("#newPosition").val("");
                $("#newSalary").val("");
              }
            });
    }
  });

  $("#employeesDiv").on("click", ".delete", function()
  {
    whichEmployee = $(this).parent().parent().data("employee");
    feelingSure = confirm("Are you sure?");
    if(feelingSure)
    {
      deleteEmployees();
    }
  });

  $("#employeesDiv").on("click", ".edit", function()
  {
    editing = true;
    whichEmployee = $(this).parent().parent().data("employee");
  });

//end of DocReady
});


function getEmployees()
{
  $.ajax(
    {
      type: "GET",
      url: "/employees",
      success: function(res)
      {
        $("#employeesDiv").empty();
        for(var i = 0; i < res.length; i++)
        {
          var employee = res[i];
          console.log(employee._id);
            $("#employeesDiv").append("<tr data-employee=" + employee._id + ">");
            var $el1 = $("#employeesDiv").children().last();
            $el1.append("<td class='nameBox'>" + employee.name + "</td>");
            $el1.append("<td class='positionBox'>" + employee.position + "</td>");
            $el1.append("<td class='salaryBox'>" + employee.salary + "</td>");
            $el1.append("<td><button class='delete' data-employee='" +
                        employee._id +
                      "'>Delete</button></td>");
            $el1.append("<td><button class='edit' data-employee='" +
                        employee._id +
                      "'>Edit Salary</button></td>");

        }
      }
    });
}

function deleteEmployees()
{
  $.ajax(
    {
      type: "DELETE",
      url: "employees/delete/" + whichEmployee,
      success: function(res)
      {
        getEmployees();
      }
    });
}
