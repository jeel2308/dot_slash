pragma solidity >= 0.5.0 < 0.7.0;

import "./safemath.sol";

contract PatientManagement{
    enum gender_type {Male, Female, Other}
    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16;
    using SafeMath8 for uint8;

    event NewPatient(uint patientID, address patient_addr, string name, string phone, string email, uint32 dob, string gender);

    struct Patient{
        address patient_addr;
        string name;
        string phone;
        string email;
        uint32 dob;
        gender_type gender;
    }

    Patient[] private patients;

    function add_patient(string memory _name, string memory _phone, string memory _email, uint32 _dob, string memory _gender) public{
        gender_type sex;
        if(uint(keccak256(abi.encodePacked(_gender))) == uint(keccak256(abi.encodePacked("Male")))){
            sex = gender_type.Male;
        }
        else if(uint(keccak256(abi.encodePacked(_gender))) == uint(keccak256(abi.encodePacked("Female")))){
            sex = gender_type.Female;
        }
        else{
            sex = gender_type.Other;
        }
        uint id = patients.push(Patient(msg.sender, _name, _phone, _email, _dob, sex));
        emit NewPatient(id, msg.sender, _name, _phone, _email, _dob, _gender);
    }

}