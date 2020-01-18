pragma solidity >= 0.5.0 < 0.7.0;

import "./safemath.sol";

contract PatientManagement{
    enum gender_type {Male, Female}
    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16;
    using SafeMath8 for uint8;
    struct Patient{
        address patient_addr;
        string name;
        string phone;
        string email;
        uint32 dob;
        gender_type gender;
    }

    Patient[] private patients;
}