import { useState } from 'react';
import { BookOpen, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function BadaJapaneseTestOnline() {
    const [screen, setScreen] = useState('start');
    const [level, setLevel] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);

    // Question bank - 40 questions per level
    const questions = {
        N3: [
            // Vocabulary (15 questions)
            { type: 'vocab', q: '彼は毎日ジョギングをして、体を___している。', options: ['きたえて', 'つかれて', 'やすんで', 'ねむって'], correct: 0 },
            { type: 'vocab', q: '新しいプロジェクトを___することになった。', options: ['たんとう', 'たんじょう', 'たんい', 'たんか'], correct: 0 },
            { type: 'vocab', q: 'この問題は___だから、よく考えてください。', options: ['ふくざつ', 'かんたん', 'きれい', 'しずか'], correct: 0 },
            { type: 'vocab', q: '会議の___を作成してください。', options: ['ぎじろく', 'ぎろん', 'ぎむ', 'ぎのう'], correct: 0 },
            { type: 'vocab', q: '彼女は___な性格で、みんなに好かれている。', options: ['あかるい', 'くらい', 'きびしい', 'さむい'], correct: 0 },
            { type: 'vocab', q: 'この計画には___がある。', options: ['もんだいてん', 'もんだいしゃ', 'もんだいご', 'もんだいじ'], correct: 0 },
            { type: 'vocab', q: '___を守ることが大切です。', options: ['やくそく', 'やくしょ', 'やくめ', 'やくひん'], correct: 0 },
            { type: 'vocab', q: '彼は___して、謝った。', options: ['はんせい', 'はんたい', 'はんぶん', 'はんだん'], correct: 0 },
            { type: 'vocab', q: 'この本は___に書かれています。', options: ['くわしく', 'あたらしく', 'ただしく', 'やさしく'], correct: 0 },
            { type: 'vocab', q: '___がないので、できません。', options: ['じしん', 'じかん', 'じゆう', 'じてん'], correct: 0 },
            { type: 'vocab', q: '駅の___で待っています。', options: ['かいさつぐち', 'かいだん', 'かいぎしつ', 'かいじょう'], correct: 0 },
            { type: 'vocab', q: '___に記入してください。', options: ['らん', 'れい', 'るい', 'ろん'], correct: 0 },
            { type: 'vocab', q: 'この仕事は___がかかります。', options: ['てま', 'ひま', 'じかん', 'ねだん'], correct: 0 },
            { type: 'vocab', q: '彼は___を持っている。', options: ['さいのう', 'ざいりょう', 'さいばん', 'ざいさん'], correct: 0 },
            { type: 'vocab', q: '___をつけて運転してください。', options: ['ちゅうい', 'ようい', 'ゆうい', 'ちゅうし'], correct: 0 },

            // Grammar (15 questions)
            { type: 'grammar', q: '雨が降りそう___、傘を持って行こう。', options: ['だから', 'のに', 'けれど', 'ので'], correct: 0 },
            { type: 'grammar', q: '彼は頭がいい___、努力もしている。', options: ['上に', 'だけ', 'ばかり', 'のに'], correct: 0 },
            { type: 'grammar', q: '時間___、できるだけ早く来てください。', options: ['があれば', 'がなくて', 'によって', 'に対して'], correct: 0 },
            { type: 'grammar', q: '忙しい___、出張に行かなければならない。', options: ['のに', 'から', 'ので', 'けど'], correct: 0 },
            { type: 'grammar', q: 'そんなこと___わかっています。', options: ['くらい', 'ほど', 'ばかり', 'しか'], correct: 0 },
            { type: 'grammar', q: '彼女は親切___有名です。', options: ['で', 'に', 'が', 'を'], correct: 0 },
            { type: 'grammar', q: '子供___わかる問題です。', options: ['でも', 'には', 'だけ', 'しか'], correct: 0 },
            { type: 'grammar', q: '明日は雨が降る___。', options: ['らしい', 'ようだ', 'そうだ', 'みたいだ'], correct: 0 },
            { type: 'grammar', q: '彼は医者___なりたいそうです。', options: ['に', 'を', 'が', 'と'], correct: 0 },
            { type: 'grammar', q: '宿題を___しまいました。', options: ['して', 'する', 'した', 'すれば'], correct: 0 },
            { type: 'grammar', q: 'お金___、何でも買えるわけではない。', options: ['があっても', 'がなくても', 'をあっても', 'をなくても'], correct: 0 },
            { type: 'grammar', q: '彼は来る___来ないかわからない。', options: ['か', 'が', 'を', 'に'], correct: 0 },
            { type: 'grammar', q: '日本に___3年になります。', options: ['来て', '来た', '来ている', '来ていた'], correct: 0 },
            { type: 'grammar', q: '試験に___ように、毎日勉強している。', options: ['合格する', '合格した', '合格して', '合格すれば'], correct: 0 },
            { type: 'grammar', q: '彼___、そんなことは言わない。', options: ['に限って', 'について', 'によって', 'に対して'], correct: 0 },

            // Reading Comprehension (10 questions)
            { type: 'reading', passage: '昨日、友達と映画を見に行った。映画はとても面白かったが、少し長かった。映画の後、レストランで食事をした。', q: '映画はどうでしたか。', options: ['面白かったが長かった', 'つまらなかった', '短かった', '行かなかった'], correct: 0 },
            { type: 'reading', passage: '田中さんは毎朝6時に起きて、ジョギングをしている。健康のために3年前から続けている習慣だ。', q: '田中さんは何年前からジョギングをしていますか。', options: ['3年前', '6年前', '毎朝', '昨日'], correct: 0 },
            { type: 'reading', passage: '新しいカフェがオープンした。そのカフェは静かで、勉強するのに最適だ。コーヒーも美味しいと評判だ。', q: 'このカフェの特徴は何ですか。', options: ['静かで勉強に良い', 'うるさい', '古い', '高い'], correct: 0 },
            { type: 'reading', passage: '会社の会議は毎週月曜日の午前10時から行われる。全員参加が必須で、欠席する場合は事前に連絡する必要がある。', q: '会議について正しいのはどれですか。', options: ['毎週月曜日にある', '自由参加', '午後にある', '連絡不要'], correct: 0 },
            { type: 'reading', passage: '日本の夏は暑くて湿度が高い。そのため、エアコンが欠かせない。最近は省エネタイプのエアコンが人気だ。', q: '日本の夏の特徴は何ですか。', options: ['暑くて湿度が高い', '寒い', '乾燥している', '涼しい'], correct: 0 },
            { type: 'reading', passage: '図書館では静かにしなければならない。また、飲食は禁止されている。本は2週間借りることができる。', q: '図書館のルールとして正しくないのはどれですか。', options: ['飲食できる', '静かにする', '本を借りられる', '2週間借りられる'], correct: 0 },
            { type: 'reading', passage: '彼は大学で経済学を専攻している。将来は銀行で働きたいと考えている。そのために、毎日熱心に勉強している。', q: '彼の将来の希望は何ですか。', options: ['銀行で働く', '教師になる', '医者になる', '勉強する'], correct: 0 },
            { type: 'reading', passage: '桜の季節になると、多くの人が花見に出かける。公園や川沿いに桜の木が植えられていて、春の風物詩となっている。', q: '花見はいつ行われますか。', options: ['桜の季節', '夏', '秋', '冬'], correct: 0 },
            { type: 'reading', passage: '最近、オンラインショッピングが普及している。家にいながら買い物ができて便利だが、実物を見られないというデメリットもある。', q: 'オンラインショッピングのデメリットは何ですか。', options: ['実物を見られない', '便利', '家にいられる', '普及している'], correct: 0 },
            { type: 'reading', passage: '地震が起きたら、まず机の下に隠れて頭を守る。揺れが収まったら、火の元を確認し、外に避難する。', q: '地震が起きたら最初に何をしますか。', options: ['机の下に隠れる', '外に出る', '火をつける', '走る'], correct: 0 },
        ],

        N2: [
            // Vocabulary (15 questions)
            { type: 'vocab', q: '彼の意見は___的で、参考になる。', options: ['けんせつ', 'けんちく', 'けんきゅう', 'けんとう'], correct: 0 },
            { type: 'vocab', q: 'この問題は___に解決する必要がある。', options: ['きゅうきょく', 'きゅうそく', 'きんきゅう', 'きょうきゅう'], correct: 1 },
            { type: 'vocab', q: '会議で___な意見が出た。', options: ['たよう', 'たいよう', 'たんよう', 'ちよう'], correct: 0 },
            { type: 'vocab', q: 'この企画は___性が高い。', options: ['じつげん', 'じっけん', 'じつよう', 'じつりょく'], correct: 0 },
            { type: 'vocab', q: '彼は___を重んじる人だ。', options: ['れいぎ', 'れいがい', 'れいねん', 'れきし'], correct: 0 },
            { type: 'vocab', q: 'この薬は___が強い。', options: ['ふくさよう', 'さようなら', 'ようじ', 'さぎょう'], correct: 0 },
            { type: 'vocab', q: '___を取ってから車を運転する。', options: ['めんきょ', 'けんきょ', 'きょか', 'りょうかい'], correct: 0 },
            { type: 'vocab', q: 'この計画には___が必要だ。', options: ['しゅうせい', 'こうせい', 'さくせい', 'せいさく'], correct: 0 },
            { type: 'vocab', q: '彼の___は誰もが認めている。', options: ['のうりょく', 'きょうりょく', 'じつりょく', 'りょくりょう'], correct: 0 },
            { type: 'vocab', q: 'この問題は___だ。', options: ['しんこく', 'げんこく', 'ほうこく', 'こうこく'], correct: 0 },
            { type: 'vocab', q: '___を守ることが重要だ。', options: ['きそく', 'そくど', 'そっこう', 'きそ'], correct: 0 },
            { type: 'vocab', q: '彼女は___がある。', options: ['きひん', 'ぶひん', 'さくひん', 'しょうひん'], correct: 0 },
            { type: 'vocab', q: 'この仕事には___が求められる。', options: ['せいかく', 'せっかく', 'かくじつ', 'かくにん'], correct: 0 },
            { type: 'vocab', q: '___を立てて行動する。', options: ['けいかく', 'けいけん', 'けいざい', 'けいこう'], correct: 0 },
            { type: 'vocab', q: '彼は___な態度を取った。', options: ['いぞん', 'そんけい', 'けいべつ', 'そんちょう'], correct: 2 },

            // Grammar (15 questions)
            { type: 'grammar', q: '努力した___、失敗してしまった。', options: ['にもかかわらず', 'おかげで', 'せいで', 'ために'], correct: 0 },
            { type: 'grammar', q: '彼は約束を守らない___、嘘もつく。', options: ['上に', 'だけ', 'ばかり', 'のみ'], correct: 0 },
            { type: 'grammar', q: '健康___、彼が一番だ。', options: ['といえば', 'にいえば', 'をいえば', 'というと'], correct: 0 },
            { type: 'grammar', q: 'この問題は簡単___見えて難しい。', options: ['そうに', 'に', 'で', 'く'], correct: 0 },
            { type: 'grammar', q: '雨が降る___降らない___、試合は行います。', options: ['と、と', 'か、か', 'に、に', 'を、を'], correct: 1 },
            { type: 'grammar', q: '彼___、そんなことはしない。', options: ['に限って', 'について', 'に対して', 'によって'], correct: 0 },
            { type: 'grammar', q: '時間がない___、無理だ。', options: ['以上', 'ため', 'ので', 'から'], correct: 0 },
            { type: 'grammar', q: '彼は優秀である___厳しい。', options: ['反面', 'はんめん', 'に反して', 'はんたいに'], correct: 0 },
            { type: 'grammar', q: '努力___、成功はない。', options: ['なくして', 'なくても', 'がなくて', 'をなくて'], correct: 0 },
            { type: 'grammar', q: '彼女は美しい___頭もいい。', options: ['ばかりか', 'だけで', 'のみで', 'しか'], correct: 0 },
            { type: 'grammar', q: '親の期待___、頑張っている。', options: ['に応えて', 'によって', 'について', 'に対して'], correct: 0 },
            { type: 'grammar', q: '病気___欠席した。', options: ['により', 'にとって', 'において', 'に関して'], correct: 0 },
            { type: 'grammar', q: '彼は来る___来ないとも言わない。', options: ['とも', 'かも', 'でも', 'にも'], correct: 0 },
            { type: 'grammar', q: '結果___、過程が大切だ。', options: ['もさることながら', 'もそうだが', 'だけでなく', 'ばかりでなく'], correct: 0 },
            { type: 'grammar', q: '彼___できる仕事だ。', options: ['でなければ', 'でないと', 'でなくても', 'でもない'], correct: 0 },

            // Reading Comprehension (10 questions)
            { type: 'reading', passage: '近年、環境問題への関心が高まっている。特に地球温暖化は深刻な問題として認識されており、各国が対策を講じている。個人レベルでも、省エネやリサイクルなど、できることから始めることが重要だ。', q: '筆者の主張は何ですか。', options: ['個人も環境対策に取り組むべき', '環境問題は解決した', '対策は不要', '国だけが対策すべき'], correct: 0 },
            { type: 'reading', passage: 'テレワークの普及により、働き方が大きく変化した。通勤時間が減り、自由な時間が増えた一方で、コミュニケーション不足や仕事とプライベートの境界が曖昧になるという課題も生じている。', q: 'テレワークの問題点として述べられているのは何ですか。', options: ['コミュニケーション不足', '通勤時間が長い', '自由な時間がない', '給料が下がる'], correct: 0 },
            { type: 'reading', passage: '日本の人口減少は深刻な社会問題となっている。労働力不足や経済の停滞が懸念されており、政府は子育て支援策を強化している。しかし、根本的な解決には至っていない。', q: 'この文章の主題は何ですか。', options: ['人口減少問題', '経済成長', '子育て', '政府の政策'], correct: 0 },
            { type: 'reading', passage: 'AIの発展により、多くの仕事が自動化される可能性がある。これは効率化につながる反面、雇用への影響が懸念されている。人間にしかできない創造的な仕事の価値が、今後さらに高まるだろう。', q: 'AI発展の影響として述べられていないのはどれですか。', options: ['賃金が上がる', '仕事の自動化', '雇用への影響', '創造的仕事の価値向上'], correct: 0 },
            { type: 'reading', passage: '読書は知識を得るだけでなく、想像力を養い、語彙力を向上させる効果がある。デジタル時代においても、紙の本を読む習慣を持つことは重要だと言える。', q: '筆者によると、読書の効果でないものはどれですか。', options: ['運動能力の向上', '知識の獲得', '想像力の育成', '語彙力の向上'], correct: 0 },
            { type: 'reading', passage: 'グローバル化が進む現代において、異文化理解の重要性が増している。言語を学ぶことは、その国の文化や価値観を理解する第一歩となる。', q: 'この文章で最も重要とされているのは何ですか。', options: ['異文化理解', 'グローバル化', '言語学習', '価値観'], correct: 0 },
            { type: 'reading', passage: '健康寿命を延ばすためには、適度な運動とバランスの取れた食事が不可欠だ。また、社会とのつながりを保つことも、精神的な健康に重要な役割を果たす。', q: '健康寿命を延ばすために必要でないものはどれですか。', options: ['高価な薬', '適度な運動', 'バランスの良い食事', '社会とのつながり'], correct: 0 },
            { type: 'reading', passage: 'プラスチックごみによる海洋汚染が深刻化している。使い捨てプラスチックの使用を減らし、代替素材の開発を進めることが急務となっている。', q: 'この文章で述べられている問題は何ですか。', options: ['海洋汚染', '森林破壊', '大気汚染', '騒音問題'], correct: 0 },
            { type: 'reading', passage: '近年、若者の間で起業への関心が高まっている。安定した雇用よりも、自分の夢を実現することを重視する傾向が見られる。', q: '若者の傾向として述べられているのは何ですか。', options: ['起業への関心', '安定志向', '保守的', '無関心'], correct: 0 },
            { type: 'reading', passage: 'ストレス社会と言われる現代において、メンタルヘルスケアの重要性が認識されつつある。企業も従業員の心の健康に配慮した施策を導入し始めている。', q: 'この文章のテーマは何ですか。', options: ['メンタルヘルスケア', '企業経営', 'ストレス', '健康保険'], correct: 0 },
        ],

        N1: [
            // Vocabulary (15 questions)
            { type: 'vocab', q: '彼の発言は___に富んでいる。', options: ['しさ', 'しこう', 'しそう', 'しけん'], correct: 2 },
            { type: 'vocab', q: 'この理論は___を得ている。', options: ['しじ', 'しせい', 'しめい', 'しんい'], correct: 0 },
            { type: 'vocab', q: '___を尽くして説明する。', options: ['せんりょく', 'ぜんりょく', 'ちから', 'りょく'], correct: 0 },
            { type: 'vocab', q: '彼女の___な態度に感心した。', options: ['しんし', 'しんじ', 'しんせつ', 'しんぱい'], correct: 0 },
            { type: 'vocab', q: 'この問題の___を探る。', options: ['しんそう', 'しんぞう', 'しんこう', 'しんぴ'], correct: 0 },
            { type: 'vocab', q: '___的な視点から考察する。', options: ['きゃっかん', 'しゅかん', 'かんしゃ', 'かんがえ'], correct: 0 },
            { type: 'vocab', q: '彼の___は誰もが認める。', options: ['ぎょうせき', 'せいせき', 'じせき', 'こうせき'], correct: 0 },
            { type: 'vocab', q: 'この法案は___に向けて準備中だ。', options: ['じょうてい', 'ていあん', 'けってい', 'かいてい'], correct: 0 },
            { type: 'vocab', q: '___を保つことが重要だ。', options: ['ちつじょ', 'じょうほう', 'じょうたい', 'ちじょ'], correct: 0 },
            { type: 'vocab', q: 'この研究は___な意義を持つ。', options: ['かくき', 'えぽっく', 'えいきょう', 'きねん'], correct: 0 },
            { type: 'vocab', q: '___を乗り越えて成功した。', options: ['きゅうきょく', 'こんなん', 'かんなん', 'しれん'], correct: 3 },
            { type: 'vocab', q: '彼の___な性格が災いした。', options: ['せっきょく', 'しょうきょく', 'きょうき', 'ひがい'], correct: 1 },
            { type: 'vocab', q: 'この事件は___を呼んだ。', options: ['はもん', 'もんだい', 'ろんぎ', 'ぎろん'], correct: 0 },
            { type: 'vocab', q: '___を講じる必要がある。', options: ['たいさく', 'さくせん', 'ほうさく', 'ていさく'], correct: 0 },
            { type: 'vocab', q: '彼は___に富む人物だ。', options: ['どうじょう', 'どうかん', 'かんじょう', 'きょうかん'], correct: 0 },

            // Grammar (15 questions)
            { type: 'grammar', q: '彼の努力___、プロジェクトは成功した。', options: ['あっての', 'による', 'として', 'にして'], correct: 0 },
            { type: 'grammar', q: '時代の変化___、考え方も変わってきた。', options: ['に伴い', 'において', 'に対し', 'に関し'], correct: 0 },
            { type: 'grammar', q: '彼は優秀である___謙虚だ。', options: ['がゆえに', 'のみならず', 'だけあって', 'に限らず'], correct: 1 },
            { type: 'grammar', q: '法律___、この行為は違法です。', options: ['上', 'に', 'で', 'を'], correct: 0 },
            { type: 'grammar', q: '事故を未然に防ぐ___、点検が必要だ。', options: ['べく', 'ため', 'ように', 'こと'], correct: 0 },
            { type: 'grammar', q: '彼___、そんな間違いはしない。', options: ['ともあろう者が', 'ともいえる', 'ともなく', 'ともなると'], correct: 0 },
            { type: 'grammar', q: '失敗___、成功はない。', options: ['なくして', 'なくしては', 'をなくして', 'からなくして'], correct: 1 },
            { type: 'grammar', q: '彼の実力___、この仕事は難しい。', options: ['をもってしても', 'をもって', 'によって', 'として'], correct: 0 },
            { type: 'grammar', q: '批判___批判で終わってはいけない。', options: ['は', 'が', 'を', 'に'], correct: 0 },
            { type: 'grammar', q: '努力した___で満足してはいけない。', options: ['つもり', 'はず', 'もの', 'こと'], correct: 0 },
            { type: 'grammar', q: '彼は天才___言われている。', options: ['だの', 'との', 'とか', 'など'], correct: 1 },
            { type: 'grammar', q: '結果___、過程を評価する。', options: ['いかんにかかわらず', 'いかんによらず', 'いかんでは', 'いかんとして'], correct: 0 },
            { type: 'grammar', q: '彼女___、誰もできない。', options: ['をおいて', 'において', 'にあって', 'として'], correct: 0 },
            { type: 'grammar', q: '困難___あっても、諦めない。', options: ['が', 'に', 'を', 'で'], correct: 0 },
            { type: 'grammar', q: '事実___、証拠が必要だ。', options: ['である以上', 'であっても', 'であるなら', 'であれば'], correct: 0 },

            // Reading Comprehension (10 questions)
            { type: 'reading', passage: '科学技術の進歩は人類に多大な恩恵をもたらしてきた。しかし、その一方で環境破壊や倫理的問題など、新たな課題も生み出している。我々は技術の発展と人間の幸福のバランスを慎重に考える必要がある。', q: '筆者の主張として最も適切なのはどれですか。', options: ['科学技術と幸福のバランスが重要', '科学技術は不要', '環境を無視すべき', '倫理は関係ない'], correct: 0 },
            { type: 'reading', passage: 'グローバル化により、文化の均質化が進んでいる。しかし、多様性こそが人類の財産であり、各地域の独自性を尊重しつつ、相互理解を深めることが重要だ。画一化ではなく、多元的な共存を目指すべきである。', q: 'この文章で最も重視されているのは何ですか。', options: ['文化の多様性', '文化の統一', 'グローバル化の拒否', '地域の孤立'], correct: 0 },
            { type: 'reading', passage: '現代社会において、情報リテラシーの重要性が増している。溢れる情報の中から真偽を見極め、批判的に思考する能力が求められる。受動的な情報消費者ではなく、能動的な情報の取捨選択者となることが必要だ。', q: '筆者が求めている能力は何ですか。', options: ['批判的思考力', '記憶力', '計算力', '語学力'], correct: 0 },
            { type: 'reading', passage: '芸術の価値は時代とともに変化する。かつて評価されなかった作品が後世に再発見されることもあれば、逆もまた然りである。芸術作品の評価は絶対的なものではなく、社会的・文化的文脈に依存する相対的なものと言える。', q: 'この文章が述べている芸術の特徴は何ですか。', options: ['評価の相対性', '評価の絶対性', '価値の不変性', '普遍性'], correct: 0 },
            { type: 'reading', passage: '言語は単なるコミュニケーションの道具ではない。それは思考の枠組みを形成し、世界の認識方法に影響を与える。異なる言語を学ぶことは、新たな視点を獲得することに他ならない。', q: '筆者によると、言語学習の意義は何ですか。', options: ['新たな視点の獲得', '会話能力の向上', '記憶力の訓練', '試験の合格'], correct: 0 },
            { type: 'reading', passage: '民主主義は完璧な制度ではないが、他のどの制度よりも優れていると言われる。それは権力の集中を防ぎ、多様な意見を反映できる仕組みだからだ。ただし、その機能には市民の積極的な参加が不可欠である。', q: '民主主義が機能するために必要なものは何ですか。', options: ['市民の参加', '権力の集中', '意見の統一', '制度の完璧性'], correct: 0 },
            { type: 'reading', passage: '経済成長と環境保護は対立するものと見なされがちだが、持続可能な発展という概念は両者の調和を目指す。短期的な利益ではなく、長期的な視野に立った政策決定が求められている。', q: 'この文章が提唱しているのは何ですか。', options: ['経済と環境の調和', '経済成長の優先', '環境保護の放棄', '短期利益の追求'], correct: 0 },
            { type: 'reading', passage: '教育の目的は知識の伝達だけではない。批判的思考力、創造性、協調性など、社会で生きていくために必要な多様な能力を育成することが重要だ。画一的な教育ではなく、個性を尊重した教育が求められる。', q: '筆者が重視している教育とは何ですか。', options: ['個性を尊重した教育', '画一的な教育', '知識の暗記', '試験対策'], correct: 0 },
            { type: 'reading', passage: '科学的真理は絶対的なものではなく、新たな発見により常に更新される可能性がある。過去の定説が覆された例は数多く存在する。科学的態度とは、懐疑的であり続け、常に検証を重ねる姿勢である。', q: '科学的態度として述べられているのは何ですか。', options: ['常に検証する姿勢', '定説を信じること', '懐疑を捨てること', '過去の否定'], correct: 0 },
            { type: 'reading', passage: '高齢化社会において、世代間の相互理解と協力が不可欠だ。若年層の活力と高齢者の知恵を融合させることで、社会全体の発展が期待できる。年齢による分断ではなく、統合を目指すべきである。', q: 'この文章が主張しているのは何ですか。', options: ['世代間の協力', '若者の優先', '高齢者の排除', '世代の分断'], correct: 0 },
        ]
    };

    const handleLevelSelect = (selectedLevel) => {
        setLevel(selectedLevel);
        setScreen('test');
        setCurrentQuestion(0);
        setAnswers([]);
    };

    const handleAnswer = (answerIndex) => {
        const q = questions[level][currentQuestion];
        // If the answerIndex is 4 (the 5th option), it's "I don't know", which should be marked incorrect
        const isCorrect = answerIndex === 4 ? false : q.correct === answerIndex;

        setAnswers([...answers, {
            questionIndex: currentQuestion,
            selected: answerIndex,
            isCorrect,
            type: q.type
        }]);

        if (currentQuestion < questions[level].length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setScreen('result');
        }
    };

    const calculateResults = () => {
        const vocabQuestions = answers.filter(a => questions[level][a.questionIndex].type === 'vocab');
        const grammarQuestions = answers.filter(a => questions[level][a.questionIndex].type === 'grammar');
        const readingQuestions = answers.filter(a => questions[level][a.questionIndex].type === 'reading');

        const vocabScore = vocabQuestions.filter(a => a.isCorrect).length;
        const grammarScore = grammarQuestions.filter(a => a.isCorrect).length;
        const readingScore = readingQuestions.filter(a => a.isCorrect).length;

        const vocabTotal = vocabQuestions.length;
        const grammarTotal = grammarQuestions.length;
        const readingTotal = readingQuestions.length;

        const totalScore = vocabScore + grammarScore + readingScore;
        const totalQuestions = answers.length;

        // JLPT passing criteria: Need to pass each section (19/60 points = ~32%) AND overall (90/180 = 50%)
        const vocabPass = (vocabScore / vocabTotal) >= 0.32;
        const grammarPass = (grammarScore / grammarTotal) >= 0.32;
        const readingPass = (readingScore / readingTotal) >= 0.32;
        const overallPass = (totalScore / totalQuestions) >= 0.5;

        const passed = vocabPass && grammarPass && readingPass && overallPass;

        return {
            vocabScore,
            vocabTotal,
            vocabPass,
            grammarScore,
            grammarTotal,
            grammarPass,
            readingScore,
            readingTotal,
            readingPass,
            totalScore,
            totalQuestions,
            overallPass,
            passed
        };
    };

    const resetTest = () => {
        setScreen('start');
        setLevel('');
        setCurrentQuestion(0);
        setAnswers([]);
    };

    // Start Screen (mobile responsive)
    if (screen === 'start') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 max-w-3xl w-full border-4 border-blue-200 mx-4">
                    <div className="text-center mb-8 md:mb-10">
                        <BookOpen className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 text-blue-500" />
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-2 md:mb-3">BadaJapaneseTestOnline</h1>
                        <p className="text-base md:text-xl text-gray-600">日本語能力試験 練習テスト</p>
                    </div>

                    <div className="mb-6 md:mb-8 text-center">
                        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-3 md:mb-4">レベルを選択してください</h2>
                        <p className="text-sm md:text-base text-gray-500">Choose your level</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        {['N3', 'N2', 'N1'].map((lvl) => (
                            <button
                                key={lvl}
                                onClick={() => handleLevelSelect(lvl)}
                                className="bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold py-6 md:py-10 px-4 md:px-8 rounded-2xl transition duration-300 transform hover:scale-105 active:scale-95 md:hover:scale-105 shadow-xl"
                            >
                                <div className="text-4xl md:text-5xl mb-2 md:mb-3">{lvl}</div>
                                <div className="text-base md:text-lg">
                                    {lvl === 'N3' && 'Intermediate'}
                                    {lvl === 'N2' && 'Advanced'}
                                    {lvl === 'N1' && 'Expert'}
                                </div>
                                <div className="text-xs md:text-sm mt-1 md:mt-2 opacity-90">40 Questions</div>
                            </button>
                        ))}
                    </div>

                    <div className="mt-6 md:mt-8 text-center">
                        <p className="text-xs md:text-sm text-gray-500">
                            Select a level to begin your JLPT practice test
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Test Screen (updated with "I don't know" option)
    if (screen === 'test') {
        const currentQ = questions[level][currentQuestion];
        const allOptions = [...currentQ.options, "わからない / I don't know"];

        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl w-full border-4 border-blue-200">
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-bold text-blue-600 bg-blue-100 px-4 py-2 rounded-full">
                Level {level}
              </span>
                            <span className="text-sm font-semibold text-gray-600">
                問題 {currentQuestion + 1} / {questions[level].length}
              </span>
                        </div>
                        <div className="w-full bg-blue-100 rounded-full h-3">
                            <div
                                className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${((currentQuestion + 1) / questions[level].length) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="mb-4">
            <span className="inline-block bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-1 rounded-full">
              {currentQ.type === 'vocab' && '語彙 Vocabulary'}
                {currentQ.type === 'grammar' && '文法 Grammar'}
                {currentQ.type === 'reading' && '読解 Reading'}
            </span>
                    </div>

                    {currentQ.passage && (
                        <div className="mb-6 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                            <p className="text-gray-800 leading-relaxed text-lg">{currentQ.passage}</p>
                        </div>
                    )}

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 leading-relaxed">{currentQ.q}</h2>
                        <div className="space-y-4">
                            {allOptions.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(idx)}
                                    className={`w-full text-left p-5 border-3 rounded-xl transition duration-200 text-lg ${
                                        idx === allOptions.length - 1
                                            ? 'border-red-300 hover:border-red-400 hover:bg-red-50 text-red-700'
                                            : 'border-blue-200 hover:border-blue-400 hover:bg-blue-50 text-gray-800'
                                    }`}
                                >
                  <span className={`font-bold mr-4 ${idx === allOptions.length - 1 ? 'text-red-600' : 'text-blue-600'}`}>
                    {idx + 1}.
                  </span>
                                    <span className="font-medium">{option}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Results Screen
    if (screen === 'result') {
        const results = calculateResults();

        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-5xl w-full border-4 border-blue-200">
                    <div className="text-center mb-8">
                        {results.passed ? (
                            <CheckCircle className="w-24 h-24 mx-auto mb-4 text-green-500" />
                        ) : (
                            <XCircle className="w-24 h-24 mx-auto mb-4 text-red-500" />
                        )}
                        <h2 className="text-5xl font-bold text-gray-800 mb-3">
                            {results.passed ? '合格！Pass!' : '不合格 Fail'}
                        </h2>
                        <p className="text-xl text-gray-600">
                            {results.passed ? 'おめでとうございます！' : 'もう一度チャレンジしてください'}
                        </p>
                    </div>

                    <div className="bg-blue-50 rounded-2xl p-8 mb-8 border-2 border-blue-200">
                        <div className="text-center mb-6">
                            <div className="text-6xl font-bold text-blue-600 mb-2">
                                {results.totalScore} / {results.totalQuestions}
                            </div>
                            <div className="text-2xl text-gray-600">
                                {Math.round((results.totalScore / results.totalQuestions) * 100)}%
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className={`p-6 rounded-xl ${results.vocabPass ? 'bg-green-100 border-2 border-green-400' : 'bg-red-100 border-2 border-red-400'}`}>
                                <div className="text-center">
                                    <div className="font-bold text-gray-700 mb-2">語彙 Vocabulary</div>
                                    <div className="text-3xl font-bold mb-1">
                                        {results.vocabScore} / {results.vocabTotal}
                                    </div>
                                    <div className="text-sm">
                                        {results.vocabPass ? '✓ Pass' : '✗ Fail'}
                                    </div>
                                </div>
                            </div>

                            <div className={`p-6 rounded-xl ${results.grammarPass ? 'bg-green-100 border-2 border-green-400' : 'bg-red-100 border-2 border-red-400'}`}>
                                <div className="text-center">
                                    <div className="font-bold text-gray-700 mb-2">文法 Grammar</div>
                                    <div className="text-3xl font-bold mb-1">
                                        {results.grammarScore} / {results.grammarTotal}
                                    </div>
                                    <div className="text-sm">
                                        {results.grammarPass ? '✓ Pass' : '✗ Fail'}
                                    </div>
                                </div>
                            </div>

                            <div className={`p-6 rounded-xl ${results.readingPass ? 'bg-green-100 border-2 border-green-400' : 'bg-red-100 border-2 border-red-400'}`}>
                                <div className="text-center">
                                    <div className="font-bold text-gray-700 mb-2">読解 Reading</div>
                                    <div className="text-3xl font-bold mb-1">
                                        {results.readingScore} / {results.readingTotal}
                                    </div>
                                    <div className="text-sm">
                                        {results.readingPass ? '✓ Pass' : '✗ Fail'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                            <AlertCircle className="mr-2 text-blue-500" />
                            間違いタイプ分析 Mistake Analysis
                        </h3>
                        <div className="space-y-3">
                            {answers.filter(a => !a.isCorrect).map((answer, idx) => {
                                const q = questions[level][answer.questionIndex]
                                const userAnswer = answer.selected === 4 ? "わからない / I don't know" : q.options[answer.selected];
                                const correctAnswer = q.options[q.correct];

                                return (
                                    <div key={idx} className="p-4 bg-red-50 rounded-lg border-2 border-red-200">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center mb-2">
                          <span className="bg-red-200 text-red-800 text-xs font-bold px-3 py-1 rounded-full mr-3">
                            {q.type === 'vocab' && '語彙'}
                              {q.type === 'grammar' && '文法'}
                              {q.type === 'reading' && '読解'}
                          </span>
                                                    <span className="text-sm text-gray-600">問題 {answer.questionIndex + 1}</span>
                                                </div>
                                                <div className="text-gray-800 font-medium mb-2">{q.q}</div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <div>
                                                        <span className="text-sm text-red-600 font-semibold">あなたの答え: </span>
                                                        <span className="text-gray-700">{userAnswer}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-sm text-green-600 font-semibold">正解: </span>
                                                        <span className="text-gray-700 font-bold">{correctAnswer}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-6 mb-6 border-2 border-blue-200">
                        <h4 className="font-bold text-gray-800 mb-3">JLPT合格基準 Passing Criteria:</h4>
                        <ul className="text-sm text-gray-700 space-y-2">
                            <li>• 各セクション（語彙・文法・読解）: 32%以上</li>
                            <li>• 総合得点: 50%以上</li>
                            <li>• すべての条件を満たす必要があります</li>
                        </ul>
                    </div>

                    <button
                        onClick={resetTest}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-5 px-8 rounded-xl transition duration-300 text-lg shadow-lg"
                    >
                        もう一度挑戦する Try Again
                    </button>
                </div>
            </div>
        );
    }
}