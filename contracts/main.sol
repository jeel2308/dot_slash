pragma solidity >= 0.5.0 < 0.7.0;

import "./safemath.sol";
import "./patients.sol";
import "./doctors.sol";

/**
 * @title MedicalReport
 * @dev Main contract which stores medical report of patient and provide functions to access it
 */
contract MedicalReport is PatientManagement, DoctorManagement{

    /**
    * @dev event: New report data added to blockchain
    */
    event NewReport(uint pid, string medicines, string remarks, string disease, uint date);

    struct Report{
        string medicines;
        string remarks;
        string disease;
        uint date;
    }

    /**
    * @dev only authorized doctor can use the function
    */
    modifier onlyAuthorized(uint _pid) {
        require(authorizations[doctorAddressToID[msg.sender]] == _pid, "doctor not authorized");
        _;
    }

    Report[] private reports;
    mapping(uint => uint) private reportToPatient;
    mapping(uint => uint) private patientReportCount;

    /**
    * @dev add patient's medical check up report to blockchain
    */
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

    /**
    * @dev get list of reportIDs if doctor is authorized
    */
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

    /**
    * @dev get list of reportIDs of the patient(sender)
    */
    function get_reports() public view returns(uint[] memory){
        uint _pid = patientAddressToID[msg.sender];
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

    /**
    * @dev show full report to doctor by reportID if doctor is authorized
    */
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

    /**
    * @dev show full report to doctor by reportID of patient
    */
    function show_report(uint rid)
        public
        view
        returns(string memory _medicines,
                string memory _remarks,
                string memory _disease,
                uint _date)
    {
        require(patients[reportToPatient[rid]].patient_account == msg.sender,
                "sender is not authorized");
        _medicines = reports[rid].medicines;
        _remarks = reports[rid].remarks;
        _disease = reports[rid].disease;
        _date = reports[rid].date;
    }
}