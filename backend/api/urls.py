from django.urls import path, include
from rest_framework import routers
from .views import MovieViewSet, RatingViewSet, UserViewSet

router = routers.DefaultRouter()

router.register('user', UserViewSet)
router.register('movie', MovieViewSet)
router.register('rating', RatingViewSet)

urlpatterns = [
    path('', include(router.urls)),

]
