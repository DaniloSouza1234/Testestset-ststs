const pressures = [2,4,6,7,8,10];

const data = [
 {bore:10,rod:4,rodThread:"M4x0,7",port:"M5",f:{2:{e:1.6,r:1.3},4:{e:3.2,r:2.7},6:{e:4.8,r:4.0},8:{e:6.4,r:5.4},10:{e:8.0,r:6.7}}},
 {bore:12,rod:6,rodThread:"M6x1,0",port:"M5",f:{2:{e:2.3,r:1.7},4:{e:4.6,r:3.5},6:{e:6.9,r:5.2},8:{e:9.2,r:6.9},10:{e:11.5,r:8.6}}},
 {bore:16,rod:6,rodThread:"M6x1,0",port:"M5",f:{2:{e:4.1,r:3.5},4:{e:8.2,r:7.0},6:{e:12.3,r:10.6},8:{e:16.4,r:14.1},10:{e:20.5,r:17.6}}},
 {bore:20,rod:8,rodThread:"M8x1,25",port:"G 1/8\"",f:{2:{e:6.4,r:5.4},4:{e:12.8,r:10.8},6:{e:19.2,r:16.1},8:{e:25.6,r:21.5},10:{e:32.0,r:26.9}}},
 {bore:25,rod:10,rodThread:"M10x1,25",port:"G 1/8\"",f:{2:{e:10.0,r:8.4},4:{e:20.0,r:16.8},6:{e:30.0,r:25.2},8:{e:40.0,r:33.6},10:{e:50.1,r:42.0}}},
 {bore:32,rod:12,rodThread:"M10x1,25",port:"G 1/8\"",f:{2:{e:16.4,r:14.1},4:{e:32.8,r:28.2},6:{e:49.2,r:42.3},8:{e:65.6,r:56.4},10:{e:82.0,r:70.5}}},
 {bore:40,rod:16,rodThread:"M12x1,25",port:"G 1/4\"",f:{2:{e:25.6,r:21.5},4:{e:51.3,r:43.1},6:{e:76.9,r:64.6},8:{e:102.5,r:86.1},10:{e:128.1,r:107.6}}},
 {bore:50,rod:20,rodThread:"M16x1,5",port:"G 1/4\"",f:{2:{e:40.0,r:33.6},4:{e:80.1,r:67.3},6:{e:120.1,r:100.9},8:{e:160.2,r:134.5},10:{e:200.2,r:168.2}}},
 {bore:63,rod:20,rodThread:"M16x1,5",port:"G 3/8\"",f:{2:{e:63.6,r:57.2},4:{e:127.1,r:114.3},6:{e:190.7,r:171.5},8:{e:254.3,r:228.7},10:{e:317.9,r:285.8}}},
 {bore:80,rod:25,rodThread:"M20x1,5",port:"G 3/8\"",f:{2:{e:102.5,r:92.5},4:{e:205.0,r:185.0},6:{e:307.5,r:277.5},8:{e:410.0,r:370.0},10:{e:512.6,r:462.5}}},
 {bore:100,rod:25,rodThread:"M20x1,5",port:"G 1/2\"",f:{2:{e:160.2,r:150.2},4:{e:320.3,r:300.3},6:{e:480.5,r:450.5},8:{e:640.7,r:600.7},10:{e:800.9,r:750.8}}},
 {bore:125,rod:32,rodThread:"M27x2,0",port:"G 1/2\"",f:{2:{e:250.3,r:233.9},4:{e:500.5,r:467.7},6:{e:750.8,r:701.6},8:{e:1001.1,r:935.5},10:{e:1251.4,r:1169.4}}},
 {bore:160,rod:40,rodThread:"M36x2,0",port:"G 3/4\"",f:{2:{e:410.3,r:384.4},4:{e:820.1,r:768.8},6:{e:1230.1,r:1153.3},8:{e:1640.2,r:1537.7},10:{e:2050.2,r:1922.1}}},
 {bore:200,rod:40,rodThread:"M36x2,0",port:"G 3/4\"",f:{2:{e:640.7,r:615.1},4:{e:1281.4,r:1230.1},6:{e:1922.1,r:1845.2},8:{e:2562.8,r:2460.3},10:{e:3203.5,r:3075.3}}},
 {bore:250,rod:50,rodThread:"M42x2,0",port:"G 1\"",f:{2:{e:1001.1,r:961.0},4:{e:2002.2,r:1922.1},6:{e:3003.3,r:2883.2},8:{e:4004.4,r:3844.2},10:{e:5005.5,r:4805.2}}},
 {bore:320,rod:63,rodThread:"M48x2",port:"G 1\"",f:{2:{e:1640.2,r:1576.6},4:{e:3280.4,r:3153.1},6:{e:4920.6,r:4729.8},8:{e:6560.7,r:6306.5},10:{e:8200.9,r:7883.1}}}
];

function fmt(v){ return v.toFixed(1).replace(".", ","); }

function getForce(row,p,kind){
  if(row.f[p]) return row.f[p][kind];
  const base = row.f[6] ? 6 : 10;
  return row.f[base][kind] * (p / base);
}

function buildTable(rows){
  const t = document.getElementById("forceTable");
  t.innerHTML = "";

  let h1 = `<tr>
    <th rowspan="2" class="left">Ø Cilindro<br>(mm)</th>
    <th rowspan="2" class="left">Ø Haste</th>
    <th rowspan="2" class="left">Rosca haste</th>
    <th rowspan="2" class="left">Conexão</th>`;
  pressures.forEach(p=> h1+=`<th class="group" colspan="2">${p} bar</th>`);
  h1 += `</tr>`;

  let h2 = `<tr>`;
  pressures.forEach(()=> h2+=`<th>Ext</th><th>Ret</th>`);
  h2 += `</tr>`;

  t.innerHTML = h1 + h2;

  rows.forEach(r=>{
    let tr = `<tr data-bore="${r.bore}">
      <td class="left"><b>${r.bore}</b></td>
      <td class="left">${r.rod}</td>
      <td class="left">${r.rodThread}</td>
      <td class="left">${r.port}</td>`;
    pressures.forEach(p=>{
      tr+=`<td data-p="${p}" data-kind="e">${fmt(getForce(r,p,"e"))}</td>`;
      tr+=`<td data-p="${p}" data-kind="r">${fmt(getForce(r,p,"r"))}</td>`;
    });
    tr+=`</tr>`;
    t.innerHTML+=tr;
  });
}

function applyFilter(){
  const boreSel = document.getElementById("boreSelect").value;
  const pSel = document.getElementById("pressure").value;
  const q = document.getElementById("search").value;

  const filtered = q ? data.filter(d=>String(d.bore).includes(q)) : data;
  buildTable(filtered);

  document.querySelectorAll("td, tr").forEach(e=>e.classList.remove("hl-cell","hl-row"));

  if(boreSel && pSel){
    const row = document.querySelector(`tr[data-bore="${boreSel}"]`);
    if(row){
      row.classList.add("hl-row");
      row.querySelector(`td[data-p="${pSel}"][data-kind="e"]`)?.classList.add("hl-cell");
      row.querySelector(`td[data-p="${pSel}"][data-kind="r"]`)?.classList.add("hl-cell");
    }
  }
}

const boreSelect = document.getElementById("boreSelect");
boreSelect.innerHTML = `<option value="">—</option>` +
  data.map(d=>`<option value="${d.bore}">${d.bore} mm</option>`).join("");

document.getElementById("pressure").addEventListener("change",applyFilter);
document.getElementById("search").addEventListener("input",applyFilter);
boreSelect.addEventListener("change",applyFilter);
document.getElementById("clear").addEventListener("click",()=>{
  boreSelect.value="";
  document.getElementById("pressure").value="";
  document.getElementById("search").value="";
  buildTable(data);
});

buildTable(data);
