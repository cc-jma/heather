#!/bin/bash

TIMESTAMP=$(date +%s)
LOGS_DIR="logs"

mkdir -p "$LOGS_DIR"

# Kill any existing processes on ports 8080 and 5173
echo "Checking for existing processes on ports 8080 and 5173..."
lsof -ti:8080 | xargs kill -9 2>/dev/null || true
lsof -ti:5173 | xargs kill -9 2>/dev/null || true

echo "Starting frontend and backend with logs in $LOGS_DIR/"

# Start frontend in background
(cd frontend && npm run dev) > >(tee "$LOGS_DIR/frontend-$TIMESTAMP.log") 2>> "$LOGS_DIR/frontend-$TIMESTAMP.log" &
FRONTEND_PID=$!

# Cleanup function to stop frontend when script exits
cleanup() {
    echo "Stopping frontend..."
    kill -TERM -$FRONTEND_PID 2>/dev/null || true
    exit 0
}

trap cleanup EXIT INT TERM

# Start backend in foreground (Ctrl-C will naturally stop it)
(cd backend && ./gradlew bootRun) 2>&1 | tee "$LOGS_DIR/backend-$TIMESTAMP.log"
