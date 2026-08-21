window.CELL_COURSE = {
  order: [
    {id:'home',title:'首頁',url:'1_home.html'},
    {id:'guide',title:'課前導讀',url:'2_guide.html'},
    {id:'discovery',title:'細胞的發現',url:'3_cell-discovery.html'},
    {id:'shapes',title:'形態與功能',url:'4_cell-shapes.html'},
    {id:'assess1',title:'形成性評量（一）',url:'5_assessment-2-1.html'},
    {id:'animal',title:'動物細胞',url:'6_animal-cell.html'},
    {id:'plant',title:'植物細胞',url:'7_plant-cell.html'},
    {id:'compare',title:'動植物比較',url:'8_animal-plant-comparison.html'},
    {id:'lab',title:'玻片觀察',url:'10_slide-observation.html'},
    {id:'microscope',title:'顯微影像',url:'9_microscope-images.html'},
    {id:'assess2',title:'形成性評量（二）',url:'11_assessment-2-2.html'},
    {id:'reading',title:'閱讀素養',url:'12_reading-literacy.html'},
    {id:'challenge',title:'細胞學習英雄榜',url:'13_comprehensive-challenge.html'},
    {id:'result',title:'學習結果',url:'14_learning-result.html'}
  ],
  modules: {
    shapes: {
      unit:'生物體的基本單位', title:'形態就是線索', subtitle:'細胞具有不同形態，而形態通常和功能相互配合。',
      tip:'先觀察形狀與排列方式，再推論它適合完成什麼工作。',
      sections:[
        {title:'植物細胞的形態與功能',html:'<p><span class="keyword keyword-green">表皮細胞</span>通常呈扁平狀並排列緊密，像一道連續的保護牆，可減少外界傷害。兩個<span class="keyword keyword-purple">半月形保衛細胞</span>圍成氣孔，能控制氣孔開閉並調節氣體進出葉片。</p>'},
        {title:'動物細胞的形態與功能',html:'<p><span class="keyword keyword-blue">神經細胞</span>具有細長突起，適合傳遞訊息；<span class="keyword keyword-red">紅血球</span>呈雙凹圓盤狀，可運送氧氣；<span class="keyword keyword-orange">肌肉細胞</span>細長且能收縮；口腔皮膜細胞扁平，具有保護功能。</p><figure class="course-figure six-cell-figure"><img src="assets/course/six-cell-types-original-v3.webp" alt="六種細胞的原創教學插畫，由左至右、由上至下為淡米白色且呈狹長長方形排列的洋蔥表皮細胞、綠色保衛細胞與無綠色周圍表皮細胞、神經細胞、口腔皮膜細胞、紅血球與肌肉細胞"><figcaption><ol class="figure-key"><li><strong>洋蔥表皮細胞</strong><span>狹長長方形、緊密排列</span></li><li><strong>保衛細胞</strong><span>成對圍成氣孔</span></li><li><strong>神經細胞</strong><span>具有許多細長突起</span></li><li><strong>口腔皮膜細胞</strong><span>扁平並具保護作用</span></li><li><strong>紅血球</strong><span>雙凹圓盤狀</span></li><li><strong>肌肉細胞</strong><span>細長且能收縮</span></li></ol></figcaption></figure>'}
      ],
      questions:[
        {type:'radio',prompt:'哪一種細胞具有細長突起，適合傳遞訊息？',options:[['nerve','神經細胞'],['blood','紅血球'],['guard','保衛細胞']],correct:['nerve'],explanation:'神經細胞的細長突起有助於把訊息傳到較遠的位置。'},
        {type:'checkbox',prompt:'哪些細胞主要具有保護功能？',options:[['epidermis','植物表皮細胞'],['oral','口腔皮膜細胞'],['muscle','肌肉細胞'],['blood','紅血球']],correct:['epidermis','oral'],explanation:'表皮細胞與口腔皮膜細胞都呈扁平狀，主要功能是保護。'},
        {type:'radio',prompt:'兩個保衛細胞共同圍成什麼構造？',options:[['pore','氣孔'],['nucleus','細胞核'],['wall','細胞壁']],correct:['pore'],explanation:'兩個半月形保衛細胞圍成氣孔，並控制其開閉。'},
        {type:'select',prompt:'紅血球的主要功能是什麼？',options:[['','請選擇'],['oxygen','運送氧氣'],['message','傳遞訊息'],['contract','協助收縮']],correct:['oxygen'],explanation:'紅血球呈雙凹圓盤狀，主要負責運送氧氣。'},
        {type:'radio',prompt:'「細胞的形態通常和功能有關。」這句話是否正確？',options:[['true','正確'],['false','錯誤']],correct:['true'],explanation:'不同形態能幫助細胞完成不同工作，這是本頁的核心概念。'}
      ]
    },
    assess1: {
      unit:'形成性評量（一）',title:'檢查你的第一階段學習成果',subtitle:'完成 10 題後保存分數即可繼續，不設及格門檻。',assessment:true,tip:'分數是複習線索，不是阻擋前進的門檻。',sections:[{title:'作答說明',html:'<p>每題送出後會顯示解析。完成全部題目後，系統會保存本次分數並解鎖下一頁。</p>'}],
      questions:[
        {type:'radio',prompt:'第一位描述生物細胞的科學家是誰？',options:[['hooke','虎克'],['leeuwenhoek','雷文霍克'],['schwann','許旺']],correct:['hooke'],explanation:'虎克在 1665 年描述軟木栓中的小格子。'},
        {type:'radio',prompt:'虎克觀察的材料是什麼？',options:[['cork','軟木栓薄片'],['blood','血液'],['leaf','保衛細胞']],correct:['cork'],explanation:'虎克利用複式顯微鏡觀察軟木栓薄片。'},
        {type:'radio',prompt:'第一位發現與描述細菌的人是誰？',options:[['janssen','詹森'],['leeuwenhoek','雷文霍克'],['schleiden','許萊登']],correct:['leeuwenhoek'],explanation:'雷文霍克以改良鏡片觀察到細菌。'},
        {type:'radio',prompt:'細胞學說認為細胞是什麼？',options:[['basic','生物體構造與功能的基本單位'],['organ','只是一種器官'],['mineral','礦物顆粒']],correct:['basic'],explanation:'這是教材中細胞學說的重要內容。'},
        {type:'radio',prompt:'哪一種細胞能控制氣孔開閉？',options:[['guard','保衛細胞'],['blood','紅血球'],['muscle','肌肉細胞']],correct:['guard'],explanation:'一對保衛細胞圍成氣孔並控制其開閉。'},
        {type:'radio',prompt:'紅血球呈什麼形態？',options:[['disc','雙凹圓盤狀'],['moon','半月形'],['flat','扁平排列緊密']],correct:['disc'],explanation:'雙凹圓盤狀與運送氧氣的功能相配合。'},
        {type:'radio',prompt:'肌肉細胞的主要功能為何？',options:[['contract','收縮並協助運動'],['protect','保護表面'],['message','傳遞訊息']],correct:['contract'],explanation:'肌肉細胞細長且具有收縮能力。'},
        {type:'radio',prompt:'植物表皮細胞排列緊密的主要好處是什麼？',options:[['protect','形成保護'],['photosynthesis','一定能光合作用'],['oxygen','運送氧氣']],correct:['protect'],explanation:'排列緊密可形成連續的保護層。'},
        {type:'radio',prompt:'虎克看到的是完整活細胞嗎？',options:[['no','不是'],['yes','是']],correct:['no'],explanation:'軟木栓細胞已死亡，虎克看到的是留下的部分。'},
        {type:'radio',prompt:'下列哪個說法正確？',options:[['related','細胞形態通常與功能有關'],['same','所有細胞外形都相同'],['plantonly','只有植物由細胞組成']],correct:['related'],explanation:'動植物都有細胞，且不同細胞形態通常和功能相配合。'}
      ]
    },
    animal:{unit:'細胞的構造',title:'動物細胞解剖臺',subtitle:'點選每個構造，觀察它在細胞中的位置，並理解它如何共同維持生命。',tip:'請逐一點選右側構造；圖上對應區域會亮起。',sections:[{title:'點選構造，連結位置與功能',html:`<div class="cell-explorer" data-cell-explorer><div><div class="cell-image-stage"><img src="assets/course/animal-cell-original-v1.png" alt="動物細胞原創構造圖"><span class="cell-hotspot hotspot-nucleus" data-hotspot="nucleus"></span><span class="cell-hotspot hotspot-cytoplasm" data-hotspot="cytoplasm"></span><span class="cell-hotspot hotspot-membrane" data-hotspot="membrane"></span><span class="cell-hotspot hotspot-mitochondria" data-hotspot="mitochondria"></span><span class="cell-hotspot hotspot-vacuole" data-hotspot="vacuole"></span></div><p class="structure-status" data-structure-status aria-live="polite"></p></div><div class="structure-controls"><button type="button" class="structure-button" data-structure="nucleus" data-label="細胞核" data-function="保存遺傳物質，並調控細胞的生長、代謝與活動。"><strong>細胞核</strong><span>像細胞的控制中心，含有遺傳物質。</span></button><button type="button" class="structure-button" data-structure="cytoplasm" data-label="細胞質" data-function="由膠狀水溶液與散布其中的胞器構成，是許多代謝反應進行的場所。"><strong>細胞質</strong><span>填充細胞內部，許多化學反應在此進行。</span></button><button type="button" class="structure-button" data-structure="membrane" data-label="細胞膜" data-function="包圍細胞、區隔內外環境，並選擇性控制水、養分與廢物進出。"><strong>細胞膜</strong><span>維持細胞完整，也負責物質交換。</span></button><button type="button" class="structure-button" data-structure="mitochondria" data-label="粒線體" data-function="進行呼吸作用，把養分中的化學能轉換成細胞可利用的能量。"><strong>粒線體</strong><span>供應細胞活動所需能量。</span></button><button type="button" class="structure-button" data-structure="vacuole" data-label="液胞" data-function="儲存水、養分或代謝廢物；動物細胞的液胞通常較小且數量不一定。"><strong>小液胞</strong><span>暫存水分、養分或廢物。</span></button></div></div><p>這些構造不是各自獨立工作：細胞膜控制原料進入，細胞質提供反應環境，粒線體供應能量，細胞核調控活動，液胞協助儲存物質。它們共同讓細胞維持正常生命現象。</p>`}],questions:[
      {type:'radio',prompt:'哪個構造含有遺傳物質並控制細胞代謝？',options:[['nucleus','細胞核'],['membrane','細胞膜'],['vacuole','液胞']],correct:['nucleus'],explanation:'細胞核是細胞的生命中樞。'},
      {type:'radio',prompt:'細胞進行許多代謝作用的主要場所是？',options:[['cytoplasm','細胞質'],['wall','細胞壁'],['chloroplast','葉綠體']],correct:['cytoplasm'],explanation:'細胞質由膠狀水溶液與散布其中的胞器組成。'},
      {type:'radio',prompt:'哪個構造能區隔細胞內外並控制物質進出？',options:[['membrane','細胞膜'],['nucleus','細胞核'],['vacuole','液胞']],correct:['membrane'],explanation:'細胞膜維持細胞完整並控制物質進出。'},
      {type:'select',prompt:'粒線體的主要功能是？',options:[['','請選擇'],['energy','利用養分產生細胞所需能量'],['store','只儲存水'],['control','控制遺傳']],correct:['energy'],explanation:'粒線體可利用養分進行呼吸作用。'},
      {type:'checkbox',prompt:'液胞可能儲存哪些物質？',options:[['water','水'],['nutrient','養分'],['waste','廢物'],['light','光']],correct:['water','nutrient','waste'],explanation:'液胞可儲存水、養分或廢物。'}
    ]},
    plant:{unit:'細胞的構造',title:'植物細胞解剖臺',subtitle:'植物細胞具有動物細胞的共同基本構造，也有支撐、儲存與製造養分的特殊構造。',tip:'請逐一點選右側構造；記得不是所有植物細胞都有葉綠體。',sections:[{title:'點選構造，連結位置與功能',html:`<div class="cell-explorer" data-cell-explorer><div><div class="cell-image-stage plant-stage"><img src="assets/course/plant-cell-original-v1.png" alt="植物細胞原創構造圖"><span class="cell-hotspot hotspot-wall" data-hotspot="wall"></span><span class="cell-hotspot hotspot-membrane" data-hotspot="membrane"></span><span class="cell-hotspot hotspot-cytoplasm" data-hotspot="cytoplasm"></span><span class="cell-hotspot hotspot-nucleus" data-hotspot="nucleus"></span><span class="cell-hotspot hotspot-chloroplast" data-hotspot="chloroplast"></span><span class="cell-hotspot hotspot-mitochondria" data-hotspot="mitochondria"></span><span class="cell-hotspot hotspot-vacuole" data-hotspot="vacuole"></span></div><p class="structure-status" data-structure-status aria-live="polite"></p></div><div class="structure-controls"><button type="button" class="structure-button" data-structure="wall" data-label="細胞壁" data-function="位於細胞膜外側，主要由纖維素構成，能保護細胞、提供支撐並維持形狀。"><strong>細胞壁</strong><span>外層堅固支架，植物細胞的重要特徵。</span></button><button type="button" class="structure-button" data-structure="membrane" data-label="細胞膜" data-function="位於細胞壁內側，區隔內外並選擇性控制物質進出；植物細胞同時具有細胞壁與細胞膜。"><strong>細胞膜</strong><span>控制物質交換，不會被細胞壁取代。</span></button><button type="button" class="structure-button" data-structure="cytoplasm" data-label="細胞質" data-function="是許多代謝反應進行的場所；大型液胞會把細胞質推向細胞周邊。"><strong>細胞質</strong><span>提供胞器活動與代謝反應的環境。</span></button><button type="button" class="structure-button" data-structure="nucleus" data-label="細胞核" data-function="含遺傳物質並調控細胞活動；成熟植物細胞的細胞核常被大液胞推向一側。"><strong>細胞核</strong><span>保存遺傳資訊並調控細胞活動。</span></button><button type="button" class="structure-button" data-structure="chloroplast" data-label="葉綠體" data-function="含葉綠素，可吸收光能進行光合作用並製造葡萄糖；只有部分能行光合作用的植物細胞具有。"><strong>葉綠體</strong><span>吸收光能並製造養分，但並非每個植物細胞都有。</span></button><button type="button" class="structure-button" data-structure="mitochondria" data-label="粒線體" data-function="進行呼吸作用，把養分中的化學能轉換成可利用的能量；植物細胞也需要粒線體。"><strong>粒線體</strong><span>將養分轉換成細胞可用的能量。</span></button><button type="button" class="structure-button" data-structure="vacuole" data-label="大液胞" data-function="儲存水、色素、養分或廢物，並藉由液壓協助細胞維持飽滿與形狀。"><strong>大液胞</strong><span>儲存物質，也協助支撐植物細胞。</span></button></div></div><p>植物細胞透過構造合作維持生命：細胞壁與大液胞共同支撐，細胞膜調節物質交換，葉綠體製造葡萄糖，粒線體再把養分轉換成可用能量，細胞核則調控整體活動。</p>`}],questions:[
      {type:'radio',prompt:'植物細胞的細胞壁位於哪裡？',options:[['outside','細胞膜外側'],['nucleus','細胞核內'],['vacuole','液胞內']],correct:['outside'],explanation:'植物細胞的細胞壁位於細胞膜外側。'},
      {type:'radio',prompt:'細胞壁的主要功能是？',options:[['support','保護並維持細胞形狀'],['control','控制遺傳'],['energy','產生能量']],correct:['support'],explanation:'細胞壁由纖維素構成，可保護與維持形狀。'},
      {type:'radio',prompt:'葉綠體能進行什麼作用？',options:[['photosynthesis','光合作用'],['digestion','消化作用'],['movement','肌肉收縮']],correct:['photosynthesis'],explanation:'葉綠體可進行光合作用並製造葡萄糖。'},
      {type:'radio',prompt:'所有植物細胞都有葉綠體嗎？',options:[['no','不一定'],['yes','一定都有']],correct:['no'],explanation:'教材使用「有些植物細胞」，例如洋蔥鱗葉表皮通常看不到葉綠體。'},
      {type:'checkbox',prompt:'哪些構造可在所有的植物細胞中看到？',options:[['wall','細胞壁'],['membrane','細胞膜'],['cytoplasm','細胞質'],['chloroplast','葉綠體']],correct:['wall','membrane','cytoplasm'],explanation:'植物細胞具有細胞壁、細胞膜與細胞質；葉綠體只存在於部分能行光合作用的植物細胞。'}
    ]},
    compare:{unit:'細胞的構造',title:'動植物細胞比較站',subtitle:'先找共同構造，再辨認植物細胞常見的附加構造。',tip:'動物細胞也可能有小液胞；植物細胞同時具有細胞膜與細胞壁。',sections:[{title:'共同與差異',html:'<div class="compare-board"><div><h3>動物細胞</h3><p>細胞核、細胞質、細胞膜、粒線體、小液胞</p></div><div><h3>共同構造</h3><p>細胞核、細胞質、細胞膜、粒線體、液胞</p></div><div><h3>植物細胞常見</h3><p>細胞壁、大液胞；有些具有葉綠體</p></div></div>'}],questions:[
      {type:'checkbox',prompt:'哪些是動、植物細胞的共同構造？',options:[['nucleus','細胞核'],['cytoplasm','細胞質'],['membrane','細胞膜'],['wall','細胞壁']],correct:['nucleus','cytoplasm','membrane'],explanation:'細胞壁不是動物細胞的構造。'},
      {type:'radio',prompt:'動物細胞完全沒有液胞嗎？',options:[['no','不是，通常有較小液胞'],['yes','是，完全沒有']],correct:['no'],explanation:'教材示意圖中動物細胞也有小液胞。'},
      {type:'radio',prompt:'植物細胞有細胞壁，所以沒有細胞膜。這句話正確嗎？',options:[['false','錯誤'],['true','正確']],correct:['false'],explanation:'植物細胞同時具有細胞膜與細胞壁。'},
      {type:'select',prompt:'哪個構造可協助植物細胞維持形狀？',options:[['','請選擇'],['wall','細胞壁'],['nucleus','細胞核'],['mitochondria','粒線體']],correct:['wall'],explanation:'細胞壁與大液胞都能協助維持植物細胞形狀。'},
      {type:'radio',prompt:'最能判斷植物細胞的組合是？',options:[['plant','細胞壁與葉綠體'],['common','細胞核與細胞質'],['animal','只有細胞膜']],correct:['plant'],explanation:'細胞壁為植物細胞重要特徵，有些植物細胞另有葉綠體。'}
    ]},
    microscope:{unit:'顯微影像探索',title:'從顯微影像找證據',subtitle:'示意圖顯示概念，顯微影像則需要依可見特徵判讀。',tip:'不要把每個深色點都直接當成細胞核。',sections:[{title:'三種常見觀察材料',html:'<figure class="course-figure microscope-figure"><img src="assets/course/microscope-specimens-original-v2.webp" alt="三種實驗材料的原創顯微觀察圖，由左至右為呈狹長長方形排列的洋蔥表皮細胞、含氣孔的葉片下表皮與口腔皮膜細胞"><figcaption class="three-caption"><span><strong>洋蔥表皮</strong>狹長長方形，規則排列；染色後細胞核較清楚</span><span><strong>葉片下表皮</strong>保衛細胞成對圍成氣孔</span><span><strong>口腔皮膜</strong>扁平不規則，細胞核染成深色</span></figcaption></figure><p>低倍率適合先找到標本與觀察範圍，高倍率則用來觀察較細微的構造。從低倍率換到高倍率前，應先把目標移到視野中央。</p>'}],questions:[
      {type:'radio',prompt:'觀察標本時，應先使用哪一種倍率？',options:[['low','低倍率'],['high','高倍率']],correct:['low'],explanation:'先用低倍率較容易找到標本。'},
      {type:'radio',prompt:'洋蔥表皮染色後，通常哪個構造較清楚？',options:[['nucleus','細胞核'],['chloroplast','葉綠體'],['wallgone','消失的細胞壁']],correct:['nucleus'],explanation:'染色可讓細胞核更容易被觀察。'},
      {type:'radio',prompt:'哪一種細胞由兩個半月形細胞圍成氣孔？',options:[['guard','保衛細胞'],['oral','口腔皮膜細胞'],['blood','紅血球']],correct:['guard'],explanation:'一對保衛細胞共同構成氣孔。'},
      {type:'radio',prompt:'染色會讓細胞「產生」細胞核嗎？',options:[['no','不會，只是讓原有構造更清楚'],['yes','會']],correct:['no'],explanation:'染色不會創造新的細胞構造。'},
      {type:'checkbox',prompt:'判讀顯微影像時應注意哪些線索？',options:[['shape','細胞形狀'],['arrangement','排列方式'],['stain','染色情況'],['guess','只看顏色猜答案']],correct:['shape','arrangement','stain'],explanation:'應綜合形狀、排列與染色情況判斷。'}
    ]},
    lab:{unit:'細胞的觀察實驗',title:'製片與觀察任務',subtitle:'比較洋蔥表皮剝片與口腔皮膜塗片，理解材料不同時製片方法也要調整。',tip:'洋蔥表皮先滴水；口腔皮膜先滴亞甲藍液。兩者蓋片時都要減少氣泡。',sections:[{title:'洋蔥表皮細胞：剝片標本六步驟',html:`<p>洋蔥表皮本身是一層可以剝取的薄組織，因此先取材，再放入水滴攤平。標本過厚或皺摺會讓細胞重疊；蓋片太快容易產生氣泡。</p><div class="lab-step-gallery"><figure class="lab-step-card"><img src="assets/lab-steps/01-collect.webp" alt="用鑷子從洋蔥鱗葉內側撕取薄而透明的表皮"><figcaption><strong>1．取材</strong><span>用鑷子輕輕撕取一小片薄而透明的洋蔥鱗葉表皮，避免夾到厚層組織。</span></figcaption></figure><figure class="lab-step-card"><img src="assets/lab-steps/02-drop.webp" alt="用滴管在乾淨載玻片中央滴一滴水"><figcaption><strong>2．滴水</strong><span>在乾淨載玻片中央滴一滴水，使表皮保持濕潤並能平貼。</span></figcaption></figure><figure class="lab-step-card"><img src="assets/lab-steps/03-flatten.webp" alt="將洋蔥表皮放入水滴並用解剖針攤平"><figcaption><strong>3．攤平</strong><span>把表皮放入水滴，用鑷子或解剖針展開皺摺，避免細胞互相重疊。</span></figcaption></figure><figure class="lab-step-card"><img src="assets/lab-steps/04-coverslip.webp" alt="讓蓋玻片斜靠解剖針並慢慢蓋下"><figcaption><strong>4．蓋片</strong><span>蓋玻片約成 45 度，一側先接觸水滴，再慢慢放下以減少氣泡。</span></figcaption></figure><figure class="lab-step-card"><img src="assets/lab-steps/05-low-power.webp" alt="低倍率視野中可看到許多較小的洋蔥表皮細胞"><figcaption><strong>5．低倍定位</strong><span>先用低倍率找到標本與清楚區域，再把目標移到視野中央。</span></figcaption></figure><figure class="lab-step-card"><img src="assets/lab-steps/06-high-power.webp" alt="高倍率視野中只看到少數放大的洋蔥表皮細胞與細胞核"><figcaption><strong>6．高倍觀察</strong><span>換高倍率後視野變小、細胞變大；用細調節輪看清細胞壁與染色後的細胞核。</span></figcaption></figure></div>`},{title:'口腔皮膜細胞：塗片標本六步驟',html:`<p>口腔皮膜細胞不是可直接剝下的一整片透明組織，而是用牙籤鈍端取得少量細胞，再把細胞<span class="keyword keyword-blue">塗散</span>在染液中。口腔皮膜細胞是沒有細胞壁的動物細胞，若只放入水中，水分容易進入細胞，使細胞膨脹，甚至脹破；因此第一步先滴<span class="keyword keyword-purple">亞甲藍液</span>，不是滴水。</p><div class="lab-step-gallery"><figure class="lab-step-card"><img src="assets/lab-steps-oral/01-stain.webp" alt="在載玻片中央滴一滴淡藍色亞甲藍液"><figcaption><strong>1．滴亞甲藍液</strong><span>先滴一滴亞甲藍液，避免只用水使動物細胞吸水膨脹；染色也能讓細胞核更容易觀察。</span></figcaption></figure><figure class="lab-step-card"><img src="assets/lab-steps-oral/02-scrape.webp" alt="用牙籤鈍端輕刮口腔內側"><figcaption><strong>2．輕刮取樣</strong><span>漱口後，用乾淨牙籤的鈍端輕刮口腔內側；不可用尖端，也不要用力刮傷。</span></figcaption></figure><figure class="lab-step-card"><img src="assets/lab-steps-oral/03-smear.webp" alt="將牙籤鈍端在亞甲藍液中輕輕塗散細胞"><figcaption><strong>3．塗散細胞</strong><span>把牙籤鈍端放入亞甲藍液中輕輕滾動，使細胞薄薄散開，避免堆成一團。</span></figcaption></figure><figure class="lab-step-card"><img src="assets/lab-steps-oral/04-coverslip.webp" alt="將蓋玻片斜放並慢慢蓋在染液上"><figcaption><strong>4．蓋片</strong><span>讓蓋玻片一側先接觸染液，再斜斜慢慢放下，減少氣泡進入。</span></figcaption></figure><figure class="lab-step-card"><img src="assets/lab-steps-oral/05-low-power.webp" alt="低倍率視野中可看到許多小而分散的口腔皮膜細胞"><figcaption><strong>5．低倍定位</strong><span>低倍率視野較廣，先找到分散、染色適中的細胞，再移到中央。</span></figcaption></figure><figure class="lab-step-card"><img src="assets/lab-steps-oral/06-high-power.webp" alt="高倍率視野中可看到少數放大的口腔皮膜細胞與深色細胞核"><figcaption><strong>6．高倍觀察</strong><span>高倍率下辨認細胞膜、淡色細胞質與染成深藍紫色的細胞核；口腔皮膜細胞沒有細胞壁。</span></figcaption></figure></div><p><strong>為什麼不是滴水？</strong> 動物細胞沒有細胞壁，若放入水中容易因吸水而膨脹，甚至脹破；亞甲藍液同時能染色並提高對比，使細胞核較容易被看見。染色不會讓細胞「長出」新構造。</p>`}],questions:[
      {type:'radio',prompt:'製作口腔皮膜細胞塗片時，載玻片中央為什麼先滴亞甲藍液，而不是只滴水？',options:[['osmotic','口腔皮膜細胞是動物細胞，放入水中容易吸水膨脹，甚至脹破'],['food','亞甲藍能提供細胞養分，使細胞立刻變大'],['wall','亞甲藍會讓動物細胞長出細胞壁']],correct:['osmotic'],explanation:'動物細胞沒有細胞壁保護，若放入水中，水分容易進入細胞，使細胞膨脹，甚至脹破。亞甲藍液還能提高對比，使細胞核較容易觀察。'},
      {type:'radio',prompt:'蓋玻片以約 45 度慢慢放下，主要目的為何？',options:[['bubble','減少氣泡'],['stain','增加染色'],['magnify','提高倍率']],correct:['bubble'],explanation:'斜放並慢慢蓋下可降低氣泡進入的機會。'},
      {type:'radio',prompt:'洋蔥表皮標本應具備什麼特徵？',options:[['thin','薄而平整'],['thick','越厚越好'],['folded','折疊成多層']],correct:['thin'],explanation:'標本薄而平整，光線較容易通過。'},
      {type:'radio',prompt:'口腔皮膜細胞使用牙籤的哪一端取樣？',options:[['blunt','鈍端'],['sharp','尖端']],correct:['blunt'],explanation:'教材要求使用牙籤鈍端輕刮口腔內側。'},
      {type:'radio',prompt:'正確觀察順序為何？',options:[['lowhigh','先低倍率，再高倍率'],['highlow','先高倍率，再低倍率']],correct:['lowhigh'],explanation:'先低倍率找到細胞，再換高倍率觀察細節。'},
      {type:'checkbox',prompt:'本實驗可觀察哪些材料？',options:[['onion','洋蔥鱗葉表皮'],['guard','風車草下表皮'],['oral','口腔皮膜細胞'],['rock','岩石碎片']],correct:['onion','guard','oral'],explanation:'教材安排植物表皮、保衛細胞與口腔皮膜細胞觀察。'}
    ]},
    assess2:{unit:'形成性評量（二）',title:'檢查你的第二階段學習成果',subtitle:'完成 10 題後保存分數即可繼續，不設及格門檻。',assessment:true,tip:'完成比滿分更重要；查看解析後可以重新挑戰。',sections:[{title:'作答說明',html:'<p>題目涵蓋細胞構造、動植物比較、製片方法與顯微影像。</p>'}],questions:[
      {type:'radio',prompt:'細胞核的主要功能是？',options:[['control','含遺傳物質並控制代謝'],['store','只儲存水'],['wall','維持植物形狀']],correct:['control'],explanation:'細胞核含遺傳物質，是細胞生命中樞。'},
      {type:'radio',prompt:'細胞質是什麼？',options:[['site','許多代謝作用的場所'],['outside','細胞外的硬壁'],['light','光合作用色素']],correct:['site'],explanation:'細胞質包含膠狀水溶液與胞器。'},
      {type:'radio',prompt:'粒線體主要進行什麼作用？',options:[['respiration','呼吸作用'],['photosynthesis','光合作用'],['protection','形成保護層']],correct:['respiration'],explanation:'粒線體利用養分產生能量。'},
      {type:'radio',prompt:'細胞膜的功能是？',options:[['transport','區隔內外並控制物質進出'],['genes','儲存全部遺傳物質'],['shapeonly','只讓植物呈方形']],correct:['transport'],explanation:'細胞膜能維持完整並控制物質進出。'},
      {type:'radio',prompt:'植物細胞壁主要由什麼構成？',options:[['cellulose','纖維素'],['protein','蛋白質'],['fat','脂肪']],correct:['cellulose'],explanation:'教材指出植物細胞壁由纖維素構成。'},
      {type:'radio',prompt:'植物細胞的液胞通常如何？',options:[['large','較大'],['none','完全沒有'],['outside','位於細胞外']],correct:['large'],explanation:'植物細胞液胞通常較大，可協助維持形狀。'},
      {type:'radio',prompt:'所有植物細胞都有葉綠體嗎？',options:[['no','不一定'],['yes','一定']],correct:['no'],explanation:'只有部分植物細胞具有葉綠體。'},
      {type:'radio',prompt:'染色前後最大的差異通常是？',options:[['clear','部分構造變得較清楚'],['new','產生新胞器'],['grow','細胞變大']],correct:['clear'],explanation:'染色提高對比，不會創造新構造。'},
      {type:'radio',prompt:'觀察標本應先使用？',options:[['low','低倍率'],['high','高倍率']],correct:['low'],explanation:'先低倍率較容易找到目標。'},
      {type:'radio',prompt:'植物細胞同時具有細胞膜與細胞壁嗎？',options:[['yes','是'],['no','否']],correct:['yes'],explanation:'細胞膜位在細胞壁內側，兩者功能不同。'}
    ]},
    reading:{unit:'閱讀素養',title:'梨子為什麼有顆粒感？',subtitle:'從石細胞的形成、構造與功能，練習用證據解釋生活中的現象。',tip:'先找出「觀察到的現象」與「文本提供的構造證據」，再建立因果關係。',sections:[{title:'從一口梨子提出問題',html:'<div class="reading-passage"><h3>口中的小顆粒從哪裡來？</h3><p>咬下梨子時，果肉多汁柔軟，舌頭卻常感到細小而堅硬的顆粒。這些顆粒不是沙子，而是一群稱為<span class="keyword keyword-orange">石細胞</span>的植物細胞。石細胞屬於厚壁組織的一類，會散布或聚集在柔軟的果肉細胞之間；當牙齒壓碎果肉時，較柔軟的細胞容易變形，厚而堅硬的石細胞便產生明顯的顆粒感。</p><h3>細胞如何變得堅硬？</h3><p>石細胞在發育早期仍是活細胞。隨著成熟，原有細胞壁內側會再堆積形成<span class="keyword keyword-red">次生細胞壁</span>，其中常含有木質素，使細胞壁逐漸加厚、變硬，細胞中央的空間也越來越狹窄。成熟後，許多石細胞的原生質體消失而死亡，但厚細胞壁仍保留下來，因此即使細胞不再進行代謝，仍能發揮機械性的支撐與保護作用。</p><h3>構造與功能的連結</h3><p>厚而木質化的細胞壁能承受擠壓，也不容易因果肉成熟軟化而崩解。除梨子果肉外，某些種皮、果核或堅硬外殼中也可發現類似的石細胞。它們所在的位置與排列方式不同，可能形成散落的小顆粒，也可能集合成連續的堅硬保護層。這說明細胞的功能不只取決於是否存活，也和保留下來的構造、材料性質及排列方式有關。</p><h3>從證據推論，也辨認限制</h3><p>若顯微觀察只看到很厚的壁與狹小空腔，可以合理推論此細胞具有支撐或保護功能；若未看見細胞核或葉綠體，則只能描述「在這次製片與倍率下未觀察到」，不能只憑一張影像斷定所有同類細胞從未具有這些構造。科學解釋需要把觀察、已知機制與推論界線分清楚。</p></div>'}],questions:[
      {type:'radio',prompt:'梨子果肉柔軟，卻會出現明顯顆粒感，最完整的解釋是什麼？',options:[['contrast','厚壁石細胞散布在柔軟果肉細胞間，受咀嚼時形成硬度差異'],['sand','果肉中混入細沙'],['sugar','糖分結晶一定形成硬粒']],correct:['contrast'],explanation:'顆粒感來自堅硬石細胞與柔軟果肉細胞之間的材料性質差異。'},
      {type:'checkbox',prompt:'成熟石細胞即使死亡，仍能發揮支撐或保護作用，與哪些特徵直接相關？',options:[['thick','次生細胞壁很厚'],['lignin','細胞壁常含木質素'],['wallremain','死亡後厚壁仍保留'],['metabolism','持續進行旺盛代謝']],correct:['thick','lignin','wallremain'],explanation:'厚且木質化的細胞壁會保留；支撐作用不需要死亡細胞持續代謝。'},
      {type:'radio',prompt:'若大量石細胞緊密聚集成連續層，最可能出現在哪種構造並發揮什麼功能？',options:[['shell','堅硬果核或種皮，提供保護'],['leaf','柔軟葉肉，專門進行光合作用'],['blood','血液中，運送氧氣']],correct:['shell'],explanation:'石細胞聚集時可形成堅硬保護層，常見於種皮、果核或外殼。'},
      {type:'radio',prompt:'顯微影像中沒有看見細胞核，哪一個說法最符合科學證據？',options:[['limited','本次製片與倍率下未觀察到，仍須結合其他證據判斷'],['never','這類細胞在任何發育階段都沒有細胞核'],['fake','影像中的細胞一定不是生物構造']],correct:['limited'],explanation:'未觀察到不等於從未存在；應說明觀察條件與推論限制。'},
      {type:'radio',prompt:'下列哪一組因果順序最能解釋石細胞的形成與功能？',options:[['sequence','次生壁堆積並木質化 → 細胞壁增厚變硬 → 成熟後仍可支撐保護'],['reverse','先產生顆粒感 → 細胞才長出厚壁'],['chloroplast','葉綠體增加 → 光合作用停止 → 細胞壁消失']],correct:['sequence'],explanation:'文本證據支持由構造形成、材料性質改變，再連結到支撐與口感的因果順序。'}
    ]},
    challenge:{unit:'綜合挑戰',title:'細胞研究員最終任務',subtitle:'把發現史、形態功能、細胞構造與顯微觀察整合在一起。',assessment:true,scoreMode:'count',tip:'每題答對得 1 分；完成全部題目後保存本次分數。',sections:[{title:'任務情境',html:'<p>研究室收到數個未知細胞樣本與一份歷史紀錄。請利用整個單元累積的證據完成判讀。綜合挑戰共 6 題，答對幾題就是幾分。</p>'}],questions:[
      {type:'radio',prompt:'未知細胞具有細胞壁、大液胞與葉綠體，最可能是？',options:[['plant','植物細胞'],['animal','動物細胞']],correct:['plant'],explanation:'細胞壁與葉綠體是判斷植物細胞的重要線索。'},
      {type:'radio',prompt:'某細胞具有細長突起並能傳遞訊息，最可能是？',options:[['nerve','神經細胞'],['blood','紅血球'],['guard','保衛細胞']],correct:['nerve'],explanation:'形態與功能線索指向神經細胞。'},
      {type:'checkbox',prompt:'哪些敘述可以同時適用於典型動、植物細胞？',options:[['membrane','具有細胞膜'],['cytoplasm','具有細胞質'],['mitochondria','具有粒線體'],['wall','一定有細胞壁']],correct:['membrane','cytoplasm','mitochondria'],explanation:'細胞壁不是動物細胞的構造。'},
      {type:'radio',prompt:'觀察洋蔥表皮時看不到葉綠體，應如何解釋？',options:[['some','並非所有植物細胞都有葉綠體'],['notplant','洋蔥不是植物'],['broken','顯微鏡一定壞了']],correct:['some'],explanation:'洋蔥鱗葉表皮是理解例外的重要材料。'},
      {type:'radio',prompt:'哪項操作最能減少蓋玻片下的氣泡？',options:[['angle','約 45 度慢慢蓋下'],['drop','直接垂直放下'],['thick','增加標本厚度']],correct:['angle'],explanation:'斜放蓋玻片可讓空氣逐漸排出。'},
      {type:'radio',prompt:'哪一項最能代表本單元的核心概念？',options:[['core','細胞是生物體構造與功能的基本單位'],['same','所有細胞完全相同'],['plant','只有植物具有細胞']],correct:['core'],explanation:'細胞學說連結了生物體的構造與功能。'}
    ]}
  }
};

// 依目前課程版本覆寫需跨頁同步的名稱與題目。
window.CELL_COURSE.modules.lab.title = '玻片觀察';
window.CELL_COURSE.modules.lab.questions[5] = {
  type:'checkbox',
  prompt:'比較洋蔥表皮與口腔皮膜細胞的製片方法，哪些敘述正確？',
  options:[['onionwater','洋蔥表皮放入載玻片中央的水滴中'],['oralstain','口腔皮膜細胞先滴亞甲藍液再取樣塗散'],['slowcover','兩種標本都應斜放蓋玻片並慢慢蓋下'],['oralpeel','口腔皮膜要用鑷子剝下一整片組織']],
  correct:['onionwater','oralstain','slowcover'],
  explanation:'洋蔥表皮是剝片標本，先滴水並攤平；口腔皮膜是塗片標本，先滴亞甲藍液再把細胞塗散。兩者都要慢慢蓋片以減少氣泡。'
};
Object.assign(window.CELL_COURSE.modules.challenge, {
  unit:'細胞學習英雄榜',
  title:'細胞學習英雄榜',
  subtitle:'辨認由左向右移動的細胞與胞器，越快答對，分數越高。',
  scoreMode:'game',
  tip:'每個項目最高 5,000 分、最低 500 分；答錯扣 1,000 分並失去 1 次生命。',
  sections:[{title:'遊戲規則',html:'<p>共有 12 種細胞或胞器，總分上限 60,000 分。圖片由左向右移動，請在抵達終點前從下方點選正確名稱。每位學生以班級與座號辨識，只保留最高分，排行榜顯示前 10 名。</p>'}]
});
window.CELL_COURSE.modules.challenge.questions[2] = {
  type:'radio',
  prompt:'哪一組構造同時存在於典型的動物細胞與植物細胞？',
  options:[['common','細胞膜、細胞質與粒線體'],['plantonly','細胞壁、葉綠體與大液胞'],['wall','只有細胞壁']],
  correct:['common'],
  explanation:'典型動、植物細胞都具有細胞膜、細胞質與粒線體。'
};
