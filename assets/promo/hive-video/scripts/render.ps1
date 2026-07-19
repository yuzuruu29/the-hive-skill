$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..
npm install
npm run audio
npm run capture
npm run render:all
