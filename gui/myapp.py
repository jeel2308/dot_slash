import sys
import MedicalReport as ehr
from PyQt5.QtWidgets import QApplication
from PyQt5 import uic

form1, base1 = uic.loadUiType("front.ui")
form2, base2 = uic.loadUiType("patient.ui")

class PatientProfile(base2, form2):
    def __init__(self):
        super(base1, self).__init__()
        self.setupUi(self)
        self.buttonBox.accepted.connect(self.accept)
        self.buttonBox.rejected.connect(self.reject)
    def accept(self):
        pass
    def reject(pass):
        pass

class FrontPage(base1, form1):
    def __init__(self):
        super(base1, self).__init__()
        self.setupUi(self)
        self.patientButton.clicked.connect(self.patient_redirect)
        self.doctorButton.clicked.connect(self.doctor_redirect)
    
    def patient_redirect(self):
        pass
        # d = ehr.show_patient_profile()
        # if(d):
        #     self.patientTextBrowser = PatientProfile(self)
        #     self.dialogTextBrowser.exec_()
    def doctor_redirect(self):
        pass
    
if __name__ == '__main__':
    app =   QApplication(sys.argv)
    front = FrontPage()
    front.show()
    sys.exit(app.exec_())