pragma solidity >= 0.5.0 < 0.7.0;

import "./safemath.sol";

contract PatientManagement{
    enum gender_type {Male, Female, Other}
    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16;
    using SafeMath8 for uint8;

    event NewPatient(uint patientID, string patient_addr, string name, string phone, string email, uint32 dob, string gender);

    struct Patient{
        string patient_addr;
        string name;
        string phone;
        string email;
        uint32 dob;
        gender_type gender;
    }

    Patient[] internal patients;
    mapping (address => uint) internal patientAddressToID;

    function add_patient(string memory _address, string memory _name, string memory _phone, string memory _email, uint32 _dob, string memory _gender) public{
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
        uint id = patients.push(Patient(_address, _name, _phone, _email, _dob, sex));
        patientAddressToID[msg.sender] = id;
        emit NewPatient(id, _address, _name, _phone, _email, _dob, _gender);
    }

}