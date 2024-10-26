/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var empDBName = "Student-Table";
var empRelationName = "School-DB";
var connToken = "90934475|-31949222486190662|90962720";

$("#stuid").focus();

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno", lvData.rec_no);
}

function getEmpIdAsJsonObj() {
    var stuid = $("stuid").val();
    var jsonStr = {
        id: stuid
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#stuname").val(record.Name);
    $("#stuclass").val(record.class);
    $("#birth").val(record.BirthDate);
    $("#add").val(record.Address);
    $("#enroll").val(record.EnrollmentNo);
}

function resetForm() {
    $("#stuid").val("");
    $("#stuname").val("");
    $("#stuclass").val("");
    $("#birth").val("");
    $("#add").val("");
    $("#enroll").val("");
    $("#stuid").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#change").prop("disabled", true);
    $("#reset").prop("disabled", true);
    $("stuid").focus();
}

function validateData() {
    var stuid, stuname, stuclass, birth, add, enroll;
    stuid = $("#stuid").val();
    stuname = $("#stuname").val();
    stuclass = $("#stuclass").val();
    birth = $("#birth").val();
    add = $("#add").val();
    enroll = $("#enroll").val();
    
    if(stuid === ""){
        alert("Roll-no missing");
        $("#stuid").focus();
        return "" ;
    }
    if(stuname === ""){
        alert("Name missing");
        $("#stuname").focus();
        return "" ;
    }
    if(stuclass === ""){
        alert("class missing");
        $("#stuclass").focus();
        return "" ;
    }
    if(birth === ""){
        alert("Birth-Date missing");
        $("#birth").focus();
        return "" ;
    }
    if(add === ""){
        alert("Address missing");
        $("#add").focus();
        return "" ;
    }
    if(enroll === ""){
        alert("Enroll-date missing");
        $("#enroll").focus();
        return "" ;
    }
    
    var jsonStrObj = {
        RollNO: stuid,
        Name: stuname,
        class: stuclass,
        BirthDate: birth,
        Address: add,
        EnrollmentNo: enroll
    };
    return JSON.stringify(jsonStrObj);
}

function getEmp(){
    var empIdJsonObj = getEmpIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, empDBName, empRelationName, empIdJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if (resJsonObj.status === 400){
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#stuname").focus();
        
    } else if (resJsonObj.status === 200){
        
        $("#stuid").prop("disabled", true);
        fillData(resJsonObj);
        
        $("#change").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#stuname").focus();
    }
    
}

function saveData(){
    var jsonStrObj = validateData();
    if (jsonStrObj === ""){
        return "";
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, empDBName, empRelationName);
    jQuery.ajaxSetup({async: false});
     var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#stuid").focus();
}

function changeData(){
    $("#change").prop("disabled", true);
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, empDBName, empRelationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $("#stuid").focus();
}
    

    



