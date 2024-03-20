from decouple import config


class DBSettings:
    POSTGRES_USER = config('POSTGRES_USER')
    POSTGRES_PASSWORD = config('POSTGRES_PASSWORD')
    POSTGRES_HOST = config('POSTGRES_HOST')
    POSTGRES_PORT = config('POSTGRES_PORT')
    POSTGRES_DB = config('POSTGRES_DB')


get_db_settings = DBSettings()
