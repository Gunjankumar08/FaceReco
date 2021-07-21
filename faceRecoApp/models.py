from django.db import models
from time import time
from django.utils import timezone
import datetime
def getDisplayImagePath(instance , filename):
    return 'static/images/%s_%s' % (str(time()).replace('.', '_'), filename)

def getDisplayEmployeeAttendanceImagePath(instance , filename):
    return 'static/images/%s_%s' % (str(time()).replace('.', '_'), filename)
class EmployeeSingup(models.Model):
    created = models.DateField(auto_now_add = True)
    user_email = models.EmailField(max_length=50 , null = True)
    first_name = models.CharField(max_length=50 , null = True)
    last_name = models.CharField(max_length=50 , null = True)
    group_name = models.CharField(max_length=50 , null = True)
    employee_id = models.CharField(max_length=500 , null = True)
    imagePath = models.FileField (upload_to = getDisplayImagePath , null = True)


class EmployeeAttendance(models.Model):
    employee = models.ForeignKey(EmployeeSingup, related_name='employeeAttendance',null=True,blank=False,on_delete=models.CASCADE)
    # employee_id = models.CharField(max_length=500 , null = True)
    marked_time = models.DateTimeField(auto_now_add = True)
    imagePath = models.FileField(upload_to = getDisplayEmployeeAttendanceImagePath , null = True)
    empMessage = models . TextField (max_length = 5000 , null=True)
    empAddress = models . TextField (max_length = 5000 , null=True)
    empDeviceInfo = models . CharField (max_length = 200 , null=True)
