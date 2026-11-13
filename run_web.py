"""Start the manual browser on http://127.0.0.1:8253 (local only).

Usage: python run_web.py [--port 8253] [--reload]
"""
import argparse

import uvicorn


def main():
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--port", type=int, default=8253)
    ap.add_argument("--reload", action="store_true")
    a = ap.parse_args()
    uvicorn.run("web.app:app", host="127.0.0.1", port=a.port, reload=a.reload)


if __name__ == "__main__":
    main()
