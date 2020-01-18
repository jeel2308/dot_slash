pragma solidity >= 0.5.0 < 0.7.0;

import "./safemath.sol";

contract HospitalManagement{
    enum gender_type {Male, Female, Other}
    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16;
    using SafeMath8 for uint8;

    event NewDoctor(uint doctorID, string name, string phone, string email, string spec, uint8 expr_yrs, uint8 avg_rating);
    event NewHospital(uint HospitalID, string name, string phone, string email, string h_addr, uint16 est_since, uint16 total_docs, uint8 avg_rating);
    struct Doctor{
        string name;
        string phone;
        string email;
        string specialization;
        uint8 experience_yrs;
        uint8 avg_rating;
    }
    struct Hospital{
        string name;
        string phone;
        string email;
        string h_address;
        uint16 established_since;
        uint16 total_doctors;
        uint8 avg_rating;
    }

    mapping (uint => uint) public doctorToHospital;
    mapping (uint => uint) public hospitalDoctorCount;
    mapping (address => uint) private doctorAddressToID;
    Doctor[] public doctors;
    Hospital[] public hospitals;

    function spec_to_doc(string memory _specialization) public view returns(uint[] memory){
        uint[] memory docs;
        for(uint i = 0; i<doctors.length; i++){
            uint counter = 0;
            if(uint(keccak256(abi.encodePacked(doctors[i].specialization))) == uint(keccak256(abi.encodePacked(_specialization)))){
                docs[counter] = i;
                counter++;
            }
        }
        return docs;
    }
    function add_doc(string memory _name, string memory _phone, string memory _email, string memory _spec, uint8 _exp_yrs, uint _hid) public{
        uint id = doctors.push(Doctor(_name, _phone, _email, _spec, _exp_yrs, 0));
        doctorToHospital[id] = _hid;
        hospitalDoctorCount[_hid] = hospitalDoctorCount[_hid].add(1);
        doctorAddressToID[msg.sender] = id;
        emit NewDoctor(id, _name, _phone, _email, _spec, _exp_yrs, 0);
    }
    function add_hospital(string memory _name, string memory _phone, string memory _email, string memory _h_address, uint16 _est_since, uint16 _total_docs, uint8 _avg_rating) public{
        uint id = hospitals.push(Hospital(_name, _phone, _email, _h_address, _est_since, 0, 0));
        emit NewHospital(id, _name, _phone, _email, _h_address, _est_since, 0, 0);
    }
}