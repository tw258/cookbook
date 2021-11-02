$greenCheck = @{
    Object = [Char]8730
    ForegroundColor = 'Green'
}

Write-Host -NoNewline "(1/3) Creating docker-compose file..."
Copy-Item docker-compose.example.yml "docker-compose.yml" *>$null
Write-Host @greenCheck


Write-Host -NoNewline "(2/3) Installing backend dependencies..."
Set-Location backend
npm install --force --silent *>$null
Write-Host @greenCheck


Write-Host -NoNewline "(3/3) Installing frontend dependencies..."
Set-Location ../frontend
npm install --force --silent *>$null
Write-Host @greenCheck


Set-Location ..