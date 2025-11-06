import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Условия использования — Gustaw",
  description: "Условия использования сайта Gustaw.ru",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Условия использования
        </h1>

        <div className="prose prose-lg text-gray-700 space-y-6">
          <p className="text-sm text-gray-500">
            Последнее обновление: {new Date().toLocaleDateString("ru-RU")}
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              1. Принятие условий
            </h2>
            <p>
              Добро пожаловать на сайт gustaw.ru (далее — &ldquo;Сайт&rdquo;). Используя
              Сайт, вы соглашаетесь соблюдать настоящие Условия использования.
              Если вы не согласны с какими-либо условиями, пожалуйста, не
              используйте Сайт.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              2. Описание сервиса
            </h2>
            <p>
              Gustaw.ru — это онлайн-портфолио профессионального фотографа,
              которое предоставляет следующие возможности:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Просмотр фотографий из портфолио</li>
              <li>
                Регистрация и авторизация пользователей (через email или Google)
              </li>
              <li>Возможность ставить лайки на фотографии</li>
              <li>Бронирование фотосессий</li>
              <li>Загрузка фотографий (для администраторов)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              3. Регистрация и учетная запись
            </h2>
            <p>
              Для доступа к некоторым функциям Сайта вам необходимо создать
              учетную запись:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Вы можете зарегистрироваться через email или через Google OAuth
              </li>
              <li>
                Вы обязуетесь предоставлять точную и актуальную информацию
              </li>
              <li>
                Вы несете ответственность за безопасность своего пароля (если
                используете регистрацию через email)
              </li>
              <li>
                Вы обязуетесь немедленно уведомить нас о любом несанкционированном
                доступе к вашей учетной записи
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              4. Правила поведения
            </h2>
            <p>При использовании Сайта вы обязуетесь:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Не использовать Сайт в незаконных целях или способами, нарушающими
                законодательство РФ
              </li>
              <li>Не пытаться получить несанкционированный доступ к Сайту</li>
              <li>Не создавать чрезмерную нагрузку на серверы Сайта</li>
              <li>
                Не использовать автоматизированные средства (боты) для взаимодействия
                с Сайтом без разрешения
              </li>
              <li>
                Уважать авторские права на фотографии и другой контент Сайта
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              5. Интеллектуальная собственность
            </h2>
            <p>
              Все фотографии, дизайн, логотипы и другой контент на Сайте
              являются собственностью владельца Сайта или использованы с
              разрешения правообладателей.
            </p>
            <p>
              Вы <strong>не имеете права</strong>:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Копировать, распространять или изменять фотографии без разрешения</li>
              <li>Использовать контент Сайта в коммерческих целях</li>
              <li>Выдавать себя за автора фотографий</li>
            </ul>
            <p className="mt-4">
              Для получения разрешения на использование фотографий свяжитесь с нами
              по адресу:{" "}
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
              6. Бронирование фотосессий
            </h2>
            <p>
              Бронирование фотосессий через Сайт является предварительным запросом
              и не является гарантией подтверждения:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Подтверждение бронирования осуществляется после согласования деталей
              </li>
              <li>Цены и условия могут быть изменены без предварительного уведомления</li>
              <li>Отмена бронирования возможна в соответствии с условиями договора</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              7. Ограничение ответственности
            </h2>
            <p>
              Сайт предоставляется &ldquo;как есть&rdquo;, без каких-либо гарантий:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Мы не гарантируем бесперебойную работу Сайта и можем проводить
                технические работы
              </li>
              <li>
                Мы не несем ответственности за любые убытки, возникшие в результате
                использования или невозможности использования Сайта
              </li>
              <li>
                Мы не несем ответственности за содержание внешних ссылок (Google,
                Cloudinary и др.)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              8. Изменения в Условиях использования
            </h2>
            <p>
              Мы оставляем за собой право изменять настоящие Условия использования
              в любое время. Изменения вступают в силу с момента публикации на
              Сайте. Дата последнего обновления указана в начале документа.
            </p>
            <p>
              Продолжая использовать Сайт после внесения изменений, вы соглашаетесь
              с обновленными Условиями.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              9. Прекращение использования
            </h2>
            <p>
              Мы оставляем за собой право заблокировать или удалить вашу учетную
              запись в случае нарушения настоящих Условий использования или по
              другим причинам без предварительного уведомления.
            </p>
            <p>
              Вы можете в любое время прекратить использование Сайта и запросить
              удаление своей учетной записи, связавшись с нами.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              10. Применимое право
            </h2>
            <p>
              Настоящие Условия использования регулируются законодательством
              Российской Федерации. Все споры разрешаются в соответствии с
              действующим законодательством РФ.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              11. Контактная информация
            </h2>
            <p>
              По всем вопросам, связанным с использованием Сайта, вы можете
              связаться с нами:
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

