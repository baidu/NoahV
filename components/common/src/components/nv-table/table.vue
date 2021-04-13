
<template>
    <div :class="nvClassesWrapper">
        <Table v-bind="$attrs" v-on="$listeners" :class="nvClasses" :no-data-text="info"></Table>
    </div>
</template>

<script>
import {Table} from 'view-design';
const prefixCls = 'noahv-table';
const prefixClsWrappper = 'noahv-table-wrapper';
import {t} from '../../locale';

export default {
    name: 'nv-table',
    components: {
        Table
    },
    props: {
        noText: {
            type: String,
            default() {
                return t('table.noData');
            }
        }
    },

    data() {
        const text = this.noText;
        return {
            info: `<svg class="noahv-empty-img" width="140" height="auto" viewBox="0 0 140 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>缺省页/无数据</title><defs><path d="M3.5,0 L66.5,0 C68.4329966,-3.55085719e-16 70,1.56700338 70,3.5 L70,66 L70,66 L0,66 L0,3.5 C-2.36723813e-16,1.56700338 1.56700338,3.55085719e-16 3.5,0 Z" id="path-1"></path><mask id="mask-2" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="70" height="66" fill="white"><use xlink:href="#path-1"></use></mask><polygon id="path-3" points="0.1392 0.650064935 12.48 0.650064935 12.48 20.9847447 0.1392 20.9847447"></polygon></defs><g id="缺省页/无数据" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Group-24"><g id="Group-22-Copy" transform="translate(132.348469, 38.348469) rotate(-345.000000) translate(-132.348469, -38.348469) translate(126.348469, 32.348469)" fill="#EBEBEB"><rect id="Rectangle-20" x="5" y="0" width="2" height="12"></rect><rect id="Rectangle-20" transform="translate(6.000000, 6.000000) rotate(-270.000000) translate(-6.000000, -6.000000) " x="5" y="0" width="2" height="12"></rect></g><path d="M109.753799,26.5 L139.5,65.170061 L139.5,99.5 L0.5,99.5 L0.5,65.170061 L30.2462007,26.5 L109.753799,26.5 Z" id="Combined-Shape" stroke="#CCCCCC" fill="#FFFFFF"></path><rect id="Rectangle-58-Copy-3" stroke="#CCCCCC" fill="#F5F5F5" x="55.5" y="85.5" width="29" height="4"></rect><path d="M107.75,29.5 L134,64.5 L119.5,64.5 L119.5,75.5 L20.5,75.5 L20.5,64.5 L6,64.5 L32.25,29.5 L107.75,29.5 Z" id="Combined-Shape" stroke="#CCCCCC" fill="#F5F5F5"></path><g id="Group-22-Copy-2" transform="translate(24.500000, 54.000000) rotate(48.000000) translate(-24.500000, -54.000000) translate(20.000000, 50.000000)" fill="#DDDDDD"><rect id="Rectangle-20" x="4" y="0" width="1" height="8"></rect><rect id="Rectangle-20" transform="translate(4.500000, 4.000000) rotate(-270.000000) translate(-4.500000, -4.000000) " x="4" y="0" width="1" height="8"></rect></g><g id="Group-23" transform="translate(35.000000, 0.000000)"><use id="Rectangle-15" stroke="#CCCCCC" mask="url(#mask-2)" stroke-width="2" fill-opacity="0.8" fill="#FFFFFF" stroke-dasharray="2" xlink:href="#path-1"></use><g id="Group-9" transform="translate(35.000000, 22.000000)"><g id="Group-5" transform="translate(0.000000, 0.344828)"><mask id="mask-4" fill="white"><use xlink:href="#path-3"></use></mask><g id="Clip-4"></g></g></g></g><path d="M125.663457,13.9307792 L125.420634,15.0503328 C125.163112,16.2376597 125.163112,17.4663961 125.420634,18.653723 L125.420634,18.653723 L125.663457,19.7732766 L124.707172,19.5556247 C123.465469,19.273011 122.176133,19.273011 120.93443,19.5556247 L120.93443,19.5556247 L119.978145,19.7732766 L120.220968,18.653723 C120.47849,17.4663961 120.47849,16.2376597 120.220968,15.0503328 L120.220968,15.0503328 L119.978145,13.9307792 L120.93443,14.1484312 C122.176133,14.4310448 123.465469,14.4310448 124.707172,14.1484312 L124.707172,14.1484312 L125.663457,13.9307792 Z" id="Star" stroke="#CCCCCC" fill="#F5F5F5" transform="translate(122.820801, 16.852028) rotate(-257.000000) translate(-122.820801, -16.852028) "></path><path d="M23.6278897,2.37743716 L23.2224729,4.24664331 C22.9649506,5.43397018 22.9649506,6.66270663 23.2224729,7.85003351 L23.2224729,7.85003351 L23.6278897,9.71923966 L21.9398013,9.33502801 C20.6980983,9.05241437 19.4087618,9.05241437 18.1670587,9.33502801 L18.1670587,9.33502801 L16.4789704,9.71923966 L16.8843871,7.85003351 C17.1419094,6.66270663 17.1419094,5.43397018 16.8843871,4.24664331 L16.8843871,4.24664331 L16.4789704,2.37743716 L18.1670587,2.76164881 C19.4087618,3.04426245 20.6980983,3.04426245 21.9398013,2.76164881 L21.9398013,2.76164881 L23.6278897,2.37743716 Z" id="Star-Copy" stroke="#CCCCCC" fill="#F5F5F5" transform="translate(20.053430, 6.048338) rotate(-227.000000) translate(-20.053430, -6.048338) "></path></g></g></svg><div class="noahv-empty-text">${text}</div>`
        };
    },
    computed: {
        nvClasses() {
            return `${prefixCls}`;
        },
        nvClassesWrapper() {
            return `${prefixClsWrappper}`;
        }
    }
};
</script>

