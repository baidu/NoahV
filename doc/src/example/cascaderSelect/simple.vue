<template>
    <div>
        <NvCascaderSelect :data="data"></NvCascaderSelect>
    </div>
</template>

<script>
export default {
    name: 'nvCascaderSelectSimpleDemo',
    data() {
        return {
            data: [
                {
                    label: '山东省',
                    value: 'shandong',
                    children: [
                        {
                            label: '济南市',
                            value: 'jinan',
                        },
                        {
                            label: '青岛市',
                            value: 'qingdao',
                        },
                        {
                            label: '烟台市',
                            value: 'yantai',
                        }
                    ]
                },
                {
                    label: '广东省',
                    value: 'guangdong',
                    children: [
                        {
                            label: '广州市',
                            value: 'guangzhou',
                        },
                        {
                            label: '佛山市',
                            value: 'foshan',
                        },
                        {
                            label: '惠州市',
                            value: 'huizhou'
                        }
                    ]
                }
            ]
        };
    }
};
</script>

