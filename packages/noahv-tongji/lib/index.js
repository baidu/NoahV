/**
 * NoahV Tongji
 * Copyright (c) 2019 Baidu, Inc. All Rights Reserved.
 *
 * @file tongji plugin
 * @author darren(darrenywyu@gmail.com)
 */

import loadjs from 'loadjs';

let tongji = {
    setAccount(userid) {
        loadjs('//hm.baidu.com/hm.js' + '?' + userid);
    }
};

export default tongji;
