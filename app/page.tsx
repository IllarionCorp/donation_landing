"use client";

import { useState } from "react";

const amounts = [150, 300, 500, 1000];

function getCheckoutUrl(
  amount: number,
  frequency: "once" | "monthly",
  message: string,
) {
  const checkoutUrl = process.env.NEXT_PUBLIC_DONATION_URL;

  if (!checkoutUrl) {
    return null;
  }

  const url = new URL(checkoutUrl);
  if (url.protocol !== "https:" && url.protocol !== "http:") {
    throw new TypeError("Checkout URL must use HTTP or HTTPS.");
  }

  url.searchParams.set("amount", String(amount));
  url.searchParams.set("frequency", frequency);
  url.searchParams.set("message", message);
  return url.toString();
}

export default function Home() {
  const [amount, setAmount] = useState(300);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState("");

  const selectedAmount = customAmount ? Number(customAmount) : amount;

  function handleDonate() {
    if (!Number.isSafeInteger(selectedAmount) || selectedAmount < 1) {
      setNotice("Укажи целую сумму больше нуля.");
      return;
    }

    let checkoutUrl: string | null;
    try {
      checkoutUrl = getCheckoutUrl(selectedAmount, frequency, message);
    } catch (error) {
      if (error instanceof TypeError) {
        setNotice("Ссылка на оплату настроена некорректно.");
        return;
      }

      throw error;
    }

    if (!checkoutUrl) {
      setNotice(
        "Чтобы принимать донаты, добавь ссылку на оплату в NEXT_PUBLIC_DONATION_URL.",
      );
      return;
    }

    window.location.assign(checkoutUrl);
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="На главную">
          <span className="brand-mark">м.</span>
          <span>моё маленькое дело</span>
        </a>
        <a className="topbar-link" href="#support">
          Поддержать <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="status-dot" />
            независимый автор · делаю с душой
          </div>
          <h1 id="hero-title">
            Привет! Я создаю
            <br />
            <span>кое-что хорошее.</span>
          </h1>
          <p className="intro">
            Пишу, придумываю и делюсь тем, что люблю. Если мои штуки делают
            твой день чуточку лучше — можешь угостить меня кофе.
          </p>
          <a className="text-link" href="#support">
            Поддержать моё творчество <span aria-hidden="true">↓</span>
          </a>

          <div className="hero-note">
            <span className="note-star" aria-hidden="true">✳</span>
            <p>
              <strong>Любой вклад важен.</strong>
              <br />
              Даже добрая мысль — уже поддержка.
            </p>
          </div>
        </div>

        <div className="visual" aria-hidden="true">
          <div className="visual-sun" />
          <div className="visual-label label-top">делаю с любовью</div>
          <div className="cup-shadow" />
          <div className="cup">
            <div className="cup-handle" />
            <div className="cup-rim" />
            <span className="cup-heart">♥</span>
            <div className="cup-base" />
          </div>
          <div className="steam steam-one" />
          <div className="steam steam-two" />
          <div className="visual-label label-bottom">
            <span>☕</span> кофе = новые идеи
          </div>
          <span className="sparkle sparkle-one">✳</span>
          <span className="sparkle sparkle-two">✦</span>
        </div>
      </section>

      <section className="support-section" id="support" aria-labelledby="support-title">
        <div className="section-heading">
          <div>
            <span className="section-kicker">тёплая поддержка</span>
            <h2 id="support-title">Угостишь кофе?</h2>
          </div>
          <p>Выбери комфортную сумму — всё остальное необязательно.</p>
        </div>

        <div className="donation-card">
          <div className="frequency-switch" aria-label="Периодичность доната">
            <button
              className={frequency === "once" ? "frequency active" : "frequency"}
              type="button"
              onClick={() => setFrequency("once")}
              aria-pressed={frequency === "once"}
            >
              Один раз
            </button>
            <button
              className={frequency === "monthly" ? "frequency active" : "frequency"}
              type="button"
              onClick={() => setFrequency("monthly")}
              aria-pressed={frequency === "monthly"}
            >
              Каждый месяц
            </button>
          </div>

          <fieldset className="amount-fieldset">
            <legend>Сумма доната</legend>
            <div className="amount-options">
              {amounts.map((option) => (
                <button
                  className={
                    !customAmount && amount === option
                      ? "amount-option selected"
                      : "amount-option"
                  }
                  type="button"
                  key={option}
                  onClick={() => {
                    setAmount(option);
                    setCustomAmount("");
                    setNotice("");
                  }}
                  aria-pressed={!customAmount && amount === option}
                >
                  {option} ₽
                </button>
              ))}
            </div>
          </fieldset>

          <label className="field-label" htmlFor="custom-amount">
            Или своя сумма
          </label>
          <div className="input-wrap amount-input-wrap">
            <input
              id="custom-amount"
              type="number"
              min="1"
              step="1"
              inputMode="numeric"
              placeholder="Например, 700"
              value={customAmount}
              onChange={(event) => {
                setCustomAmount(event.target.value);
                setNotice("");
              }}
            />
            <span>₽</span>
          </div>

          <label className="field-label" htmlFor="message">
            Оставить сообщение <span className="optional">(по желанию)</span>
          </label>
          <div className="input-wrap message-input-wrap">
            <textarea
              id="message"
              maxLength={240}
              placeholder="Напиши пару тёплых слов..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <span className="message-count">{message.length}/240</span>
          </div>

          <button className="donate-button" type="button" onClick={handleDonate}>
            Поддержать{frequency === "monthly" ? " каждый месяц" : ""} на{" "}
            {selectedAmount > 0 ? selectedAmount : amount} ₽
            <span aria-hidden="true">↗</span>
          </button>
          {notice && (
            <p className="notice" role="status">
              {notice}
            </p>
          )}
          <p className="secure-note">
            <span aria-hidden="true">♡</span> Оплата на странице платёжного сервиса
          </p>
        </div>
      </section>

      <section className="thanks" aria-label="Спасибо за поддержку">
        <div className="thanks-icon" aria-hidden="true">✳</div>
        <p>
          <strong>Спасибо, что ты здесь.</strong>
          <br />
          Благодаря тебе хочется создавать дальше.
        </p>
        <span className="thanks-doodle" aria-hidden="true">♡</span>
      </section>

      <footer className="footer">
        <span>сделано с теплом и чашкой кофе</span>
        <span>© {new Date().getFullYear()} · все права и идеи при мне</span>
      </footer>
    </main>
  );
}
