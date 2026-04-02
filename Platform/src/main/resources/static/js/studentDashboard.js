/* DATA */
var SLOTS=[
  {id:'s1',title:'Data Structures',  date:'25 Oct 2024',time:'10:00 AM',interviewer:'Dr. Linda S.',  spots:3,total:5,cat:'technical',color:'#EFF6FF',iconColor:'#1E3A8A',icon:'fa-code'},
  {id:'s2',title:'System Design',    date:'26 Oct 2024',time:'02:30 PM',interviewer:'Prof. Robert C.',spots:1,total:5,cat:'design',  color:'#FFFBEB',iconColor:'#D97706',icon:'fa-sitemap'},
  {id:'s3',title:'Full Stack Dev',   date:'27 Oct 2024',time:'11:30 AM',interviewer:'Dr. Linda S.',  spots:4,total:5,cat:'technical',color:'#F0FDFA',iconColor:'#0D9488',icon:'fa-layer-group'},
  {id:'s4',title:'HR / Behavioral',  date:'29 Oct 2024',time:'09:00 AM',interviewer:'Ms. Kavita R.',spots:0,total:5,cat:'hr',      color:'#FDF4FF',iconColor:'#9333EA',icon:'fa-brain'},
  {id:'s5',title:'SQL & Databases',  date:'30 Oct 2024',time:'03:00 PM',interviewer:'Prof. Robert C.',spots:2,total:5,cat:'technical',color:'#FEF2F2',iconColor:'#DC2626',icon:'fa-database'},
  {id:'s6',title:'Machine Learning', date:'31 Oct 2024',time:'10:00 AM',interviewer:'Dr. Priya M.', spots:2,total:4,cat:'technical',color:'#F5F3FF',iconColor:'#7C3AED',icon:'fa-robot'},
  {id:'s7',title:'OS & Networking',  date:'01 Nov 2024',time:'02:00 PM',interviewer:'Prof. Robert C.',spots:3,total:5,cat:'technical',color:'#F0FDF4',iconColor:'#16A34A',icon:'fa-network-wired'},
];
var appliedSlots={},ratingPending=null,ratingGiven={},ratingValue=0;

/* STUDENT */
var STUDENT=(function(){
  try{
    var s=JSON.parse(localStorage.getItem('currentStudent'));
    if(s&&s.name)return s;
    var em=localStorage.getItem('lastLoginEmail');
    if(em){var us=JSON.parse(localStorage.getItem('users'))||[];var u=us.find(function(x){return x.email===em&&x.role==='Student';});if(u)return u;}
  }catch(e){}
  return{name:'Aditya Sharma',firstName:'Aditya',lastName:'Sharma',email:'aditya.sharma@gtu.ac.in',phone:'+91 98765 43210',department:'Computer Science',instituteName:'Global Tech University',class:'SYMCA',year:'SY',degree:'MCA',role:'Student'};
})();
function getInitials(n){return(n||'S').split(' ').filter(Boolean).map(function(w){return w[0];}).join('').toUpperCase().slice(0,2)||'ST';}
function setVal(id,v){var el=document.getElementById(id);if(el&&v!=null)el.value=v;}

/* INIT */
window.addEventListener('DOMContentLoaded',function(){
  initStudentUI();
  renderSlots('dashSlots');
  renderSlots('applyGrid');
  initPerfCharts();
  initSkillTags();
});

function initStudentUI(){
  var name=STUDENT.name||(STUDENT.firstName+' '+STUDENT.lastName)||'Student';
  var email=STUDENT.email||'',dept=STUDENT.department||'',inst=STUDENT.instituteName||STUDENT.institute||'';
  var cls=STUDENT.class||((STUDENT.year||'SY')+(STUDENT.degree||'MCA'));
  var ini=getInitials(name),phone=STUDENT.phone||'';
  var fn=STUDENT.firstName||name.split(' ')[0]||'Student';
  var ln=STUDENT.lastName||name.split(' ').slice(1).join(' ')||'';
  var ha=document.getElementById('headerAvatar');if(ha)ha.textContent=ini;
  var hn=document.getElementById('headerName');if(hn)hn.textContent=name;
  var hs=document.getElementById('headerSub');if(hs)hs.textContent=cls+' · Student';
  var dn=document.getElementById('dropName');if(dn)dn.textContent=name;
  var de=document.getElementById('dropEmail');if(de)de.textContent=email;
  var pa=document.getElementById('phAvatar');if(pa)pa.textContent=ini;
  var pn=document.getElementById('phName');if(pn)pn.textContent=name;
  var ps=document.getElementById('phSub');if(ps)ps.textContent=cls+' · '+(dept||'Student')+' · '+(inst||'Institute');
  var pe=document.getElementById('phEmail');if(pe)pe.textContent=email;
  setVal('pf_fname',fn);setVal('pf_lname',ln);setVal('pf_email_ro',email);setVal('pf_phone_ro',phone);setVal('pf_dept_ro',dept);setVal('pf_inst_ro',inst);
  var year=STUDENT.year||cls.slice(0,2)||'SY',degree=STUDENT.degree||cls.slice(2)||'MCA';
  var ye=document.getElementById('pf_year'),de2=document.getElementById('pf_degree');
  if(ye){for(var i=0;i<ye.options.length;i++){if(ye.options[i].value===year){ye.selectedIndex=i;break;}}}
  if(de2){for(var j=0;j<de2.options.length;j++){if(de2.options[j].value===degree){de2.selectedIndex=j;break;}}}
  updateClassCode();
  var ab=document.getElementById('pf_about');if(ab&&STUDENT.about)ab.value=STUDENT.about;
  var scc=document.getElementById('statsClassCode');if(scc)scc.textContent=cls;
  updateGreeting();
}
function updateGreeting(){
  var h=new Date().getHours();
  var g=h<12?'Good morning':h<17?'Good afternoon':'Good evening';
  var fn=STUDENT.firstName||(STUDENT.name||'').split(' ')[0]||'there';
  var el=document.getElementById('welcomeName');if(el)el.textContent=g+', '+fn+'! 👋';
}

/* SCROLL */
function scrollSlots(id,dir){var c=document.getElementById(id);if(c)c.scrollBy({left:dir*250,behavior:'smooth'});}

/* SLOT CARDS */
function buildCardHTML(s){
  var pct=(s.spots/s.total)*100,applied=appliedSlots[s.id],wc=pct>70?'background:#D97706;':'';
  return '<div class="ac-icon" style="background:'+s.color+';color:'+s.iconColor+';"><i class="fa-solid '+s.icon+'"></i></div>'+
    '<div class="ac-title">'+s.title+'</div>'+
    '<div class="ac-meta"><i class="fa-solid fa-calendar"></i><b>'+s.date+'</b></div>'+
    '<div class="ac-meta"><i class="fa-solid fa-clock"></i><b>'+s.time+'</b></div>'+
    '<div class="ac-meta"><i class="fa-solid fa-user-tie"></i><b>'+s.interviewer+'</b></div>'+
    '<div class="ac-meta"><i class="fa-solid fa-users"></i><span>'+s.spots+' / '+s.total+' spots</span></div>'+
    '<div class="spots-bg"><div class="spots-fill" style="width:'+pct+'%;'+wc+'"></div></div>'+
    (applied?'<button class="btn" style="width:100%;justify-content:center;background:#DCFCE7;color:#166534;border:1.5px solid #86EFAC;margin-top:2px;" disabled><i class="fa-solid fa-check"></i> Applied!</button>'
    :'<button class="btn btn-s" style="width:100%;justify-content:center;margin-top:2px;" onclick="applySlot(\''+s.id+'\',\''+s.title+'\',\''+s.date+'\',\''+s.time+'\',\''+s.interviewer+'\')"><i class="fa-solid fa-check"></i> Apply</button>');
}
function renderSlots(cId){
  var c=document.getElementById(cId);if(!c)return;c.innerHTML='';
  SLOTS.forEach(function(s){var d=document.createElement('div');d.className='apply-card'+(appliedSlots[s.id]?' applied':'');d.setAttribute('data-cat',s.cat);d.innerHTML=buildCardHTML(s);c.appendChild(d);});
}
function applySlot(id,title,date,time,interviewer){
  appliedSlots[id]=true;renderSlots('dashSlots');renderSlots('applyGrid');
  var tbody=document.getElementById('intTableBody');
  var ini=interviewer.split(' ').filter(function(w){return /^[A-Z]/.test(w);}).map(function(w){return w[0];}).join('').slice(0,2);
  var row=document.createElement('tr');row.setAttribute('data-status','pending');
  row.innerHTML='<td><div style="font-weight:700;">'+date+'</div><div style="font-size:12px;color:var(--muted);">'+time+'</div></td><td>'+title+'</td>'+
    '<td><div style="display:flex;align-items:center;gap:8px;"><div style="width:28px;height:28px;border-radius:50%;background:#EFF6FF;color:var(--primary);display:grid;place-items:center;font-weight:700;font-size:11px;">'+ini+'</div>'+interviewer+'</div></td>'+
    '<td><span class="badge bg-pending">Pending</span></td><td style="color:var(--muted);">—</td>'+
    '<td><button class="btn btn-ghost btn-sm" onclick="cancelInterview(this)"><i class="fa-solid fa-xmark"></i> Cancel</button></td>';
  tbody.insertBefore(row,tbody.firstChild);showToast('Applied for '+title+' on '+date+'!');
}
function filterApply(cat,btn){
  document.querySelectorAll('#view-apply .filter-tab').forEach(function(t){t.classList.remove('active');});btn.classList.add('active');
  var c=document.getElementById('applyGrid');if(!c)return;c.innerHTML='';
  SLOTS.forEach(function(s){if(cat!=='all'&&s.cat!==cat)return;var d=document.createElement('div');d.className='apply-card'+(appliedSlots[s.id]?' applied':'');d.setAttribute('data-cat',s.cat);d.innerHTML=buildCardHTML(s);c.appendChild(d);});
}
function cancelInterview(btn){if(confirm('Cancel this interview request?')){btn.closest('tr').remove();showToast('Interview cancelled','warn');}}
function filterInts(status,btn){
  document.querySelectorAll('#intFilterBar .filter-tab').forEach(function(t){t.classList.remove('active');});btn.classList.add('active');
  document.querySelectorAll('#intTableBody tr').forEach(function(r){r.style.display=(status==='all'||r.dataset.status===status)?'':'none';});
}

/* REPORT FLOW */
function openReportFlow(topic,date,interviewer,score){
  var key=topic+'_'+date;
  if(!ratingGiven[key]){
    ratingPending={topic:topic,date:date,interviewer:interviewer,score:score};ratingValue=0;
    document.getElementById('ratingInterviewerName').textContent='Rate '+interviewer;
    document.querySelectorAll('.star').forEach(function(s){s.classList.remove('active');});
    document.getElementById('ratingText').value='';document.getElementById('ratingLabel').textContent='';
    openOverlay('ratingModal');
  }else openReport(topic,date,interviewer,score);
}
function setRating(v){
  ratingValue=v;var labels=['','Poor','Fair','Good','Very Good','Excellent'];
  document.getElementById('ratingLabel').textContent=labels[v]||'';
  document.querySelectorAll('.star').forEach(function(s){s.classList.toggle('active',parseInt(s.dataset.v)<=v);});
}
function submitRating(){
  if(!ratingPending)return;
  var key=ratingPending.topic+'_'+ratingPending.date;
  ratingGiven[key]={rating:ratingValue,feedback:document.getElementById('ratingText').value};
  var p=ratingPending;ratingPending=null;closeOverlay('ratingModal');showToast('Rating submitted! Thank you ⭐');
  setTimeout(function(){openReport(p.topic,p.date,p.interviewer,p.score);},350);
}
function skipRating(){
  var p=ratingPending;if(p){ratingGiven[p.topic+'_'+p.date]=true;}ratingPending=null;closeOverlay('ratingModal');
  if(p)setTimeout(function(){openReport(p.topic,p.date,p.interviewer,p.score);},200);
}

/* REPORT MODAL — 4 tabs */
function openReport(topic,date,interviewer,score){
  var s=parseFloat(score);
  var name=STUDENT.name||'Aditya Sharma',cls=STUDENT.class||'SYMCA',email=STUDENT.email||'—',phone=STUDENT.phone||'—',ini=getInitials(name);
  var perf=s>=9?'Outstanding':s>=8?'Excellent':s>=7?'Good':s>=6?'Average':s>=5?'Below Average':'Poor';
  var perfColor=s>=8?'var(--success)':s>=6?'var(--warning)':'var(--danger)';
  var perfBg=s>=8?'#DCFCE7':s>=6?'#FEF3C7':'#FEE2E2';
  document.getElementById('rm_studentName').textContent=name;
  document.getElementById('rm_class').textContent=cls;
  document.getElementById('rm_email').textContent=email;
  document.getElementById('rm_phone').textContent=phone;
  document.getElementById('rm_bannerAvatar').textContent=ini;
  document.getElementById('rm_bannerName').textContent=name;
  document.getElementById('rm_bannerSub').textContent=cls+' ('+topic+') · '+perf;
  var rubrics=[
    {label:'Communication',      v:Math.min(10,s+0.8),color:'#0D9488'},
    {label:'Java & Spring Boot', v:Math.min(10,s+0.3),color:'#0D9488'},
    {label:'Data Structures',    v:Math.min(10,Math.max(1,s-0.2)),color:'#D97706'},
    {label:'System Design',      v:Math.min(10,Math.max(1,s-1.2)),color:'#DC2626'},
  ];
  /* Overview */
  document.getElementById('rt-overview').innerHTML=
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:18px;">'+
      '<div style="background:var(--bg);border-radius:var(--r);padding:14px 16px;"><div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;">Overall Score</div><div style="font-size:1.7rem;font-weight:800;color:var(--dark);font-family:\'Plus Jakarta Sans\',sans-serif;">'+score+' / 10</div></div>'+
      '<div style="background:var(--bg);border-radius:var(--r);padding:14px 16px;"><div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;">Interviews Attended</div><div style="font-size:1.7rem;font-weight:800;color:var(--dark);font-family:\'Plus Jakarta Sans\',sans-serif;">5 interviews</div></div>'+
      '<div style="background:var(--bg);border-radius:var(--r);padding:14px 16px;"><div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;">Last Interview</div><div style="font-size:1rem;font-weight:700;color:var(--dark);">'+date+'</div></div>'+
      '<div style="background:'+perfBg+';border-radius:var(--r);padding:14px 16px;"><div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;">Performance</div><div style="display:flex;align-items:center;gap:6px;"><i class="fa-solid fa-circle-check" style="color:'+perfColor+';"></i><span style="font-size:13px;font-weight:700;color:'+perfColor+';text-transform:uppercase;letter-spacing:.04em;">'+perf+'</span></div></div>'+
    '</div>'+
    '<div style="font-size:10.5px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:12px;">Skill Scores</div>'+
    rubrics.map(function(r){var pct=Math.round(r.v/10*100);
      return '<div style="margin-bottom:14px;"><div style="display:flex;justify-content:space-between;font-size:13.5px;font-weight:600;margin-bottom:6px;"><span>'+r.label+'</span><span style="color:'+r.color+';font-weight:700;">'+pct+'%</span></div>'+
        '<div style="background:var(--border);height:8px;border-radius:6px;overflow:hidden;"><div style="width:'+pct+'%;height:100%;border-radius:6px;background:'+r.color+';transition:width .8s ease;"></div></div></div>';
    }).join('');
  /* Feedback */
  document.getElementById('rt-feedback').innerHTML=
    '<div style="border-left:3px solid var(--accent);background:var(--bg);border-radius:0 var(--r) var(--r) 0;padding:14px 16px;">'+
      '<div style="display:flex;justify-content:space-between;margin-bottom:8px;flex-wrap:wrap;gap:4px;"><span style="font-size:13px;font-weight:700;color:var(--accent);">'+topic+'</span><span style="font-size:12px;color:var(--muted);">'+interviewer+' · '+date+'</span></div>'+
      '<p style="font-size:13.5px;line-height:1.75;color:var(--dark);">'+name.split(' ')[0]+' demonstrated strong command over Java fundamentals and OOP concepts. System design lacked depth for distributed systems — recommend focused prep on scalability patterns.</p>'+
    '</div>';
  /* Rounds */
  var rounds=[{label:'Aptitude Test',date:'Feb 10, 2025',score:'88%',done:true},{label:'Technical Round 1 — DSA',date:'Feb 15, 2025',score:'7.8 / 10',done:true},{label:'Technical Round 2 — Java',date:date,score:score+' / 10',done:true},{label:'HR Round',date:'Mar 13, 2025',score:'Upcoming',done:false}];
  document.getElementById('rt-rounds').innerHTML='<div style="display:flex;flex-direction:column;gap:16px;">'+rounds.map(function(r){
    return '<div style="display:flex;gap:13px;align-items:flex-start;"><div style="width:11px;height:11px;border-radius:50%;background:'+(r.done?'var(--accent)':'#D1D5DB')+';margin-top:4px;flex-shrink:0;"></div><div><div style="font-size:13.5px;font-weight:700;color:var(--dark);margin-bottom:2px;">'+r.label+'</div><div style="font-size:12px;color:var(--muted);">'+r.date+' · <span style="color:'+(r.done?'var(--dark)':'var(--muted)')+';font-weight:600;">Score: '+r.score+'</span></div></div></div>';
  }).join('')+'</div>';
  /* Recording */
  document.getElementById('rt-recording').innerHTML=
    '<div style="width:100%;aspect-ratio:16/9;background:var(--primary);border-radius:var(--r);display:flex;align-items:center;justify-content:center;cursor:pointer;position:relative;overflow:hidden;" onclick="showToast(\'Recording playback coming soon\',\'warn\')">'+
      '<div style="width:56px;height:56px;background:rgba(255,255,255,.9);border-radius:50%;display:flex;align-items:center;justify-content:center;"><i class="fa-solid fa-play" style="color:var(--primary);font-size:1.1rem;margin-left:4px;"></i></div>'+
      '<div style="position:absolute;bottom:12px;left:14px;color:rgba(255,255,255,.7);font-size:12px;"><i class="fa-solid fa-video" style="margin-right:5px;"></i>Interview Recording · '+date+'</div>'+
    '</div><p style="font-size:12px;color:var(--muted);margin-top:10px;"><i class="fa-solid fa-circle-info" style="color:var(--accent);margin-right:4px;"></i>This recording is available for review purposes only.</p>';
  /* Reset tabs */
  document.querySelectorAll('#reportModal .modal-tab').forEach(function(t){t.classList.remove('active');});
  document.querySelectorAll('#reportModal .modal-tab-panel').forEach(function(p){p.classList.remove('active');});
  document.querySelector('#reportModal .modal-tab').classList.add('active');
  document.getElementById('rt-overview').classList.add('active');
  openOverlay('reportModal');
}
function switchReportTab(el,panelId){
  document.querySelectorAll('#reportModal .modal-tab').forEach(function(t){t.classList.remove('active');});
  document.querySelectorAll('#reportModal .modal-tab-panel').forEach(function(p){p.classList.remove('active');});
  el.classList.add('active');document.getElementById(panelId).classList.add('active');
}

/* SKILLS */
function initSkillTags(){
  if(!STUDENT.skills||!STUDENT.skills.length)return;
  var area=document.getElementById('skillArea'),inp=document.getElementById('skillInput');
  if(!area||!inp)return;
  area.querySelectorAll('.skill-tag').forEach(function(t){t.remove();});
  STUDENT.skills.forEach(function(sk){area.insertBefore(makeSkillTag(sk),inp);});
}
function makeSkillTag(text){var t=document.createElement('span');t.className='skill-tag';t.innerHTML=text+' <i class="fa-solid fa-xmark" onclick="this.closest(\'.skill-tag\').remove()"></i>';return t;}
function addSkillTag(e){if(e.key!=='Enter')return;e.preventDefault();var inp=document.getElementById('skillInput'),val=inp.value.trim();if(!val)return;document.getElementById('skillArea').insertBefore(makeSkillTag(val),inp);inp.value='';}
function getSkills(){return Array.prototype.map.call(document.querySelectorAll('#skillArea .skill-tag'),function(t){return t.textContent.trim().replace(/[×x\u00d7]$/,'').trim();});}

/* PASSWORD */
function checkPwdStrength(val){
  var bars=[document.getElementById('psb1'),document.getElementById('psb2'),document.getElementById('psb3'),document.getElementById('psb4')];
  var label=document.getElementById('pwdStrLabel');if(!bars[0])return;
  var score=0;if(val.length>=8)score++;if(/[A-Z]/.test(val)&&/[a-z]/.test(val))score++;if(/[0-9]/.test(val))score++;if(/[^A-Za-z0-9]/.test(val))score++;
  var cfg=[{c:'transparent',t:''},{c:'#DC2626',t:'Weak'},{c:'#D97706',t:'Fair'},{c:'#0D9488',t:'Good'},{c:'#16A34A',t:'Strong'}];
  bars.forEach(function(b,i){b.style.background=i<score?cfg[score].c:'var(--border)';});
  if(label){label.textContent=val.length?cfg[score].t:'';label.style.color=cfg[score].c;}
}
function togglePwdEye(iId,eId){
  var inp=document.getElementById(iId),ico=document.getElementById(eId);if(!inp||!ico)return;
  var show=inp.type==='password';inp.type=show?'text':'password';
  ico.className='fa-solid '+(show?'fa-eye-slash':'fa-eye');
  ico.style.cssText='position:absolute;right:12px;top:50%;transform:translateY(-50%);color:var(--muted);cursor:pointer;font-size:13px;';
}

/* PROFILE SAVE */
function updateClassCode(){
  var y=document.getElementById('pf_year'),d=document.getElementById('pf_degree');
  var code=(y?y.value:'SY')+(d?d.value:'MCA');
  var cv=document.getElementById('classCodeVal');if(cv)cv.textContent=code;
  var sc=document.getElementById('statsClassCode');if(sc)sc.textContent=code;
  var hs=document.getElementById('headerSub');if(hs)hs.textContent=code+' · Student';
  var ps=document.getElementById('phSub');if(ps)ps.textContent=code+' · '+(STUDENT.department||'Student')+' · '+(STUDENT.instituteName||'Institute');
}
function saveAcademic(){
  var ye=document.getElementById('pf_year'),de=document.getElementById('pf_degree'),ab=document.getElementById('pf_about');
  STUDENT.year=ye?ye.value:STUDENT.year;STUDENT.degree=de?de.value:STUDENT.degree;STUDENT.class=STUDENT.year+STUDENT.degree;
  STUDENT.about=ab?ab.value:STUDENT.about;STUDENT.skills=getSkills();
  try{localStorage.setItem('currentStudent',JSON.stringify(STUDENT));}catch(e){}
  updateClassCode();showToast('Academic details saved!');
}
function changePassword(){
  var c=document.getElementById('pf_curpwd').value,n=document.getElementById('pf_newpwd').value,p=document.getElementById('pf_confpwd').value;
  if(!c||!n||!p){showToast('Fill in all password fields.','warn');return;}
  if(n.length<8){showToast('New password must be at least 8 characters.','warn');return;}
  if(n!==p){showToast('Passwords do not match.','warn');return;}
  STUDENT.password=n;
  try{localStorage.setItem('currentStudent',JSON.stringify(STUDENT));var us=JSON.parse(localStorage.getItem('users'))||[];var idx=us.findIndex(function(u){return u.email===STUDENT.email;});if(idx!==-1){us[idx].password=n;localStorage.setItem('users',JSON.stringify(us));}}catch(e){}
  document.getElementById('pf_curpwd').value='';document.getElementById('pf_newpwd').value='';document.getElementById('pf_confpwd').value='';
  checkPwdStrength('');showToast('Password updated successfully!');
}
function handleResumeUpload(input){
  if(!input.files||!input.files[0])return;var file=input.files[0];
  if(file.size>5*1024*1024){showToast('File too large. Max 5MB.','warn');return;}
  document.getElementById('resumeName').textContent=file.name;
  document.getElementById('resumeDate').textContent='Uploaded '+new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
  showToast('Resume uploaded!');input.value='';
}

/* CHARTS */
var perfInited=false;
function initPerfCharts(){
  if(perfInited)return;perfInited=true;
  var SEC='#0D9488',PRI='#1E3A8A',WARN='#D97706',GRID='rgba(0,0,0,0.04)',LBL='#94A3B8';
  new Chart(document.getElementById('perfChart'),{type:'line',data:{labels:['Int 1','Int 2','Int 3','Int 4','Int 5','Int 6','Int 7','Int 8'],datasets:[{label:'Score',data:[6.2,6.8,7.0,7.4,7.6,7.8,8.0,8.2],borderColor:SEC,backgroundColor:'rgba(13,148,136,0.06)',tension:0.4,fill:true,pointBackgroundColor:SEC,pointRadius:4,borderWidth:2.5}]},options:{plugins:{legend:{display:false}},scales:{y:{min:5,max:10,grid:{color:GRID},ticks:{color:LBL}},x:{grid:{color:GRID},ticks:{color:LBL}}}}});
  new Chart(document.getElementById('radarChart'),{type:'radar',data:{labels:['Technical','Problem Solving','Communication','Confidence','Domain'],datasets:[{data:[85,72,70,65,80],backgroundColor:'rgba(13,148,136,0.1)',borderColor:SEC,pointBackgroundColor:SEC,pointRadius:4}]},options:{plugins:{legend:{display:false}},scales:{r:{min:0,max:100,ticks:{display:false},grid:{color:'rgba(0,0,0,0.06)'},pointLabels:{color:LBL,font:{size:11}}}}}});
  new Chart(document.getElementById('domainChart'),{type:'bar',data:{labels:['Spring Boot','Data Structures','System Design'],datasets:[{label:'Score',data:[8.2,7.4,6.8],backgroundColor:[SEC,PRI,WARN],borderRadius:6}]},options:{plugins:{legend:{display:false}},scales:{y:{min:0,max:10,grid:{color:GRID},ticks:{color:LBL}},x:{grid:{display:false},ticks:{color:LBL}}}}});
}

/* NAVIGATION */
var pageTitles={dashboard:'Dashboard',apply:'Apply / Browse',myinterviews:'My Interviews',reports:'Feedback Reports',performance:'Performance',profile:'My Profile'};
function showView(v){
  document.querySelectorAll('.nav-links a').forEach(function(l){l.classList.remove('active');});
  var lnk=document.getElementById('link-'+v);if(lnk)lnk.classList.add('active');
  document.querySelectorAll('.content-body').forEach(function(s){s.classList.remove('active');});
  document.getElementById('view-'+v).classList.add('active');
  document.getElementById('page-title').textContent=pageTitles[v]||v;
  document.getElementById('breadcrumb-cur').textContent=pageTitles[v]||v;
  closeNotif();closeUserMenu();
  if(v==='performance')setTimeout(initPerfCharts,100);
  closeSidebar();
  window.scrollTo({top:0,behavior:'smooth'});
}

/* SIDEBAR */
function toggleSidebar(){var s=document.getElementById('sidebar'),o=document.getElementById('sidebarOverlay'),b=document.getElementById('hamburger'),open=s.classList.toggle('open');o.classList.toggle('active',open);b.classList.toggle('open',open);}
function closeSidebar(){document.getElementById('sidebar').classList.remove('open');document.getElementById('sidebarOverlay').classList.remove('active');document.getElementById('hamburger').classList.remove('open');}

/* NOTIFICATIONS */
function toggleNotif(){document.getElementById('notifPanel').classList.toggle('open');}
function closeNotif(){document.getElementById('notifPanel').classList.remove('open');}
function markAllRead(){document.querySelectorAll('.notif-item.unread').forEach(function(i){i.classList.remove('unread');});document.getElementById('notifDot').style.display='none';closeNotif();showToast('All notifications marked as read');}
document.addEventListener('click',function(e){if(!e.target.closest('.notif-wrap'))closeNotif();if(!e.target.closest('.user-menu-wrap'))closeUserMenu();});

/* USER MENU */
function toggleUserMenu(){document.getElementById('userDropdown').classList.toggle('open');}
function closeUserMenu(){document.getElementById('userDropdown').classList.remove('open');}

/* MODALS */
function openOverlay(id){document.getElementById(id).classList.add('open');}
function closeOverlay(id){document.getElementById(id).classList.remove('open');}
window.addEventListener('click',function(e){if(e.target.classList.contains('modal-overlay')&&e.target.id!=='ratingModal')closeOverlay(e.target.id);});

/* LOGOUT */
function openLogout(){openOverlay('logoutModal');}
function confirmLogout(){if(document.getElementById('skipLogout').checked)localStorage.setItem('skipLogoutConfirm','true');showToast('Logged out');setTimeout(function(){window.location.href='login.html?role=student';},800);}

/* TOAST */
function showToast(msg,type){
  type=type||'success';
  var c={success:['#DCFCE7','#166534'],warn:['#FEF3C7','#92400E'],error:['#FEE2E2','#991B1B']}[type]||['#DCFCE7','#166534'];
  var ico=type==='error'?'circle-xmark':type==='warn'?'triangle-exclamation':'circle-check';
  var t=document.createElement('div');t.className='toast';t.style.cssText='background:'+c[0]+';color:'+c[1]+';';
  t.innerHTML='<i class="fa-solid fa-'+ico+'"></i>'+msg;document.body.appendChild(t);setTimeout(function(){t.remove();},3000);
}