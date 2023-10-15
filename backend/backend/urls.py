from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = (
    [
        path("admin/", admin.site.urls),
        path("api/login/", include("rest_social_auth.urls_jwt_pair")),
        path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
        path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
        path("api/user/", include("users.urls")),
    ]
    + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)  # type: ignore
    + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)  # type: ignore
)
