import logging
from .schemas import (
    RegisterIn,
    TokenObtainPairOut,
    TokenRefreshPair,
    UserSchema,
    TokenObtainPair,
    RegEnabledSchema,
)
from ninja import Router
from ninja_jwt.authentication import JWTAuth
from ninja_extra import status
from ninja_extra.exceptions import APIException
from django.contrib.auth import get_user_model
from ninja_jwt.tokens import Token
import environ

env = environ.Env(ENABLE_REGISTRATION=(bool, False))

logger = logging.getLogger(__name__)

router = Router()


@router.post(
    "/login", response=TokenObtainPairOut, url_name="token_obtain_pair", tags=["User"]
)
def new_token(request, user_token: TokenObtainPair):
    user_token.check_user_authentication_rule()
    return user_token.output_schema()


@router.post(
    "/refresh",
    response=TokenObtainPairOut,
    url_name="token_refresh",
    auth=None,
    tags=["User"],
)
def refresh_token(request, refresh_token: TokenRefreshPair):
    return refresh_token.output_schema()


@router.get("/me", response=UserSchema, url_name="me", auth=JWTAuth(), tags=["User"])
def me(request):
    try:
        user = get_user_model().objects.get(id=request.user.id)
        return user
    except:
        raise APIException("Invalid user ID", code=status.HTTP_400_BAD_REQUEST)


@router.patch("/me", response=UserSchema, url_name="me", auth=JWTAuth(), tags=["User"])
def update_me(request, payload: UserSchema):
    try:
        user = get_user_model().objects.get(id=request.user.id)
        for attr, value in payload.dict(exclude_unset=True).items():
            setattr(user, attr, value)
        user.save()
        return user
    except:
        raise APIException("Invalid user ID", code=status.HTTP_400_BAD_REQUEST)


@router.get(
    "/reg_enabled", response=RegEnabledSchema, url_name="reg_enabled", tags=["User"]
)
def reg_enabled(request):
    if env.bool("ENABLE_REGISTRATION"):
        return {"enabled": True}
    else:
        return {"enabled": False}


@router.post("/register", response=UserSchema, url_name="register", tags=["User"])
def register(request, data: RegisterIn):
    if env["ENABLE_REGISTRATION"]:
        if data.password != data.password_verify:
            raise APIException(
                "Passwords do not match", code=status.HTTP_400_BAD_REQUEST
            )
        elif get_user_model().objects.filter(email__icontains=data.email).exists():
            raise APIException(
                detail="Email is already registered",
                code=status.HTTP_400_BAD_REQUEST,
            )
        else:
            user = get_user_model().objects.create_user(
                first_name=data.first_name,
                last_name=data.last_name,
                email=data.email,
                password=data.password,
            )
            user.set_password(data.password)
            return user
    else:
        raise APIException("Registration is disabled", code=status.HTTP_400_BAD_REQUEST)
