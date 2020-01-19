import sys
import MedicalReport as ehr
from PyQt5.QtWidgets import QApplication
from PyQt5 import uic
import datetime

form1, base1 = uic.loadUiType("front.ui")
form2, base2 = uic.loadUiType("patient.ui")
form3, base3 = uic.loadUiType("patient_dashboard.ui")
form4, base4 = uic.loadUiType("doctor.ui")
form5, base5 = uic.loadUiType("doctor_dashboard.ui")
form6, base6 = uic.loadUiType("hospital.ui")

patient_data = {}

class PatientProfile(base2, form2):
    def __init__(self):
        super(base1, self).__init__()
        self.setupUi(self)
        self.buttonBox.accepted.connect(self.accept)
        self.buttonBox.rejected.connect(self.reject)
        
    def accept(self):
        patient_data["name"] = self.name.text()
        patient_data["address"] = self.address.text()
        patient_data["phone"] = self.phone.text()
        patient_data["email"] = self.email.text()
        patient_data["date"] = self.dateEdit.date().toPyDateTime().strftime('%s')
        if(self.male):
            patient_data["gender"] = "Male"
        elif(self.female):
            patient_data["gender"] = "Female"
        else:
            patient_data["gender"] = "Other"
             
    def reject(self):
        pass # redirect to dashboard
    
class PatientDashboard(base3, form3):
    def __init__(self):
        super(base1, self).__init__()
        self.setupUi(self)

class FrontPage(base1, form1):
    def __init__(self):
        super(base1, self).__init__()
        self.setupUi(self)
        self.patientButton.clicked.connect(self.patient_redirect)
        self.doctorButton.clicked.connect(self.doctor_redirect)
    
    def patient_redirect(self):
        d = ehr.show_patient_profile()
        if(d):
            self.patientpage = PatientDashboard()
            self.patientpage.show()
            self.hide()
        else:
            self.patientpage = PatientProfile()
            self.patientpage.show()
            self.hide()
    def doctor_redirect(self):
        d = ehr.show_doctor_profile()
        if(d):
            self.doctorpage = DoctorDashboard()
            self.doctorpage.show()
            self.hide()
        else:
            self.doctorpage = DoctorProfile()
            self.doctorpage.show()
            self.hide()
    
if __name__ == '__main__':
    app =   QApplication(sys.argv)
    front = FrontPage()
    front.show()
    sys.exit(app.exec_())