# Payselection-SDK-React-Native
PaySelection PayApp SDK позволяет интегрировать прием платежей в мобильное приложение для платформы React Native.

Возможности SDK:
- Одностадийная операция оплаты;
- Получение статуса транзакции по TransactionId;
- Получение информации о текущем статусе по идентификатору заказа orderId.

## Требования
Перед установкой необходимо убедиться, что версия Node 18 и выше.
>**Note**: Убедитесь, что вы завершили настройку окружения [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) до шага "Creating a new application", перед тем как начать.


## Установка
```bash
# using npm
npm install payselection-pay-app-sdk-reactnative

# using yarn
yarn add payselection-pay-app-sdk-reactnative
```


## Полезные ссылки
[Личный кабинет](https://merchant.payselection.com/login/) \
[Разработчикам](https://api.payselection.com/#section/Request-signature)

## Использование paymentApi

### Создание тела запроса для метода оплаты
В зависимости от типа оплаты создайте экземпляр структуры `TokenBasedPayment`, `QRCodePayment` или `CryptogramPayment` с информацией о транзакции и данными карты, передав туда customerInfo, если требуется. 

Внимание! Необходимо валидировать передаваемые данные, иначе сервер вернет ошибку. Подробнее о форматах можно прочесть в документации [Payselection API](https://api.payselection.com/).

```jsx
import { TokenBasedPayment, QRCodePayment, CryptogramPayment } from 'payselection-pay-app-sdk-reactnative/src/types/payment/paymentPayload.ts';

export const tokenBasedPayment: TokenBasedPayment = {
  OrderId: "", // Уникальный номер заказа
  Amount: "10",
  Currency: "RUB",
  Description: "test payment",
  RebillFlag: false,
  CustomerInfo: {
    Email: "user@example.com",
    Phone: "+19991231212",
    Language: "en",
    Address: "string",
    Town: "string",
    ZIP: "string",
    Country: "USA",
    IP: "10.0.2.56"
  },
  PaymentMethod: "Token",
  PaymentDetails: {
    Type: "Yandex",
    PayToken: "eyJzaWduZWRNZXNzYWdlIjoie1wiZW5jcnlwdGVkTWVzc2FnZVwiOlwiMXljbzNsbkl4cTRFRUZ0eEF3TnNOaGxKbTJSdXJ0dG9tOGloYkNuMjR6WkVUOW5oeGkyV0M0WmZzdDhmMklSb3AxbXN1Y2o4TTZYTTFKNWlPdG9VRExCTGtlWHlxQzJIVWFpOGVrR29BYjFQY1RUSWZFcHM4OEZRK1BTUis2RjduTEFpU25IUUJ0d3QvSGE0SE5ORVlBdkdQQXEvSHFNMldyb1FXK2k3ZkVUbGxkU25xazE4WkFyeDc4dW9FQWVOYW9OYThGbXhnU2tNUCt6Q2Q1ZWowdWpaNUd5RjhNVWtNVjFSL3liRzJmZHR1bktMTzZRbkVZc0pkblhEN3pGTEIrZkJQUjR5UktYZTRqV3FkbnpqUUY1WkZnSHZBQTZINnhFTFlzVmZsc1pJVndFbGtNRzFBTWI0MWJDMVY5enpcIixcImVwaGVtZXJhbFB1YmxpY0tleVwiOlwiQkVQQkxlczhLWWp2WCtYem13Z3h3QithL2JYYSs0ZUdvSWF3eFRpeTlQcHRpOXcrTUtPdDRxSHFaNmNGcmFhcFY4Q3dwT29KWEVrTE1ZQVhRUjRsMDFFPVwifSIsIml2IjoiZWJ2SVg5TzBwVnRTZ21QNGFqcnd2UT09IiwidGFnIjoiNVE2cWNGRHg3L0NEaXZscHRVbDh2Umo4RFFWZUxHRGZ5UlV3UTdJa0tsMD0ifQ=="
  }
}

```

### Генерация подписи запроса (X-REQUEST-SIGNATURE)
Перед тем как использовать `paymentApi` и `getStatusApi` необходимо сгенерировать уникальную подпись запроса. Для этого необходимо создать интерфейс типа `SignatureProps` и вызвать метод `signatureGeneration`
для генерации подписи запроса:

```jsx
import { SignatureProps, signatureGeneration } from 'payselection-pay-app-sdk-reactnative/src/utils/common.ts';

const signaturePayment: SignatureProps = {
  requestMethod: 'POST', // Request method (Метод запроса)
  url: 'https://example.com', // URL (Адрес запроса)
  xSiteId: '99999', // X-SITE-ID (Находится в личном кабинете мерчанта, в разделе “Сайты”, параметр ID сайта)
  xRequestId: 'Tkrdjvb87630Uegp', // X-REQUEST-ID (Генерируется на стороне мерчанта)
  siteSecretKey: 'jdPnu3LKGnBqShN3', // Cекретный ключ или публичный ключ
  requestBody: tokenBasedPayment, // Request body (Тело запроса)
}

const signature = signatureGeneration(signaturePayment);
```

### Создание заголовка для вызова методы оплаты
Создания заголовка для метода оплаты `paymentApi.publicPay`:

```jsx
import { PublicPayHeader } from 'payselection-pay-app-sdk-reactnative/src/types/payment/paymentPayload.ts';

const payHeader: PublicPayHeader = {
  X_SITE_ID: '99999',
  X_REQUEST_ID: 'Tkrdjvb87630Uegp', // X_REQUEST_ID должен быть уникальным
  X_REQUEST_SIGNATURE: signature, // Сгенерированная выше подпись запроса
}
```

### Вызов метода оплаты `paymentApi.publicPay`

```jsx
import paymentApi from 'payselection-pay-app-sdk-reactnative/src/api/payment.ts';

const result = await paymentApi.publicPay(tokenBasedPayment, payHeader);
```

## Использование getStatusApi

### Генерация подписи запроса (X-REQUEST-SIGNATURE)
Используется тот же метод, что и для `paymentApi`. 

### Создание заголовка для вызова методы оплаты

В зависимости от используемого запроса необходимо создать заголовок подходящего типа (`GetStatusByOrderIdHeader` для `getStatusApi.getStatusByOrderId`, `GetStatusByTransactionIdHeader` для `getStatusApi.getStatusByTransactionId`).

Ниже приведен пример создания заголовка для запроса на getStatusApi.getStatusByOrderId:
```jsx
import { GetStatusByOrderIdHeader, GetStatusByTransactionIdHeader } from 'payselection-pay-app-sdk-reactnative/src/types/status/statusPayload.ts';
 
const getStatusByOrderIdHeader: GetStatusByTransactionIdHeader = {
  X_SITE_ID: '99999',
  X_REQUEST_ID: 'Tkrdjvb87630Uegp', // X_REQUEST_ID должен быть уникальным
  X_REQUEST_SIGNATURE: signature, // Сгенерированная подпись запроса с данными для получения статуса транзакции
}
```

### Вызов методов получения информации о транзацкии по orderId или TransactionId

```jsx
import getStatusApi from 'payselection-pay-app-sdk-reactnative/src/api/status';

// Для получения информации по `orderId`
 const result = await getStatusApi.getStatusByOrderId(orderId, getStatusByOrderIdHeader);
// Для получения информации по `TransactionId`
 const result = await getStatusApi.getStatusByTransactionId(transactionId, getStatusByTransactionIdHeader);
```

## Лицензия

MIT

## Поддержка

По возникающим вопросам техничечкого характера обращайтесь на [support@payselection.com](mailto:support@payselection.com)