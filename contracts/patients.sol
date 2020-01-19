pragma solidity >= 0.5.0 < 0.7.0;

import "./safemath.sol";

/**
 * @title PatientManagement
 * @dev Stores patients data privately and provide functions to acess data
 */
contract PatientManagement{
    enum gender_type {Male, Female, Other}
    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16;
    using SafeMath8 for uint8;

    /**
    * @dev event: New patient data added to blockchain
    */
    event NewPatient(address patient_account,
                     uint patientID,
                     string patient_addr,
                     string name,
                     string phone,
                     string email,
                     uint32 dob,
                     string gender);
    struct Patient{
        address payable patient_account;
        string patient_addr;
        string name;
        string phone;
        string email;
        uint32 dob;
        gender_type gender;
    }

    Patient[] internal patients;
    mapping (address => uint) internal patientAddressToID;
    mapping(uint => uint) internal authorizations;

    /**
    * @dev add data of new patient to blockchain
    */
    function add_patient(string memory _address,
                         string memory _name,
                         string memory _phone,
                         string memory _email,
                         uint32 _dob,
                         string memory _gender)
             public
    {
        require((patients[patientAddressToID[msg.sender]].patient_account != msg.sender), "patient has already registered");
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
        uint id = patients.push(Patient(msg.sender, _address, _name, _phone, _email, _dob, sex)).sub(1);
        patientAddressToID[msg.sender] = id;
        emit NewPatient(msg.sender, id, _address, _name, _phone, _email, _dob, _gender);
    }

    /**
    * @dev Authorize doctor to view patients health report
    */
    function authorize(uint _did) public{
        uint pid = patientAddressToID[msg.sender];
        authorizations[_did] = pid;
    }

    /**
    * @dev show sender's profile if sender has registered
    */
    function show_patient_profile()
             public
             view
             returns(string memory _address,
                     string memory _name,
                     string memory _phone,
                     string memory _email,
                     string memory _gender,
                     uint32 _dob)
    {
        require((patients[patientAddressToID[msg.sender]].patient_account == msg.sender), "patient hasn't registered");
        Patient memory profile = patients[patientAddressToID[msg.sender]];
        _address = profile.patient_addr;
        _name = profile.name;
        _phone = profile.phone;
        _email = profile.email;
        _dob = profile.dob;
        if(profile.gender == gender_type.Male){
            _gender = "Male";
        }
        else if(profile.gender == gender_type.Female){
            _gender = "Female";
        }
        else{
            _gender = "Other";
        }
    }

    /**
    * @dev function for changing patient's profile on blockchain
    */
    function change_patient_profile(string memory _address,
                                    string memory _name,
                                    string memory _phone,
                                    string memory _email,
                                    uint32 _dob,
                                    string memory _gender)
             public
    {
        require((patients[patientAddressToID[msg.sender]].patient_account == msg.sender), "patient hasn't registered");
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
        uint id = patientAddressToID[msg.sender];
        patients[id].patient_addr = _address;
        patients[id].name = _name;
        patients[id].phone = _phone;
        patients[id].email = _email;
        patients[id].dob = _dob;
        patients[id].gender = sex;
    }

}