pragma solidity >= 0.5.0 < 0.7.0;

import "./safemath.sol";

/**
 * @title DoctorManagement
 * @dev Stores doctors data publicly and provide functions to acess data conviniently
 */
contract DoctorManagement{
    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16;
    using SafeMath8 for uint8;

    /**
    * @dev event: New doctor data added to blockchain
    */
    event NewDoctor(uint doctorID,
                    string name,
                    string phone,
                    string email,
                    string spec,
                    uint8 expr_yrs,
                    uint8 avg_rating,
                    uint first_time_fee,
                    uint recurring_fee);

    /**
    * @dev event: New hospital data added to blockchain
    */
    event NewHospital(uint HospitalID,
                      string name,
                      string phone,
                      string email,
                      string h_addr,
                      uint16 est_since,
                      uint16 total_docs,
                      uint8 avg_rating);
    struct Doctor{
        address payable doctor_account;
        string name;
        string phone;
        string email;
        string specialization;
        uint8 experience_yrs;
        uint8 avg_rating;
        uint first_time_fee;
        uint recurring_fee;
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
    mapping (address => uint) internal doctorAddressToID;
    mapping (string => uint) public specializedDoctorCount;
    mapping(address => bool) public isDoctor;
    Doctor[] public doctors;
    Hospital[] public hospitals;

    /**
    * @dev list of doctors by specializations
    */
    function spec_to_doc(string memory _specialization)
             public
             view
             returns(uint[] memory)
    {
        uint[] memory docs = new uint[](specializedDoctorCount[_specialization]);
        for(uint i = 0; i<doctors.length; i += i.add(1)){
            uint counter = 0;
            if(uint(keccak256(abi.encodePacked(doctors[i].specialization))) == uint(keccak256(abi.encodePacked(_specialization)))){
                docs[counter] = i;
                counter += counter.add(1);
            }
        }
        return docs;
    }

    /**
    * @dev add data of new doctor to blockchain
    */
    function add_doc(string memory _name,
                     string memory _phone,
                     string memory _email,
                     string memory _spec,
                     uint8 _exp_yrs,
                     uint _hid,
                     uint _first_time_fee,
                     uint _recurring_fee
                     )
             public
    {
        require(!(doctorAddressToID[msg.sender] == 0 && doctors.length > 0), "Doctor already registered");
        uint id = doctors.push(Doctor(msg.sender,
                                      _name,
                                      _phone,
                                      _email,
                                      _spec,
                                      _exp_yrs,
                                      0,
                                      _first_time_fee,
                                      _recurring_fee)).sub(1);
        doctorToHospital[id] = _hid;
        hospitals[_hid].total_doctors = hospitals[_hid].total_doctors.add(1);
        doctorAddressToID[msg.sender] = id;
        specializedDoctorCount[_spec] = specializedDoctorCount[_spec].add(1);
        isDoctor[msg.sender] = true;
        emit NewDoctor(id, _name, _phone, _email, _spec, _exp_yrs, 0, _first_time_fee, _recurring_fee);
    }

    /**
    * @dev add data of new hospital to blockchain
    */
    function add_hospital(string memory _name,
                          string memory _phone,
                          string memory _email,
                          string memory _h_address,
                          uint16 _est_since)
             public
    {
        require(hospitals.length > 0, "Patient already registered");
        // check duplicate hospital in frontend cause gas expensive
        uint id = hospitals.push(Hospital(_name, _phone, _email, _h_address, _est_since, 0, 0)).sub(1);
        emit NewHospital(id, _name, _phone, _email, _h_address, _est_since, 0, 0);
    }
}