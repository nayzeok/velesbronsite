// keystatic.config.ts
// Структура: Сайт | Продукт | Где купить | Контент | Контакты | Статистика
import {
  config,
  fields,
  collection,
  singleton,
} from "@keystatic/core";

const MARKETPLACE_OPTIONS = [
  { label: "Wildberries", value: "WB" },
  { label: "Ozon", value: "OZON" },
  { label: "Яндекс.Маркет", value: "YM" },
  { label: "Маркет", value: "Market" },
] as const;

// Цветовые пресеты сайта задаются в Сайт → color_preset; у продукта выбирается ключ (primary/secondary/accent)
const COLOR_PRESET_KEYS = [
  { label: "Основной", value: "primary" },
  { label: "Дополнительный", value: "secondary" },
  { label: "Акцент", value: "accent" },
] as const;

export default config({
  storage: {
    kind: "local",
  },

  // ——— Коллекции ———

  collections: {
    // Продукт: name, description, photo, where_to_buy (ссылка на Где купить), color (из пресетов сайта)
    products: collection({
      label: "Продукты",
      slugField: "title",
      path: "content/products/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Название" } }),
        description: fields.text({
          label: "Описание",
          multiline: true,
        }),
        image: fields.image({
          label: "Фото",
          directory: "public/images/products",
          publicPath: "/images/products/",
        }),
        where_to_buy: fields.multiRelationship({
          label: "Где купить",
          collection: "whereToBuy",
          description: "Связь с маркетплейсами (Где купить)",
        }),
        color: fields.select({
          label: "Цвет (из пресетов сайта)",
          options: [...COLOR_PRESET_KEYS],
          defaultValue: "primary",
        }),
        content: fields.markdoc({ label: "Контент" }),
      },
    }),

    // Где купить: WB, OZON, YM, Market + ротируемые ссылки на магазины
    whereToBuy: collection({
      label: "Где купить",
      slugField: "marketplaceName",
      path: "content/where-to-buy/*",
      schema: {
        platform: fields.select({
          label: "Платформа",
          options: [...MARKETPLACE_OPTIONS],
          defaultValue: "OZON",
        }),
        marketplaceName: fields.slug({
          name: { label: "Название (например магазин или вариант)" },
        }),
        storeLinks: fields.array(
          fields.object({
            label: fields.text({
              label: "Подпись (название магазина или варианта)",
            }),
            url: fields.url({ label: "URL страницы" }),
          }),
          {
            label: "Ссылки на магазины (для ротации)",
            description:
              "Несколько ссылок на один маркетплейс — на сайте можно ротировать.",
            itemLabel: (props) => {
              const label =
                "label" in props.fields && "value" in props.fields.label
                  ? String(props.fields.label.value)
                  : "";
              const url =
                "url" in props.fields && "value" in props.fields.url
                  ? String(props.fields.url.value)
                  : "";
              return label || url || "Ссылка";
            },
          }
        ),
      },
    }),
  },

  // ——— Синглтоны ———

  singletons: {
    // Сайт: sitepic, logo, sitename, color_preset, placeholder
    site: singleton({
      label: "Сайт",
      path: "content/settings/site",
      format: { data: "json" },
      schema: {
        sitepic: fields.image({
          label: "Картинка сайта",
          directory: "public/images",
          publicPath: "/images/",
          description: "Основное изображение / обложка сайта",
        }),
        logo: fields.image({
          label: "Логотип",
          directory: "public/images",
          publicPath: "/images/",
        }),
        sitename: fields.text({
          label: "Название сайта",
          defaultValue: "VelesBron",
        }),
        color_preset: fields.array(
          fields.object({
            key: fields.select({
              label: "Ключ",
              options: [...COLOR_PRESET_KEYS],
              defaultValue: "primary",
            }),
            name: fields.text({ label: "Название" }),
            value: fields.text({
              label: "Значение (hex или CSS)",
              description: "Например #1a1a1a или var(--color)",
            }),
          }),
          {
            label: "Цветовые пресеты",
            description: "Пресеты цветов для сайта и продуктов",
            itemLabel: (props) => {
              const name =
                "name" in props.fields && "value" in props.fields.name
                  ? String(props.fields.name.value)
                  : "";
              const key =
                "key" in props.fields && "value" in props.fields.key
                  ? String(props.fields.key.value)
                  : "";
              return name || key || "Пресет";
            },
          }
        ),
        placeholder: fields.image({
          label: "Плейсхолдер",
          directory: "public/images",
          publicPath: "/images/",
          description: "Изображение или картинка по умолчанию",
        }),
      },
    }),

    // Контакты (подмена на всём сайте)
    contacts: singleton({
      label: "Контакты",
      path: "content/settings/contacts",
      format: { data: "json" },
      schema: {
        phone: fields.text({ label: "Телефон" }),
        email: fields.text({ label: "Email" }),
        address: fields.text({
          label: "Адрес",
          multiline: true,
        }),
        telegram: fields.url({ label: "Telegram" }),
        whatsapp: fields.url({ label: "WhatsApp" }),
        vk: fields.url({ label: "VK" }),
      },
    }),

    // Статистика: счётчики для сайта и ID аналитики
    statistics: singleton({
      label: "Статистика",
      path: "content/settings/statistics",
      format: { data: "json" },
      schema: {
        // Метрики для отображения на сайте (блок «Цифры»)
        displayStats: fields.array(
          fields.object({
            label: fields.text({
              label: "Подпись",
              description: "Например: «Лет на рынке», «Довольных клиентов»",
            }),
            value: fields.text({
              label: "Значение",
              description: "Например: 10+, 500+, 99%",
            }),
          }),
          {
            label: "Показатели на сайте",
            description: "Цифры для блока статистики на главной или в футере",
            itemLabel: (props) => {
              const label =
                "label" in props.fields && "value" in props.fields.label
                  ? String(props.fields.label.value)
                  : "";
              const value =
                "value" in props.fields && "value" in props.fields.value
                  ? String(props.fields.value.value)
                  : "";
              return label ? `${label}: ${value}` : value || "Показатель";
            },
          }
        ),
        // Счётчики аналитики (подставляются в код сайта)
        yandexMetrikaId: fields.text({
          label: "ID Яндекс.Метрики",
          description: "Числовой ID счётчика (например 12345678)",
        }),
        googleAnalyticsId: fields.text({
          label: "ID Google Analytics (GA4)",
          description: "G-XXXXXXXXXX",
        }),
      },
    }),

    // Контент: страницы из блоков (страница 1 → блок 1, блок 2, …)
    pageHome: singleton({
      label: "Контент: Главная",
      path: "content/pages/home",
      format: { data: "json" },
      schema: {
        title: fields.text({ label: "Заголовок страницы" }),
        blocks: fields.blocks(
          {
            heading: {
              label: "Заголовок",
              schema: fields.object({
                text: fields.text({ label: "Текст" }),
                level: fields.select({
                  label: "Уровень",
                  options: [
                    { label: "H1", value: "1" },
                    { label: "H2", value: "2" },
                    { label: "H3", value: "3" },
                  ],
                  defaultValue: "2",
                }),
              }),
            },
            paragraph: {
              label: "Текст",
              schema: fields.object({
                text: fields.text({ label: "Текст", multiline: true }),
              }),
            },
            image: {
              label: "Изображение",
              schema: fields.object({
                image: fields.image({
                  label: "Картинка",
                  directory: "public/images/pages",
                  publicPath: "/images/pages/",
                }),
                alt: fields.text({ label: "Подпись" }),
              }),
            },
          },
          { label: "Блоки страницы" }
        ),
      },
    }),

    pageFaq: singleton({
      label: "Контент: FAQ",
      path: "content/pages/faq",
      format: { data: "json" },
      schema: {
        title: fields.text({ label: "Заголовок страницы" }),
        blocks: fields.blocks(
          {
            heading: {
              label: "Заголовок",
              schema: fields.object({
                text: fields.text({ label: "Текст" }),
                level: fields.select({
                  label: "Уровень",
                  options: [
                    { label: "H1", value: "1" },
                    { label: "H2", value: "2" },
                    { label: "H3", value: "3" },
                  ],
                  defaultValue: "2",
                }),
              }),
            },
            paragraph: {
              label: "Текст",
              schema: fields.object({
                text: fields.text({ label: "Текст", multiline: true }),
              }),
            },
            image: {
              label: "Изображение",
              schema: fields.object({
                image: fields.image({
                  label: "Картинка",
                  directory: "public/images/pages",
                  publicPath: "/images/pages/",
                }),
                alt: fields.text({ label: "Подпись" }),
              }),
            },
          },
          { label: "Блоки страницы" }
        ),
      },
    }),

    pagePartnership: singleton({
      label: "Контент: Сотрудничество",
      path: "content/pages/partnership",
      format: { data: "json" },
      schema: {
        title: fields.text({ label: "Заголовок страницы" }),
        blocks: fields.blocks(
          {
            heading: {
              label: "Заголовок",
              schema: fields.object({
                text: fields.text({ label: "Текст" }),
                level: fields.select({
                  label: "Уровень",
                  options: [
                    { label: "H1", value: "1" },
                    { label: "H2", value: "2" },
                    { label: "H3", value: "3" },
                  ],
                  defaultValue: "2",
                }),
              }),
            },
            paragraph: {
              label: "Текст",
              schema: fields.object({
                text: fields.text({ label: "Текст", multiline: true }),
              }),
            },
            image: {
              label: "Изображение",
              schema: fields.object({
                image: fields.image({
                  label: "Картинка",
                  directory: "public/images/pages",
                  publicPath: "/images/pages/",
                }),
                alt: fields.text({ label: "Подпись" }),
              }),
            },
          },
          { label: "Блоки страницы" }
        ),
      },
    }),

    pageProduction: singleton({
      label: "Контент: Производство",
      path: "content/pages/production",
      format: { data: "json" },
      schema: {
        title: fields.text({ label: "Заголовок страницы" }),
        blocks: fields.blocks(
          {
            heading: {
              label: "Заголовок",
              schema: fields.object({
                text: fields.text({ label: "Текст" }),
                level: fields.select({
                  label: "Уровень",
                  options: [
                    { label: "H1", value: "1" },
                    { label: "H2", value: "2" },
                    { label: "H3", value: "3" },
                  ],
                  defaultValue: "2",
                }),
              }),
            },
            paragraph: {
              label: "Текст",
              schema: fields.object({
                text: fields.text({ label: "Текст", multiline: true }),
              }),
            },
            image: {
              label: "Изображение",
              schema: fields.object({
                image: fields.image({
                  label: "Картинка",
                  directory: "public/images/pages",
                  publicPath: "/images/pages/",
                }),
                alt: fields.text({ label: "Подпись" }),
              }),
            },
          },
          { label: "Блоки страницы" }
        ),
      },
    }),

    pageWhereToBuy: singleton({
      label: "Контент: Где купить",
      path: "content/pages/where-to-buy",
      format: { data: "json" },
      schema: {
        title: fields.text({ label: "Заголовок страницы" }),
        blocks: fields.blocks(
          {
            heading: {
              label: "Заголовок",
              schema: fields.object({
                text: fields.text({ label: "Текст" }),
                level: fields.select({
                  label: "Уровень",
                  options: [
                    { label: "H1", value: "1" },
                    { label: "H2", value: "2" },
                    { label: "H3", value: "3" },
                  ],
                  defaultValue: "2",
                }),
              }),
            },
            paragraph: {
              label: "Текст",
              schema: fields.object({
                text: fields.text({ label: "Текст", multiline: true }),
              }),
            },
            image: {
              label: "Изображение",
              schema: fields.object({
                image: fields.image({
                  label: "Картинка",
                  directory: "public/images/pages",
                  publicPath: "/images/pages/",
                }),
                alt: fields.text({ label: "Подпись" }),
              }),
            },
          },
          { label: "Блоки страницы" }
        ),
      },
    }),
  },
});
