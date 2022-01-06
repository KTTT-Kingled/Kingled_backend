import fetch from 'node-fetch';
import quan_huyen from './quan_huyen.json';
import tinh_tp from './tinh_tp.json';
import xa_phuong from './xa_phuong.json';

const tinh_tp_arr = Object.keys(tinh_tp).map(key => tinh_tp[key]);
// for each city in tinh_tp, create a request to http://localhost:3000/address/city 
// and send the city object to the server
tinh_tp_arr.forEach(city => {
    fetch('http://localhost:3000/address/city', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(city),
    })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));
    setTimeout(() => {}, 66);
});

const quan_huyen_arr = Object.keys(quan_huyen).map(key => quan_huyen[key])
quan_huyen_arr.forEach(district => {
    fetch('http://localhost:3000/address/district', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(district),
    })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));
    setTimeout(() => {}, 66);
});

const xa_phuong_arr = Object.keys(xa_phuong).map(key => xa_phuong[key])
xa_phuong_arr.forEach(ward => {
    fetch('http://localhost:3000/address/ward', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ward),
    })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));
    setTimeout(() => {}, 66);
});
