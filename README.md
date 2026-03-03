# Dynamic Weather App

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

## Teknolojiler
- HTML5 & CSS3 (Glassmorphism, CSS Animations, Keyframes)
- Vanilla / ES6 JavaScript (Async/Await, Fetch API, DOM Manipulation)
- [OpenWeatherMap API](https://openweathermap.org/) (Hava durumu ve 3 Günlük Forecast)
