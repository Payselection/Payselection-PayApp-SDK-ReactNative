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
В зависимости от типа оплаты создайте экземпляр структуры `TokenBasedPayment`, `QRCodePayment`, `ExternalFormPayment`, `SberPayPayment`, `CryptogramPayment` или `CryptogramRSAPayment` с информацией о транзакции и данными карты, передав туда customerInfo, если требуется. 

Внимание! Необходимо валидировать передаваемые данные, иначе сервер вернет ошибку. Подробнее о форматах можно прочесть в документации [Payselection API](https://api.payselection.com/). Также обратите внимание на тип чека (FFD1.05, FFD1.2).

```tsx
import { CryptogramPayment } from 'payselection-pay-app-sdk-reactnative/src/types/payment/paymentPayload';

export const cryptogramPaymentDataFFD1_05: CryptogramPayment = {
    OrderId: "SAM_SDK_3",
    Amount: "11.00",
    Currency: "RUB",
    Description: "test payment",
    RebillFlag: false,
    CustomerInfo: {
        Email: "user@example.com",
        Phone: "+19991231212",
        Language: "en",
        Address: "string",
        Town: "string",
        ZIP: "1234567",
        Country: "USA",
        IP: "10.0.2.56",
        UserId: "string"
    },
    ExtraData: {
        ReturnUrl: "https://api.payselection.com/",
        WebhookUrl: "https://webhook.site/94a06b69",
        ScreenHeight: "768",
        ScreenWidth: "1024",
        ChallengeWindowSize: "5",
        TimeZoneOffset: "-180",
        ColorDepth: "8",
        Region: "ru",
        UserAgent: "Mozilla/5.0+(Macintosh;+Intel+Mac+OS+X+10_15_5)+AppleWebKit/527.36+(KHTML,+Gecko)+Chrome83.0.4103.116+Safari/537.36",
        acceptHeader: "text/html",
        JavaEnabled: true,
        javaScriptEnabled: true
    },
    ReceiptData: {
        timestamp: "string",
        external_id: "string",
        receipt: {
            client: {
                name: "string",
                inn: "string",
                email: "string",
                phone: "string"
            },
            company: {
                email: "string",
                sno: TaxSystem.osn,
                inn: "string",
                payment_address: "string",
            },
            agent_info: {
                type: AgentInfoType.bank_paying_agent,
                paying_agent: {
                    operation: "string",
                    phones: ["+375298763261"],
                },
                receive_payments_operator: {
                    phones: ["+375298763262"]
                },
                money_transfer_operator: {
                    phones: ["+375298763263"],
                    name: "string",
                    address: "string",
                    inn: "string"
                }
            },
            supplier_info: {
                phones: ["375298763264"]
            },
            items: [
                {
                    name: "string",
                    price: 42949673,
                    quantity: 99999.999,
                    sum: 42949672.95,
                    measurement_unit: "string",
                    payment_method: PaymentMethodType.full_payment,
                    payment_object: PaymentObjectFFD1_05.commodity,
                    nomenclature_code: "string",
                    vat: {
                        type: VatType.vat10,
                        sum: 99999999.99,
                    },
                    agent_info: {
                        type: AgentInfoType.bank_paying_agent,
                        paying_agent: {
                            operation: "string",
                            phones: ["+375441238751"]
                        },
                        receive_payments_operator: {
                            phones: ["+375441238752"]
                        },
                        money_transfer_operator: {
                            phones: ["+375441238734"],
                            name: "string",
                            address: "string",
                            inn: "string",
                        },
                    },
                    supplier_info: {
                        phones: ["+375441238731"],
                        name: "string",
                        inn: "string",
                    },
                    user_data: "string",
                    excise: 0,
                    country_code: "str",
                    declaration_number: "string",
                }
            ],
            payments: [{
                type: PaymentsType.cash,
                sum: 99999999.99,
            }],
            vats: [{
                type: VatType.vat0,
                sum: 99999999.99,
            }],
            total: 99999999.99,
            additional_check_props: "string",
            cashier: "string",
            additional_user_props: {
                name: "string",
                value: "string"
            }
        }
    },
    PaymentDetails: {
        Value: "",
    },
    PaymentMethod: "Cryptogram",
}

```

### Получение `Value` для `PaymentDetails` для методов оплаты Cryptogram и CryptogramRSA

Для получения Value необходимо вызвать функцию `getCryptogramValue`

```tsx

//Для методы оплаты CryptogramRSA
    cryptogram = getCryptogramRSAValue(cryptogramValue, publicRSAKey);

//Для метода оплаты Cryptogram
    try {
        cryptogram = await getCryptogramECDHValue(cryptogramValue, publicKey);
        break;
    } catch (error) {
        console.error(error);
    }
```

### Создание заголовка для вызова методы оплаты
Создания заголовка для метода оплаты `paymentApi.publicPay`:

```jsx
import { PublicPayHeader } from 'payselection-pay-app-sdk-reactnative/src/types/payment/paymentPayload';

const payHeader: PublicPayHeader = {
  X_SITE_ID: '99999',
  X_REQUEST_ID: 'Tkrdjvb87630Uegp', // X_REQUEST_ID должен быть уникальным
}
```

### Вызов метода оплаты `paymentApi.publicPay`

```jsx
import paymentApi from 'payselection-pay-app-sdk-reactnative/src/api/payment';

const result = await paymentApi.publicPay(cryptogramPaymentDataFFD1_05, payHeader);
```


## Использование getStatusApi

### Генерация подписи запроса (X-REQUEST-SIGNATURE)
Перед тем как использовать `getStatusApi` необходимо сгенерировать уникальную подпись запроса. Для этого необходимо создать интерфейс типа `SignatureProps` и вызвать метод `signatureGeneration`
для генерации подписи запроса:

```jsx
const signaturePayment: SignatureProps = {
  requestMethod: 'POST', // Request method (Метод запроса)
  url: 'https://example.com', // URL (Адрес запроса)
  xSiteId: '99999', // X-SITE-ID (Находится в личном кабинете мерчанта, в разделе “Сайты”, параметр ID сайта)
  xRequestId: 'Tkrdjvb87630Uegp', // X-REQUEST-ID (Генерируется на стороне мерчанта)
  siteSecretKey: 'jdPnu3LKGnBqShN3', // Cекретный ключ или публичный ключ
}

const signature = signatureGeneration(signaturePayment);
```

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

### Вызов методов получения информации о транзакции по orderId или TransactionId

```jsx
import getStatusApi from 'payselection-pay-app-sdk-reactnative/src/api/status';

// Для получения информации по `orderId`
// orderId из ответа publicPay
 const result = await getStatusApi.getStatusByOrderId(orderId, getStatusByOrderIdHeader);
// Для получения информации по `TransactionId`
// TransactionId из ответа publicPay
 const result = await getStatusApi.getStatusByTransactionId(transactionId, getStatusByTransactionIdHeader);
```

## Поддержка

По возникающим вопросам технического характера обращайтесь на [support@payselection.com](mailto:support@payselection.com)
