pragma solidity >= 0.5.0 < 0.7.0;

contract HospitalManagement{
    enum gender_type {Male, Female}
    struct Doctor{
        address doctor_id;
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
    struct Patients{
        address patient_id;
        string name;
        string phone;
        string email;
        uint32 dob;
        gender_type gender;
    }
    mapping (uint => uint) public doctorToHospital;
    mapping (uint => uint) public hospitalDoctorCount;
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
    function add_doc(string memory _name, string memory _phone, string memory _email, string memory _spec, uint8 _exp_yrs, uint _hid) internal{
        uint id = doctors.push(Doctor(msg.sender, _name, _phone, _email, _spec, _exp_yrs, 0));
        doctorToHospital[id] = _hid;
        hospitalDoctorCount[_hid]++;
    }
}