"""myproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url,include
from django.contrib import admin
from faceRecoApp.views import *
from django.conf import settings as globalSettings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf import settings
urlpatterns = [
    url(r'^$', Home , name ='Home'),
    url(r'^admin/', admin.site.urls),
    # url(r'^ngTemplates/(?P<filename>[\w|\W]+)', renderedStatic , name ='renderedStatic'),
    url(r'^faceRecognition/', include('faceRecoApp.urls')),
]

if globalSettings.DEBUG:
    urlpatterns +=static(globalSettings.STATIC_URL , document_root = globalSettings.STATIC_ROOT)
