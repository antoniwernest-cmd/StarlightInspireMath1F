// One-week content, route, number-line, block, and PDF smoke tests.
// Run: node "Starlight 1/verify.cjs"
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');

const base=__dirname;
const app=fs.readFileSync(path.join(base,'app.js'),'utf8');
const styles=fs.readFileSync(path.join(base,'styles.css'),'utf8');
assert.ok(styles.includes('.shell.day-shell{width:100%;max-width:none;'),'the day worksheet must not be capped at the landing-page width');
assert.ok(styles.includes('@media screen and (min-width:1500px)'),'wide-screen manipulatives should have a dedicated layout');
assert.ok(styles.includes('.day-shell .activity-emoji{font-size:2.4rem'),'question-heading emojis should be large');
assert.ok(styles.includes('.day-shell .scene-emoji{font-size:3.25rem'),'story emojis should be large');
assert.ok(styles.includes('.day-shell .team-jersey{width:2.65rem;height:2.65rem;font-size:1.9rem'),'team jerseys should be clearly visible');
assert.match(styles,/\.day-shell \.mission-card \.mission-main,[\s\S]*?grid-template-columns:minmax\(0,1fr\);/,'all worksheet activities should fill the card below the question strip');
assert.ok(styles.includes('.day-shell .mission-card .question-lead{'),'all worksheet headings should use the compact responsive strip');
assert.ok(styles.includes('@media screen and (max-width:1199px)')&&styles.includes('@media screen and (max-width:680px)'),'the question strip must adapt to tablets and phones');
assert.ok(styles.includes('.day-shell .activity-area .bank-block .block-face.h{width:130px;height:130px'),'drag bank hundreds should be large enough to see and move');
assert.ok(styles.includes('.day-shell .activity-area .build-piece .block-face.h{width:130px;height:130px'),'placed hundreds should match the bank size');
assert.ok(styles.includes('.day-shell .build-source-piece .block-face.h{width:130px;height:130px'),'both colour-coded addend pads should use full-size hundreds');
assert.ok(styles.includes('.day-shell .build-tap-hint{')&&styles.includes('pointer-events:none'),
  'tap-to-add cues must be visible without blocking pad taps or drags');
assert.ok(styles.includes('.day-shell .build-pad-pieces .count-five-end{position:relative;margin-inline-end:28px}')||styles.includes('.day-shell .regroup-pieces .count-five-end{position:relative;margin-inline-end:28px}'),
  'every fifth ten or one should leave a clear counting space');
assert.ok(styles.includes('.day-shell .build-original-hint{')&&styles.includes('color:#8199a5'),
  'the original-question prompts should appear in light grey on the blue pads');
assert.ok(styles.includes('.day-shell .mission-meta .math-move{min-height:51px'),'the work-it-out badge should attract attention');
assert.ok(styles.includes('.day-shell .mission-card .mission-toolbar{position:sticky;top:42px'),
  'the equation must stay visible while its question scrolls');
assert.ok(styles.includes('.day-shell .jump-bar-plot{grid-column:1/-1;display:flex;align-items:flex-end'),
  'both progress bars must share one baseline');
assert.ok(styles.includes('.day-shell .line-summary .line-landing strong{font-size:clamp(2.5rem'),
  'number-line landing numbers must be large');
assert.ok(styles.includes('.day-shell .line-summary>.line-string{display:flex;align-content:center;align-items:center;gap:8px;margin:0;background:#e8f5ee;font-size:1.35rem'),
  'number strings must be large enough to use the available width');
assert.ok(styles.includes('.day-shell .line-jump-picker .line-custom-top{'),
  'make-my-own-jump controls should be prominent beside the jump chips');
assert.ok(styles.includes('.day-shell .jump-bar-caption strong{display:block;margin-top:3px;font-size:1.55rem'),
  'the current number below each jump bar should be easy to read');
assert.ok(styles.includes('.day-shell .transfer-piece .block-face.t{width:22px;height:100px'),
  'transfer rods must be large, not tiny inside empty buttons');
assert.ok(styles.includes('.day-shell .transfer-disc{width:43px;height:43px'),
  'ten-frame discs must be large enough to see');
assert.ok(styles.includes('.day-shell .mission-index strong{font-size:2.25rem'),
  'question numbers must be prominent');
const world={};
vm.runInNewContext(fs.readFileSync(path.join(base,'data.js'),'utf8'),{window:world});
const DATA=world.STARLIGHT_DATA;
const grades=['Pathway','Excite','Inspire'];
const days=['Monday','Tuesday','Wednesday','Thursday','Friday'];
const entrypoints=[['index.html','data-view="group"'],...grades.flatMap(grade=>[
  [path.join(grade+' Star','index.html'),'data-view="grade" data-grade="'+grade+'"'],
  ...days.map(day=>[path.join(grade+' Star',day+'.html'),'data-view="day" data-grade="'+grade+'" data-day="'+day+'"'])
])];
assert.equal(entrypoints.length,19,'the project needs one home page, three grade menus, and fifteen day files');
for(const [relative,bodyAttributes] of entrypoints){
  const filename=path.join(base,relative),html=fs.readFileSync(filename,'utf8');
  assert.ok(html.includes(bodyAttributes),relative+' has the wrong page route');
  for(const asset of ['styles.css','data.js','app.js']){
    const ref=relative==='index.html'?asset:'../'+asset;
    assert.ok(html.includes(ref+'?v=33'),relative+' needs current '+asset);
    assert.ok(fs.existsSync(path.resolve(path.dirname(filename),ref)),relative+' cannot load '+asset);
  }
}
let total=0,lines=0,blockQuestions=0,teamQuestions=0,grade2TwoDigit=0;
for(const name of grades){
  const course=DATA[name];
  assert.deepEqual(Object.keys(course.weeks),['1'],name+' must expose only Week 1');
  for(const track of ['home','school']){
    const route=course.weeks[1][track];
    assert.equal(route.length,5,name+' '+track+' needs five days');
    route.forEach((day,d)=>{
      assert.ok(!day.holiday,days[d]+' must have an assignment');
      assert.equal(day.assignedCount,track==='home'?15:35,name+' '+track+' '+days[d]+' core count');
      assert.ok(day.missions.length>=day.assignedCount,name+' '+days[d]+' mission count');
      let dayTwoDigit=0;
      for(const [i,m] of day.missions.entries()){
        const where=name+' '+track+' '+days[d]+' Q'+(i+1);
        total++;
        assert.ok(m.title&&m.story&&m.prompt&&m.operation,where+' incomplete');
        for(const code of m.code.split(' · '))assert.ok(course.expectations[code],where+' unlisted curriculum '+code);
        if((name==='Pathway'||name==='Excite')&&m.code.split(' · ').includes('B2.4')){
          const ceiling=name==='Pathway'?50:100;
          const text=[m.operation,...(m.cards||[])].join(' | ');
          for(const match of text.matchAll(/(\d+)\s*([+−-])\s*(\d+)/g)){
            const first=Number(match[1]),second=Number(match[3]);
            assert.ok(match[2]==='+'?first+second<=ceiling:first<=ceiling,where+' B2.4 operation exceeds '+ceiling);
          }
        }
        if(name==='Excite'){
          for(const choice of m.options||[])if(/^\d+$/.test(String(choice)))assert.ok(Number(choice)<=200,where+' choice exceeds Grade 2 range');
          if(i<day.assignedCount&&m.additionPattern){
            const match=m.operation.match(/^(\d+) \+ (\d+) = \?$/);
            assert.ok(match,where+' must show two clear addends');
            const first=Number(match[1]),second=Number(match[2]),sum=first+second;
            assert.ok(first>=10&&first<=99&&second>=10&&second<=99,where+' requires two-digit addends');
            assert.ok(sum<=100&&sum===m.target,where+' addition must stay inside Grade 2 B2.4');
            assert.ok(m.code.includes('B2.4')&&m.jumpLine,where+' needs its curriculum code and number line');
            assert.equal(m.parts[0]*100+m.parts[1]*10+m.parts[2],sum,where+' base-ten answer');
            dayTwoDigit++;grade2TwoDigit++;
          }
        }
        if(m.blocks){
          blockQuestions++;
          assert.equal(m.blocks[0]*100+m.blocks[1]*10+m.blocks[2],Number(m.answer),where+' block key');
          assert.ok(!m.jumpLine,where+' should use blocks, not a jump line');
        }
        const team=m.options?.join('|')==='Team A|Team B';
        if(team){teamQuestions++;assert.ok(m.jumpLine,where+' needs both comparison lines');}
        const direct=String(m.operation).match(/^(\d+)\s*([+−-])\s*(\d+)\s*=\s*\?(?:;.*)?$/);
        const cardSums=m.type==='order'&&m.cards?.every(card=>/^\d+\s*[+−-]\s*\d+$/.test(card));
        const needsLine=!m.blocks&&(!!direct||team||cardSums||['round','mean','readingGraph','estimate'].includes(m.type));
        assert.equal(!!m.jumpLine,!!needsLine,where+' addition/subtraction line coverage');
        if(m.jumpLine){
          lines++;
          assert.ok(!m.blocks,where+' mixed block and line');
          if(team){
            const match=String(m.operation).match(/^Team A:\s*(\d+)\s*([+−-])\s*(\d+)\s*=\s*\?\s*\|\s*Team B:\s*(\d+)\s*([+−-])\s*(\d+)\s*=\s*\?$/);
            assert.ok(match,where+' needs two clear team calculations');
            const first=Number(match[1])+(match[2]==='+'?1:-1)*Number(match[3]);
            const second=Number(match[4])+(match[5]==='+'?1:-1)*Number(match[6]);
            assert.equal(m.answer,first>second?'Team A':'Team B',where+' comparison key');
          }
          if(direct&&!['choice'].includes(m.type)||direct&&Number.isFinite(Number(m.answer))){
            const answer=Number(direct[1])+(direct[2]==='+'?1:-1)*Number(direct[3]);
            assert.equal(answer,Number(m.type==='chart'?m.target:m.type==='build'?m.target:m.answer),where+' line does not match answer');
          }
        }
      }
      if(name==='Excite')assert.ok(dayTwoDigit>0,track+' '+days[d]+' needs an assigned two-digit addition problem');
    });
  }
}
assert.ok(lines>500&&blockQuestions>0,'every arithmetic card should have a line while place-value trades retain blocks');
assert.equal(grade2TwoDigit,13,'Excite needs 13 assigned two-digit addition examples across home and school');

function storage(map){return {getItem:k=>map.has(k)?map.get(k):null,setItem:(k,v)=>map.set(k,String(v)),removeItem:k=>map.delete(k)};}
function mount({view='group',grade=null,day=null,search='',school=false}={}){
  const local=new Map(),session=new Map();
  if(school)session.set('starlight1:schoolUnlocked','1');
  let dropTarget=null;
  const root={innerHTML:'',listeners:{},addEventListener(kind,fn){(this.listeners[kind]||=[]).push(fn);},querySelector(){return null;}};
  const document={body:{dataset:{view,grade,day},appendChild(){}},listeners:{},getElementById:id=>id==='app'?root:null,
    addEventListener(kind,fn){(this.listeners[kind]||=[]).push(fn);},createElement(){return {click(){},remove(){}};},elementFromPoint(){return dropTarget;}};
  const window={STARLIGHT_DATA:DATA,scrollY:0,scrollTo(){},confirm:()=>true,prompt:()=> '300'};
  const location={search,href:''};
  vm.runInNewContext(app.replace('  window.STARLIGHT_PDF=',
    '  window.STARLIGHT_TEST={lineModels,linePicture,lineShortcuts,lineProgressBars,renderNumberLine,renderTransfer,renderBuild,renderRegroup,transferGuide,briefExpectation,answered,correct,status,responseText,buildAddends,setAuditAnswer(index,answer){state.answers[answerKey(dayIndex,index)]=answer;saveState();},getAuditAnswer(index){return state.answers[answerKey(dayIndex,index)];}}; window.STARLIGHT_PDF='),
    {window,document,location,URLSearchParams,localStorage:storage(local),sessionStorage:storage(session),
      Blob,URL:{createObjectURL:()=> 'blob:test',revokeObjectURL(){}},setTimeout:()=>0,requestAnimationFrame:fn=>fn()});
  function click(dataset){const button={dataset,closest(selector){return selector==='button'?this:null;}};
    for(const fn of root.listeners.click||[])fn({target:button});}
  function clickAt(task,dataset){const card={dataset:{missionIndex:String(task)}};
    const button={dataset,closest(selector){return selector==='button'?this:selector==='[data-mission-index]'?card:null;}};
    for(const fn of root.listeners.click||[])fn({target:button});}
  function clickBuildPad(task,place,group=null){
    const card={dataset:{missionIndex:String(task)}};
    const pad={dataset:{buildZone:String(place),...(group==null?{}:{buildGroup:String(group)})},
      closest(selector){return selector==='[data-mission-index]'?card:selector==='[data-build-group]'&&group!=null?this:selector==='[data-build-zone]'?this:null;}};
    for(const fn of root.listeners.click||[])fn({target:pad});
  }
  function clickLineZone(modelIndex=null){const zone={dataset:modelIndex==null?{}:{lineModel:String(modelIndex)},closest(selector){return selector==='[data-line-zone]'?this:null;}};
    for(const fn of root.listeners.click||[])fn({target:zone});}
  function dragBuildBankToPad(task,place,group=null,endY=20){
    const piece={dataset:{addBlock:String(place)},style:{},setPointerCapture(){},classList:{add(){},remove(){}},
      closest(selector){return selector==='[data-add-block],[data-build-piece],[data-build-source]'?this:null;}};
    dropTarget={dataset:{buildZone:String(place),...(group==null?{}:{buildGroup:String(group)})},closest(selector){return selector==='[data-build-zone]'?this:selector==='[data-mission-index]'?{dataset:{missionIndex:String(task)}}:null;}};
    const start={target:piece,pointerId:42,clientX:10,clientY:10};
    const end={target:piece,type:'pointerup',pointerId:42,clientX:65,clientY:endY,preventDefault(){}};
    for(const fn of root.listeners.pointerdown||[])fn(start);
    for(const fn of root.listeners.pointermove||[])fn(end);
    for(const fn of root.listeners.pointerup||[])fn(end);
  }
  function dragLineToZone(task,jump,modelIndex=null){
    const card={dataset:{missionIndex:String(task)}};
    const piece={dataset:{linePiece:String(jump),...(modelIndex==null?{}:{lineModel:String(modelIndex)})},style:{},setPointerCapture(){},
      closest(selector){return selector==='[data-line-piece]'?this:selector==='[data-mission-index]'?card:null;}};
    dropTarget={dataset:modelIndex==null?{}:{lineModel:String(modelIndex)},closest(selector){return selector==='[data-line-zone]'?this:selector==='[data-mission-index]'?card:null;}};
    const start={target:piece,pointerId:43,clientX:10,clientY:10};
    const end={target:piece,type:'pointerup',pointerId:43,clientX:65,clientY:20,preventDefault(){}};
    for(const fn of root.listeners.pointerdown||[])fn(start);
    for(const fn of root.listeners.pointermove||[])fn(end);
    for(const fn of root.listeners.pointerup||[])fn(end);
  }
  return {root,document,window,local,session,location,click,clickAt,clickBuildPad,clickLineZone,dragBuildBankToPad,dragBuildBankToOnes:task=>dragBuildBankToPad(task,2),dragLineToZone};
}
function question(html,index){const start=html.indexOf('id="question-'+(index+1)+'"');assert.ok(start>=0);const end=html.indexOf('id="question-'+(index+2)+'"',start+1);return html.slice(start,end<0?undefined:end);}

const group=mount();
assert.ok(group.root.innerHTML.includes('<h1>Starlight 1</h1>'));
assert.ok(group.root.innerHTML.includes('October 5–9, 2026'));
assert.ok(!group.root.innerHTML.includes('Week 2'));
assert.ok(!group.root.innerHTML.includes('four weeks'));
let menuBlocked=false;
for(const listener of group.document.listeners.contextmenu||[])listener({target:{closest:()=>null},preventDefault(){menuBlocked=true;}});
assert.ok(menuBlocked,'long-press menu should be blocked on the landing page');
let refreshBlocked=false;
for(const listener of group.document.listeners.touchstart||[])listener({touches:[{clientY:100}]});
for(const listener of group.document.listeners.touchmove||[])listener({touches:[{clientY:145}],target:{closest:()=>null},cancelable:true,preventDefault(){refreshBlocked=true;}});
assert.ok(refreshBlocked,'pull-to-refresh gesture should be blocked at the top of the landing page');
group.window.scrollY=50;refreshBlocked=false;
for(const listener of group.document.listeners.touchmove||[])listener({touches:[{clientY:145}],target:{closest:()=>null},cancelable:true,preventDefault(){refreshBlocked=true;}});
assert.ok(!refreshBlocked,'ordinary worksheet scrolling should remain available');
for(const name of grades){
  const grade=mount({view:'grade',grade:name});
  assert.ok(grade.root.innerHTML.includes('Week 1 Home'));
  assert.ok(grade.root.innerHTML.includes('Week 1 School'));
  assert.ok(!grade.root.innerHTML.includes('Week 2 Home'));
  const bank=group.window.STARLIGHT_PDF.generateQuestionBank(name);
  const expected=['home','school'].reduce((sum,track)=>sum+DATA[name].weeks[1][track].reduce((count,day)=>count+day.missions.length,0),0);
  assert.equal(bank.questionCount,expected,name+' question bank count');
  assert.ok(Buffer.from(bank.bytes).subarray(0,8).toString().startsWith('%PDF-1.4'));
  if(name==='Excite')assert.ok(Buffer.from(bank.bytes).toString('latin1').includes('68 + 27 = ?'),'Excite question-bank PDF must include the new Grade 2 addition');
  for(const track of ['home','school']){
    for(const day of days){
      const page=mount({view:'day',grade:name,day,search:'?week=4&track='+track,school:track==='school'});
      assert.ok(page.root.innerHTML.includes('Week 1 '+(track==='school'?'School':'Home')),name+' '+track+' '+day+' should stay in Week 1');
      assert.ok(page.root.innerHTML.includes('id="question-1"'),name+' '+track+' '+day+' missing worksheet');
      assert.ok(!page.root.innerHTML.includes('undefined'),name+' '+track+' '+day+' rendered undefined');
      const missions=DATA[name].weeks[1][track][days.indexOf(day)].missions;
      missions.forEach((mission,index)=>{
        const skill=page.window.STARLIGHT_TEST.briefExpectation(mission);
        assert.ok(skill.split(' | ').every(part=>part.includes(' · ')&&part.split(' · ')[1].length>5),'every Ontario code needs a brief skill description');
        const card=question(page.root.innerHTML,index);
        const questionStrip=card.indexOf('class="question-lead"');
        const workArea=card.indexOf('class="activity-area"');
        assert.ok(questionStrip>=0&&workArea>questionStrip,name+' '+track+' '+day+' Q'+(index+1)+' must put a compact prompt above its full-width activity');
        assert.ok(card.includes('Ontario '+skill),name+' '+track+' '+day+' Q'+(index+1)+' hides its curriculum skill');
        assert.ok(card.includes('class="activity-emoji"')&&card.includes('class="scene-emoji"'),name+' '+track+' '+day+' Q'+(index+1)+' needs a strategy and story emoji');
        assert.ok(card.includes('aria-label="Question '+(index+1)+' of '+missions.length),name+' '+track+' '+day+' Q'+(index+1)+' needs a prominent reference number');
        assert.ok(card.includes('Work it out:</strong> '+mission.operation),name+' '+track+' '+day+' Q'+(index+1)+' needs its equation in the sticky heading');
        if(mission.type==='transfer')assert.ok(card.includes('class="transfer-goal"')&&card.includes('class="transfer-goal-tip"'),name+' '+track+' '+day+' Q'+(index+1)+' needs a visual friendly-number guide');
        if(mission.type==='build'){
          assert.ok(card.includes('data-build-zone="1"')&&card.includes('data-build-zone="2"'),name+' '+track+' '+day+' Q'+(index+1)+' needs tappable tens and ones pads');
          assert.ok(card.includes('class="bank-heading"')&&card.includes('Work it out: '+mission.operation),name+' '+track+' '+day+' Q'+(index+1)+' needs the equation beside the block bank');
          const placeCount=name==='Pathway'?2:3;
          const padCount=placeCount*(page.window.STARLIGHT_TEST.buildAddends(mission)?2:1);
          assert.equal((card.match(/Tap to Add Blocks/g)||[]).length,padCount,
            name+' '+track+' '+day+' Q'+(index+1)+' should label every tap-to-add block pad, but not the calculated total');
        }
        if(mission.type==='order')assert.ok(!card.includes('Tap to Add Blocks'),
          name+' '+track+' '+day+' Q'+(index+1)+' ordering pads should not carry block instructions');
        if(mission.type==='build'&&/^\d+\s*\+\s*\d+\s*=\s*\?$/.test(mission.operation)){
          assert.ok(card.includes('data-build-group="0"')&&card.includes('data-build-group="1"'),name+' '+track+' '+day+' Q'+(index+1)+' needs separate Level 1 and 2 pads');
          assert.ok(card.includes('data-add-build-pad="1"')&&card.includes('data-add-build-pad="2"'),name+' '+track+' '+day+' Q'+(index+1)+' needs tappable addend pad headings');
          assert.ok(card.includes('Level 3 · total / answer'),name+' '+track+' '+day+' Q'+(index+1)+' needs a numeric total below the pads');
          assert.ok(card.includes('class="bank-block"')&&card.includes('class="block-face'),name+' '+track+' '+day+' Q'+(index+1)+' must keep picture blocks in the bank');
          assert.ok(card.includes('Work it out: '+mission.operation),name+' '+track+' '+day+' Q'+(index+1)+' must repeat the equation in the bank');
        }
        if(!mission.jumpLine)return;
        const models=page.window.STARLIGHT_TEST.lineModels(mission,mission.type==='estimate'?{verified:true}:{});
        assert.ok(models.length>0,name+' '+track+' '+day+' Q'+(index+1)+' missing arithmetic model');
        models.forEach(model=>{
          assert.ok(Number.isFinite(model.start)&&Number.isFinite(model.change),'invalid jump-line numbers');
          assert.ok(model.start>=0&&model.start<=DATA[name].range,'jump-line start beyond grade range');
          assert.ok(model.start+model.change>=0&&model.start+model.change<=DATA[name].range,'jump-line result beyond grade range');
          const shortcuts=page.window.STARLIGHT_TEST.lineShortcuts(model);
          assert.ok(shortcuts.every(size=>size<=DATA[name].range),'shortcuts must stay inside the grade number range');
          if(name!=='Pathway')assert.ok(shortcuts.includes(50)&&shortcuts.includes(100),name+' '+track+' '+day+' Q'+(index+1)+' needs 50 and 100 jump chips');
        });
        const tool=page.window.STARLIGHT_TEST.renderNumberLine(mission,mission.type==='estimate'?{verified:true,value:0}:{});
        assert.ok(tool.includes('Jump goal:'),name+' '+track+' '+day+' Q'+(index+1)+' does not say how much to jump');
        const barCount=(tool.match(/class="jump-bar-graph"/g)||[]).length;
        const expectedBars=mission.options?.join('|')==='Team A|Team B'?2:1;
        if(expectedBars===1)assert.ok(tool.includes('class="line-summary"')&&tool.includes('class="line-actions"'),name+' '+track+' '+day+' Q'+(index+1)+' should use the full width for large number-line results and controls');
        assert.equal((tool.match(/Make my own jump:/g)||[]).length,expectedBars,
          name+' '+track+' '+day+' Q'+(index+1)+' needs a visible custom-jump control for every line');
        if(expectedBars===1)assert.ok(tool.indexOf('line-custom-top')<tool.indexOf('line-visual'),
          name+' '+track+' '+day+' Q'+(index+1)+' must show custom jumps above the line');
        else for(const card of tool.split('<section class="team-line-card"').slice(1)){
          assert.ok(card.indexOf('line-custom-top')<card.indexOf('line-visual'),
            name+' '+track+' '+day+' Q'+(index+1)+' must show each team custom jump above its line');
        }
        assert.equal(barCount,expectedBars,name+' '+track+' '+day+' Q'+(index+1)+' needs a progress graph for every visible jump line');
        for(const model of (expectedBars===1?models.slice(0,1):models))assert.ok(tool.includes('After jumps <strong>'+model.start+'</strong>'),
          name+' '+track+' '+day+' Q'+(index+1)+' should show each line\'s starting position before any jumps');
        if(mission.type==='estimate'){
          const label=mission.collectionName||'Group';
          assert.ok(tool.includes(label+' A '+mission.groups[0]+' + '+label+' B '+mission.groups[1]+' = ?'),'estimate line must name both groups and their amounts');
          assert.ok(tool.includes(mission.groups[1]+' from '+label+' B'),'estimate line must say what to add');
        }
        if(mission.type!=='estimate')assert.ok(question(page.root.innerHTML,index).includes('number-line-panel'),name+' '+track+' '+day+' Q'+(index+1)+' did not render its jump line');
      });
    }
    const pdf=grade.window.STARLIGHT_PDF.generate({gradeName:name,grade:DATA[name].grade,track,week:4,
      course:DATA[name],state:{studentId:'QA',answers:{},reflections:{},milestones:{}},days});
    assert.ok(Buffer.from(pdf.bytes).subarray(0,8).toString().startsWith('%PDF-1.4'));
  }
}
const locked=mount({view:'day',grade:'Inspire',day:'Monday',search:'?track=school'});
assert.ok(locked.root.innerHTML.includes('This work is for class'));
assert.ok(locked.root.innerHTML.includes('Download PDF assessment'));
assert.ok(!locked.root.innerHTML.includes('id="question-1"'));

const inspire=mount({view:'day',grade:'Inspire',day:'Monday',search:'?track=home'});
const blockCard=question(inspire.root.innerHTML,1);
assert.ok(blockCard.includes('data-regroup-zone'), 'pictured Q2 needs draggable blocks');
assert.ok(!blockCard.includes('number-line-panel'), 'pictured Q2 must not show the unrelated jump line');
const exciteBuild=mount({view:'day',grade:'Excite',day:'Monday',search:'?track=home'});
const wideBlockCard=question(exciteBuild.root.innerHTML,0);
assert.ok(wideBlockCard.includes('class="math-emoji"'),'math-heading emoji needs an independently sized element');
assert.ok(wideBlockCard.includes('wide-strategy'),'block-building arithmetic should use the full worksheet width for its number line');
assert.ok(wideBlockCard.indexOf('data-build-bank')<wideBlockCard.indexOf('wide-strategy'),'blocks should be available before the full-width jump line');
const customJump=mount({view:'day',grade:'Excite',day:'Monday',search:'?track=home&task=0'});
const draftInput={dataset:{},value:'17',matches:selector=>selector==='[data-line-draft]',closest:selector=>selector==='[data-mission-index]'?{dataset:{missionIndex:'0'}}:null};
for(const fn of customJump.root.listeners.input||[])fn({target:draftInput});
customJump.click({action:'line-pick-custom'});
let customCard=question(customJump.root.innerHTML,0);
assert.ok(customCard.includes('data-line-quick="17"')&&customCard.includes('My jump'),'a custom jump should become a visible, reusable option');
let customAnswer=JSON.parse(customJump.local.get('starlight1:v1:Excite:week1:home')).answers['0:0'];
assert.ok(customAnswer.lineCustomChoices[0].includes(17),'custom jump should be saved for this number line');
customJump.click({lineQuick:'17'});
customJump.clickLineZone();
customAnswer=JSON.parse(customJump.local.get('starlight1:v1:Excite:week1:home')).answers['0:0'];
assert.equal(customAnswer.lineJumps[0][0],17,'the saved custom option should place its jump');
customCard=question(customJump.root.innerHTML,0);
assert.ok(customCard.includes('data-line-quick="17"')&&customCard.includes('Too large for the remaining jump'),'the custom option stays listed but disables when too large');
customJump.click({action:'line-undo'});
customCard=question(customJump.root.innerHTML,0);
assert.ok(customCard.includes('data-line-quick="17"')&&!customCard.includes('Too large for the remaining jump'),'Undo should make the saved option usable again');
const boxEstimate=DATA.Excite.weeks[1].home[0].missions.find(m=>m.type==='estimate');
const boxEstimateIndex=DATA.Excite.weeks[1].home[0].missions.indexOf(boxEstimate);
function checkSliderEstimate(value){
  const page=mount({view:'day',grade:'Excite',day:'Monday',search:'?track=home&task='+boxEstimateIndex});
  const card={dataset:{missionIndex:String(boxEstimateIndex)},querySelector(){return null;}};
  const slider={value:String(value),matches:selector=>selector==='[data-answer-range]',closest:selector=>selector==='[data-mission-index]'?card:null};
  for(const fn of page.root.listeners.input||[])fn({target:slider});
  assert.ok(!question(page.root.innerHTML,boxEstimateIndex).includes('Difference:'),
    'the signed estimate difference should wait until Check my work');
  page.click({action:'check'});
  const answer=JSON.parse(page.local.get('starlight1:v1:Excite:week1:home')).answers['0:'+boxEstimateIndex];
  assert.ok(answer.checked&&answer.verified,'Check my work should reveal and assess the estimate directly');
  return {card:question(page.root.innerHTML,boxEstimateIndex),answer};
}
const lowEstimate=checkSliderEstimate(boxEstimate.actual-13);
assert.ok(lowEstimate.card.includes('Difference: <strong>−13</strong> — 13 too low.'),'a low estimate needs a negative signed difference');
assert.ok(exciteBuild.window.STARLIGHT_TEST.responseText(boxEstimate,lowEstimate.answer).includes('signed difference −13 (13 too low)'),
  'the PDF answer should preserve the signed estimate difference');
const highEstimate=checkSliderEstimate(boxEstimate.actual+12);
assert.ok(highEstimate.card.includes('Difference: <strong>+12</strong> — 12 too high.'),'a high estimate needs a positive signed difference');
const exactEstimate=checkSliderEstimate(boxEstimate.actual);
assert.ok(exactEstimate.card.includes('Difference: <strong>0</strong> — exactly right!'),'an exact estimate needs a zero difference');
const revealedLine=exciteBuild.window.STARLIGHT_TEST.renderNumberLine(boxEstimate,{value:75,verified:true});
assert.ok(revealedLine.includes('Box A 44 + Box B 44 = ?'),'box line must state both amounts');
assert.ok(revealedLine.includes('Add all <strong>44 from Box B</strong>'),'box line must say exactly what to add');
assert.ok(revealedLine.includes('Jump goal: +44 from Box B')&&revealedLine.includes('44 left to add'),'box line must show the jump goal');
assert.ok(revealedLine.includes('Add 44</text>'),'goal should also appear inside the number line');
const partialLine=exciteBuild.window.STARLIGHT_TEST.renderNumberLine(boxEstimate,{value:75,verified:true,lineJumps:{0:[20,20]}});
assert.ok(partialLine.includes('4 left to add'),'remaining amount should update after jumps');
assert.ok(partialLine.includes('data-line-quick="20"')&&partialLine.includes('data-line-quick="4"'),'jump chips should remain visible after use');
assert.ok(/data-line-quick="20"[^>]*disabled title="Too large for the remaining jump"/.test(partialLine),'a jump too large to finish or compensate should be disabled, not removed');
const subIndex=DATA.Inspire.weeks[1].home[0].missions.findIndex(m=>m.jumpLine&&/^\d+\s*[−-]\s*\d+\s*=/.test(m.operation));
assert.ok(subIndex>=0,'Inspire Monday needs a subtraction line');
const subMission=DATA.Inspire.weeks[1].home[0].missions[subIndex];
const subCard=question(inspire.root.innerHTML,subIndex);
assert.ok(subCard.includes('on the right')&&subCard.includes('move <strong>left</strong>'), 'subtraction directions');
assert.ok(subCard.includes('data-line-piece="-'), 'subtraction jump chips must be negative');
const model=inspire.window.STARLIGHT_TEST.lineModels(subMission,{})[0];
assert.ok(model.start>model.start+model.change,'subtraction starts at the minuend');
const svg=inspire.window.STARLIGHT_TEST.linePicture(model,[],'test-arrow');
const startX=Number(svg.match(/class="jump-start-label" x="(\d+)"/)[1]);
assert.ok(startX>500,'starting number must be on the right of the line');
assert.ok(svg.includes('Start: '+model.start));
for(const [start,change,jumps] of [[113,5,[5]],[113,-5,[-5]],[113,10,[5,5]]]){
  const picture=inspire.window.STARLIGHT_TEST.linePicture({start,change},jumps,'clear-labels');
  const headerY=Number(picture.match(/class="jump-start-label"[^>]* y="(\d+)"/)[1]);
  const labels=[...picture.matchAll(/class="jump-label"[^>]* y="(\d+)"/g)].map(match=>Number(match[1]));
  assert.ok(labels.every(y=>y-headerY>=32),'jump labels must stay clear of the Start and goal headings');
}
function afterBarHeight(markup){return Number(markup.match(/class="jump-bar now" style="height:(\d+)%"/)[1]);}
const addBarsBefore=inspire.window.STARLIGHT_TEST.lineProgressBars({start:114,change:12},[]);
const addBarsAfter=inspire.window.STARLIGHT_TEST.lineProgressBars({start:114,change:12},[10]);
assert.ok(afterBarHeight(addBarsAfter)>afterBarHeight(addBarsBefore),'addition jumps must grow the second bar');
const subBarsBefore=inspire.window.STARLIGHT_TEST.lineProgressBars({start:160,change:-12},[]);
const subBarsAfter=inspire.window.STARLIGHT_TEST.lineProgressBars({start:160,change:-12},[-10]);
assert.ok(afterBarHeight(subBarsAfter)<afterBarHeight(subBarsBefore),'subtraction jumps must shrink the second bar');
assert.ok(addBarsBefore.includes('After jumps <strong>114</strong>')&&addBarsAfter.includes('After jumps <strong>124</strong>'),
  'the progress graph must show the student\'s current number as addition jumps are made');
assert.ok(subBarsBefore.includes('After jumps <strong>160</strong>')&&subBarsAfter.includes('After jumps <strong>150</strong>'),
  'the progress graph must show the student\'s current number as subtraction jumps are made');
assert.equal((addBarsAfter.match(/class="jump-bar-plot"/g)||[]).length,1,'the two bars need a shared plot floor');

const teamPage=mount({view:'day',grade:'Excite',day:'Monday',search:'?track=home&task=2'});
let teamCard=question(teamPage.root.innerHTML,2);
assert.ok(teamCard.includes('Team A interactive number line'));
assert.ok(teamCard.includes('Team B interactive number line'));
assert.equal((teamCard.match(/data-line-zone data-line-model=/g)||[]).length,2,'both number lines must be visible at once');
assert.equal((teamCard.match(/class="jump-bar-graph"/g)||[]).length,2,'each team must have its own two-bar progress graph');
assert.equal((teamCard.match(/class="team-jersey team-jersey-a"/g)||[]).length,3,'Team A needs a jersey on its line, result, and answer choice');
assert.equal((teamCard.match(/class="team-jersey team-jersey-b"/g)||[]).length,3,'Team B needs a jersey on its line, result, and answer choice');
const teamDraft={dataset:{lineModel:'1'},value:'7',matches:selector=>selector==='[data-line-draft]',closest:selector=>selector==='[data-mission-index]'?{dataset:{missionIndex:'2'}}:null};
for(const fn of teamPage.root.listeners.input||[])fn({target:teamDraft});
teamPage.click({action:'line-pick-custom',lineModel:'1'});
teamCard=question(teamPage.root.innerHTML,2);
assert.ok(teamCard.includes('data-line-model="1" data-line-piece="-7" data-line-quick="7"'),'Team B should list its own custom backward jump');
assert.ok(!teamCard.includes('data-line-model="0" data-line-piece="7" data-line-quick="7"'),'Team B custom jump must not appear on Team A line');
teamPage.click({lineQuick:'50',lineModel:'0'});
teamPage.clickLineZone(0);
teamPage.click({lineQuick:'10',lineModel:'1'});
teamPage.clickLineZone(1);
const teamAnswer=JSON.parse(teamPage.local.get('starlight1:v1:Excite:week1:home')).answers['0:2'];
assert.equal(teamAnswer.lineJumps[0][0],50,'Team A keeps its own addition jumps');
assert.equal(teamAnswer.lineJumps[1][0],-10,'Team B keeps its own subtraction jumps');
teamCard=question(teamPage.root.innerHTML,2);
assert.equal((teamCard.match(/data-line-zone data-line-model=/g)||[]).length,2,'both lines must remain visible after jumping');
assert.ok(teamCard.includes('Team A:</strong> 172')&&teamCard.includes('Team B:</strong> 158'),'show both current landing numbers together');
const teamReport=teamPage.window.STARLIGHT_PDF.generate({gradeName:'Excite',grade:2,track:'home',week:1,
  course:DATA.Excite,state:JSON.parse(teamPage.local.get('starlight1:v1:Excite:week1:home')),days});
const teamPdf=Buffer.from(teamReport.bytes).toString('latin1');
assert.ok(teamPdf.includes('Open number-line jumps:')&&teamPdf.includes('Team A')&&teamPdf.includes('Team B'),'PDF should preserve both teams\' jump strategies');
const subPage=mount({view:'day',grade:'Inspire',day:'Monday',search:'?track=home&task='+subIndex});
subPage.click({lineQuick:'10'});
subPage.clickLineZone();
const subAnswer=JSON.parse(subPage.local.get('starlight1:v1:Inspire:week1:home')).answers['0:'+subIndex];
assert.equal(subAnswer.lineJumps[0][0],-10,'subtraction jump must move backwards');
assert.ok(question(subPage.root.innerHTML,subIndex).includes('Landing number: <strong>'+(model.start-10)+'</strong>'));

const repeatIndex=DATA.Excite.weeks[1].home[0].missions.findIndex(m=>/^178\s*[−-]\s*19\s*=/.test(m.operation));
assert.ok(repeatIndex>=0,'the reported 178 − 19 task must exist');
const repeatPage=mount({view:'day',grade:'Excite',day:'Monday',search:'?track=home&task='+repeatIndex});
repeatPage.dragLineToZone(repeatIndex,-10);
let repeatCard=question(repeatPage.root.innerHTML,repeatIndex);
const secondTen=repeatCard.match(/<button[^>]*data-line-piece="-10"[^>]*>/)?.[0];
assert.ok(secondTen&&!secondTen.includes(' disabled'),'−10 must remain available after the first drag');
repeatPage.dragLineToZone(repeatIndex,-10);
repeatCard=question(repeatPage.root.innerHTML,repeatIndex);
assert.ok(repeatCard.includes('1 to add back'),'subtracting two tens should show the correction');
assert.ok(/class="line-piece return-jump"[^>]*data-line-piece="1"/.test(repeatCard),'a draggable +1 return jump must appear');
repeatPage.dragLineToZone(repeatIndex,1);
const repeatedAnswer=JSON.parse(repeatPage.local.get('starlight1:v1:Excite:week1:home')).answers['0:'+repeatIndex];
assert.equal([...repeatedAnswer.lineJumps[0]].join(','),'-10,-10,1','two −10 drags and +1 should solve 178 − 19');
repeatCard=question(repeatPage.root.innerHTML,repeatIndex);
assert.ok(repeatCard.includes('Landing number: <strong>159</strong>')&&repeatCard.includes('Goal reached'),'compensation must finish at 159');
const repeatReport=repeatPage.window.STARLIGHT_PDF.generate({gradeName:'Excite',grade:2,track:'home',week:1,
  course:DATA.Excite,state:JSON.parse(repeatPage.local.get('starlight1:v1:Excite:week1:home')),days});
assert.ok(Buffer.from(repeatReport.bytes).toString('latin1').includes('-10 -10 +1 = 159'),'PDF must retain repeated subtraction jumps and the +1 correction');

const largeIndex=DATA.Excite.weeks[1].home[1].missions.findIndex(m=>/^160\s*[−-]\s*12\s*=/.test(m.operation));
assert.ok(largeIndex>=0,'the reported 160 − 12 task must exist');
const largePage=mount({view:'day',grade:'Excite',day:'Tuesday',search:'?track=home&task='+largeIndex});
let largeCard=question(largePage.root.innerHTML,largeIndex);
for(const size of [50,100]){
  const chip=largeCard.match(new RegExp('<button[^>]*data-line-piece="-'+size+'"[^>]*>'))?.[0];
  assert.ok(chip&&!chip.includes(' disabled'),'−'+size+' should be an available draggable on 160 − 12');
}
largePage.dragLineToZone(largeIndex,-100);
largeCard=question(largePage.root.innerHTML,largeIndex);
assert.ok(largeCard.includes('88 to add back')&&largeCard.includes('data-line-piece="88"'),'a −100 jump must offer the +88 return');
largePage.dragLineToZone(largeIndex,88);
const largeAnswer=JSON.parse(largePage.local.get('starlight1:v1:Excite:week1:home')).answers['1:'+largeIndex];
assert.equal([...largeAnswer.lineJumps[0]].join(','),'-100,88','−100 and +88 should solve 160 − 12');
assert.ok(question(largePage.root.innerHTML,largeIndex).includes('Landing number: <strong>148</strong>'));
const fiftyPage=mount({view:'day',grade:'Excite',day:'Tuesday',search:'?track=home&task='+largeIndex});
fiftyPage.dragLineToZone(largeIndex,-50);
assert.ok(question(fiftyPage.root.innerHTML,largeIndex).includes('38 to add back'),'a −50 jump must offer the +38 return');
fiftyPage.dragLineToZone(largeIndex,38);
assert.ok(question(fiftyPage.root.innerHTML,largeIndex).includes('Landing number: <strong>148</strong>'));
const hundredIndex=DATA.Inspire.weeks[1].home[0].missions.findIndex(m=>m.jumpLine&&/^802\s*\+\s*103\s*=/.test(m.operation));
assert.ok(hundredIndex>=0,'Inspire needs a three-digit addition line');
const hundredPage=mount({view:'day',grade:'Inspire',day:'Monday',search:'?track=home&task='+hundredIndex});
const hundredChip=question(hundredPage.root.innerHTML,hundredIndex).match(/<button[^>]*data-line-piece="100"[^>]*>/)?.[0];
assert.ok(hundredChip&&!hundredChip.includes(' disabled'),'+100 should be an available addition jump');
hundredPage.dragLineToZone(hundredIndex,100);
const hundredAnswer=JSON.parse(hundredPage.local.get('starlight1:v1:Inspire:week1:home')).answers['0:'+hundredIndex];
assert.equal(hundredAnswer.lineJumps[0][0],100,'the +100 block should drag onto an addition line');

const pathwayBuild=DATA.Pathway.weeks[1].home[0].missions.findIndex(m=>m.type==='build');
assert.ok(pathwayBuild>=0,'Pathway Monday needs a build-model question');
const buildPage=mount({view:'day',grade:'Pathway',day:'Monday',search:'?track=home&task='+pathwayBuild});
assert.ok(question(buildPage.root.innerHTML,pathwayBuild).includes('data-build-bank'));
buildPage.dragBuildBankToOnes(pathwayBuild);
const buildAnswer=JSON.parse(buildPage.local.get('starlight1:v1:Pathway:week1:home')).answers['0:'+pathwayBuild];
assert.equal(buildAnswer.parts[2],1,'bank cube must drag into the ones landing pad');

const groupedPage=mount({view:'day',grade:'Excite',day:'Monday',search:'?track=home&task=0'});
const groupedMission=DATA.Excite.weeks[1].home[0].missions[0];
assert.equal(groupedMission.type,'build');
groupedPage.dragBuildBankToPad(0,1,0);
groupedPage.dragBuildBankToPad(0,2,1);
const groupedAnswer=JSON.parse(groupedPage.local.get('starlight1:v1:Excite:week1:home')).answers['0:0'];
assert.deepEqual(Array.from(groupedAnswer.buildGroups[0]),[0,1,0],'a dragged ten must stay on the blue first-addend pad');
assert.deepEqual(Array.from(groupedAnswer.buildGroups[1]),[0,0,1],'a dragged one must stay on the orange second-addend pad');
assert.deepEqual(Array.from(groupedAnswer.parts),[0,1,1],'both pads must feed one combined base-ten model');
const groupedCard=question(groupedPage.root.innerHTML,0);
for(const unit of [100,10,1])assert.ok(groupedCard.includes('Build original question: '+unit+'s'),
  'Level 1 needs an original-question prompt for '+unit+'s');
assert.equal((groupedCard.match(/class="build-original-hint"/g)||[]).length,3,
  'only the three blue Level 1 pads should show original-question prompts');
assert.ok(groupedCard.includes('Level 1 · 1 tens')&&groupedCard.includes('Level 2 · 1 ones'),'students must see which addend owns each block');
assert.ok(groupedCard.includes('build-source-piece group-a')&&groupedCard.includes('build-source-piece group-b'),'placed blocks must keep distinct set colours');
assert.ok(groupedCard.includes('build-source-piece group-a" data-build-source="0" data-build-source-place="1"')&&groupedCard.includes('class="block-face t"'),'Level 1 must use picture rods, not number tiles');
assert.ok(groupedCard.includes('build-source-piece group-b" data-build-source="1" data-build-source-place="2"')&&groupedCard.includes('class="block-face o"'),'Level 2 must use picture cubes, not number tiles');
assert.ok(groupedCard.includes('number-combined-piece')&&groupedCard.includes('>10</button>')&&groupedCard.includes('>1</button>'),'only Level 3 total must use numeric 10 and 1 tiles');
for(const count of [5,6]){
  const groups=[[0,count,count],[0,0,0]],model={parts:[0,count,count],buildGroups:groups};
  const counted=groupedPage.window.STARLIGHT_TEST.renderBuild(groupedMission,model);
  assert.equal((counted.match(/count-five-end/g)||[]).length,4,
    'five-group spacing must follow the fifth ten and one in Level 1 and the total when '+count+' pieces are present');
}
const fiveHundreds=groupedPage.window.STARLIGHT_TEST.renderBuild(groupedMission,{parts:[5,0,0],buildGroups:[[5,0,0],[0,0,0]]});
assert.ok(!fiveHundreds.includes('count-five-end'),'hundreds should not receive a five-count break');
const regroupFives=groupedPage.window.STARLIGHT_TEST.renderRegroup({}, {parts:[0,5,5]});
assert.equal((regroupFives.match(/count-five-end/g)||[]).length,2,
  'ordinary tens and ones regroup pads should also leave a space after five pieces');
groupedPage.click({removeBlock:'1'});
const reducedGroups=JSON.parse(groupedPage.local.get('starlight1:v1:Excite:week1:home')).answers['0:0'];
assert.equal(reducedGroups.parts[1],0,'Remove one must remove the selected place-value block');
assert.equal(reducedGroups.buildGroups[0][1],0,'Remove one must also update the correct coloured source pad');
assert.equal(reducedGroups.buildGroups[1][2],1,'Remove one must leave the other addend untouched');
const filledGroups=groupedPage.window.STARLIGHT_TEST.buildAddends(groupedMission).map(n=>[Math.floor(n/100),Math.floor(n/10)%10,n%10]);
assert.ok(!groupedPage.window.STARLIGHT_TEST.correct(groupedMission,groupedAnswer),'incomplete coloured pads must not pass the assessment');
assert.ok(groupedPage.window.STARLIGHT_TEST.correct(groupedMission,{parts:[0,9,5],buildGroups:filledGroups}),'both correct addends and their combined total should pass');
assert.ok(groupedPage.window.STARLIGHT_TEST.responseText(groupedMission,{parts:[0,9,5],buildGroups:filledGroups}).includes('Level 1 starting number 68; Level 2 number added 27'),'PDF assessment must name both colour-coded addend levels');
assert.ok(groupedPage.window.STARLIGHT_TEST.responseText(groupedMission,{parts:[0,9,5],buildGroups:filledGroups}).includes('Level 3 total / answer 95'),'PDF assessment must identify the numeric total');
const lineOnlyPage=mount({view:'day',grade:'Excite',day:'Monday',search:'?track=home&task=0'});
const lineOnlyTest=lineOnlyPage.window.STARLIGHT_TEST;
assert.equal(groupedMission.operation,'68 + 27 = ?','the reported question should be the first Excite task');
lineOnlyPage.click({lineQuick:'20'});
lineOnlyPage.clickLineZone();
let lineOnlyAnswer=JSON.parse(lineOnlyPage.local.get('starlight1:v1:Excite:week1:home')).answers['0:0'];
assert.ok(!lineOnlyTest.correct(groupedMission,lineOnlyAnswer),'a partial +20 jump must not pass');
lineOnlyPage.click({lineQuick:'7'});
lineOnlyPage.clickLineZone();
lineOnlyAnswer=JSON.parse(lineOnlyPage.local.get('starlight1:v1:Excite:week1:home')).answers['0:0'];
assert.ok(!lineOnlyAnswer.parts,'the number-line route should not require blocks');
assert.ok(lineOnlyTest.answered(groupedMission,lineOnlyAnswer),'a completed number line must count as an answer');
assert.ok(lineOnlyTest.correct(groupedMission,lineOnlyAnswer),'68 +20 +7 = 95 must pass without blocks');
lineOnlyPage.click({action:'check'});
lineOnlyAnswer=JSON.parse(lineOnlyPage.local.get('starlight1:v1:Excite:week1:home')).answers['0:0'];
assert.ok(lineOnlyAnswer.checked,'Check my work should record the line-only answer');
assert.ok(question(lineOnlyPage.root.innerHTML,0).includes('Your number line reaches <strong>95</strong>'),'correct feedback must recognize the number line');
assert.ok(lineOnlyTest.responseText(groupedMission,lineOnlyAnswer).includes('Number line 68 +20 +7 = 95'),'PDF student work must identify a line-only route');
const subtractBuildMission=DATA.Excite.weeks[1].home[0].missions.find(m=>m.type==='build'&&/^178\s*[−-]\s*19\s*=/.test(m.operation));
assert.ok(subtractBuildMission&&lineOnlyTest.correct(subtractBuildMission,{lineJumps:{0:[-10,-10,1]}}),
  'an overshoot-and-return subtraction line must also count as correct without blocks');
assert.ok(!lineOnlyTest.correct(groupedMission,{lineJumps:{0:[20,7,1]}}),
  'an extra jump after reaching the goal must not count as correct');
lineOnlyPage.click({action:'line-undo'});
lineOnlyAnswer=JSON.parse(lineOnlyPage.local.get('starlight1:v1:Excite:week1:home')).answers['0:0'];
assert.ok(!lineOnlyAnswer.checked&&!lineOnlyTest.correct(groupedMission,lineOnlyAnswer),'undoing a successful route must require a fresh check');

for(const grade of grades){
  const missions=DATA[grade].weeks[1].home[0].missions;
  const addIndex=missions.findIndex(m=>m.type==='build'&&/\d+\s*\+\s*\d+/.test(m.operation));
  const subtractIndex=missions.findIndex(m=>m.type==='build'&&/\d+\s*-\s*\d+/.test(m.operation));
  assert.ok(addIndex>=0&&subtractIndex>=0,grade+' needs both addition and subtraction block pages');
  const place=grade==='Pathway'?1:0;
  const page=mount({view:'day',grade,day:'Monday',search:'?track=home&task='+addIndex});
  page.clickBuildPad(addIndex,place,0);
  page.clickBuildPad(addIndex,2,1);
  page.click({selectBuildGroup:'0',addBuildPad:String(place)});
  page.clickBuildPad(addIndex,2);
  const answer=JSON.parse(page.local.get('starlight1:v1:'+grade+':week1:home')).answers['0:'+addIndex];
  assert.equal(answer.buildGroups[0][place],2,grade+' Level 1 pad and title taps must add matching blocks');
  assert.equal(answer.buildGroups[1][2],1,grade+' Level 2 pad tap must add a matching block');
  assert.equal(answer.buildGroups[0][2],1,grade+' outer place pad tap must add to the active level');
  assert.equal(answer.parts[place],2,grade+' Level 3 total must follow upper pad taps');
  const subtraction=mount({view:'day',grade,day:'Monday',search:'?track=home&task='+subtractIndex});
  subtraction.clickBuildPad(subtractIndex,place);
  const subtractionAnswer=JSON.parse(subtraction.local.get('starlight1:v1:'+grade+':week1:home')).answers['0:'+subtractIndex];
  assert.equal(subtractionAnswer.parts[place],1,grade+' non-addition pad tap must add a matching block');
  assert.ok(!question(subtraction.root.innerHTML,subtractIndex).includes('number-combined-piece'),grade+' non-addition models must keep picture blocks');
}

for(const grade of grades){
  const index=DATA[grade].weeks[1].home[0].missions.findIndex(m=>m.type==='build'&&/\d+\s*\+\s*\d+/.test(m.operation));
  const page=mount({view:'day',grade,day:'Monday',search:'?track=home&task='+index});
  for(let n=0;n<10;n++)page.clickBuildPad(index,2,1);
  let card=question(page.root.innerHTML,index);
  assert.ok(card.includes('data-build-group-trade="group-ones" data-build-group="1"'),grade+' Level 2 pad must offer regrouping after ten ones');
  page.click({buildGroupTrade:'group-ones',buildGroup:'1'});
  let answer=JSON.parse(page.local.get('starlight1:v1:'+grade+':week1:home')).answers['0:'+index];
  assert.deepEqual(Array.from(answer.buildGroups[1]),[0,1,0],grade+' Level 2 ten ones must become one ten');
  assert.deepEqual(Array.from(answer.parts),[0,1,0],grade+' total pad must show the same traded value');
  if(grade==='Pathway'){
    assert.ok(!card.includes('data-build-group-trade="group-tens"'),'Grade 1 must not offer a hundred regroup button');
    continue;
  }
  for(let n=0;n<10;n++)page.clickBuildPad(index,1,0);
  card=question(page.root.innerHTML,index);
  assert.ok(card.includes('data-build-group-trade="group-tens" data-build-group="0"'),grade+' Level 1 pad must offer regrouping after ten tens');
  page.click({buildGroupTrade:'group-tens',buildGroup:'0'});
  answer=JSON.parse(page.local.get('starlight1:v1:'+grade+':week1:home')).answers['0:'+index];
  assert.deepEqual(Array.from(answer.buildGroups[0]),[1,0,0],grade+' Level 1 ten tens must become one hundred');
  assert.deepEqual(Array.from(answer.parts),[1,1,0],grade+' total pad must preserve both levels after regrouping');
}

const transferPage=mount({view:'day',grade:'Excite',day:'Monday',search:'?track=home&task=15'});
const transferMission=DATA.Excite.weeks[1].home[0].missions.find(m=>m.type==='transfer');
const visualGuide=transferPage.window.STARLIGHT_TEST.transferGuide(transferMission,{
  L:[...Array.from({length:6},()=>({unit:10})),...Array.from({length:5},()=>({unit:1}))],
  R:Array.from({length:4},()=>({unit:1}))
});
assert.ok(visualGuide.includes('First group · 65')&&visualGuide.includes('Second group · 4'),'visual guide must show the current moved-block arrangement');
assert.ok(visualGuide.includes('moving 5 ones from the first group to the second')&&visualGuide.includes('become 60'),'65 + 4 needs an achievable make-a-ten move, not an impossible next-ten instruction');
assert.ok(!visualGuide.includes('= 69'),'visual strategy must not reveal the final answer');
const emptyGuide=transferPage.window.STARLIGHT_TEST.transferGuide(transferMission,{L:[],R:[...Array.from({length:6},()=>({unit:10})),...Array.from({length:9},()=>({unit:1}))]});
assert.ok(emptyGuide.includes('Move pieces into the empty group first')&&!emptyGuide.includes('second group will become 0'),'the visual guide must not treat an empty pile as a completed ten');
const tenOnes=Array.from({length:10},(_,i)=>({id:'disc-'+i,unit:1,origin:'L'}));
const transferCard=transferPage.window.STARLIGHT_TEST.renderTransfer(transferMission,{transferPiles:{L:tenOnes,R:[]}});
const transferRegroup=transferCard.match(/<button[^>]*data-transfer-trade="group-ones"[^>]*>/)?.[0];
assert.ok(transferRegroup&&!transferRegroup.includes('disabled'),'a ten-frame with ten discs must enable its regroup button');

const tradedPage=mount({view:'day',grade:'Excite',day:'Monday',search:'?track=home&task=6'});
assert.equal(DATA.Excite.weeks[1].home[0].missions[6].operation,'81 + 46 = ?');
for(let n=0;n<8;n++)tradedPage.click({addBlock:'1'});
tradedPage.click({addBlock:'2'});
tradedPage.click({selectBuildGroup:'1'});
for(let n=0;n<4;n++)tradedPage.click({addBlock:'1'});
for(let n=0;n<6;n++)tradedPage.click({addBlock:'2'});
tradedPage.click({blockTrade:'group-tens'});
let tradedAnswer=JSON.parse(tradedPage.local.get('starlight1:v1:Excite:week1:home')).answers['0:6'];
assert.deepEqual(Array.from(tradedAnswer.parts),[1,2,7],'ten rods from two coloured sets should regroup to one hundred');
const hundredRemove=question(tradedPage.root.innerHTML,6).match(/<button[^>]*data-remove-block="0"[^>]*>/)?.[0];
assert.ok(hundredRemove&&!hundredRemove.includes('disabled'),'a regrouped hundred must enable Remove one');
tradedPage.click({removeBlock:'0'});
tradedAnswer=JSON.parse(tradedPage.local.get('starlight1:v1:Excite:week1:home')).answers['0:6'];
assert.deepEqual(Array.from(tradedAnswer.parts),[0,2,7],'Remove one must remove a regrouped hundred');
assert.equal(tradedAnswer.buildGroups.reduce((sum,group)=>sum+group[0]*100+group[1]*10+group[2],0),27,
  'removing a regrouped hundred must keep both coloured source pads consistent');

const ungroupedPage=mount({view:'day',grade:'Inspire',day:'Monday',search:'?track=home&task=2'});
ungroupedPage.click({addBlock:'0'});
ungroupedPage.click({blockTrade:'break-hundred'});
ungroupedPage.click({removeBlock:'1'});
const ungroupedAnswer=JSON.parse(ungroupedPage.local.get('starlight1:v1:Inspire:week1:home')).answers['0:2'];
assert.deepEqual(Array.from(ungroupedAnswer.parts),[0,9,0],'Remove one must remove a ten made by ungrouping a hundred');
assert.deepEqual(Array.from(ungroupedAnswer.buildGroups[0]),[0,9,0],'the source pad must reflect the removal after ungrouping');

const bankDragPage=mount({view:'day',grade:'Excite',day:'Monday',search:'?track=home&task=6'});
bankDragPage.dragBuildBankToPad(6,0,0);
bankDragPage.dragBuildBankToPad(6,0,0);
bankDragPage.dragBuildBankToPad(6,1,1);
const bankDragAnswer=JSON.parse(bankDragPage.local.get('starlight1:v1:Excite:week1:home')).answers['0:6'];
assert.deepEqual(Array.from(bankDragAnswer.parts),[2,1,0],
  'bank blocks must still drag downward after the exploratory model reaches the Grade 2 range ceiling');
assert.ok(question(bankDragPage.root.innerHTML,6).includes('above Grade 2’s 200-number range'),
  'an over-range practice model needs a clear message, not a silent failed drop');
bankDragPage.window.innerHeight=80;
bankDragPage.window.scrollBy=(_,distance)=>{bankDragPage.window.scrollY+=distance;};
bankDragPage.dragBuildBankToPad(6,2,1,75);
assert.ok(bankDragPage.window.scrollY>0,'dragging near the viewport bottom should scroll toward a lower pad');
assert.equal(JSON.parse(bankDragPage.local.get('starlight1:v1:Excite:week1:home')).answers['0:6'].parts[2],1,
  'a bank cube must land after the page auto-scrolls');

let checkedRemoveButtons=0;
for(const name of grades)for(const track of ['home','school'])for(const [dayIndex,day] of days.entries()){
  const missions=DATA[name].weeks[1][track][dayIndex].missions;
  for(const [index,m] of missions.entries())if(m.type==='build'){
    const page=mount({view:'day',grade:name,day,search:'?track='+track+'&task='+index,school:track==='school'});
    const first=question(page.root.innerHTML,index).match(/<button[^>]*data-remove-block="2"[^>]*>/)?.[0];
    assert.ok(first&&first.includes('disabled'),name+' '+track+' '+day+' Q'+(index+1)+' should disable Remove one when empty');
    page.click({addBlock:'2'});
    const added=JSON.parse(page.local.get('starlight1:v1:'+name+':week1:'+track)).answers[dayIndex+':'+index];
    assert.equal(added.parts[2],1,name+' '+track+' '+day+' Q'+(index+1)+' must add a cube');
    const ready=question(page.root.innerHTML,index).match(/<button[^>]*data-remove-block="2"[^>]*>/)?.[0];
    assert.ok(ready&&!ready.includes('disabled'),name+' '+track+' '+day+' Q'+(index+1)+' should enable Remove one after a block is added');
    page.click({removeBlock:'2'});
    const removed=JSON.parse(page.local.get('starlight1:v1:'+name+':week1:'+track)).answers[dayIndex+':'+index];
    assert.equal(removed.parts[2],0,name+' '+track+' '+day+' Q'+(index+1)+' must remove that cube');
    checkedRemoveButtons++;
  }
}
assert.equal(checkedRemoveButtons,132,'check every block-building page in Home and School');

for(const name of grades)for(const track of ['home','school'])for(const day of days){
  const missions=DATA[name].weeks[1][track][days.indexOf(day)].missions;
  const page=mount({view:'day',grade:name,day,search:'?track='+track,school:track==='school'});
  for(const [i,m] of missions.entries())if(m.blocks){
    const card=question(page.root.innerHTML,i);
    assert.ok(card.includes('data-regroup-zone'),name+' '+track+' '+day+' Q'+(i+1)+' lacks block model');
    assert.ok(!card.includes('number-line-panel'),name+' '+track+' '+day+' Q'+(i+1)+' has irrelevant line');
  }
  for(const [i,m] of missions.entries())if(m.options?.join('|')==='Team A|Team B'){
    const card=question(page.root.innerHTML,i);
    assert.equal((card.match(/data-line-zone data-line-model=/g)||[]).length,2,name+' '+track+' '+day+' Q'+(i+1)+' must display both lines');
  }
}

function answerDigits(value){return [Math.floor(value/100),Math.floor(value/10)%10,value%10];}
function answerTokens(value){
  let remaining=value;
  return [100,10,1].flatMap(unit=>{const count=Math.floor(remaining/unit);remaining%=unit;return Array.from({length:count},(_,i)=>({id:'audit-'+unit+'-'+i,unit,origin:'G'}));});
}
function checkableAnswer(m){
  switch(m.type){
    case 'choice':case 'fractionCompare':case 'slider':case 'round':return {value:m.answer};
    case 'chart':return {value:m.target};
    case 'estimate':return {value:m.actual,verified:false};
    case 'build':{
      const match=String(m.operation).match(/^(\d+)\s*\+\s*(\d+)\s*=\s*\?$/);
      return {parts:[...m.parts],...(match?{buildGroups:[answerDigits(Number(match[1])),answerDigits(Number(match[2]))]}:{})};
    }
    case 'order':return {slots:[...m.answer]};
    case 'share':{
      const placed={},rounds=Math.floor(m.items/m.sharers);
      for(let i=0;i<rounds*m.sharers;i++)placed[i]=i%m.sharers;
      return {value:m.answer,placed,cut:m.mode==='fraction'&&m.items%m.sharers>0};
    }
    case 'transfer':{
      const sum=m.addends[0]+m.addends[1],unit=m.friendlyUnit;
      const left=Math.floor(m.addends[0]/unit)*unit||unit;
      assert.ok(sum>=left,m.operation+' cannot make the requested friendly number');
      return {value:m.answer,transferMoves:1,transferPiles:{L:answerTokens(left),R:answerTokens(sum-left)}};
    }
    case 'decompose':{
      const left=answerDigits(m.addends[0]),right=answerDigits(m.addends[1]);
      return {value:m.answer,decomp:{left,right,sums:left.map((digit,i)=>digit+right[i])}};
    }
    case 'mean':return {meanTotal:String(m.total),meanValue:String(m.mean),meanBins:Object.fromEntries(m.values.map((value,i)=>[i,value<m.mean?'below':value===m.mean?'at':'above'])),meanFollowUps:m.meanFollowUps.map(item=>String(item.answer))};
    case 'readingGraph':return {graphBars:{girls:[...m.girls],boys:[...m.boys],class:[...m.totals]},graphAnswers:[...m.answers]};
    case 'string':return {stepValues:m.steps.map(step=>String(step.answer))};
    case 'shade':return {shades:{A:Array.from({length:m.a[0]},(_,i)=>i),B:Array.from({length:m.b[0]},(_,i)=>i)}};
    default:throw Error('No checkable-answer audit for '+m.type);
  }
}
function checkableWrongAnswer(m,valid){
  const wrongOption=m.options?.find(option=>String(option)!==String(m.answer));
  switch(m.type){
    case 'choice':case 'fractionCompare':case 'share':case 'transfer':case 'decompose':
      assert.ok(wrongOption!=null,m.operation+' needs a wrong choice for feedback testing');
      return {...valid,value:wrongOption};
    case 'slider':return {...valid,value:m.answer===m.min?m.min+m.step:m.min};
    case 'round':return {...valid,value:m.answer===Math.floor(m.value/m.unit)*m.unit?Math.floor(m.value/m.unit)*m.unit+m.unit:Math.floor(m.value/m.unit)*m.unit};
    case 'chart':return {...valid,value:m.target===1?2:1};
    case 'build':return {...valid,parts:[0,0,m.target===1?2:1]};
    case 'order':return {...valid,slots:[...m.answer].reverse()};
    case 'mean':return {...valid,meanValue:String(m.mean+1)};
    case 'readingGraph':return {...valid,graphBars:{...valid.graphBars,girls:[valid.graphBars.girls[0]===12?11:valid.graphBars.girls[0]+1,...valid.graphBars.girls.slice(1)]}};
    default:return null;
  }
}

let checkedQuestions=0,checkedWrongAnswers=0,checkedLineBuilds=0;
for(const name of grades)for(const track of ['home','school'])for(const [dayIndex,day] of days.entries()){
  const missions=DATA[name].weeks[1][track][dayIndex].missions;
  const page=mount({view:'day',grade:name,day,search:'?track='+track,school:track==='school'});
  const test=page.window.STARLIGHT_TEST;
  for(const [index,m] of missions.entries()){
    const where=name+' '+track+' '+day+' Q'+(index+1);
    const card=question(page.root.innerHTML,index);
    assert.equal((card.match(/data-action="check"/g)||[]).length,1,where+' needs exactly one Check my work button');
    assert.ok(m.type==='shade'||card.includes('data-')||card.includes('type="range"'),where+' needs an interactive answer tool');
    if(m.options)assert.ok(m.options.map(String).includes(String(m.answer)),where+' answer must appear among its choices');
    if(m.type==='slider')assert.ok(m.answer>=m.min&&m.answer<=m.max&&(m.answer-m.min)%m.step===0,where+' slider cannot reach its answer');
    const answer=checkableAnswer(m);
    const wrong=m.type==='estimate'?null:checkableWrongAnswer(m,answer);
    if(wrong){
      assert.ok(test.answered(m,wrong)&&!test.correct(m,wrong),where+' must recognize and reject a completed wrong answer');
      test.setAuditAnswer(index,wrong);
      page.clickAt(index,{action:'check'});
      const checkedWrong=test.getAuditAnswer(index);
      assert.ok(checkedWrong?.checked&&test.status(m,checkedWrong)==='Try again',where+' must give Try again feedback for a wrong answer');
      checkedWrongAnswers++;
    }
    assert.ok(test.answered(m,answer),where+' should recognize a finished answer');
    if(m.type!=='estimate')assert.ok(test.correct(m,answer),where+' should accept its answer before checking');
    test.setAuditAnswer(index,answer);
    page.clickAt(index,{action:'check'});
    const checked=test.getAuditAnswer(index);
    assert.ok(checked?.checked,where+' Check my work did not record the response');
    assert.ok(test.correct(m,checked),where+' Check my work rejected a valid response');
    assert.equal(test.status(m,checked),m.type==='estimate'?'Estimate verified':'Correct',where+' has incorrect feedback status');
    if(m.type==='build'&&m.jumpLine){
      const models=test.lineModels(m,{});
      assert.equal(models.length,1,where+' needs one arithmetic line');
      const jump=models[0].change;
      const lineAnswer={lineJumps:{0:[jump]}};
      assert.ok(jump&&test.answered(m,lineAnswer)&&test.correct(m,lineAnswer),where+' must accept a completed number line without blocks');
      test.setAuditAnswer(index,lineAnswer);
      page.clickAt(index,{action:'check'});
      const checkedLine=test.getAuditAnswer(index);
      assert.ok(checkedLine?.checked&&test.status(m,checkedLine)==='Correct',where+' Check my work must mark a line-only route correct');
      checkedLineBuilds++;
    }
    checkedQuestions++;
  }
}
assert.equal(checkedQuestions,total,'every Week 1 question must be checked');
console.log('Verified Starlight 1: '+total+' Week 1 questions, '+checkedQuestions+' working Check my work buttons across 30 day routes, '+checkedWrongAnswers+' wrong answers receiving Try again, '+checkedLineBuilds+' build questions accepting a completed number line, '+grade2TwoDigit+' curriculum-aligned Excite two-digit additions, '+teamQuestions+' two-team questions with both lines visible, '+lines+' purposeful number-line tasks, '+checkedRemoveButtons+' working Remove one buttons, '+blockQuestions+' block-trading tasks, PDFs, backwards jumps, and block-bank dragging.');
