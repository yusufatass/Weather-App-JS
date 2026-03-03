# Dynamic Weather App

[![Render Deploy](https://img.shields.io/badge/Render-Deployed-success?style=for-the-badge&logo=render)](https://weather-app-71z8.onrender.com)
🎯 **[Canlı Demoyu İnceleyin (Live Demo) Oynamak İçin Tıklayınız](https://weather-app-71z8.onrender.com)**

Bu proje, anlık hava durumu ve 3 günlük tahminleri gösteren, arayüzü tamamen hava koşullarına (güneşli, karlı, yağmurlu vb.) göre dinamik olarak değişen modern bir hava durumu uygulamasıdır.

## Özellikler (Features)
- 📍 **Konum Odaklı Başlangıç:** Sayfa açıldığında izninizle GPS üzerinden otomatik olarak bulunduğunuz şehrin hava durumunu getirir. (Desteklenmiyorsa İstanbul varsayılan olarak gelir.)
- 🎨 **Dinamik CSS Efektleri:** Arka plan efektleri (Parallax damlalar, hareketli bulutlar, seyahat eden güneş) ve tamamen o anki hava derecesine (ör: 0 altı dondurucu soğuklar, 30 üstü nemli sıcaklar) dayalı olarak ayarlanan dinamik arka plan gradyan renkleri.
- 🌡️ **Birim Çevirici:** Sağ üst köşedeki buton sayesinde tek tıkla °C ve °F arasında sorunsuz geçiş.
- 👚 **Giyim Önerisi Altyapısı:** Sıcaklık ve hava koşullarına göre kullanıcıya neler giymesi gerektiğine dair tavsiyeler verir.
- 📅 **3 Günlük Tahmin:** Ekranın alt kısmında ilerleyen günlerin hava tahminlerini ikon ve özel sıcaklık birimleriyle gösterir.

## Proje Yapısı
```
📂 weather-app/
├── 📄 index.html        # Ana HTML yapısı
├── 📂 css/              
│   └── 🎨 style.css     # Animasyonlar ve tüm UI/UX tasarımları
├── 📂 js/               
│   └── 🧠 script.js     # OpenWeatherMap API işlemleri, Türkçe yorum satırları
└── 📂 images/           # İkonlar ve görseller
```

## Nasıl Çalıştırılır?
Projeyi bilgisayarınıza klonlayın ve herhangi bir kod düzenleyicide (örn: VS Code) açtıktan sonra doğrudan `index.html` dosyasına çift tıklayın veya bir Live Server aracılığıyla tarayıcıda görüntüleyin. Herhangi bir ekstra kurulum (npm, webpack) gerektirmez. Vanilla JavaScript ve saf CSS kullanılmıştır.

## 📸 Screenshots

Uygulama, hava durumuna göre dinamik olarak renk ve içerik değiştirmektedir. Aşağıda farklı senaryolara ait arayüz örneklerini görebilirsiniz:

### 🌦️ Farklı Hava Durumu Senaryoları
| Cold & Snowy (Soğuk ve Karlı) | Rainy & Chilly (Yağmurlu) | Clear & Sunny (Açık ve Güneşli) |
| :---: | :---: | :---: |
| <img src="https://github.com/user-attachments/assets/4869b5d7-be35-4fc0-9451-029432d0cd72" width="250"> | <img src="https://github.com/user-attachments/assets/dcdaea95-50cd-48c0-8b71-4459169de8ea" width="250"> | <img src="https://github.com/user-attachments/assets/a76e2927-d2bd-4b1b-b5c9-7a763db2bfac" width="250"> |
| *Dondurucu Soğuk* | *Yağmurlu ve Serin* | *Açık ve Ferah* |

### 🌡️ Sıcaklık Seviyeleri ve Giyim Önerileri
| Pleasant (Ilık) | Warm (Sıcak) | Scorching (Çok Sıcak) |
| :---: | :---: | :---: |
| <img src="https://github.com/user-attachments/assets/70e534f8-b137-4998-8be6-1563d4a62098" width="250"> | <img src="https://github.com/user-attachments/assets/22256b82-fa46-456f-a781-8a80b0f33b42" width="250"> | <img src="https://github.com/user-attachments/assets/599b7c68-2640-44ed-bdb4-969101599581" width="250"> |
| *Hafif Katmanlar* | *Yazlık Kıyafetler* | *Sıcaklık Uyarısı* |

### 🌍 Genel Görünüm (İstanbul Örneği)
<p align="center">
  <img src="https://github.com/user-attachments/assets/2604e500-e7b0-4f8e-b2f7-150c41fe6435" width="350" alt="Weather Istanbul">
  <br>
  <i>Şehir arama ve temel hava durumu bilgilerinin genel görünümü.</i>
</p>


## Teknolojiler
- **Frontend:** HTML5 & CSS3 (Glassmorphism, CSS Animations, Keyframes)
- **Scripting:** Vanilla / ES6 JavaScript (Async/Await, Fetch API, DOM Manipulation)
- **API:** [OpenWeatherMap API](https://openweathermap.org/) (Real-time weather & 3-Day Forecast)
- **Deployment:** [Render](https://render.com/) (Static Site Hosting & Continuous Deployment)
