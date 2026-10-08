const ASSET_BASE=import.meta.env.BASE_URL;
const asset=name=>ASSET_BASE+'photos/'+name;
export const WORKS=[
{id:'01',src:asset('b5e2675cde1bd228.jpeg'),title:'Наша футболка',label:'наша основа · нанесение'},
{id:'02',src:asset('1fd20f1328bc0912.jpeg'),title:'Наш шоппер',label:'наша основа · нанесение'},
{id:'03',src:asset('fa840ada8e29d790.jpeg'),title:'Одежда клиента · 01',label:'вещь клиента · нанесение'}
];
export const FEED=[
{id:'f1',src:asset('additional-hoodie.jpg'),type:'CLIENT',date:'2026',title:'Худи клиента',text:'Большой рисунок на спине — нанесение на вещь клиента.'},
{id:'f2',src:asset('1fd20f1328bc0912.jpeg'),type:'WORK',date:'2026',title:'Наш шоппер',text:'Готовая основа AliPay с нанесённым рисунком.'},
{id:'f3',src:asset('fa840ada8e29d790.jpeg'),type:'CLIENT',date:'2026',title:'Одежда клиента',text:'Пример нанесения на готовую вещь клиента.'}
];
