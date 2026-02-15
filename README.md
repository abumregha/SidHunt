# IdeaDigest - صائد الأفكار الذكي 🚀

تطبيق ذكي يقوم بجمع منشورات Reddit المميزة وتلخيصها بالذكاء الاصطناعي (Genkit + Gemini).

## 🚀 كيفية النشر مجاناً (Deployment)

### 1. رفع الكود إلى GitHub
بما أنني مساعد ذكاء اصطناعي، لا يمكنني الدخول إلى حسابك الخاص في GitHub ونشر الكود مباشرة، ولكن يمكنك القيام بذلك بسهولة باتباع الخطوات التالية في الـ "Terminal" الخاص بجهازك:

1. قم بإنشاء مستودع جديد (New Repository) على [GitHub](https://github.com/new).
2. افتح Terminal داخل مجلد المشروع ونفذ الأوامر التالية بالترتيب:
   ```bash
   git init
   git add .
   git commit -m "النسخة الأولى: صائد الأفكار الذكي"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```
   *(تأكد من استبدال الرابط برابط مستودعك الذي أنشأته).*

### 2. النشر عبر Vercel (موصى به)
1. اذهب إلى [Vercel.com](https://vercel.com) واربط حساب GitHub الخاص بك.
2. اختر المستودع واضغط على **Import**.
3. في قسم **Environment Variables**، أضف المفتاح التالي:
   - `GOOGLE_GENAI_API_KEY`: ضع هنا مفتاح Gemini API الخاص بك (يمكنك الحصول عليه من Google AI Studio).
4. اضغط **Deploy** ومبارك عليك الموقع!

### 3. النشر عبر Firebase App Hosting
المشروع مجهز مسبقاً بملف `apphosting.yaml`. يمكنك استخدامه للنشر مباشرة على بنية تحتية تابعة لجوجل.

## ✨ المميزات
- **تلخيص ذكي:** يستخدم Gemini 1.5 Flash لتقديم ملخصات دقيقة باللغة العربية مع الحفاظ على المصطلحات الإنجليزية.
- **PWA جاهز:** يمكن تثبيت التطبيق على الهاتف كأنه تطبيق APK أصلي.
- **حصة مجانية:** نظام مدمج (15 طلب) لتحديد عدد طلبات الـ AI لكل مستخدم مع إمكانية التصفير للاختبار.
- **واجهة مريحة:** ألوان رمادية فاتحة وهادئة (Grayscale) مريحة جداً للعين.

## 🛠 التكنولوجيا المستخدمة
- **Next.js 15** (App Router)
- **Genkit** (AI Orchestration)
- **Tailwind CSS** + **ShadCN UI**
- **RSS Feeds** (Reddit Integration)
