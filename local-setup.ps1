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
    $ENV_EXAMPLE_CLEAN = (Get-Content .env.example) -replace '^\s?#.*', '' | Where-Object {$_.trim() -ne "" }
    $ENV_HEADER = "# Add your credentials to the variables below.`n# They will not be shared with anyone.`n"
    $ENV_HEADER | Add-Content .\.env
    $ENV_EXAMPLE_CLEAN | Add-Content .\.env

    Write-Host @greenCheck
    Write-Host -ForegroundColor Yellow "      - Please add your credentials to '.env'!"
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