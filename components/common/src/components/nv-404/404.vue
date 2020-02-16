<template>
    <div :class="getCls('not-found')">
        <div class="title">{{title}}</div>
        <div class="text">{{tips}}</div>
        <div class="back-to">
            <a :href="href">{{t('nv404.backToHomePage')}}</a>
        </div>
    </div>
</template>

<script>
import getClassName from '../utils';
import mixin from '../../mixins';
import {t} from '../../locale';
export default {
    mixins: [mixin],
    props: {
        title: {
            type: String,
            default: '404'
        },
        tips: {
            type: String,
            default () {
                return t('nv404.notFound');
            }
        },
        href: {
            type: String,
            default: '/'
        }
    }
};
</script>

