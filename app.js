(function(){
  'use strict';
  const DATA=window.STARLIGHT_DATA, root=document.getElementById('app');
  if(!DATA||!root)return;
  const view=document.body.dataset.view, gradeName=document.body.dataset.grade;
  const course=gradeName?DATA[gradeName]:null;
  const days=['Monday','Tuesday','Wednesday','Thursday','Friday'];
  const weekDates={1:{range:'October 5–9, 2026',dates:['October 5','October 6','October 7','October 8','October 9']}};
  const dayIndex=days.indexOf(document.body.dataset.day);
  const query=new URLSearchParams(location.search);
  let week=1;
  let track=query.get('track')==='school'?'school':'home';
  let missionIndex=Math.max(0,Number(query.get('task'))||0);
  let renderingMissionIndex=missionIndex;
  let state=course?loadState(track,week):null;
  let pickedOrder=null,pickedToken=null,selectedPad=null,padArmed=false,selectedRegroupSource=null,selectedStringStep=0,regroupDrag=null,lastRegroupDragEnd=0,lineDrag=null,lastLineDragEnd=0,selectedTransferBlock=null,transferDrag=null,lastTransferDragEnd=0,selectedBuildBlock=null,buildDrag=null,lastBuildDragEnd=0;
  let lastProgressKey=null,lastProgressPercent=0;
  const cheers=[
    'You are building a strong math path—one careful step at a time! 🌟',
    'Nice work checking your thinking. Your car is moving! 🚗',
    'You tried, checked, and learned. That is what mathematicians do! 🧠',
    'Five more solved! Take a breath and enjoy your progress. 🎈',
    'Your number sense is growing with every question. 🌱',
    'You used your tools well. Keep that thoughtful pace! 🧱',
    'Look how far you have driven today! 🛣️',
    'A tricky question did not stop you. Well done staying with it! 💪',
    'You are noticing patterns and making smart choices. ✨',
    'Your work is adding up—literally! ➕',
    'Great focus! Each answer is another step down the road. 🚙',
    'You checked your model and kept going. That is powerful learning! 🔎',
    'Five questions finished. Your effort is shining! ☀️',
    'You are thinking like a problem solver. Keep exploring! 🧭',
    'Those careful steps are making a difference. 👣',
    'You are getting better at explaining how you know. 💬',
    'Your math journey has real momentum now! 🏎️',
    'You made space to think, not just guess. Wonderful! 🎯',
    'Another five complete! Give yourself a quiet cheer. 🙌',
    'You are using numbers to solve real problems. Brilliant work! 🧩',
    'Even when a problem is new, you have strategies to try. 🛠️',
    'You have come a long way today. Keep the wheels rolling! 🚗',
    'Your careful counting and checking are paying off. 🔢',
    'You found a way through five more challenges. 🌈',
    'You are learning from every try. That matters! 💛',
    'Your blocks, drawings, and ideas are working together. 🧱',
    'Five in the bag! What strategy will help on the next one? 🎒',
    'You kept your eyes on the question and your mind on the math. 👀',
    'You are making connections between numbers. 🔗',
    'A little progress at a time can take you far. 🚘',
    'You are ready for the next stretch of the road. 🏁',
    'Your thinking is clear and your effort is steady. ⭐',
    'Look at that progress! You earned a moment to smile. 😊',
    'You are using your own ideas to make the math make sense. 💡',
    'Keep going—your next discovery may be just around the bend. 🌟',
    'Five more solved, and your toolbox is growing. 🧰',
    'Great perseverance! You checked each step and moved ahead. 🚦',
    'Your car moved because you did the work. Nice job! 🚗',
    'You are becoming more confident with every careful answer. 🌻',
    'One question at a time, you are making real progress. 🎉'
  ];
  const trillium='<svg class="trillium" viewBox="0 0 48 48" aria-hidden="true"><g fill="#28815d"><ellipse cx="24" cy="10" rx="5" ry="10"/><ellipse cx="24" cy="10" rx="5" ry="10" transform="rotate(120 24 24)"/><ellipse cx="24" cy="10" rx="5" ry="10" transform="rotate(240 24 24)"/></g><g fill="#fff" stroke="#e2e9e4"><ellipse cx="24" cy="16" rx="7" ry="13"/><ellipse cx="24" cy="16" rx="7" ry="13" transform="rotate(120 24 24)"/><ellipse cx="24" cy="16" rx="7" ry="13" transform="rotate(240 24 24)"/></g><circle cx="24" cy="24" r="4" fill="#f4d65f"/></svg>';
  const faces=['👧🏻','👦🏽','👧🏿','👦🏼','👧🏽','👦🏻','👧🏼','👦🏿','👧🏾','👦🏾'];
  const briefExpectations={
    1:{'B1.1':'Show numbers to 50','B1.2':'Make and break numbers to 50','B1.3':'Compare and order to 50','B1.4':'Estimate, then count to 50','B1.5':'Count by 1s, 2s, 5s, 10s','B1.6':'Draw fair shares','B2.3':'Mental add and subtract to 20','B2.4':'Model addition and subtraction to 50'},
    2:{'B1.1':'Show and make numbers to 200','B1.2':'Compare and order to 200','B1.3':'Estimate, then count to 200','B1.4':'Count by 20s, 25s, 50s','B1.5':'Explain even and odd','B1.6':'Share whole items fairly','B2.3':'Mental add and subtract to 50','B2.4':'Model addition and subtraction to 100'},
    3:{'B1.1':'Show and make numbers to 1000','B1.2':'Compare and order to 1000','B1.3':'Round to the nearest 10 or 100','B1.4':'Count by 50s, 100s, 200s','B1.5':'Show place value with blocks','B1.6':'Share whole items fairly','B2.3':'Mental add and subtract to 1000','B2.5':'Solve addition and subtraction to 1000','D1.3':'Make scaled bar graphs','D1.4':'Find and explain the mean','D1.5':'Read graphs and draw conclusions'}
  };
  function h(value){return String(value==null?'':value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function briefExpectation(m,grade=course?.grade){return m.code.split(' · ').map(code=>code+' · '+(briefExpectations[grade]?.[code]||code)).join(' | ');}
  function key(which,w=week){return 'starlight1:v1:'+gradeName+':week'+w+':'+which;}
  function trackDays(w=week,which=track){return course.weeks[w][which];}
  function cleanID(id){return String(id||'').trim().slice(0,32)||'Practice';}
  function blankState(id){return {studentId:cleanID(id),answers:{},reflections:{},milestones:{},startedAt:new Date().toISOString()};}
  function loadState(which,w=week){try{const value=JSON.parse(localStorage.getItem(key(which,w)));if(value&&typeof value==='object')return {studentId:cleanID(value.studentId),answers:value.answers&&typeof value.answers==='object'?value.answers:{},reflections:value.reflections&&typeof value.reflections==='object'?value.reflections:{},milestones:value.milestones&&typeof value.milestones==='object'?value.milestones:{},startedAt:value.startedAt||null};}catch(_){}return blankState('Practice');}
  function saveState(){if(!course)return;try{localStorage.setItem(key(track),JSON.stringify(state));}catch(_){}}
  function unlocked(){try{return sessionStorage.getItem('starlight1:schoolUnlocked')==='1';}catch(_){return false;}}
  function setUnlocked(){try{sessionStorage.setItem('starlight1:schoolUnlocked','1');}catch(_){}}
  function dayLink(index,which=track,task,w=week){return days[index]+'.html?week='+w+'&track='+which+(task==null?'':'&task='+task);}
  function answerKey(d,m){return d+':'+m;}
  function entry(d=dayIndex,m=missionIndex){return state.answers[answerKey(d,m)]||{};}
  function writeEntry(value){state.answers[answerKey(dayIndex,missionIndex)]=value;saveState();}
  function changeEntry(patch){const next={...entry(),...patch,checked:false,teacherFilled:false};writeEntry(next);renderDay(true);}
  function resetPick(){pickedOrder=null;pickedToken=null;selectedPad=null;selectedStringStep=0;padArmed=false;selectedRegroupSource=null;selectedTransferBlock=null;selectedBuildBlock=null;regroupDrag=null;transferDrag=null;buildDrag=null;}
  function teacherButton(){return '<button type="button" class="teacher-dot" data-action="teacher" title="Teacher tools" aria-label="Teacher tools">T</button>';}
  function modalMarkup(){return '<div class="modal" id="modal" hidden><div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button class="modal-close" type="button" data-action="close-modal" aria-label="Close">×</button><div id="modal-body"></div></div></div>';}
  function showModal(title,content){const modal=document.getElementById('modal');if(!modal)return;document.getElementById('modal-body').innerHTML='<h2 id="modal-title">'+h(title)+'</h2>'+content;modal.hidden=false;modal.querySelector('.modal-close').focus();}
  function closeModal(){const modal=document.getElementById('modal');if(modal)modal.hidden=true;}
  function curriculumModal(){if(!course)return;const details=Object.entries(course.expectations).map(([code,description])=>'<li><strong>'+h(code)+'</strong> '+h(description)+'</li>').join('');showModal('Ontario Grade '+course.grade+' · Number and Operations','<p>Each question shows a brief skill beside its code. The full expectations are below.</p><ol class="expectation-list">'+details+'</ol><p class="grade-notice">Curriculum: Ontario Mathematics, 2020.</p>');}
  function gradeTile(name){const c=DATA[name];return '<a class="card grade-tile" href="'+name+'%20Star/index.html"><span class="emoji" aria-hidden="true">'+c.icon+'</span><span class="eyebrow">Grade '+c.grade+' · Number &amp; Operations</span><strong>'+name+' Star</strong><p>Week 1: October 5–9. Numbers up to '+c.range+'. Hands-on number work, blocks, and real questions.</p><span class="enter">Open '+name+' Star →</span></a>';}
  function missionTotal(names){return names.reduce((sum,name)=>sum+['home','school'].reduce((part,which)=>part+DATA[name].weeks[1][which].reduce((daily,day)=>daily+day.missions.length,0),0),0);}
  function renderGroup(){root.innerHTML='<div class="shell"><section class="card group-hero"><div class="brand"><span class="brand-star" aria-hidden="true">✨</span><div><p class="eyebrow">Pathway · Excite · Inspire</p><h1>Starlight 1</h1><p>One week · October 5–9, 2026<br>Choose your grade, then Home or School.</p></div></div><span class="hero-face" aria-hidden="true">🌟🧮</span></section><section class="grade-grid" aria-label="Choose a grade">'+['Pathway','Excite','Inspire'].map(gradeTile).join('')+'</section><section class="card question-bank-card"><div><h2>📚 See every question</h2><p>Download one PDF with all '+missionTotal(['Pathway','Excite','Inspire']).toLocaleString('en-CA')+' Week 1 questions: Pathway, Excite, and Inspire; Home and School. Every question includes its curriculum code, brief skill, and answer guide.</p><p class="grade-notice">PDF downloads do not require a password. Entering School activities requires the teacher code.</p></div><button type="button" class="pdf-tool" data-action="question-bank">'+trillium+' Download all questions PDF</button></section><p class="grade-notice">Choose a grade, then Home or School. School activities use code 300.</p>'+teacherButton()+modalMarkup()+'</div>';}
  function progress(which,w){const s=loadState(which,w),p={coreDone:0,coreTotal:0,bonusDone:0,bonusTotal:0};trackDays(w,which).forEach((day,d)=>{if(day.holiday)return;day.missions.forEach((m,i)=>{const kind=m.bonus?'bonus':'core';p[kind+'Total']++;if(s.answers[answerKey(d,i)]?.checked)p[kind+'Done']++;});});return p;}
  function linkGrid(which,w){return '<div class="day-grid">'+trackDays(w,which).map((day,index)=>day.holiday?'':'<button type="button" class="day-link" data-enter-day="'+index+'" data-week="'+w+'" data-track="'+which+'"><span>'+days[index]+' · '+weekDates[w].dates[index]+'</span><small>'+h(day.title)+'</small><small>'+day.missions.length+' tasks</small></button>').join('')+'</div>';}
  function pathCard(w,which,open){
    const school=which==='school',label='Week '+w+' '+(school?'School':'Home'),p=progress(which,w),inputId='week'+w+'-'+which+'-id';
    const intro=school?'A 60-minute class lesson with ten core tasks, 25 original extra questions, and a separate strategy studio for practice.':'Fifteen assigned questions each day, then optional practice with five friendly-number moves and five break-apart additions'+(course.grade===3?', plus rounding and mean work':'')+'.';
    const controls='<div class="start-form"><label for="'+inputId+'">Student ID</label><input id="'+inputId+'" maxlength="32" value="'+h(loadState(which,w).studentId)+'"><button class="primary" type="button" data-start="'+which+'" data-week="'+w+'">'+(school?'🔒 Enter School':'Start Home')+' · Monday →</button></div><p class="grade-notice">Entering from this page starts fresh and clears earlier answers for this path. Download its assessment first if you need the saved work.</p>'+(school&&!open?'<p class="grade-notice">🏫 This work is for class. Enter the teacher code when asked.</p>':'<p class="progress-note">Previous run: '+p.coreDone+' of '+p.coreTotal+' core tasks checked'+(p.bonusTotal?' · '+p.bonusDone+' of '+p.bonusTotal+' optional practice tasks checked':'')+'.</p>'+linkGrid(which,w))+'<button type="button" class="pdf-tool card-pdf" data-action="pdf" data-track="'+which+'" data-week="'+w+'">'+trillium+' Download '+label+' PDF assessment</button>';
    return '<section class="card track-card'+(school?' school':'')+'"><span class="school-label">'+(school?'For class · 60 minutes a day':'Learning at home')+'</span><h2>'+(school?'🏫':'🌠')+' '+label+'</h2><p class="week-date">📅 '+weekDates[w].range+'</p><p>'+intro+'</p>'+controls+'</section>';
  }
  function renderGrade(){const open=unlocked();root.innerHTML='<div class="shell"><a class="back" href="../index.html">← Starlight 1</a><header class="card grade-hero"><div class="brand"><span class="brand-star" aria-hidden="true">'+course.icon+'</span><div><p class="eyebrow">Grade '+course.grade+' · Ontario Number &amp; Operations</p><h1>'+gradeName+' Star</h1><p>Week 1 · Monday to Friday, October 5–9.</p></div></div><span class="range-pill">Numbers to '+course.range+'</span></header><div class="track-grid">'+[[1,'home'],[1,'school']].map(([w,which])=>pathCard(w,which,open)).join('')+'</div><div class="tools-row"><button type="button" class="tool" data-action="curriculum">'+trillium+' Curriculum expectations</button><button type="button" class="pdf-tool" data-action="question-bank" data-bank-grade="'+gradeName+'">'+trillium+' Download all Grade '+course.grade+' questions PDF</button></div><p class="grade-notice">Assessment and question-bank PDFs need no password. Entering School activities requires the teacher code. This grade has '+missionTotal([gradeName]).toLocaleString('en-CA')+' Week 1 questions, including optional practice.</p>'+teacherButton()+modalMarkup()+'</div>';}
  function teamJersey(index){return '<span class="team-jersey team-jersey-'+(index===0?'a':'b')+'" aria-hidden="true">👕</span>';}
  function selectedButton(text,index,current){const jersey=text==='Team A'?teamJersey(0):text==='Team B'?teamJersey(1):'';return '<button type="button" class="choice" data-option="'+index+'" aria-pressed="'+(current===text)+'">'+jersey+h(text)+'</button>';}
  function renderChoice(m,a){return (m.blocks?renderRegroup(m,a):'')+'<div class="choice-grid">'+m.options.map((option,index)=>selectedButton(option,index,a.value)).join('')+'</div>';}
  function transferInitial(value,side){const tokens=[];let left=value;for(const unit of [100,10,1]){const count=Math.floor(left/unit);left%=unit;for(let i=0;i<count;i++)tokens.push({id:side+'-'+unit+'-'+i,unit,origin:side});}return tokens;}
  function transferPiles(m,a){return a.transferPiles&&Array.isArray(a.transferPiles.L)&&Array.isArray(a.transferPiles.R)?{L:[...a.transferPiles.L],R:[...a.transferPiles.R]}:{L:transferInitial(m.addends[0],'L'),R:transferInitial(m.addends[1],'R')};}
  function pileValue(pile){return pile.reduce((sum,token)=>sum+token.unit,0);}
  function friendlyPiles(m,piles){return ['L','R'].some(side=>pileValue(piles[side])>0&&pileValue(piles[side])%m.friendlyUnit===0);}
  function updateTransfer(m,a,next,moved){const history=[...(a.transferHistory||[]),{piles:transferPiles(m,a),moves:Number(a.transferMoves||0)}].slice(-30);selectedTransferBlock=null;changeEntry({transferPiles:next,transferMoves:Number(a.transferMoves||0)+(moved?1:0),transferHistory:history});}
  function moveTransfer(m,a,id,target){const piles=transferPiles(m,a),source=['L','R'].find(side=>piles[side].some(token=>token.id===id));if(!source||source===target||!piles[target])return false;const index=piles[source].findIndex(token=>token.id===id),[token]=piles[source].splice(index,1);if(token.origin==='G')token.origin=source;piles[target].push(token);updateTransfer(m,a,piles,true);return true;}
  function tradeTransfer(m,a,side,unit,breakApart){const piles=transferPiles(m,a);if(!piles[side]||![1,10,100].includes(unit))return;const list=piles[side];if(breakApart){if(unit===1)return;const index=list.findIndex(token=>token.unit===unit);if(index<0)return;list.splice(index,1);for(let i=0;i<10;i++)list.push({id:'made-'+Date.now()+'-'+i+'-'+Math.random().toString(36).slice(2,5),unit:unit/10,origin:side,made:true});}else{if(unit===100)return;const selected=list.filter(token=>token.unit===unit).slice(0,10);if(selected.length<10)return;const ids=new Set(selected.map(token=>token.id));piles[side]=list.filter(token=>!ids.has(token.id));piles[side].push({id:'made-'+Date.now()+'-'+Math.random().toString(36).slice(2,8),unit:unit*10,origin:side,made:true});}updateTransfer(m,a,piles,false);}
  function transferGuide(m,piles){
    const left=pileValue(piles.L),right=pileValue(piles.R),unit=m.friendlyUnit;
    const values=[left,right],names=['First group','Second group'];
    const friendly=values.some(value=>value>0&&value%unit===0);
    const cue=(value,index)=>{
      const remainder=value%unit;
      const graphic=unit===10?'<div class="friendly-ten-frame" aria-hidden="true">'+Array.from({length:10},(_,i)=>'<span class="'+(i<(remainder||value&&10)?'filled':'')+'"></span>').join('')+'</div>':
        '<div class="friendly-hundred-track" aria-hidden="true"><span style="width:'+(remainder||value&&100||0)+'%"></span></div>';
      return '<div class="transfer-goal-group"><strong>'+names[index]+' · '+value+'</strong>'+graphic+'<small>'+(remainder?remainder+' of '+unit+' toward the next '+(unit===10?'ten':'hundred'):value?'Ends in '+(unit===10?'0':'00')+' ✓':'No pieces in this group yet')+'</small></div>';
    };
    let tip='A group ends in '+(unit===10?'0':'00')+'. The combined total has not changed.';
    if(!friendly&&(!left||!right)){
      tip='Move pieces into the empty group first. Then make a non-empty group end in '+(unit===10?'0':'00')+'.';
    }else if(!friendly&&unit===10){
      const needLeft=10-left%10,needRight=10-right%10;
      if(needLeft<=right%10&&left+needLeft<=course.range)tip='Try moving '+needLeft+' one'+(needLeft===1?'':'s')+' from the second group to the first. The first group will become '+(left+needLeft)+'.';
      else if(needRight<=left%10&&right+needRight<=course.range)tip='Try moving '+needRight+' one'+(needRight===1?'':'s')+' from the first group to the second. The second group will become '+(right+needRight)+'.';
      else if(left%10&&left-left%10>0)tip='Try moving '+left%10+' ones from the first group to the second. The first group will become '+(left-left%10)+'.';
      else if(right%10&&right-right%10>0)tip='Try moving '+right%10+' ones from the second group to the first. The second group will become '+(right-right%10)+'.';
      else tip='Ungroup a ten to get more ones, then make a non-empty group end in 0.';
    }else if(!friendly){
      const need=100-left%100;
      tip=right>=need&&left+need<=course.range?'The first group needs '+need+' more to reach '+(left+need)+'. Move pieces from the second group; ungroup a ten if you need more ones.':'Try the other group or ungroup blocks to make a non-empty group end in 00.';
    }
    return '<div class="transfer-goal" role="group" aria-label="Visual guide for making a friendly number"><div class="transfer-goal-head"><strong>🎯 Make one group end in '+(unit===10?'0':'00')+'</strong><span>The picture shows progress toward the next '+(unit===10?'ten':'hundred')+'.</span></div><div class="transfer-goal-body">'+values.map(cue).join('')+'<p class="transfer-goal-tip">'+tip+'</p></div></div>';
  }
  function renderTransfer(m,a){
    const piles=transferPiles(m,a),labels={L:'First group',R:'Second group'};
    const piece=(token,side)=>'<button type="button" class="transfer-piece'+(token.origin!==side&&token.origin!=='G'?' moved':'')+(token.made?' made':'')+(selectedTransferBlock?.id===token.id&&renderingMissionIndex===missionIndex?' selected':'')+'" data-transfer-piece="'+h(token.id)+'" data-transfer-side="'+side+'" aria-label="'+token.unit+(token.unit===1?' disc':' block')+' in '+labels[side]+(token.origin!==side&&token.origin!=='G'?', moved here':'')+'">'+(token.unit===1?'<span class="transfer-disc" aria-hidden="true"></span>':block(token.unit,true))+'</button>';
    const pile=side=>{const tokens=piles[side],ones=tokens.filter(token=>token.unit===1),larger=tokens.filter(token=>token.unit!==1),cells=Math.max(10,Math.ceil(ones.length/10)*10),chosen=selectedTransferBlock&&renderingMissionIndex===missionIndex&&selectedTransferBlock.side!==side;
      return '<section class="transfer-pile'+(chosen?' ready':'')+'" data-transfer-pad="'+side+'" aria-label="'+labels[side]+' landing pad"><div class="transfer-pile-head"><strong>'+labels[side]+'</strong><span>'+pileValue(tokens)+'</span>'+(chosen?'<b class="transfer-hand" aria-hidden="true">👆</b>':'')+'</div><div class="transfer-big" aria-label="Hundreds and tens blocks">'+(larger.map(token=>piece(token,side)).join('')||'<span class="transfer-empty">No hundreds or tens here</span>')+'</div><div class="transfer-tenframe" data-transfer-frame="'+side+'" aria-label="Ten frame for '+labels[side]+'">'+Array.from({length:cells},(_,i)=>'<div class="ten-cell">'+(ones[i]?piece(ones[i],side):'')+'</div>').join('')+'</div><div class="transfer-trades"><button type="button" data-transfer-trade="group-ones" data-transfer-side="'+side+'" '+(ones.length>=10?'':'disabled')+'>Group 10 ones → 1 ten</button><button type="button" data-transfer-trade="break-ten" data-transfer-side="'+side+'" '+(larger.some(token=>token.unit===10)?'':'disabled')+'>Ungroup 1 ten</button>'+(course.grade===3?'<button type="button" data-transfer-trade="group-tens" data-transfer-side="'+side+'" '+(larger.filter(token=>token.unit===10).length>=10?'':'disabled')+'>Group 10 tens → 1 hundred</button><button type="button" data-transfer-trade="break-hundred" data-transfer-side="'+side+'" '+(larger.some(token=>token.unit===100)?'':'disabled')+'>Ungroup 1 hundred</button>':'')+'</div></section>';};
    const friendly=Number(a.transferMoves||0)>0&&friendlyPiles(m,piles);
    return '<div class="transfer-work"><p><strong>🧱 Make a friendly number:</strong> drag a block or disc into the other group, or tap it and then tap the other ten-frame. Moved pieces turn purple. The total stays the same. Group or ungroup if it helps.</p><div class="transfer-piles">'+pile('L')+'<span class="transfer-plus" aria-hidden="true">+</span>'+pile('R')+'</div><p class="transfer-equation">'+pileValue(piles.L)+' + '+pileValue(piles.R)+' = <strong>?</strong> <span>'+(friendly?'✅ Friendly '+(m.friendlyUnit===100?'hundred':'ten')+' made!':'Use the picture below to make one group end in '+(m.friendlyUnit===100?'00':'0')+'.')+'</span></p>'+transferGuide(m,piles)+'<div class="transfer-tools"><button type="button" data-action="transfer-undo" '+((a.transferHistory||[]).length?'':'disabled')+'>↶ Undo move</button><button type="button" data-action="transfer-reset">Start again</button></div><p>What is the total of both groups? It stays the same when you move pieces.</p><div class="choice-grid">'+m.options.map((option,index)=>selectedButton(option,index,a.value)).join('')+'</div></div>';
  }
  function digits(value){return [Math.floor(value/100),Math.floor(value/10)%10,value%10];}
  function renderDecompose(m,a){
    const names=['Hundreds','Tens','Ones'],used=course.grade===3?[0,1,2]:[1,2],parts=a.decomp||{},digitRow=(which,value)=>'<div class="decomp-row"><strong>'+which+' · '+value+'</strong>'+used.map(i=>'<label>'+names[i]+'<input type="text" inputmode="numeric" pattern="[0-9]*" autocomplete="off" data-decomp-kind="'+which+'" data-decomp-index="'+i+'" aria-label="'+which+' '+names[i]+'" value="'+h(parts[which]?.[i]??'')+'"></label>').join('')+'</div>';
    const visual=value=>{const counts=digits(value);return '<div class="decomp-blocks" aria-label="Base-ten model for '+value+'">'+used.map(i=>'<div><small>'+names[i]+'</small><div class="decomp-pieces">'+Array.from({length:counts[i]},()=>'<span class="piece-mini">'+block([100,10,1][i],true)+'</span>').join('')+'</div></div>').join('')+'</div>';};
    return '<div class="decomp-work"><p><strong>🔍 Break apart both numbers first.</strong> Count the blocks, fill each place-value box, add matching columns, then choose the exact total. A column can have more than 9 before you regroup.</p><div class="decomp-source"><div><strong>First group: '+m.addends[0]+'</strong>'+visual(m.addends[0])+'</div><div><strong>Second group: '+m.addends[1]+'</strong>'+visual(m.addends[1])+'</div></div>'+digitRow('left',m.addends[0])+digitRow('right',m.addends[1])+'<div class="decomp-row decomp-sum"><strong>Add the columns</strong>'+used.map(i=>'<label>'+names[i]+'<input type="text" inputmode="numeric" pattern="[0-9]*" autocomplete="off" data-decomp-kind="sums" data-decomp-index="'+i+'" aria-label="Sum of '+names[i]+'" value="'+h(parts.sums?.[i]??'')+'"></label>').join('')+'</div><p>What is the total after adding all the place values?</p><div class="choice-grid">'+m.options.map((option,index)=>selectedButton(option,index,a.value)).join('')+'</div></div>';
  }
  function calculatorResult(expression){
    const normalized=String(expression).replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-');
    if(!/^\d+(?:\.\d+)?(?:[+*/-]\d+(?:\.\d+)?)*$/.test(normalized))return 'Error';
    const tokens=normalized.match(/\d+(?:\.\d+)?|[+*/-]/g),items=[];
    for(let i=0;i<tokens.length;i++){
      const token=tokens[i];
      if(token==='*'||token==='/'){
        const left=Number(items.pop()),right=Number(tokens[++i]);
        if(!Number.isFinite(right)||token==='/'&&right===0)return 'Error';
        items.push(String(token==='*'?left*right:left/right));
      }else items.push(token);
    }
    let result=Number(items[0]);for(let i=1;i<items.length;i+=2)result+=items[i]==='+'?Number(items[i+1]):-Number(items[i+1]);
    return Number.isFinite(result)?String(Number(result.toFixed(4))):'Error';
  }
  function calcKey(display,key){
    const value=String(display||'');
    if(key==='C')return '';
    if(key==='⌫')return value.slice(0,-1);
    if(key==='=')return calculatorResult(value);
    if(value==='Error')return /^\d$/.test(key)?key:'';
    if('+−×÷'.includes(key))return value&&/[\d.]$/.test(value)?value+key:value;
    if(key==='.')return /(?:^|[+−×÷])\d*\.\d*$/.test(value)?value:value+'.';
    return /^\d$/.test(key)?(value+key).slice(-36):value;
  }
  function renderMean(m,a){
    const bins=a.meanBins||{},calculator=a.calcDisplay||'';
    const followUps=m.meanFollowUps.map((item,i)=>'<label>'+h(item.question)+'<input type="text" inputmode="numeric" pattern="[0-9]*" data-mean-follow="'+i+'" value="'+h(a.meanFollowUps?.[i]??'')+'"></label>').join('');
    return '<section class="mean-work"><p><strong>⚖️ Mean means equal share.</strong> Add all five values, then divide by five. Use the calculator if you want to check your arithmetic.</p><div class="mean-values" aria-label="Five values">'+m.values.map(n=>'<span>'+n+'</span>').join('')+'</div><div class="mean-main"><div class="mini-calculator" aria-label="Calculator"><strong>🧮 Calculator</strong><output class="calculator-display" data-calc-display aria-live="polite">'+h(calculator||'0')+'</output><div class="calculator-keys">'+['7','8','9','÷','4','5','6','×','1','2','3','−','C','0','=','+','⌫'].map(key=>'<button type="button" data-calc-key="'+h(key)+'">'+h(key)+'</button>').join('')+'</div></div><div class="mean-answer"><label>Total of five values<input type="text" inputmode="numeric" pattern="[0-9]*" data-mean-field="total" value="'+h(a.meanTotal??'')+'"></label><label>Mean = total ÷ 5<input type="text" inputmode="numeric" pattern="[0-9]*" data-mean-field="mean" value="'+h(a.meanValue??'')+'"></label><p>If the items were shared equally, each group would have the mean.</p></div></div><p><strong>What does the mean tell us?</strong> Put each actual group below, at, or above the mean.</p><div class="mean-classify">'+m.values.map((value,i)=>'<div><strong>Group '+(i+1)+': '+value+'</strong><div>'+[['below','Below'],['at','At'],['above','Above']].map(([key,label])=>'<button type="button" data-mean-bin="'+i+'" data-mean-class="'+key+'" aria-pressed="'+(bins[i]===key)+'">'+label+'</button>').join('')+'</div></div>').join('')+'</div><div class="mean-follow"><h3>Use the mean to plan an equal share</h3>'+followUps+'</div></section>';
  }
  function tallyMarks(n){return Array.from({length:Math.floor(n/5)},()=>'<span class="tally-five">||||╱</span>').join('')+(n%5?'<span>'+('|'.repeat(n%5))+'</span>':'');}
  function renderReadingGraph(m,a){
    const bars=a.graphBars||{},answers=a.graphAnswers||[],groupMax=12,classMax=24;
    const slider=(series,i,max)=>{const value=bars[series]?.[i]??0;return '<input type="range" min="0" max="'+max+'" step="1" value="'+value+'" data-graph-series="'+series+'" data-graph-index="'+i+'" aria-label="Set '+series+' books on '+m.days[i]+'"><output data-graph-value="'+series+'-'+i+'">'+(bars[series]?.[i]??'—')+'</output>';};
    const pair=m.days.map((day,i)=>'<div class="graph-day"><div class="graph-bar-stage"><div class="graph-bar girls" data-graph-bar="girls-'+i+'" style="height:'+((bars.girls?.[i]??0)/groupMax*100)+'%"></div><div class="graph-bar boys" data-graph-bar="boys-'+i+'" style="height:'+((bars.boys?.[i]??0)/groupMax*100)+'%"></div></div><strong>'+h(day)+'</strong><label>Girls '+slider('girls',i,groupMax)+'</label><label>Boys '+slider('boys',i,groupMax)+'</label></div>').join('');
    const classes=m.days.map((day,i)=>'<div class="graph-day"><div class="graph-bar-stage"><div class="graph-bar class-total" data-graph-bar="class-'+i+'" style="height:'+((bars.class?.[i]??0)/classMax*100)+'%"></div></div><strong>'+h(day)+'</strong><label>Class '+slider('class',i,classMax)+'</label></div>').join('');
    return '<section class="reading-graph-work"><p>📚 Each tally mark is one book. Count the girls’ and boys’ marks for each day. Move the graph sliders to draw the bars. Add the two counts for the class graph below.</p><div class="tally-table"><div><strong>Day</strong><strong>Girls’ group</strong><strong>Boys’ group</strong></div>'+m.days.map((day,i)=>'<div><strong>'+h(day)+'</strong><span>'+tallyMarks(m.girls[i])+'</span><span>'+tallyMarks(m.boys[i])+'</span></div>').join('')+'</div><h3>Books read by each group</h3><p class="graph-key"><span class="key-girls">Girls</span><span class="key-boys">Boys</span> · Each bar goes from 0 to 12 books.</p><div class="graph-week" aria-label="Paired bar graph for books read by girls and boys">'+pair+'</div><h3>Books read by the whole class</h3><p>For each day: girls + boys = class total. Each bar goes from 0 to 24 books.</p><div class="graph-week" aria-label="Bar graph for class total books by day">'+classes+'</div><div class="graph-questions"><h3>Use both graphs to answer</h3>'+m.questions.map((question,i)=>'<label>'+h(question)+(i===0?'<div class="graph-day-choices">'+m.days.map(day=>'<button type="button" data-graph-day="'+h(day)+'" aria-pressed="'+(answers[0]===day)+'">'+h(day)+'</button>').join('')+'</div>':'<input type="text" inputmode="numeric" pattern="[0-9]*" data-graph-answer="'+i+'" value="'+h(answers[i]??'')+'">')+'</label>').join('')+'</div><p class="grade-notice">Grade 3 extension: build paired bars for comparison. Ontario Grade 3 D1.3 focuses on scaled bar graphs; formal multiple-bar graphs are introduced in Grade 4.</p></section>';
  }
  function renderSlider(m,a){const id='answer-range-'+renderingMissionIndex;return '<div class="slider-box"><label for="'+id+'">Move the slider; the dashboard shows your number.</label><div class="slider-row"><input id="'+id+'" type="range" min="'+m.min+'" max="'+m.max+'" step="'+m.step+'" value="'+(a.value==null?m.min:a.value)+'" data-answer-range><output class="slider-value" data-range-output>'+ (a.value==null?'—':a.value)+'</output></div><small>'+m.min+' to '+m.max+' · jumps of '+m.step+'</small></div>';}
  function renderChart(m,a){return '<div class="chart-grid" role="group" aria-label="Number chart 1 to 50">'+Array.from({length:50},(_,i)=>'<button type="button" class="chart-cell" data-chart="'+(i+1)+'" aria-pressed="'+(a.value===i+1)+'">'+(i+1)+'</button>').join('')+'</div>';}
  function renderEstimate(m,a){const tray=(count,label)=>'<div class="estimate-tray"><strong>'+label+'</strong><div class="estimate-cloud" aria-label="'+label+' countable dots">'+Array.from({length:count},()=>'<span class="estimate-dot" aria-hidden="true"></span>').join('')+'</div></div>';const name=m.collectionName||'Tray',collection=m.groups?'<div class="estimate-pair">'+tray(m.groups[0],name+' A')+tray(m.groups[1],name+' B')+'</div>':tray(m.actual,'Collection');return '<p>Look at both '+h(m.collectionPlural||'groups')+'. Use the slider to estimate their total, then press Check my work to see how close you were. You can reveal ten-groups first if helpful.</p>'+collection+renderSlider({...m,min:0,step:1},a)+'<div class="mission-actions"><button type="button" class="tool" data-action="verify-estimate">🔎 Reveal ten-groups</button></div>'+(a.verified?'<div class="verify-box"><strong>Count and add:</strong> '+(m.groups?m.groups[0]+' + '+m.groups[1]+' = '+m.actual+'. ':'')+Math.floor(m.actual/10)+' groups of 10 and '+(m.actual%10)+' ones = '+m.actual+'.<p>Your estimate: '+a.value+'. '+(a.checked?'Your signed difference is below.':'Press Check my work to see how close you were.')+'</p></div>':'');}
  function block(unit,mini){const letter=unit===100?'h':unit===10?'t':'o';return '<span class="block-face '+letter+'" aria-hidden="true"></span>'+(mini?'':'<span>'+(unit===100?'100 flat':unit===10?'10 rod':'1 cube')+'</span>');}
  function modelParts(m,a){
    if(m.blocks){
      if(Array.isArray(a.modelParts))return [...a.modelParts];
      const tens=Number(!!(a.tensTrade||a.traded)),ones=Number(!!a.onesTrade);
      return [m.blocks[0]+tens,m.blocks[1]-10*tens-ones,m.blocks[2]+10*ones];
    }
    return Array.isArray(a.parts)?[...a.parts]:[0,0,0];
  }
  function buildAddends(m){
    if(m.type!=='build')return null;
    const match=String(m.operation).match(/^(\d+)\s*\+\s*(\d+)\s*=\s*\?$/);
    return match?[Number(match[1]),Number(match[2])]:null;
  }
  function buildGroups(a){
    return [0,1].map(group=>[0,1,2].map(place=>Math.max(0,Number(a.buildGroups?.[group]?.[place])||0)));
  }
  function groupValue(group){return group[0]*100+group[1]*10+group[2];}
  function newModelParts(m,a){
    if(Array.isArray(a.modelNewParts))return [...a.modelNewParts];
    if(Array.isArray(a.newParts))return [...a.newParts];
    if(m.blocks)return [Number(!!(a.tensTrade||a.traded)),0,10*Number(!!a.onesTrade)];
    return [0,0,0];
  }
  const tradeSpecs={
    'break-hundred':{from:0,to:1,take:1,make:10},
    'group-tens':{from:1,to:0,take:10,make:1},
    'break-ten':{from:1,to:2,take:1,make:10},
    'group-ones':{from:2,to:1,take:10,make:1}
  };
  function tradeButtons(parts,index){
    const button=(action,label,ready)=>'<button type="button" class="tool regroup-trade" data-block-trade="'+action+'" '+(ready?'':'disabled')+'>'+label+'</button>';
    if(index===0)return course.grade===1?'':button('break-hundred','🧩 Ungroup 100 → 10 tens',parts[0]>=1);
    if(index===1)return button('break-ten','🧩 Ungroup 10 → 10 ones',parts[1]>=1)+(course.grade===1?'':button('group-tens','↩ Regroup 10 tens → 100',parts[1]>=10));
    return button('group-ones','↩ Regroup 10 ones → 10',parts[2]>=10);
  }
  function tradeBlocks(m,a,action){
    const spec=tradeSpecs[action];if(!spec||course.grade===1&&(spec.from===0||spec.to===0))return false;
    const parts=modelParts(m,a),newParts=newModelParts(m,a);
    if(parts[spec.from]<spec.take)return false;
    const before=parts.reduce((sum,count,index)=>sum+count*[100,10,1][index],0);
    parts[spec.from]-=spec.take;parts[spec.to]+=spec.make;
    newParts[spec.from]=Math.max(0,newParts[spec.from]-spec.take);
    newParts[spec.to]+=spec.make;
    if(parts.reduce((sum,count,index)=>sum+count*[100,10,1][index],0)!==before)return false;
    const blockTrades={...(a.blockTrades||{})};
    if(!a.blockTrades&&m.blocks){
      if(a.tensTrade||a.traded)blockTrades['group-tens']=1;
      if(a.onesTrade)blockTrades['break-ten']=1;
    }
    blockTrades[action]=(blockTrades[action]||0)+1;
    selectedRegroupSource=null;
    changeEntry(m.blocks?{modelParts:parts,modelNewParts:newParts,blockTrades}:{parts,newParts,blockTrades});
    return true;
  }
  function renderRegroup(m,a){
    const parts=modelParts(m,a),newParts=newModelParts(m,a);
    const labels=['Hundreds','Tens','Ones'],units=[100,10,1];
    const zones=parts.map((count,index)=>{
      const pieces=Array.from({length:count},(_,piece)=>{
        const newlyMade=piece>=count-newParts[index];
        const movable=index===0||index===1||parts[2]>=10;
        const selected=renderingMissionIndex===missionIndex&&selectedRegroupSource&&selectedRegroupSource.index===index&&selectedRegroupSource.piece===piece;
        return '<span class="piece-mini'+fiveCountBreak(index,piece)+(newlyMade?' new-block':'')+(selected?' regroup-selected':'')+'"'+(movable?' role="button" tabindex="0" data-regroup-piece="'+index+'" data-regroup-number="'+piece+'" data-regroup-new="'+newlyMade+'" aria-label="Move '+labels[index].toLowerCase()+' block to another place" aria-pressed="'+!!selected+'"':'')+'>'+block(units[index],true)+'</span>';
      }).join('');
      return '<div class="regroup-zone" data-regroup-zone="'+index+'"><strong>'+labels[index]+' · '+count+'</strong><div class="regroup-pieces">'+pieces+'</div><div class="block-trade-controls">'+tradeButtons(parts,index)+'</div></div>';
    }).join('');
    return '<div class="regroup-panel" role="group" aria-label="Base-ten block model"><p>🧱 Use a button to ungroup a hundred or ten. You can also drag or tap a block, then choose its new column. Purple blocks were made by a trade.</p><div class="regroup-grid">'+zones+'</div></div>';
  }
  function moveRegroupBlock(source,target,newlyMade){
    if(view!=='day'||track==='school'&&!unlocked())return false;
    const m=trackDays()[dayIndex].missions[missionIndex];if(!m.blocks)return false;
    const action=source===0&&target===1?'break-hundred':source===1&&target===0?'group-tens':source===1&&target===2?'break-ten':source===2&&target===1?'group-ones':null;
    return action?tradeBlocks(m,entry(),action):false;
  }
  function addBuildBlock(m,a,index,group=null){
    if(m.type!=='build'||index===0&&course.grade===1||![0,1,2].includes(index))return false;
    const parts=modelParts(m,a),units=[100,10,1];
    // Let students make and correct an over-large model. A silent stop at the
    // grade-range ceiling made every bank block appear impossible to drag.
    const safetyCaps=[12,24,40];
    if(parts[index]>=safetyCaps[index]||parts.reduce((sum,count)=>sum+count,0)>=60){
      changeEntry({buildNotice:'This model has many blocks. Remove or regroup some blocks before adding more.'});
      return false;
    }
    parts[index]++;selectedBuildBlock=null;
    if(buildAddends(m)){
      const groups=buildGroups(a),selected=group===0||group===1?group:(a.activeBuildGroup===1?1:0);
      groups[selected][index]++;
      changeEntry({parts,buildGroups:groups,activeBuildGroup:selected,buildNotice:''});
    }else changeEntry({parts,buildNotice:''});
    return true;
  }
  function removeBuildBlock(m,a,index,group=null){
    if(m.type!=='build'||![0,1,2].includes(index))return false;
    const parts=modelParts(m,a),newParts=newModelParts(m,a);
    if(parts[index]<1)return false;
    let patch={};
    if(buildAddends(m)&&Array.isArray(a.buildGroups)){
      const groups=buildGroups(a),preferred=group===0||group===1?group:(a.activeBuildGroup===1?1:0);
      const source=groups[preferred][index]>0?preferred:groups[1-preferred][index]>0?1-preferred:-1;
      if(source>=0){
        groups[source][index]--;
        patch={buildGroups:groups,activeBuildGroup:source};
      }else{
        // A traded block may exist only in the combined model. Remove its
        // full value from the coloured source sets, borrowing as needed.
        let remaining=[100,10,1][index];
        for(const set of [preferred,1-preferred]){
          const available=groupValue(groups[set]),taken=Math.min(remaining,available),next=available-taken;
          if(!taken)continue;
          groups[set]=[Math.floor(next/100),Math.floor(next%100/10),next%10];
          remaining-=taken;
        }
        if(remaining)return false;
        patch={buildGroups:groups,activeBuildGroup:preferred};
      }
    }
    parts[index]--;newParts[index]=Math.min(newParts[index],parts[index]);
    selectedBuildBlock=null;changeEntry({...patch,parts,newParts,buildNotice:''});return true;
  }
  function moveBuildGroup(m,a,index,source,target){
    if(!buildAddends(m)||source===target||![0,1].includes(source)||![0,1].includes(target))return false;
    const groups=buildGroups(a);
    if(groups[source][index]<1)return false;
    groups[source][index]--;groups[target][index]++;
    changeEntry({buildGroups:groups,activeBuildGroup:target});return true;
  }
  function tradeBuildGroup(m,a,action,group){
    const spec=tradeSpecs[action];
    if(!buildAddends(m)||![0,1].includes(group)||!spec||course.grade===1&&(spec.from===0||spec.to===0))return false;
    const groups=buildGroups(a),parts=modelParts(m,a),newParts=newModelParts(m,a);
    if(groups[group][spec.from]<spec.take||parts[spec.from]<spec.take)return false;
    const before=groupValue(groups[group]);
    groups[group][spec.from]-=spec.take;groups[group][spec.to]+=spec.make;
    parts[spec.from]-=spec.take;parts[spec.to]+=spec.make;
    newParts[spec.from]=Math.max(0,newParts[spec.from]-spec.take);
    newParts[spec.to]+=spec.make;
    if(groupValue(groups[group])!==before)return false;
    const blockTrades={...(a.blockTrades||{})},buildGroupTrades={...(a.buildGroupTrades||{})};
    blockTrades[action]=(blockTrades[action]||0)+1;
    const key='Level '+(group+1)+' '+action;
    buildGroupTrades[key]=(buildGroupTrades[key]||0)+1;
    selectedBuildBlock=null;
    changeEntry({buildGroups:groups,parts,newParts,activeBuildGroup:group,blockTrades,buildGroupTrades,buildNotice:''});
    return true;
  }
  function moveBuildPiece(m,a,source,target){
    if(m.type!=='build'||source===target)return false;
    const action=source===0&&target===1?'break-hundred':source===1&&target===0?'group-tens':source===1&&target===2?'break-ten':source===2&&target===1?'group-ones':null;
    if(!action)return false;
    selectedBuildBlock=null;return tradeBlocks(m,a,action);
  }
  function fiveCountBreak(index,piece){return index>0&&(piece+1)%5===0?' count-five-end':'';}
  function renderBuild(m,a){
    const parts=modelParts(m,a),newParts=newModelParts(m,a),labels=['Hundreds','Tens','Ones'],units=[100,10,1];
    const addends=buildAddends(m),groups=buildGroups(a),activeGroup=a.activeBuildGroup===1?1:0;
    const numericTotal=!!addends;
    const pad=(group,index)=>{
      const name=group===0?'a':'b',level=group+1,count=groups[group][index],unit=units[index];
      const pieces=Array.from({length:count},(_,piece)=>'<button type="button" class="build-source-piece group-'+name+fiveCountBreak(index,piece)+'" data-build-source="'+group+'" data-build-source-place="'+index+'" draggable="false" aria-label="Level '+level+' '+unit+' block; tap to remove or drag to the other level or bank">'+block(unit,true)+'</button>').join('');
      const regroup=count>=10&&(index===2||index===1&&course.grade>1)?'<button type="button" class="build-group-regroup" data-build-group-trade="'+(index===2?'group-ones':'group-tens')+'" data-build-group="'+group+'">↩ Regroup 10 '+labels[index].toLowerCase()+' → 1 '+(index===2?'ten':'hundred')+'</button>':'';
      const originalHint=group===0?'<span class="build-original-hint">Build original question: '+unit+'s</span>':'';
      return '<div class="build-addend-pad group-'+name+(activeGroup===group?' active':'')+'" data-build-zone="'+index+'" data-build-group="'+group+'" role="group" aria-label="Level '+level+' '+labels[index].toLowerCase()+' pad; '+count+' blocks; tap open space to add one '+unit+' block"><button type="button" class="build-pad-title" data-select-build-group="'+group+'" data-add-build-pad="'+index+'" aria-label="Add one '+unit+' block to Level '+level+' '+labels[index].toLowerCase()+'">Level '+level+' · '+count+' '+labels[index].toLowerCase()+' · +'+unit+'</button><span class="build-tap-hint" aria-hidden="true">Tap to Add Blocks</span>'+originalHint+'<div class="build-pad-pieces">'+pieces+'</div>'+regroup+'</div>';
    };
    const directions=addends?'🧱 Level 1: use blocks to set up '+addends[0]+'. Level 2: use blocks to add '+addends[1]+'. Drag blocks into the coloured pads, or tap an open pad to add its block. When a pad has ten ones or ten tens, use its Regroup button. Level 3 below shows the combined 100, 10, and 1 number tiles; its total is the answer you are building.':'🧱 Drag a block from the bank into its matching place, or tap an open Hundreds, Tens, or Ones pad to add one. Drag a placed block back to the bank to remove it. Regroup ten ones or tens with the button when available.';
    const legend=addends?'<div class="build-set-legend"><span class="group-a">🔵 Level 1 · set up '+addends[0]+' with blocks</span><span class="group-b">🟠 Level 2 · add '+addends[1]+' with blocks</span></div>':'';
    const zones=labels.map((label,index)=>{
      if(index===0&&course.grade===1)return '';
      const pieces=Array.from({length:parts[index]},(_,piece)=>'<button type="button" class="piece-mini build-piece'+(numericTotal?' number-combined-piece':'')+fiveCountBreak(index,piece)+(piece>=parts[index]-newParts[index]?' new-block':'')+(renderingMissionIndex===missionIndex&&selectedBuildBlock?.index===index&&selectedBuildBlock?.piece===piece?' selected':'')+'" data-build-piece="'+index+'" data-build-piece-number="'+piece+'" draggable="false" aria-label="Drag '+units[index]+' '+(numericTotal?'number tile':'block')+' from combined '+label+' or tap to select">'+(numericTotal?units[index]:block(units[index],true))+'</button>').join('');
      return '<div class="place-zone" data-build-zone="'+index+'" aria-label="'+label+' block landing pad; tap open space to add one '+units[index]+' block"><div class="build-zone-heading"><strong>'+label+'</strong>'+(addends?'':'<span class="build-tap-hint" aria-hidden="true">Tap to Add Blocks</span>')+'</div>'+(addends?pad(0,index)+pad(1,index)+'<span class="build-combined-label">Level 3 · total / answer · '+parts[index]+' '+label.toLowerCase()+'</span>':'<span class="count">'+parts[index]+'</span>')+'<div class="piece-row">'+pieces+'</div><div class="block-trade-controls">'+tradeButtons(parts,index)+'</div><button type="button" class="remove-block" data-remove-block="'+index+'" '+(parts[index]?'':'disabled')+'>− Remove one</button></div>';
    }).join('');
    const total=parts[0]*100+parts[1]*10+parts[2];
    const rangeNote=total>course.range?'<p class="build-range-note" role="status">This practice model is above Grade '+course.grade+'’s '+course.range+'-number range. Remove blocks to bring it back.</p>':'';
    const bank=units.map((unit,index)=>index===0&&course.grade===1?'':'<button type="button" class="bank-block" data-add-block="'+index+'" draggable="false" aria-label="Drag '+unit+' block to '+labels[index]+' or tap to add">'+block(unit,false)+'</button>').join('');
    const answer=numericTotal?'<div class="model-total model-answer" role="status"><strong>Level 3 total / answer you are building: '+total+'</strong><span>Level 1 '+groupValue(groups[0])+' + Level 2 '+groupValue(groups[1])+' = '+total+'</span></div>':'<div class="model-total">Your model: '+(course.grade===1?'':parts[0]+' hundreds + ')+parts[1]+' tens + '+parts[2]+' ones = '+total+'</div>';
    return '<p class="build-directions">'+directions+'</p>'+legend+'<div class="block-bank" data-build-bank aria-label="Block bank, drop a placed block here to remove it"><div class="bank-heading"><strong>Block bank →</strong><span>🧮 Work it out: '+h(m.operation)+'</span></div>'+bank+'</div><div class="place-grid'+(course.grade===1?' two-places':'')+'">'+zones+'</div>'+answer+rangeNote+(a.buildNotice?'<p class="build-range-note" role="status">'+h(a.buildNotice)+'</p>':'');
  }
  function renderString(m,a){
    const values=Array.isArray(a.stepValues)?a.stepValues:[];
    const steps=m.steps.map((step,i)=>'<label class="string-step'+(renderingMissionIndex===missionIndex&&selectedStringStep===i?' active':'')+'"><span class="string-step-number">'+(i+1)+'</span><span>'+h(step.label)+'</span><input type="text" inputmode="numeric" pattern="[0-9]*" autocomplete="off" data-string-step="'+i+'" aria-label="Step '+(i+1)+': '+h(step.label)+'" value="'+h(values[i]??'')+'"></label>').join('');
    const tiles=[...new Set(m.steps.map(s=>s.answer))];
    const model=m.blocks?'<button type="button" class="tool string-toggle" data-action="string-model">'+(a.modelOpen?'Hide':'Show')+' base-ten blocks 🧱</button>'+(a.modelOpen?renderRegroup(m,a):''):'';
    return '<div class="string-work"><p class="string-instruction">Read each line from top to bottom. Tap an answer box and type, or tap a number tile. Use the blocks if they help.</p>'+model+'<div class="string-grid">'+steps+'</div><div class="string-tiles" aria-label="Answer tiles">'+tiles.map(v=>'<button type="button" class="choice" data-string-tile="'+v+'">'+v+'</button>').join('')+'</div><button type="button" class="tool" data-action="string-hint">💡 '+(a.hintOpen?'Hide hint':'Give me a hint')+'</button>'+(a.hintOpen?'<p class="string-hint">'+h(m.hint)+'</p>':'')+'</div>';
  }
  function renderOrder(m,a){const slots=Array.isArray(a.slots)?a.slots:Array(m.answer.length).fill(null),used=new Set(slots.filter(Boolean)),active=renderingMissionIndex===missionIndex;return '<p>Tap a card, then tap a numbered landing pad. Or tap a pad first and then a card. The 👆 hand shows the selected pad; tap another pad to move it. Tap a filled pad twice to pick its card up.</p><div class="order-bank">'+m.cards.filter(card=>!used.has(card)).map(card=>'<button type="button" class="card-option'+(active&&pickedOrder===card?' selected':'')+'" data-order-card="'+h(card)+'">'+h(card)+'</button>').join('')+'</div><div class="order-slots">'+slots.map((value,index)=>'<button type="button" class="landing-pad'+(value?' filled':'')+(active&&selectedPad===index?' selected-pad':'')+'" data-order-slot="'+index+'" aria-pressed="'+(active&&selectedPad===index)+'" aria-label="Landing pad '+(index+1)+(active&&selectedPad===index?', selected':'')+(value?', '+h(value):', empty')+'"><span>'+(index+1)+'.</span><strong>'+(value?h(value):'Drop here')+'</strong>'+(active&&selectedPad===index?'<span class="pad-hand" aria-hidden="true">👆</span>':'')+'</button>').join('')+'</div>';}
  function shareCounts(m,a){const placed=a.placed||{},counts=Array(m.sharers).fill(0);Object.values(placed).forEach(value=>{if(Number.isInteger(value)&&value>=0&&value<m.sharers)counts[value]++;});return counts;}
  function renderShare(m,a){const placed=a.placed||{},remaining=Array.from({length:m.items},(_,i)=>i).filter(i=>placed[i]==null),counts=shareCounts(m,a);const tokens=items=>items.map(i=>'<button type="button" class="share-token'+(renderingMissionIndex===missionIndex&&pickedToken===i?' selected':'')+'" data-share-token="'+i+'" aria-label="Choose item '+(i+1)+'">'+h(m.token)+'</button>').join('');return '<p>Tap an item, then tap a student-face mat. Or use “Deal one fair round” to give one item to each student. Leave leftovers in the bank.</p><div class="share-bank" data-share-bank aria-label="Items not yet shared">'+tokens(remaining)+(remaining.length?'':'<em>No whole items left in the bank.</em>')+'</div><div class="mission-actions"><button type="button" class="tool" data-action="deal-round">👋 Deal one fair round</button>'+(m.mode==='fraction'?'<button type="button" class="cut-button" data-action="cut-leftovers">✂️ '+(a.cut?'Hide equal cuts':'Show equal cuts')+'</button>':'')+'</div><div class="share-plates">'+counts.map((count,plate)=>'<div class="share-plate" data-share-plate="'+plate+'"><strong>'+faces[plate]+' Student '+(plate+1)+' · '+count+' whole</strong>'+tokens(Array.from({length:m.items},(_,i)=>i).filter(i=>placed[i]===plate))+'</div>').join('')+'</div>'+(a.cut&&m.mode==='fraction'?'<div class="share-explain">If the '+remaining.length+' leftover whole item(s) can be cut into '+m.sharers+' equal pieces each, every student receives <strong>'+remaining.length+'/'+m.sharers+'</strong> of an item in addition to the whole items.<div class="fraction-pieces">'+Array.from({length:m.sharers},(_,i)=>'<span class="'+(i<remaining.length?'filled':'')+'"></span>').join('')+'</div></div>':'')+'<div class="choice-grid">'+m.options.map((option,index)=>selectedButton(option,index,a.value)).join('')+'</div>';}
  function fractionStrip(frac,shaded,interactive,label){return '<div class="fraction-strip-wrap"><strong>'+label+' · '+frac[0]+'/'+frac[1]+'</strong><div class="fraction-strip" style="grid-template-columns:repeat('+frac[1]+',minmax(0,1fr))">'+Array.from({length:frac[1]},(_,i)=>interactive?'<button type="button" class="fraction-cell'+(shaded.includes(i)?' shaded':'')+'" data-shade="'+label.charAt(0)+'" data-segment="'+i+'" aria-label="'+label+' segment '+(i+1)+'" aria-pressed="'+shaded.includes(i)+'"></button>':'<span class="fraction-cell'+(i<frac[0]?' shaded':'')+'"></span>').join('')+'</div></div>';}
  function renderShade(m,a){const shaded=a.shades||{A:[],B:[]};return '<p>Both strips are the same length. Tap equal parts to colour them. You may choose any parts, but the number coloured must match the fraction name.</p>'+fractionStrip(m.a,shaded.A||[],true,'A')+fractionStrip(m.b,shaded.B||[],true,'B')+'<p class="grade-notice">Coloured in A: '+(shaded.A||[]).length+'/'+m.a[1]+' · Coloured in B: '+(shaded.B||[]).length+'/'+m.b[1]+'</p>';}
  function renderFractionCompare(m,a){return '<p>Both wholes below are the same size. Compare the total coloured amounts on the strips.</p>'+fractionStrip(m.a,[],false,'A')+fractionStrip(m.b,[],false,'B')+renderChoice(m,a);}
  function renderRound(m,a){const low=Math.floor(m.value/m.unit)*m.unit,high=low+m.unit,pct=(m.value-low)/m.unit*100;return '<p>Check whether the marked number is closer to the left or right endpoint. A halfway number rounds up.</p><div class="round-line"><span class="round-end">'+low+'</span><span class="round-marker" style="left:'+pct+'%">'+m.value+'</span><span class="round-end">'+high+'</span></div><div class="choice-grid">'+[low,high].map((value,index)=>selectedButton(String(value),index,a.value)).join('')+'</div>';}
  function parseLineExpression(raw,label){
    const expression=String(raw).trim().replace(/\s*=\s*\??\s*$/,'');
    if(!/^\d+(?:\s*[+−-]\s*\d+)+$/.test(expression))return null;
    const parts=expression.match(/\d+|[+−-]/g),start=Number(parts[0]);
    let change=0;
    for(let i=1;i<parts.length;i+=2)change+=(parts[i]==='+'?1:-1)*Number(parts[i+1]);
    return {label:label||expression,start,change};
  }
  function lineModels(m,a){
    // A place-value trade is solved with its movable blocks, not with a
    // generic line from zero. Keep the line for genuine arithmetic strings.
    if(m.blocks&&m.type!=='string')return [];
    if(m.type==='estimate')return a.verified&&m.groups?[{label:(m.collectionName||'Group')+' A '+m.groups[0]+' + '+(m.collectionName||'Group')+' B '+m.groups[1],start:m.groups[0],change:m.groups[1]}]:[];
    if(m.type==='share')return [{label:'Take away one fair round at a time',start:m.items,change:-m.sharers}];
    if(m.type==='string')return m.steps.map((step,i)=>({...parseLineExpression(step.label,step.label.replace(/\s*=\s*$/,'')),step:i})).filter(model=>Number.isFinite(model.start));
    if(m.type==='order')return m.cards.map(card=>parseLineExpression(card,card)).filter(Boolean);
    if(m.type==='round'){
      const low=Math.floor(m.value/m.unit)*m.unit,high=low+m.unit;
      return [{label:'Distance to '+low+': '+m.value+' − '+low,start:m.value,change:low-m.value},
        {label:'Distance to '+high+': '+high+' − '+m.value,start:high,change:m.value-high}];
    }
    if(m.type==='mean'&&m.values?.length)return [{label:'Add the values before sharing: '+m.values.join(' + '),start:m.values[0],change:m.values.slice(1).reduce((sum,n)=>sum+n,0)}];
    if(m.type==='readingGraph'&&m.days?.length){
      const daily=m.days.map((day,i)=>({label:day+': '+m.girls[i]+' + '+m.boys[i],start:m.girls[i],change:m.boys[i]}));
      const totals=m.totals||m.days.map((_,i)=>m.girls[i]+m.boys[i]);
      return [...daily,{label:'Whole week: '+totals.join(' + '),start:totals[0],change:totals.slice(1).reduce((sum,n)=>sum+n,0)}];
    }
    const groups=String(m.operation).match(/(\d+)\s*\/\s*(\d+)\s*=/);
    if(groups)return [{label:'Count back one group at a time',start:Number(groups[1]),change:-Number(groups[2])}];
    const times=String(m.operation).match(/(\d+)\s*[x×]\s*(\d+)\s*=/);
    if(times)return [{label:'Count forward in equal groups',start:0,change:Number(times[1])}];
    const missing=String(m.operation).match(/(\d+)\s*\+\s*\?\s*=\s*(\d+)/);
    if(missing)return [{label:'Find the missing part',start:Number(missing[1]),change:Number(missing[2])-Number(missing[1])}];
    const expressions=String(m.operation).match(/\d+(?:\s*[+−-]\s*\d+)+(?=\s*=)/g)||[];
    return expressions.map((expression,i)=>parseLineExpression(expression,expressions.length>1?(m.type==='round'?'Distance '+(i+1):'Team '+(i?'B':'A'))+' · '+expression:expression)).filter(Boolean);
  }
  function isTeamComparison(m){return m.type==='choice'&&m.options?.join('|')==='Team A|Team B'&&/^Team A:.*\|\s*Team B:/.test(String(m.operation));}
  function lineJumps(a,index){return Array.isArray(a.lineJumps?.[index])?a.lineJumps[index].filter(n=>Number.isInteger(n)&&Math.abs(n)<=course.range).slice(0,30):[];}
  function lineLanding(model,jumps){return jumps.reduce((n,jump)=>n+jump,model.start);}
  function lineToGoal(model,jumps){return model.change-jumps.reduce((sum,jump)=>sum+jump,0);}
  function completedBuildLine(m,a){
    if(m.type!=='build'||!m.jumpLine)return false;
    const models=lineModels(m,a),raw=a.lineJumps?.[0],jumps=lineJumps(a,0);
    if(models.length!==1||!Array.isArray(raw)||!jumps.length||raw.length!==jumps.length)return false;
    const route=[];
    for(const jump of jumps){
      if(lineJumpProblem(models[0],route,jump))return false;
      route.push(jump);
    }
    return lineToGoal(models[0],jumps)===0&&lineLanding(models[0],jumps)===m.target;
  }
  function lineProgressBars(model,jumps){
    const current=lineLanding(model,jumps);
    // Use one fixed scale for this calculation. If the scale followed the
    // current landing, the second bar would stay full during addition.
    const scale=Math.max(1,Math.min(course.range,model.start+Math.max(10,Math.abs(model.change)*1.5)));
    const height=value=>value<=0?0:Math.max(3,Math.min(100,Math.round(value/scale*100)));
    const movement=current-model.start;
    const movementText=!jumps.length?'Ready to jump':movement===0?'Back at start':'Moved '+Math.abs(movement)+' '+(movement<0?'left':'right');
    return '<div class="jump-bar-graph" role="group" aria-label="Compare the starting number with the current number after your jumps.">'+
      '<div class="jump-bar-plot"><span class="jump-bar start" style="height:'+height(model.start)+'%" aria-hidden="true">A</span><span class="jump-bar now" style="height:'+height(current)+'%" aria-hidden="true">B</span></div>'+
      '<span class="jump-bar-caption">Start <strong>'+model.start+'</strong></span><span class="jump-bar-caption">After jumps <strong>'+current+'</strong></span>'+
      '<span class="jump-bar-movement">'+movementText+'</span></div>';
  }
  function lineOvershootRoom(model){const amount=Math.abs(model.change);return Math.ceil(amount/10)*10-amount;}
  function lineShortcuts(model,jumps=[],custom=[]){
    const base=course.grade===1?[10,5,2,1]:[100,50,20,10,5,1];
    const ones=Math.abs(model.change)%10;
    const limit=course.range;
    const ready=[...base,...(ones>1?[ones]:[])].filter(n=>n<=limit);
    const saved=Array.isArray(custom)?custom.filter(n=>Number.isInteger(n)&&n>=1&&n<=limit):[];
    return [...new Set([...ready,...saved])].sort((a,b)=>b-a);
  }
  function lineJumpLabel(jump){return (jump>0?'+':'−')+Math.abs(jump);}
  function lineJumpProblem(model,jumps,jump){
    if(!Number.isInteger(jump)||!jump||Math.abs(jump)>course.range)return 'Choose a whole-number jump from 1 to '+course.range+'.';
    const remaining=lineToGoal(model,jumps);
    if(!remaining)return 'Goal reached. Use Undo if you want a different route.';
    if(Math.sign(jump)!==Math.sign(remaining))return Math.sign(remaining)===Math.sign(model.change)?'Jump toward the goal first.':'Use the return jump to reach the goal.';
    const movingOut=Math.sign(remaining)===Math.sign(model.change);
    const room=movingOut?lineOvershootRoom(model):0;
    const placeValueJump=movingOut&&course.grade>=2&&(Math.abs(jump)===50||Math.abs(jump)===100);
    if(Math.abs(jump)>Math.abs(remaining)+room&&!placeValueJump)return 'Too large for the remaining jump';
    if(lineLanding(model,jumps)+jump<0||lineLanding(model,jumps)+jump>course.range)return 'That jump would go outside 0 to '+course.range+'.';
    if(jumps.length>=30)return 'This line is full. Undo or start again.';
    return '';
  }
  function lineShortcutButtons(model,jumps,custom,picked,index=null,name=''){
    const sign=model.change<0?-1:1,remaining=lineToGoal(model,jumps);
    const choices=lineShortcuts(model,jumps,custom).map(size=>({jump:sign*size,saved:custom.includes(size)}));
    if(remaining&&Math.sign(remaining)!==sign)choices.push({jump:remaining,returnJump:true});
    return choices.map(({jump,saved,returnJump})=>{
      const problem=lineJumpProblem(model,jumps,jump),direction=jump<0?'left':'right';
      return '<button type="button" class="line-piece'+(saved?' custom-jump':'')+(returnJump?' return-jump':'')+'"'+(index==null?'':' data-line-model="'+index+'"')+' data-line-piece="'+jump+'" data-line-quick="'+Math.abs(jump)+'" aria-pressed="'+(picked===jump)+'" aria-label="'+(name?name+' ':'')+(returnJump?'return jump ':'')+(saved?'my jump ':'jump ')+direction+' '+Math.abs(jump)+'"'+(problem?' disabled title="'+h(problem)+'"':'')+'>'+lineJumpLabel(jump)+(returnJump?'<small>Back to goal</small>':saved?'<small>My jump</small>':'')+'</button>';
    }).join('');
  }
  function selectLineJump(jump,m,a=entry(),modelIndex=null,rememberCustom=false){
    const index=modelIndex==null?Number(a.lineSelected)||0:modelIndex,model=lineModels(m,a)[index];if(!model)return;
    const problem=lineJumpProblem(model,lineJumps(a,index),jump);
    if(problem){writeEntry({...a,lineNotice:problem,lineNoticeError:true});renderDay(true);return;}
    const old=Array.isArray(a.lineCustomChoices?.[index])?a.lineCustomChoices[index]:[];
    const choices=rememberCustom?{...(a.lineCustomChoices||{}),[index]:[...new Set([...old,Math.abs(jump)])].slice(-12)}:a.lineCustomChoices;
    writeEntry({...a,lineSelected:index,linePicked:jump,lineCustomChoices:choices,lineNotice:(rememberCustom?'Your '+lineJumpLabel(jump)+' jump is now listed above. ':'Selected '+lineJumpLabel(jump)+'. ')+'Tap the number line, or drag the jump onto it.',lineNoticeError:false});renderDay(true);
  }
  function placeLineJump(jump,m,a=entry(),modelIndex=null,fromDrag=false){
    const models=lineModels(m,a),index=Math.max(0,Math.min(models.length-1,modelIndex==null?Number(a.lineSelected)||0:modelIndex)),model=models[index];if(!model)return;
    if(isTeamComparison(m)&&!fromDrag&&Number(a.lineSelected)!==index){writeEntry({...a,lineNotice:'Choose a jump for '+(index===0?'Team A':'Team B')+' first.',lineNoticeError:true,lineSelected:index,linePicked:null});renderDay(true);return;}
    if(!Number.isInteger(jump)||!jump){writeEntry({...a,lineNotice:'Choose a jump first, then tap the number line.',lineNoticeError:false});renderDay(true);return;}
    const old=lineJumps(a,index),next=lineLanding(model,old)+jump;
    const problem=lineJumpProblem(model,old,jump);
    if(problem){writeEntry({...a,lineNotice:problem,lineNoticeError:true});renderDay(true);return;}
    const nextJumps=[...old,jump],returnAmount=lineToGoal(model,nextJumps);
    const correction=returnAmount&&Math.sign(returnAmount)!==Math.sign(model.change);
    const notice='Jumped '+lineJumpLabel(jump)+'. Landed on '+next+'.'+(correction?' Jump '+lineJumpLabel(returnAmount)+' back to the goal.':'');
    writeEntry({...a,checked:false,teacherFilled:false,lineSelected:index,linePicked:correction?null:jump,lineJumps:{...(a.lineJumps||{}),[index]:nextJumps},lineNotice:notice,lineNoticeError:false});renderDay(true);
  }
  function linePicture(model,jumps,markerId){
    const places=[model.start];jumps.forEach(jump=>places.push(places.at(-1)+jump));
    const reach=Math.max(10,Math.abs(model.change)),direction=model.change<0?-1:1;
    const min=Math.min(...places,model.start+Math.min(0,direction*reach));
    const max=Math.max(...places,model.start+Math.max(0,direction*reach));
    const span=Math.max(1,max-min),x=n=>Math.round(38+(n-min)/span*564);
    const arcs=jumps.map((jump,i)=>{const left=x(places[i]),right=x(places[i+1]),mid=(left+right)/2,top=i%2?69:37;
      // A quadratic arc reaches its highest point halfway between the baseline
      // and its control point. Keep the label near that apex, below the header.
      const labelY=Math.round((112+top)/2)-13;
      return '<path class="jump-arc '+(jump<0?'jump-left':'jump-right')+'" d="M '+left+' 112 Q '+mid+' '+top+' '+right+' 112" marker-end="url(#'+markerId+')"/><text class="jump-label" x="'+mid+'" y="'+labelY+'">'+(jump>0?'+':'')+jump+'</text>';}).join('');
    const tickEvery=span<=25?1:span<=100?10:span<=300?25:100;
    const ticks=Array.from({length:Math.floor(max/tickEvery)-Math.ceil(min/tickEvery)+1},(_,i)=>'<line class="jump-background-tick" x1="'+x((Math.ceil(min/tickEvery)+i)*tickEvery)+'" y1="106" x2="'+x((Math.ceil(min/tickEvery)+i)*tickEvery)+'" y2="118"/>').join('');
    const marks=places.map((place,i)=>'<g><line x1="'+x(place)+'" y1="104" x2="'+x(place)+'" y2="120" class="jump-tick"/><circle cx="'+x(place)+'" cy="112" r="'+(i===places.length-1?6:4)+'" class="jump-dot"/><text class="jump-value" x="'+x(place)+'" y="'+(i%2?160:143)+'">'+place+'</text></g>').join('');
    return '<svg class="jump-svg" viewBox="0 0 640 178" role="img" aria-label="Start at '+model.start+(model.change<0?' on the right and jump left to subtract '+Math.abs(model.change)+'. ':' on the left and jump right to add '+Math.abs(model.change)+'. ')+(jumps.length?jumps.map(n=>n>0?'add '+n:'subtract '+Math.abs(n)).join(', ')+'. Land at '+places.at(-1):'No jumps yet')+'"><defs><marker id="'+markerId+'" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M 0 0 L 8 4 L 0 8 z" fill="#176b63"/></marker></defs><line class="jump-baseline" x1="24" y1="112" x2="616" y2="112"/>'+ticks+arcs+marks+'<text class="jump-start-label" x="'+Math.max(75,Math.min(565,x(model.start)))+'" y="24" text-anchor="middle">Start: '+model.start+'</text><text class="jump-goal" x="'+(direction<0?142:498)+'" y="24" text-anchor="middle">'+(direction<0?'Subtract ':'Add ')+Math.abs(model.change)+'</text></svg>';
  }
  function lineCurriculumWording(grade){return grade===1?'Grade 1 B2.3 (mental strategies to 20) and B2.4 (diagrams for addition and subtraction to 50)':grade===2?'Grade 2 B2.3 (mental strategies to 50) and B2.4 (diagrams for addition and subtraction to 100)':'Grade 3 B2.3 (mental strategies to 1000) and B2.5 (addition and subtraction to 1000)';}
  function lineCurriculum(){
    const wording=lineCurriculumWording(course.grade);
    return '<details class="line-curriculum"><summary>📘 Why use a jump line? Ontario curriculum</summary><p>The jump line is an <em>open number line</em> used to show the parts of an addition or subtraction strategy. See <strong>'+wording+'</strong> in the <a href="https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-mathematics/grades/g'+course.grade+'-math/strand-b/b2" target="_blank" rel="noopener">Ontario Mathematics Curriculum (2020), Number strand</a>. The curriculum describes number lines as a tool for visualizing and communicating strategies; it does not require this exact on-screen tool.</p></details>';
  }
  function lineInstruction(m,model){
    const amount=Math.abs(model.change),side=model.change<0?'right':'left',direction=model.change<0?'left':'right';
    if(m.type==='estimate'&&m.groups){const name=h(m.collectionName||'Group');return 'Start with <strong>'+name+' A ('+m.groups[0]+')</strong> on the left. Add all <strong>'+m.groups[1]+' from '+name+' B</strong> by making jumps to the right.';}
    if(m.type==='round')return 'Start at <strong>'+model.start+'</strong> on the right. Jump left <strong>'+amount+'</strong> to reach <strong>'+lineLanding(model,[model.change])+'</strong>; compare this distance with the other endpoint.';
    return 'Start at <strong>'+model.start+'</strong> on the '+side+'. Drag or tap jumps to move <strong>'+direction+'</strong>; '+(model.change<0?'subtract':'add')+' <strong>'+amount+'</strong> altogether. A jump may pass the goal; use the return jump to correct it.';
  }
  function lineGoal(m,model,jumps){
    const remaining=lineToGoal(model,jumps);
    const source=m.type==='estimate'?' from '+h(m.collectionName||'Group')+' B':'';
    const progress=remaining===0?'Goal reached ✓':Math.sign(remaining)===Math.sign(model.change)?Math.abs(remaining)+' left to '+(model.change<0?'subtract':'add'):Math.abs(remaining)+' to '+(remaining>0?'add':'subtract')+' back';
    return '<p class="line-goal" role="status"><strong>Jump goal: '+lineJumpLabel(model.change)+source+'</strong><span>'+progress+'</span></p>';
  }
  function renderTeamNumberLines(m,a,models){
    const work=models.map((model,index)=>{
      const name=index===0?'Team A':'Team B',jumps=lineJumps(a,index),landing=lineLanding(model,jumps);
      const custom=Array.isArray(a.lineCustomChoices?.[index])?a.lineCustomChoices[index]:[];
      const picked=Number(a.lineSelected)===index?Number(a.linePicked)||0:0;
      const done=jumps.length>0&&landing===model.start+model.change;
      const jumpId='team-jump-'+renderingMissionIndex+'-'+index;
      return '<section class="team-line-card" aria-label="'+name+' interactive number line"><h3>'+teamJersey(index)+name+'</h3><p class="team-equation">'+h(model.label.replace(/^Team [AB] · /,''))+' = ?</p><p class="line-instruction">'+lineInstruction(m,model)+'</p>'+lineGoal(m,model,jumps)+
        '<div class="line-jump-picker"><div class="line-shortcuts" role="group" aria-label="'+name+' jump sizes">'+lineShortcutButtons(model,jumps,custom,picked,index,name)+'</div>'+ 
        '<div class="line-custom line-custom-top"><label for="'+jumpId+'">Make my own jump:</label><input id="'+jumpId+'" type="number" inputmode="numeric" min="1" max="'+course.range+'" value="'+h(a.lineDrafts?.[index]||'1')+'" data-line-draft data-line-model="'+index+'"><button type="button" data-action="line-pick-custom" data-line-model="'+index+'">Add jump choice</button></div></div>'+ 
        '<div class="line-visual"><div class="line-zone" data-line-zone data-line-model="'+index+'" role="button" tabindex="0" aria-label="'+name+' number line: place selected jump">'+linePicture(model,jumps,'line-arrow-'+renderingMissionIndex+'-'+index)+'</div>'+lineProgressBars(model,jumps)+'</div>'+ 
        '<div class="line-landing" role="status">'+(jumps.length?'Landing number: <strong>'+landing+'</strong>':'Start number: <strong>'+model.start+'</strong>')+(done?'<span class="team-line-ready"> ✓ Total reached</span>':'')+'</div>'+ 
        (jumps.length?'<div class="line-string" aria-label="'+name+' number string"><strong>My jumps:</strong> '+jumps.map((jump,i)=>{const from=lineLanding(model,jumps.slice(0,i));return '<span>'+from+' '+(jump<0?'−':'+')+' '+Math.abs(jump)+' = '+(from+jump)+'</span>';}).join('<span class="line-string-arrow" aria-hidden="true">→</span>')+'</div>':'')+ 
        '<div class="line-foot"><button type="button" data-action="line-undo" data-line-model="'+index+'" '+(jumps.length?'':'disabled')+'>Undo</button><button type="button" data-action="line-reset" data-line-model="'+index+'" '+(jumps.length?'':'disabled')+'>Restart</button></div>'+ 
        (Number(a.lineSelected)===index&&a.lineNotice?'<p class="line-notice'+(a.lineNoticeError?' error':'')+'" role="status">'+h(a.lineNotice)+'</p>':'')+'</section>';
    }).join('');
    const results=models.map((model,index)=>{const jumps=lineJumps(a,index),landing=lineLanding(model,jumps);return '<span><strong>'+teamJersey(index)+'Team '+(index===0?'A':'B')+':</strong> '+(jumps.length?landing:'not worked out yet')+'</span>';}).join('');
    return '<section class="number-line-panel team-number-line-panel" aria-label="Compare two interactive number lines"><div class="number-line-head"><strong>🛣️ Work out both teams</strong><span>Use each line, then compare the landing numbers.</span></div><div class="team-lines">'+work+'</div><div class="team-results" aria-label="Compare your landing numbers">'+results+'</div>'+lineCurriculum()+'</section>';
  }
  function renderNumberLine(m,a){
    const models=lineModels(m,a);if(!models.length)return '';
    if(isTeamComparison(m)&&models.length===2)return renderTeamNumberLines(m,a,models);
    const index=Math.max(0,Math.min(models.length-1,Number(a.lineSelected)||0)),model=models[index];
    const jumps=lineJumps(a,index),landing=lineLanding(model,jumps);
    const custom=Array.isArray(a.lineCustomChoices?.[index])?a.lineCustomChoices[index]:[],picked=Number(a.linePicked)||0;
    let canUse=false;if(jumps.length&&m.type==='chart')canUse=landing>=1&&landing<=50;
    if(jumps.length&&m.type==='slider')canUse=landing>=m.min&&landing<=m.max&&(landing-m.min)%m.step===0;
    if(jumps.length&&m.type==='string')canUse=landing>=0&&landing<=course.range;
    if(jumps.length&&m.type==='choice')canUse=m.options?.includes(String(landing));
    return '<section class="number-line-panel" aria-label="Interactive jump number line"><div class="number-line-head"><strong>Try it on a number line</strong></div>'+
      (models.length>1?'<div class="line-models" role="group" aria-label="Choose a calculation">'+models.map((item,i)=>'<button type="button" data-line-select="'+i+'" aria-pressed="'+(i===index)+'">'+h(item.label)+'</button>').join('')+'</div>':'')+
      '<p class="line-expression">'+h(model.label)+' = ?</p><p class="line-instruction">'+lineInstruction(m,model)+' Use Undo to try a different route.</p>'+lineGoal(m,model,jumps)+
      '<div class="line-jump-picker"><div class="line-shortcuts" role="group" aria-label="Choose a jump">'+lineShortcutButtons(model,jumps,custom,picked)+'</div>'+
      '<div class="line-custom line-custom-top"><label for="line-jump-size-'+renderingMissionIndex+'">Make my own jump:</label><input id="line-jump-size-'+renderingMissionIndex+'" type="number" inputmode="numeric" min="1" max="'+course.range+'" value="'+h(a.lineDraft||'1')+'" data-line-draft><button type="button" data-action="line-pick-custom">Add jump choice</button></div></div>'+
      '<div class="line-visual"><div class="line-zone" data-line-zone role="button" tabindex="0" aria-label="Number line: place selected jump">'+linePicture(model,jumps,'line-arrow-'+renderingMissionIndex+'-'+index)+'</div>'+lineProgressBars(model,jumps)+'</div>'+ 
      '<div class="line-summary">'+
        '<div class="line-result"><div class="line-landing" role="status" aria-live="polite">'+(m.type==='round'?'Distance jumped: <strong>'+Math.abs(jumps.reduce((sum,n)=>sum+n,0))+'</strong> · ':'')+'Landing number: <strong>'+landing+'</strong></div>'+
        (a.lineNotice?'<p class="line-notice'+(a.lineNoticeError?' error':'')+'" role="status" aria-live="polite">'+h(a.lineNotice)+'</p>':'')+'</div>'+ 
        '<div class="line-string" aria-label="My number string"><strong>My number string:</strong> '+(jumps.length?jumps.map((jump,i)=>{const from=lineLanding(model,jumps.slice(0,i));return '<span>'+from+' '+(jump<0?'−':'+')+' '+Math.abs(jump)+' = '+(from+jump)+'</span>';}).join('<span class="line-string-arrow" aria-hidden="true">→</span>'):'<span>Start at '+model.start+'. Your jumps will appear here.</span>')+'</div>'+ 
        '<div class="line-actions"><div class="line-foot"><button type="button" data-action="line-undo" '+(jumps.length?'':'disabled')+'>Undo last jump</button><button type="button" data-action="line-reset" '+(jumps.length?'':'disabled')+'>Restart line</button>'+(canUse?'<button type="button" data-action="line-use">Use my landing number</button>':'')+'</div></div>'+ 
      '</div>'+lineCurriculum()+'</section>';
  }
  function widget(m,a){if(m.type==='transfer')return renderTransfer(m,a);if(m.type==='decompose')return renderDecompose(m,a);if(m.type==='mean')return renderMean(m,a);if(m.type==='readingGraph')return renderReadingGraph(m,a);if(m.type==='choice')return renderChoice(m,a);if(m.type==='slider')return renderSlider(m,a);if(m.type==='chart')return renderChart(m,a);if(m.type==='estimate')return renderEstimate(m,a);if(m.type==='build')return renderBuild(m,a);if(m.type==='string')return renderString(m,a);if(m.type==='order')return renderOrder(m,a);if(m.type==='share')return (m.mode==='fraction'&&m.items%m.sharers?'<p class="fraction-tip">✂️ After dealing the whole items, tap <strong>Show equal cuts</strong> to see how the leftovers can be shared.</p>':'')+renderShare(m,a);if(m.type==='shade')return renderShade(m,a);if(m.type==='fractionCompare')return renderFractionCompare(m,a);if(m.type==='round')return renderRound(m,a);return '';}
  function answered(m,a){
    if(m.type==='transfer')return a.value!=null&&Number(a.transferMoves||0)>0;
    if(m.type==='decompose'){const used=course.grade===3?[0,1,2]:[1,2],parts=a.decomp||{};return a.value!=null&&['left','right','sums'].every(key=>used.every(i=>String(parts[key]?.[i]??'').trim()!==''));}
    if(m.type==='mean')return String(a.meanTotal??'').trim()!==''&&String(a.meanValue??'').trim()!==''&&m.values.every((_,i)=>a.meanBins?.[i])&&m.meanFollowUps.every((_,i)=>String(a.meanFollowUps?.[i]??'').trim()!=='');
    if(m.type==='readingGraph')return ['girls','boys','class'].every(series=>m.days.every((_,i)=>Number.isInteger(a.graphBars?.[series]?.[i])))&&m.questions.every((_,i)=>String(a.graphAnswers?.[i]??'').trim()!=='');
    if(m.type==='string')return Array.isArray(a.stepValues)&&a.stepValues.some(value=>String(value??'').trim()!=='');
    if(m.type==='build')return completedBuildLine(m,a)||Array.isArray(a.parts)&&a.parts.some(Boolean);
    if(m.type==='order')return Array.isArray(a.slots)&&a.slots.some(Boolean);
    if(m.type==='shade')return !!(a.shades&&((a.shades.A||[]).length||(a.shades.B||[]).length));
    if(m.type==='share')return !!(a.value||a.placed&&Object.keys(a.placed).length);
    if(m.type==='estimate')return a.value!=null;
    return a.value!=null&&a.value!=='';
  }
  function correct(m,a){
    if(m.type==='transfer')return a.value===m.answer&&Number(a.transferMoves||0)>0&&friendlyPiles(m,transferPiles(m,a));
    if(m.type==='decompose'){
      if(a.value!==m.answer)return false;
      const used=course.grade===3?[0,1,2]:[1,2],parts=a.decomp||{},left=digits(m.addends[0]),right=digits(m.addends[1]);
      return used.every(i=>String(parts.left?.[i]??'').trim()!==''&&Number(parts.left[i])===left[i]&&String(parts.right?.[i]??'').trim()!==''&&Number(parts.right[i])===right[i]&&String(parts.sums?.[i]??'').trim()!==''&&Number(parts.sums[i])===left[i]+right[i]);
    }
    if(m.type==='mean')return Number(a.meanTotal)===m.total&&Number(a.meanValue)===m.mean&&m.values.every((value,i)=>a.meanBins?.[i]===(value<m.mean?'below':value===m.mean?'at':'above'))&&m.meanFollowUps.every((item,i)=>String(a.meanFollowUps?.[i]??'').trim()!==''&&Number(a.meanFollowUps[i])===Number(item.answer));
    if(m.type==='readingGraph')return ['girls','boys','class'].every(series=>m.days.every((_,i)=>a.graphBars?.[series]?.[i]===m[series==='class'?'totals':series][i]))&&m.answers.every((answer,i)=>String(a.graphAnswers?.[i]??'').trim().toLowerCase()===answer.toLowerCase());
    if(m.type==='string')return Array.isArray(a.stepValues)&&m.steps.every((step,i)=>String(a.stepValues[i]??'').trim()!==''&&Number(a.stepValues[i])===step.answer);
    if(m.type==='choice'||m.type==='fractionCompare')return a.value===m.answer;
    if(m.type==='slider'||m.type==='round')return Number(a.value)===m.answer;
    if(m.type==='chart')return Number(a.value)===m.target;
    if(m.type==='estimate')return a.value!=null&&a.verified===true;
    if(m.type==='build'){
      if(completedBuildLine(m,a))return true;
      if(!Array.isArray(a.parts)||a.parts[0]*100+a.parts[1]*10+a.parts[2]!==m.target)return false;
      const addends=buildAddends(m);
      return !addends||!Array.isArray(a.buildGroups)||buildGroups(a).every((group,index)=>groupValue(group)===addends[index]);
    }
    if(m.type==='order')return Array.isArray(a.slots)&&m.answer.every((value,i)=>a.slots[i]===value);
    if(m.type==='shade')return !!(a.shades&&(a.shades.A||[]).length===m.a[0]&&(a.shades.B||[]).length===m.b[0]);
    if(m.type==='share'){
      const counts=shareCounts(m,a),whole=Math.floor(m.items/m.sharers),placed=counts.reduce((x,y)=>x+y,0);
      return a.value===m.answer&&counts.every(n=>n===whole)&&m.items-placed===m.items%m.sharers&&(m.mode!=='fraction'||m.items%m.sharers===0||a.cut===true);
    }
    return false;
  }
  function studentCompleted(m,a){return !!(a.checked&&!a.teacherFilled&&correct(m,a));}
  function dayStats(day,d=dayIndex){
    const stats={coreDone:0,coreTotal:0,bonusDone:0,bonusTotal:0};
    day.missions.forEach((m,i)=>{const group=m.bonus?'bonus':'core';stats[group+'Total']++;if(studentCompleted(m,state.answers[answerKey(d,i)]||{}))stats[group+'Done']++;});
    stats.done=stats.coreDone+stats.bonusDone;
    stats.total=stats.coreTotal+stats.bonusTotal;
    return stats;
  }
  function cheerMessage(count){return cheers[(week*11+dayIndex*7+course.grade*5+count/5*3)%cheers.length];}
  function renderDayProgress(day){
    const stats=dayStats(day),percent=Math.round(stats.done/stats.total*100),scope=week+':'+track+':'+dayIndex;
    const initial=lastProgressKey===scope?lastProgressPercent:percent;
    lastProgressKey=scope;lastProgressPercent=percent;
    const coreLeft=stats.coreTotal-stats.coreDone;
    const details=track==='school'
      ?(coreLeft?coreLeft+' core left · ':'Core done · ')+stats.bonusDone+'/'+stats.bonusTotal+' extras'
      :(coreLeft?coreLeft+' assigned left · ':'Assigned done · ')+stats.bonusDone+'/'+stats.bonusTotal+' optional';
    const checkpoint=track==='school'?'<span class="progress-checkpoint" style="left:'+(stats.coreTotal/stats.total*100)+'%" aria-hidden="true">⚑</span>':'';
    const saved=state.milestones?.[dayIndex],active=saved?.active;
    const celebration=active?'<div class="milestone-cheer" role="status" aria-live="polite"><span class="cheer-emoji" aria-hidden="true">🎉</span><div><strong>'+active+' questions complete!</strong><span>'+h(cheerMessage(active))+(track==='school'&&active===stats.coreTotal?' Your class lesson is complete; extra practice is ready if you have time.':'')+'</span></div><button type="button" data-action="close-cheer" aria-label="Close encouragement">×</button></div>':'';
    return '<section class="day-progress" aria-label="Progress for '+days[dayIndex]+'"><div class="progress-head"><strong>🚗 '+stats.done+' of '+stats.total+' questions complete</strong><span>'+h(details)+'</span></div><div class="drive-track" role="progressbar" aria-label="'+days[dayIndex]+' questions complete" aria-valuemin="0" aria-valuemax="'+stats.total+'" aria-valuenow="'+stats.done+'"><div class="drive-fill" data-drive-fill style="width:'+initial+'%"></div>'+checkpoint+'<span class="drive-car" data-drive-car style="left:'+initial+'%" aria-hidden="true">🚗</span><span class="drive-finish" aria-hidden="true">🏁</span></div>'+celebration+'</section>';
  }
  function status(m,a){if(a.teacherFilled)return 'Teacher-filled';if(!a.checked)return answered(m,a)?'Not checked':'Not attempted';if(m.type==='estimate')return 'Estimate verified';return correct(m,a)?'Correct':'Try again';}
  function feedback(m,a){
    const s=status(m,a);
    if(m.type==='transfer'&&s==='Try again')return '<div class="feedback try" role="status">🔁 Check the sum and move blocks until one side makes a full '+(m.friendlyUnit===100?'hundred':'ten')+'. The two groups still contain the same total.</div>';
    if(m.type==='decompose'&&s==='Try again')return '<div class="feedback try" role="status">🔁 Check both numbers, then add each place-value column before choosing the total.</div>';
    if(m.type==='mean'&&s==='Try again')return '<div class="feedback try" role="status">🔁 Check the total and the divide-by-five step. Then compare each group with the mean and check the equal-share questions.</div>';
    if(m.type==='readingGraph'&&s==='Try again')return '<div class="feedback try" role="status">🔁 Match each bar to its tally. Add the two groups for the class total, then check the graph questions.</div>';
    if(m.type==='string'){
      if(s==='Correct')return '<div class="feedback good" role="status">✅ Every step is correct! Read your math string aloud and explain your strategy.</div>';
      if(s==='Try again'){const right=m.steps.filter((step,i)=>String(a.stepValues?.[i]??'').trim()!==''&&Number(a.stepValues[i])===step.answer).length;return '<div class="feedback try" role="status">🔁 '+right+' of '+m.steps.length+' steps match. Check the other steps or open the hint and blocks.</div>';}
      if(s==='Teacher-filled')return '<div class="feedback teacher" role="status">🔴 Teacher-filled steps. The PDF labels these separately from student work.</div>';
      return '<div class="feedback empty" role="status">'+(answered(m,a)?'Your steps are saved. Press Check my work when ready.':'Fill each answer box to build the math string.')+'</div>';
    }
    if(s==='Correct'&&completedBuildLine(m,a))return '<div class="feedback good" role="status">✅ Your number line reaches <strong>'+m.target+'</strong> with the right total jump. Explain how you know.</div>';
    if(s==='Correct')return '<div class="feedback good" role="status">✅ Well done! Your model and answer fit the problem. Explain how you know.</div>';
    if(s==='Estimate verified'){
      const difference=Number(a.value)-m.actual,amount=Math.abs(difference);
      const signed=(difference>0?'+':difference<0?'−':'')+amount;
      return '<div class="feedback good" role="status">🔎 Estimate checked. Your estimate: <strong>'+a.value+'</strong>. Actual count: <strong>'+m.actual+'</strong>. Difference: <strong>'+signed+'</strong> — '+(difference===0?'exactly right!':amount+' too '+(difference>0?'high':'low')+'.')+'</div>';
    }
    if(s==='Try again')return '<div class="feedback try" role="status">🔁 Not yet. '+(m.type==='share'?'Check that every face mat has the same whole-item count. '+(m.mode==='fraction'&&m.items%m.sharers?'Tap Show equal cuts for the leftovers, then choose the full share.':'Leave any extras in the bank, then choose the fair share.'):'Check the model, the labels, and the whole you are using, then try again.')+'</div>';
    if(s==='Teacher-filled')return '<div class="feedback teacher" role="status">🔴 Teacher-filled answer. This is labelled separately in the PDF report.</div>';
    return '<div class="feedback empty" role="status">'+(answered(m,a)?'Ready to check. Press Check my work.':'Use the picture and tools, then press Check my work.')+'</div>';
  }
  function missionEmoji(m){if(isTeamComparison(m))return '👕';if(m.type==='transfer')return '🔄';if(m.type==='decompose')return '🧩';if(m.type==='mean')return '⚖️';if(m.type==='readingGraph')return '📊';if(m.type==='string')return '🧮';if(m.type==='build'||m.blocks)return '🧱';if(m.type==='chart')return '🔢';if(m.type==='estimate')return '🔍';if(m.type==='share')return '🤝';if(m.type==='shade')return '🎨';if(m.type==='fractionCompare')return '⚖️';if(m.type==='round')return '📍';if(m.type==='order')return '🗂️';if(m.type==='slider')return '🔢';if(m.type==='choice')return '✅';return '💡';}
  function contextEmoji(m){
    const icon=String(m.visual||'').trim().match(/^\p{Extended_Pictographic}\uFE0F?/u)?.[0];
    if(icon)return icon;
    const story=String(m.screenStory||m.story||'').toLowerCase();
    if(/garden|seed/.test(story))return '🌱';
    if(/library|book|reading/.test(story))return '📚';
    if(/bike|helmet|parade/.test(story))return '🚲';
    if(/picnic|napkin/.test(story))return '🧺';
    if(/art|paper star/.test(story))return '⭐';
    return '🧮';
  }
  function dayCodeList(day){return [...new Set(day.missions.flatMap(m=>m.code.split(' · ')))].join(' · ');}
  function renderMission(m,index,total){
    renderingMissionIndex=index;
    const a=entry(dayIndex,index),reflectionId='reflection-text-'+index;
    const visual=m.visual&&!m.blocks&&!isTeamComparison(m)&&!['estimate','share','shade','fractionCompare','build','transfer','decompose','mean','readingGraph'].includes(m.type)?'<div class="visual" aria-label="Question visual">'+h(m.visual)+'</div>':'';
    const line=m.jumpLine?renderNumberLine(m,a):'',handsOn=widget(m,a);
    const handsOnFirst=['build','transfer','decompose','estimate','round','order','mean','readingGraph'].includes(m.type);
    const wideLine=handsOnFirst&&m.jumpLine;
    const activity=visual+(handsOnFirst?handsOn:line+handsOn);
    const finish='<div class="mission-actions"><button type="button" class="primary" data-action="check">Check my work</button><button type="button" class="reader-action" data-action="read-aloud">🔊 Read to me</button></div>'+feedback(m,a);
    return '<section class="card mission-card'+(m.blocks?' regroup-question':'')+(isTeamComparison(m)?' team-comparison-question':'')+'" data-mission-index="'+index+'" id="question-'+(index+1)+'"><div class="mission-toolbar"><div class="mission-meta"><span class="mission-index" aria-label="Question '+(index+1)+' of '+total+(m.bonus?', optional practice':'')+'"><span>Question</span><strong>'+ (index+1) +'</strong><small>of '+total+'</small></span>'+(m.bonus?'<span class="mission-bonus">Optional practice</span>':'')+'<span class="code-pill" title="'+h(m.code.split(' · ').map(code=>code+' '+course.expectations[code]).join(' | '))+'">Ontario '+h(briefExpectation(m))+'</span><p class="math-move"><strong><span class="math-emoji" aria-hidden="true">🧮</span>Work it out:</strong> '+h(m.operation)+'</p></div></div><div class="mission-main"><div class="question-lead"><h2><span class="activity-emoji" aria-hidden="true">'+missionEmoji(m)+'</span>'+h(m.title)+'</h2><div class="scene"><span class="scene-emoji" aria-hidden="true">'+contextEmoji(m)+'</span><p>'+h(m.screenStory||m.story)+'</p></div><p class="prompt">'+h(m.prompt)+'</p></div><div class="activity-area">'+activity+
      (wideLine?'':finish)+'</div>'+(wideLine?'<div class="wide-strategy">'+line+finish+'</div>':'')+'</div>'+
      '<details class="reflection"><summary>💬 Explain Question '+(index+1)+': How do you know?</summary><div class="reflection-body"><label for="'+reflectionId+'">Write or tell how you know.</label><textarea id="'+reflectionId+'" data-reflection placeholder="I noticed ... so I ...">'+h(state.reflections[answerKey(dayIndex,index)]||'')+'</textarea><p class="progress-note">Your explanation is saved for this question and appears in the PDF assessment.</p></div></details><div class="print-response">Answer: ____________________ &nbsp; How I know: __________________________________________</div></section>';
  }
  function renderDay(preserveScroll=false){
    if(track==='school'&&!unlocked()){root.innerHTML='<div class="shell"><section class="card locked-message"><h1>🏫 This work is for class.</h1><p>Enter the teacher code to open this School activity. The PDF assessment does not need a code.</p><button type="button" class="primary" data-action="school-access">🔒 Enter School</button><button type="button" class="pdf-tool" data-action="pdf" data-track="school" data-week="'+week+'">'+trillium+' Download PDF assessment</button><p><a class="back" href="index.html">← Back to '+h(gradeName)+' Star</a></p></section>'+teacherButton()+modalMarkup()+'</div>';return;}
    const day=trackDays()[dayIndex];if(!day)return;
    missionIndex=Math.min(Math.max(0,missionIndex),day.missions.length-1);
    const currentScroll=preserveScroll&&typeof window.scrollY==='number'?window.scrollY:0;
    const allDay=day.missions.length,progressMarkup=renderDayProgress(day),progressScope=lastProgressKey,targetPercent=lastProgressPercent;
    const schedule=track==='school'?'<div class="schedule"><strong>⏱️ 60-minute class plan</strong><span>8 min warm-up · 35 min for ten core tasks (about 3–4 min each) · 12 min partner drawing/model · 5 min wrap-up. Questions 11 onward are optional practice, including the strategy studio.</span><p><strong>Warm-up:</strong> '+h(day.warmup)+'</p></div>':'<div class="schedule"><strong>🌠 Home learning</strong>Fifteen assigned questions, then an optional strategy studio. Take breaks whenever you need them.</div>';
    const lessonMarkup='<details class="card lesson-card"><summary>📘 Lesson plan</summary><div class="lesson-details"><h2>'+h(day.focus)+'</h2>'+schedule+'<p>'+h(day.intro)+'</p><p class="hands-on"><strong>✏️ Make and explain:</strong> '+h(day.handsOn)+'</p><p class="grade-notice">You may tap the objects and answer choices. On a tablet, press and hold will not open an object menu. Your work saves as you go.</p></div></details>';
    root.innerHTML='<div class="shell day-shell"><header class="card day-header"><div class="day-heading"><a class="back day-back" href="index.html" aria-label="Back to '+h(gradeName)+' Star menu">← Star menu</a><div class="day-heading-text"><h1>'+h(gradeName)+' Star · '+days[dayIndex]+' '+weekDates[week].dates[dayIndex]+'</h1><p>Week '+week+' '+(track==='school'?'School':'Home')+' · Grade '+course.grade+' · ID '+h(state.studentId)+'</p></div></div><div class="header-actions">'+lessonMarkup+'<button type="button" class="tool" data-action="curriculum">'+trillium+' Curriculum</button><button type="button" class="tool print-day" data-action="print-day">🖨️ Print today</button><button type="button" class="pdf-tool" data-action="pdf" data-track="'+track+'" data-week="'+week+'">'+trillium+' PDF assessment</button></div></header><p class="print-curriculum">Open jump-line reference: Ontario Mathematics (2020), Number strand, '+h(lineCurriculumWording(course.grade))+'. The jump line is a visual strategy, not a separately required tool.</p>'+progressMarkup+
      '<main class="day-layout" aria-label="'+days[dayIndex]+' worksheet">'+day.missions.map((m,i)=>renderMission(m,i,allDay)).join('')+'</main><nav class="day-end-nav" aria-label="Day navigation"><a class="nav-button" href="'+(dayIndex>0?dayLink(dayIndex-1,track,null,week):'index.html')+'">← '+(dayIndex>0?'Previous day':'Star menu')+'</a><span>End of '+days[dayIndex]+' · '+allDay+' questions</span><a class="nav-next" href="'+(dayIndex<4?dayLink(dayIndex+1,track,null,week):'index.html')+'">'+(dayIndex<4?'Next day':'Week complete')+' →</a></nav>'+teacherButton()+modalMarkup()+'</div>';
    requestAnimationFrame(()=>{
      if(preserveScroll&&typeof window.scrollTo==='function')window.scrollTo(0,currentScroll);
      else if(query.has('task')&&typeof root.querySelector==='function')root.querySelector('#question-'+(missionIndex+1))?.scrollIntoView?.({block:'start'});
      requestAnimationFrame(()=>{
        if(progressScope!==lastProgressKey||targetPercent!==lastProgressPercent)return;
        const fill=root.querySelector('[data-drive-fill]'),car=root.querySelector('[data-drive-car]');
        if(fill&&car){fill.style.width=targetPercent+'%';car.style.left=targetPercent+'%';}
      });
    });
  }
  function authorizeSchool(){const code=window.prompt&&window.prompt('Teacher code to enter School work');if(code==='300'){setUnlocked();return true;}if(code!=null)showModal('🏫 School work','<p>This work is for class. Enter the teacher code to continue.</p>');return false;}
  function startTrack(which,w,startDay){if(which==='school'&&!authorizeSchool())return;const input=document.getElementById('week1-'+which+'-id');const id=cleanID(input&&input.value);week=1;track=which;state=blankState(id);saveState();location.href=dayLink(startDay==null?0:startDay,which,null,1);}
  function teacherFill(which,w){
    if(!course||which==='school'&&!unlocked())return;
    const s=loadState(which,w);
    if(window.confirm&&!window.confirm('Fill incorrect or unanswered answers in Week '+w+' '+which+'? Every filled answer will be labelled teacher-filled in the PDF.'))return;
    trackDays(w,which).forEach((day,d)=>{if(day.holiday)return;day.missions.forEach((m,i)=>{
      const old=s.answers[answerKey(d,i)]||{};
      if(old.checked&&correct(m,old)&&!old.teacherFilled)return;
      let filled={...old,checked:true,teacherFilled:true};
      if(m.type==='choice'||m.type==='fractionCompare'||m.type==='slider'||m.type==='round'||m.type==='transfer'||m.type==='decompose')filled.value=m.answer;
      if(m.type==='decompose'){
        const left=digits(m.addends[0]),right=digits(m.addends[1]);
        filled.decomp={left,right,sums:left.map((n,i)=>n+right[i])};
      }
      if(m.type==='mean'){filled.meanTotal=String(m.total);filled.meanValue=String(m.mean);filled.meanBins=Object.fromEntries(m.values.map((n,i)=>[i,n<m.mean?'below':n===m.mean?'at':'above']));filled.meanFollowUps=m.meanFollowUps.map(item=>item.answer);}
      if(m.type==='readingGraph'){filled.graphBars={girls:[...m.girls],boys:[...m.boys],class:[...m.totals]};filled.graphAnswers=[...m.answers];}
      else if(m.type==='string')filled.stepValues=m.steps.map(step=>String(step.answer));
      else if(m.type==='chart')filled.value=m.target;
      else if(m.type==='estimate'){filled.value=m.actual;filled.verified=true;}
      else if(m.type==='build'){
        filled.parts=[...m.parts];filled.newParts=[0,0,0];
        const addends=buildAddends(m);
        if(addends)filled.buildGroups=addends.map(digits);
      }
      else if(m.type==='order')filled.slots=[...m.answer];
      else if(m.type==='shade')filled.shades={A:Array.from({length:m.a[0]},(_,n)=>n),B:Array.from({length:m.b[0]},(_,n)=>n)};
      else if(m.type==='share'){filled.value=m.answer;filled.cut=m.mode==='fraction';filled.placed={};const whole=Math.floor(m.items/m.sharers);for(let j=0;j<whole*m.sharers;j++)filled.placed[j]=j%m.sharers;}
      s.answers[answerKey(d,i)]=filled;
    });});
    try{localStorage.setItem(key(which,w),JSON.stringify(s));}catch(_){}
    if(view==='day'&&which===track&&w===week){state=s;renderDay(true);}else if(view==='grade')renderGrade();
  }
  function teacherTools(){const code=window.prompt&&window.prompt('Teacher code');if(code==null)return;if(code==='300'){setUnlocked();if(view==='grade')renderGrade();else if(view==='day'&&track==='school')renderDay();else showModal('School work unlocked','<p>Week 1 School work is unlocked for this browser session. Choose Pathway Star, Excite Star, or Inspire Star.</p>');return;}if(code==='259'){if(!course){showModal('Choose a grade','<p>Open a grade before using the assessment override.</p>');return;}if(view==='day'){teacherFill(track,1);return;}const choice=window.prompt&&window.prompt('Which Week 1 path should be teacher-filled? Enter 1H or 1S.');if(!choice)return;const match=choice.trim().toUpperCase().match(/^1\s*([HS])$/);if(match)teacherFill(match[1]==='S'?'school':'home',1);else showModal('Choose a path','<p>Enter 1H for Home or 1S for School.</p>');return;}showModal('Teacher code','<p>That code did not open a teacher tool.</p>');}
  function download(which,w){if(!window.STARLIGHT_PDF){showModal('PDF assessment','<p>The PDF maker was not loaded. Please reopen this page.</p>');return;}window.STARLIGHT_PDF.download({gradeName,grade:course.grade,track:which,week:w,course,state:loadState(which,w),days});}
  function readAloud(){const m=trackDays()[dayIndex].missions[missionIndex];if(!('speechSynthesis'in window)){showModal('Read aloud','<p>Your browser does not provide read-aloud on this device.</p>');return;}window.speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(m.story+' '+m.prompt);utterance.rate=course.grade===1?.78:.9;utterance.lang='en-CA';window.speechSynthesis.speak(utterance);}
  function printable(value){return String(value==null?'':value).normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[\u2018\u2019]/g,"'").replace(/[\u201c\u201d]/g,'"').replace(/[\u2013\u2014\u2212]/g,'-').replace(/\u2192/g,' -> ').replace(/[\u00bd]/g,'1/2').replace(/[^\x20-\x7e\n]/g,'').replace(/\s+/g,' ').trim();}
  function pdfEscape(value){return printable(value).replace(/[\\()]/g,'\\$&');}
  function responseText(m,a){
    if(m.type==='transfer'){const piles=transferPiles(m,a);return (a.value==null?'No total chosen':'Total chosen '+a.value)+' | blocks moved '+Number(a.transferMoves||0)+' | model '+pileValue(piles.L)+' + '+pileValue(piles.R)+(friendlyPiles(m,piles)?' | friendly '+(m.friendlyUnit===100?'hundred':'ten'):'');}
    if(m.type==='decompose'){const parts=a.decomp||{};return (a.value==null?'No total chosen':'Total chosen '+a.value)+' | first '+(parts.left||[]).join('/')+' | second '+(parts.right||[]).join('/')+' | column sums '+(parts.sums||[]).join('/');}
    if(m.type==='mean')return 'Total '+(a.meanTotal??'_')+' | mean '+(a.meanValue??'_')+' | below/at/above '+m.values.map((n,i)=>n+':'+(a.meanBins?.[i]||'_')).join(', ')+' | equal-share answers '+m.meanFollowUps.map((_,i)=>a.meanFollowUps?.[i]??'_').join(', ');
    if(m.type==='readingGraph')return 'Bars: '+['girls','boys','class'].map(series=>series+' '+(a.graphBars?.[series]||[]).join(',')).join(' | ')+' | answers '+(a.graphAnswers||[]).join(', ');
    if(m.type==='string')return Array.isArray(a.stepValues)?m.steps.map((step,i)=>step.label+' '+(a.stepValues[i]??'_')).join(' | '):'No steps entered';
    if(m.type==='estimate'){
      if(a.value==null)return 'No estimate entered';
      const difference=Number(a.value)-m.actual,signed=(difference>0?'+':difference<0?'−':'')+Math.abs(difference);
      return 'Estimate '+a.value+(a.verified?' | verified count '+m.actual+' | signed difference '+signed+' ('+(difference===0?'exact':Math.abs(difference)+' too '+(difference>0?'high':'low'))+')':' | count not revealed');
    }
    if(m.type==='build'){
      const model=completedBuildLine(m,a)?lineModels(m,a)[0]:null;
      const lineRoute=model?'Number line '+model.start+' '+lineJumps(a,0).map(lineJumpLabel).join(' ')+' = '+m.target:'';
      if(!Array.isArray(a.parts))return lineRoute||'No model built';
      const total=a.parts[0]*100+a.parts[1]*10+a.parts[2];
      const addends=buildAddends(m);
      const sets=addends&&Array.isArray(a.buildGroups)?
        'Level 1 starting number '+groupValue(buildGroups(a)[0])+'; Level 2 number added '+groupValue(buildGroups(a)[1])+' | ':'';
      return (lineRoute?lineRoute+' | ':'')+sets+a.parts[0]+' hundreds, '+a.parts[1]+' tens, '+a.parts[2]+' ones = '+total+(addends?' | Level 3 total / answer '+total:'');
    }
    if(m.type==='order')return Array.isArray(a.slots)?a.slots.map(x=>x||'_').join(' | '):'No cards placed';
    if(m.type==='shade')return a.shades?'A '+(a.shades.A||[]).length+'/'+m.a[1]+'; B '+(a.shades.B||[]).length+'/'+m.b[1]:'No parts shaded';
    if(m.type==='share')return (a.value||'No share chosen')+' | whole items on mats: '+shareCounts(m,a).join(', ');
    return a.value==null?'No answer':String(a.value);
  }
  function lineWorkText(m,a){
    if(!m.jumpLine)return '';
    return lineModels(m,a).map((model,index)=>{
      const jumps=lineJumps(a,index);
      return jumps.length?model.label+': '+model.start+' '+jumps.map(lineJumpLabel).join(' ')+' = '+lineLanding(model,jumps):'';
    }).filter(Boolean).join(' | ');
  }
  function expectedText(m){if(m.answerGuide)return m.answerGuide;if(m.type==='build'){const addends=buildAddends(m);return (addends?'Level 1 '+addends[0]+'; Level 2 '+addends[1]+' | Level 3 total / answer '+m.target+' | ':'')+m.parts[0]+' hundreds, '+m.parts[1]+' tens, '+m.parts[2]+' ones = '+m.target+' (equivalent trades also correct'+(m.jumpLine?'; or complete the number line':'')+')';}if(m.type==='chart')return String(m.target);if(m.type==='estimate')return 'Actual collection '+m.actual+' (estimate judged for reasonableness after counting)';if(m.type==='order')return m.answer.join(' | ');if(m.type==='shade')return m.a[0]+'/'+m.a[1]+' and '+m.b[0]+'/'+m.b[1];return String(m.answer);}
  function blockTradeText(a){
    const moves=a.blockTrades||{},labels={'break-hundred':'100 to 10 tens','group-tens':'10 tens to 100','break-ten':'10 to 10 ones','group-ones':'10 ones to 10'};
    const result=Object.entries(labels).filter(([key])=>moves[key]).map(([key,label])=>label+' x'+moves[key]);
    if(!result.length){
      if(a.tensTrade||a.traded)result.push('10 tens to 100 x1');
      if(a.onesTrade)result.push('10 to 10 ones x1');
    }
    Object.entries(a.buildGroupTrades||{}).forEach(([key,count])=>{if(count)result.push(key.replace('group-ones','10 ones to 1 ten').replace('group-tens','10 tens to 1 hundred')+' x'+count);});
    return result.length?result.join('; '):'None';
  }
  function pdfBytes(pages,footer){
    pages.forEach((page,index)=>page.push('BT /F1 8 Tf 1 0 0 1 45 28 Tm ('+pdfEscape(footer(index+1,pages.length))+') Tj ET'));
    const objects=[null],pageRefs=[],fontA=3+pages.length*2,fontB=fontA+1;
    objects[1]='<< /Type /Catalog /Pages 2 0 R >>';
    for(let i=0;i<pages.length;i++){
      const pageObj=3+i*2,contentObj=pageObj+1,stream=pages[i].join('\n')+'\n';pageRefs.push(pageObj+' 0 R');
      objects[pageObj]='<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 '+fontA+' 0 R /F2 '+fontB+' 0 R >> >> /Contents '+contentObj+' 0 R >>';
      objects[contentObj]='<< /Length '+stream.length+' >>\nstream\n'+stream+'endstream';
    }
    objects[2]='<< /Type /Pages /Kids ['+pageRefs.join(' ')+'] /Count '+pages.length+' >>';
    objects[fontA]='<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>';
    objects[fontB]='<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>';
    let pdf='%PDF-1.4\n',offsets=[0];for(let i=1;i<objects.length;i++){offsets[i]=pdf.length;pdf+=i+' 0 obj\n'+objects[i]+'\nendobj\n';}
    const xref=pdf.length;pdf+='xref\n0 '+objects.length+'\n0000000000 65535 f \n';for(let i=1;i<objects.length;i++)pdf+=String(offsets[i]).padStart(10,'0')+' 00000 n \n';
    return pdf+'trailer\n<< /Size '+objects.length+' /Root 1 0 R >>\nstartxref\n'+xref+'\n%%EOF';
  }
  function questionToolText(m,grade){
    if(m.type==='transfer')return 'Make a friendly number: move blocks and discs between two groups; moved pieces change colour. Ten-frames show ones. Group or ungroup when useful. Choices: '+m.options.join(' | ');
    if(m.type==='decompose')return 'Break apart both numbers into '+(grade===3?'hundreds, tens, and ones':'tens and ones')+', add matching columns, then choose the total: '+m.options.join(' | ');
    if(m.type==='mean')return 'Calculator available. Values: '+m.values.join(', ')+'. Find the total and mean; place each value below, at, or above the mean. Equal-share questions: '+m.meanFollowUps.map(item=>item.question).join(' | ');
    if(m.type==='readingGraph')return 'Tally girls: '+m.girls.join(', ')+'; boys: '+m.boys.join(', ')+'. Complete paired bars and class-total bars for '+m.days.join(', ')+'. Questions: '+m.questions.join(' | ');
    if(m.type==='string')return 'Math string: '+m.steps.map(step=>step.label+' ___').join(' | ')+(m.blocks?' | Base-ten blocks begin at '+(m.blocks[0]*100+m.blocks[1]*10+m.blocks[2])+'. Ungroup a hundred or ten if useful.':'');
    if(m.blocks)return 'Base-ten blocks: '+m.blocks[0]+' hundreds, '+m.blocks[1]+' tens, '+m.blocks[2]+' ones. Ungroup 1 hundred into 10 tens or 1 ten into 10 ones; reverse trades are available. Choices: '+m.options.join(' | ');
    if(Array.isArray(m.options))return 'Choices: '+m.options.join(' | ');
    if(m.type==='order')return 'Cards to order: '+m.cards.join(' | ');
    if(m.type==='slider')return 'Slider: '+m.min+' to '+m.max+', jumps of '+m.step;
    if(m.type==='chart')return 'Tool: number chart 1 to 50';
    if(m.type==='build')return grade===1?'Tool: tens and ones blocks with a 10-to-ones ungroup button and a reverse trade.':'Tool: base-ten blocks with 100-to-tens and 10-to-ones ungroup buttons where possible; reverse trades are available.';
    if(m.type==='shade')return 'Tool: two equal-sized fraction strips';
    if(m.type==='estimate')return 'Tool: countable collection and estimate slider';
    return '';
  }
  function generateQuestionBankPDF(selectedGrade){
    const gradeList=selectedGrade?[selectedGrade]:['Pathway','Excite','Inspire'];
    if(gradeList.some(name=>!DATA[name]))throw new Error('Unknown Starlight grade');
    const pages=[];let current,y,questionCount=0;
    function newPage(){current=[];pages.push(current);current.push('BT /F2 9 Tf 1 0 0 1 45 759 Tm (STARLIGHT 1  |  TEACHER QUESTION BANK) Tj ET');current.push('0.77 0.84 0.9 RG 45 750 m 567 750 l S');y=735;}
    function rawLine(value,size=9,bold=false,indent=0,space=0){if(y<60)newPage();current.push('BT /'+(bold?'F2':'F1')+' '+size+' Tf 1 0 0 1 '+(45+indent)+' '+y+' Tm ('+pdfEscape(value)+') Tj ET');y-=size*1.35+space;}
    function line(value,size=9,bold=false,indent=0,space=0){const words=printable(value).split(' '),max=Math.max(26,Math.floor((522-indent)/(size*.52)));let row='';for(const word of words){if(!word)continue;if(row&&row.length+1+word.length>max){rawLine(row,size,bold,indent);row=word;}else row+=(row?' ':'')+word;}if(row)rawLine(row,size,bold,indent,space);else y-=size*1.35+space;}
    newPage();line('ALL STARLIGHT 1 QUESTIONS',17,true,0,7);
    line(selectedGrade?selectedGrade+' Star | Grade '+DATA[selectedGrade].grade:'Pathway Star | Excite Star | Inspire Star',11,true,0,4);
    line('Ontario Mathematics 2020 - Number Sense and Operations. Week 1: October 5-9, 2026.',9,false,0,4);
    line('Home: 15 assigned questions per day, plus optional strategy practice. School: Questions 1-10 are core; later questions are extra practice. This teacher copy includes choices and expected answers.',9,false,0,11);
    for(const name of gradeList){
      const book=DATA[name];if(y<320)newPage();
      line(name.toUpperCase()+' STAR - GRADE '+book.grade,15,true,0,6);
      line('Open jump-line tool: Ontario Mathematics (2020), Number strand, '+lineCurriculumWording(book.grade)+'. The tool visualizes a strategy; it is not a separate expectation.',8,false,6,4);
      for(const [code,description] of Object.entries(book.expectations))line(code+' - '+description,8.5,false,6,2);
      y-=8;
      for(const w of [1])for(const which of ['home','school'])book.weeks[w][which].forEach((day,d)=>{
        if(day.holiday)return;
        if(y<220)newPage();
        line('GRADE '+book.grade+' | WEEK '+w+' '+which.toUpperCase()+' | '+days[d].toUpperCase()+' '+weekDates[w].dates[d].toUpperCase(),12,true,0,3);
        line(day.title+' - '+day.focus,9,false,0,7);
        day.missions.forEach((m,i)=>{
          if(y<170)newPage();questionCount++;
          line((i+1)+'. '+(m.bonus?'[EXTRA] ':'')+'['+briefExpectation(m,book.grade)+'] '+m.title,10,true,0,3);
          line('Story: '+m.story,9,false,10,2);
          line('Ask: '+m.prompt,9.5,true,10,2);
          line('Math action: '+m.operation,8.5,false,10,2);
          const tool=questionToolText(m,book.grade);if(tool)line(tool,8.5,false,10,2);
          line('Teacher answer: '+expectedText(m),8.5,false,10,7);
        });
        y-=5;
      });
    }
    const bytes=pdfBytes(pages,(page,total)=>'Starlight 1 question bank | '+(selectedGrade||'All grades')+' | Page '+page+' of '+total);
    return {bytes,pages:pages.length,questionCount,gradeCount:gradeList.length};
  }
  function generatePDF(report){
    const {gradeName:grade,grade:gradeNumber,track:which,course:book,state:s,days:dayNames}=report;
    const reportWeek=1,weekDays=book.weeks[1][which];
    const optionalUnused=(d,i,m)=>which==='school'&&m.bonus&&!answered(m,s.answers[answerKey(d,i)]||{});
    const excluded=(d,i,m)=>optionalUnused(d,i,m);
    const all=weekDays.flatMap((day,d)=>day.holiday?[]:day.missions.filter((m,i)=>!excluded(d,i,m)));
    const counts={correct:0,verified:0,try:0,teacher:0,not:0,bonusNot:0,bonusPending:0};
    weekDays.forEach((day,d)=>{if(day.holiday)return;day.missions.forEach((m,i)=>{if(optionalUnused(d,i,m)){counts.bonusNot++;return;}const result=status(m,s.answers[answerKey(d,i)]||{});if(result==='Correct')counts.correct++;else if(result==='Estimate verified')counts.verified++;else if(result==='Try again')counts.try++;else if(result==='Teacher-filled')counts.teacher++;else if(m.bonus)counts.bonusPending++;else counts.not++;});});
    const pages=[];let current=[],y=742;
    function newPage(){current=[];pages.push(current);y=742;}
    function rawLine(value,size=9,bold=false,indent=0,space=0){if(y<65)newPage();const x=45+indent;current.push('BT /'+(bold?'F2':'F1')+' '+size+' Tf 1 0 0 1 '+x+' '+y+' Tm ('+pdfEscape(value)+') Tj ET');y-=size*1.36+space;}
    function line(value,size=9,bold=false,indent=0,space=0){const source=printable(value),max=Math.max(26,Math.floor((522-indent)/(size*.52)));let words=source.split(' '),row='';for(const word of words){if(!word)continue;if((row?row.length+1:0)+word.length>max&&row){rawLine(row,size,bold,indent);row=word;}else row+=(row?' ':'')+word;}if(row)rawLine(row,size,bold,indent,space);else y-=size*1.45+space;}
    newPage();line('STARLIGHT 1 | '+grade+' STAR | WEEK '+reportWeek+' '+(which==='school'?'SCHOOL':'HOME')+' ASSESSMENT',17,true,0,7);
    line('Grade '+gradeNumber+' - Number and Operations - Student ID: '+s.studentId,10,true,0,3);
    line('Dates: '+weekDates[1].range,9,false,0,3);
    line('Generated fresh: '+new Date().toLocaleString('en-CA')+' | '+all.length+' questions shown across Monday-Friday',9,false,0,9);
    line('SUMMARY',12,true,0,4);
    line('Student correct: '+counts.correct+' | Verified estimates: '+counts.verified+' | Try again: '+counts.try+' | Teacher-filled: '+counts.teacher+' | Core not completed: '+counts.not+(counts.bonusNot?' | Optional not attempted: '+counts.bonusNot:'')+(counts.bonusPending?' | Optional pending check: '+counts.bonusPending:''),9,false,0,6);
    line('Teacher-filled answers are not counted as student correct. Estimates are recorded after verification rather than marked right or wrong.',8,false,0,11);
    line('CURRICULUM EXPECTATIONS',12,true,0,5);
    for(const [code,description] of Object.entries(book.expectations))line(code+' - '+description,8,false,8,3);
    line('Open jump-line tool: Ontario Mathematics (2020), Number strand, '+lineCurriculumWording(gradeNumber)+'. The tool visualizes a strategy; it is not a separate expectation.',8,false,8,4);
    y-=7;
    weekDays.forEach((day,d)=>{
      if(day.holiday)return;
      if(day.missions.every((m,i)=>excluded(d,i,m)))return;
      if(y<180)newPage();line(dayNames[d].toUpperCase()+' '+weekDates[reportWeek].dates[d].toUpperCase()+' - '+day.title,12,true,0,4);
      if(which==='school'){line('60-minute plan: 8 min warm-up; 35 min for ten core tasks; 12 min partner model; 5 min wrap-up. Questions 11 onward are extra practice.',8,false,0,3);line('Warm-up: '+day.warmup,8,false,0,4);}
      line('Hands-on model: '+day.handsOn,8,false,0,6);
      day.missions.forEach((m,i)=>{
        if(excluded(d,i,m))return;
        if(y<132)newPage();const a=s.answers[answerKey(d,i)]||{};
        line((i+1)+'. '+(m.bonus?'[OPTIONAL PRACTICE] ':'')+'['+briefExpectation(m,gradeNumber)+'] '+m.title,9,true,0,2);
        line('Context: '+m.story,8,false,12,1);
        line('Question: '+m.prompt,8,false,12,1);
        line('Math action: '+m.operation,8,false,12,1);
        if(m.blocks){const parts=modelParts(m,a);line((m.type==='string'?'Starting base-ten model: ':'Base-ten model: ')+m.blocks[0]+' hundreds, '+m.blocks[1]+' tens, '+m.blocks[2]+' ones | After trades: '+parts[0]+' hundreds, '+parts[1]+' tens, '+parts[2]+' ones',8,false,12,1);}
        if(m.type==='transfer')line('Compensation model: '+responseText(m,a),8,false,12,1);
        if(m.type==='decompose')line('Place-value decomposition: '+responseText(m,a),8,false,12,1);
        if(m.type==='mean'||m.type==='readingGraph')line('Data work: '+responseText(m,a),8,false,12,1);
        if(m.blocks||m.type==='build')line('Block trades: '+blockTradeText(a),8,false,12,1);
        line('Student work: '+responseText(m,a),8,false,12,1);
        const jumpWork=lineWorkText(m,a);if(jumpWork)line('Open number-line jumps: '+jumpWork,8,false,12,1);
        line('Status: '+status(m,a)+' | Expected: '+expectedText(m),8,false,12,1);
        line('Student explanation: '+(s.reflections[answerKey(d,i)]||'Not entered'),8,false,12,3);
      });
      y-=6;
    });
    if(which==='school'){
      y-=8;
      line('TEACHER OBSERVATIONS AND NEXT STEPS',11,true,0,7);
      line('Hands-on model observed:  Yes / Not yet     Student explained a strategy:  Yes / Not yet',8,false,0,8);
      line('Strengths noticed: _________________________________________________________________',8,false,0,9);
      line('Curriculum expectation for follow-up: _______________________________________________',8,false,0,9);
      line('Next small-group move: _____________________________________________________________',8,false,0,9);
      line('Teacher / date: ______________________________________________________________________',8,false,0,5);
    }
    const pdf=pdfBytes(pages,(page,total)=>'Starlight 1 | Grade '+gradeNumber+' | Week '+reportWeek+' '+(which==='school'?'School':'Home')+' | Page '+page+' of '+total);
    return {bytes:pdf,pages:pages.length,summary:counts};
  }
  function savePdf(bytes,filename){const blob=new Blob([bytes],{type:'application/pdf'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);}
  window.STARLIGHT_PDF={generate:generatePDF,generateQuestionBank:generateQuestionBankPDF,
    download(report){const pdf=generatePDF(report);savePdf(pdf.bytes,'Starlight_1_'+report.gradeName+'_Star_Week1_'+(report.track==='school'?'School':'Home')+'_Assessment.pdf');return pdf;},
    downloadQuestionBank(name){const pdf=generateQuestionBankPDF(name);savePdf(pdf.bytes,'Starlight_1_'+(name?name+'_Star_':'All_Grades_')+'Complete_Question_Bank.pdf');return pdf;}};
  function activateMission(target){
    if(view!=='day'||!target?.closest)return;
    const card=target.closest('[data-mission-index]');
    if(!card)return;
    const index=Number(card.dataset.missionIndex);
    if(!Number.isInteger(index)||index===missionIndex)return;
    resetPick();missionIndex=index;
  }
  root.addEventListener('click',event=>{
    if(event.target.id==='modal'){closeModal();return;}
    activateMission(event.target);
    const transferPiece=event.target.closest('[data-transfer-piece]');
    if(transferPiece&&view==='day'&&Date.now()-lastTransferDragEnd>350){
      selectedTransferBlock={id:transferPiece.dataset.transferPiece,side:transferPiece.dataset.transferSide};
      renderDay(true);return;
    }
    const transferPad=event.target.closest('[data-transfer-pad]');
    if(transferPad&&selectedTransferBlock&&!event.target.closest('button')&&view==='day'){
      const m=trackDays()[dayIndex].missions[missionIndex];
      if(m.type==='transfer')moveTransfer(m,entry(),selectedTransferBlock.id,transferPad.dataset.transferPad);
      return;
    }
    const buildPiece=event.target.closest('[data-build-piece]');
    if(buildPiece&&view==='day'&&Date.now()-lastBuildDragEnd>350){
      selectedBuildBlock={index:Number(buildPiece.dataset.buildPiece),piece:Number(buildPiece.dataset.buildPieceNumber)};
      renderDay(true);return;
    }
    const buildSource=event.target.closest('[data-build-source]');
    if(buildSource&&view==='day'&&Date.now()-lastBuildDragEnd>350){
      const m=trackDays()[dayIndex].missions[missionIndex];
      removeBuildBlock(m,entry(),Number(buildSource.dataset.buildSourcePlace),Number(buildSource.dataset.buildSource));return;
    }
    const buildPad=event.target.closest('[data-build-group]');
    if(buildPad&&!event.target.closest('button')&&view==='day'){
      const m=trackDays()[dayIndex].missions[missionIndex];
      if(buildAddends(m)&&!(track==='school'&&!unlocked())){
        addBuildBlock(m,entry(),Number(buildPad.dataset.buildZone),Number(buildPad.dataset.buildGroup));return;
      }
    }
    const buildZone=event.target.closest('[data-build-zone]');
    if(buildZone&&!event.target.closest('button')&&view==='day'&&!(track==='school'&&!unlocked())){
      const m=trackDays()[dayIndex].missions[missionIndex];
      const index=Number(buildZone.dataset.buildZone);
      if(selectedBuildBlock){moveBuildPiece(m,entry(),selectedBuildBlock.index,index);return;}
      addBuildBlock(m,entry(),index);return;
    }
    const buildBank=event.target.closest('[data-build-bank]');
    if(buildBank&&selectedBuildBlock&&!event.target.closest('button')&&view==='day'){
      const m=trackDays()[dayIndex].missions[missionIndex];
      removeBuildBlock(m,entry(),selectedBuildBlock.index);return;
    }
    const piece=event.target.closest('[data-regroup-piece]');
    if(piece&&view==='day'&&Date.now()-lastRegroupDragEnd>350){
      selectedRegroupSource={index:Number(piece.dataset.regroupPiece),piece:Number(piece.dataset.regroupNumber),newlyMade:piece.dataset.regroupNew==='true'};
      renderDay(true);return;
    }
    const zone=event.target.closest('[data-regroup-zone]');
    if(zone&&selectedRegroupSource&&!event.target.closest('button')){
      moveRegroupBlock(selectedRegroupSource.index,Number(zone.dataset.regroupZone),selectedRegroupSource.newlyMade);
      return;
    }
    const lineZone=event.target.closest('[data-line-zone]');
    if(lineZone&&view==='day'&&(track!=='school'||unlocked())){if(Date.now()-lastLineDragEnd<350)return;const m=trackDays()[dayIndex].missions[missionIndex],modelIndex=lineZone.dataset.lineModel==null?null:Number(lineZone.dataset.lineModel);placeLineJump(Number(entry().linePicked)||0,m,entry(),modelIndex);return;}
    const button=event.target.closest('button');if(!button)return;
    const action=button.dataset.action;
    if(action==='close-modal'){closeModal();return;}
    if(action==='school-access'){if(authorizeSchool())renderDay();return;}
    if(action==='curriculum'){curriculumModal();return;}
    if(action==='print-day'){window.print();return;}
    if(action==='teacher'){teacherTools();return;}
    if(action==='pdf'){download(button.dataset.track||track,Number(button.dataset.week)||week);return;}
    if(action==='question-bank'){window.STARLIGHT_PDF.downloadQuestionBank(button.dataset.bankGrade||null);return;}
    if(button.dataset.start){startTrack(button.dataset.start,Number(button.dataset.week)||week);return;}
    if(button.dataset.enterDay!=null){startTrack(button.dataset.track,Number(button.dataset.week)||week,Number(button.dataset.enterDay));return;}
    if(view!=='day'||track==='school'&&!unlocked())return;
    const m=trackDays()[dayIndex].missions[missionIndex],a=entry();
    if(action==='read-aloud'){readAloud();return;}
    if(action==='close-cheer'){const old=state.milestones?.[dayIndex];if(old){state.milestones[dayIndex]={...old,active:null};saveState();renderDay(true);}return;}
    if(button.dataset.lineSelect!=null){writeEntry({...a,lineSelected:Number(button.dataset.lineSelect),linePicked:null,lineNotice:''});renderDay(true);return;}
    if(button.dataset.lineSign!=null){const index=Number(a.lineSelected)||0;writeEntry({...a,lineSigns:{...(a.lineSigns||{}),[index]:Number(button.dataset.lineSign)},linePicked:null,lineNotice:''});renderDay(true);return;}
    if(button.dataset.lineQuick!=null){if(Date.now()-lastLineDragEnd<350)return;const index=button.dataset.lineModel==null?Number(a.lineSelected)||0:Number(button.dataset.lineModel),model=lineModels(m,a)[index];if(!model)return;const sign=model.change<0?-1:1,jump=button.dataset.linePiece==null?sign*Number(button.dataset.lineQuick):Number(button.dataset.linePiece);selectLineJump(jump,m,a,index);return;}
    if(action==='line-pick-custom'||action==='line-add'){const index=button.dataset.lineModel==null?Number(a.lineSelected)||0:Number(button.dataset.lineModel),model=lineModels(m,a)[index];if(!model)return;const sign=model.change<0?-1:1,draft=button.dataset.lineModel==null?a.lineDraft:a.lineDrafts?.[index]||'1';selectLineJump(sign*Number(draft),m,a,index,action==='line-pick-custom');return;}
    if(action==='line-undo'||action==='line-reset'){const index=button.dataset.lineModel==null?Number(a.lineSelected)||0:Number(button.dataset.lineModel),old=lineJumps(a,index);writeEntry({...a,checked:false,teacherFilled:false,lineSelected:index,lineJumps:{...(a.lineJumps||{}),[index]:action==='line-undo'?old.slice(0,-1):[]},lineNotice:action==='line-undo'?'Last jump removed.':'Line restarted.',lineNoticeError:false});renderDay(true);return;}
    if(action==='line-use'){
      const models=lineModels(m,a),index=Math.max(0,Math.min(models.length-1,Number(a.lineSelected)||0)),model=models[index];if(!model)return;
      const landing=lineLanding(model,lineJumps(a,index));
      if(m.type==='string'){const values=Array.isArray(a.stepValues)?[...a.stepValues]:[];values[model.step]=String(landing);selectedStringStep=model.step;changeEntry({stepValues:values});return;}
      if(m.type==='chart'&&landing>=1&&landing<=50){changeEntry({value:landing});return;}
      if(m.type==='slider'&&landing>=m.min&&landing<=m.max&&(landing-m.min)%m.step===0){changeEntry({value:landing});return;}
      if(m.type==='choice'&&m.options.includes(String(landing))){changeEntry({value:String(landing)});return;}
      return;
    }
    if(action==='string-model'){writeEntry({...a,modelOpen:!a.modelOpen});renderDay(true);return;}
    if(action==='string-hint'){writeEntry({...a,hintOpen:!a.hintOpen});renderDay(true);return;}
    if(m.type==='mean'&&button.dataset.calcKey!=null){
      const display=calcKey(a.calcDisplay||'',button.dataset.calcKey);
      writeEntry({...a,calcDisplay:display});
      const output=button.closest?.('[data-mission-index]')?.querySelector?.('[data-calc-display]');if(output)output.textContent=display||'0';
      return;
    }
    if(m.type==='mean'&&button.dataset.meanBin!=null){
      const bins={...(a.meanBins||{})};bins[button.dataset.meanBin]=button.dataset.meanClass;
      changeEntry({meanBins:bins});return;
    }
    if(m.type==='readingGraph'&&button.dataset.graphDay!=null){
      const answers=[...(a.graphAnswers||[])];answers[0]=button.dataset.graphDay;
      changeEntry({graphAnswers:answers});return;
    }
    if(m.type==='transfer'&&button.dataset.transferTrade){
      const side=button.dataset.transferSide,trade=button.dataset.transferTrade;
      if(trade==='group-ones')tradeTransfer(m,a,side,1,false);
      else if(trade==='break-ten')tradeTransfer(m,a,side,10,true);
      else if(trade==='group-tens')tradeTransfer(m,a,side,10,false);
      else if(trade==='break-hundred')tradeTransfer(m,a,side,100,true);
      return;
    }
    if(m.type==='transfer'&&action==='transfer-undo'){
      const history=[...(a.transferHistory||[])],previous=history.pop();
      if(previous){selectedTransferBlock=null;changeEntry({transferPiles:previous.piles||previous,transferHistory:history,transferMoves:previous.moves??Math.max(0,Number(a.transferMoves||0)-1)});}
      return;
    }
    if(m.type==='transfer'&&action==='transfer-reset'){selectedTransferBlock=null;changeEntry({transferPiles:null,transferHistory:[],transferMoves:0,value:null});return;}
    if(button.dataset.stringTile!=null){const values=Array.isArray(a.stepValues)?[...a.stepValues]:[];values[selectedStringStep]=button.dataset.stringTile;changeEntry({stepValues:values});return;}
    if(action==='check'){
      if(!answered(m,a)){showModal('Finish this question','<p>Use the picture and interactive tool before checking your answer. You can always come back later.</p>');return;}
      const before=dayStats(trackDays()[dayIndex]).done;
      writeEntry({...a,checked:true,...(m.type==='estimate'?{verified:true}:{})});
      const after=dayStats(trackDays()[dayIndex]).done;
      if(after>before&&after%5===0){
        const old=state.milestones[dayIndex]||{};
        if(after>Number(old.last||0)){state.milestones[dayIndex]={last:after,active:after};saveState();}
      }
      renderDay(true);return;
    }
    if(button.dataset.buildGroupTrade){tradeBuildGroup(m,a,button.dataset.buildGroupTrade,Number(button.dataset.buildGroup));return;}
    if(button.dataset.blockTrade){tradeBlocks(m,a,button.dataset.blockTrade);return;}
    if(action==='trade-tens'&&m.blocks){tradeBlocks(m,a,'group-tens');return;}
    if(action==='trade-ones'&&m.blocks){tradeBlocks(m,a,'break-ten');return;}
    if(button.dataset.option!=null){
      const option=m.type==='round'?String(Math.floor(m.value/m.unit)*m.unit+Number(button.dataset.option)*m.unit):m.options[Number(button.dataset.option)];
      changeEntry({value:option});return;
    }
    if(button.dataset.chart!=null){changeEntry({value:Number(button.dataset.chart)});return;}
    if(button.dataset.selectBuildGroup!=null){
      const activeBuildGroup=Number(button.dataset.selectBuildGroup);
      if(button.dataset.addBuildPad!=null){addBuildBlock(m,a,Number(button.dataset.addBuildPad),activeBuildGroup);return;}
      writeEntry({...a,activeBuildGroup});selectedBuildBlock=null;renderDay(true);return;
    }
    if(button.dataset.addBlock!=null){if(Date.now()-lastBuildDragEnd<350)return;addBuildBlock(m,a,Number(button.dataset.addBlock));return;}
    if(button.dataset.removeBlock!=null){removeBuildBlock(m,a,Number(button.dataset.removeBlock));return;}
    if(button.dataset.orderCard!=null){
      const card=button.dataset.orderCard;
      if(selectedPad!=null&&padArmed){
        const slots=Array.isArray(a.slots)?[...a.slots]:Array(m.answer.length).fill(null);
        const old=slots.indexOf(card);if(old!==-1)slots[old]=null;
        slots[selectedPad]=card;pickedOrder=null;padArmed=false;changeEntry({slots});
      }else{pickedOrder=pickedOrder===card?null:card;padArmed=false;renderDay(true);}
      return;
    }
    if(button.dataset.orderSlot!=null){
      const index=Number(button.dataset.orderSlot),slots=Array.isArray(a.slots)?[...a.slots]:Array(m.answer.length).fill(null);
      const wasSelected=selectedPad===index;selectedPad=index;
      if(pickedOrder!=null){const old=slots.indexOf(pickedOrder);if(old!==-1)slots[old]=null;slots[index]=pickedOrder;pickedOrder=null;padArmed=false;changeEntry({slots});}
      else if(wasSelected&&slots[index]){pickedOrder=slots[index];slots[index]=null;padArmed=false;changeEntry({slots});}
      else{padArmed=true;renderDay(true);}
      return;
    }
    if(button.dataset.shareToken!=null){const id=Number(button.dataset.shareToken);pickedToken=pickedToken===id?null:id;renderDay(true);return;}
    const plate=button.closest('[data-share-plate]');
    if(plate&&pickedToken!=null){const placed={...(a.placed||{})};placed[pickedToken]=Number(plate.dataset.sharePlate);pickedToken=null;changeEntry({placed});return;}
    if(action==='deal-round'){
      const placed={...(a.placed||{})},counts=shareCounts(m,a),low=Math.min(...counts);
      if(!counts.every(n=>n===low))return;
      const remaining=Array.from({length:m.items},(_,i)=>i).filter(i=>placed[i]==null);
      if(remaining.length<m.sharers)return;
      for(let i=0;i<m.sharers;i++)placed[remaining[i]]=i;
      pickedToken=null;changeEntry({placed});return;
    }
    if(action==='cut-leftovers'){changeEntry({cut:!a.cut});return;}
    if(button.dataset.shade!=null){
      const label=button.dataset.shade,index=Number(button.dataset.segment),shades={A:[...((a.shades||{}).A||[])],B:[...((a.shades||{}).B||[])]};
      const where=shades[label].indexOf(index);if(where>=0)shades[label].splice(where,1);else shades[label].push(index);
      changeEntry({shades});return;
    }
    if(action==='verify-estimate'){
      if(a.value==null){showModal('Make an estimate first','<p>Move the slider to your estimate, then reveal the count to check it.</p>');return;}
      changeEntry({verified:true});return;
    }
  });
  function elementBelowDrag(event,piece){
    const previous=piece.style.pointerEvents;
    piece.style.pointerEvents='none';
    const under=document.elementFromPoint?.(event.clientX,event.clientY)||null;
    piece.style.pointerEvents=previous;
    return under;
  }
  function setDragHighlight(drag,target){
    if(drag.over===target)return;
    drag.over?.classList?.remove('drag-over');
    drag.over=target;
    target?.classList?.add('drag-over');
  }
  root.addEventListener('pointerdown',event=>{
    const piece=event.target.closest('[data-transfer-piece]');
    if(!piece||view!=='day'||track==='school'&&!unlocked())return;
    activateMission(piece);
    transferDrag={piece,id:piece.dataset.transferPiece,side:piece.dataset.transferSide,pointerId:event.pointerId,startX:event.clientX,startY:event.clientY,moved:false,over:null};
    if(piece.setPointerCapture)piece.setPointerCapture(event.pointerId);
  });
  root.addEventListener('pointermove',event=>{
    if(!transferDrag||event.pointerId!==transferDrag.pointerId)return;
    const dx=event.clientX-transferDrag.startX,dy=event.clientY-transferDrag.startY;
    if(Math.abs(dx)+Math.abs(dy)>8)transferDrag.moved=true;
    if(!transferDrag.moved)return;
    transferDrag.piece.style.transform='translate('+dx+'px,'+dy+'px) scale(1.14)';
    transferDrag.piece.style.zIndex='25';
    transferDrag.piece.classList?.add('dragging');
    const pad=elementBelowDrag(event,transferDrag.piece)?.closest?.('[data-transfer-pad]');
    setDragHighlight(transferDrag,pad&&pad.dataset.transferPad!==transferDrag.side?pad:null);
    if(event.preventDefault)event.preventDefault();
  });
  function finishTransferDrag(event){
    if(!transferDrag||event.pointerId!==transferDrag.pointerId)return;
    const drag=transferDrag;transferDrag=null;
    const pad=drag.moved&&event.type!=='pointercancel'?elementBelowDrag(event,drag.piece)?.closest?.('[data-transfer-pad]'):null;
    setDragHighlight(drag,null);
    drag.piece.style.transform='';drag.piece.style.zIndex='';drag.piece.classList?.remove('dragging');
    if(!drag.moved)return;
    lastTransferDragEnd=Date.now();
    if(pad&&pad.closest('[data-mission-index]')?.dataset.missionIndex===String(missionIndex)){
      const m=trackDays()[dayIndex].missions[missionIndex];
      if(m.type==='transfer')moveTransfer(m,entry(),drag.id,pad.dataset.transferPad);
    }
  }
  root.addEventListener('pointerup',finishTransferDrag);
  root.addEventListener('pointercancel',finishTransferDrag);
  root.addEventListener('pointerdown',event=>{
    const piece=event.target.closest('[data-add-block],[data-build-piece],[data-build-source]');
    if(!piece||view!=='day'||track==='school'&&!unlocked())return;
    activateMission(piece);
    if(trackDays()[dayIndex].missions[missionIndex].type!=='build')return;
    const fromBank=piece.dataset.addBlock!=null,fromGroup=piece.dataset.buildSource!=null;
    buildDrag={piece,fromBank,fromGroup,group:fromGroup?Number(piece.dataset.buildSource):null,index:Number(fromBank?piece.dataset.addBlock:fromGroup?piece.dataset.buildSourcePlace:piece.dataset.buildPiece),pointerId:event.pointerId,startX:event.clientX,startY:event.clientY,startScrollY:Number(window.scrollY)||0,moved:false,over:null};
    if(piece.setPointerCapture)piece.setPointerCapture(event.pointerId);
  });
  root.addEventListener('pointermove',event=>{
    if(!buildDrag||event.pointerId!==buildDrag.pointerId)return;
    const dx=event.clientX-buildDrag.startX,screenDy=event.clientY-buildDrag.startY;
    if(Math.abs(dx)+Math.abs(screenDy)>8)buildDrag.moved=true;
    if(!buildDrag.moved)return;
    // A captured touch pointer otherwise cannot scroll to pads below the
    // viewport. Keep the original piece under the finger as the page moves.
    if(Number.isFinite(window.innerHeight)&&typeof window.scrollBy==='function'){
      const edge=72,y=event.clientY;
      const scroll=y>window.innerHeight-edge?Math.min(30,Math.ceil((y-window.innerHeight+edge)/3)):
        y<edge?-Math.min(30,Math.ceil((edge-y)/3)):0;
      if(scroll)window.scrollBy(0,scroll);
    }
    const dy=screenDy+(Number(window.scrollY)||0)-buildDrag.startScrollY;
    buildDrag.piece.style.transform='translate('+dx+'px,'+dy+'px) scale(1.12)';
    buildDrag.piece.style.zIndex='25';buildDrag.piece.classList?.add('dragging');
    const under=elementBelowDrag(event,buildDrag.piece),zone=under?.closest?.('[data-build-zone]'),bank=under?.closest?.('[data-build-bank]');
    setDragHighlight(buildDrag,zone||(!buildDrag.fromBank&&bank)||null);
    if(event.preventDefault)event.preventDefault();
  });
  function finishBuildDrag(event){
    if(!buildDrag||event.pointerId!==buildDrag.pointerId)return;
    const drag=buildDrag;buildDrag=null;
    const under=drag.moved&&event.type!=='pointercancel'?elementBelowDrag(event,drag.piece):null;
    const zone=under?.closest?.('[data-build-zone]'),bank=under?.closest?.('[data-build-bank]');
    setDragHighlight(drag,null);
    drag.piece.style.transform='';drag.piece.style.zIndex='';drag.piece.classList?.remove('dragging');
    if(!drag.moved)return;
    lastBuildDragEnd=Date.now();
    const destination=zone||bank;
    if(!destination||destination.closest('[data-mission-index]')?.dataset.missionIndex!==String(missionIndex))return;
    const m=trackDays()[dayIndex].missions[missionIndex],a=entry();
    if(zone){
      const target=Number(zone.dataset.buildZone),group=zone.dataset.buildGroup==null?null:Number(zone.dataset.buildGroup);
      if(drag.fromBank&&drag.index===target)addBuildBlock(m,a,target,group);
      else if(drag.fromGroup&&drag.index===target&&group!=null)moveBuildGroup(m,a,target,drag.group,group);
      else if(!drag.fromBank&&!drag.fromGroup)moveBuildPiece(m,a,drag.index,target);
    }
    else if(bank&&!drag.fromBank)removeBuildBlock(m,a,drag.index,drag.fromGroup?drag.group:null);
  }
  root.addEventListener('pointerup',finishBuildDrag);
  root.addEventListener('pointercancel',finishBuildDrag);
  root.addEventListener('pointerdown',event=>{
    const piece=event.target.closest('[data-regroup-piece]');
    if(!piece||view!=='day'||track==='school'&&!unlocked())return;
    activateMission(piece);
    regroupDrag={piece,source:Number(piece.dataset.regroupPiece),newlyMade:piece.dataset.regroupNew==='true',pointerId:event.pointerId,startX:event.clientX,startY:event.clientY,moved:false};
    if(piece.setPointerCapture)piece.setPointerCapture(event.pointerId);
  });
  root.addEventListener('pointermove',event=>{
    if(!regroupDrag||event.pointerId!==regroupDrag.pointerId)return;
    const dx=event.clientX-regroupDrag.startX,dy=event.clientY-regroupDrag.startY;
    if(Math.abs(dx)+Math.abs(dy)>8)regroupDrag.moved=true;
    if(!regroupDrag.moved)return;
    regroupDrag.piece.style.transform='translate('+dx+'px,'+dy+'px) scale(1.13)';
    regroupDrag.piece.style.zIndex='10';
    if(event.preventDefault)event.preventDefault();
  });
  function finishRegroupDrag(event){
    if(!regroupDrag||event.pointerId!==regroupDrag.pointerId)return;
    const drag=regroupDrag;regroupDrag=null;
    drag.piece.style.transform='';drag.piece.style.zIndex='';
    if(!drag.moved)return;
    lastRegroupDragEnd=Date.now();
    drag.piece.style.pointerEvents='none';
    const under=document.elementFromPoint?document.elementFromPoint(event.clientX,event.clientY):null;
    drag.piece.style.pointerEvents='';
    const zone=under&&under.closest('[data-regroup-zone]');
    if(zone&&zone.closest('[data-mission-index]')?.dataset.missionIndex===String(missionIndex))moveRegroupBlock(drag.source,Number(zone.dataset.regroupZone),drag.newlyMade);
  }
  root.addEventListener('pointerup',finishRegroupDrag);
  root.addEventListener('pointercancel',finishRegroupDrag);
  root.addEventListener('pointerdown',event=>{
    const piece=event.target.closest('[data-line-piece]');
    if(!piece||view!=='day'||track==='school'&&!unlocked())return;
    activateMission(piece);
    lineDrag={piece,jump:Number(piece.dataset.linePiece),modelIndex:piece.dataset.lineModel==null?null:Number(piece.dataset.lineModel),pointerId:event.pointerId,startX:event.clientX,startY:event.clientY,moved:false};
    if(piece.setPointerCapture)piece.setPointerCapture(event.pointerId);
  });
  root.addEventListener('pointermove',event=>{
    if(!lineDrag||event.pointerId!==lineDrag.pointerId)return;
    const dx=event.clientX-lineDrag.startX,dy=event.clientY-lineDrag.startY;
    if(Math.abs(dx)+Math.abs(dy)>8)lineDrag.moved=true;
    if(!lineDrag.moved)return;
    lineDrag.piece.style.transform='translate('+dx+'px,'+dy+'px) scale(1.12)';
    lineDrag.piece.style.zIndex='20';
    if(event.preventDefault)event.preventDefault();
  });
  function finishLineDrag(event){
    if(!lineDrag||event.pointerId!==lineDrag.pointerId)return;
    const drag=lineDrag;lineDrag=null;
    drag.piece.style.transform='';drag.piece.style.zIndex='';
    if(!drag.moved)return;
    lastLineDragEnd=Date.now();
    drag.piece.style.pointerEvents='none';
    const under=document.elementFromPoint?document.elementFromPoint(event.clientX,event.clientY):null;
    drag.piece.style.pointerEvents='';
    const zone=under?.closest('[data-line-zone]'),targetModel=zone?.dataset.lineModel==null?null:Number(zone.dataset.lineModel);
    if(zone&&under.closest('[data-mission-index]')?.dataset.missionIndex===String(missionIndex)&&drag.modelIndex===targetModel)placeLineJump(drag.jump,trackDays()[dayIndex].missions[missionIndex],entry(),targetModel,true);
  }
  root.addEventListener('pointerup',finishLineDrag);
  root.addEventListener('pointercancel',finishLineDrag);
  root.addEventListener('keydown',event=>{
    activateMission(event.target);
    if((event.key==='Enter'||event.key===' ')&&event.target.matches('[data-regroup-piece]')){
      event.preventDefault();event.target.click();
    }
    if((event.key==='Enter'||event.key===' ')&&view==='day'&&event.target.matches('[data-line-zone]')){
      event.preventDefault();const index=event.target.dataset.lineModel==null?null:Number(event.target.dataset.lineModel);placeLineJump(Number(entry().linePicked)||0,trackDays()[dayIndex].missions[missionIndex],entry(),index);
    }
  });
  root.addEventListener('input',event=>{
    const target=event.target;
    activateMission(target);
    if(view==='day'&&target.matches('[data-decomp-kind]')){
      const a=entry(),kind=target.dataset.decompKind,index=Number(target.dataset.decompIndex),parts={...(a.decomp||{})};
      parts[kind]=[...(parts[kind]||[])];parts[kind][index]=target.value.replace(/[^0-9]/g,'').slice(0,3);
      writeEntry({...a,decomp:parts,checked:false,teacherFilled:false});
      const box=target.closest?.('[data-mission-index]')?.querySelector('.feedback');if(box){box.className='feedback empty';box.textContent='Your place-value parts are saved. Finish both numbers and the column sums.';}
      return;
    }
    if(view==='day'&&target.matches('[data-mean-field]')){
      const field=target.dataset.meanField==='total'?'meanTotal':'meanValue';
      writeEntry({...entry(),[field]:target.value.replace(/[^0-9.]/g,'').slice(0,8),checked:false,teacherFilled:false});return;
    }
    if(view==='day'&&target.matches('[data-mean-follow]')){
      const a=entry(),answers=[...(a.meanFollowUps||[])],index=Number(target.dataset.meanFollow);
      answers[index]=target.value.replace(/[^0-9]/g,'').slice(0,4);
      writeEntry({...a,meanFollowUps:answers,checked:false,teacherFilled:false});return;
    }
    if(view==='day'&&target.matches('[data-graph-series]')){
      const a=entry(),series=target.dataset.graphSeries,index=Number(target.dataset.graphIndex),bars={...(a.graphBars||{})};
      bars[series]=[...(bars[series]||[])];bars[series][index]=Number(target.value);
      writeEntry({...a,graphBars:bars,checked:false,teacherFilled:false});
      const card=target.closest?.('[data-mission-index]'),bar=card?.querySelector?.('[data-graph-bar="'+series+'-'+index+'"]'),output=card?.querySelector?.('[data-graph-value="'+series+'-'+index+'"]');
      if(bar)bar.style.height=(Number(target.value)/(series==='class'?24:12)*100)+'%';if(output)output.textContent=target.value;
      return;
    }
    if(view==='day'&&target.matches('[data-graph-answer]')){
      const a=entry(),answers=[...(a.graphAnswers||[])],index=Number(target.dataset.graphAnswer);
      answers[index]=target.value.replace(/[^0-9]/g,'').slice(0,6);
      writeEntry({...a,graphAnswers:answers,checked:false,teacherFilled:false});return;
    }
    if(view==='day'&&target.matches('[data-line-draft]')){const a=entry();if(target.dataset.lineModel==null)writeEntry({...a,lineDraft:target.value});else writeEntry({...a,lineDrafts:{...(a.lineDrafts||{}),[Number(target.dataset.lineModel)]:target.value}});return;}
    if(view==='day'&&target.matches('[data-string-step]')){
      selectedStringStep=Number(target.dataset.stringStep);
      const values=Array.isArray(entry().stepValues)?[...entry().stepValues]:[];
      values[selectedStringStep]=target.value;
      writeEntry({...entry(),stepValues:values,checked:false,teacherFilled:false});
      const box=target.closest?.('[data-mission-index]')?.querySelector('.feedback');if(box){box.className='feedback empty';box.textContent='Your steps are saved. Check the complete string when you are ready.';}
    }
    if(view==='day'&&target.matches('[data-answer-range]')){
      const next={...entry(),value:Number(target.value),checked:false,teacherFilled:false};
      if(trackDays()[dayIndex].missions[missionIndex].type==='estimate')next.verified=false;
      writeEntry(next);const card=target.closest?.('[data-mission-index]'),output=card?.querySelector('[data-range-output]');if(output)output.textContent=target.value;
      const box=card?.querySelector('.feedback');if(box){box.className='feedback empty';box.textContent='Your answer is saved. Press Check my work when you are ready.';}
    }
    if(view==='day'&&target.matches('[data-reflection]')){state.reflections[answerKey(dayIndex,missionIndex)]=target.value;saveState();}
  });
  root.addEventListener('focusin',event=>{activateMission(event.target);if(event.target.matches('[data-string-step]'))selectedStringStep=Number(event.target.dataset.stringStep);});
  root.addEventListener('click',event=>{
    if(view!=='day'||track==='school'&&!unlocked())return;
    activateMission(event.target);
    const m=trackDays()[dayIndex].missions[missionIndex],a=entry();
    const plate=event.target.closest('[data-share-plate]');
    if(plate&&pickedToken!=null&&!event.target.closest('[data-share-token]')){const placed={...(a.placed||{})};placed[pickedToken]=Number(plate.dataset.sharePlate);pickedToken=null;changeEntry({placed});return;}
    if(event.target.closest('[data-share-bank]')&&pickedToken!=null&&!event.target.closest('[data-share-token]')){const placed={...(a.placed||{})};delete placed[pickedToken];pickedToken=null;changeEntry({placed});}
  });
  // Suppress the tablet's long-press menu on every project page. Keep normal
  // text editing available in answer fields and the student-ID box.
  document.addEventListener('contextmenu',event=>{
    if(!event.target.closest?.('input,textarea,[contenteditable="true"]'))event.preventDefault();
  });
  let touchStartY=0;
  document.addEventListener('touchstart',event=>{if(event.touches.length===1)touchStartY=event.touches[0].clientY;},{passive:true});
  document.addEventListener('touchmove',event=>{
    if(event.touches.length!==1)return;
    if(event.touches[0].clientY<=touchStartY+12)return;
    const inner=event.target.closest?.('.modal-card,.estimate-cloud,.lesson-details,.reading-graph-work');
    if(inner&&inner.scrollTop>0)return;
    if((window.scrollY||document.scrollingElement?.scrollTop||0)>0)return;
    if(event.cancelable!==false)event.preventDefault();
  },{passive:false});
  document.addEventListener('keydown',event=>{if(event.key==='Escape')closeModal();});
  if(view==='group')renderGroup();else if(view==='grade')renderGrade();else if(view==='day'&&course&&dayIndex>=0)renderDay();
})();
