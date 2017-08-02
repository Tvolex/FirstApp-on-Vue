import axios from 'axios';

module.export = function (cb) {
    return axios.get('/login');
};