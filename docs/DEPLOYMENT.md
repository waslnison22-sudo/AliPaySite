# Деплой и проверка

## GitHub Pages

Источник: ветка `main`.

Workflow: `.github/workflows/build.yml`.

Этапы:

1. checkout;
2. Node 22 + npm cache;
3. `npm install`;
4. `npm run build`;
5. создание `dist/404.html`;
6. проверка обязательных файлов;
7. upload Pages artifact;
8. deploy.

## Почему появился 404 fallback

GitHub Pages отдаёт 404 при прямом запросе неизвестного пути. Для этой одностраничной витрины маршрутизация не нужна, поэтому production `index.html` копируется в `404.html`. Это сохраняет Vite base `/AliPaySite/` и позволяет приложению загрузиться даже при прямом открытии URL.

## Локальная проверка

```bash
npm install
npm run build
npm run preview
```

Проверить минимум:

- главная открывается;
- фотографии не дают 404;
- открывается viewer;
- Escape закрывает viewer;
- ←/→ переключают работы;
- Telegram-кнопки открываются;
- на мобильном нет горизонтального скролла;
- delivery logos загружаются;
- неизвестный URL не показывает пустую страницу.

## GitHub Pages URL

Ожидаемый адрес:

`https://waslnison22-sudo.github.io/AliPaySite/`
