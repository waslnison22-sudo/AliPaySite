const ASSET_BASE=import.meta.env.BASE_URL;
const asset=name=>ASSET_BASE+'photos/'+name;
export const WORKS=[
{id:'01',src:asset('b5e2675cde1bd228.jpeg'),title:'Наша футболка',label:'наша основа · нанесение'},
{id:'02',src:asset('1fd20f1328bc0912.jpeg'),title:'Наш шоппер',label:'наша основа · нанесение'},
{id:'03',src:asset('fa840ada8e29d790.jpeg'),title:'Одежда клиента · 01',label:'вещь клиента · нанесение'}
];
export const FEED=[
{id:'f1',src:asset('1fd20f1328bc0912.jpeg'),type:'WORK',date:'2026',title:'Деталь решает всё',text:'Показываем, как рисунок работает на готовой вещи.'},
{id:'f2',src:asset('fa840ada8e29d790.jpeg'),type:'PROCESS',date:'2026',title:'В процессе',text:'От идеи и референса до согласованного рисунка и нанесения.'},
{id:'f3',src:asset('b5e2675cde1bd228.jpeg'),type:'READY',date:'2026',title:'Готово',text:'Готовая вещь после нанесения рисунка.'}
];
