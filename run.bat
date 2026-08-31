@echo off
setlocal enabledelayedexpansion

title SanskritLab Launcher
echo ============================================================
echo               SANSKRIT LAB STARTUP SCRIPT
echo ============================================================
echo.

cd /d "%~dp0"

:: 1. Check prerequisites
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Node.js is not found in PATH. Please install Node.js.
    pause
    exit /b 1
)

where cargo >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [WARNING] Rust / Cargo is not found in PATH.
    echo The client will run using built-in offline fallbacks.
)

:: 2. Check and install client dependencies if needed
if not exist "client\node_modules" (
    echo [INFO] Installing client dependencies...
    cd client
    call npm install
    cd ..
    echo [INFO] Dependencies installed successfully.
    echo.
)

:: 3. Launch Rust Backend (if cargo available)
where cargo >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [INFO] Starting Unified Rust Backend on http://127.0.0.1:8080...
    start "SanskritLab - Rust Backend (Port 8080)" cmd /k "cd /d ""%~dp0backend\rust"" && cargo run"
) else (
    echo [INFO] Skipping Rust backend launch (cargo not in PATH).
)

:: 4. Launch React Client
echo [INFO] Starting SanskritLab Frontend on http://localhost:5173...
start "SanskritLab - Frontend (Vite)" cmd /k "cd /d ""%~dp0client"" && npm run dev"

:: 5. Open browser
timeout /t 3 /nobreak >nul
echo [INFO] Opening SanskritLab in your default browser...
start http://localhost:5173

echo.
echo ============================================================
echo  SanskritLab is running!
echo  - Frontend: http://localhost:5173
echo  - Rust Backend: http://127.0.0.1:8080/api/health
echo ============================================================
echo.
