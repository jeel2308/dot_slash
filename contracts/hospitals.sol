pragma solidity >= 0.5.0 < 0.7.0;

contract HospitalManagement{
    enum gender_type {Male, Female}
    struct Doctors{
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

    function()
}