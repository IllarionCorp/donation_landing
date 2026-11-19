"use client";

import Image from "next/image";
import { useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const fundraisingGoal = 75000;
const fundraisingRaised = 1500;
const fundraisingProgress = Math.min(
  100,
  Math.round((fundraisingRaised / fundraisingGoal) * 100),
);

function getTBankFundraiserUrl() {
  const paymentUrl = process.env.NEXT_PUBLIC_TBANK_FUNDRAISER_URL;

  if (!paymentUrl) {
    return null;
  }

  const url = new URL(paymentUrl);
  if (url.protocol !== "https:") {
    throw new TypeError("T-Bank fundraiser URL must use HTTPS.");
  }

  return url.toString();
}

export default function Home() {
  const [notice, setNotice] = useState("");

  function handleOpenFundraiser() {
    let fundraiserUrl: string | null;
    try {
      fundraiserUrl = getTBankFundraiserUrl();
    } catch (error) {
      if (error instanceof TypeError) {
        setNotice(
          "Проверь ссылку на сбор Т-Банка: нужна корректная HTTPS-ссылка.",
        );
        return;
      }

      throw error;
    }

    if (!fundraiserUrl) {
      setNotice("Добавь ссылку на сбор в NEXT_PUBLIC_TBANK_FUNDRAISER_URL.");
      return;
    }

    window.location.assign(fundraiserUrl);
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">M</span>
          <span>
            <strong>MIATA CLUB</strong>
            <small>люди · дороги · родстеры</small>
          </span>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title">
            Меня зовут Илларион и я помогаю клубу.
            <br />
            <span>Клуб поддерживает меня.</span>
          </h1>
          <p className="intro">
            Я помогаю Miata Club с ремонтом машин и организацией мероприятий, а
            клуб поддерживает меня. Если тебе нравится что я делаю, буду
            благодарен за поддержку.
          </p>
          <a className="text-link" href="#support">
            Поддержать сбор <span aria-hidden="true">↓</span>
          </a>

          <div className="hero-note">
            <span className="note-star" aria-hidden="true">
              ✳
            </span>
            <p>
              <strong>Поддержка работает в обе стороны.</strong>
              <br />Я рядом с клубом, клуб — рядом со мной.
            </p>
          </div>
        </div>

        <div className="garage-art">
          <Image
            className="garage-photo"
            src={`${basePath}/miata_4k.png`}
            alt="Mazda Miata — автомобиль Miata Club"
            fill
            priority
            sizes="(max-width: 820px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="club-mission" aria-labelledby="fundraiser-title">
        <div className="fundraiser-heading">
          <div>
            <span className="section-kicker">Цель на гоночный сезон</span>
            <h2 id="fundraiser-title">Полуслики к сезону</h2>
          </div>
          <p>
            Собираю на комплект полусликов, чтобы подготовить Ромбазду к гонкам.
          </p>
        </div>
        <div className="fundraiser-progress">
          <div
            className="progress-track"
            role="progressbar"
            aria-label="Прогресс сбора на полуслики"
            aria-valuemin={0}
            aria-valuemax={fundraisingGoal}
            aria-valuenow={fundraisingRaised}
            aria-valuetext={`${fundraisingRaised.toLocaleString("ru-RU")} из ${fundraisingGoal.toLocaleString("ru-RU")} рублей, ${fundraisingProgress}%`}
          >
            <div
              className="progress-fill"
              style={{ width: `${fundraisingProgress}%` }}
            />
          </div>
          <div className="progress-details">
            <strong>
              {fundraisingRaised.toLocaleString("ru-RU")} ₽{" "}
              <span>из {fundraisingGoal.toLocaleString("ru-RU")} ₽</span>
            </strong>
            <span>{fundraisingProgress}%</span>
          </div>
          <p className="progress-remaining">
            До цели осталось{" "}
            {(fundraisingGoal - fundraisingRaised).toLocaleString("ru-RU")} ₽
          </p>
        </div>
      </section>

      <section
        className="support-section"
        id="support"
        aria-labelledby="support-title"
      >
        <div className="section-heading">
          <div>
            <span className="section-kicker">Сбор организован в Т-Банке</span>
            <h2 id="support-title">Помочь со сбором на полуслики</h2>
          </div>
          <p>Открой страницу сбора Т-Банка и выбери сумму там.</p>
        </div>

        <div className="donation-card">
          <button
            className="donate-button"
            type="button"
            onClick={handleOpenFundraiser}
          >
            Открыть сбор в Т-Банке
            <span aria-hidden="true">↗</span>
          </button>
          {notice && (
            <p className="notice" role="status">
              {notice}
            </p>
          )}
          <p className="secure-note">
            Вы перейдёте на защищённую страницу сбора Т-Банка.
          </p>
        </div>
      </section>

      <section className="thanks" aria-label="Спасибо за поддержку">
        <div className="thanks-icon" aria-hidden="true">
          ✳
        </div>
        <p>
          <strong>Спасибо, что поддерживаешь меня.</strong>
          <br />Я ценю твоё участие и помощь.
        </p>
        <span className="thanks-doodle" aria-hidden="true">
          〰
        </span>
      </section>

      <footer className="footer">
        <span>Я помогаю Miata Club — клуб поддерживает меня.</span>
      </footer>
    </main>
  );
}
