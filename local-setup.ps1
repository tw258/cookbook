Write-Host -NoNewline "(1/4) Copying docker-compose file..."
Copy-Item docker-compose.example.yml "docker-compose.yml" *>$null
Write-Host "✅"


Write-Host -NoNewline "(2/4) Creating MongoDB volumes..."
if (!(Test-Path -Path "docker-volumes/db")) {
    New-Item "docker-volumes/db" -ItemType directory *>$null
}
Write-Host "✅"


Write-Host -NoNewline "(3/4) Installing backend dependencies..."
Set-Location backend
npm install --force --silent *>$null
Write-Host "✅"


Write-Host -NoNewline "(4/4) Installing frontend dependencies..."
Set-Location ../frontend
npm install --force --silent *>$null
Write-Host "✅"


Set-Location ..