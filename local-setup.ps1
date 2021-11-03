$greenCheck = @{
    Object = [char]8730
    ForegroundColor = 'Green'
}

$orangeCheck = @{
    Object = [char]8730
    ForegroundColor = 'Yellow'
}

Write-Host -NoNewline "(1/3) Creating '.env' file..."

if (!(Test-Path -Path ".env")) {
    Copy-Item .env.example ".env" *>$null
    Write-Host @greenCheck
    Write-Host -ForegroundColor Yellow "      - Please add your MongoDB credentials to '.env'!"
} else {
    Write-Host @orangeCheck
    Write-Host "      - file already exists, skipping this step"
}

Write-Host -NoNewline "(2/3) Installing backend dependencies..."
Set-Location backend
npm install --force --silent *>$null
Write-Host @greenCheck


Write-Host -NoNewline "(3/3) Installing frontend dependencies..."
Set-Location ../frontend
npm install --force --silent *>$null
Write-Host @greenCheck

Write-Host ""

Set-Location ..