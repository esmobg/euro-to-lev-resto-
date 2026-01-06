# Скрипт за качване на проекта в GitHub
# Изпълнете: .\upload-to-github.ps1

Write-Host "=== GitHub Upload Script ===" -ForegroundColor Green
Write-Host ""

# Проверка дали Git е инсталиран
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git не е инсталиран!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Моля, инсталирайте Git от: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "След инсталацията, рестартирайте терминала и изпълнете скрипта отново." -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Git е инсталиран" -ForegroundColor Green
Write-Host ""

# Проверка дали вече има git repository
if (Test-Path .git) {
    Write-Host "ℹ️  Git repository вече е инициализиран" -ForegroundColor Yellow
} else {
    Write-Host "Инициализиране на Git repository..." -ForegroundColor Cyan
    git init
    Write-Host "✅ Repository инициализиран" -ForegroundColor Green
}

Write-Host ""
Write-Host "Добавяне на файлове..." -ForegroundColor Cyan
git add .

Write-Host ""
Write-Host "Проверка на статуса..." -ForegroundColor Cyan
git status

Write-Host ""
Write-Host "=== Следващи стъпки ===" -ForegroundColor Green
Write-Host ""
Write-Host "1. Създайте нов repository в GitHub:" -ForegroundColor Yellow
Write-Host "   https://github.com/new" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. След като създадете repository, изпълнете:" -ForegroundColor Yellow
Write-Host ""
Write-Host "   git commit -m 'Initial commit: Accessible BGN/EUR calculator'" -ForegroundColor Cyan
Write-Host "   git branch -M main" -ForegroundColor Cyan
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git" -ForegroundColor Cyan
Write-Host "   git push -u origin main" -ForegroundColor Cyan
Write-Host ""
Write-Host "   (Заменете YOUR_USERNAME и REPO_NAME с вашите данни)" -ForegroundColor Yellow
Write-Host ""
Write-Host "Или вижте GITHUB_SETUP.md за пълни инструкции." -ForegroundColor Yellow

