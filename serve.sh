#!/bin/bash

PORT=8000
DIRECTORY="."

if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    PYTHON_CMD="python"
else
    echo "Error: Python is not installed"
    exit 1
fi

echo "Starting local server at http://localhost:$PORT"
echo "Press Ctrl+C to stop the server"

cd "$DIRECTORY"

case "$(uname -s)" in
    Darwin)
        open "http://localhost:$PORT"
        ;;
    Linux)
        if command -v xdg-open &> /dev/null; then
            xdg-open "http://localhost:$PORT"
        fi
        ;;
    CYGWIN*|MINGW*|MSYS*)
        start "http://localhost:$PORT"
        ;;
esac

$PYTHON_CMD -m http.server $PORT
