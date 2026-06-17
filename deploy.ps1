# Deploy do Curso de Español pro GitHub Pages (aleapc.github.io/curso-espanol).
# Mesmo padrão dos outros PWAs: build estático + push pra branch gh-pages via
# worktree efêmero FORA de D:\dev (por causa do Norton bloqueando git.exe aqui).

$ErrorActionPreference = 'Stop'
# Worktree FORA de D:\dev (Norton bloqueia git.exe lá) e fora de %LOCALAPPDATA%
# (o sandbox do Claude Code virtualiza o AppData e o `git worktree add` falha).
# D:\tmp não é vigiado pelo Norton e não é virtualizado -> funciona nos dois casos.
$worktreePath = 'D:\tmp\curso-espanol-gh-pages'
$buildPath = Join-Path $PSScriptRoot 'build'
if (-not (Test-Path 'D:\tmp')) { New-Item -ItemType Directory -Path 'D:\tmp' | Out-Null }

# 1. Build com base path do GitHub Pages
$env:BASE_PATH = '/curso-espanol'
npm run build

# 2. Trava de segurança: confere se o base path entrou no HTML
$indexHtml = Get-Content (Join-Path $buildPath 'index.html') -Raw
if ($indexHtml -notmatch '/curso-espanol/_app') {
  throw 'ABORTADO: build/index.html não contém o base path /curso-espanol'
}

# 3. Worktree efêmero apontando pra gh-pages
git fetch origin gh-pages
if (Test-Path $worktreePath) { git worktree remove --force $worktreePath }
git worktree add -B gh-pages $worktreePath origin/gh-pages

# 4. Copia o build e publica
Get-ChildItem -Path $worktreePath -Force -Exclude '.git' | Remove-Item -Recurse -Force
Copy-Item -Path (Join-Path $buildPath '*') -Destination $worktreePath -Recurse -Force
# .nojekyll garante que o Pages sirva a pasta _app/ (Jekyll ignora dirs com _).
# Vem de static/.nojekyll no build, mas reforçamos aqui caso o build não o inclua.
New-Item -ItemType File -Path (Join-Path $worktreePath '.nojekyll') -Force | Out-Null
Push-Location $worktreePath
git add -A
git commit -m "deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm')" --allow-empty
git push origin gh-pages
Pop-Location

# 5. Limpa
git worktree remove --force $worktreePath
Write-Host 'Publicado em https://aleapc.github.io/curso-espanol/' -ForegroundColor Green
