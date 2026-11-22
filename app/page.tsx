"use client";

import { useState } from "react";

const ENGINE_URL = "https://ace-step-ace-step-v1-5.hf.space";

export default function Home() {
  const [engineLoaded, setEngineLoaded] = useState(false);

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#home" aria-label="SONORA home">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </span>
          <span>SONORA</span>
        </a>

        <nav className="nav-links" aria-label="التنقل الرئيسي">
          <a href="#home" className="active">الرئيسية</a>
          <a href="#studio">استوديو الأغاني</a>
          <a href="#about">عن المحرك</a>
        </nav>

        <a className="topbar-cta" href="#studio">
          ابدأ التجربة <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="pulse-dot" />
            استوديو موسيقى بالذكاء الاصطناعي
          </div>
          <h1>
            فكرتك تبدأ بكلمة.
            <br />
            <span>وأغنيتك تبدأ هنا.</span>
          </h1>
          <p className="hero-description">
            اكتب الفكرة أو الكلمات، اختر الإحساس الموسيقي، ودع الذكاء الاصطناعي
            يحوّل خيالك إلى تجربة صوتية.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#studio">
              <span className="play-symbol" aria-hidden="true">▶</span>
              جرّب توليد الموسيقى
            </a>
            <a className="button button-secondary" href={ENGINE_URL} target="_blank" rel="noreferrer">
              فتح المحرك مباشرة <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="hero-footnote">
            <span className="status-dot" />
            تجربة مجانية محدودة عبر Hugging Face ZeroGPU
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="record">
            <div className="record-groove groove-one" />
            <div className="record-groove groove-two" />
            <div className="record-groove groove-three" />
            <div className="record-center">
              <span>SONORA</span>
              <i />
            </div>
          </div>
          <div className="sound-bars">
            {Array.from({ length: 27 }).map((_, index) => (
              <i key={index} style={{ height: `${18 + ((index * 19) % 62)}px` }} />
            ))}
          </div>
          <div className="floating-note note-one">♫</div>
          <div className="floating-note note-two">♪</div>
          <div className="art-caption">
            <span className="art-caption-dot" />
            YOUR SOUND. YOUR STORY.
          </div>
        </div>
      </section>

      <section className="feature-strip" id="about">
        <div className="feature-item">
          <span className="feature-icon">✳</span>
          <div>
            <strong>من الوصف إلى الموسيقى</strong>
            <small>حوّل فكرتك إلى مقطوعة أصلية</small>
          </div>
        </div>
        <div className="feature-item">
          <span className="feature-icon">♫</span>
          <div>
            <strong>كلمات وألحان</strong>
            <small>أنشئ موسيقى مع كلمات أو بدونها</small>
          </div>
        </div>
        <div className="feature-item">
          <span className="feature-icon">◷</span>
          <div>
            <strong>تجربة سريعة</strong>
            <small>ابدأ بالمحرك المفتوح المصدر</small>
          </div>
        </div>
      </section>

      <section className="studio-section" id="studio">
        <div className="section-heading">
          <div>
            <div className="section-kicker">SONORA STUDIO</div>
            <h2>جرّب المحرك الآن</h2>
            <p>المحرك الرسمي ACE-Step 1.5 مضمّن هنا للتجربة المباشرة.</p>
          </div>
          <a className="open-engine" href={ENGINE_URL} target="_blank" rel="noreferrer">
            فتح في نافذة مستقلة <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="engine-shell">
          <div className="engine-toolbar">
            <div className="engine-title">
              <span className="engine-led" />
              <span>ACE-STEP 1.5</span>
              <span className="engine-tag">ZERO GPU</span>
            </div>
            <span className="engine-live">المحرك الرسمي</span>
          </div>

          <div className="engine-frame-wrap">
            <iframe
              title="ACE-Step 1.5 music generation engine"
              src={ENGINE_URL}
              loading="lazy"
              allow="autoplay; clipboard-read; clipboard-write"
              allowFullScreen
              onLoad={() => setEngineLoaded(true)}
            />
            {!engineLoaded && (
              <div className="frame-loading" aria-live="polite">
                <span className="loader" />
                <strong>جارٍ تحميل استوديو الموسيقى...</strong>
                <small>قد يستغرق تشغيل المحرك لحظات عند أول استخدام.</small>
              </div>
            )}
          </div>
          <div className="engine-foot">
            <span>المعالجة تتم داخل Hugging Face، وليس على خادم SONORA.</span>
            <a href={ENGINE_URL} target="_blank" rel="noreferrer">فتح المحرك مباشرة ↗</a>
          </div>
        </div>

        <p className="quota-note">
          <span aria-hidden="true">ⓘ</span>
          الحساب المجاني في ZeroGPU له حصة يومية محدودة تبلغ 5 دقائق GPU. قد تحتاج
          إلى تسجيل الدخول إلى Hugging Face، وقد تختلف أوقات الانتظار حسب الضغط.
        </p>
      </section>

      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </span>
          <span>SONORA</span>
        </a>
        <span>صُنعت لتبدأ فكرتك بصوت.</span>
        <span className="footer-year">SONORA © 2026</span>
      </footer>
    </main>
  );
}
