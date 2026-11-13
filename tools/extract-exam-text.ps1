param([int]$Limit = 0, [string]$ImageDirectory, [string]$OutputDirectory)

# Uses the installed Windows OCR engine. Saved output is evidence for review.
$ErrorActionPreference = 'Stop'
$reviewerRoot = Split-Path -Parent $PSScriptRoot
Add-Type -AssemblyName System.Runtime.WindowsRuntime
$null = [Windows.Storage.StorageFile, Windows.Storage, ContentType=WindowsRuntime]
$null = [Windows.Storage.Streams.IRandomAccessStream, Windows.Storage.Streams, ContentType=WindowsRuntime]
$null = [Windows.Graphics.Imaging.BitmapDecoder, Windows.Foundation, ContentType=WindowsRuntime]
$null = [Windows.Graphics.Imaging.SoftwareBitmap, Windows.Foundation, ContentType=WindowsRuntime]
$null = [Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType=WindowsRuntime]
$null = [Windows.Globalization.Language, Windows.Globalization, ContentType=WindowsRuntime]
$asTask = [System.WindowsRuntimeSystemExtensions].GetMethods() |
    Where-Object { $_.Name -eq 'AsTask' -and $_.IsGenericMethod -and $_.GetParameters().Count -eq 1 } |
    Select-Object -First 1

function Await-Operation($Operation, [Type]$ResultType) {
    $task = $asTask.MakeGenericMethod($ResultType).Invoke($null, @($Operation))
    $task.GetAwaiter().GetResult()
}

$language = [Windows.Globalization.Language]::new('en-US')
$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage($language)
if ($null -eq $engine) { throw 'English Windows OCR is unavailable.' }
$folders = @{
    'HuaweiCloudNationals(2324Answer)' = 'n2324'
    'HuaweiCloudNationals(2425)' = 'n2425'
    'HuaweiCloudNationals(2526)' = 'n2526'
}
$jobs = @($folders.Keys | Sort-Object | ForEach-Object {
    @{ source = Join-Path $reviewerRoot $_; destination = Join-Path $reviewerRoot "work/exam-ocr/$($folders[$_])" }
})
if ($ImageDirectory -or $OutputDirectory) {
    if (-not $ImageDirectory -or -not $OutputDirectory) { throw 'Supply both ImageDirectory and OutputDirectory.' }
    $jobs = @(@{ source = [System.IO.Path]::GetFullPath($ImageDirectory); destination = [System.IO.Path]::GetFullPath($OutputDirectory) })
}
$processed = 0
foreach ($job in $jobs) {
    $destination = $job.destination
    $null = New-Item -ItemType Directory -Force -Path $destination
    foreach ($image in Get-ChildItem -LiteralPath $job.source -Filter '*.png' | Sort-Object Name) {
        $target = Join-Path $destination ($image.BaseName + '.json')
        $sourceHash = (Get-FileHash -LiteralPath $image.FullName -Algorithm SHA256).Hash.ToLowerInvariant()
        if (Test-Path -LiteralPath $target) {
            try { $cached = Get-Content -LiteralPath $target -Raw | ConvertFrom-Json } catch { $cached = $null }
            if ($cached.sourceHash -eq $sourceHash) { continue }
        }
        $file = Await-Operation ([Windows.Storage.StorageFile]::GetFileFromPathAsync($image.FullName)) ([Windows.Storage.StorageFile])
        $stream = Await-Operation ($file.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
        try {
            $decoder = Await-Operation ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
            $bitmap = Await-Operation ($decoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
            try {
                $result = Await-Operation ($engine.RecognizeAsync($bitmap)) ([Windows.Media.Ocr.OcrResult])
                $lines = @($result.Lines | ForEach-Object {
                    @{
                        text = $_.Text
                        words = @($_.Words | ForEach-Object {
                            @{ text = $_.Text; x = $_.BoundingRect.X; y = $_.BoundingRect.Y; width = $_.BoundingRect.Width; height = $_.BoundingRect.Height }
                        })
                    }
                })
                $record = @{ path = $image.FullName.Substring($reviewerRoot.Length + 1).Replace('\', '/'); sourceHash = $sourceHash; engine = 'Windows.Media.Ocr en-US'; lines = $lines }
                $json = ConvertTo-Json -InputObject $record -Depth 8
                [System.IO.File]::WriteAllText($target, $json, [System.Text.UTF8Encoding]::new($false))
            } finally { $bitmap.Dispose() }
        } finally { $stream.Dispose() }
        $processed++
        if ($processed % 25 -eq 0) { Write-Output "OCR extracted $processed images in this run" }
        if ($Limit -gt 0 -and $processed -ge $Limit) { Write-Output "OCR extracted $processed images"; return }
    }
}
Write-Output "OCR extracted $processed new images"
