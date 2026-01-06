# Инструкции за качване в GitHub

## Стъпка 1: Инсталиране на Git

Ако Git не е инсталиран на вашия компютър:

1. Отидете на: https://git-scm.com/download/win
2. Изтеглете и инсталирайте Git за Windows
3. Рестартирайте терминала след инсталацията

## Стъпка 2: Създаване на GitHub акаунт

1. Отидете на: https://github.com
2. Регистрирайте се (безплатно)
3. Потвърдете имейла си

## Стъпка 3: Създаване на нов Repository в GitHub

1. Влезте в GitHub
2. Кликнете на **"+"** в горния десен ъгъл
3. Изберете **"New repository"**
4. Въведете име на repository (например: `euro-lev-calculator`)
5. Изберете **Public** (или Private, ако искате)
6. **НЕ** маркирайте "Initialize this repository with a README"
7. Кликнете **"Create repository"**

## Стъпка 4: Качване на файловете

Отворете PowerShell или Command Prompt в папката на проекта и изпълнете:

```powershell
# Инициализиране на git repository
git init

# Добавяне на всички файлове
git add .

# Първи commit
git commit -m "Initial commit: Accessible BGN/EUR calculator"

# Добавяне на remote repository (заменете YOUR_USERNAME и REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Качване на файловете
git branch -M main
git push -u origin main
```

## Стъпка 5: Публикуване като GitHub Pages (Опционално)

След като файловете са качени:

1. Отидете в Settings на вашия repository
2. Вляво изберете **Pages**
3. Под "Source" изберете **main** branch
4. Изберете **/ (root)** folder
5. Кликнете **Save**

Вашият сайт ще бъде достъпен на:
`https://YOUR_USERNAME.github.io/REPO_NAME/`

## Алтернатива: GitHub Desktop

Ако предпочитате графичен интерфейс:

1. Изтеглете GitHub Desktop: https://desktop.github.com
2. Инсталирайте го
3. Влезте с вашия GitHub акаунт
4. File → Add Local Repository
5. Изберете папката на проекта
6. Направете commit и push

## Файлове, които ще се качат:

- ✅ index.html
- ✅ styles.css
- ✅ script.js
- ✅ accessibility-test.html
- ✅ README.md
- ✅ DEPLOYMENT.md
- ✅ .gitignore

## Важно:

- Уверете се, че всички файлове са правилно форматирани
- Проверете дали няма лични данни в кода
- README.md вече съдържа описание на проекта

## След качването:

Вашият код ще бъде публично достъпен (ако сте избрали Public repository) и можете да:
- Споделяте линка с други
- Публикувате като GitHub Pages
- Продължите да работите върху проекта
- Приемате contributions от други

