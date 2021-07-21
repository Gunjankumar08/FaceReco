from rest_framework import serializers
from rest_framework.exceptions import *
from .models import *


class EmployeeSingupSerializer(serializers.ModelSerializer):
    class Meta:
        model=EmployeeSingup
        fields=['pk','created','user_email','first_name','last_name','group_name','employee_id','imagePath']


class EmployeeAttendanceSerializer(serializers.ModelSerializer):
    employee = EmployeeSingupSerializer(many=False , read_only=True)

    class Meta:
        model=EmployeeAttendance
        fields=['pk','employee','marked_time','imagePath','empMessage','empAddress','empDeviceInfo']
    def create(self , validated_data):
        a = EmployeeAttendance.objects.create(**validated_data)
        a.employee = EmployeeSingup.objects.get(pk = int(self.context['request'].data['employee']))
        a.save()
        return a
    def update(self ,instance, validated_data):
        for key in ['marked_time','imagePath','empMessage','empAddress','empDeviceInfo']:
            try:
                setattr(instance , key , validated_data[key])
            except:
                pass
        instance.employee = EmployeeSingup.objects.get(pk = int(self.context['request'].data['employee']))

        instance.save()
        return instance
