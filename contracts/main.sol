pragma solidity >= 0.5.0 < 0.7.0;

import "./safemath.sol";
import "./patients.sol";
import "./doctors.sol";

contract MedicalReport is PatientManagement, DoctorManagement{

    event NewReport(uint pid, string medicines, string remarks, string disease, uint date);

    struct Report{
        string medicines;
        string remarks;
        string disease;
        uint date;
    }

    modifier onlyAuthorized(uint _pid) {
        require(authorizations[doctorAddressToID[msg.sender]] == _pid, "doctor not authorized");
        _;
    }

    Report[] private reports;
    mapping(uint => uint) private reportToPatient;
    mapping(uint => uint) private patientReportCount;
    function add_patient_reports(uint _pid,
                                 string memory _medicines,
                                 string memory _remarks,
                                 string memory _disease,
                                 uint _date)
            public
            onlyAuthorized(_pid)
    {
        uint id = reports.push(Report(_medicines, _remarks, _disease, _date));
        reportToPatient[id] = _pid;
        patientReportCount[_pid] = patientReportCount[_pid].add(1);
        emit NewReport(_pid, _medicines, _remarks, _disease, _date);
    }
    function get_reports(uint _pid) public view onlyAuthorized(_pid) returns(uint[] memory){
        uint counter = 0;
        uint[] memory result = new uint[](patientReportCount[_pid]);
        for(uint i = 0; i<reports.length; i++){
            if(reportToPatient[i] == _pid){
                result[counter];
                counter++;
            }
        }
        return result;
    }
    function show_report(uint _pid, uint rid)
        public
        view
        onlyAuthorized(_pid)
        returns(string memory _medicines,
                string memory _remarks,
                string memory _disease,
                uint _date)
    {
        _medicines = reports[rid].medicines;
        _remarks = reports[rid].remarks;
        _disease = reports[rid].disease;
        _date = reports[rid].date;
    }
}