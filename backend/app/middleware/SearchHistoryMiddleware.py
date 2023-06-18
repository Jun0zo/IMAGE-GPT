from fastapi import Request

class SearchHistoryMiddleware:
    def __init__(self, app):
        self.app = app

    async def __call__(self, request: Request, call_next):
        print('gooood!')

        response = await call_next(request)
        return response