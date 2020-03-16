//store our requirements
const inquire = require("inquirer");
const mysql = require("mysql");
const ctable = require("console.table");

//our answer choices strings
//for queryUser();
const TEXT_ADD = "Add";
const TEXT_VIEW = "View";
const TEXT_UPDATE = "Update";
//for add(); and view();
const TEXT_DEPARTMENT = "Department";
const TEXT_ROLE = "Role";
const TEXT_EMPLOYEE = "Employee";
//for update();
const TEXT_YES = "yes";
const TEXT_NO = "no";

//setup the connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Stonehammers",
    database: "cms_DB"
})

//start the connection and prompt the user for how they want to use the table
connection.connect(function(error){
    if(error) throw error;

    console.log("Connected with ID: ", connection.threadId);

    queryUser();
});

function queryUser(){
    inquire.prompt({
        name: "action",
        type: "list",
        message: "Would you like to Add, View, or Update?",
        choices: [TEXT_ADD, TEXT_VIEW, TEXT_UPDATE]
    }).then(function(response){
        
        //this switch function should handle responses to the first question about adding, viewing, and updating
        switch(response.action){
            case TEXT_ADD:
                add();
                break;
            case TEXT_VIEW:
                view();
                break;
            case TEXT_UPDATE:
                update();
                break;
            default:
                console.log("This text shouldn't appear, there is something wrong with the queryUser() prompt or the switch after.");
        }
    });
}

//the function that gets called when the user selects to add something in the program
function add(){
    inquire.prompt({
        name: "action",
        type: "list",
        message: "Add a department, role, or employee?",
        choices: [TEXT_DEPARTMENT, TEXT_ROLE, TEXT_EMPLOYEE]
    }).then(function(response){

        //switch function to chose which add function to employ
        switch(response.action){
            case TEXT_DEPARTMENT:
                //externalfile.addDepartment();
                console.log("Department added!");
                break;
            case TEXT_ROLE:
                //externalfile.addRole();
                console.log("Role added!");
                break;
            case TEXT_EMPLOYEE:
                //externalfile.addEmployee();
                console.log("Employee added!");
                break;
            default:
                console.log("This text shouldn't appear, something's wrong with the add() prompt, or the switch after.")
        }
        queryUser();
    });
}

//similar to add, a function that views the table requested
function view(){
    inquire.prompt({
        name: "action",
        type: "list",
        message: "View departments, roles, or employees?",
        choices: [TEXT_DEPARTMENT, TEXT_ROLE, TEXT_EMPLOYEE]
    }).then(function(response){

        //switch function to chose which table to view
        switch(response.action){
            case TEXT_DEPARTMENT:
                console.log("Departments Table!");
                break;
            case TEXT_ROLE:
                console.log("Role Table!");
                break;
            case TEXT_EMPLOYEE:
                console.log("Employee Table!");
                break;
            default:
                console.log("This text shouldn't appear, something's wrong with the view() prompt, or the switch after.")
        }
        queryUser();
    });
}

//update function that gets called when the user chooses to update, displays a yes or no confirmation
function update(){
    inquire.prompt({
        name: "action",
        type: "list",
        message: "Update employee(s)?",
        choices: [TEXT_YES, TEXT_NO]
    }).then(function(response){
        switch(response.action){
            case TEXT_YES:
                console.log("Employee updated!");
                break;
            case TEXT_NO:
                console.log("Employees unchanged!");
                break;
            default:
                console.log("This text shouldn't appear, something's wrong with the update() prompt, or the switch after");
        }
        queryUser();
    });
}