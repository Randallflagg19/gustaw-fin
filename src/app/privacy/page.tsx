import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — Gustaw",
  description: "Политика конфиденциальности сайта Gustaw.ru",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Политика конфиденциальности
        </h1>

        <div className="prose prose-lg text-gray-700 space-y-6">
          <p className="text-sm text-gray-500">
            Последнее обновление: {new Date().toLocaleDateString("ru-RU")}
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              1. Общие положения
            </h2>
            <p>
              Настоящая Политика конфиденциальности регулирует порядок обработки
              и защиты персональных данных пользователей сайта gustaw.ru (далее
              — &ldquo;Сайт&rdquo;).
            </p>
            <p>
              Используя Сайт, вы соглашаетесь с условиями настоящей Политики
              конфиденциальности.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              2. Какие данные мы собираем
            </h2>
            <p>
              При использовании Сайта мы можем собирать следующую информацию:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>При регистрации через email:</strong> адрес электронной
                почты, логин, хешированный пароль
              </li>
              <li>
                <strong>При авторизации через Google:</strong> адрес электронной
                почты, имя, фотография профиля (предоставляются Google)
              </li>
              <li>
                <strong>Информация о действиях:</strong> лайки на фотографиях,
                бронирования фотосессий
              </li>
              <li>
                <strong>Технические данные:</strong> IP-адрес, тип браузера,
                операционная система (для обеспечения безопасности)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              3. Как мы используем данные
            </h2>
            <p>Мы используем собранные данные для:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Обеспечения работы вашей учетной записи</li>
              <li>Сохранения ваших предпочтений (лайки, избранное)</li>
              <li>Обработки бронирований фотосессий</li>
              <li>
                Связи с вами по вопросам, связанным с использованием Сайта
              </li>
              <li>Улучшения функциональности Сайта</li>
              <li>Обеспечения безопасности и предотвращения злоупотреблений</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              4. Как мы защищаем данные
            </h2>
            <p>
              Мы принимаем необходимые меры для защиты ваших персональных
              данных:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Пароли хранятся в хешированном виде (bcrypt)</li>
              <li>Данные хранятся в защищённой базе данных PostgreSQL</li>
              <li>Используется HTTPS-шифрование для передачи данных</li>
              <li>
                Доступ к базе данных имеют только авторизованные администраторы
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              5. Передача данных третьим лицам
            </h2>
            <p>
              Мы <strong>не продаём и не передаём</strong> ваши персональные
              данные третьим лицам, за исключением следующих случаев:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Google OAuth:</strong> при авторизации через Google ваши
                данные обрабатываются в соответствии с{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Политикой конфиденциальности Google
                </a>
              </li>
              <li>
                <strong>Cloudinary:</strong> фотографии хранятся на сервисе
                Cloudinary в соответствии с их политикой конфиденциальности
              </li>
              <li>По требованию законодательства Российской Федерации</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              6. Cookies и похожие технологии
            </h2>
            <p>
              Мы используем cookies для обеспечения работы аутентификации и
              улучшения пользовательского опыта. Вы можете настроить свой
              браузер для блокировки cookies, однако это может ограничить
              функциональность Сайта.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              7. Ваши права
            </h2>
            <p>Вы имеете право:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Получить доступ к своим персональным данным</li>
              <li>Исправить неточные данные</li>
              <li>Запросить удаление своих данных</li>
              <li>Отозвать согласие на обработку данных</li>
              <li>Подать жалобу в надзорный орган</li>
            </ul>
            <p className="mt-4">
              Для реализации своих прав свяжитесь с нами по адресу:{" "}
              <a
                href="mailto:lextapir191919@gmail.com"
                className="text-blue-600 hover:underline"
              >
                lextapir191919@gmail.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              8. Изменения в Политике конфиденциальности
            </h2>
            <p>
              Мы оставляем за собой право вносить изменения в настоящую Политику
              конфиденциальности. Дата последнего обновления указана в начале
              документа.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              9. Контактная информация
            </h2>
            <p>
              По всем вопросам, связанным с обработкой персональных данных, вы
              можете связаться с нами:
            </p>
            <ul className="list-none space-y-2">
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:lextapir191919@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  lextapir191919@gmail.com
                </a>
              </li>
              <li>
                <strong>Сайт:</strong>{" "}
                <a
                  href="https://gustaw.ru"
                  className="text-blue-600 hover:underline"
                >
                  gustaw.ru
                </a>
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/"
            className="text-blue-600 hover:underline text-lg font-medium"
          >
            ← Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
}
