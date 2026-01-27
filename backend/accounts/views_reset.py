from rest_framework import status, views, permissions
from rest_framework.response import Response
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import send_mail
from django.conf import settings
from .models import CustomUser

class PasswordResetRequestView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = CustomUser.objects.get(email=email)
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            
            # Construct reset link
            # In production, use your actual frontend URL (e.g., https://vasthramalika.com)
            reset_link = f"http://localhost:5173/reset-password/{uid}/{token}"
            
            # Send Email
            subject = "Password Reset - Vasthramalika"
            message = f"Hello,\n\nYou requested a password reset for your Vasthramalika account.\n\nPlease click the link below to set a new password:\n{reset_link}\n\nIf you did not request this, please ignore this email.\n\nRegard,\nVasthramalika Team"
            
            send_mail(subject, message, settings.DEFAULT_FROM_EMAIL or 'noreply@vasthramalika.com', [email])
            
            return Response({"message": "Password reset link sent to your email."}, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            # We return 200 even if user doesn't exist for security (avoid email enumeration)
            return Response({"message": "If an account exists with this email, a reset link has been sent."}, status=status.HTTP_200_OK)

class PasswordResetConfirmView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, uidb64, token):
        password = request.data.get('password')
        if not password:
            return Response({"error": "New password is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = CustomUser.objects.get(pk=uid)
            
            if default_token_generator.check_token(user, token):
                user.set_password(password)
                user.save()
                return Response({"message": "Password has been reset successfully."}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST)
        except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
            return Response({"error": "Invalid reset link."}, status=status.HTTP_400_BAD_REQUEST)
