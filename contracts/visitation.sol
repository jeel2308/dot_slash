pragma solidity >= 0.5.0 < 0.7.0;

import "./safemath.sol";

contract MedicalReport{
    struct Report{
        string medicines;
        string remarks;
        string disease;
        uint date;
    }

    Report[] private reports;
    mapping(uint => mapping(uint => uint)) private patientReports;

    function add_patient_reports(uint _pid, uint _did, string memory _medicines, string memory _remarks, string memory _disease, uint _date) public{
        uint id = reports.push(Report(_medicines, _remarks, _disease, _date));
        patientReports[_pid][_did] = id;
    }

}