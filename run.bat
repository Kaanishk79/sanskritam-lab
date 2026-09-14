@echo off
setlocal EnableExtensions

title SanskritLab Launcher
echo ============================================================
echo               SANSKRIT LAB STARTUP SCRIPT
echo ============================================================
echo.

set "ROOT=%~dp0"
cd /d "%ROOT%"

REM Check Node.js prerequisite
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Node.js is not found in PATH. Please install Node.js.
    pause
    exit /b 1
)

REM Check and install client dependencies if needed
if not exist "%ROOT%client\node_modules" (
    echo [INFO] Installing client dependencies...
    pushd "%ROOT%client"
    call npm install
    popd
    echo [INFO] Dependencies installed successfully.
    echo.
)

REM Launch Rust Backend (if cargo available)
where cargo >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [INFO] Starting Unified Rust Backend on http://127.0.0.1:8080...
    start "SanskritLab - Rust Backend (Port 8080)" cmd /k "cd /d %ROOT%backend\rust && cargo run"
) else (
    echo [WARNING] Cargo not found in PATH.
    echo Backend server not started; frontend will use offline fallbacks.
    echo.
)

REM Launch React Client (JS/JSX + Vite)
echo [INFO] Starting SanskritLab Frontend on http://localhost:5173...
start "SanskritLab - Frontend (Vite)" cmd /k "cd /d %ROOT%client && npm run dev"

REM Wait and open browser
timeout /t 3 /nobreak >nul 2>nul
echo [INFO] Opening SanskritLab in your default browser...
start http://localhost:5173

echo.
echo ============================================================
echo  SanskritLab is running!
echo  - Frontend: http://localhost:5173
echo  - Rust Backend: http://127.0.0.1:8080/api/health
echo  - Netlify Ready: Build with 'npm run build' in client/
echo ============================================================
echo.
