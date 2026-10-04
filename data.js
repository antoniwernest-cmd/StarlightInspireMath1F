/* Starlight: original, grade-specific Ontario B1 Number Sense activities. */
(function(){
  const C=(code,title,story,prompt,visual,options,answer)=>({type:'choice',code,title,story,prompt,visual,options,answer});
  const H=(code,title,story,prompt,target)=>({type:'chart',code,title,story,prompt,target});
  const E=(code,title,story,prompt,visual,actual,max,tolerance)=>({type:'estimate',code,title,story,prompt,visual,actual,max,tolerance});
  const B=(code,title,story,prompt,visual,target,parts)=>({type:'build',code,title,story,prompt,visual,target,parts});
  const S=(code,title,story,prompt,visual,min,max,step,answer)=>({type:'slider',code,title,story,prompt,visual,min,max,step,answer});
  const O=(code,title,story,prompt,visual,cards,answer)=>({type:'order',code,title,story,prompt,visual,cards,answer});
  const P=(code,title,story,prompt,visual,items,sharers,options,answer,mode,token)=>({type:'share',code,title,story,prompt,visual,items,sharers,options,answer,mode,token});
  const F=(code,title,story,prompt,visual,a,b)=>({type:'shade',code,title,story,prompt,visual,a,b});
  const FC=(code,title,story,prompt,visual,a,b,options,answer)=>({type:'fractionCompare',code,title,story,prompt,visual,a,b,options,answer});
  const R=(code,title,story,prompt,visual,value,unit,answer)=>({type:'round',code,title,story,prompt,visual,value,unit,answer});
  const D=(title,focus,intro,handsOn,missions)=>({title,focus,intro,handsOn,missions});
  window.STARLIGHT_DATA={
    Pathway:{grade:1,icon:'🌟',range:50,expectations:{
      'B1.1':'Read and represent whole numbers up to and including 50, and describe various ways they are used in everyday life.',
      'B1.2':'Compose and decompose whole numbers up to and including 50, using a variety of tools and strategies, in various contexts.',
      'B1.3':'Compare and order whole numbers up to and including 50, in various contexts.',
      'B1.4':'Estimate the number of objects in collections of up to 50, and verify estimates by counting.',
      'B1.5':'Count to 50 by 1s, 2s, 5s, and 10s, using a variety of tools and strategies.',
      'B1.6':'Use drawings to represent and solve fair-share problems involving 2 and 4 sharers and remainders of 1 or 2.',
      'B1.7':'Recognize that one half and two fourths of the same whole are equal in fair-sharing contexts.',
      'B1.8':'Use drawings to compare and order unit fractions resulting when a whole is shared by different numbers of sharers, up to 10.'
    },
    home:[
      D('Garden number hunt','Read, estimate, and build','The garden club uses number labels to organize seeds and leaves. Look closely, make a sensible guess, and then check with a counting tool. You can touch the numbers and blocks on the screen.','Draw 24 seeds as two groups of ten and four singles. Say the number in two different ways.',[
        H('B1.1','Find the seed label','The garden club has 18 seed packets. A student wrote 18 on the shelf so the group can find them again. Find the same number on the chart.','Tap the number 18 on the chart.',18),
        E('B1.4','Guess the leaves','Leaves fell into one collection by the path. Before counting, make a guess that is close. Then reveal the groups and count to check your estimate.','Slide to your estimate, then count the leaves.', '🍂',23,50,5),
        C('B1.3','Which basket is fuller?','Two students collected seeds for the garden. One basket holds 29 and the other holds 32. Compare the tens first, then the ones.','Which basket has more seeds?','🧺 29  ·  🧺 32',['29','32'],'32'),
        B('B1.2','Build the garden count','The class needs 24 seed markers. A long rod stands for ten, and a small cube stands for one. Use the block bank to show the number on the sign.','Build 24 with tens and ones.','🌱',24,[0,2,4])
      ]),
      D('Library shelf numbers','Tens, ones, and order','A librarian has put number labels on small book baskets. Tens rods and ones cubes help us read each label. After building a number, compare it with another basket.','Draw three rods and six little cubes. Explain why that model shows 36.',[
        B('B1.2','Make 36 books','One shelf has 36 books. The librarian groups full sets of ten and leaves the extras as ones. Build the label using rods and cubes.','Show 36 as tens and ones.','📚',36,[0,3,6]),
        O('B1.3','Put baskets in order','Four baskets need shelf spaces from smallest count to largest. Their labels are 14, 41, 24, and 32. Place the labels in the correct order.','Tap a label, then tap its landing pad.','📚 14 · 41 · 24 · 32',['14','41','24','32'],['14','24','32','41']),
        C('B1.2','Read the parts','A student says that 31 is three groups of ten and one extra. That is another way to describe 31. Decide which block model matches the label.','Which model shows 31?','🔟 + 🟨',['3 tens and 1 one','1 ten and 3 ones','3 tens and 10 ones'],'3 tens and 1 one'),
        H('B1.1','Find the return bin','The return bin is labelled 47. That number tells the students where to put the books. Scan the chart by tens and then by ones.','Tap 47 on the chart.',47)
      ]),
      D('Bike parade count','Count by different steps','Students are making number signs for a short bike parade. Each group follows a different counting rule. Say the whole pattern aloud before you move the slider.','Make four paper number paths: by 1s, 2s, 5s, and 10s. Keep every path at 50 or below.',[
        S('B1.5','One more helmet','A line of helmets is numbered 26, 27, 28, and 29. The next label is one more than 29. Use the slider to finish the path.','What is the next label?','⛑️ 26 → 27 → 28 → 29 → ?',0,50,1,30),
        S('B1.5','Pairs of wheels','The first bicycle shows two wheels. Each new bicycle adds another pair, so the totals are 2, 4, 6, and 8. Continue counting by twos.','How many wheels after one more bicycle?','🚲 2 → 4 → 6 → 8 → ?',0,50,2,10),
        S('B1.5','Five at each stop','Five students stand at each of four parade stops. The totals are 5, 10, 15, and 20. Count one more group of five.','What total comes next?','👧🏽👦🏻 5 → 10 → 15 → 20 → ?',0,50,5,25),
        S('B1.5','Tens on the route','The route markers read 10, 20, 30, and 40. Each marker is ten more than the last. Find the final marker without going beyond 50.','What number comes next?','🛣️ 10 → 20 → 30 → 40 → ?',0,50,10,50)
      ]),
      D('Picnic shares','Fair shares and matching halves','The picnic group wants each student to get the same number of whole treats. Move one treat at a time to a face mat, leaving any extras in the bank. Then use equal paper strips to see a half in two ways.','Draw four plates. Show 9 cookies shared fairly and circle the cookie left over.',[
        P('B1.6','Nine cookies, four friends','Four students share nine whole cookies at the picnic. Give each student the same number of whole cookies. Leave any cookie that cannot be shared fairly in the bank.','How many whole cookies does each student get?','🍪',9,4,['2 each, 1 left','2 each, 2 left','3 each, 1 left'],'2 each, 1 left','leftover','🍪'),
        P('B1.6','Ten apples, four friends','Four students share ten whole apples for snack. Put the same number on each plate. Do not give one student an extra whole apple.','How many apples does each student get, and how many stay?','🍎',10,4,['2 each, 2 left','2 each, 1 left','3 each, 2 left'],'2 each, 2 left','leftover','🍎'),
        P('B1.6','Seven crayons, two artists','Two students share seven crayons for a drawing. They take turns choosing one crayon at a time. One crayon will remain after both have the same amount.','What is the fair share of whole crayons?','🖍️',7,2,['3 each, 1 left','2 each, 1 left','4 each, 1 left'],'3 each, 1 left','leftover','🖍️'),
        F('B1.7','One half, two fourths','Two students colour equal-sized paper strips. One colours one of two equal parts; the other colours two of four equal parts. Tap the parts on both strips and compare the coloured lengths.','Shade 1/2 on the first strip and 2/4 on the second.','🎨',[1,2],[2,4])
      ]),
      D('Fraction art wall','Compare shares of one whole','Every paper strip on the wall has the same length. When a strip is divided among more students, each single share becomes smaller. Look at the shaded parts before deciding which is larger.','Draw one strip split into 2, one into 4, and one into 10 equal parts. Shade one part of each.',[
        FC('B1.8','Two or four sharers?','A ribbon is shared by two students in one group and four students in another. Each ribbon starts the same length. Compare one person’s share in each group.','Which single share is larger?','🎀',[1,2],[1,4],['1/2','1/4'],'1/2'),
        FC('B1.8','Three or ten sharers?','Two equal snack bars are shared by different groups. One bar is shared by three students and the other by ten students. Look at one student’s piece from each bar.','Which single share is larger?','🍫',[1,3],[1,10],['1/3','1/10'],'1/3'),
        O('B1.8','Order unit fractions','Three same-sized paper strips are cut into 2, 4, or 8 equal parts. A student gets only one part from each strip. Order these single shares from largest to smallest.','Place the largest share first.','📏 1/2 · 1/4 · 1/8',['1/8','1/2','1/4'],['1/2','1/4','1/8']),
        B('B1.1 · B1.2','Build the last label','The art wall has 50 spaces for pictures. Five rods of ten fill them all. Build the sign with base-ten pieces to show exactly 50.','Show 50 with tens and ones.','🖼️',50,[0,5,0])
      ])
    ],
    school:[
      D('Classroom number lab','Read and estimate to 50','The class will use labelled trays and countable counters. First make a quiet estimate, then use the screen to check it. Tell a partner how the tens helped you.','Teacher setup: pairs draw 42 counters in groups of ten, then explain the leftover ones.',[
        H('B1.1','Find tray 42','A tray in the classroom holds 42 counters. Its label helps students return it to the right shelf. Locate that label on the chart.','Tap 42.',42),
        E('B1.4','Estimate the buttons','A teacher spills a small collection of buttons onto a mat. Look at the collection before counting it. Make an estimate, then reveal the groups to verify.','Estimate, then count the buttons.','🔘',28,50,6),
        C('B1.3','Pick the larger collection','One group sorts 34 blocks and another sorts 43. The digits are the same, but their places are different. Compare the tens first.','Which group has more blocks?','🧱 34 · 43',['34','43'],'43'),
        B('B1.2','Make the class count','The class collected 34 counting cubes. Each tens rod represents ten cubes. Build the count so another student can check it.','Build 34.','🟦',34,[0,3,4]),
        H('B1.1','Find the partner tray','Another tray holds 15 counters. The label helps partners return it after the lesson. Look along the chart to find it.','Tap 15.',15),
        E('B1.4','Guess the next pile','Students add another small pile of counters to a mat. Before you count, make a close guess. Then reveal ten-groups and check it.','Estimate, then count the pile.','🟣',37,50,6)
      ]),
      D('Shelf and seat labels','Compose and order','Students are making number labels for the classroom library. A label can be built from tens and ones, or placed in order on a shelf. Explain each move to a partner.','Teacher setup: students make paper cards 12, 21, 31, 41 and lay them in order.',[
        O('B1.3','Order the shelf labels','Four book baskets have labels 12, 21, 31, and 41. Put them from smallest to largest so a student can find a basket quickly. Think about the tens.','Fill the four landing pads in order.','📚 12 · 21 · 31 · 41',['31','12','41','21'],['12','21','31','41']),
        C('B1.3','Which seat number is later?','Two students have seat cards 47 and 49. Both cards show four tens. Compare the ones to find which number comes later.','Which seat number is greater?','🪑 47 · 49',['47','49'],'49'),
        B('B1.2','Build the reading total','There are 29 picture books on the display. The class wants to show that count with tens rods and ones cubes. Build it, then read the number aloud.','Show 29.','📖',29,[0,2,9]),
        C('B1.2','Two parts of 40','The teacher has 40 counters. One box holds 30 and another holds the rest. Use tens to think about the missing part.','What part goes with 30 to make 40?','📦 30 + ? = 40',['5','10','20'],'10'),
        C('B1.3','Two more seat cards','A teacher sees seat cards 26 and 42. A student must stand beside the larger number. Compare the tens on the cards.','Which seat card is larger?','🪑 26 · 42',['26','42'],'42'),
        B('B1.2','Show a full five tens','Five bags each hold ten classroom tiles. No loose tiles are left. Build the total with rods.','Build 50.','🛍️',50,[0,5,0])
      ]),
      D('Four counting circles','Count to 50 four ways','The class stands in a circle and passes a number card. Each round has a new step size. Say the numbers out loud before you set the answer.','Teacher setup: make four floor paths by 1s, 2s, 5s, and 10s. Let each student lead one path.',[
        S('B1.5','Count by ones','A student reads 36, 37, 38, and 39 from the cards. The next number is one more than 39. Move the slider to finish the row.','What comes next?','🔢 36 → 37 → 38 → 39 → ?',0,50,1,40),
        S('B1.5','Count by twos','The jumping route lands on 14, 16, 18, and 20. Every jump adds two. Slide to the next landing number.','What comes next?','👟 14 → 16 → 18 → 20 → ?',0,50,2,22),
        S('B1.5','Count by fives','The class stacks chairs in groups of five. The totals read 25, 30, 35, and 40. Add one more group.','What total comes next?','🪑 25 → 30 → 35 → 40 → ?',0,50,5,45),
        S('B1.5','Count by tens','Each bag has ten linking cubes. The class counts 10, 20, 30, and 40 cubes. Another bag is added.','How many cubes now?','🛍️ 10 → 20 → 30 → 40 → ?',0,50,10,50),
        S('B1.5','Another one','A class reads 47, 48, and 49 on a number path. Every step adds one. The next marker is the end of the chart.','What number follows 49?','🔢 47 → 48 → 49 → ?',0,50,1,50),
        S('B1.5','Another pair','The jump cards read 42, 44, and 46. The student keeps adding two. Find the next landing number.','What comes after 46?','👟 42 → 44 → 46 → ?',0,50,2,48)
      ]),
      D('Table-team shares','Share and draw','Students use whole paper counters on four table mats. Everyone in a problem must receive the same number of whole counters. Leave a remainder on the bank mat and draw what happened.','Teacher setup: let pairs draw the plates for both problems before they tap the on-screen mats.',[
        P('B1.6','Five counters for two','Two table teams share five counters. Move one counter to each team in turn. Stop when only one counter would make the shares unequal.','How many per team, and what remains?','🟡',5,2,['2 each, 1 left','2 each, 2 left','3 each, 1 left'],'2 each, 1 left','leftover','🟡'),
        P('B1.6','Six stickers for four','Four students share six whole stickers for notebooks. Give every student the same number. Keep extra stickers on the bank mat.','What is the fair share of whole stickers?','⭐',6,4,['1 each, 2 left','1 each, 1 left','2 each, 2 left'],'1 each, 2 left','leftover','⭐'),
        F('B1.7','Fold a strip two ways','One group folds a strip into halves. Another folds an equal-sized strip into fourths. Colour one half and two fourths to compare them.','Tap 1/2 and 2/4.','📏',[1,2],[2,4]),
        C('B1.7','Name the same amount','A student colours one half of a paper strip. Another student divides the same-sized strip into four equal parts. Choose how many fourths match the coloured half.','How many fourths equal one half?','🎨 1/2 = ?/4',['1 fourth','2 fourths','3 fourths'],'2 fourths'),
        P('B1.6','Nine clips for two','Two art partners share nine whole clips. Take turns putting one clip on each mat. Keep the last clip in the bank so the shares stay equal.','How many clips per partner, and what remains?','📎',9,2,['4 each, 1 left','3 each, 2 left','5 each, 1 left'],'4 each, 1 left','leftover','📎'),
        P('B1.6','Ten markers for four','Four table groups share ten whole markers. Give each group two markers. Keep the extras in the bank instead of giving an unfair extra.','What is the fair whole-marker share?','🖍️',10,4,['2 each, 2 left','2 each, 1 left','3 each, 2 left'],'2 each, 2 left','leftover','🖍️')
      ]),
      D('Class fraction gallery','Unit fractions and a final count','Each gallery strip is the same whole. Sharing among more students makes one student’s equal piece smaller. Use the displayed strips to explain your choices.','Teacher setup: students sketch equal strips split into 2, 3, 5, 6, and 10 parts.',[
        FC('B1.8','Two or five shares?','Two same-sized paper strips are cut for two groups. The first has two equal parts and the second has five. Compare one part from each strip.','Which unit fraction is larger?','📏',[1,2],[1,5],['1/2','1/5'],'1/2'),
        O('B1.8','Line up single shares','One piece of a strip might be 1/3, 1/6, or 1/10 of an equal whole. A smaller group gives a larger single piece. Put the three shares in size order.','Order largest to smallest.','🎨 1/3 · 1/6 · 1/10',['1/10','1/3','1/6'],['1/3','1/6','1/10']),
        H('B1.1','Find fifty','A classroom collection reaches 50. That is the largest number on this chart. Find it and read it aloud.','Tap 50.',50),
        E('B1.4','Estimate the final collection','A group pours counters into a counting tray. Look at them first and make a close guess. Reveal ten-groups to check how near your estimate was.','Estimate, then count.','🔵',46,50,5),
        FC('B1.8','Four or ten sharers?','Two equal paper strips are shared among four and ten students. Each student gets just one equal part. Look at which part is longer.','Which single share is larger?','📏',[1,4],[1,10],['1/4','1/10'],'1/4'),
        F('B1.7','Show the equal half','The class displays two same-sized paper strips. One is cut into two parts and the other into four. Colour one half and the matching two fourths.','Shade 1/2 and 2/4.','🎨',[1,2],[2,4])
      ])
    ]},
    Excite:{grade:2,icon:'🚲',range:200,expectations:{
      'B1.1':'Read, represent, compose, and decompose whole numbers up to and including 200, using a variety of tools and strategies, and describe ways they are used in everyday life.',
      'B1.2':'Compare and order whole numbers up to and including 200, in various contexts.',
      'B1.3':'Estimate the number of objects in collections of up to 200 and verify estimates by counting.',
      'B1.4':'Count to 200, including by 20s, 25s, and 50s, using a variety of tools and strategies.',
      'B1.5':'Describe what makes a number even or odd.',
      'B1.6':'Use drawings to represent, solve, and compare fair-share problems involving up to 10 items shared among 2, 3, 4, and 6 sharers, including whole-number, mixed-number, and fractional results.',
      'B1.7':'Recognize that one third and two sixths of the same whole are equal in fair-sharing contexts.'
    },
    home:[
      D('Bike-shop numbers','Represent and estimate to 200','The school bike shop records helmets, lights, and safety tags. Use hundreds, tens, and ones to show each count. When you estimate a collection, check it by counting the grouped dots.','Draw 126 safety tags as one hundred, two tens, and six ones.',[
        B('B1.1','Build the safety-tag total','The bike shop prepared 126 safety tags. A flat shows 100, a rod shows 10, and a tiny cube shows 1. Build the number so a volunteer can check it.','Show 126 with base-ten blocks.','🚲',126,[1,2,6]),
        E('B1.3','Estimate the helmet stickers','A box of helmet stickers was spilled onto a counting mat. Make an estimate before counting the dots. Then reveal the ten-groups and compare your guess with the count.','Estimate the collection, then verify.','⛑️',88,200,15),
        C('B1.2','Which rack has more?','Two bike racks are labelled 173 and 137. Both numbers have one hundred. Compare the tens and ones to see which rack holds more spaces.','Which rack has the greater number?','🚲 173 · 137',['173','137'],'173'),
        O('B1.2','Order the repair tags','Four repair tags read 105, 150, 115, and 151. A volunteer files them from smallest to largest. Place the tags in that order.','Fill the landing pads, least to greatest.','🏷️ 105 · 150 · 115 · 151',['151','115','105','150'],['105','115','150','151'])
      ]),
      D('Food-drive pairs','Even, odd, and place value','Students pair cans for carrying. If every can has a partner, the total is even; if one is left, it is odd. Use the ones digit as a clue, then explain it with pairs.','Make 14 paper cans and place them into pairs. Try 15 and show the leftover.',[
        C('B1.5','Can 148 be paired?','The food drive counted 148 cans. Volunteers want to put two cans in every carry bag. Think about whether a single can would be left over.','Is 148 even or odd?','🥫 148',['Even','Odd'],'Even'),
        C('B1.5','What about 159?','A second table counted 159 cans. Putting two in each bag would leave one can without a partner. Use that fact to name the number.','Is 159 even or odd?','🥫 159',['Even','Odd'],'Odd'),
        B('B1.1','Fill the supply note','A delivery brings exactly 200 labels. A hundred flat represents one full set of 100. Build the total with the block bank.','Show 200.','🏷️',200,[2,0,0]),
        C('B1.1','Read a different model','A student shows 142 as fourteen rods of ten and two cubes. Ten rods can also be traded for a hundred flat. The total stays the same.','Which standard model also shows 142?','🔟×14 + 🟨×2',['1 hundred, 4 tens, 2 ones','1 hundred, 2 tens, 4 ones','1 hundred, 4 tens, 1 one'],'1 hundred, 4 tens, 2 ones')
      ]),
      D('Sticker-pack jumps','Count by 20s, 25s, and 50s','Equal sticker packs make counting faster. Find the change between labels before you answer. Keep every total at 200 or below.','Draw eight boxes of 25. Label them 25, 50, 75, 100, 125, 150, 175, 200.',[
        S('B1.4','Packs of twenty','The fair packs stickers in bundles of 20. The labels read 20, 40, 60, and 80. Another bundle arrives.','What total comes next?','🎟️ 20 → 40 → 60 → 80 → ?',0,200,20,100),
        S('B1.4','Packs of twenty-five','The next booth uses packs of 25. The totals are 25, 50, and 75. Continue the equal jumps.','What total comes next?','🎟️ 25 → 50 → 75 → ?',0,200,25,100),
        S('B1.4','Packs of fifty','Four shelves each hold 50 sticker sheets. The running totals are 50, 100, and 150. Add the fourth shelf.','What is the final total?','📦 50 → 100 → 150 → ?',0,200,50,200),
        S('B1.4','Continue after 160','The helpers also count boxes by twenties from 120. They say 120, 140, and 160. One more equal box is added.','What total comes next?','📦 120 → 140 → 160 → ?',0,200,20,180)
      ]),
      D('Lunch-table sharing','Whole and fractional shares','Some lunch foods can be cut into equal pieces. First give each student the same number of whole pieces. If food remains, divide each leftover piece into equal parts and choose each student’s total share.','Draw 7 flatbreads shared by 3 students. Show two whole breads and one third for each.',[
        P('B1.6','Seven flatbreads, three','Three students share seven same-sized flatbreads. Give each student two whole breads. The last bread can be cut into three equal parts.','How much bread does each student get?','🫓',7,3,['2 1/3 each','2 1/2 each','3 each'],'2 1/3 each','fraction','🫓'),
        P('B1.6','Nine granola bars, six','Six students share nine identical granola bars. Give out one whole bar to each student. Cut the three remaining bars into six equal shares.','How much does each student get?','🍫',9,6,['1 1/2 each','1 1/3 each','2 each'],'1 1/2 each','fraction','🍫'),
        P('B1.6','Eight buns, four','Four students share eight identical buns. Move the buns to the plates so all four plates match. There should be no leftovers to cut.','How many buns does each student get?','🥯',8,4,['2 each','1 1/2 each','4 each'],'2 each','fraction','🥯'),
        F('B1.7','A third is two sixths','Two students colour equal-sized paper strips. One shades one of three parts; the other shades two of six parts. Compare the lengths they coloured.','Shade 1/3 and 2/6 on the two strips.','🎨',[1,3],[2,6])
      ]),
      D('Market check and share','Use the whole week’s tools','The community market has counts to estimate, labels to order, and snacks to divide. Choose the tool that fits each problem. Explain to someone why your answer makes sense.','Draw one of today’s answers in two ways, such as blocks and an expanded number.',[
        E('B1.3','Estimate the market beans','A table has many bean seeds on a counting mat. Make a close estimate without counting each dot first. Then reveal groups of ten and check your guess.','Estimate, then count the collection.','🫘',134,200,20),
        O('B1.2','Order the stall labels','Four market stalls are numbered 199, 109, 190, and 119. A visitor needs the labels from smallest to largest. Compare hundreds and tens carefully.','Put the stall numbers in order.','🏬 199 · 109 · 190 · 119',['190','119','199','109'],['109','119','190','199']),
        C('B1.5','Pair the activity tickets','There are 136 tickets for a two-student game. The organizer wants every ticket paired with one other ticket. Decide whether 136 can be paired with none left over.','Is 136 even or odd?','🎫 136',['Even','Odd'],'Even'),
        P('B1.6','Five wraps, two students','Two students share five identical wraps at lunch. Give out the whole wraps evenly. Cut the leftover wrap into two equal parts.','How much does each student get?','🌯',5,2,['2 1/2 each','2 1/3 each','3 each'],'2 1/2 each','fraction','🌯')
      ])
    ],
    school:[
      D('School supply count','Represent, estimate, compare','Classmates are preparing a supply table for the week. Use hundreds, tens, and ones for exact counts, but estimate before you group a collection. Explain each choice to a partner.','Teacher setup: students build 163 with base-ten materials and draw the same number.',[
        B('B1.1','Make the pencil count','The supply team counted 163 pencils. Put one hundred flat, six tens rods, and three ones cubes on the mat. The total should match the clipboard.','Build 163.','✏️',163,[1,6,3]),
        E('B1.3','Estimate the loose counters','A classroom tray holds many counters for the lesson. Make a reasonable guess before counting. Reveal the ten-groups and check how close you were.','Estimate the counter collection.','🔵',124,200,20),
        C('B1.2','Compare two supply labels','One cabinet is labelled 157 and another 175. The digits change places, so the amounts are not the same. Compare the tens.','Which label is greater?','🗄️ 157 · 175',['157','175'],'175'),
        O('B1.2','File the notebook totals','Four classes counted 118, 181, 108, and 180 notebooks. The office needs the numbers from least to greatest. Put each card on a landing pad.','Order the totals.','📓 118 · 181 · 108 · 180',['181','118','180','108'],['108','118','180','181']),
        C('B1.1','Read the zero place','A room has 106 linking cubes. One full hundred and six loose cubes are on the table. There are no tens rods.','Which model shows 106?','💯 + 🟨🟨🟨🟨🟨🟨',['1 hundred, 0 tens, 6 ones','1 hundred, 6 tens, 0 ones','0 hundreds, 1 ten, 6 ones'],'1 hundred, 0 tens, 6 ones'),
        B('B1.1','Show a second supply count','The office finds 192 glue sticks in storage. Use the block bank to represent this exact count. Tell a partner how much each digit is worth.','Build 192.','🧴',192,[1,9,2])
      ]),
      D('Pairing lab','Investigate even and odd','A class game uses tickets in pairs. Build small pairs on paper, then use the final digit to reason about bigger totals. A number is even when every item has a partner.','Teacher setup: pair 18 counters and then 19. Record what changed.',[
        C('B1.5','Pair 138 tickets','A teacher has 138 tickets for a partner activity. Tickets will be handed out two at a time. Decide whether any single ticket must remain.','Is 138 even or odd?','🎫 138',['Even','Odd'],'Even'),
        C('B1.5','Pair 145 tickets','Another box holds 145 tickets. If two go to each pair, one ticket will not have a partner. Name the number type.','Is 145 even or odd?','🎫 145',['Even','Odd'],'Odd'),
        B('B1.1','Build the class total','The school collected 194 art cards. Show the count with a hundred flat, tens rods, and ones cubes. Read the result aloud.','Build 194.','🎨',194,[1,9,4]),
        C('B1.2','Compare the rooms','Room A reports 169 counters and Room B reports 196. Both have one hundred. Look at tens before ones.','Which room has more counters?','🚪 169 · 196',['169','196'],'196'),
        O('B1.2','Sort the board-game counts','The game shelf has boxes numbered 121, 112, 120, and 122. The librarian wants the labels in order. Compare tens and ones to place them.','Order the four labels from least to greatest.','🎲 121 · 112 · 120 · 122',['121','122','112','120'],['112','120','121','122']),
        C('B1.5','Explain an odd total','A student claims 173 is even because it is larger than 100. Even and odd do not depend on being large. Think about the ones digit.','Which statement is correct?','🔢 173',['173 is odd; pairing leaves one.','173 is even; it has a hundred.'],'173 is odd; pairing leaves one.')
      ]),
      D('Equal-pack challenge','Skip count to 200','The class packs equal sets for a school event. Point to each pack as you skip count. Say the pattern aloud, then set your answer.','Teacher setup: use paper packs labelled 20, 25, and 50; combine packs to show 200 in several ways.',[
        S('B1.4','Twenty per pack','The first packing line counts 40, 60, and 80 items. Each new pack adds 20. One more pack reaches the table.','What total comes next?','📦 40 → 60 → 80 → ?',0,200,20,100),
        S('B1.4','Twenty-five per pack','The next line counts 75, 100, and 125 items. Every pack has 25. Continue one jump.','What total comes next?','📦 75 → 100 → 125 → ?',0,200,25,150),
        S('B1.4','Fifty per pack','A large box holds 50 sheets. Three boxes hold 150 sheets. A fourth identical box arrives.','What is the new total?','📦 50 → 100 → 150 → ?',0,200,50,200),
        S('B1.4','Another twenty','A counting line reads 120, 140, and 160. The group keeps adding 20. Move to the next total.','What number follows 160?','🔢 120 → 140 → 160 → ?',0,200,20,180),
        S('B1.4','Another twenty-five','A class counts 100, 125, and 150 paper badges. Another equal pack of 25 is added. Count one more jump.','How many badges now?','🏷️ 100 → 125 → 150 → ?',0,200,25,175),
        C('B1.4','Reach 200 a new way','Four full packs hold 50 items each. The same total could also be made with packs of 25. Count how many 25-packs reach 200.','How many packs of 25 make 200?','🎟️ 25 + 25 + ... = 200',['4 packs','6 packs','8 packs'],'8 packs')
      ]),
      D('Classroom share studio','Whole and mixed shares','Use the student-face mats to share whole paper food models evenly. When leftovers can be cut, tap to see equal pieces and name each person’s amount. Talk about why each part must be the same size.','Teacher setup: students sketch each share problem with circles and equal cuts after using the screen.',[
        P('B1.6','Ten flatbreads, six','Six students share ten equal-sized flatbreads. Give one whole to each student first. Cut the four remaining breads into sixths and share the pieces fairly.','How much does each student receive?','🫓',10,6,['1 2/3 each','1 1/3 each','2 each'],'1 2/3 each','fraction','🫓'),
        P('B1.6','Five wraps, two','Two students share five wraps for lunch. They take two whole wraps each. Split the last wrap into two equal parts.','How much does each student receive?','🌯',5,2,['2 1/2 each','2 1/3 each','3 each'],'2 1/2 each','fraction','🌯'),
        P('B1.6','Nine buns, three','Three students share nine identical buns. Move one bun to each plate in turn until the bank is empty. Nobody should need a cut piece.','How many buns does each student get?','🥯',9,3,['3 each','2 1/3 each','4 each'],'3 each','fraction','🥯'),
        F('B1.7','Match thirds and sixths','The same-sized paper strip is divided in two different ways. One third covers the same distance as two sixths. Shade both to prove it on the screen.','Shade 1/3 and 2/6.','📏',[1,3],[2,6]),
        P('B1.6','Seven rolls, four','Four students share seven identical rolls. Give out one whole roll each. The three remaining rolls are cut into four equal pieces per roll.','How much does each student get?','🥖',7,4,['1 3/4 each','1 1/4 each','2 each'],'1 3/4 each','fraction','🥖'),
        C('B1.7','Name the equal fraction','One piece out of three equal strip parts is coloured. The same-sized strip is divided into six equal parts instead. Choose the coloured amount that matches.','Which fraction equals 1/3?','🎨 1/3 = ?/6',['1/6','2/6','3/6'],'2/6')
      ]),
      D('Community market review','Estimate, order, and share','The market team must use numbers for real planning. Estimate a collection, compare labels, and decide how food can be shared fairly. Explain which model helped you each time.','Teacher setup: groups create a mini market label using a number from 100 to 200 and show it with blocks.',[
        E('B1.3','Estimate the seed tray','A market tray contains many seed counters. Make a guess before you count them. Reveal ten-groups, then compare your estimate with the count.','Estimate, then verify.','🫘',177,200,20),
        O('B1.2','Order the stall numbers','The market stalls are numbered 106, 160, 116, and 161. The student guide lists them from least to greatest. Put the cards in order.','Order the labels.','🏬 106 · 160 · 116 · 161',['161','116','160','106'],['106','116','160','161']),
        C('B1.5','Pair 186 bags','Volunteers pair 186 small bags for delivery. An even total can be arranged into pairs with no bag left. Use the final digit to decide.','Is 186 even or odd?','🛍️ 186',['Even','Odd'],'Even'),
        B('B1.1','Build the market count','A receipt records 175 apples. Model that count with base-ten materials. Tell a partner the value of the 7.','Build 175.','🍎',175,[1,7,5]),
        P('B1.6','Eight paper pies, six','Six groups share eight identical paper pies for an art display. Give each group a whole pie, then split the two extras into equal sixths.','How many pies does each group receive?','🥧',8,6,['1 1/3 each','1 2/3 each','2 each'],'1 1/3 each','fraction','🥧'),
        FC('B1.7','Which piece is larger?','Two equal-sized strips are cut into thirds and sixths. A single third is longer than a single sixth. Look at the diagrams before choosing.','Which single piece is larger?','📏',[1,3],[1,6],['1/3','1/6'],'1/3')
      ])
    ]},
    Inspire:{grade:3,icon:'🚀',range:1000,expectations:{
      'B1.1':'Read, represent, compose, and decompose whole numbers up to and including 1000, using a variety of tools and strategies, and describe ways they are used in everyday life.',
      'B1.2':'Compare and order whole numbers up to and including 1000, in various contexts.',
      'B1.3':'Round whole numbers to the nearest ten or hundred, in various contexts.',
      'B1.4':'Count to 1000, including by 50s, 100s, and 200s, using a variety of tools and strategies.',
      'B1.5':'Use place value when describing and representing multi-digit numbers in various ways, including with base-ten materials.',
      'B1.6':'Use drawings to represent, solve, and compare fair-share problems involving up to 20 items shared among 2, 3, 4, 5, 6, 8, and 10 sharers, including whole-number, mixed-number, and fractional amounts.',
      'B1.7':'Represent and solve fair-share problems involving equivalent fractions, including halves/fourths/eighths, thirds/sixths, and fifths/tenths.'
    },
    home:[
      D('Museum inventory','Hundreds, tens, and ones','The school museum is counting objects for an exhibit. A number can be shown with words, base-ten materials, and expanded parts. Build a model and say the value of each digit.','Draw 638 as six hundreds, three tens, and eight ones. Write 600 + 30 + 8.',[
        B('B1.1 · B1.5','Build the ticket count','The museum printed 638 tickets. Each flat shows one hundred, each rod ten, and each cube one. Make a model a volunteer can check.','Build 638.','🎟️',638,[6,3,8]),
        C('B1.5','Read the zero','A shelf count is 704. The zero means no tens rods are needed. Think about the hundreds and ones that remain.','Which model shows 704?','🏛️ 704',['7 hundreds, 0 tens, 4 ones','7 hundreds, 4 tens, 0 ones','4 hundreds, 0 tens, 7 ones'],'7 hundreds, 0 tens, 4 ones'),
        B('B1.1 · B1.5','Make the display number','The school museum counted 905 small shells. Nine flats and five cubes show that count. Use the bank to build it exactly.','Build 905.','🐚',905,[9,0,5]),
        O('B1.2','Order the exhibit labels','Four exhibit boxes hold 590, 509, 905, and 950 objects. The boxes will be shelved from smallest count to largest. Compare hundreds first, then tens.','Order the four counts.','📦 590 · 509 · 905 · 950',['905','590','950','509'],['509','590','905','950'])
      ]),
      D('Harbour number routes','Count to 1000 in large jumps','A harbour map uses numbered markers for long routes. The distance between every pair of markers is the same. Find the step size before moving the slider.','Draw three number lines from 0 to 1000: one by 50s, one by 100s, one by 200s.',[
        S('B1.4','Fifty more','A harbour route marker reads 750, then 800, then 850. The labels grow by 50 each time. One more marker is needed.','What label comes next?','🚤 750 → 800 → 850 → ?',0,1000,50,900),
        S('B1.4','Hundreds on a route','The water-taxi log shows markers 100, 200, and 300. The same jump continues. Find the next marker.','What label comes next?','🗺️ 100 → 200 → 300 → ?',0,1000,100,400),
        S('B1.4','Two hundreds at a time','Large route signs read 200, 400, and 600. The next sign adds another 200. Stay within 1000.','What number follows 600?','🛥️ 200 → 400 → 600 → ?',0,1000,200,800),
        C('B1.2','Compare the dock counts','Two harbour reports list 702 and 720 passengers for different days. Both have seven hundreds, so compare the tens.','Which number is greater?','📋 702 · 720',['702','720'],'720')
      ]),
      D('Plan with rounded numbers','Nearest ten or hundred','Exact counts matter for records, but rounded numbers can help a group plan quickly. Use the number line to see which ten or hundred is closest. If a number is halfway, round up.','Draw 347 between 340 and 350. Then draw 642 between 600 and 700.',[
        R('B1.3','About how many leaflets?','A club printed 347 leaflets. To plan a delivery, the group wants the nearest ten. Look at where 347 sits between 340 and 350.','Round 347 to the nearest ten.','📄',347,10,350),
        R('B1.3','About how many visitors?','A museum counted 642 visitors this month. The next report uses the nearest hundred. Compare 642 with 600 and 700.','Round 642 to the nearest hundred.','🏛️',642,100,600),
        R('B1.3','A bike-fair count','The bike fair counted 785 visits. A quick announcement uses the nearest ten. Find the closer ten on the line.','Round 785 to the nearest ten.','🚲',785,10,790),
        R('B1.3','Halfway to a hundred','A school collected 950 cards. That count is halfway between 900 and 1000. The nearest-hundred rule sends halfway numbers up.','Round 950 to the nearest hundred.','🃏',950,100,1000)
      ]),
      D('Garden fair shares','Mixed numbers from equal cuts','The garden club shares equal-sized paper strips for planting plans. Share whole strips fairly first. If strips remain, cut every leftover into equal pieces for all groups.','Sketch 17 strips shared by 5 groups. Label the whole strips and the equal fifths.',[
        P('B1.6','Seventeen strips, five groups','Five garden teams share 17 equal paper strips. Each team can get three whole strips. Cut the two leftovers into fifths and distribute the pieces equally.','How many strips does each team get?','📏',17,5,['3 2/5 each','3 1/5 each','4 each'],'3 2/5 each','fraction','📏'),
        P('B1.6','Fifteen strips, six groups','Six garden teams share 15 equal paper strips. Give two whole strips to each team. Cut the remaining three strips into sixths.','How much does each team receive?','📏',15,6,['2 1/2 each','2 1/3 each','3 each'],'2 1/2 each','fraction','📏'),
        P('B1.6','Twenty wraps, eight students','Eight students share 20 identical wraps for lunch. Each gets two whole wraps before the remaining four are cut. Share the cut halves fairly.','How much does each student receive?','🌯',20,8,['2 1/2 each','2 1/4 each','3 each'],'2 1/2 each','fraction','🌯'),
        P('B1.6','Eighteen strips, ten groups','Ten art teams share 18 equal paper strips. First give each team one whole strip. Cut the eight remaining strips into tenths and distribute them fairly.','How much does each team receive?','📏',18,10,['1 4/5 each','1 2/5 each','2 each'],'1 4/5 each','fraction','📏')
      ]),
      D('Fraction design studio','Prove equivalent shares','All the fraction strips on a question show the same-sized whole. Tap parts to colour them and compare lengths. Equal coloured lengths can have different fraction names.','Draw one whole divided into 2, 4, and 8 equal parts. Show the same half on all three.',[
        F('B1.7','Halves and fourths','A mural strip is divided into two equal parts. A second same-sized strip is divided into fourths. Shade equal amounts on both.','Shade 1/2 and 2/4.','🎨',[1,2],[2,4]),
        F('B1.7','Halves and eighths','Two identical ribbons are cut in different ways. One half of the first ribbon matches four eighths of the second. Tap the equal lengths.','Shade 1/2 and 4/8.','🎀',[1,2],[4,8]),
        F('B1.7','Thirds and sixths','A paper strip is split into thirds, and another same-sized strip into sixths. One third stretches as far as two sixths. Colour both to prove it.','Shade 1/3 and 2/6.','📏',[1,3],[2,6]),
        F('B1.7','Fifths and tenths','Two same-sized garden strips are split into fifths and tenths. One fifth covers the same length as two tenths. Show the match.','Shade 1/5 and 2/10.','🌱',[1,5],[2,10])
      ])
    ],
    school:[
      D('Place-value investigation','Build and rename to 1000','The class is preparing number cards for a museum display. Use flats, rods, and cubes to build exact totals. Rename groups of ten when a model uses too many of one kind.','Teacher setup: give pairs base-ten materials. Have them build 742 and draw an equivalent regrouped model.',[
        B('B1.1 · B1.5','Make 742','The museum ticket desk counted 742 visitors. Build seven hundreds, four tens, and two ones. Say the value of each digit as you work.','Build 742.','🎟️',742,[7,4,2]),
        C('B1.5','Rename fourteen tens','A student builds six hundreds, fourteen tens, and three ones. Ten of the rods can become one more hundred flat. Think about the same value in standard form.','What number did the student build?','💯×6 + 🔟×14 + 3',['743','643','713'],'743'),
        C('B1.2','Compare the cabinet counts','Two cabinets hold 806 and 860 specimens. The hundreds match, but the tens do not. Compare the values without reading the digits backward.','Which count is greater?','🗄️ 806 · 860',['806','860'],'860'),
        O('B1.2','Put the labels in order','Four museum drawers are numbered 907, 790, 970, and 709. A student wants the drawers from lowest number to highest. Move the cards to the landing pads.','Order least to greatest.','🏛️ 907 · 790 · 970 · 709',['970','709','907','790'],['709','790','907','970']),
        B('B1.1 · B1.5','Build the missing-zero count','A second desk counted 604 visitors. There are six hundreds, no tens, and four ones. Show that with the block bank.','Build 604.','📋',604,[6,0,4]),
        C('B1.5','Explain the value of six','In 604, the digit 6 sits in the hundreds place. Its place tells us the value, not just the digit itself. Choose the correct meaning.','What does the 6 represent?','🔢 604',['6 ones','6 tens','6 hundreds'],'6 hundreds')
      ]),
      D('Long count paths','Count by 50, 100, and 200','School teams draw number paths to 1000. Each path uses one equal step size. Use the slider to test the next number, then tell a partner why it fits.','Teacher setup: groups make a floor number line from 0 to 1000 and move by 50s, 100s, and 200s.',[
        S('B1.4','Fifty-step route','The route cards show 650, 700, and 750. Each jump adds 50. Find the next card.','What comes after 750?','🛣️ 650 → 700 → 750 → ?',0,1000,50,800),
        S('B1.4','Another fifty','A second group starts at 800 and counts 850, then 900. The step is still 50. Continue the pattern.','What comes after 900?','👟 800 → 850 → 900 → ?',0,1000,50,950),
        S('B1.4','Hundred-step route','Number cards show 600, 700, and 800. The same jump happens each time. Slide to the next label.','What comes after 800?','🗺️ 600 → 700 → 800 → ?',0,1000,100,900),
        S('B1.4','Two-hundred-step route','Markers read 200, 400, 600, and 800. One more jump of 200 reaches the end of the line.','What comes next?','🛤️ 200 → 400 → 600 → 800 → ?',0,1000,200,1000),
        C('B1.4','How many fifty-jumps?','A class jumps from 800 to 1000 by fifties. Point to each landing number: 850, 900, 950, and 1000. Count the jumps, not the starting mark.','How many jumps are needed?','👟 800 → 1000',['2 jumps','4 jumps','5 jumps'],'4 jumps'),
        B('B1.1 · B1.5','Model the endpoint','The floor path ends at 1000. Ten hundred flats make that total. Use the block bank to show the endpoint.','Build 1000.','💯',1000,[10,0,0])
      ]),
      D('Rounding workshop','Use two different scales','Students use number lines to choose a nearby ten or hundred. Always check the scale first. A halfway number rounds up, while a number below halfway rounds down.','Teacher setup: draw large floor lines 460–470 and 700–800. Ask students to stand at 468 and 749.',[
        R('B1.3','Round a paper order','The office ordered 468 sheets. A quick count uses the nearest ten. Decide which end of the number line is closer.','Round 468 to the nearest ten.','📄',468,10,470),
        R('B1.3','Round a visitor count','A school event welcomed 749 visitors. The planning board uses the nearest hundred. The number is just below the halfway mark.','Round 749 to the nearest hundred.','🏫',749,100,700),
        R('B1.3','Almost one thousand','A collection has 995 tokens. The teacher wants the nearest ten, not the nearest hundred. Look at its distance from 990 and 1000.','Round 995 to the nearest ten.','🟡',995,10,1000),
        R('B1.3','A halfway hundred','The library counted 350 books on two shelves. That is exactly halfway between 300 and 400. Apply the halfway-up rule.','Round 350 to the nearest hundred.','📚',350,100,400),
        R('B1.3','Near the lower ten','The garden club planted 432 bulbs. For a quick report, it uses the nearest ten. See whether 432 is closer to 430 or 440.','Round 432 to the nearest ten.','🌷',432,10,430),
        C('B1.3','Choose the useful estimate','The school packed 876 lunch kits. A bus planner wants a quick nearest-hundred estimate. Use the rounding rule before choosing.','About how many kits is that?','🍱 876',['800','900','1000'],'900')
      ]),
      D('Share with a model','Fair shares for several group sizes','Identical paper strips can be cut, so every group can receive an equal length. Share whole strips first, then draw equal cuts for the leftovers. Use the face mats to check that no group gets more than another.','Teacher setup: have groups sketch 19 strips among 4 and 13 strips among 3, including the fractional pieces.',[
        P('B1.6','Nineteen strips, four','Four art teams share 19 identical paper strips. Each team gets four whole strips. Cut the three extras into fourths.','How much does each team get?','📏',19,4,['4 3/4 each','4 1/4 each','5 each'],'4 3/4 each','fraction','📏'),
        P('B1.6','Thirteen strips, three','Three garden teams share 13 identical paper strips. Give four whole strips to each team. Cut the last strip into thirds.','How much does each team get?','📏',13,3,['4 1/3 each','4 2/3 each','5 each'],'4 1/3 each','fraction','📏'),
        P('B1.6','Nine ribbons, two','Two students share nine identical ribbons. Give four whole ribbons to each student. Split the last one in half.','What is each student’s share?','🎀',9,2,['4 1/2 each','4 1/4 each','5 each'],'4 1/2 each','fraction','🎀'),
        P('B1.6','Twenty strips, five','Five groups share 20 equal paper strips. Place the strips on the mats in equal whole groups. There are no leftovers to cut.','How much does each group get?','📏',20,5,['4 each','3 1/5 each','5 each'],'4 each','fraction','📏'),
        P('B1.6','Sixteen wraps, eight','Eight students share 16 identical wraps. Move two wraps to each plate. Check that every plate has the same amount.','How much does each student get?','🌯',16,8,['2 each','1 1/2 each','4 each'],'2 each','fraction','🌯'),
        P('B1.6','Eighteen strips, ten','Ten project teams share 18 equal paper strips. Each team receives one whole strip. Cut the eight extras into tenths and distribute them.','How much does each team get?','📏',18,10,['1 4/5 each','1 2/5 each','2 each'],'1 4/5 each','fraction','📏')
      ]),
      D('Equivalent-share gallery','Prove equal fractions','The class will display fraction strips made from equal-sized wholes. Colour the named number of pieces and check whether the coloured lengths match. Then describe how many smaller pieces cover one larger piece.','Teacher setup: students make paper strips for halves, fourths, eighths, thirds, sixths, fifths, and tenths.',[
        F('B1.7','Half and two fourths','One paper strip is split in half and another equal strip into fourths. Colour the same amount on both. Use the equal whole to justify the match.','Shade 1/2 and 2/4.','🎨',[1,2],[2,4]),
        F('B1.7','Half and four eighths','A new strip is cut into eighths. Four of those small parts cover the same length as one half of an equal strip. Tap the parts to show it.','Shade 1/2 and 4/8.','📏',[1,2],[4,8]),
        F('B1.7','Third and two sixths','One group colours one of three parts. Another group colours two of six parts of an equal strip. Compare the coloured lengths.','Shade 1/3 and 2/6.','🎨',[1,3],[2,6]),
        F('B1.7','Fifth and two tenths','Two equal strips are divided into fifths and tenths. One fifth is the same length as two tenths. Make both diagrams show it.','Shade 1/5 and 2/10.','📏',[1,5],[2,10]),
        C('B1.7','Rename one half','A student has shaded four of eight equal parts. The same coloured length can be named with a larger part size. Choose the equal fraction.','What is 4/8 equal to?','🎨 4/8 = ?',['1/2','1/4','1/8'],'1/2'),
        C('B1.7','Rename one fifth','A garden strip is split into ten equal sections. Two are coloured. Think of the same length on a strip split into fifths.','What is 2/10 equal to?','🌱 2/10 = ?',['1/5','1/2','2/5'],'1/5')
      ])
    ]}
  };
  const schoolExtras={
    Pathway:[
      {warmup:'Put 10 counters on a mat. Add one more group of 10 and tell a partner how many you see without counting every counter.',missions:[
        C('B1.3','Which tray goes first?','The art room has trays labelled 18 and 28. A student wants to put the smaller tray count first on a shelf. Compare the tens before deciding.','Which tray count is smaller?','🎨 18 · 28',['18','28'],'18'),
        S('B1.5','Count paintbrush bundles','Each cup holds 10 paintbrushes. The class has filled cups for 10, 20, and 30 brushes. One more full cup is added.','How many paintbrushes now?','🖌️ 10 → 20 → 30 → ?',0,50,10,40),
        B('B1.2','Build a new tray label','A table helper counts 41 linking cubes. Four full rods and one little cube show the count. Build it so another student can check.','Show 41 with base-ten blocks.','🟦',41,[0,4,1]),
        E('B1.4','Check the bead bowl','A student pours beads into one bowl for a class craft. Look first and make a close guess. Then reveal the groups of ten to count them.','Estimate and verify the beads.','🟣',33,50,6)
      ]},
      {warmup:'Make 20 with two rods. Trade one rod for ten single cubes, then tell a partner why the total is still 20.',missions:[
        H('B1.1','Find the new shelf number','A librarian adds a basket with the label 38. The label tells the class where to return the basket. Find that number on the chart.','Tap 38 on the chart.',38),
        B('B1.2','Build the sticker count','The reading club has 45 book stickers. Four tens and five ones make the total. Tap the blocks to build it.','Show 45.','⭐',45,[0,4,5]),
        C('B1.2','What makes thirty?','A box already has two full groups of ten bookmarks. The librarian wants 30 in all. Think about the missing group before choosing.','How many more bookmarks are needed?','📚 20 + ? = 30',['5','10','20'],'10'),
        S('B1.5','One label before','Shelf labels go in order: 34, 35, and 36. A student needs the number just before 34. Move the slider one step back.','Which label comes before 34?','📚 ? → 34 → 35 → 36',0,50,1,33)
      ]},
      {warmup:'Tap or say 2, 4, 6, 8, 10. Make five pairs of counters and connect each count to a pair.',missions:[
        S('B1.5','Two shoes at a time','Students place a pair of shoes on each shelf. The running shoe counts are 12, 14, and 16. Add one more pair.','How many shoes are on the shelves now?','👟 12 → 14 → 16 → ?',0,50,2,18),
        S('B1.5','Five seeds per cup','A gardener puts five seeds in each paper cup. Four cups hold 5, 10, 15, and 20 seeds in total. Add one more cup.','How many seeds after the fifth cup?','🌱 5 → 10 → 15 → 20 → ?',0,50,5,25),
        O('B1.3','Order the route signs','The bike route has signs numbered 19, 29, 39, and 49. A rider passes them from smallest to largest. Put the signs in route order.','Place the smallest sign first.','🚲 19 · 29 · 39 · 49',['49','19','39','29'],['19','29','39','49']),
        H('B1.1','Find the last route sign','A student sees a sign marked 49 near the finish. The number tells the group where to stop. Find it on the chart.','Tap 49.',49)
      ]},
      {warmup:'Give one counter to each of two students, then one more to each. Show that fair shares have the same count.',missions:[
        P('B1.6','Eight stars for two','Two students share eight star stickers for a poster. Move the whole stickers to the face mats, taking turns. Check that neither student has more.','How many whole stickers does each student get?','⭐',8,2,['4 each, 0 left','3 each, 2 left','5 each, 0 left'],'4 each, 0 left','leftover','⭐'),
        P('B1.6','Six shells for four','Four students share six whole shells for a class display. Give one shell to each student first. Leave the shells that cannot be shared equally in the bank.','How many shells does each get, and how many are left?','🐚',6,4,['1 each, 2 left','2 each, 1 left','1 each, 1 left'],'1 each, 2 left','leftover','🐚'),
        F('B1.7','Show the same half again','A student colours half a paper flag. Another colours two fourths of an equal flag. Tap the parts to show that the coloured areas match.','Shade 1/2 and 2/4.','🚩',[1,2],[2,4]),
        FC('B1.8','One share for each group','Two equal paper ribbons are divided among two students and four students. Each person gets one piece. Look at the pieces, not just the numbers.','Which person receives a larger single piece?','🎀',[1,2],[1,4],['1/2','1/4'],'1/2')
      ]},
      {warmup:'Fold one paper strip into two parts and another equal strip into four. Colour one part in each and compare their sizes.',missions:[
        FC('B1.8','Three or six artists?','The same-sized art paper is shared among three artists in one group and six in another. Each artist receives one equal part. Compare the size of a single part.','Which single part is larger?','🎨',[1,3],[1,6],['1/3','1/6'],'1/3'),
        O('B1.8','Arrange paper pieces','Three equal strips are shared among 2, 5, and 10 students. One student from each group holds one piece. Put those pieces in order from largest to smallest.','Place the largest unit fraction first.','📏 1/2 · 1/5 · 1/10',['1/10','1/2','1/5'],['1/2','1/5','1/10']),
        C('B1.7','A half in fourths','One of two equal parts of a flag is coloured. A second flag of the same size is divided into fourths. Think about how many fourths cover the same area.','How many fourths match one half?','🚩 1/2 = ?/4',['1 fourth','2 fourths','4 fourths'],'2 fourths'),
        B('B1.2','Count the gallery cards','A class wants to hang 48 paper cards on the gallery wall. Four tens and eight ones make the total. Build the count before the display begins.','Build 48.','🖼️',48,[0,4,8])
      ]}
    ],
    Excite:[
      {warmup:'Make 100 with one flat. Add three rods and count the total by tens before adding single cubes.',missions:[
        C('B1.1','Rename a supply count','A box contains one hundred counters and seven groups of ten. A student can also say the total without naming the blocks. Think about the value of each group.','What number is in the box?','💯 + 🔟×7',['107','170','710'],'170'),
        B('B1.1','Build the art order','The school orders 138 paper sheets. One hundred, three tens, and eight ones make the exact total. Build the model for the order form.','Show 138.','📄',138,[1,3,8]),
        E('B1.3','Estimate the tile tray','A teacher tips pattern tiles onto one large mat. Look without counting and make a close estimate. Reveal groups of ten to check the count.','Estimate and verify the tiles.','🔷',97,200,15),
        C('B1.2','Choose the closer shelf','A helper needs supply cabinet 129. The hallway has cabinets 119 and 129 side by side. Read each label carefully before choosing.','Which cabinet matches the order form?','🗄️ 119 · 129',['119','129'],'129')
      ]},
      {warmup:'Pair 12 counters, then 13. Explain why one set has no leftover and the other has one.',missions:[
        C('B1.5','Pair the reading cards','The reading club printed 174 cards for two-person games. Students want to pair every card with another. Use the ones digit and a drawing of pairs to decide.','Is 174 even or odd?','🃏 174',['Even','Odd'],'Even'),
        C('B1.5','What about 187?','Another class printed 187 game cards. If students put them in pairs, one card remains. Use that clue to name the count.','Is 187 even or odd?','🃏 187',['Even','Odd'],'Odd'),
        B('B1.1','Show the total another way','The school has 108 pencils in storage. That is one full hundred, no full tens, and eight loose pencils. Build the model to show the zero place.','Build 108.','✏️',108,[1,0,8]),
        P('B1.6','Six paper circles for three','Three students share six identical paper circles for an art project. Move the circles to the face mats one at a time. Check that each student gets the same whole number.','How many circles does each student get?','🟠',6,3,['2 each','1 each','3 each'],'2 each','fraction','🟠')
      ]},
      {warmup:'Point to the 25, 50, 75, and 100 marks on a paper number path. Add one more step and explain why it is 125.',missions:[
        S('B1.4','A fifth twenty-pack','A student lays out four packs of 20 markers and counts 20, 40, 60, 80. One more identical pack arrives. Move to the next total.','How many markers now?','🖍️ 20 → 40 → 60 → 80 → ?',0,200,20,100),
        S('B1.4','Count more badges','School badges come in sets of 25. A helper says 125, 150, and 175 while adding packs. One more pack completes the line.','What total comes next?','🏷️ 125 → 150 → 175 → ?',0,200,25,200),
        B('B1.1','Model the final pack count','The fundraiser reaches 180 tickets. That is one hundred and eight tens. Use flats and rods to show the exact amount.','Build 180.','🎟️',180,[1,8,0]),
        C('B1.2','Which box has more?','Two packing teams counted 150 and 105 cards. Both have one hundred, but only one has five tens. Compare the totals before sending a box.','Which team packed more cards?','📦 150 · 105',['150','105'],'150')
      ]},
      {warmup:'Fold a strip into three equal parts. Fold an equal strip into six parts. Colour one third and two sixths to compare.',missions:[
        P('B1.6','Four apples, six friends','Six students share four identical paper apples for a pretend picnic. Nobody can receive a whole apple, so each apple is divided into six equal parts. Each student gets one small piece from each apple.','How much of an apple does each student receive?','🍎',4,6,['2/3 each','1/3 each','1 whole each'],'2/3 each','fraction','🍎'),
        P('B1.6','Ten rolls, four students','Four students share ten identical paper rolls. Each gets two whole rolls, and the two extra rolls are cut into fourths. Name the full share.','How much does each student get?','🥖',10,4,['2 1/2 each','2 1/4 each','3 each'],'2 1/2 each','fraction','🥖'),
        F('B1.7','Two matching strip names','A class colours one part of a strip divided into three. Another equal strip has six parts. Colour two of those sixths to match the first strip.','Shade 1/3 and 2/6.','📏',[1,3],[2,6]),
        C('B1.7','Which two pieces match?','A student folds a strip into thirds, while another folds an equal strip into sixths. They want to cover the same length as one third. Count the smaller pieces needed.','How many sixths equal one third?','🎨 1/3 = ?/6',['1 sixth','2 sixths','3 sixths'],'2 sixths')
      ]},
      {warmup:'Make 150 with blocks and say whether the number is even. Explain how you know without pairing all 150 objects.',missions:[
        O('B1.2','Line up the garden labels','The school garden beds are numbered 120, 102, 200, and 112. A visitor reads them from smallest to largest. Place the number cards in that order.','Order the bed labels.','🌱 120 · 102 · 200 · 112',['200','112','102','120'],['102','112','120','200']),
        C('B1.5','Pair the last labels','The office printed 197 plant labels. They will be bundled in pairs for a class game. One label will remain without a partner.','Is 197 even or odd?','🏷️ 197',['Even','Odd'],'Odd'),
        P('B1.6','Nine art strips for four','Four students share nine identical art strips. Each gets two whole strips. Cut the leftover strip into four equal parts to finish the fair share.','How much does each student receive?','📏',9,4,['2 1/4 each','2 1/2 each','3 each'],'2 1/4 each','fraction','📏'),
        E('B1.3','Estimate the seed jar','Students pour a jar of bean counters onto a mat. First make a reasonable guess, then reveal ten-groups to count the beans. Compare the result with your estimate.','Estimate and verify the beans.','🫘',142,200,20)
      ]}
    ],
    Inspire:[
      {warmup:'Build 500 with five hundred flats. Exchange one flat for ten rods and explain why the number did not change.',missions:[
        B('B1.1 · B1.5','Build the final inventory','The museum counted 984 exhibit cards. Nine hundreds, eight tens, and four ones show the count. Build the model for the inventory sheet.','Show 984.','🏛️',984,[9,8,4]),
        C('B1.5','Rename a busy model','A student uses eight hundreds, thirteen tens, and five ones to count tiles. Ten tens can become a hundred. Read the total after the trade.','What number does the model show?','💯×8 + 🔟×13 + 5',['935','835','8135'],'935'),
        R('B1.3','Plan with a rounded count','A school counted 853 visitors to its display. For a quick announcement, the group wants the nearest hundred. Place 853 between 800 and 900.','What is 853 to the nearest hundred?','🏫',853,100,900),
        O('B1.2','Order the exhibit stations','Four station labels read 1000, 901, 990, and 909. A visitor follows them from smallest label to largest. Compare the hundreds and tens carefully.','Put the station labels in order.','🏛️ 1000 · 901 · 990 · 909',['990','901','1000','909'],['901','909','990','1000'])
      ]},
      {warmup:'Make four jumps of 200 from 0. Say and write every landing number, then predict the fifth landing.',missions:[
        S('B1.4','The last fifty-step','A route on the harbour map is marked 800, 850, and 900. The distance between marks is always 50. Add the next mark.','What number comes after 900?','🗺️ 800 → 850 → 900 → ?',0,1000,50,950),
        C('B1.4','How many large jumps?','The class moves from 0 to 1000 in jumps of 200. Point to 200, 400, 600, 800, and 1000 on the path. Count the jumps, not the starting point.','How many 200-jumps reach 1000?','👟 0 → 1000',['4 jumps','5 jumps','6 jumps'],'5 jumps'),
        B('B1.1 · B1.5','Build a route marker','A ferry route marker is labelled 850. Eight hundreds and five tens make its value. Build the marker using blocks.','Show 850.','🚤',850,[8,5,0]),
        R('B1.3','A nearby stop number','The ferry log shows 949 passengers over a week. A quick count uses the nearest ten. Check whether 949 is closer to 940 or 950.','Round 949 to the nearest ten.','📋',949,10,950)
      ]},
      {warmup:'Mark 745 on a line from 700 to 800. Then mark it between 740 and 750. Discuss why the rounding answers differ.',missions:[
        R('B1.3','A garden estimate','The school garden ordered 561 seed labels. The teacher wants the nearest hundred for planning. Locate 561 between 500 and 600.','Round 561 to the nearest hundred.','🌱',561,100,600),
        R('B1.3','A class photo count','A class counted 724 photo prints. A quick order form uses the nearest ten. See whether 724 is nearer 720 or 730.','Round 724 to the nearest ten.','📷',724,10,720),
        O('B1.2','Check the order forms','Four forms list 490, 509, 590, and 905 items. The office files forms by exact count, not rounded count. Place the exact counts in order.','Order least to greatest.','📋 490 · 509 · 590 · 905',['905','490','590','509'],['490','509','590','905']),
        B('B1.1 · B1.5','Show the exact count','After estimating, the office finds exactly 680 labels. Six hundreds and eight tens show that count with no single labels left. Build the exact model.','Show 680.','🏷️',680,[6,8,0])
      ]},
      {warmup:'Draw 10 equal paper strips for five groups. Give each group one, then share the remaining strips fairly.',missions:[
        P('B1.6','Eleven strips, six teams','Six design teams share eleven identical paper strips. Give one whole strip to each team. Cut the remaining five strips into sixths and distribute the equal pieces.','How much does each team get?','📏',11,6,['1 5/6 each','1 1/6 each','2 each'],'1 5/6 each','fraction','📏'),
        P('B1.6','Fourteen ribbons, eight','Eight students share fourteen identical ribbons for an art project. Each gets one whole ribbon. Cut the other six into eighths and share the pieces.','What is each student’s full share?','🎀',14,8,['1 3/4 each','1 1/4 each','2 each'],'1 3/4 each','fraction','🎀'),
        F('B1.7','Two fourths and four eighths','Two same-sized paper strips are divided into fourths and eighths. Colour two fourths on one and four eighths on the other. Compare the shaded lengths.','Shade 2/4 and 4/8.','🎨',[2,4],[4,8]),
        C('B1.7','Rename a shared half','A student receives three sixths of a paper strip. Another student describes the same length with halves. Both strips are the same size.','Which fraction is equal to 3/6?','📏 3/6 = ?',['1/2','1/3','2/3'],'1/2')
      ]},
      {warmup:'Draw equal strips divided into fifths and tenths. Show why two fifths cover the same length as four tenths.',missions:[
        F('B1.7','Two fifths and four tenths','Two equal garden strips are divided into fifths and tenths. Colour two pieces on the first and four on the second. Use the matching lengths to justify your answer.','Shade 2/5 and 4/10.','🌱',[2,5],[4,10]),
        C('B1.7','Equivalent shade for a mural','A student colours six eighths of a strip. Another uses fourths on an equal strip. Count how many fourths cover the same length.','Which fraction equals 6/8?','🎨 6/8 = ?',['2/4','3/4','4/4'],'3/4'),
        P('B1.6','Nineteen labels, five','Five teams share nineteen identical paper labels for a display. Each gets three whole labels. Cut the four extras into fifths and share them fairly.','How much does each team get?','🏷️',19,5,['3 4/5 each','3 1/5 each','4 each'],'3 4/5 each','fraction','🏷️'),
        B('B1.1 · B1.5','Build the gallery total','The final gallery count is 1000 cards. Ten hundred flats represent the full number. Build it and explain why no tens or ones are needed.','Show 1000.','🖼️',1000,[10,0,0])
      ]}
    ]
  };
  for(const [name,days] of Object.entries(schoolExtras))days.forEach((extra,index)=>{window.STARLIGHT_DATA[name].school[index].warmup=extra.warmup;window.STARLIGHT_DATA[name].school[index].missions.push(...extra.missions);});
  for(const course of Object.values(window.STARLIGHT_DATA))course.weeks={1:{home:course.home,school:course.school},2:{home:[],school:[]}};
  function W2Day(title,focus,intro,handsOn,warmup,home,school){return {home:D(title,focus,intro,handsOn,home),school:{...D(title,focus,intro,handsOn,school),warmup}};}
  const pathwayW2=[
    W2Day('Neighbourhood post office','Read, estimate, and build to 50','Students help sort number labels for a pretend neighbourhood post office. A number tells them how many postcards or stamps are in a tray. Look at a collection before you count it.','Draw 39 postcards in tens and ones. Explain your drawing to a partner.','Make two groups of ten counters. Add seven loose counters and say the total without starting again at one.',[
      H('B1.1','Find postcard tray 27','The class put 27 postcards in one tray. Its number label helps students return the tray to the right place. Look across the tens row to find it.','Tap 27 on the chart.',27),
      E('B1.4','Estimate the stamps','A student tips a small stamp collection onto a counting mat. Make a close guess before counting every stamp. Reveal the groups of ten to check your estimate.','Estimate, then count the stamps.','✉️',34,50,6),
      C('B1.3','Choose the larger delivery','One student carries 24 postcards and another carries 42. Compare the tens in both counts. The larger delivery needs a bigger tray.','Which count is larger?','✉️ 24 · 42',['24','42'],'42'),
      B('B1.2','Build the stamp order','The class needs 39 stamps for a display. A rod shows ten and a cube shows one. Build a model another student can check.','Show 39 with tens and ones.','📮',39,[0,3,9])
    ],[
      H('B1.1','Find tray eleven','A small tray holds 11 cards for the post office game. Its label has one ten and one one. Find it on the number chart.','Tap 11.',11),
      E('B1.4','Guess the postcard pile','A volunteer spreads postcards across a mat. Look at the whole collection before counting. Reveal tens to see how close your guess was.','Estimate and verify the postcards.','📬',26,50,5),
      B('B1.2','Build 44 stamps','A teacher counts 44 pretend stamps for sorting. Four rods and four cubes can show that count. Use the block bank to make it.','Build 44.','✉️',44,[0,4,4]),
      C('B1.3','Compare two trays','Two trays are labelled 37 and 43. A helper must carry the fuller tray first. Compare tens before you choose.','Which tray holds more?','📬 37 · 43',['37','43'],'43'),
      O('B1.3','Put delivery cards in order','The delivery cards read 12, 21, 32, and 41. The class walks the route from the smallest label to the largest. Put the cards in route order.','Order least to greatest.','📮 12 · 21 · 32 · 41',['32','12','41','21'],['12','21','32','41']),
      S('B1.5','Count bicycle wheels','One delivery bicycle has two wheels. As the class adds bicycles, the wheel totals are 2, 4, 6, and 8. Continue by twos for one more bicycle.','How many wheels next?','🚲 2 → 4 → 6 → 8 → ?',0,50,2,10),
      B('B1.2','Fill the fifty-card box','A large box holds exactly 50 postcards. Five full groups of ten fill it. Build that count with rods.','Show 50.','📦',50,[0,5,0]),
      H('B1.1','Find tray forty-eight','A tray near the back is labelled 48. The number helps the next class find it. Look in the forties row of the chart.','Tap 48.',48),
      E('B1.4','Check another stamp bowl','A small bowl contains loose stamp counters. Make a quiet estimate first. Then reveal the tens and ones to count.','Estimate and verify.','✉️',17,50,4),
      C('B1.2','Read the block label','A student makes a tray label with four tens and six ones. The rods and cubes show a number under 50. Read the total carefully.','What number is shown?','🔟🔟🔟🔟 + 6',['46','40','64'],'46')
    ]),
    W2Day('Playground sign makers','Compose, compare, and order','Students make number signs for a playground game. Each sign can be built from tens and ones. Put the signs in a sensible order before the game begins.','Draw 31 as three tens and one one. Make a different drawing that still shows 31.','Use three rods and four cubes to make 34. Tell a partner what each part means.',[
      B('B1.2','Build sign 31','The playground team needs sign 31. Three tens and one single cube show the amount. Build the sign so another student can read it.','Show 31.','🛝',31,[0,3,1]),
      O('B1.3','Line up game signs','Four game signs read 15, 25, 35, and 45. A student puts them from smallest to largest by comparing tens. Fill the four landing pads.','Order the signs.','🛝 15 · 25 · 35 · 45',['45','15','35','25'],['15','25','35','45']),
      E('B1.4','Estimate the game tokens','Students tip their playground game tokens onto a mat. Guess the collection before you count. Reveal the groups of ten to verify your estimate.','Estimate and verify the tokens.','🔵',32,50,5),
      H('B1.1','Find the finish sign','The game ends at sign 49. A number on the sign helps students know where to stop. Find 49 on the chart.','Tap 49.',49)
    ],[
      B('B1.2','Make sign 42','The class needs a sign for 42 steps. Four rods and two cubes show that distance. Build the number with the bank.','Build 42.','👟',42,[0,4,2]),
      O('B1.3','Order four route signs','The route signs are 17, 29, 31, and 40. Students follow them from lowest to highest. Put the cards in that order.','Order least to greatest.','🛝 17 · 29 · 31 · 40',['31','17','40','29'],['17','29','31','40']),
      C('B1.3','Compare two hop counts','One route has 23 hops and another has 32. A student wants the longer route. The digits change places, so compare their values.','Which route has more hops?','👟 23 · 32',['23','32'],'32'),
      H('B1.1','Find the starting point','The hop game starts at sign 16. Students look for the number before they begin. Find it on the chart.','Tap 16.',16),
      B('B1.2','Build a new finish','Another game ends at 48 hops. Four tens and eight ones make the sign. Build the total with blocks.','Show 48.','🏁',48,[0,4,8]),
      C('B1.2','What completes thirty?','The class has already placed 20 stepping stones. The route needs 30 stones altogether. Think in groups of ten to find what is missing.','How many more stones are needed?','🪨 20 + ? = 30',['5','10','20'],'10'),
      S('B1.5','One step after 39','Route markers go 37, 38, and 39. Each marker is one more than the last. Move the slider to the next number.','What follows 39?','👟 37 → 38 → 39 → ?',0,50,1,40),
      E('B1.4','Estimate the game tokens','Students pour game tokens onto a mat. Make a close guess before counting. Reveal groups of ten to check it.','Estimate and verify the tokens.','🔵',44,50,5),
      O('B1.3','Sort another sign set','Four small signs read 11, 14, 41, and 44. A student wants them in increasing order. Look at tens, then ones.','Order the signs from least to greatest.','🔢 11 · 14 · 41 · 44',['41','11','44','14'],['11','14','41','44']),
      H('B1.1','Find sign twenty-seven','One team uses sign 27 for its route. The number lets everyone return to the same place. Find 27 on the chart.','Tap 27.',27)
    ]),
    W2Day('Garden path counting','Count by 1s, 2s, 5s, and 10s','The garden club labels rows of pots. Each row uses a different counting rule. Notice the jump before choosing the next label.','Draw four number paths to 50: one each by 1s, 2s, 5s, and 10s.','Place five paper pots on a table. Count them one by one, then add another group of five.',[
      S('B1.5','One more pot','Garden pot labels go 40, 41, and 42. Each new pot gets the next number. Move the slider one step forward.','What label follows 42?','🪴 40 → 41 → 42 → ?',0,50,1,43),
      S('B1.5','Two more wheels','Garden carts each have two wheels. The wheel totals are 26, 28, and 30. Another cart joins the line.','What total comes next?','🛒 26 → 28 → 30 → ?',0,50,2,32),
      S('B1.5','Five more seeds','The club adds seeds in cups of five. The running totals are 25, 30, and 35. One more cup is added.','What total comes next?','🌱 25 → 30 → 35 → ?',0,50,5,40),
      S('B1.5','Ten more leaves','Each bag holds ten leaves for an art project. Students count 20, 30, and 40 leaves. A final bag is added.','How many leaves now?','🍂 20 → 30 → 40 → ?',0,50,10,50)
    ],[
      S('B1.5','Count one at a time','The first garden labels are 16, 17, and 18. Every new label adds one. Choose the next number.','What comes after 18?','🪴 16 → 17 → 18 → ?',0,50,1,19),
      S('B1.5','Count paired gloves','The club has pairs of gloves. The glove totals go 22, 24, and 26. Add one more pair.','How many gloves now?','🧤 22 → 24 → 26 → ?',0,50,2,28),
      S('B1.5','Count seed cups','Every small cup holds five seeds. The group counts 20, 25, and 30. Add one more cup.','How many seeds now?','🌱 20 → 25 → 30 → ?',0,50,5,35),
      S('B1.5','Count full trays','Each garden tray holds ten plants. The totals are 10, 20, and 30. One more tray is filled.','How many plants now?','🪴 10 → 20 → 30 → ?',0,50,10,40),
      S('B1.5','Reach fifty by ones','The plant tags show 47, 48, and 49. Each tag adds one. Find the last number on this chart.','What follows 49?','🏷️ 47 → 48 → 49 → ?',0,50,1,50),
      S('B1.5','Pairs near fifty','The club counts two wheels at a time: 42, 44, and 46. One more cart pair is counted. Stay at or below 50.','What follows 46?','🛒 42 → 44 → 46 → ?',0,50,2,48),
      C('B1.5','A jump of five','A student reads seed totals 15, 20, and 25. The cups all have five seeds. Choose the next total.','What comes next?','🌱 15 → 20 → 25 → ?',['26','30','35'],'30'),
      O('B1.3','Order the row markers','Garden rows have markers 5, 15, 25, and 35. A helper wants them from smallest to largest. Move each card to its place.','Order the markers.','🏷️ 5 · 15 · 25 · 35',['25','5','35','15'],['5','15','25','35']),
      H('B1.1','Find the planting row','The class uses row 46 for new plants. Its label tells students where to work. Find 46 on the chart.','Tap 46.',46),
      B('B1.2','Build the pot total','A volunteer counts 47 pots in the shed. Four tens and seven ones make that total. Build it with blocks.','Show 47.','🪴',47,[0,4,7])
    ]),
    W2Day('Craft-table fair shares','Share whole objects and equal parts','Students prepare supplies for a craft table. Move whole objects to student-face mats so the shares match. Leave any extras in the bank unless the problem says they can be cut.','Draw four mats and show 6 buttons shared equally. Circle the buttons left over.','Give one counter to each of four students. Repeat and notice when there are too few counters for another full round.',[
      P('B1.6','Six clips for two','Two students share six whole paper clips for a craft. They take turns receiving one clip. The bank should be empty when the shares match.','How many clips does each student get?','📎',6,2,['3 each, 0 left','2 each, 2 left','4 each, 0 left'],'3 each, 0 left','leftover','📎'),
      P('B1.6','Five buttons for four','Four students share five whole buttons for a collage. Give one to each student first. Keep the extra button in the bank.','What is the fair whole-button share?','🔘',5,4,['1 each, 1 left','1 each, 2 left','2 each, 1 left'],'1 each, 1 left','leftover','🔘'),
      F('B1.7','Two ways to colour half','One student colours half a paper strip. Another colours two fourths of an equal strip. Tap the parts to show the same length.','Shade 1/2 and 2/4.','🎨',[1,2],[2,4]),
      FC('B1.8','Three or six sharers?','Two equal ribbons are shared among three and six students. Each person receives one equal piece. Compare one piece from each ribbon.','Which single share is larger?','🎀',[1,3],[1,6],['1/3','1/6'],'1/3')
    ],[
      P('B1.6','Six shells for four','Four students share six whole shells for a display. Give one shell to each mat. Leave the two extra shells in the bank.','How many shells per student, and how many remain?','🐚',6,4,['1 each, 2 left','1 each, 1 left','2 each, 2 left'],'1 each, 2 left','leftover','🐚'),
      P('B1.6','Five stars for two','Two students share five whole star stickers. They take turns placing stickers on their cards. Keep the last sticker in the bank.','What is the fair share?','⭐',5,2,['2 each, 1 left','2 each, 2 left','3 each, 1 left'],'2 each, 1 left','leftover','⭐'),
      P('B1.6','Eight counters for four','Four students share eight whole counters. Deal one to each student in each round. Every mat should finish with the same count.','How many counters does each student get?','🟡',8,4,['2 each, 0 left','1 each, 2 left','3 each, 0 left'],'2 each, 0 left','leftover','🟡'),
      P('B1.6','Ten beads for four','Four students share ten whole beads for a craft. Give two beads to each student. Keep any extras in the bank rather than making unequal shares.','How many beads each, and how many stay?','🟣',10,4,['2 each, 2 left','2 each, 1 left','3 each, 2 left'],'2 each, 2 left','leftover','🟣'),
      P('B1.6','Nine labels for two','Two students share nine whole name labels. Place labels on both mats in fair rounds. One label cannot complete a round.','What is the fair whole-label share?','🏷️',9,2,['4 each, 1 left','3 each, 2 left','5 each, 1 left'],'4 each, 1 left','leftover','🏷️'),
      F('B1.7','Fold the same half','Two paper flags start the same size. One is cut in half and the other into fourths. Colour equal lengths on both.','Shade 1/2 and 2/4.','🚩',[1,2],[2,4]),
      FC('B1.8','One of four or eight?','Two same-sized paper strips are shared by four and eight students. Each student gets one piece. Compare the size of one piece.','Which unit fraction is larger?','📏',[1,4],[1,8],['1/4','1/8'],'1/4'),
      C('B1.7','Match a half','A student colours one half of a paper rectangle. Another divides an equal rectangle into four parts. Count the fourths needed to match the first colour.','How many fourths equal one half?','🎨 1/2 = ?/4',['1 fourth','2 fourths','3 fourths'],'2 fourths'),
      O('B1.8','Order three paper shares','Equal strips are shared among 2, 4, and 10 students. One person gets one part from each strip. Put those parts in order from largest to smallest.','Place the largest share first.','📏 1/2 · 1/4 · 1/10',['1/10','1/2','1/4'],['1/2','1/4','1/10']),
      H('B1.1','Find craft tray thirty-nine','The craft shelf has a tray labelled 39. The number tells students where to return the beads. Find it on the chart.','Tap 39.',39)
    ]),
    W2Day('Fraction flag gallery','Compare unit fractions','The class hangs equal-sized paper flags on a wall. Each flag is divided into equal pieces. One piece gets smaller when the whole is shared among more students.','Draw equal strips divided into 2, 4, and 8 pieces. Shade one piece in each and compare.','Fold an equal paper strip into two pieces and another into four. Compare one piece from each strip.',[
      FC('B1.8','Half or eighth?','Two equal flags are shared by groups of two and eight. Each student receives one equal piece. Compare the single pieces.','Which piece is larger?','🚩',[1,2],[1,8],['1/2','1/8'],'1/2'),
      FC('B1.8','Fourth or tenth?','Two equal art strips are divided into fourths and tenths. A student gets one piece from each strip. Look at the lengths to decide.','Which single piece is larger?','📏',[1,4],[1,10],['1/4','1/10'],'1/4'),
      O('B1.8','Order the flags','Three equal flags are shared among 2, 3, and 6 students. Each gets one piece. Put the pieces in order from largest to smallest.','Place the largest unit fraction first.','🚩 1/2 · 1/3 · 1/6',['1/6','1/2','1/3'],['1/2','1/3','1/6']),
      F('B1.7','Show a matching half again','Two flags are the same size. One is divided in half and the other into four equal parts. Colour one half and two fourths to show the same area.','Shade 1/2 and 2/4.','🚩',[1,2],[2,4])
    ],[
      FC('B1.8','Third or ninth?','Equal paper banners are divided among three and nine students. Each student receives one equal piece. Compare the single pieces.','Which piece is larger?','🏳️',[1,3],[1,9],['1/3','1/9'],'1/3'),
      FC('B1.8','Fifth or tenth?','Two same-sized ribbons are cut into five and ten equal pieces. One student receives one piece from each. Compare their lengths.','Which piece is larger?','🎀',[1,5],[1,10],['1/5','1/10'],'1/5'),
      O('B1.8','Arrange three single shares','Three equal strips are shared among 2, 4, and 8 students. One piece goes to each student. Put the pieces from largest to smallest.','Order the unit fractions.','📏 1/2 · 1/4 · 1/8',['1/8','1/2','1/4'],['1/2','1/4','1/8']),
      F('B1.7','Equal coloured flags','One flag is divided in half and an equal flag into fourths. Colour the same amount of both flags. Tap the matching parts.','Shade 1/2 and 2/4.','🚩',[1,2],[2,4]),
      C('B1.7','Name a coloured half','A student colours one of two equal flag parts. Another colours parts of a flag cut into fourths. The coloured lengths must match.','How many fourths make a half?','🚩 1/2 = ?/4',['1 fourth','2 fourths','4 fourths'],'2 fourths'),
      B('B1.2','Build the gallery count','The wall has room for 46 art cards. A student uses tens rods and ones cubes to show the number. Build the same count.','Show 46.','🖼️',46,[0,4,6]),
      E('B1.4','Estimate the paper stars','Students cut a collection of paper stars for the gallery. Look at them before counting. Reveal groups of ten to check your guess.','Estimate and verify the stars.','⭐',42,50,5),
      H('B1.1','Find display number forty','The teacher labels a display space 40. Four full tens lead to that number. Find it on the chart.','Tap 40.',40),
      P('B1.6','Ten cards for two','Two students share ten whole gallery cards. Deal one card to each in every round. The bank should be empty at the end.','How many cards does each get?','🃏',10,2,['5 each, 0 left','4 each, 2 left','6 each, 0 left'],'5 each, 0 left','leftover','🃏'),
      S('B1.5','A final ten-jump','A class counts wall spaces 10, 20, 30, and 40. Each jump adds ten. Use the slider to show one more jump.','What comes next?','🖼️ 10 → 20 → 30 → 40 → ?',0,50,10,50)
    ])
  ];
  window.STARLIGHT_DATA.Pathway.weeks[2]={home:pathwayW2.map(d=>d.home),school:pathwayW2.map(d=>d.school)};
  const exciteW2=[
    W2Day('Library shelf helpers','Represent, estimate, and compare to 200','The school library is making new shelf labels. Students count books for real jobs: shelving, choosing a cart, and checking a delivery. Use groups of 100, 10, and 1 to explain each count.','Make a picture of 174 books as one hundred, seven tens, and four ones.','Put 100 counters in one cup and 10 in another. Show how the cups help you count a larger collection.',[
      B('B1.1','Build the graphic-novel count','The library has 174 graphic novels to label. A volunteer needs a base-ten model to check the sign. Build one hundred, seven tens, and four ones.','Build 174.','📚',174,[1,7,4]),
      E('B1.3','Estimate the return cart','A return cart is filled with picture books. Guess its count before you reveal the grouped books. Then count the hundreds, tens, and ones to verify.','Estimate and verify the books.','📚',128,200,18),
      C('B1.2','Choose the fuller shelf','Two library shelves hold 167 and 176 books. The librarian will check the fuller shelf first. Compare the hundreds and tens before you choose.','Which shelf has more books?','📚 167 · 176',['167','176'],'176'),
      O('B1.2','Order four shelf labels','The shelf signs read 102, 120, 180, and 200. A volunteer puts them in number order for a book hunt. Move the cards from least to greatest.','Order the shelf labels.','🏷️ 102 · 120 · 180 · 200',['180','102','200','120'],['102','120','180','200'])
    ],[
      B('B1.1','Count animal books','The animal shelf holds 149 books. A helper makes a block model so the sign can be checked. Build the count with hundreds, tens, and ones.','Show 149.','🐦',149,[1,4,9]),
      E('B1.3','Guess the science cart','Science books are stacked on a cart. Make a close estimate before revealing the groups. Use the grouping to verify the count.','Estimate and verify.','🔬',116,200,18),
      C('B1.2','Two book deliveries','One delivery has 158 books and another has 185. The larger delivery needs the bigger cart. Compare their place values.','Which delivery is larger?','📦 158 · 185',['158','185'],'185'),
      O('B1.2','Put carts in order','Cart labels are 109, 140, 164, and 191. A helper parks them in increasing number order. Move each label onto a landing pad.','Order least to greatest.','🛒 109 · 140 · 164 · 191',['164','109','191','140'],['109','140','164','191']),
      B('B1.1','Build a second delivery','A second cart has 190 books. The volunteer sees one hundred and nine tens. Build a model with no loose ones.','Build 190.','📖',190,[1,9,0]),
      E('B1.3','Check another shelf','A shelf of comic books looks almost full. Estimate the count before you count the groups. Reveal the model to see how close you were.','Estimate and verify the shelf.','📘',183,200,17),
      S('B1.4','Twenty books per bin','Each display bin holds 20 books. The totals are 80, 100, and 120. One more full bin is added.','What is the next total?','📚 80 → 100 → 120 → ?',0,200,20,140),
      C('B1.1','Read a block label','A student counts one hundred, six tens, and eight ones. The librarian needs a single number on the shelf sign. Combine the groups.','What number is shown?','100 + 60 + 8',['168','186','160'],'168'),
      C('B1.5','Pair library chairs','There are 154 chairs set in equal pairs for a reading event. None is left without a partner. The ones digit helps explain the result.','Is 154 even or odd?','🪑 154',['Even','Odd'],'Even'),
      B('B1.1','Make the largest sign','The library has space for 200 books in a storage area. Two flats worth 100 each show the full count. Build exactly 200.','Show 200.','🏷️',200,[2,0,0])
    ]),
    W2Day('Food-drive sorting','Even, odd, and place value','The class counts cans collected for a local food drive. Volunteers pair cans for packing and make labels for each box. If one can has no partner, that count is odd.','Draw pairs for 9 cans and for 10 cans. Explain which count leaves one can alone.','Use counters to make pairs. Try a count that is even and then add one more counter.',[
      C('B1.5','Pair the soup cans','Volunteers counted 137 soup cans. They try to pack cans in equal pairs. Use the ones digit to decide whether one can is left alone.','Is 137 even or odd?','🥫 137',['Even','Odd'],'Odd'),
      C('B1.5','Pair the bean cans','The food drive received 164 bean cans. Volunteers place them two at a time in boxes. The last digit tells whether every can has a partner.','Is 164 even or odd?','🥫 164',['Even','Odd'],'Even'),
      B('B1.1','Build the pasta-sauce count','The class has 108 cans of pasta sauce. One hundred flat and eight ones show this number. Build a model with no tens.','Show 108.','🥫',108,[1,0,8]),
      C('B1.2','Choose the fuller collection','Two shelves hold 138 and 183 cans. The volunteers check the shelf with more cans first. Compare tens and ones after the hundred.','Which shelf holds more?','🥫 138 · 183',['138','183'],'183')
    ],[
      C('B1.5','Pair 125 cans','A class collected 125 cans of vegetables. Volunteers pack them in pairs. Decide if one can is left without a partner.','Is 125 even or odd?','🥫 125',['Even','Odd'],'Odd'),
      C('B1.5','Pair 126 cans','Another class collected 126 cans of vegetables. The count is just one more. Check whether all cans can now be paired.','Is 126 even or odd?','🥫 126',['Even','Odd'],'Even'),
      B('B1.1','Build the fruit-can count','The fruit-can total is 172. The class wants a model to check its written label. Build the number in hundreds, tens, and ones.','Build 172.','🍑',172,[1,7,2]),
      O('B1.2','Order food-drive box labels','The box labels read 112, 121, 148, and 184. Volunteers stack boxes from smaller count to larger count. Place the four labels in that order.','Order the labels.','📦 112 · 121 · 148 · 184',['148','112','184','121'],['112','121','148','184']),
      E('B1.3','Estimate the pantry shelf','A pantry shelf has a collection of cans. Make a close guess before counting each group. Reveal the tens and ones to check.','Estimate and verify the cans.','🥫',154,200,18),
      C('B1.5','Explain an even count','The class counted 198 cans. Two volunteers can make pairs without a leftover. Use the ones digit to support your answer.','Which explanation fits 198?','🥫 198',['Even: it ends in 8','Odd: it ends in 8','Odd: it has a hundred'],'Even: it ends in 8'),
      C('B1.5','Explain an odd count','There are 143 cans on a shelf. If volunteers pair them, one is left alone. Use the ones digit to explain why.','Which explanation fits 143?','🥫 143',['Odd: it ends in 3','Even: it ends in 3','Even: it has tens'],'Odd: it ends in 3'),
      B('B1.1','Build another box label','A donation box is labelled 195. Students use one hundred, nine tens, and five ones to check it. Build the same number.','Show 195.','📦',195,[1,9,5]),
      C('B1.2','Choose a larger shelf','The pantry has shelves with 167 and 176 cans. The team will empty the fuller shelf first. Compare the number of tens.','Which shelf is fuller?','🥫 167 · 176',['167','176'],'176'),
      S('B1.4','Twenty cans per crate','The drive fills crates of 20 cans. The running totals are 100, 120, and 140. Add one more full crate.','What total comes next?','📦 100 → 120 → 140 → ?',0,200,20,160)
    ]),
    W2Day('Festival ticket bundles','Count by 20s, 25s, and 50s','The school festival prints tickets in equal bundles. Counting by a bundle size is faster than counting every ticket. Follow the pattern before you move the slider.','Draw number lines to 200 using jumps of 20, 25, and 50.','Make four piles of 25 counters or paper tickets. Count the piles without opening them.',[
      S('B1.4','Twenty-ticket bundles','A volunteer counts bundles of 20: 80, 100, and 120. One more bundle is placed on the table. Keep counting by twenties.','How many tickets now?','🎟️ 80 → 100 → 120 → ?',0,200,20,140),
      S('B1.4','Twenty-five-ticket bundles','Ticket books hold 25 tickets. The totals are 100, 125, and 150. Add one more book and count again.','What total comes next?','🎟️ 100 → 125 → 150 → ?',0,200,25,175),
      S('B1.4','Fifty-ticket bundles','Large ticket packs hold 50 tickets. The class counts 50, 100, and 150. One more pack is delivered.','How many tickets now?','🎟️ 50 → 100 → 150 → ?',0,200,50,200),
      C('B1.1','Four books of 25','The school has four ticket books. Each book contains 25 tickets. Students can count 25, 50, 75, and 100.','How many tickets are in four books?','🎟️ 4 books of 25',['75','100','125'],'100')
    ],[
      S('B1.4','Count twenty at a time','The volunteer says 20, 40, and 60 tickets. Each new pack has 20. Move the slider one jump.','What follows 60?','🎟️ 20 → 40 → 60 → ?',0,200,20,80),
      S('B1.4','More twenty-packs','The afternoon total is 120, 140, and 160. Another pack of 20 arrives. Continue the count.','What follows 160?','🎟️ 120 → 140 → 160 → ?',0,200,20,180),
      S('B1.4','Count books of 25','Ticket-book totals go 25, 50, and 75. Each book holds the same amount. Add another book.','What follows 75?','🎟️ 25 → 50 → 75 → ?',0,200,25,100),
      S('B1.4','Near two hundred by 25s','The ticket totals are 125, 150, and 175. One more book is sold. Move the slider to the final total.','What follows 175?','🎟️ 125 → 150 → 175 → ?',0,200,25,200),
      S('B1.4','Count stacks of 50','The large stacks have 50, 100, and 150 tickets. Another stack is added. Keep the count at or below 200.','What follows 150?','🎟️ 50 → 100 → 150 → ?',0,200,50,200),
      C('B1.4','Name the counting rule','A student records 40, 60, 80, and 100 tickets. The number changes by the same amount each time. Find the bundle size.','How many tickets are added each time?','🎟️ 40 → 60 → 80 → 100',['20','25','50'],'20'),
      C('B1.4','Another counting rule','A table shows 50, 75, 100, and 125 tickets. Each book contains an equal number. Identify the jump size.','How many tickets are in each book?','🎟️ 50 → 75 → 100 → 125',['20','25','50'],'25'),
      B('B1.1','Build the final total','The festival printed 200 tickets for a game. Two hundreds make that total. Build a model that matches the printed count.','Show 200.','🎟️',200,[2,0,0]),
      O('B1.2','Order bundle totals','Four tables counted 25, 75, 125, and 175 tickets. A student wants the totals in increasing order. Place each card carefully.','Order the counts.','🎟️ 25 · 75 · 125 · 175',['125','25','175','75'],['25','75','125','175']),
      E('B1.3','Estimate unsold tickets','A box contains the unsold tickets. Look before counting each one. Reveal the groups to check the estimate.','Estimate and verify the tickets.','🎟️',137,200,18)
    ]),
    W2Day('Art-paper shares','Share up to ten items','Art students share identical sheets of paper. First deal whole sheets fairly. If there are leftovers, cut each extra sheet into equal pieces for every student.','Draw three mats to show how 8 identical sheets can be shared. Label each full sheet and fractional piece.','Use identical paper strips and fold them into thirds and sixths. Compare one third with two sixths.',[
      P('B1.6','Seven sheets for four','Four art students share seven identical sheets. Give one whole sheet to each student. Cut the three leftovers into four equal parts each.','How much paper does each student get?','📄',7,4,['1 3/4 each','1 1/4 each','2 each'],'1 3/4 each','fraction','📄'),
      P('B1.6','Eight sheets for six','Six students share eight identical sheets of paper. Each receives one whole sheet. Cut the two extras into six equal pieces each.','How much paper does each student get?','📄',8,6,['1 1/3 each','1 2/3 each','2 each'],'1 1/3 each','fraction','📄'),
      P('B1.6','Ten sheets for two','Two students share ten identical sheets. Deal whole sheets evenly. No cutting is needed when both have the same number.','How many sheets per student?','📄',10,2,['4 each','5 each','6 each'],'5 each','fraction','📄'),
      F('B1.7','One third, two sixths','Two equal paper strips are divided into thirds and sixths. Colour one of three parts on one strip. Colour two of six parts on the other.','Shade 1/3 and 2/6.','🎨',[1,3],[2,6])
    ],[
      P('B1.6','Six sheets for three','Three students share six identical sheets. Deal one sheet to each in every round. No sheets remain to cut.','How many sheets per student?','📄',6,3,['2 each','3 each','1 each'],'2 each','fraction','📄'),
      P('B1.6','Five sheets for two','Two students share five identical sheets. Give two whole sheets to each. Cut the last sheet into two equal pieces.','How much does each get?','📄',5,2,['2 1/2 each','2 1/3 each','3 each'],'2 1/2 each','fraction','📄'),
      P('B1.6','Nine sheets for four','Four art students share nine identical sheets. Give two to each student. Divide the extra sheet into four equal parts.','How much paper does each get?','📄',9,4,['2 1/4 each','2 3/4 each','3 each'],'2 1/4 each','fraction','📄'),
      P('B1.6','Four sheets for six','Six students share four identical sheets for a poster. No one can take a full sheet fairly. Cut each sheet into six pieces and share them.','What fraction of one sheet does each get?','📄',4,6,['2/3 each','1/3 each','4/3 each'],'2/3 each','fraction','📄'),
      F('B1.7','Match the coloured thirds','Two same-sized strips are ready for the art wall. One has three equal parts, and the other has six. Shade matching amounts.','Shade 1/3 and 2/6.','🎨',[1,3],[2,6]),
      C('B1.7','How many sixths?','A student colours one third of a poster strip. Another divides an equal strip into sixths. Count how many sixths cover the same length.','How many sixths equal one third?','📏 1/3 = ?/6',['1 sixth','2 sixths','3 sixths'],'2 sixths'),
      P('B1.6','Ten sheets for six','Six students share ten identical sheets. They each take one whole sheet first. Cut four leftovers into six parts each.','How much does each get?','📄',10,6,['1 2/3 each','1 1/3 each','2 each'],'1 2/3 each','fraction','📄'),
      FC('B1.7','Third or sixth?','Two equal paper strips are divided into thirds and sixths. A student colours one piece on each. Compare the lengths of the coloured pieces.','Which piece is larger?','📏',[1,3],[1,6],['1/3','1/6'],'1/3'),
      B('B1.1','Count paper sheets','The art cupboard has 186 sheets left. A student wants a base-ten model for the inventory card. Build the number.','Show 186.','📄',186,[1,8,6]),
      E('B1.3','Estimate display cards','A pile of art cards needs sorting. Make a close estimate before revealing the groups. Count to verify it.','Estimate and verify the cards.','🖼️',119,200,17)
    ]),
    W2Day('Community fair review','Use number sense to make a plan','The class prepares a community fair with books, cans, and art. They check labels, estimate collections, count bundles, and share materials. Explain how each answer helps with the plan.','Choose a real class collection. Estimate it, count it, and show its total with a drawing.','Have a partner pick one number from 100 to 200. Build it and say whether it is even or odd.',[
      E('B1.3','Guess the game tokens','The fair has a box of game tokens. Look at the whole collection before counting. Reveal the groups to check how close the estimate was.','Estimate and verify.','🎲',163,200,18),
      F('B1.7','Check a third in sixths','Two same-sized fair banners are divided into thirds and sixths. A student colours one third on the first and two sixths on the second. Show that the coloured lengths match.','Shade 1/3 and 2/6.','🎨',[1,3],[2,6]),
      C('B1.5','Pair the chairs','There are 175 chairs for the fair. Students try to set them in pairs. Decide whether one chair will be left alone.','Is 175 even or odd?','🪑 175',['Even','Odd'],'Odd'),
      P('B1.6','Six posters for four','Four students share six identical poster sheets. Each gets one whole sheet. Cut the two extras into four pieces each.','How much does each student get?','📄',6,4,['1 1/2 each','1 1/4 each','2 each'],'1 1/2 each','fraction','📄')
    ],[
      B('B1.1','Build the fair count','The fair collected 197 tickets at one stall. A helper makes a model to check the record. Build the count.','Show 197.','🎟️',197,[1,9,7]),
      C('B1.2','Choose a larger collection','The food table has 169 cans and the book table has 196 bookmarks. A student compares their counts for a display. Compare the tens digits.','Which count is larger?','🥫 169 · 🔖 196',['169','196'],'196'),
      E('B1.3','Estimate the welcome cards','A pile of welcome cards is on the desk. Look before counting each card. Reveal the base-ten groups to check your estimate.','Estimate and verify.','💌',142,200,18),
      S('B1.4','Count boxes of twenty','A stall counted 60, 80, and 100 tokens in full boxes. Each box has 20 tokens. Another full box arrives.','What is the next count?','🎲 60 → 80 → 100 → ?',0,200,20,120),
      S('B1.4','Count books of twenty-five','A ticket stall counts 75, 100, and 125 tickets. Each book has 25. Add one more book.','What is the next count?','🎟️ 75 → 100 → 125 → ?',0,200,25,150),
      S('B1.4','Count packs of fifty','A volunteer counts 50, 100, and 150 flyers. Another pack of 50 is printed. Stay within 200.','How many flyers now?','📄 50 → 100 → 150 → ?',0,200,50,200),
      C('B1.5','Pair the name tags','The school printed 182 name tags. Two students place them in pairs. Use the final digit to decide whether one remains.','Is 182 even or odd?','🏷️ 182',['Even','Odd'],'Even'),
      P('B1.6','Seven strips for three','Three students share seven identical paper strips. Give two whole strips to each. Divide the leftover strip into three equal parts.','How much does each get?','📏',7,3,['2 1/3 each','2 2/3 each','3 each'],'2 1/3 each','fraction','📏'),
      F('B1.7','Equal ribbon lengths','One ribbon is divided into thirds and another equal ribbon into sixths. Shade the same length on both. Notice that two sixths match one third.','Shade 1/3 and 2/6.','🎀',[1,3],[2,6]),
      O('B1.2','Sort final signs','Signs read 104, 140, 149, and 194. The class places them in number order before the fair. Move the signs from least to greatest.','Order the signs.','🏷️ 104 · 140 · 149 · 194',['149','104','194','140'],['104','140','149','194'])
    ])
  ];
  window.STARLIGHT_DATA.Excite.weeks[2]={home:exciteW2.map(d=>d.home),school:exciteW2.map(d=>d.school)};
  const inspireW2=[
    W2Day('Maker-fair inventory','Represent and compare to 1000','The school maker fair needs clear inventory labels. Students count kits, paper pieces, and visitor badges so supplies can be set out correctly. Use hundreds, tens, and ones to explain each total.','Draw 638 as six hundreds, three tens, and eight ones. Show a second way to group the same number.','Trade one hundred flat for ten tens rods. Explain why the total stays the same.',[
      B('B1.1 · B1.5','Build the badge count','The fair printed 638 visitor badges. A volunteer uses base-ten blocks to check the box label. Build six hundreds, three tens, and eight ones.','Build 638.','🏷️',638,[6,3,8]),
      C('B1.2','Choose the larger order','One table ordered 679 pieces and another ordered 697. The larger order needs a bigger storage box. Compare the hundreds, then the tens.','Which order is larger?','📦 679 · 697',['679','697'],'697'),
      O('B1.2','Order supply labels','Supply boxes read 308, 380, 803, and 830. The team places them from the smallest label to the largest. Move each card into its correct place.','Order least to greatest.','🏷️ 308 · 380 · 803 · 830',['803','308','830','380'],['308','380','803','830']),
      C('B1.5','Read regrouped blocks','A student models 372 with two hundreds, seventeen tens, and two ones. Ten of those tens could trade for a hundred. The number stays the same.','What total is represented?','🧱 2 hundreds + 17 tens + 2 ones',['272','372','472'],'372')
    ],[
      B('B1.1 · B1.5','Build the kit count','A maker table prepared 716 construction kits. The count is written on its supply box. Build the number using base-ten materials.','Show 716.','🧰',716,[7,1,6]),
      C('B1.5','Name the parts','A box label shows 405. The zero means there are no tens between the hundreds and ones. Choose the matching place-value description.','Which model shows 405?','📦 405',['4 hundreds, 0 tens, 5 ones','4 hundreds, 5 tens, 0 ones','5 hundreds, 0 tens, 4 ones'],'4 hundreds, 0 tens, 5 ones'),
      O('B1.2','Line up four supply carts','Carts are numbered 426, 462, 624, and 642. Students arrange them from lowest to highest for a check-in route. Compare every digit by place.','Order the cart numbers.','🛒 426 · 462 · 624 · 642',['624','426','642','462'],['426','462','624','642']),
      B('B1.1 · B1.5','Build the tile order','The art table ordered 590 small tiles. It needs a block model to check the delivery. Show five hundreds and nine tens.','Build 590.','🧩',590,[5,9,0]),
      C('B1.2','Compare badge bundles','Two badge boxes are labelled 748 and 784. The larger box goes to the busy entrance. Compare the tens first.','Which box has more badges?','🏷️ 748 · 784',['748','784'],'784'),
      C('B1.5','Trade a hundred','A student has 3 hundreds, 14 tens, and 6 ones. Trading ten tens for one hundred does not change the amount. Read the total.','What number is shown?','🧱 3 hundreds + 14 tens + 6 ones',['346','446','536'],'446'),
      B('B1.1','Show an almost-full set','The class has 999 name tags for the event. Nine hundreds, nine tens, and nine ones show the count. Build it.','Show 999.','🏷️',999,[9,9,9]),
      S('B1.4','Count hundred-piece packs','The maker table has 300, 400, and 500 tiles in full packs. Each pack adds 100. Move the slider one jump.','What total comes next?','🧩 300 → 400 → 500 → ?',0,1000,100,600),
      C('B1.1','Read the total on a label','A volunteer sees eight hundred flats, one tens rod, and three ones cubes. A clear label needs the number in standard form. Combine the pieces.','What number is shown?','🧱 800 + 10 + 3',['813','831','803'],'813'),
      O('B1.2','Check final labels','Four shelves show 501, 510, 551, and 555. A helper wants them in increasing order. Compare hundreds, tens, and ones.','Order the labels.','🏷️ 501 · 510 · 551 · 555',['551','501','555','510'],['501','510','551','555'])
    ]),
    W2Day('Transit-map ticket count','Count by 50s, 100s, and 200s','Students plan a pretend city trip using a transit map. Ticket bundles and passenger counters come in equal groups. Read the counting rule before deciding the next number.','Draw three number paths ending at 1000, one using jumps of 50, one of 100, and one of 200.','Put ten tens rods beside a hundred flat. Explain why they show the same total.',[
      S('B1.4','Count fifty-ticket books','A station counts 350, 400, and 450 tickets. Each book contains 50. Another book is placed on the counter.','How many tickets now?','🎟️ 350 → 400 → 450 → ?',0,1000,50,500),
      S('B1.4','Count one-hundred packs','Transit maps arrive in packs of 100. The totals are 500, 600, and 700. One more pack arrives.','What is the next total?','🗺️ 500 → 600 → 700 → ?',0,1000,100,800),
      S('B1.4','Count two-hundred bundles','A station counts 200, 400, and 600 travel cards. Each bundle adds 200. One more bundle is ready.','What total comes next?','💳 200 → 400 → 600 → ?',0,1000,200,800),
      B('B1.5','Build a station count','The transit log records 850 visitors. Eight hundreds and five tens show the total. Build the count with blocks.','Build 850.','🚉',850,[8,5,0])
    ],[
      S('B1.4','Count by fifty from 150','A ticket desk counts 150, 200, and 250 tickets. Each new book adds 50. Continue the pattern.','What follows 250?','🎟️ 150 → 200 → 250 → ?',0,1000,50,300),
      S('B1.4','Count near a thousand','Transit cards are counted 800, 850, and 900. Another group of 50 is added. Stay under or at 1000.','What follows 900?','💳 800 → 850 → 900 → ?',0,1000,50,950),
      S('B1.4','Count map packs','A station has 300, 400, and 500 maps. Each full pack adds 100. Move to the next total.','What follows 500?','🗺️ 300 → 400 → 500 → ?',0,1000,100,600),
      S('B1.4','Count large groups','Passenger-count cards read 400, 600, and 800. Each step adds 200. One more step reaches the limit of the chart.','What follows 800?','🚉 400 → 600 → 800 → ?',0,1000,200,1000),
      C('B1.4','Find the size of a jump','A student records 450, 500, 550, and 600 tickets. Every new total changes by the same amount. Find the jump size.','How much is added each time?','🎟️ 450 → 500 → 550 → 600',['50','100','200'],'50'),
      C('B1.4','Read another route pattern','A map counter shows 100, 300, 500, and 700. The class adds the same number each time. Identify the step.','What is the counting rule?','🗺️ 100 → 300 → 500 → 700',['By 50s','By 100s','By 200s'],'By 200s'),
      B('B1.5','Model 906 maps','A transit office counted 906 maps. Nine hundreds and six ones show the total, with no tens. Build that model.','Show 906.','🗺️',906,[9,0,6]),
      C('B1.5','Read a regrouped fare count','A volunteer counts 4 hundreds, 13 tens, and 5 ones. Ten tens trade for one more hundred. Read the total after trading.','What number is represented?','🧱 4 hundreds + 13 tens + 5 ones',['435','535','635'],'535'),
      O('B1.2','Order station visitor counts','Four stops had 507, 570, 705, and 750 visitors. A planner wants the counts from least to greatest. Place the station cards in order.','Order the counts.','🚉 507 · 570 · 705 · 750',['705','507','750','570'],['507','570','705','750']),
      B('B1.1','Build the full ticket supply','Ten hundred-packs of tickets make 1000. The office wants a model of the full supply. Use ten hundred flats.','Show 1000.','🎟️',1000,[10,0,0])
    ]),
    W2Day('Round for event planning','Nearest ten and nearest hundred','A class plans supplies for the next maker fair. Exact counts are kept on the inventory sheet, but rounded counts make a quick planning estimate. Use the number line to see which ten or hundred is closer.','Draw number lines for 673 to the nearest ten and 673 to the nearest hundred. Mark both answers.','Place a marker halfway between 600 and 700. Explain why a halfway number rounds up.',[
      R('B1.3','Plan sticker packs','A club counted 673 stickers. It wants an approximate count to the nearest ten for packing. Find the closer endpoint on the number line.','Round 673 to the nearest ten.','⭐',673,10,670),
      R('B1.3','Plan visitor badges','The fair counted 673 visitors last time. The organizer needs a quick count to the nearest hundred. Compare 673 with 600 and 700.','Round 673 to the nearest hundred.','🏷️',673,100,700),
      R('B1.3','Halfway label count','The class printed 450 labels. That is halfway between 400 and 500. The agreed halfway rule rounds upward.','Round 450 to the nearest hundred.','🏷️',450,100,500),
      R('B1.3','Nearly the next ten','A display has 896 pieces. The organizer rounds to the nearest ten. Decide whether 896 is closer to 890 or 900.','Round 896 to the nearest ten.','🧩',896,10,900)
    ],[
      R('B1.3','Round art cards','The class counted 324 art cards. A planning note uses the nearest ten. Compare the distances from 320 and 330.','Round 324 to the nearest ten.','🎨',324,10,320),
      R('B1.3','Round a badge order','The office counted 785 badges. Its quick report uses the nearest ten. The halfway rule helps decide.','Round 785 to the nearest ten.','🏷️',785,10,790),
      R('B1.3','Round seed packets','A garden stand has 549 seed packets. The fair plans in hundreds. Compare its distance from 500 and 600.','Round 549 to the nearest hundred.','🌱',549,100,500),
      R('B1.3','Round a visitor count','Last year 851 people visited the fair. An organizer wants a nearest-hundred planning count. The count is just beyond halfway.','Round 851 to the nearest hundred.','👥',851,100,900),
      R('B1.3','Near a thousand','The school prepared 974 name tags. Round to the nearest hundred for a quick announcement. Look at 974 between 900 and 1000.','Round 974 to the nearest hundred.','🏷️',974,100,1000),
      R('B1.3','Round lunch orders','A volunteer listed 612 lunch orders. The kitchen wants a nearest-ten estimate. Find whether 612 is closer to 610 or 620.','Round 612 to the nearest ten.','🥪',612,10,610),
      C('B1.3','Explain the rounded count','A student rounded 468 paper pieces to the nearest ten. On a number line, 468 is nearer 470 than 460. Choose the planning count.','What is 468 rounded to the nearest ten?','📄 468',['460','470','500'],'470'),
      R('B1.3','Exactly halfway','A table counted 650 tiles. That is halfway between 600 and 700. Use the halfway-up rule for the nearest hundred.','Round 650 to the nearest hundred.','🧩',650,100,700),
      B('B1.5','Keep the exact count','The report uses a rounded count, but the inventory is exact: 746 pieces. Build that exact count with blocks. Rounded and exact counts serve different jobs.','Show 746.','🧱',746,[7,4,6]),
      O('B1.2','Order exact counts','Four stalls recorded 604, 640, 704, and 740 items. A planner wants the exact counts in order. Compare the hundreds and tens.','Order least to greatest.','🏷️ 604 · 640 · 704 · 740',['704','604','740','640'],['604','640','704','740'])
    ]),
    W2Day('Garden-club fair shares','Share up to twenty items','The garden club divides identical seed strips and paper planting plans fairly. Deal the whole items first, then cut leftovers into equal pieces when the task allows it. Draw the shares to explain your answer.','Draw 17 identical strips shared among five students. Show three whole strips and the fractional extra for each.','Fold equal paper strips into halves, fourths, and eighths. Compare 1/2, 2/4, and 4/8.',[
      P('B1.6','Seventeen strips for five','Five students share seventeen identical planting strips. Each gets three whole strips. Cut the two extras into fifths for a fair share.','How much does each student get?','🌱',17,5,['3 2/5 each','3 1/5 each','4 each'],'3 2/5 each','fraction','🌱'),
      P('B1.6','Eleven plans for eight','Eight students share eleven identical paper plans. Give one whole plan to each. Divide the three extras into eight equal parts each.','How much does each student get?','📄',11,8,['1 3/8 each','1 1/8 each','2 each'],'1 3/8 each','fraction','📄'),
      F('B1.7','Match halves and eighths','Two equal paper garden strips are divided into halves and eighths. Colour one half of one strip. Colour the same length in eighths on the other.','Shade 1/2 and 4/8.','🌱',[1,2],[4,8]),
      FC('B1.7','Two fourths or four eighths?','Two equal strips have fourths and eighths marked on them. One strip has two fourths coloured. The other has four eighths coloured. Compare the coloured lengths.','Are the coloured parts equal?','📏',[2,4],[4,8],['Equal','Not equal'],'Equal')
    ],[
      P('B1.6','Eighteen labels for six','Six students share eighteen identical plant labels. Deal whole labels in equal rounds. No labels need cutting.','How many labels per student?','🏷️',18,6,['2 each','3 each','4 each'],'3 each','fraction','🏷️'),
      P('B1.6','Thirteen strips for four','Four students share thirteen identical paper strips. Give three whole strips to each. Cut the last strip into four equal parts.','How much does each get?','📏',13,4,['3 1/4 each','3 3/4 each','4 each'],'3 1/4 each','fraction','📏'),
      P('B1.6','Nineteen cards for ten','Ten students share nineteen identical seed cards. Give one whole card to each. Divide the nine extras into ten equal parts each.','How much does each student get?','🌱',19,10,['1 9/10 each','1 1/10 each','2 each'],'1 9/10 each','fraction','🌱'),
      P('B1.6','Seven sheets for three','Three students share seven identical planting sheets. Give two whole sheets to each. Cut the last one into thirds.','How much does each get?','📄',7,3,['2 1/3 each','2 2/3 each','3 each'],'2 1/3 each','fraction','📄'),
      P('B1.6','Five sheets for eight','Eight students share five identical paper sheets. No whole sheet can go to everyone. Cut each sheet into eight equal pieces.','What fraction of a sheet does each get?','📄',5,8,['5/8 each','3/8 each','8/5 each'],'5/8 each','fraction','📄'),
      F('B1.7','Half and four eighths','Two garden strips begin at the same length. One is cut into halves and the other into eighths. Shade matching portions.','Shade 1/2 and 4/8.','🌱',[1,2],[4,8]),
      F('B1.7','Fourth and two eighths','Two equal strips are divided into fourths and eighths. One fourth should match two eighths. Shade the same length on both.','Shade 1/4 and 2/8.','📏',[1,4],[2,8]),
      C('B1.7','Name the equal part','A student colours three fourths of a strip. Another uses eighths on an equal strip. Count the eighths needed to cover the same length.','How many eighths equal three fourths?','🎨 3/4 = ?/8',['4 eighths','6 eighths','8 eighths'],'6 eighths'),
      B('B1.5','Build the seed total','The garden club has 825 seed envelopes. The supply label needs an exact base-ten model. Build eight hundreds, two tens, and five ones.','Show 825.','🌱',825,[8,2,5]),
      R('B1.3','Plan by hundreds','The garden stand recorded 766 visitors. A quick plan rounds the count to the nearest hundred. Compare 766 with 700 and 800.','Round 766 to the nearest hundred.','🪴',766,100,800)
    ]),
    W2Day('Fair-share design gallery','Equivalent fractions and review','Students finish equal-sized design strips for the maker-fair gallery. Thirds and sixths, and fifths and tenths, can cover the same amount of a whole. Use the pictures to prove it.','Draw three equal strips. Show 1/2 = 4/8, 1/3 = 2/6, and 2/5 = 4/10.','Ask a partner to choose an exact three-digit number. Build it, round it, and count forward by 50.',[
      F('B1.7','Thirds and sixths','Two equal ribbons are divided into thirds and sixths. One third should cover the same length as two sixths. Tap the parts on both ribbons.','Shade 1/3 and 2/6.','🎀',[1,3],[2,6]),
      F('B1.7','Fifths and tenths','Two equal art strips are divided into fifths and tenths. Colour two fifths on one and four tenths on the other. Compare the lengths.','Shade 2/5 and 4/10.','🎨',[2,5],[4,10]),
      P('B1.6','Sixteen cards for five','Five students share sixteen identical display cards. Give three whole cards to each. Cut the remaining card into five equal parts.','How much does each get?','🃏',16,5,['3 1/5 each','3 2/5 each','4 each'],'3 1/5 each','fraction','🃏'),
      B('B1.1 · B1.5','Build the gallery inventory','The gallery keeps an exact record of 926 art pieces. Nine hundreds, two tens, and six ones show that count. Build it with the base-ten pieces.','Show 926.','🖼️',926,[9,2,6])
    ],[
      B('B1.1 · B1.5','Build the gallery count','The final gallery has 981 photo prints. The organizer wants an exact block model for the record. Build the number.','Show 981.','🖼️',981,[9,8,1]),
      O('B1.2','Order display counts','Four displays hold 506, 560, 605, and 650 items. A student lists them from smallest to largest. Compare place values to fill the pads.','Order the counts.','🖼️ 506 · 560 · 605 · 650',['605','506','650','560'],['506','560','605','650']),
      R('B1.3','Round the visitor log','A log records 438 visitors. The teacher wants the nearest hundred for a quick report. Compare 438 with 400 and 500.','Round 438 to the nearest hundred.','📋',438,100,400),
      S('B1.4','Add fifty-ticket books','A table counts 600, 650, and 700 tickets. Each new book adds 50. Continue the total.','What follows 700?','🎟️ 600 → 650 → 700 → ?',0,1000,50,750),
      C('B1.5','Trade tens for a hundred','A student models 6 hundreds, 12 tens, and 4 ones. Ten tens become another hundred without changing the value. Find the number.','What total is represented?','🧱 6 hundreds + 12 tens + 4 ones',['624','724','824'],'724'),
      P('B1.6','Fourteen sheets for six','Six art students share fourteen identical sheets. Give two whole sheets to each. Cut two leftovers into sixths.','How much does each get?','📄',14,6,['2 1/3 each','2 2/3 each','3 each'],'2 1/3 each','fraction','📄'),
      F('B1.7','Match thirds and sixths','Two equal paper strips are cut into thirds and sixths. A coloured third covers the same length as two sixths. Show both.','Shade 1/3 and 2/6.','🎨',[1,3],[2,6]),
      F('B1.7','Match fifths and tenths','Two equal strips are cut into fifths and tenths. Two fifths cover the same length as four tenths. Show the matching parts.','Shade 2/5 and 4/10.','📏',[2,5],[4,10]),
      F('B1.7','Match halves and eighths','Two equal strips are cut into halves and eighths. One half covers four eighths. Colour both versions of the same amount.','Shade 1/2 and 4/8.','📏',[1,2],[4,8]),
      R('B1.3','Round the supply order','A student counted 995 craft pieces. The planner wants the nearest ten. The count is halfway between 990 and 1000.','Round 995 to the nearest ten.','🎨',995,10,1000)
    ])
  ];
  window.STARLIGHT_DATA.Inspire.weeks[2]={home:inspireW2.map(d=>d.home),school:inspireW2.map(d=>d.school)};
  const schoolBonus={
    Pathway:[
      [E('B1.4','Bonus: estimate the mailbag','A mailbag has pretend letter counters inside. Make a close guess before you count. Reveal the ten-groups and check it.','Estimate and verify the letters.','✉️',38,50,5),B('B1.2','Bonus: model another tray','A helper finds 29 postcards in a small tray. Two tens and nine ones show that count. Build the same number.','Show 29.','📬',29,[0,2,9])],
      [C('B1.3','Bonus: choose the longer route','Two playground signs say 28 hops and 38 hops. A student wants the longer route. Compare the tens to help them choose.','Which route has more hops?','🛝 28 · 38',['28','38'],'38'),B('B1.2','Bonus: build a route sign','A route sign needs to show 25 hops. Two tens and five ones make the count. Build it with blocks.','Show 25.','🏁',25,[0,2,5])],
      [S('B1.5','Bonus: another jump of five','The garden club counts 10, 15, and 20 seeds. Each cup adds five seeds. Move the slider to the next total.','What follows 20?','🌱 10 → 15 → 20 → ?',0,50,5,25),S('B1.5','Bonus: another jump of two','A student counts cart wheels 32, 34, and 36. Each cart adds a pair of wheels. Continue the count.','What follows 36?','🛒 32 → 34 → 36 → ?',0,50,2,38)],
      [P('B1.6','Bonus: seven clips for two','Two students share seven whole paper clips. Deal equal rounds to both student mats. Keep the single extra clip in the bank.','How many does each get, and what remains?','📎',7,2,['3 each, 1 left','3 each, 2 left','4 each, 1 left'],'3 each, 1 left','leftover','📎'),F('B1.7','Bonus: show half again','Two paper strips are the same size. One is divided into halves and the other into fourths. Colour matching amounts on both.','Shade 1/2 and 2/4.','🎨',[1,2],[2,4])],
      [FC('B1.8','Bonus: a fifth or a tenth?','Two equal flags are shared by five and ten students. Each student gets one equal part. Compare one person’s share from each flag.','Which single piece is larger?','🚩',[1,5],[1,10],['1/5','1/10'],'1/5'),F('B1.7','Bonus: matching halves','Two equal flags are divided into two and four parts. Colour one half on the first and the matching fourths on the second. Explain the equal areas.','Shade 1/2 and 2/4.','🚩',[1,2],[2,4])]
    ],
    Excite:[
      [E('B1.3','Bonus: another book cart','A librarian rolls in one more book cart. Guess how many books are on it before counting. Reveal groups of ten to check.','Estimate and verify the books.','📚',175,200,18),B('B1.1','Bonus: model shelf 133','A shelf label shows 133 books. A helper wants to see the same number as blocks. Build one hundred, three tens, and three ones.','Build 133.','📖',133,[1,3,3])],
      [C('B1.5','Bonus: pair another can count','Volunteers count 189 cans for the food drive. They pack them in pairs. Decide whether a single can is left over.','Is 189 even or odd?','🥫 189',['Even','Odd'],'Odd'),B('B1.1','Bonus: model the rice cans','The food drive counted 146 rice cans. A student builds the number to check a box label. Show hundreds, tens, and ones.','Build 146.','🥫',146,[1,4,6])],
      [S('B1.4','Bonus: count by twenty-five','Ticket books hold 25 tickets each. The totals are 75, 100, and 125. Another book is counted.','What total comes next?','🎟️ 75 → 100 → 125 → ?',0,200,25,150),S('B1.4','Bonus: count by fifty','Large ticket packs hold 50 tickets each. The totals are 50, 100, and 150. Add one more pack.','What total comes next?','🎟️ 50 → 100 → 150 → ?',0,200,50,200)],
      [P('B1.6','Bonus: nine sheets for six','Six students share nine identical sheets. Each takes one whole sheet. Cut the three extra sheets into six equal parts each.','How much does each student get?','📄',9,6,['1 1/2 each','1 1/3 each','2 each'],'1 1/2 each','fraction','📄'),F('B1.7','Bonus: show the same third','Two equal paper strips are divided into thirds and sixths. Colour one third and the matching two sixths. Explain why their lengths are equal.','Shade 1/3 and 2/6.','🎨',[1,3],[2,6])],
      [P('B1.6','Bonus: eight strips for three','Three students share eight identical poster strips. Give two whole strips to each. Cut the two leftovers into thirds.','How much does each get?','📏',8,3,['2 2/3 each','2 1/3 each','3 each'],'2 2/3 each','fraction','📏'),C('B1.5','Bonus: pair name tags','The fair printed 192 name tags. Students put them in pairs. Use the final digit to decide if one tag remains.','Is 192 even or odd?','🏷️ 192',['Even','Odd'],'Even')]
    ],
    Inspire:[
      [B('B1.1 · B1.5','Bonus: build the card count','A maker table needs 654 instruction cards. A volunteer checks the inventory with base-ten blocks. Build six hundreds, five tens, and four ones.','Show 654.','🃏',654,[6,5,4]),C('B1.5','Bonus: trade ten tens','A student models five hundreds, twelve tens, and four ones. Ten tens trade for one more hundred. Read the unchanged total.','What number is represented?','🧱 5 hundreds + 12 tens + 4 ones',['524','624','724'],'624')],
      [S('B1.4','Bonus: count by two hundred','The transit office counts 200, 400, and 600 maps. Each full box adds 200. One more box is opened.','What total comes next?','🗺️ 200 → 400 → 600 → ?',0,1000,200,800),C('B1.4','Bonus: identify the jump','A station log shows 650, 700, 750, and 800 tickets. Every count increases by the same amount. Identify the step.','How much is added each time?','🎟️ 650 → 700 → 750 → 800',['50','100','200'],'50')],
      [R('B1.3','Bonus: round paper pieces','A volunteer counted 671 paper pieces. A quick supply note uses the nearest ten. Compare 671 with 670 and 680.','Round 671 to the nearest ten.','📄',671,10,670),R('B1.3','Bonus: round the same count','The exact count is still 671 paper pieces. This time the plan uses the nearest hundred. Compare 671 with 600 and 700.','Round 671 to the nearest hundred.','📄',671,100,700)],
      [P('B1.6','Bonus: fifteen plans for eight','Eight students share fifteen identical paper plans. Give one whole plan to each. Cut the seven extra plans into eighths.','How much does each get?','📄',15,8,['1 7/8 each','1 1/8 each','2 each'],'1 7/8 each','fraction','📄'),F('B1.7','Bonus: fourths and eighths','Two equal paper strips are divided into fourths and eighths. Two fourths cover the same length as four eighths. Colour both versions.','Shade 2/4 and 4/8.','📏',[2,4],[4,8])],
      [F('B1.7','Bonus: three fifths and six tenths','Two equal art strips are divided into fifths and tenths. Colour three fifths and the matching six tenths. Compare the coloured lengths.','Shade 3/5 and 6/10.','🎨',[3,5],[6,10]),P('B1.6','Bonus: eighteen cards for eight','Eight students share eighteen identical display cards. Give two whole cards to each. Cut the two extras into eighths.','How much does each get?','🃏',18,8,['2 1/4 each','2 1/8 each','3 each'],'2 1/4 each','fraction','🃏')]
    ]
  };
  Object.entries(schoolBonus).forEach(([name,extraDays])=>extraDays.forEach((extra,index)=>{
    window.STARLIGHT_DATA[name].weeks[2].school[index].missions.push(...extra.map(m=>Object.assign(m,{bonus:true})));
  }));
  // Curated everyday settings keep the extra practice tied to a purpose, not bare numbers.
  const practiceScenes={
    Pathway:[
      [['garden club','seed packets','🌱','tray','planting day','paper seed cards'],['library','bookmarks','🔖','basket','the reading display','paper bookmarks'],['bike-parade team','helmet stickers','🚲','box','the parade','paper route cards'],['picnic group','napkins','🧺','basket','the class picnic','whole paper snack tickets'],['art-wall team','paper stars','⭐','tray','the class display','equal paper flags']],
      [['post-office team','postcards','📮','tray','the delivery game','whole paper stamps'],['playground team','game tokens','🛝','box','the playground game','whole paper game tickets'],['garden helpers','plant tags','🪴','tray','planting rows','paper plant cards'],['craft-table team','paper clips','📎','box','the class craft','whole paper shapes'],['flag-gallery team','paper flags','🚩','tray','the flag display','equal paper flags']]
    ],
    Excite:[
      [['bike-safety team','safety tags','🚲','box','the bike-safety event','identical paper safety posters'],['food-drive volunteers','cans','🥫','crate','the pantry delivery','identical paper food labels'],['school-festival team','tickets','🎟️','packet','the school festival','identical paper ticket sheets'],['art-table team','display cards','🎨','tray','the art show','identical paper art sheets'],['community-fair team','welcome cards','🎪','box','the community fair','identical paper banners']],
      [['library helpers','books','📚','cart','the library display','identical paper bookmarks'],['food-drive team','cans','🥫','crate','the pantry delivery','identical paper food labels'],['festival helpers','tickets','🎟️','packet','the school festival','identical paper ticket sheets'],['art students','display cards','🎨','tray','the art wall','identical paper art sheets'],['community-fair helpers','name tags','🏷️','box','the welcome table','identical paper banners']]
    ],
    Inspire:[
      [['maker-fair team','construction pieces','🧰','box','the maker fair','identical paper plans'],['transit-map team','route cards','🗺️','packet','the class map project','identical paper maps'],['event planners','visitor badges','🏷️','box','the school event','identical paper signs'],['garden club','seed labels','🌱','tray','the planting plan','identical paper garden plans'],['design-gallery team','photo prints','🖼️','box','the gallery display','identical paper strips']],
      [['maker-fair helpers','instruction cards','🧰','box','the maker fair','identical paper plans'],['transit-office team','travel cards','🚉','packet','the transit display','identical paper maps'],['fair planners','visitor badges','🏷️','box','the next school fair','identical paper signs'],['garden-club helpers','plant labels','🪴','tray','the garden exhibit','identical paper garden plans'],['gallery team','art cards','🖼️','box','the design gallery','identical paper strips']]
    ]
  };
  function gcd(a,b){while(b){const next=a%b;a=b;b=next;}return a;}
  function fairAmount(items,sharers){const whole=Math.floor(items/sharers),remainder=items%sharers;if(!remainder)return whole+' each';const divisor=gcd(remainder,sharers),part=(remainder/divisor)+'/'+(sharers/divisor);return (whole?whole+' ':'')+part+' each';}
  function practiceMission(name,scene,week,day,track,ordinal){
    const [place,item,icon,container,purpose,paper]=scene;
    const seed=week*317+day*71+(track==='school'?43:0)+ordinal*19;
    const grade=window.STARLIGHT_DATA[name].grade;
    const kind=(ordinal+day*2+week+(track==='school'?3:0))%(grade===1?8:7);
    if(grade===1){
      if(kind===0){const value=1+seed%50;return H('B1.1','Find '+container+' label '+value,'The '+place+' wrote '+value+' on a '+container+' for '+purpose+'. The label helps students find the right collection again. Look across the tens row, then find the ones.','Tap '+value+' on the number chart.',value);}
      if(kind===1){const value=10+seed%41;return B('B1.2','Build '+value+' '+item,'The '+place+' counted '+value+' '+item+' for '+purpose+'. A student wants to check the count with tens rods and ones cubes. Make a model that matches the collection.','Build '+value+' with tens and ones.',icon,value,[0,Math.floor(value/10),value%10]);}
      if(kind===2){const a=12+seed%35;let b=12+(seed*7+11)%35;if(a===b)b=a+1;const answer=String(Math.max(a,b));return C('B1.3','Choose the fuller '+container,'One group prepared '+a+' '+item+' and another prepared '+b+' for '+purpose+'. The fuller '+container+' needs more shelf space. Compare the tens before deciding.','Which count needs more room?',icon+' '+a+' · '+b,[String(a),String(b)],answer);}
      if(kind===3){const actual=12+seed%39;return E('B1.4','Estimate the '+item,'The '+place+' spread '+item+' on a counting mat for '+purpose+'. Make a close guess before counting each one. Reveal the groups of ten to check your estimate.','Estimate first, then verify by counting.',icon,actual,50,5);}
      if(kind===4){const step=[1,2,5,10][seed%4],maximum=Math.floor(50/step),answer=step*(4+seed%(maximum-3));return S('B1.5','Count another group of '+step,'The '+place+' adds '+step+' '+item+' in each round for '+purpose+'. The running totals are '+(answer-3*step)+', '+(answer-2*step)+', and '+(answer-step)+'. One more round is ready.','What is the next total?',icon+' '+(answer-3*step)+' → '+(answer-2*step)+' → '+(answer-step)+' → ?',0,50,step,answer);}
      if(kind===5){const sharers=seed%2?2:4,whole=1+seed%3,remainder=sharers===2?1:1+Math.floor(seed/2)%2,items=whole*sharers+remainder,answer=whole+' each, '+remainder+' left';return P('B1.6','Share '+items+' whole cards','The '+place+' has '+items+' '+paper+' for '+purpose+'. '+sharers+' students take turns getting one whole card each. Leave any extras in the bank so the shares stay equal.','How many whole cards does each student get?',icon,items,sharers,[answer,(whole+1)+' each, '+remainder+' left',whole+' each, '+(remainder===1?2:1)+' left'],answer,'leftover',icon);}
      if(kind===6){if(seed%2)return F('B1.7','Show the same half twice','The '+place+' made two equal-sized '+paper+' for '+purpose+'. One is divided into halves and the other into fourths. Colour the same area on both.','Shade 1/2 and 2/4.',icon,[1,2],[2,4]);return C('B1.7','Find the matching fourths','Two equal-sized '+paper+' are ready for '+purpose+'. A student colours one half of the first. Count how many fourths match that area on the second.','How many fourths equal one half?',icon+' 1/2 = ?/4',['1 fourth','2 fourths','3 fourths'],'2 fourths');}
      const pair=[[2,4],[3,6],[4,8],[5,10],[2,7],[3,9]][seed%6];return FC('B1.8','Compare one fair share','The '+place+' cuts two equal-sized '+paper+' for different groups. One is shared among '+pair[0]+' students and one among '+pair[1]+'. Each student gets one equal piece.','Which single piece is larger?',icon,[1,pair[0]],[1,pair[1]],['1/'+pair[0],'1/'+pair[1]],'1/'+pair[0]);
    }
    if(grade===2){
      if(kind===0){const value=100+seed%101;return B('B1.1','Check the '+value+' label','The '+place+' counted '+value+' '+item+' for '+purpose+'. A volunteer needs a block model to check the '+container+' label. Use hundreds, tens, and ones.','Build '+value+'.',icon,value,[Math.floor(value/100),Math.floor(value/10)%10,value%10]);}
      if(kind===1){if(seed%2){const base=100+seed%61,values=[base,base+7,base+24,base+39],cards=[values[2],values[0],values[3],values[1]].map(String);return O('B1.2','Order four '+container+' labels','Four '+container+' labels show '+values.join(', ')+'. The '+place+' wants them in number order for '+purpose+'. Compare hundreds, then tens and ones.','Place the labels from least to greatest.',icon+' '+values.join(' · '),cards,values.map(String));}const a=100+seed%91;let b=100+(seed*7+23)%91;if(a===b)b=a+1;return C('B1.2','Choose the larger collection','Two helpers counted '+a+' and '+b+' '+item+' for '+purpose+'. The larger collection needs a bigger '+container+'. Compare the numbers by place value.','Which count is larger?',icon+' '+a+' · '+b,[String(a),String(b)],String(Math.max(a,b)));}
      if(kind===2){const actual=50+seed%151;return E('B1.3','Estimate the '+container+' count','The '+place+' filled a '+container+' with '+item+' for '+purpose+'. Make a sensible estimate before revealing the grouped collection. Count the hundreds, tens, and ones to verify.','Estimate, then check the count.',icon,actual,200,18);}
      if(kind===3){const step=[20,25,50][seed%3],maximum=Math.floor(200/step),answer=step*(3+seed%(maximum-2));return S('B1.4','Count packs of '+step,'The '+place+' puts '+step+' '+item+' in each pack for '+purpose+'. The totals are '+(answer-3*step)+', '+(answer-2*step)+', and '+(answer-step)+'. Another full pack arrives.','What is the next total?',icon+' '+(answer-3*step)+' → '+(answer-2*step)+' → '+(answer-step)+' → ?',0,200,step,answer);}
      if(kind===4){const value=100+seed%101,answer=value%2?'Odd':'Even';return C('B1.5','Can the '+item+' be paired?','The '+place+' has '+value+' '+item+' for '+purpose+'. Two volunteers place them in pairs. Use the ones digit to decide if one is left without a partner.','Is '+value+' even or odd?',icon+' '+value,['Even','Odd'],answer);}
      if(kind===5){const sharers=[2,3,4,6][seed%4],items=4+seed%7,answer=fairAmount(items,sharers);return P('B1.6','Share '+items+' paper pieces','The '+place+' has '+items+' '+paper+' for '+purpose+'. '+sharers+' students share the whole pieces fairly first. If pieces remain, cut each extra into '+sharers+' equal parts.','How much does each student get?',icon,items,sharers,[answer,fairAmount(items+1,sharers),fairAmount(items+sharers,sharers)],answer,'fraction','📄');}
      if(seed%2)return F('B1.7','Match thirds and sixths','The '+place+' prepares two equal '+paper+' for '+purpose+'. One is marked in thirds and the other in sixths. Colour matching lengths to show the equivalence.','Shade 1/3 and 2/6.',icon,[1,3],[2,6]);return C('B1.7','How many sixths match?','Two equal '+paper+' are divided into thirds and sixths for '+purpose+'. A student colours one third. Find the matching number of sixths.','How many sixths equal one third?',icon+' 1/3 = ?/6',['1 sixth','2 sixths','3 sixths'],'2 sixths');
    }
    if(kind===0){const value=100+seed%901;return B('B1.1','Record '+value+' '+item,'The '+place+' counted '+value+' '+item+' for '+purpose+'. A helper needs an exact base-ten model for the record. Build the count using hundreds, tens, and ones.','Build '+value+'.',icon,value,[Math.floor(value/100),Math.floor(value/10)%10,value%10]);}
    if(kind===1){if(seed%2){const base=300+seed%500,values=[base,base+11,base+34,base+58],cards=[values[2],values[0],values[3],values[1]].map(String);return O('B1.2','Order four inventory labels','Four '+container+' labels read '+values.join(', ')+'. The '+place+' puts them in increasing order for '+purpose+'. Compare hundreds, tens, and ones.','Order the labels from least to greatest.',icon+' '+values.join(' · '),cards,values.map(String));}const a=200+seed%701;let b=200+(seed*7+43)%701;if(a===b)b=a+1;return C('B1.2','Choose the larger inventory','Two teams counted '+a+' and '+b+' '+item+' for '+purpose+'. The larger inventory needs more storage space. Compare hundreds, then tens, then ones.','Which count is larger?',icon+' '+a+' · '+b,[String(a),String(b)],String(Math.max(a,b)));}
    if(kind===2){const value=110+seed%881,unit=seed%2?10:100,answer=Math.floor((value+unit/2)/unit)*unit;return R('B1.3','Round the planning count','The '+place+' recorded '+value+' '+item+' exactly for '+purpose+'. A quick plan uses the nearest '+(unit===10?'ten':'hundred')+'. Use the number line to choose the closer endpoint.','Round '+value+' to the nearest '+(unit===10?'ten':'hundred')+'.',icon,value,unit,answer);}
    if(kind===3){const step=[50,100,200][seed%3],maximum=Math.floor(1000/step),answer=step*(3+seed%(maximum-2));return S('B1.4','Count groups of '+step,'The '+place+' counts full packs of '+step+' '+item+' for '+purpose+'. The totals are '+(answer-3*step)+', '+(answer-2*step)+', and '+(answer-step)+'. Another full pack is counted.','What total comes next?',icon+' '+(answer-3*step)+' → '+(answer-2*step)+' → '+(answer-step)+' → ?',0,1000,step,answer);}
    if(kind===4){const value=200+seed%700,hundreds=Math.floor(value/100),tens=Math.floor(value/10)%10,ones=value%10;return C('B1.5','Trade a hundred for tens','The '+place+' models '+value+' '+item+' for '+purpose+'. A student trades one hundred flat for ten tens rods. The total does not change after the trade.','What total do '+(hundreds-1)+' hundreds, '+(tens+10)+' tens, and '+ones+' ones show?',icon+' '+(hundreds-1)+' hundreds + '+(tens+10)+' tens + '+ones+' ones',[String(value),String(value-100),String(value+100)],String(value));}
    if(kind===5){const sharers=[2,3,4,5,6,8,10][seed%7],items=7+seed%14,answer=fairAmount(items,sharers);return P('B1.6','Share '+items+' paper pieces','The '+place+' has '+items+' '+paper+' for '+purpose+'. '+sharers+' students share the whole pieces first. They cut any leftovers into '+sharers+' equal parts so every share matches.','How much does each student get?',icon,items,sharers,[answer,fairAmount(items+1,sharers),fairAmount(items+sharers,sharers)],answer,'fraction','📄');}
    const pairs=[[[1,2],[4,8]],[[1,3],[2,6]],[[2,5],[4,10]],[[3,4],[6,8]],[[3,5],[6,10]]],pair=pairs[seed%pairs.length];if(seed%2)return F('B1.7','Show equivalent shares','The '+place+' uses two equal '+paper+' for '+purpose+'. They are cut into different numbers of equal parts. Colour the same length on both to prove the fractions match.','Shade '+pair[0].join('/')+' and '+pair[1].join('/')+'.',icon,pair[0],pair[1]);return C('B1.7','Name the matching fraction','Two equal '+paper+' are cut into '+pair[0][1]+' and '+pair[1][1]+' parts for '+purpose+'. A student colours '+pair[0].join('/')+' of one. Find the equal amount on the other.','Which fraction matches '+pair[0].join('/')+'?',icon+' '+pair[0].join('/')+' = ?',[pair[1].join('/'),(pair[1][0]-1)+'/'+pair[1][1],(pair[1][0]+1)+'/'+pair[1][1]],pair[1].join('/'));
  }
  for(const [name,course] of Object.entries(window.STARLIGHT_DATA))for(const week of [1,2])for(const track of ['home','school'])course.weeks[week][track].forEach((day,index)=>{
    const scene=practiceScenes[name][week-1][index],target=track==='home'?15:35;
    while(day.missions.length<target){const mission=practiceMission(name,scene,week,index,track,day.missions.length);if(track==='school'&&day.missions.length>=10)mission.bonus=true;day.missions.push(mission);}
  });
  // Every regrouped place-value question has a countable base-ten model.
  for(const course of Object.values(window.STARLIGHT_DATA))for(const week of [1,2])for(const track of ['home','school'])for(const day of course.weeks[week][track])for(const mission of day.missions){
    if(mission.type!=='choice'||!mission.code.split(' · ').includes('B1.5'))continue;
    const parts=(mission.visual||'').match(/(\d+) hundreds \+ (\d+) tens \+ (\d+) ones/);
    if(!parts)continue;
    const blocks=parts.slice(1).map(Number);
    if(blocks[0]*100+blocks[1]*10+blocks[2]!==Number(mission.answer))throw new Error('Regrouping blocks do not match '+mission.title);
    mission.blocks=blocks;
  }
  // This edition focuses on whole numbers and whole-item sharing.
  function wholeShareMission(grade,scene,seed){
    const [place,,,,purpose]=scene;
    const pairs=grade===2?[[6,2],[6,3],[8,4],[9,3],[10,2],[6,6]]:[[12,2],[12,3],[16,4],[15,5],[18,6],[16,8],[20,10]];
    const [items,sharers]=pairs[seed%pairs.length],each=items/sharers,answer=each+' each, 0 left';
    return P('B1.6','Share '+items+' whole cards','The '+place+' made '+items+' paper cards for '+purpose+'. '+sharers+' students each need a fair set. Deal one card at a time until the bank is empty.','How many whole cards does each student get?','🃏',items,sharers,[answer,(each+1)+' each, 0 left',each+' each, 1 left'],answer,'leftover','🃏');
  }
  function wholeNumberMission(grade,scene,seed){
    const [place,item,icon,container,purpose]=scene,kind=seed%5;
    if(grade===1){
      const value=12+seed%39;
      if(kind===0)return B('B1.2','Build '+value+' '+item,'The '+place+' counted '+value+' '+item+' for '+purpose+'. A partner wants to check the count. Use tens rods and ones cubes to show the exact number.','Build '+value+' with tens and ones.',icon,value,[0,Math.floor(value/10),value%10]);
      if(kind===1){const other=value===50?49:value+1;return C('B1.3','Choose the larger '+container,'The '+place+' has one '+container+' with '+value+' '+item+' and another with '+other+'. They need the larger count for '+purpose+'. Compare the tens and ones to decide.','Which count is larger?',icon+' '+value+' · '+other,[String(value),String(other)],String(Math.max(value,other)));}
      if(kind===2)return H('B1.1','Find label '+value,'The '+place+' wrote '+value+' on a '+container+'. This label helps the class find '+item+' for '+purpose+'. Look at the tens row, then find the ones.','Tap '+value+' on the number chart.',value);
      if(kind===3){const answer=2*(6+seed%19);return S('B1.5','Count another pair','The '+place+' puts '+item+' into pairs for '+purpose+'. The running totals are '+(answer-4)+', '+(answer-2)+', and then one more pair. Count on by twos.','What total comes next?',icon+' '+(answer-4)+' → '+(answer-2)+' → ?',0,50,2,answer);}
      return E('B1.4','Estimate the '+item,'The '+place+' spread '+item+' on a mat for '+purpose+'. Make a close guess before counting. Then reveal the groups and check your guess.','Estimate first, then verify by counting.',icon,value,50,5);
    }
    if(grade===2){
      const value=100+seed%101;
      if(kind===0)return B('B1.1','Build the '+value+' label','The '+place+' counted '+value+' '+item+' for '+purpose+'. A student wrote the count on a '+container+'. Use hundreds, tens, and ones to check the label.','Build '+value+'.',icon,value,[Math.floor(value/100),Math.floor(value/10)%10,value%10]);
      if(kind===1){const other=value===200?199:value+1;return C('B1.2','Choose the larger count','The '+place+' has two collections of '+item+' for '+purpose+'. One has '+value+' and the other has '+other+'. Compare their place values before choosing the larger collection.','Which count is larger?',icon+' '+value+' · '+other,[String(value),String(other)],String(Math.max(value,other)));}
      if(kind===2)return E('B1.3','Estimate the '+item,'The '+place+' filled a '+container+' with '+item+' for '+purpose+'. Make a sensible estimate before revealing the groups. Count the groups to check your guess.','Estimate first, then verify.',icon,value,200,18);
      if(kind===3){const answer=25*(3+seed%6);return S('B1.4','Count packs of twenty-five','The '+place+' puts 25 '+item+' in each pack for '+purpose+'. The totals are '+(answer-50)+', '+(answer-25)+', and then one more pack. Count on by twenty-fives.','What is the next total?',icon+' '+(answer-50)+' → '+(answer-25)+' → ?',0,200,25,answer);}
      return C('B1.5','Can the items be paired?','The '+place+' has '+value+' '+item+' for '+purpose+'. Two helpers make pairs. Use the ones digit to decide whether one item has no partner.','Is '+value+' even or odd?',icon+' '+value,['Even','Odd'],value%2?'Odd':'Even');
    }
    const value=210+seed%690;
    if(kind===0)return B('B1.5','Build the '+value+' count','The '+place+' counted '+value+' '+item+' for '+purpose+'. A helper needs an exact inventory model. Build the hundreds, tens, and ones.','Build '+value+'.',icon,value,[Math.floor(value/100),Math.floor(value/10)%10,value%10]);
    if(kind===1){const other=value+1;return C('B1.2','Choose the larger inventory','The '+place+' counted two collections of '+item+' for '+purpose+'. Their labels read '+value+' and '+other+'. Compare the hundreds, tens, and ones before choosing.','Which label is larger?',icon+' '+value+' · '+other,[String(value),String(other)],String(other));}
    if(kind===2){const unit=seed%2?10:100,answer=Math.floor((value+unit/2)/unit)*unit;return R('B1.3','Round the planning count','The '+place+' counted '+value+' '+item+' exactly for '+purpose+'. A quick plan can use a nearby '+(unit===10?'ten':'hundred')+'. Look at the number line to choose the closer endpoint.','Round '+value+' to the nearest '+(unit===10?'ten':'hundred')+'.',icon,value,unit,answer);}
    if(kind===3){const answer=50*(6+seed%15);return S('B1.4','Count fifty more','The '+place+' counts packs of 50 '+item+' for '+purpose+'. The totals are '+(answer-100)+', '+(answer-50)+', and then one more pack. Count on by fifties.','What total comes next?',icon+' '+(answer-100)+' → '+(answer-50)+' → ?',0,1000,50,answer);}
    return C('B1.1','Read the place-value label','The '+place+' labelled a '+container+' for '+purpose+'. The count has '+Math.floor(value/100)+' hundreds, '+(Math.floor(value/10)%10)+' tens, and '+value%10+' ones. Use the pieces to choose the matching number.','What number is on the label?',icon+' '+Math.floor(value/100)+' hundreds · '+(Math.floor(value/10)%10)+' tens · '+value%10+' ones',[String(value),String(value-100),String(value+100)],String(value));
  }
  const fractionWords=/fraction|halves|half\b|fourths|eighths|thirds|sixths|fifths|tenths|\d+\/\d+|equal-sized strips|fractional/i;
  for(const [name,course] of Object.entries(window.STARLIGHT_DATA)){
    delete course.expectations['B1.7'];delete course.expectations['B1.8'];
    if(course.grade>1)course.expectations['B1.6']='Practice fair sharing with whole items among the grade-level groups of students.';
    course.scopeNote='This edition practises whole-number skills and whole-item sharing.';
    for(const week of [1,2])for(const track of ['home','school'])course.weeks[week][track].forEach((day,dayIndex)=>{
      const scene=practiceScenes[name][week-1][dayIndex];
      day.missions=day.missions.map((mission,index)=>{
        const seed=week*1000+dayIndex*100+index*17+(track==='school'?37:0),removedCode=mission.code.split(' · ').some(code=>!course.expectations[code]);
        let replacement=mission;
        if(mission.type==='share'&&course.grade>1)replacement=wholeShareMission(course.grade,scene,seed);
        else if(removedCode||['shade','fractionCompare'].includes(mission.type)||fractionWords.test([mission.title,mission.story,mission.prompt,mission.visual||''].join(' ')))replacement=wholeNumberMission(course.grade,scene,seed);
        if(replacement.blocks)replacement.screenStory='The '+scene[0]+' is checking '+scene[1]+' for '+scene[4]+'. These blocks show the count another way.';
        if(mission.bonus)replacement.bonus=true;
        return replacement;
      });
      if(fractionWords.test([day.title,day.focus,day.intro,day.handsOn,day.warmup||''].join(' '))){
        const [place,item,icon,,purpose]=scene;
        day.title=(course.grade===1?'Class number gallery':course.grade===2?'Number and sharing lab':'Place-value design lab');
        day.focus='Build, compare, count, and share whole items';
        day.intro='The '+place+' is getting ready for '+purpose+'. Students count '+item+', compare labels, and show their thinking with blocks. Explain how you know your answer.';
        day.handsOn='Draw a place-value model for a number you see today. Then tell a partner how you checked it.';
        if(day.warmup)day.warmup='Count a small set of '+item+' together. Show the same count with a drawing and a spoken number. Ask a partner to explain how the groups helped.';
      }
    });
    for(const track of ['home','school']){
      const holiday=course.weeks[2][track][0];
      holiday.holiday=true;
      holiday.title='Thanksgiving - no assignment';
      holiday.focus='No assignment on Monday';
      holiday.missions=[];
    }
  }
  // Make every active question an action with numbers. The B1 code still names
  // the number-sense skill being practised (model, compare, count, share, etc.).
  function moveFor(total,grade,seed){
    const range=grade===1?50:grade===2?200:1000;
    const minimum=grade===1?2:grade===2?12:25;
    const spread=grade===1?7:grade===2?40:126;
    const change=Math.max(1,Math.min(total||minimum,minimum+seed%spread));
    if(seed%3===1&&total+change<=range)return {start:total+change,change,sign:'-',formula:(total+change)+' - '+change};
    return {start:total-change,change,sign:'+',formula:(total-change)+' + '+change};
  }
  function movedStory(scene,move){
    const [place,item,,container,purpose]=scene;
    return `The ${place} had ${move.start} ${item} for ${purpose}. `+
      (move.sign==='+'?`${move.change} more arrived. `:`They used ${move.change}. `)+
      `Work out the new count before labelling the ${container}.`;
  }
  function numericChoices(value,range){
    return [...new Set([value,value-100,value+100,value-10,value+10,value-1,value+1]
      .filter(n=>n>=0&&n<=range))].slice(0,3).map(String);
  }
  function operationalChoice(m,grade,scene,seed){
    const [place,item,icon,container,purpose]=scene;
    const code=m.code.split(' · ')[0],numeric=/^\d+$/.test(String(m.answer));
    if(grade===3&&code==='B1.5'){
      const listed=String(m.visual||'').match(/(\d+) hundreds \+ (\d+) tens \+ (\d+) ones/);
      const count=numeric?Number(m.answer):listed?Number(listed[1])*100+Number(listed[2])*10+Number(listed[3]):Number((m.visual+' '+m.story).match(/\b\d{3,4}\b/)?.[0]);
      if(!Number.isInteger(count)||count<100||count>1000)throw new Error('Cannot model place-value total: '+m.title);
      m.blocks=m.blocks||[Math.floor(count/100)-1,Math.floor(count/10)%10+10,count%10];
      const [hundreds,tens,ones]=m.blocks;
      m.answer=String(count);m.options=numericChoices(count,1000);
      m.title='Trade blocks for the '+item+' total';
      m.story=`The ${place} models ${item} for ${purpose}. The model has ${hundreds} hundred flats, ${tens} ten rods, and ${ones} unit cubes. Trade ten rods for one flat, then add the place values to find the total.`;
      m.screenStory='Count the blocks for the new total. Trade ten rods for one flat if it helps.';
      m.prompt='What total do the blocks show? Make a trade and choose the number.';
      m.visual=`${icon} ${hundreds} hundreds + ${tens} tens + ${ones} ones`;
      m.operation=`${hundreds} x 100 + ${tens} x 10 + ${ones} = ?`;
      return;
    }
    if(numeric&&((grade===1&&code==='B1.3')||(grade===2&&code==='B1.2')||(grade===3&&code==='B1.2'))){
      const larger=Number(m.answer),smaller=Math.max(0,larger-(grade===1?2+seed%8:grade===2?7+seed%26:15+seed%85));
      const firstLarger=seed%2===0,a=firstLarger?larger:smaller,b=firstLarger?smaller:larger;
      const aMove=moveFor(a,grade,seed+1),bMove=moveFor(b,grade,seed+2);
      m.title='Which team has more '+item+'?';
      m.story=`Two teams prepared ${item} for ${purpose}. Team A started with ${aMove.start} and ${aMove.sign==='+'?'received':'used'} ${aMove.change}; Team B started with ${bMove.start} and ${bMove.sign==='+'?'received':'used'} ${bMove.change}. Work out both final counts before choosing the fuller ${container}.`;
      m.prompt='Calculate both totals. Which team has more '+item+' now?';
      m.visual=icon;m.operation=`Team A: ${aMove.formula} = ? | Team B: ${bMove.formula} = ?`;
      m.options=['Team A','Team B'];m.answer=firstLarger?'Team A':'Team B';
      m.answerGuide=`${m.answer} (${larger} compared with ${smaller})`;
      return;
    }
    if(grade===2&&code==='B1.5'){
      const count=Number((m.visual+' '+m.story).match(/\b\d{2,3}\b/)?.[0]);
      if(!Number.isInteger(count)||count>200)throw new Error('Cannot pair count: '+m.title);
      const move=moveFor(count,grade,seed);
      m.title='Add, then make pairs';m.story=`The ${place} had ${move.start} ${item} for ${purpose}. ${move.change} ${move.sign==='+'?'more arrived':'were used'}. Find the new total, then pair the items to see whether one is left over.`;
      m.prompt=m.options.includes('Even')?'Calculate the new total. Is it even or odd?':'Calculate and pair the new total. Which explanation fits?';
      m.visual=icon;m.operation=`${move.formula} = ?; then make groups of 2`;
      return;
    }
    if(code==='B1.4'&&grade>=2){
      const jump=String(m.answer).match(/^(\d+) jumps?$/);
      const packs=String(m.answer).match(/^(\d+) packs?$/);
      const step=/200/.test(String(m.answer))?200:jump?grade===3?50:25:numeric?Number(m.answer):25;
      if(jump||packs){const groups=Number((jump||packs)[1]),size=packs?25:step,total=groups*size;
        m.title='How many groups?';m.story=`The ${place} has ${total} ${item} for ${purpose}. They make equal groups of ${size}. Divide the total by one group's size to find how many full groups they can make.`;
        m.prompt='How many full groups are there?';m.operation=`${total} / ${size} = ?`;m.visual=icon;return;}
      if(numeric){const start=grade===2?75:400,end=start+step;
        m.title='Find the size of one jump';m.story=`The ${place} counted ${start} ${item}, then ${end} after one equal group arrived for ${purpose}. Subtract the earlier total from the later total. That difference is the size of one group.`;
        m.prompt='How many items were in the new group?';m.operation=`${end} - ${start} = ?`;m.visual=icon;return;}
      m.title='Find the counting rule';m.story=`The ${place} counted ${step}, ${step*2}, and ${step*3} ${item} for ${purpose}. Find the difference between neighbouring totals. Choose the rule for every jump.`;
      m.prompt='Which counting rule matches the jumps?';m.operation=`${step*2} - ${step} = ?`;m.visual=icon;return;
    }
    if(grade===3&&code==='B1.3'){
      const value=Number((m.visual+' '+m.story).match(/\b\d{3}\b/)?.[0]),unit=/hundred/i.test(m.prompt)?100:10;
      if(!Number.isInteger(value))throw new Error('Cannot round choice: '+m.title);
      const low=Math.floor(value/unit)*unit,high=low+unit;
      m.operation=`${value} - ${low} = ? | ${high} - ${value} = ?`;
      m.prompt='Find both distances, then choose the closer rounded total.';return;
    }
    if(numeric){
      const total=Number(m.answer),move=moveFor(total,grade,seed);
      m.title='Find the new '+item+' total';m.story=movedStory(scene,move);
      m.prompt='Calculate the new total, then choose it.';m.visual=icon;m.operation=move.formula+' = ?';return;
    }
    const models=String(m.answer).match(/(\d+) hundred[s]?,?\s*(\d+) ten[s]?,?\s*(?:and )?(\d+) one[s]?|(?:(\d+) ten[s]? and (\d+) one[s]?)/i);
    if(models){
      const h=Number(models[1]||0),t=Number(models[2]||models[4]||0),o=Number(models[3]||models[5]||0);
      m.title='Combine the place-value parts';
      m.story=`The ${place} grouped ${item} for ${purpose}. There are ${h} hundred flats, ${t} ten rods, and ${o} unit cubes. Add those place values before choosing the matching model.`;
      m.prompt='What model shows the total after you combine the parts?';
      m.visual=icon;m.operation=`${h} x 100 + ${t} x 10 + ${o} = ?`;return;
    }
    throw new Error('Question needs an operation: '+m.title+' / '+m.answer);
  }
  for(const [name,course] of Object.entries(window.STARLIGHT_DATA))for(const week of [1,2])for(const track of ['home','school'])course.weeks[week][track].forEach((day,dayIndex)=>{
    if(day.holiday)return;
    const scene=practiceScenes[name][week-1][dayIndex];
    day.missions.forEach((m,index)=>{
      const seed=course.grade*100000+week*10000+dayIndex*1000+(track==='school'?500:0)+index*19;
      if(m.type==='chart'||m.type==='build'){
        const total=m.type==='chart'?m.target:m.target,move=moveFor(total,course.grade,seed);
        m.title=m.type==='chart'?'Find the new count':'Build the new total of '+scene[1];
        m.story=movedStory(scene,move);
        m.prompt=m.type==='chart'?'Calculate, then tap the new total on the chart.':'Calculate, then build the new total with blocks.';
        m.operation=move.formula+' = ?';
      }else if(m.type==='estimate'){
        const first=Math.max(1,Math.min(m.actual-1,Math.floor(m.actual*(4+seed%3)/10))),second=m.actual-first;
        const container=scene[3],containers=container==='box'?'boxes':container+'s';
        m.groups=[first,second];
        m.collectionName=container.charAt(0).toUpperCase()+container.slice(1);
        m.collectionPlural=containers;
        m.title='Estimate both '+containers+' together';
        m.story=`The ${scene[0]} put ${scene[1]} into two ${containers} for ${scene[4]}. Look at both ${containers} without counting every piece, and make a close guess for the combined total. Then reveal the grouped counts to check by addition.`;
        m.prompt='About how many in both '+containers+' altogether? Estimate, then count and add.';
        m.operation=m.collectionName+' A + '+m.collectionName+' B = about ?';
        m.answerGuide=`${first} + ${second} = ${m.actual}`;
      }else if(m.type==='order'){
        const oldCards=[...m.cards],oldAnswers=[...m.answer],expressionByValue=new Map();
        oldAnswers.forEach((value,part)=>{const total=Number(value);if(!Number.isInteger(total))throw new Error('Order card is not a number: '+value);expressionByValue.set(total,moveFor(total,course.grade,seed+part*3).formula);});
        m.cards=oldCards.map(value=>expressionByValue.get(Number(value)));
        m.answer=oldAnswers.map(value=>expressionByValue.get(Number(value)));
        m.answerGuide=m.answer.map((expression,part)=>expression+' = '+oldAnswers[part]).join(' | ');
        m.title='Order the team totals';
        m.story=`Four teams prepared ${scene[1]} for ${scene[4]}. Each card shows how a team's count changed. Solve all four cards, then place the final totals from least to greatest.`;
        m.prompt='Calculate each card. Order the final totals from least to greatest.';
        m.visual=scene[2];m.operation='Solve each card before ordering.';
      }else if(m.type==='choice')operationalChoice(m,course.grade,scene,seed);
      else if(m.type==='slider')m.operation=`${m.answer-m.step} + ${m.step} = ?`;
      else if(m.type==='share')m.operation=`${m.items} / ${m.sharers} = ? each, ? left`;
      else if(m.type==='round'){
        const low=Math.floor(m.value/m.unit)*m.unit,high=low+m.unit;
        m.operation=`${m.value} - ${low} = ? | ${high} - ${m.value} = ?`;
        m.prompt='Find both distances, then choose the closer '+(m.unit===10?'ten.':'hundred.');
      }
      if(!m.operation)throw new Error('No operation on '+name+' week '+week+' '+track+' '+dayIndex+' Q'+(index+1));
    });
  });
})();

/* Strategy studio: five compensation and five full-decomposition problems on
   every active day. These are extra practice, so the original daily B1/B2
   variety and the 15-home / 35-school assigned-question sets stay intact. */
window.STARLIGHT_ADD_STRATEGY=function(){
  const data=window.STARLIGHT_DATA;
  const contexts=[
    {place:'garden club',item:'seed packets',container:'tray',goal:'prepare planting kits',icon:'🌱'},
    {place:'school library',item:'books',container:'cart',goal:'set up reading displays',icon:'📚'},
    {place:'food drive',item:'cans',container:'box',goal:'pack family food boxes',icon:'🥫'},
    {place:'art club',item:'paper stars',container:'basket',goal:'decorate the school hallway',icon:'⭐'},
    {place:'playground games team',item:'game tickets',container:'basket',goal:'welcome each class',icon:'🎟️'},
    {place:'community garden',item:'seed packets',container:'tray',goal:'plant the class garden',icon:'🪴'},
    {place:'school library',item:'returned books',container:'cart',goal:'restock the shelves',icon:'📖'},
    {place:'autumn fair',item:'activity passes',container:'box',goal:'open the game stations',icon:'🎡'},
    {place:'pumpkin vote',item:'vote cards',container:'basket',goal:'count the favourite designs',icon:'🎃'},
    {place:'school celebration',item:'treat bags',container:'box',goal:'welcome families',icon:'🎈'}
  ];
  const gradeCode={1:'B1.2 · B2.4',2:'B1.1 · B2.4',3:'B1.5 · B2.5'};
  const cap={1:50,2:100,3:1000};
  function choices(answer,limit,seed){
    const offsets=[0,seed%2?1:-1,seed%3?10:-10,seed%2?-10:10,2,-2,20,-20,-3,-4,-5,3,4,5];
    const unique=[];
    offsets.forEach(offset=>{const n=answer+offset;if(n>=0&&n<=limit&&!unique.includes(n))unique.push(n);});
    if(unique.length<4)throw new Error('Not enough strategy choices');
    const result=unique.slice(0,4).map(String),shift=seed%4;
    return [...result.slice(shift),...result.slice(0,shift)];
  }
  function addends(grade,seed,kind,practice){
    if(kind==='transfer'){
      const bases=grade===1?[18,27,36,19,28,37,29,38,17,26]:grade===2?[48,57,66,39,68,76,27,58,49,67]:[298,397,496,549,678,787,198,349,598,697];
      const first=bases[(seed+practice)%bases.length];
      const second=grade===1?4+(seed+practice*3)%7:grade===2?5+(seed+practice*7)%15:14+(seed*3+practice*11)%50;
      return [first,second];
    }
    const firsts=grade===1?[12,15,23,26,31]:grade===2?[34,47,56,62,71]:[214,328,456,507,638];
    const seconds=grade===1?[7,13,8,14,9]:grade===2?[15,28,19,27,18]:[134,215,178,246,169];
    const index=(seed+practice)%5;
    return [firsts[index],seconds[(index+practice)%5]];
  }
  function transfer(grade,context,seed,practice){
    const [first,second]=addends(grade,seed,'transfer',practice),answer=first+second;
    const friendlyUnit=grade===3&&practice%2===0&&first%100>=90&&second>=100-first%100?100:10;
    return {type:'transfer',code:gradeCode[grade],title:'Make a friendly number',
      story:`The ${context.place} has ${first} ${context.item} in one ${context.container} and ${second} in another. The helpers need the combined count to ${context.goal}. They can move items between the two ${context.container}s without changing how many there are altogether.`,
      prompt:`Move blocks from either side to make a friendly ${friendlyUnit===100?'hundred':'ten'}. Then find the total in both ${context.container}s.`,
      operation:`${first} + ${second} = ?`,visual:context.icon,addends:[first,second],friendlyUnit,
      options:choices(answer,cap[grade],seed+practice),answer:String(answer),
      answerGuide:`${first} + ${second} = ${answer}; move blocks to make a friendly ${friendlyUnit===100?'hundred':'ten'} without changing the total.`,bonus:true,strategyPractice:true};
  }
  function decompose(grade,context,seed,practice){
    const [first,second]=addends(grade,seed,'decompose',practice),answer=first+second;
    return {type:'decompose',code:gradeCode[grade],title:'Break apart both numbers',
      story:`The ${context.place} has ${first} ${context.item} in one ${context.container} and ${second} in another. Before the helpers ${context.goal}, they must find the exact count in both ${context.container}s.`,
      prompt:'Break apart each number into place values. Add the hundreds, tens, and ones, then find the total.',
      operation:`${first} + ${second} = ?`,visual:context.icon,addends:[first,second],
      options:choices(answer,cap[grade],seed+practice+8),answer:String(answer),
      answerGuide:`${first} + ${second} = ${answer}; decompose both addends and add matching place values.`,bonus:true,strategyPractice:true};
  }
  function rounding(context,seed,practice){
    const unit=practice%2===0?10:100,base=unit===10?240+(seed*23+practice*17)%590:200+(seed*31+practice*47)%600;
    const low=Math.floor(base/unit)*unit,offset=unit===10?2+(seed+practice)%7:15+(seed*7+practice*13)%71;
    const value=low+offset,answer=Math.round(value/unit)*unit;
    return {type:'round',code:'B1.3',title:unit===10?'Round to the nearest ten':'Round to the nearest hundred',
      story:`The ${context.place} counted ${value} ${context.item} for ${context.goal}. A helper needs a quick approximate count for the planning board, not an exact count.`,
      prompt:`About how many ${context.item} is that to the nearest ${unit}? Choose the closer ${unit===10?'ten':'hundred'}.`,
      operation:`${value} − ${low} = ? | ${low+unit} − ${value} = ?`,visual:context.icon,
      value,unit,answer,answerGuide:`${value} rounds to ${answer} to the nearest ${unit}.`,bonus:true,strategyPractice:true};
  }
  function orderNumbers(grade,context,seed){
    const start=grade===1?12+(seed*3)%21:grade===2?58+(seed*7)%80:322+(seed*37)%430;
    const sorted=[start,start+3,start+7,start+11],cards=[sorted[2],sorted[0],sorted[3],sorted[1]].map(String);
    return {type:'order',code:grade===1?'B1.3':'B1.2',title:'Order the four groups',
      story:`Four helpers at the ${context.place} counted ${context.item} in separate ${context.container}s. They want to start with the smallest group and finish with the largest, so the counts need to be put in order.`,
      prompt:'Put the four counts in order from least to greatest. Compare place values if two numbers look close.',
      operation:'Order four counts from least to greatest.',visual:context.icon,cards,answer:sorted.map(String),
      answerGuide:sorted.join(' < '),bonus:true,strategyPractice:true};
  }
  function meanActivity(context,seed){
    const patterns=[[4,6,8,9,13],[3,6,7,8,11],[5,7,9,10,14],[2,4,6,8,10],[6,7,11,14,17]];
    const shift=Math.floor(seed/5)%4,ordered=patterns[seed%patterns.length].map(n=>n+shift);
    const values=[ordered[3],ordered[0],ordered[4],ordered[1],ordered[2]];
    const total=values.reduce((a,b)=>a+b,0),mean=total/5;
    const meanFollowUps=[
      {question:`The fullest ${context.container} has ${Math.max(...values)} ${context.item}. How many would it give away to hold the mean?`,answer:String(Math.max(...values)-mean)},
      {question:`The smallest ${context.container} has ${Math.min(...values)} ${context.item}. How many would it receive to hold the mean?`,answer:String(mean-Math.min(...values))}
    ];
    return {type:'mean',code:'D1.4',title:'Find the mean with a calculator',
      story:`Five ${context.container}s at the ${context.place} hold different numbers of ${context.item}: ${values.join(', ')}. The helpers want to know how many items each ${context.container} would hold if the total were shared equally.`,
      prompt:'Use the calculator. Add the five counts, divide by five, then explain what the mean tells the helpers.',
      operation:`(${values.join(' + ')}) ÷ 5 = ?`,visual:context.icon,values,total,mean,meanFollowUps,
      answerGuide:`Total ${total}; mean ${mean}; below ${values.filter(n=>n<mean).join(', ')}; at ${values.filter(n=>n===mean).join(', ')}; above ${values.filter(n=>n>mean).join(', ')}; fullest gives ${meanFollowUps[0].answer}; smallest receives ${meanFollowUps[1].answer}.`,bonus:true,strategyPractice:true};
  }
  function readingGraph(week,track){
    const days=week===2?['Tuesday','Wednesday','Thursday','Friday']:['Monday','Tuesday','Wednesday','Thursday','Friday'];
    const girls=days.map((_,i)=>5+((week*3+i*2+(track==='school'?1:0))%6));
    const boys=days.map((_,i)=>4+((week*2+i*3+(track==='school'?2:0))%7));
    const totals=girls.map((n,i)=>n+boys[i]);
    const firstHigh=totals.indexOf(Math.max(...totals));
    if(totals.filter(n=>n===totals[firstHigh]).length>1){girls[firstHigh]++;totals[firstHigh]++;}
    const top=totals.indexOf(Math.max(...totals)),compare=Math.min(1,days.length-1);
    return {type:'readingGraph',code:'D1.3 · D1.5',title:'Our class reading week',
      story:`The class recorded books finished by the girls' group and the boys' group after each school day. The library helper needs a graph of both groups and a second graph of the class totals to plan the next book display.`,
      prompt:'Read the tallies. Complete the paired bars and the class-total bars. Then answer the four questions using the graphs.',
      operation:'Girls + boys = class books each day; add the daily totals for the week.',visual:'📚👧🏽👦🏽',days,girls,boys,totals,
      questions:[`Which day did the class finish the most books?`,`How many books did the class finish on ${days[compare]}?`,`How many more books did one group finish than the other on ${days[compare]}?`,'How many books did the whole class finish this school week?'],
      answers:[days[top],String(totals[compare]),String(Math.abs(girls[compare]-boys[compare])),String(totals.reduce((a,b)=>a+b,0))],
      answerGuide:`Class totals: ${totals.join(', ')}; ${days[top]} had the most; weekly total ${totals.reduce((a,b)=>a+b,0)}.`,bonus:true,strategyPractice:true};
  }
  function lineCandidate(m){
    if(!['chart','slider','choice'].includes(m.type)||m.blocks)return false;
    const match=String(m.operation).trim().match(/^(\d+)\s*([+−-])\s*(\d+)\s*=\s*\?$/);
    if(!match)return false;
    const result=Number(match[1])+(match[2]==='+'?1:-1)*Number(match[3]);
    return result===Number(m.type==='chart'?m.target:m.answer);
  }
  function teamComparison(m){
    return m.type==='choice'&&m.options?.join('|')==='Team A|Team B'&&
      /^Team A:\s*\d+\s*[+−-]\s*\d+\s*=\s*\?\s*\|\s*Team B:\s*\d+\s*[+−-]\s*\d+\s*=\s*\?$/.test(String(m.operation));
  }
  for(const [name,course] of Object.entries(data))for(const week of [1,2,3,4])for(const track of ['home','school']){
    course.weeks[week][track].forEach((day,d)=>{
      if(day.holiday)return;
      const baseCount=day.missions.length,context=contexts[((week-1)*5+d)%contexts.length],seed=(week-1)*5+d+(track==='school'?37:0);
      // A jump line is one open strategy, not the default tool on every card.
      day.missions.forEach(m=>m.jumpLine=false);
      if(week<=2){
        const candidates=day.missions.map((m,i)=>lineCandidate(m)?i:-1).filter(i=>i>=0);
        const addition=candidates.find(i=>day.missions[i].operation.includes('+'));
        const subtraction=candidates.find(i=>/[−-]/.test(day.missions[i].operation));
        const selected=[addition,subtraction,...(track==='school'?[candidates.at(-1)]:[])];
        [...new Set(selected)].filter(i=>i>=0).forEach(i=>day.missions[i].jumpLine=true);
        day.missions.forEach(m=>{if(teamComparison(m))m.jumpLine=true;});
      }else{
        const firstAdd=day.missions.findIndex(m=>m.type==='string'&&m.operation.includes('+'));
        const addition=firstAdd>=0?firstAdd:day.missions.findIndex(m=>m.type==='choice'&&m.operation.includes('+'));
        const subtraction=day.missions.findIndex(m=>m.type==='slider'&&m.operation.includes('−'));
        if(addition>=0)day.missions[addition].jumpLine=true;
        if(subtraction>=0)day.missions[subtraction].jumpLine=true;
        if(name==='Inspire'&&week===4&&d===0&&track==='home')day.missions[2].jumpLine=true;
        if(track==='school')day.missions[12].jumpLine=true;
      }
      for(let practice=0;practice<5;practice++){
        day.missions.push(transfer(course.grade,context,seed,practice));
        day.missions.push(decompose(course.grade,context,seed,practice));
        if(course.grade===3)day.missions.push(rounding(context,seed,practice));
      }
      if(!day.missions.some(m=>m.type==='order'))day.missions.push(orderNumbers(course.grade,context,seed));
      if(course.grade===3){
        day.missions.push(meanActivity(context,seed));
        if(d===4)day.missions.push(readingGraph(week,track));
      }
      day.assignedCount=baseCount;
    });
  }
  Object.assign(data.Inspire.expectations,{
    'D1.3':'Display data in pictographs and bar graphs with appropriate scales, sources, titles, and labels.',
    'D1.4':'Determine the mean for whole-number data sets and explain what it indicates about the data.',
    'D1.5':'Analyse data in tables and graphs with different scales, answer questions, and draw conclusions.'
  });
};

/* October 19–30: a second fortnight of operation-rich, grade-specific work.
   The thirteen Grade 3 strings adapt the teacher-supplied Inspire math strings. */
(function(){
  const data=window.STARLIGHT_DATA;
  const topics=[
    {title:'Food-drive packing',place:'whole-school food drive',item:'cans',emoji:'🥫',goal:'fill family food boxes',unit:'box'},
    {title:'Library reading day',place:'school library',item:'books',emoji:'📚',goal:'set out the reading-day displays',unit:'cart'},
    {title:'Garden team',place:'school garden seed bank',item:'seed packets',emoji:'🌱',goal:'prepare the spring planting kits',unit:'tray'},
    {title:'Art show',place:'school art-show team',item:'paper stars',emoji:'🎨',goal:'decorate the school art show',unit:'display'},
    {title:'Playground games',place:'school playground carnival',item:'game tickets',emoji:'🛝',goal:'make sure every team can play',unit:'basket'},
    {title:'Pumpkin design vote',place:'whole-school pumpkin design vote',item:'pumpkin-vote cards',emoji:'🎃',goal:'count the favourite jack-o’-lantern designs',unit:'box'},
    {title:'Costume parade',place:'school-wide costume parade',item:'parade tickets',emoji:'🎭',goal:'seat the families safely',unit:'row'},
    {title:'Community fair',place:'school fair',item:'activity passes',emoji:'🎡',goal:'welcome the visiting classes',unit:'stand'},
    {title:'Makerspace build',place:'school makerspace',item:'building pieces',emoji:'🧱',goal:'complete the class models',unit:'bin'},
    {title:'Autumn celebration',place:'school autumn celebration',item:'treat bags',emoji:'🍁',goal:'prepare a bag for each guest',unit:'table'}
  ];
  const strands={1:['B2.3','B2.4'],2:['B2.3','B2.4'],3:['B2.3','B2.5']};
  const expectations={
    1:{'B2.3':'Use mental math strategies to add and subtract whole numbers that add up to no more than 20, and explain the strategies used.','B2.4':'Represent and solve addition and subtraction problems involving whole numbers that add up to no more than 50, using objects, drawings, and equations.'},
    2:{'B2.3':'Use mental math strategies to add and subtract whole numbers that add up to no more than 50, and explain the strategies used.','B2.4':'Represent and solve addition and subtraction problems involving whole numbers that add up to no more than 100, using various tools and strategies.'},
    3:{'B2.3':'Use mental math strategies, including estimation, to add and subtract whole numbers that add up to no more than 1000, and explain the strategies used.','B2.5':'Represent and solve problems involving addition and subtraction of whole numbers that add up to no more than 1000, using various tools and algorithms.'}
  };
  const parts=n=>[Math.floor(n/100),Math.floor(n/10)%10,n%10];
  function options(answer,limit,seed){const offsets=[seed%2?2:-2,seed%3?10:-10,seed%5?1:-1,5,-5,20,-20];const out=[answer];for(const d of offsets){const value=answer+d;if(value>=0&&value<=limit&&!out.includes(value))out.push(value);if(out.length===4)break;}return out.map(String).sort((a,b)=>((Number(a)*7+seed)%13)-((Number(b)*7+seed)%13));}
  function numbers(grade,seed){
    if(grade===1){const first=8+(seed*7)%25,change=2+(seed*11)%Math.min(13,50-first);return {first,change,total:first+change,limit:50};}
    if(grade===2){const first=24+(seed*13)%51,change=5+(seed*17)%Math.min(26,101-first);return {first,change,total:first+change,limit:100};}
    const first=204+(seed*71)%550,change=25+(seed*37)%Math.min(180,1001-first);return {first,change,total:first+change,limit:1000};
  }
  function stringMission(topic,grade,week,day,index,track){
    const sequence=(week-3)*35+day*7+Math.floor(index/5)+(track==='school'?13:0),strategy=sequence%13;
    if(grade<3){
      const start=grade===1?8+sequence%5:20+sequence%10,change=grade===1?2+sequence%4:10+sequence%10;
      const tens=grade===1?2:10,ones=change-tens,answer=start+change;
      return {type:'string',code:grade===1?'B2.3 · B2.4':'B2.3 · B2.4',title:'Make a math string',story:`The ${topic.place} already has ${start} ${topic.item} for ${topic.goal}. Another ${change} arrive, and the helpers need the new total before they pack the ${topic.unit}.`,prompt:'Fill each step. How did breaking the new group apart help?',operation:`${start} + ${change} = ?`,visual:topic.emoji,steps:[{label:`${start} + ${tens} =`,answer:start+tens},{label:`${start+tens} + ${ones} =`,answer}],answer,hint:`Break ${change} into ${tens} and ${ones}. Add one part at a time.`,strategy:'Add in parts',answerGuide:`${start} + ${tens} = ${start+tens}; ${start+tens} + ${ones} = ${answer}`};
    }
    const hundreds=sequence<13?800:300+100*(sequence%6),start=hundreds+2,sum=start+103,minus=sum,small=100-(start-hundreds),left=103-small;
    const A=(label,answer)=>({label,answer});let title,steps,hint,operation,answer,lead;
    if(strategy===0){title='Notice the addition pattern';steps=[A(`${start} + 100 =`,start+100),A(`${start} + 101 =`,start+101),A(`${start} + 102 =`,start+102),A(`${start} + 103 =`,sum)];hint='Keep the first number the same. Each new second number is one more.';operation=`${start} + 103 = ?`;answer=sum;lead='Look for what changes and what stays the same.';}
    else if(strategy===1){title='Add 100, then 3';steps=[A(`${start} + 100 =`,start+100),A(`${start+100} + 3 =`,sum)];hint='103 is one hundred and three ones.';operation=`${start} + 103 = ?`;answer=sum;lead='Break the new group into hundreds and ones.';}
    else if(strategy===2){title='Break apart both numbers';steps=[A(`${hundreds} + 100 =`,hundreds+100),A('2 + 3 =',5),A(`${hundreds+100} + 5 =`,sum)];hint=`${start} is ${hundreds} + 2. Keep the hundreds and ones in their places.`;operation=`${start} + 103 = ?`;answer=sum;lead='Add hundreds to hundreds and ones to ones.';}
    else if(strategy===3){title='Make a friendly hundred';steps=[A(`${start} + ${small} =`,hundreds+100),A(`103 − ${small} =`,left),A(`${hundreds+100} + ${left} =`,sum)];hint=`Use ${small} to reach ${hundreds+100}; the rest of 103 is ${left}.`;operation=`${start} + 103 = ?`;answer=sum;lead='Reach the next hundred, then add what remains.';}
    else if(strategy===4){title='Addition compensation';steps=[A(`${start} + 100 =`,start+100),A(`${start+100} + 3 =`,sum)];hint='Adding 100 instead of 103 gives 3 too few, so add 3 back.';operation=`${start} + 103 = ?`;answer=sum;lead='Use an easier hundred and correct the answer.';}
    else if(strategy===5){title='Add in chunks';steps=[A(`${start} + 50 =`,start+50),A(`${start+50} + 50 =`,start+100),A(`${start+100} + 3 =`,sum)];hint='50 + 50 + 3 is 103.';operation=`${start} + 103 = ?`;answer=sum;lead='Keep a running total as you add three chunks.';}
    else if(strategy===6){title='Think hundreds first';steps=[A(`${hundreds} + 100 + 2 + 3 =`,sum),A(`${hundreds+100} + 5 =`,sum)];hint='Group the hundreds together, then group the ones.';operation=`${start} + 103 = ?`;answer=sum;lead='Rearrange the parts without changing the total.';}
    else if(strategy===7){title='Notice the subtraction pattern';steps=[A(`${minus} − 100 =`,minus-100),A(`${minus} − 101 =`,minus-101),A(`${minus} − 102 =`,minus-102),A(`${minus} − 103 =`,start)];hint='Taking away one more leaves one less.';operation=`${minus} − 103 = ?`;answer=start;lead='Read the decreasing pattern aloud.';}
    else if(strategy===8){title='Subtract 100, then 3';steps=[A(`${minus} − 100 =`,minus-100),A(`${minus-100} − 3 =`,start)];hint='Break 103 into 100 and 3.';operation=`${minus} − 103 = ?`;answer=start;lead='Take away the hundred first.';}
    else if(strategy===9){title='Subtract by place value';steps=[A(`${hundreds+100} − 100 =`,hundreds),A('5 − 3 =',2),A(`${hundreds} + 2 =`,start)];hint=`${minus} is ${hundreds+100} + 5. Remove the hundred and three ones.`;operation=`${minus} − 103 = ?`;answer=start;lead='Separate the hundreds and ones.';}
    else if(strategy===10){title='Subtract to a friendly hundred';steps=[A(`${minus} − 5 =`,hundreds+100),A('103 − 5 =',98),A(`${hundreds+100} − 98 =`,start)];hint='Take away 5 first. You still need to remove 98, because 5 + 98 = 103.';operation=`${minus} − 103 = ?`;answer=start;lead='Reach a friendly hundred before finishing.';}
    else if(strategy===11){title='Subtraction compensation';steps=[A(`${minus} − 100 =`,minus-100),A(`${minus-100} + 2 =`,minus-98)];hint='100 is 2 more than 98. Add 2 back after subtracting 100.';operation=`${minus} − 98 = ?`;answer=minus-98;lead='Correct for taking away two too many.';}
    else{title='Subtract in chunks';steps=[A(`${minus} − 50 =`,minus-50),A(`${minus-50} − 50 =`,minus-100),A(`${minus-100} − 3 =`,start)];hint='50 + 50 + 3 makes 103.';operation=`${minus} − 103 = ?`;answer=start;lead='Make three smaller jumps to find what remains.';}
    const isSub=strategy>=7,initial=isSub?minus:start,change=strategy===11?98:103;
    const situation=isSub?`They hand out ${change} of them, and need to know how many remain for the next group.`:`Another ${change} arrive, and the helpers need the combined count before filling the ${topic.unit}.`;
    return {type:'string',code:'B2.3 · B2.5',title,story:`The ${topic.place} has ${initial} ${topic.item} to ${topic.goal}. ${situation} ${lead}`,prompt:'Complete every step. Then explain why this strategy works.',operation,visual:topic.emoji,steps,answer,hint,strategy,origin:'Inspire math strings',blocks:parts(initial),answerGuide:steps.map(step=>`${step.label} ${step.answer}`).join(' → ')};
  }
  function mission(topic,grade,week,day,index,track){
    if(index%5===2)return stringMission(topic,grade,week,day,index,track);
    const seed=week*101+day*43+index*19+grade*13+(track==='school'?23:0),n=numbers(grade,seed),mode=index%7;
    const story=(start,change,add)=>`The ${topic.place} has ${start} ${topic.item} ready to ${topic.goal}. ${add?`${change} more arrive`:`The helpers use ${change}`}, so the ${topic.unit} label must be updated.`;
    if(mode===0){const add=index%2===0,answer=add?n.total:n.first,first=add?n.first:n.total,change=n.change;return {type:'choice',code:grade===1?'B2.4':grade===2?'B2.4':'B2.5',title:add?'Count the new arrivals':'How many are left?',story:story(first,change,add),prompt:`How many ${topic.item} should the helpers record now?`,operation:`${first} ${add?'+':'−'} ${change} = ?`,visual:topic.emoji,options:options(answer,n.limit,seed),answer:String(answer)};}
    if(mode===1){const answer=n.total;return {type:'build',code:(grade===1?'B1.2 · B2.4':grade===2?'B1.1 · B2.4':'B1.5 · B2.5'),title:'Build the updated count',story:story(n.first,n.change,true),prompt:`Add the new ${topic.item}, then build ${answer} using base-ten blocks.`,operation:`${n.first} + ${n.change} = ?`,visual:topic.emoji,target:answer,parts:parts(answer)};}
    if(mode===3){const answer=n.first;return {type:'slider',code:grade===1?'B2.4':grade===2?'B2.4':'B2.5',title:'Slide to the remaining count',story:story(n.total,n.change,false),prompt:`Move the slider to the number of ${topic.item} still available.`,operation:`${n.total} − ${n.change} = ?`,visual:topic.emoji,min:0,max:n.limit,step:1,answer};}
    if(mode===4){const a=n.first,b=n.change,c=Math.min(n.limit-a,Math.max(1,Math.floor(b/2))),answer=a+c;return {type:'choice',code:grade===1?'B2.4':grade===2?'B2.4':'B2.5',title:'Plan for the second delivery',story:`The ${topic.place} already has ${a} ${topic.item} for ${topic.goal}. Another ${c} come in a second delivery; the helpers need an exact count before filling the ${topic.unit}.`,prompt:'What is the new total after both groups are together?',operation:`${a} + ${c} = ?`,visual:topic.emoji,options:options(answer,n.limit,seed+4),answer:String(answer)};}
    if(mode===5){const targets=[n.first,n.first+2,n.first+4,n.first+6].filter(x=>x<=n.limit);while(targets.length<4)targets.unshift(targets[0]-2);const cards=targets.map((total,i)=>`${total-i-1} + ${i+1}`);return {type:'order',code:grade===1?'B1.3 · B2.4':grade===2?'B1.2 · B2.4':'B1.2 · B2.5',title:'Put the team totals in order',story:`Four teams at the ${topic.place} collect ${topic.item} for ${topic.goal}. Their cards show the starting amount and what each team added; the organizer will serve the smaller groups first.`,prompt:'Solve all four cards. Put the final counts from least to greatest.',operation:'Add both parts on each card.',visual:topic.emoji,cards:[cards[2],cards[0],cards[3],cards[1]],answer:cards,answerGuide:cards.map((x,i)=>`${x} = ${targets[i]}`).join(' | ')};}
    const needed=Math.min(n.limit,n.total+2+(seed%5)),more=needed-n.first;return {type:'choice',code:grade===1?'B2.4':grade===2?'B2.4':'B2.5',title:'How many more are needed?',story:`The ${topic.place} needs ${needed} ${topic.item} to ${topic.goal}. The helpers have ${n.first} already, and they need to know how many more to request before packing the ${topic.unit}.`,prompt:`How many more ${topic.item} should they ask for?`,operation:`${n.first} + ? = ${needed}`,visual:topic.emoji,options:options(more,n.limit,seed+5),answer:String(more)};
  }
  for(const [name,course] of Object.entries(data)){
    Object.assign(course.expectations,expectations[course.grade]);
    course.scopeNote='Four weeks of whole-number sense and addition/subtraction. No fraction activities in this edition.';
    for(const week of [3,4]){
      course.weeks[week]={home:[],school:[]};
      for(let day=0;day<5;day++){
        const topic=topics[(week-3)*5+day],title=topic.title,focus=course.grade===3?'Choose and explain addition/subtraction strategies':'Add, subtract, and model the results';
        const intro=`The ${topic.place} has a real planning job: ${topic.goal}. Work with the ${topic.item} on each card. Draw or build an example, then explain how the operation helps the helpers decide what to do.`;
        const handsOn=`Use counters or base-ten blocks to show one ${topic.item} problem. Draw the starting amount, the change, and the new total; tell a partner what the numbers mean.`;
        const warmup=`With a partner, model one small group of ${topic.item} and a second group. Add them, then remove some and explain both changes using a drawing or blocks.`;
        for(const track of ['home','school']){
          const count=track==='home'?15:35,missions=Array.from({length:count},(_,i)=>{
            const m=mission(topic,course.grade,week,day,i,track);if(track==='school'&&i>=10)m.bonus=true;return m;
          });
          course.weeks[week][track].push({title,focus,intro,handsOn,warmup,missions});
        }
      }
    }
  }
})();
window.STARLIGHT_ADD_STRATEGY();

// Excite: two-digit addition within Grade 2 B2.4's total of 100. Reading and
// composing numbers to 200 remains separate B1.1 place-value work.
(function(){
  const course=window.STARLIGHT_DATA.Excite;
  const settings=[
    {place:'bike-safety team',item:'safety tags',container:'box',purpose:'the bike-safety event',icon:'🚲'},
    {place:'food drive',item:'cans',container:'crate',purpose:'packing day',icon:'🥫'},
    {place:'school fair',item:'tickets',container:'packet',purpose:'the fair entrance',icon:'🎟️'},
    {place:'art club',item:'display cards',container:'tray',purpose:'the hallway display',icon:'🎨'},
    {place:'welcome team',item:'welcome cards',container:'box',purpose:'family open house',icon:'💌'}
  ];
  const plans={
    home:[[0,0,68,27],[0,5,64,28],[1,2,57,36],[1,4,62,29],[2,9,54,38],[3,14,63,29],[4,5,72,26]],
    school:[[0,0,74,25],[1,2,81,17],[2,8,65,27],[2,13,59,37],[3,9,56,39],[4,3,67,28]]
  };
  for(const [track,changes] of Object.entries(plans))for(const [day,index,first,second] of changes){
    const mission=course.weeks[1][track][day].missions[index],context=settings[day],total=first+second;
    if(mission?.type!=='build'||first<10||first>99||second<10||second>99||total>100)throw new Error('Excite B2.4 addition must use two two-digit addends and total at most 100');
    mission.title='Add two groups of '+context.item;
    mission.story=`The ${context.place} has ${first} ${context.item} in one ${context.container} and ${second} in another. They need the combined count for ${context.purpose}.`;
    mission.screenStory=mission.story;
    mission.prompt=`How many ${context.item} are there altogether? Drag blocks to build the sum. Show the addition on the number line too.`;
    mission.operation=`${first} + ${second} = ?`;
    mission.visual=context.icon;
    mission.target=total;
    mission.parts=[Math.floor(total/100),Math.floor(total/10)%10,total%10];
    mission.code='B1.1 · B2.4';
    mission.answerGuide=`${first} + ${second} = ${total}; ${mission.parts[0]} hundreds, ${mission.parts[1]} tens, and ${mission.parts[2]} ones.`;
    mission.additionPattern='two-digit + two-digit';
  }
  // Keep even the incorrect answer choices inside Excite's 0–200 range.
  for(const track of ['home','school'])for(const day of course.weeks[1][track])for(const mission of day.missions){
    if(!Array.isArray(mission.options))continue;
    const used=new Set(mission.options.map(String));
    mission.options=mission.options.map(option=>{
      if(!/^\d+$/.test(String(option))||Number(option)<=200)return option;
      const answer=Number(mission.answer);
      const replacement=[answer+1,answer-1,answer+10,answer-10,answer+2,answer-2]
        .find(value=>Number.isInteger(value)&&value>=0&&value<=200&&!used.has(String(value)));
      if(replacement==null)throw new Error('Excite needs an in-range answer choice');
      used.add(String(replacement));
      return String(replacement);
    });
  }
})();

// Starlight 1 contains only the first school week. Keep the original
// question data and interaction types, but expose no later assignments.
for(const course of Object.values(window.STARLIGHT_DATA)){
  course.weeks={1:course.weeks[1]};
  course.scopeNote='Week 1 (October 5–9, 2026): whole-number sense and operations.';
  // Give every real addition/subtraction task an open number line. Place-value
  // notation (for example 6 x 100 + 10 x 10 + 4) is a block trade, not a jump.
  for(const track of ['home','school'])for(const day of course.weeks[1][track])for(const mission of day.missions){
    const operation=String(mission.operation||'').trim();
    const direct=/^\d+\s*[+−-]\s*\d+\s*=\s*\?(?:;.*)?$/.test(operation);
    const teams=/^Team A:\s*\d+\s*[+−-]\s*\d+\s*=\s*\?\s*\|\s*Team B:\s*\d+\s*[+−-]\s*\d+\s*=\s*\?$/.test(operation);
    const cardSums=mission.type==='order'&&Array.isArray(mission.cards)&&mission.cards.every(card=>/^\d+\s*[+−-]\s*\d+$/.test(card));
    const hasActivity=direct||teams||cardSums||mission.type==='round'||mission.type==='mean'||mission.type==='readingGraph'||mission.type==='estimate';
    mission.jumpLine=!mission.blocks&&hasActivity;
  }
  const used=new Set();
  for(const track of ['home','school'])for(const day of course.weeks[1][track])
    for(const mission of day.missions)for(const code of mission.code.split(' · '))used.add(code);
  if(['home','school'].some(track=>course.weeks[1][track].some(day=>day.missions.some(mission=>mission.jumpLine))))used.add('B2.3');
  course.expectations=Object.fromEntries(Object.entries(course.expectations).filter(([code])=>used.has(code)));
}
