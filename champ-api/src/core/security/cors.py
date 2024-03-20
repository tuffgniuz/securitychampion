from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


def cors_middleware(app: FastAPI):
    origins = [ 
        'localhost:5174',
        'http://localhost:5174' 
    ]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*']
    )
 
