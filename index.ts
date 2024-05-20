//---------------------------------------------------------------------------------
//Разминка
// Определите интерфейс для пользователя
interface User {
  id: number;
  name: string;
  email: string;
  // Добавьте свойство email типа string
}

// Определите интерфейс для активности пользователя
interface Activity {
  userId: number;
  activity: string;
  timestamp: Date;
  // Добавьте свойство timestamp типа Date
}

// Реализуйте функцию fetchData используя Generic. Функция должна возвращать Promise.
async function fetchData<T>(url: string): Promise<T> {
  return new Promise<T>(async (resolve, reject) => {
    try {
      const response = await fetch(url);
      if (!response) {
        throw new Error("Данные не получены");
      }
      const data = await response.json();
      resolve(data as T);
    } catch (error) {
      reject(error);
    }

    // Реализуйте получение данных с использованием fetch и возвращение их в формате json
  });
}

// Используйте Utility Types для создания Partial и Readonly версий User и Activity
type PartialUser = Partial<User>; // Заполните тип
type ReadonlyActivity = Readonly<User>; // Заполните тип

//Типизируйте функцию. userId - число
function getUserActivities(userId: number) {
  return fetchData(`/api/activities/${userId}`);
}
// Используйте ReturnType для создания типа возвращаемого значения функции getUserActivities
type ActivitiesReturnType = ReturnType<typeof getUserActivities>; // Заполните тип

// Используйте extends в условных типах для создания типа Permissions
type AdminPermissions = { canBanUser: boolean };
type BasicPermissions = { canEditProfile: boolean };
// Заполните тип. Должен выявляться на основне некоторого дженерика и опредять, какой из пермишенов выдавать: Admin или Basic.
type UserPermissions<T extends boolean> = T extends true
  ? AdminPermissions
  : BasicPermissions;

///ЧАСТЬ 2.

// Определите Type Alias для Union типа String или Number
type SomeType = string | number;
type StringOrNumber = SomeType; // Заполните тип

// Реализуйте функцию logMessage, которая принимает StringOrNumber и не возвращает значение (void)
function logMessage(message: StringOrNumber): void {
  console.log(message);
  // Реализуйте вывод сообщения в консоль
}

// Реализуйте функцию throwError, которая никогда не возвращает управление (never)
function throwError(errorMsg: string): never {
  throw new Error(errorMsg);
  // Бросьте исключение с errorMsg
}

// Реализуйте Type Guard для проверки, является ли значение строкой
function isString(value: StringOrNumber): value is string {
  return typeof value === "string";
  // Верните результат проверки типа
}

// Реализуйте функцию assertIsNumber, которая использует asserts для утверждения типа number
function assertIsNumber(value: any): asserts value is number {
  if (typeof value !== "number") {
    throw new Error(`${value} не является числом`);
  }
  // Бросьте исключение, если значение не является числом
}

// Завершите функцию processValue, используя isString и assertIsNumber
function processValue(value: StringOrNumber) {
  if (isString(value)) {
    console.log(`${value} является строкой.`);
  } else {
    assertIsNumber(value);
    console.log(`${value} является числом.`);
  }
  // Реализуйте логику проверки и обработки значения
}
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
// Задание 2: Расширенное использование Generics
// Цель: Создать универсальную функцию обработки данных, которая может работать с различными типами данных.

// Определите Generic интерфейс Response с одним параметром типа T. Второй параметр status: number

interface Res<T> {
  status: number;
  data: T;
}

interface T {}

// Реализуйте и типизируйте функцию, которая возвращает объект Response для переданных данных
function createResponse(data: T, status: number): Res<T> {
  return {
    status,
    data,
    // Реализуйте создание и возврат объекта Response
  };
  // Реализуйте создание и возврат объекта Response
}

// Используйте функцию createResponse для создания ответа с массивом чисел
const numericResponse = createResponse([1, 2, 3, 4, 5], 200); // Заполните вызов функции

// Используйте функцию createResponse для создания ответа с объектом пользователя (User)
const userResponse = createResponse({ name: "Andrew", age: 21 }, 200); // Заполните вызов функции
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
// Задание 3: Расширенное использование Generics
// Цель: Разработать несколько функций для обработки и различения типов данных.

// Определите тип данных для описания автомобиля
type Car = {
  company: string;
  model: string;
  year: number;
  type: "sedan" | "truck" | "hatchback" | "minivan";
  name: string;
};

// Определите тип данных для описания велосипеда
type Bike = {
  company: string;
  model: string;
  year: number;
  name: string;
  type: "road" | "mountain";
};

// Создайте Type Guard для проверки, является ли объект автомобилем
function isCar(vehicle: Car | Bike): vehicle is Car {
  return (
    "type" in vehicle &&
    (vehicle.type === "sedan" ||
      vehicle.type === "truck" ||
      vehicle.type === "hatchback" ||
      vehicle.type === "minivan")
  );
}

// Используйте Type Guard в функции, которая печатает информацию о транспорте. Небольшая подсказка о том, какие параметры в себя может принимать isCar дана ниже.
function printVehicleInfo(vehicle: Car | Bike) {
  if (isCar(vehicle)) {
    console.log(`Car: ${vehicle.model} ${vehicle.type} ${vehicle.company}`);
  } else {
    console.log(`Bike: ${vehicle.model} ${vehicle.type} ${vehicle.company}`);
  }
}
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
// Задание 4: Использование Utility Types для работы с интерфейсами
// Цель: Модифицировать интерфейсы для специфических нужд без изменения оригинальных интерфейсов.

//  Определите интерфейс Employee
interface Employee {
  id: number;
  name: string;
  department: string;
  email: string;
}

// Используйте Utility Type для создания типа, который делает все свойства Employee опциональными
type PartialEmployee = Partial<Employee>; // Заполните тип

// Используйте Utility Type для создания типа, который делает все свойства Employee доступными только для чтения
type ReadonlyEmployee = Readonly<Employee>; // Заполните тип

// Создайте функцию, которая принимает PartialEmployee и выводит информацию о сотруднике
function printEmployeeInfo(employee: PartialEmployee) {
  const {
    name = "Имя неизвестно",
    department = "Департамент не известен",
    email = "Почта не известна",
  } = employee;
  if (!name || !department || !email) {
    console.log("Заполните данные");
  } else {
    console.log(
      `${name} работает в  ${department} письма отправлять на ${email}`
    );
  }

  // Реализуйте логику функции, обрабатывая случай отсутствующих свойств
}

//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
//Задание 5: Работа с Indexed Access Types и Mapped Types
//Цель: Создать утилиты для работы с объектами и их ключами.

// Определите интерфейс для пользователя
interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  age: number;
}

// Используйте Indexed Access Types для получения типа поля name из User
type UserNameType = User["name"];

// Создайте Mapped Type, который преобразует все поля интерфейса User в boolean. Можно воспользовать конструкцией Key in keyof
type UserFieldsToBoolean = { [Key in keyof User]: boolean };

const exampleUser: User = {
  id: 1,
  name: "John",
  surname: "Doe",
  email: "john.doe@example.com",
  age: 30,
};

// Реализуйте функцию, которая принимает ключи интерфейса User и возвращает их типы
function getUserFieldType<T extends keyof User>(key: T): string {
  // Верните тип ключа
  return typeof exampleUser[key];
}

// Используйте эту функцию для получения типа поля 'age' и 'name'
const ageType = getUserFieldType("age");
const nameType = getUserFieldType("name");
//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
// Задание 6: Расширение и ограничение Generics
// Цель: Создать универсальные функции с ограничениями типов.

//Создайте базовый интерфейс для сущностей с идентификатором
interface Identifiable {
  id: number;
}

interface Customer extends Identifiable {
  name: string;
  email: string;
  age: number;
}

// Типизируйте функцию, которая принимает массив объектов с ограничением на Generics, где каждый объект должен соответствовать интерфейсу Identifiable. Не забывайте, что find может вернуть undefined
function findById<T extends Identifiable>(
  items: T[],
  id: number
): T | undefined {
  return items.find((item) => item.id === id);
}

// Используйте эту функцию для поиска пользователя по id в массиве пользователей
const customers: Customer[] = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 30 },
];
const customer = findById(customers, 1);

//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------
// Задание 7: Работа с обобщённой функцией поиска в массиве
// Цель: Создать функцию, которая может искать элементы в массиве по разным критериям, включая составные типы и условия с использованием нескольких параметров в Generics.

// // Разберитесь с типизацией функции и поймите как она работает.
// // Как можно улучшить функцию findInArray, чтобы она обрабатывала случаи, когда ключ или значение отсутствуют?
// // Можно ли использовать эту функцию для поиска по нескольким ключам одновременно? Если да, как бы вы это реализовали?
interface Students {
  id: number;
  name: string;
  age: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Book {
  isbn: string;
  title: string;
  author: string;
}

function findInArray<T>(items: T[], criteria: Partial<T>): T | undefined {
  return items.find((item) =>
    Object.entries(criteria).every(
      ([key, value]) => item[key as keyof T] === value
    )
  );
}

// Данные для тестирования функции
const users: Students[] = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
];

const products: Product[] = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Smartphone", price: 500 },
];

const books: Book[] = [
  { isbn: "12345", title: "The TypeScript Handbook", author: "Someone" },
  { isbn: "67890", title: "Learning TypeScript", author: "Another One" },
];

// 1. Найдите пользователя по имени "Alice".
const foundUser = findInArray(users, { name: "Bob" });

// 2. Найдите продукт с ценой 500.
const foundProduct = findInArray(products, { price: 500 });

// 3. Найдите книгу по автору "Another One".
const foundBook = findInArray(books, { author: "Another One" });

//---------------------------------------------------------------------------------
// Задание 8: Реализация обобщённой функции для сопоставления и преобразования элементов массива
// Цель: Создать функцию mapAndFilter, которая будет принимать массив объектов, функцию для их преобразования и функцию для фильтрации результатов. Функция должна использовать два параметра Generic: один для типа элементов входного массива, а другой для типа элементов выходного массива.

// Описание задачи: Функция mapAndFilter должна выполнить следующие функции:
// Применить функцию преобразования ко всем элементам входного массива.
// Фильтровать преобразованные элементы с помощью предоставленной функции фильтрации.
// Возвращать новый массив с результатами, которые прошли фильтрацию.
interface Person {
  name: string;
  age: number;
}

interface Adult {
  fullName: string;
  age: number;
}

// Напишите функцию mapAndFilter здесь. Используйте два параметра Generic: T для типа входных данных и U для типа выходных данных.
function mapAndFilter<T, U>(
  items: T[],
  transform: (item: T) => U,
  filter: (item: U) => boolean
): U[] {
  // Ваш код здесь
  const transformedItems = items.map(transform);

  const filteredItems = transformedItems.filter(filter);

  return filteredItems;
}

// Пример данных
const people: Person[] = [
  { name: "Alice", age: 24 },
  { name: "Bob", age: 17 },
  { name: "Charlie", age: 32 },
];

// Пример использования функции mapAndFilter
const adults: Adult[] = mapAndFilter(
  people,
  (person) => ({ fullName: person.name, age: person.age }),
  (adult) => adult.age >= 18
);

// Выведите результаты для проверки
console.log(adults);

//Вопросы после реализации:
// Как изменится функция, если необходимо добавить возможность изменения критерия сортировки?
{
  ("Чтобы добавить функцию в сортировку необходимо добавить еще один параметр который будет принимать в себя функцию сортировки");
}

//   ("function mapFilterAndSort<T, U>(
//     items: T[],
//     transform: (item: T) => U,
//     filter: (item: U) => boolean,
//     sort?: (a: U, b: U) => number
//   ): U[] {
//     const transformedItems = items.map(transform);
//     const filteredItems = transformedItems.filter(filter);
//     if (sort) {
//       return filteredItems.sort(sort);
//     }
//     return filteredItems;
//   }
//   ");

// Могут ли типы T и U быть полностью разными или должны иметь общие характеристики? Объясните ваш ответ.
{
  ("Так как преобразование определяется функцией transform, то T и U могут быть полностью разными, если такая задача заложена в приложении");
}
//---------------------------------------------------------------------------------
