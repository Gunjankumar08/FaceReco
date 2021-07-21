# Generated by Django 3.2.2 on 2021-07-19 06:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('faceRecoApp', '0002_auto_20210719_1111'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employeeattendance',
            name='employee_id',
        ),
        migrations.AddField(
            model_name='employeeattendance',
            name='employee',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='employeeAttendance', to='faceRecoApp.employeesingup'),
        ),
    ]
