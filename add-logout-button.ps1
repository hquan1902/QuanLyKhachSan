# Add logout button to all HTML pages in frontend folder

$pages = @(
    "services.html",
    "users.html",
    "bookings.html",
    "bills.html",
    "guests.html",
    "reservations.html",
    "booking-detail.html"
)

$logoutButton = @"
                <a href="#" id="logoutBtn" class="sidebar-item flex items-center space-x-3 p-3 rounded-lg text-red-300 hover:bg-red-500 hover:text-white">
                    <i data-feather="log-out"></i>
                    <span>Đăng Xuất</span>
                </a>
"@

$searchPattern = @"
                <a href="settings.html" class="sidebar-item flex items-center space-x-3 p-3 rounded-lg">
                    <i data-feather="settings"></i>
                    <span>Cài Đặt</span>
                </a>
            </nav>
"@

$replacePattern = @"
                <a href="settings.html" class="sidebar-item flex items-center space-x-3 p-3 rounded-lg">
                    <i data-feather="settings"></i>
                    <span>Cài Đặt</span>
                </a>
$logoutButton
            </nav>
"@

$frontendPath = "e:\hotel-reservation-perfectfinal-lastest\hotel-reservation-perfectfinal\hotel-reservation-perfectfinal\hotel-reservation-final\hotel-reservation-final\frontend"

foreach ($page in $pages) {
    $filePath = Join-Path $frontendPath $page
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw -Encoding UTF8
        if ($content -match [regex]::Escape($searchPattern)) {
            $newContent = $content -replace [regex]::Escape($searchPattern), $replacePattern
            Set-Content $filePath $newContent -Encoding UTF8 -NoNewline
            Write-Host "Added logout button to $page" -ForegroundColor Green
        } else {
            Write-Host "Pattern not found in $page" -ForegroundColor Yellow
        }
    } else {
        Write-Host "File not found: $page" -ForegroundColor Red
    }
}

Write-Host "`nDone!" -ForegroundColor Cyan
