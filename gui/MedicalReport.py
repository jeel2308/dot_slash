from web3 import Web3, HTTPProvider
from web3.contract import Contract
from time import time
import json

patient_address = "0xB806ad5F2120279A8Ac4350BD6F9D3a18f5603aC"
doctor_address = "0xd31D1963cfb38043647B6AB422D11eAA87faa2e7"
main_address = "0x3CED8583351f7d0F4088B8347ea3aB21e5d0c3DE"
    
w3 = Web3(HTTPProvider('http://localhost:8545'))
w3.eth.defaultAccount = w3.eth.accounts[2]

if(patient_address):
    with open("../build/contracts/PatientManagement.json") as f:
        data = json.load(f)
    Patient = w3.eth.contract(address=patient_address, abi=data["abi"], bytecode=data["bytecode"])
    tx_hash = Patient.constructor().transact()
    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)

if(doctor_address):
    with open("../build/contracts/DoctorManagement.json") as f:
        data = json.load(f)
    Doctor = w3.eth.contract(address=doctor_address, abi=data["abi"], bytecode=data["bytecode"])
    tx_hash = Patient.constructor().transact()
    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)

if(main_address):
    with open("../build/contracts/MedicalReport.json") as f:
        data = json.load(f)
    Main = w3.eth.contract(address=main_address, abi=data["abi"], bytecode=data["bytecode"])
    tx_hash = Patient.constructor().transact()
    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
 
    
def authorize(_doctorID):
    tx_hash = Patient.functions.authorize(_doctorID).transact()
    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
    return tx_receipt

def add_patient(_address, _name, _phone, _email, _dob, _gender):
    tx_hash = Patient.functions.add_patient(_address, _name, _phone, _email, _dob, _gender).transact()
    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
    return tx_receipt

def show_patient_profile():
    data = Patient.functions.show_patient_profile().call()
    return dict(zip(("address", "name", "phone", "email", "gender", "dob"), data))

def spec_to_doc(_specialization):
    docs = []
    arr = Doctor.functions.spec_to_doc(_specialization).call()
    for i in arr:
        docs.append(id_to_doc(i))
    return docs
        
def id_to_doc(_id):
    header = ("doctorID", "name", "phone", "email", "specialization", "expirence_years",
              "avg_rating", "first_time_fee", "recurring_fee")
    return dict(zip(header, Doctor.functions.doctors(_id).call()))

def add_doc(_name, _phone, _email, _spec, _exp_yrs, _hid, _first_time_fee, _recurring_fee):
    tx_hash = Doctor.functions.add_doc(_name, _phone, _email, _spec, _exp_yrs, _hid, _first_time_fee, _recurring_fee).transact()
    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
    return tx_receipt

def add_hospital(_name, _phone, _email, _h_address, _est_since):
    tx_hash = Doctor.functions.add_hospital(_name, _phone, _email, _h_address, _est_since).transact()
    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
    return tx_receipt 

def add_patient_reports(_pid, _medicines, _remarks, _disease, _date):
    tx_hash = Main.functions.add_patient_reports(_pid, _medicines, _remarks, _disease, _date).transact()
    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
    return tx_receipt   

def get_reports(_pid = None):
    reports = []
    if(_pid):
        arr = Main.functions.get_reports(_pid).call()
        for i in arr:
            reports.append(dict(zip(("medicines", "remarks", "disease", "date"), Main.functions.show_report(_pid, i).call())))
    else:
        arr = Main.functions.get_reports().call()
        for i in arr:
            reports.append(dict(zip(("medicines", "remarks", "disease", "date"), Main.functions.show_report(i).call())))
    return reports

def change_doc_profile(_name, _phone, _email, _spec, _exp_yrs, _hid, _first_time_fee, _recurring_fee):
    tx_hash = Doctor.functions.change_doc_profile(_name, _phone, _email, _spec, _exp_yrs, _hid, _first_time_fee, _recurring_fee).transact()
    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
    return tx_receipt

def change_hospital_profile(_name, _phone, _email, _h_address, _est_since):
    tx_hash = Doctor.functions.change_hospital_profile(_name, _phone, _email, _h_address, _est_since).transact()
    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
    return tx_receipt 

def change_patient_profile(_address, _name, _phone, _email, _dob, _gender):
    tx_hash = Patient.functions.change_patient_profile(_address, _name, _phone, _email, _dob, _gender).transact()
    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
    return tx_receipt

if __name__ == "__main__":
    # print(add_patient("zoom", "hh", "hdhd", "6dhdnj", 79999, "Male"))
    # print(add_patient("zoom", "hh", "hdhd", "6dhdnj", 79999, "Male"))
    # print(add_hospital("hjjj", "89000", "gdjsjs", "jdjdnn", 89))
    print(Doctor.functions.doctors(0).call())
    # print(add_doc("hello", "4748390", "ydh%nff", "749", 90, 0, 4, 2))
    
    # print()
    # import doctest
    # doctest.testmod()