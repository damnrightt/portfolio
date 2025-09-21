# Portfolio

Bu proje,  AI yardımıyla interaktif bir şekilde geliştirilmiştir. Sade ve şık bir tasarım felsefesiyle, geliştiricinin yeteneklerini ve projelerini en etkili şekilde sunmayı hedefler.

![Portfolyo Ekran Görüntüsü](https://i.imgur.com/uFwo0IT.png)  


## ✨ Özellikler

- **Modern ve Minimalist Tasarım:** Kullanıcı deneyimini ön planda tutan, sade ve odaklanmış bir arayüz.
- **Glassmorphism Efektleri:** Derinlik hissi veren modern cam efektli UI bileşenleri.
- **IP Tabanlı Otomatik Dil Algılama:** Kullanıcının IP adresine göre otomatik olarak Türkçe/İngilizce dil seçimi.
- **Akıcı Animasyonlar:** Sayfa genelinde ve fare imlecinde kullanılan pürüzsüz ve tatmin edici animasyonlar.
- **Özel Cursor Takipçisi:** Varsayılan mouse cursor'ı gizlenmiş, özel takipçi cursor sistemi.
- **Typewriter Efekti:** Hero bölümünde dinamik yazma animasyonu ile profesyonel görünüm.
- **Interaktif Parçacık Sistemi:** Mouse hareketlerine duyarlı parçacık animasyonları.
- **Animasyonlu Skill Bars:** Yetenekler bölümünde scroll ile tetiklenen progress bar animasyonları.
- **Modern Loading Screen:** IP algılaması ile birlikte çalışan estetik yükleme ekranı.
- **Yağmur Efekti:** Arka planda sürekli çalışan atmosferik yağmur animasyonu.
- **Dinamik Proje Listesi:** GitHub API'si kullanılarak kullanıcının en güncel projelerini otomatik olarak çeker ve listeler.
- **Tema Desteği:** Açık ve Koyu mod arasında geçiş yapma imkanı.
- **Arka Plan Müziği:** Siteye giriş yapıldığında başlayan, ambiyans yaratan arka plan müziği.
- **Tamamen Duyarlı (Responsive):** Mobil cihazlardan masaüstü bilgisayarlara kadar tüm ekran boyutlarında kusursuz görünüm.

## 🛠️ Kullanılan Teknolojiler

Bu proje, herhangi bir framework veya kütüphane bağımlılığı olmadan, tamamen temel web teknolojileri kullanılarak oluşturulmuştur:

- **HTML5:** İçeriğin anlamsal yapısı ve çok dilli destek için.
- **CSS3:** Modern tasarım, glassmorphism efektleri, animasyonlar ve responsive layout için.
- **JavaScript (ES6+):** Async/await, Canvas API, Intersection Observer ve çeşitli web API'leri kullanımı.
- **External APIs:**
  - **ipify.org:** IP adresi tespiti için
  - **ip-api.com:** Coğrafi konum ve ülke kodu algılama için
  - **GitHub API:** Dinamik proje listesi için
  - **Font Awesome:** Icon setleri için
  - **Google Fonts:** Sora font ailesi için

## 🚀 Kurulum ve Kullanım

Projeyi yerel makinenizde çalıştırmak için:

1.  Bu repoyu klonlayın:
    ```bash
    git clone https://github.com/damnrightt/portfolio.git
    ```
2.  Proje dizinine gidin:
    ```bash
    cd portfolio
    ```
3.  `index.html` dosyasını favori web tarayıcınızda açın.

Hepsi bu kadar! Herhangi bir derleme veya kurulum adımı gerekmemektedir.

## 🔧 Özelleştirme

Portfolyoyu kendinize göre özelleştirmek isterseniz aşağıdaki dosyalarda değişiklik yapabilirsiniz:

- **`index.html`:** 
  - Kişisel bilgilerinizi (`data-i18n` attribute'lı elementlerde) güncelleyin
  - Sosyal medya linklerinizi değiştirin
  - Skill seviyeleri ve teknolojileri düzenleyin

- **`style.css`:** 
  - Renk paletini `:root` bloğundaki CSS değişkenlerinden değiştirin
  - Animasyon sürelerini ve efektleri özelleştirin
  - Parçacık ve yağmur efekti görsellerini ayarlayın

- **`script.js`:** 
  - GitHub kullanıcı adınızı `fetchProjects()` fonksiyonunda değiştirin
  - `translations` objesinde Türkçe/İngilizce çevirileri güncelleyin
  - Typewriter efektindeki metinleri düzenleyin
  - Skill seviyelerini ve yetenek listesini özelleştirin

- **`1.mp3`:** Arka plan müziğini değiştirmek için bu dosyayı kendi müzik dosyanızla değiştirin.
- **`background.jpg`:** Arka plan görselini özelleştirin.

## 🤝 Katkıda Bulunma

Bu kişisel bir proje olduğu için dışarıdan katkı kabul edilmemektedir. Ancak, herhangi bir hata veya öneri için bir "Issue" açmaktan çekinmeyin.
