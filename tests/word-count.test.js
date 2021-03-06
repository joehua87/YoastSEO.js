import PreProcessor from '../src/preprecessor';
import { expect } from 'chai';

const wordcountArgs = {
  testString: "een twee 13 vier",
  testString2: "een twee 3 vier 5",
  testString3: "1"

};

describe("Test wordcount with digits", () => {
  it("returns wordcount - double digits", () => {
    const preProcessor = new PreProcessor(wordcountArgs.testString);
    expect(preProcessor.__store.wordcount).to.equal(4);
  });
  it("returns wordcount - single digit", () => {
    const preProcessor = new PreProcessor(wordcountArgs.testString2);
    expect(preProcessor.__store.wordcount).to.equal(5);
  });
  it("returns wordcount - only digit", () => {
    const preProcessor = new PreProcessor(wordcountArgs.testString3);
    expect(preProcessor.__store.wordcount).to.equal(1);
  });
});

const wordcountArgs2 = {
  text: " انتشار کتابی درباره خفن‌ترین آزمایش های تاریخ علم، توجه رسانه‌ها را به خود جلب کرد.«فیل‌ها در اسید و دیگر آزمایش‌های خفن علمی»؛ این عنوان کتابی است که چند سال پیش منتشر شد. الکس بوز، نویسنده کتاب می‌گوید برای نوشتن آن کلی منابع و آرشیوهای علمی را زیر و رو کرده تا فهرستی از عجیب‌ترین و وحشتناک‌ترین تجربه‌های علمی را ردیف کند. کتاب، داستان واقعی دانشمندانی است که با تلاش زیاد، به دنبال اثبات درک نامتعارفشان از دنیای اطراف بوده‌اند.	چند روز قبل از توزیع کتاب، مجله نیوساینتیست، خلاصه‌ای از آن را چاپ کرد که شامل ۱۰ مورد از تکان‌دهنده‌ترین کارهایی بود که به اسم علم انجام‌شده‌اند. البته پیش از آن، بوز در وبلاگش، یک فهرست ۲۰ موردی را آورده بود. اگر بعد از خواندن فهرست، کمی دود از کله‌تان بلند شد، تعجب نکنید اما به‌هیچ‌وجه به فکر تکرار آزمایش‌ها نیفتید!",
  keyword: "آزمایش"
};

describe("Test wordcount with Arabic language", () => {
  it("returns wordcount in Arabic", () => {
    const preProcessor = new PreProcessor(wordcountArgs2.text);
    expect(preProcessor.__store.wordcount).to.equal(141);
  });
});
