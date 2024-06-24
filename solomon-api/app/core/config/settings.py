from pathlib import Path
from typing import Sequence, Union

from pydantic import field_validator
from pydantic_settings import BaseSettings


class BaseConfig(BaseSettings):

    class Config:
        env_file = str(Path(__file__).resolve().parent.parent.parent.parent / ".env")


class DBSettings(BaseConfig):
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str
    POSTGRES_HOST: str


class CORSSettings(BaseConfig):
    ALLOW_ORIGINS: str

    # @field_validator("ALLOW_ORIGINS", mode="before")
    # def assemble_origins(cls, v: Union[str, Sequence[str]]) -> Sequence[str]:
    #     if isinstance(v, str):
    #         return v.split(",")
    #     return v
    #


# Instantiate the settings, this will automatically read from environment variables
db_settings = DBSettings()
cors_settings = CORSSettings()
