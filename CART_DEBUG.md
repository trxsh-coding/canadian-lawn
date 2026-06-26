# Отладка добавления товаров в корзину

## Что было исправлено

### 1. **apiClient теперь не отправляет статический токен в браузере**
   - Исправлен файл: `packages/api/src/clients/axios.ts`
   - Теперь `STRAPI_TOKEN` используется только для server-side запросов
   - В браузере запросы отправляются без Authorization header
   - JWT токен читается из cookie на бэкенде

### 2. **Добавлена проверка авторизации**
   - Перед добавлением товара проверяется `session.status`
   - Если пользователь не авторизован - показывается уведомление
   - Только авторизованные пользователи могут добавлять товары

## Как это работает

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ 1. Click "Добавить в корзину"
       │
       ├─── Проверка: session.status === 'authenticated'?
       │         │
       │         ├─── Нет: toast.error('Войдите в аккаунт')
       │         │
       │         └─── Да: POST /api/cart/items
       │              ↓
       │              withCredentials: true (отправляет cookie)
       │              ↓
       ▼
┌─────────────────────┐
│   Next.js Server    │
│   (middleware.ts)   │
└──────┬──────────────┘
       │ 2. Set cookie 'jwtToken' с JWT из NextAuth
       │    httpOnly: true, secure, sameSite: 'lax'
       ▼
┌─────────────────────┐
│  Strapi Backend     │
│  (jwt-from-cookie)  │
└──────┬──────────────┘
       │ 3. Читает cookie 'jwtToken'
       │    Устанавливает в header: Authorization: Bearer {token}
       ▼
┌─────────────────────┐
│  Cart Controller    │
│  (cart.addItem)     │
└──────┬──────────────┘
       │ 4. Проверка: ctx.state.user?
       │         │
       │         ├─── Нет: 401 Unauthorized
       │         │
       │         └─── Да: Добавить товар в корзину
       ▼
       Success: 200 OK с обновленной корзиной
```

## Проверка работы

### 1. Проверьте, что пользователь авторизован
```javascript
// В DevTools Console
console.log(document.cookie); // Должен быть next-auth.session-token
```

### 2. Проверьте, что JWT cookie устанавливается
```javascript
// В DevTools → Application → Cookies → localhost:3000
// Должен быть cookie 'jwtToken' с httpOnly: true
```

### 3. Проверьте запрос в Network tab
```
POST http://localhost:1337/api/cart/items
Headers:
  Cookie: jwtToken=eyJhbGc...
  Content-Type: application/json

Body:
{
  "productId": 1,
  "quantity": 1,
  "price": 100
}
```

### 4. Проверьте ответ backend
**Успех (200):**
```json
{
  "id": 1,
  "cart_items": [...],
  "total": 100
}
```

**Ошибка (401):**
```json
{
  "error": {
    "status": 401,
    "message": "Not authenticated"
  }
}
```

**Ошибка (403):**
```json
{
  "error": {
    "status": 403,
    "message": "Forbidden"
  }
}
```

## Возможные проблемы и решения

### ❌ 403 Forbidden
**Причина:** Пользователь не авторизован или JWT токен не читается

**Решение:**
1. Убедитесь, что пользователь авторизован через NextAuth
2. Проверьте, что cookie `jwtToken` устанавливается в middleware.ts
3. Проверьте, что backend middleware `jwt-from-cookie` зарегистрирован

### ❌ Cookie не отправляется
**Причина:** CORS настроен неправильно

**Решение:**
Проверьте `apps/backend/config/middlewares.ts`:
```typescript
{
  name: 'strapi::cors',
  config: {
    credentials: true, // ВАЖНО!
    origin: ['http://localhost:3000']
  }
}
```

### ❌ JWT токен не читается из cookie
**Причина:** Middleware `jwt-from-cookie` не работает

**Решение:**
1. Проверьте `apps/backend/src/middlewares/jwt-from-cookie.ts`
2. Убедитесь, что middleware зарегистрирован в `config/middlewares.ts`
3. Проверьте логи: `console.log('Token from cookie:', token)`

## Тестирование

### Сценарий 1: Неавторизованный пользователь
1. Выйдите из аккаунта
2. Нажмите "Добавить в корзину"
3. **Ожидаемый результат:** Toast "Войдите в аккаунт, чтобы добавить товар в корзину"

### Сценарий 2: Авторизованный пользователь
1. Войдите в аккаунт
2. Нажмите "Добавить в корзину"
3. **Ожидаемый результат:** Toast "Газон добавлен в корзину"
4. Проверьте корзину - товар должен появиться

### Сценарий 3: Повторное добавление
1. Добавьте товар первый раз
2. Добавьте тот же товар второй раз
3. **Ожидаемый результат:** Количество товара увеличится (не создастся дубликат)

## Следующие шаги

- [ ] Добавить обновление количества товара в корзине
- [ ] Добавить удаление товара из корзины
- [ ] Синхронизировать локальный store с API
- [ ] Добавить оптимистичные обновления