from __future__ import unicode_literals
from rest_framework import viewsets  , serializers,permissions
from django.shortcuts import render
from django.shortcuts import render, redirect , get_object_or_404
from .models import *
from .serializers import *
from url_filter.integrations.drf import DjangoFilterBackend
import django_filters.rest_framework
from django.http import HttpResponse
from rest_framework.views import APIView
from django.db.models import Q
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator


def Home(request):
    return render(request, 'app.main.html')
#
# def renderedStatic(request , filename):
#     # print (filename)
#     return render(request , filename , {})
class EmployeeSingupViewSet(viewsets.ModelViewSet):
    # permission_classes = (permissions.AllowAny,)
    serializer_class = EmployeeSingupSerializer
    queryset = EmployeeSingup.objects.all()
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['employee_id']

import base64

def image_capture(request):
    if request.method == 'POST':

        print(request,"requestttt")

        data = request.POST.get('imagePath')
        print(data,"dafafa")
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        user_email = request.POST.get('user_email')
        group_name = request.POST.get('group_name')
        modify_name = first_name.replace(" ", "_")
        employee_id = request.POST.get('employee_id')


        #format, imgstr = data.split(';base64,')
        #ext = format.split('/')[-1]
        print(data)
        split_base_url_data = data.split(';base64,')[1]

        imgdata = base64.b64decode(split_base_url_data)

        filename = 'H:\Ekfrazo\FaceReco\static\images/'+first_name+'.mp4'
        fname = 'https://saga.taitech.in/static/uploaded_images/'+modify_name+'.mp4'
        with open(filename, 'wb') as f:
            f.write(imgdata)

        data = EmployeeSingup.objects.create( first_name= first_name,last_name=last_name,imagePath= fname, employee_id= employee_id,user_email=user_email, group_name=group_name)
        html = '<html><body> <h2>Employee created successfully.</h2>  </body></html>'
        return HttpResponse(html)
    return render(request, 'EmployeeSingup.html')


def Delete(request):
    if request.method=="POST":
        datas=request.POST.get('employee_id')
        user_email=request.POST.get('user_email')
        group_name=request.POST.get('group_name')
        print(datas,"empid")
        print(user_email,"user_email")
        print(group_name,"group_name")


        EmpData=EmployeeSingup.objects.filter(employee_id__iexact=datas,user_email__iexact=user_email,group_name__iexact=group_name)

        if not EmpData:
            html = '<html><body> <h2>Data Not Found.</h2><br> </body></html>'
            return HttpResponse(html)
        else:
            EmpData.delete()

            html = '<html><body> <h2>Employee Deleted successfully.</h2>  </body></html>'
            return HttpResponse(html)
    else:
        return render(request, 'DeleteTraining.html')
# class EmployeeSingupApiView(APIView):
#     def delete(self,request, pk,format=None):
#         val=pk
#         empObj = EmployeeSingup.objects.all()
#         print(empObj)
#         # empObj.delete()
#         return HttpResponse('deleted')

# @method_decorator(csrf_exempt ,name='dispatch')
class EmployeeAttendanceViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)
    serializer_class = EmployeeAttendanceSerializer
    queryset = EmployeeAttendance.objects.all()
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['employee','empMessage']

def Employee_Attendance(request):

    if request.method == 'POST':

        print(request,"requestttt")

        data = request.POST.get('imagePath')
        print(data,"imageeee")
        empMessage = request.POST.get('empMessage')
        empAddress = request.POST.get('empAddress')
        # user_email = request.POST.get('user_email')
        # group_name = request.POST.get('group_name')
        modify_name = empMessage.replace(" ", "_")
        employee_id=EmployeeSingup.objects.get(id=request.POST['employee'])
        print(employee_id.first_name,"idddd")


        #format, imgstr = data.split(';base64,')
        #ext = format.split('/')[-1]

        split_base_url_data = data.split(';base64,')[1]

        imgdata = base64.b64decode(split_base_url_data)

        filename = 'H:\Ekfrazo\FaceReco\static\images/'+empMessage+'.mp4'
        fname = 'https://saga.taitech.in/static/uploaded_images/'+modify_name+'.mp4'
        with open(filename, 'wb') as f:
            f.write(imgdata)

        data = EmployeeAttendance.objects.create(empMessage= empMessage,empAddress=empAddress,imagePath= fname,employee=employee_id)
        html = '<html><body> <h2>Employee Attendance added successfully.</h2>  </body></html>'
        return HttpResponse(html)
    return render(request, 'EmployeeAttendance.html')
