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
    struct Hospitals{
        address hospital_id;
        string name;
        string phone;
        string email;
        string h_address;
        uint16 established_since;
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
    mapping (address => address) public doc_hospital;
    Doctor[] public doctors;

    function spec_to_doc(string memory _specialization) public view returns(uint[] memory _docs){
        for(uint i = 0; i<doctors.length; i++){
            uint counter = 0;
            if(uint(keccak256(abi.encodePacked(doctors[i].specialization))) == uint(keccak256(abi.encodePacked(_specialization)))){
                _docs[counter] = i;
                counter++;
            }
        }
    }
}